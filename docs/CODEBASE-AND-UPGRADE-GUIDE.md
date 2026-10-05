# Lucky Moon (`lucky_moon_20705`) — Codebase Guide & React Native 0.80.3 Upgrade Reference

> Generated: 2026-10-05
> Purpose: single reference document covering (1) what this app is, (2) how the codebase
> is organized, (3) every change made during the React Native 0.64.2 → 0.80.3 upgrade,
> and (4) known caveats and how to maintain the project.
>
> The companion document `docs/RN-0.80-UPGRADE-PLAN.md` contains the original pre-work
> upgrade plan; this file supersedes it with what was actually done.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Layout](#2-repository-layout)
3. [Mobile App Architecture](#3-mobile-app-architecture)
4. [Native Platform Configuration](#4-native-platform-configuration)
5. [Development Workflow](#5-development-workflow)
6. [RN 0.80.3 Upgrade — Complete Change Log](#6-rn-0803-upgrade--complete-change-log)
7. [Known Caveats & Maintenance Notes](#7-known-caveats--maintenance-notes)

---

## 1. Project Overview

**Lucky Moon** is a home-services booking mobile application, originally scaffolded by
**Botics (Crowdbotics)** around late 2021 on React Native 0.64.2. The repo is a Botics
"trifecta": one repo contains three deployables behind `lucky-moon-20705.botics.co`:

| Component | Folder | Tech | Role |
|---|---|---|---|
| Mobile app | repo root (`android/`, `ios/`, `src/`) | React Native 0.80.3 | The app this document covers |
| Backend API | `backend/` | Django (Python, Pipenv) | REST API: bookings, events, payments, push, property plans |
| Web admin | `frontend/` | React (CRA) | Admin/dashboard UI |
| Deploy | `heroku.yml`, `.circleci/` | Docker + CircleCI | Backend deploys to Heroku |

### What the app does (business logic)

- **Two user roles**, chosen on the `LoginUserType` screen and stored in Redux:
  - **Customer / "resident"** — browses services and events, books slots, manages
    bookings, pays (Apple Pay / Google Pay / credit card), tracks orders, chatters
    with providers.
  - **Employee / provider** — manages available booking slots, views tasks, profile.
- **Core flows**: auth (email/password through the Botics API, Firebase Auth also
  wired), onboarding, home feed, service/event catalog, booking form with
  date/slot pickers, cart ("MyBag"), checkout with payment methods, post-booking
  review/completion screens, order tracking with maps, chat rooms, notifications,
  profile/settings, password reset.
- **Integrations**: Botics REST API (axios), Firebase (auth/app), Firebase Cloud
  Messaging + APNs (push), Google Maps + Places + directions (maps, location),
  Apple Pay + Google Pay (`react-native-payments`), credit-card input.

---

## 2. Repository Layout

```
.
├── index.js                  # Metro entry: registers the App component
├── App.js                    # Root component: splash → providers → navigator
├── app.json                  # App name (must match MainActivity/AppDelegate module name)
├── package.json              # Scripts + dependencies
├── metro.config.js           # Metro resolver/transformer config (RN 0.80 style)
├── babel.config.js           # Babel: custom-rn-preset + flow plugins
├── custom-rn-preset.js       # Babel preset wrapper (strips Hermes-Flow parser)
├── react-native.config.js    # Declares src/assets/fonts/ for linking
├── patches/                  # patch-package diffs (re-applied in postinstall)
│   ├── react-native-snap-carousel+3.9.1.patch
│   ├── react-native-input-credit-card+0.5.5.patch
│   └── react-native-payments+0.8.4.patch
├── scripts/
│   └── fix-svg-transformer.js# Patches react-native-svg-transformer postinstall
├── src/                      # All application JS (see §3)
├── android/                  # Android native project
├── ios/                      # iOS native project (CocoaPods)
├── backend/                  # Django API (out of scope for the RN upgrade)
├── frontend/                 # CRA web admin (out of scope for the RN upgrade)
├── docs/                     # This documentation
├── heroku.yml                # Backend deploy config
└── .circleci/                # CI: node lint job + android/ios build jobs
```

---

## 3. Mobile App Architecture

### 3.1 Boot sequence

`index.js` → `AppRegistry.registerComponent('lucky_moon_20705', () => App)`

`App.js` (`App`):

1. `useEffect` → `loadAssets()` (after 500 ms) → `setupHttpConfig()` (configures the
   axios instance, then flips `isLoading` to false).
2. `RemotePushController()` — configures `react-native-push-notification`
   (FCM/APNs token registration, device token stored in AsyncStorage as `FCMToken`).
3. While loading: renders `src/screens/Common/Splash` (Lottie splash).
4. When loaded: renders the provider tree:

```
ReduxProvider (store from src/redux/store.js)
└── PersistGate (redux-persist, persistor created at module scope)
    └── ApplicationProvider (UI Kitten eva light theme)
        └── Root (native-base — theme provider for the whole tree)
            ├── NavigatorProvider (src/navigator/index.js)
            ├── FlashMessage
            └── Toast (react-native-toast-message, custom success config)
```

### 3.2 State management (Redux + Saga + Persist)

All state lives in Redux. `src/redux/` holds the wiring; **each screen folder owns its
own slice** in `redux/{actions,types,reducer,sagas}.js` next to the screen:

- `src/redux/store.js` — builds the store: `createStore(persistCombineReducers(...),
  composeEnhancers(applyMiddleware(sagaMiddleware)))`, runs `mainSaga`.
  ⚠️ Uses `require('redux-saga').default` instead of an ESM default import — see §7.
- `src/redux/mainReducer.js` — root reducer; ~30 slice reducers imported from the
  screens. Five slices are wrapped in `persistReducer` (persisted to AsyncStorage):
  `login`, `home`, `card`, `bagServices`, `profileData`.
- `src/redux/mainSaga.js` + `sagas.js` — the `run()` effect and the shared root saga.
- Key slices used across the app: `login` (auth state, user role), `unreadCount`
  (chat badge), `booking`/`bookingDetail`/`createBooking` (booking flow), `card`
  (payment methods), `bagServices` (cart).

**Conventions inside a screen** (e.g. `src/screens/Common/Login/`):

```
Login/
├── index.js        # screen component (hooks + connect() where needed)
├── styles.js       # StyleSheet.create(...)
└── redux/
    ├── actions.js  # action creators (plain object actions)
    ├── types.js    # action-type string constants
    ├── reducer.js  # slice reducer
    └── sagas.js    # takeLatest/takeEvery effects calling the API
```

Screens use a shared `useForm` hook (`src/hooks/useForm.js`) with
`src/utils/validation.js` for form state/validation.

### 3.3 Navigation (React Navigation v7)

`src/navigator/` is the whole navigation graph:

- `index.js` — `NavigationContainer` (ref = `navigationRef` from
  `NavigationService.js`). Picks the root stack from Redux `login` state:
  - not authenticated → `AuthStackScreen`
  - `user.role === 'resident'` → `CustomerStackScreen`
  - else → `EmployeeStackScreen`
- `AuthScreens.js` — stack of: `AuthMain` (initial), `Login`, `LoginUserType`,
  `OnBoard`, `Register`, `NewPassword`, `Verification`, `ForgotPassword`,
  `TermsAndCondition`.
- `CustomerScreen.js` — outer stack containing a **bottom tab navigator**
  (`Home`, `Task` (services), `Chat Room`, hidden `BookingCompleteScreen`,
  `Profile`) plus ~25 pushed screens (booking flow, payments, profile, help, ...).
  Tab bar uses `src/assets/images/icon/*.png` names via the `Images` theme map and
  shows an unread-count `BadgeIcon` on the Chat tab.
- `EmployeeScreen.js` — bottom tabs (`Home`, `Task`, `Chat Room`, `Notifications`,
  `Profile`) with SVG tab icons from `src/assets/images/icon/*.svg`
  (`react-native-svg-transformer`).
- `NavigationService.js` — imperative navigation helpers (`navigate`,
  `navigateAndReset`, `goBack`, `navigationRef`) used by screens and the push
  controller.

Programmatic navigation from deep links/push: `NavigationService.navigate(name,
params)`.

### 3.4 API layer

- `src/config/app.js` — `appConfig`: `backendServerURL`
  (`http://lucky-moon-20705.botics.co`), `defaultTimeout` (5000 ms), PubNub keys.
  Also imported under the name `emailAuthAPIEndPoint` in `src/utils/http.js`.
- `src/utils/http.js` — single axios instance `request` with headers
  `app_platform: 'Mobile'` and `app_version: 1` (Botics convention).
- `src/utils/XHR.js` — older/wrapper helper used by some sagas.
- `src/utils/` also contains `alerts.js`, `constants.js`, `functions.js`,
  `getDeviceInfo.js`, `scale.js` (responsive sizing), `validation.js`, and a
  `Permission/` helper folder.

### 3.5 Theming

Three parallel theme systems coexist (inherited from the scaffold + UI libraries):

1. **`src/theme/`** — app design tokens: `Colors` (brand palette incl.
   `Turquoise: '#30D5C8'`), `Fonts` (custom TTF families from `src/assets/fonts`),
   `Images` (require-map of `src/assets/images`), `Layout`, `Gutters`, `Variables`
   (native-base `lightTheme` override). Imported everywhere as
   `import {Colors, Images, Fonts, Layout} from 'src/theme'`.
2. **native-base v2** — `Root` wraps the app; `lightTheme` from `Variables.js`
   drives `Container/Content/View/Text/Button/Icon/...` styling.
3. **UI Kitten (`@ui-kitten/components`)** — provided via `ApplicationProvider`
   with eva light mapping; used for a few form controls.

### 3.6 Screen inventory

| Area | Path | Notable screens |
|---|---|---|
| Common (shared by both roles) | `src/screens/Common/` (16) | `AuthMain`, `Login`, `Register`, `Verification`, `ForgotPassword`, `ChangePassword`, `NewPassword`, `LoginUserType`, `OnBoard`, `ChatRoom`/`Messages`, `Notifications`, `CalendarScreen`, `TermsAndCondition`, `PrivacyPolicy`, `Splash` |
| Customer | `src/screens/Customer/` (31) | `Home`, `Services`, `ServiceProfile`(+Checkout), `EventsList`/`EventDetails`, `CreateBooking`, `AvailableBookingSlots`, `BookingForm`, `MyBag`, `Task`/`TaskDetail`/`TaskRebook`, `MyBookings`/`BookingDetails`, `PaymentMethodScreen`, `AddCreditCardScreen`, `PaymentDetailScreen`, `Subscription`, `PastOrdersScreen`, `PendingTaskScreen`, `TrackOrderDetailScreen`, `BookingComplete*` (4 screens), `Profile`, `HouseCleaning`, `Help`, `PriceScreen` |
| Employee | `src/screens/Employee/` (6) | `Home`, `HomeV2`, `Task`, `AddService`, `Profile`, `TrackOrderDetailScreen` |

Each screen folder: `index.js` + `styles.js` + (optional) `redux/` slice.

### 3.7 Shared component library (`src/components/`, 30)

Re-exported by `src/components/index.js` barrel: `Text`, `Input`, `Button`,
`Header`, `LuckyHeader`, `Footer`, `Map`/`Markers`, `Task`, `Service`,
`ServiceCard`/`ServiceDetail`, `ProfileCard`, `IdentityCard`, `DiscountCard`,
`EarningCard`, `MyOrders`, `BookingRequest`, `Notification`/`ChatNotification`,
`BadgeIcon`, `IconCard`, `Error`/`ErrorBox`, `RNModal`, `PopOver`, `Line`,
`Separator`, `ProfilePicture`, `CustomerReview`, `DataAvailability`,
`CodeVerificationInput`, `DateTimePickerComponent`.

### 3.8 Other `src/` folders

- `src/services/` — `PushNotification.js` (push setup, `senderID` hardcoded).
- `src/assets/` — `fonts/` (45 custom TTFs), `images/` (PNGs + `icon/` SVGs),
  `loaders/` (Lottie JSON), `icons/`.
- `src/data/` — Botics sample data provider (`DataProvider` class, raw JSON in
  `raw/`, generated fixtures in `dataGenerator.js`). Mostly vestigial.
- `src/resources/` — legacy icon/image re-exports.
- `src/hooks/` — `useForm.js` only.
- `src/config/` — `app.js` (API config), `crowdboticsTheme.js`,
  `installed_blueprints.js` (list of legacy Botics blueprint feature folders).

---

## 4. Native Platform Configuration

### 4.1 Android (`android/`)

| File | Key content |
|---|---|
| `gradle.properties` | `hermesEnabled=true`, `newArchEnabled=false` (legacy architecture), release keystore props (`luckymoon.keystore` in `android/app/`) |
| `build.gradle` (root) | `buildToolsVersion 35.0.0`, `compileSdkVersion 35`, `minSdkVersion 24`, `targetSdkVersion 34`, `ndkVersion 27.1.12297006`, `kotlinVersion 2.1.20`; AGP **8.9.2**; RN gradle plugin; google-services 4.4.2; `com.facebook.react.rootproject`; subproject hook that adds gesture-handler's paper codegen Java sources (see §6.9) |
| `settings.gradle` | RN 0.80 style: `pluginManagement includeBuild` + `com.facebook.react.settings` plugin + `autolinkLibrariesFromCommand()` (all 25+ native modules autolinked from `npx react-native config`) |
| `app/build.gradle` | namespace/applicationId `com.lucky_moon_20705`; `react { autolinkLibrariesWithApp() }`; deps `com.facebook.react:react-android` + `hermes-android`; vector-icons `fonts.gradle` applied; google-services plugin; debug/release signing; ProGuard off for release |
| `local.properties` | `sdk.dir=/home/workspace/Android/Sdk` (machine-local, gitignored) |
| `app/src/main/AndroidManifest.xml` | permission set (location, network, etc.), Google Maps API key, `MainActivity`, RN 0.80 `com.facebook.react.header` version meta, push boot receiver with `android:exported="false"`, FileProvider |
| `app/src/main/java/.../MainApplication.java` | RN 0.80 `DefaultReactNativeHost` + `getReactHost()` (bridgeless-capable, but running legacy arch) + `ReactNativeApplicationEntryPoint.loadReactNative` |
| `app/src/main/java/.../MainActivity.java` | RN 0.80 `DefaultReactActivityDelegate` with `DefaultNewArchitectureEntryPoint.getFabricEnabled()` |

Autolinked native modules (from `npx react-native-community/cli config`):
`async-storage`, `checkbox`, `date-picker`, `gesture-handler`, `geolocation`,
`image-picker`, `lottie`, `masked-view`, `maps`, `picker`, `payments`,
`permissions`, `push-notification`, `react-native-calendars`, `react-native-svg`,
`react-native-snap-carousel`, `react-native-vector-icons`, `slider`,
`react-native-maps`, all `@react-native-firebase/*` (app/auth/firestore), etc.

### 4.2 iOS (`ios/`)

- `Podfile` — RN 0.80 modern style: `react_native_pods` + `prepare_react_native_project!`
  + `use_react_native!(path: config[:reactNativePath])` + `use_native_modules!`
  (autolinking). Explicit pods: `react-native-maps` + `Google-Maps-iOS-Utils`.
  `post_install` runs `react_native_post_install` and disables Bitcode.
- `lucky_moon_20705/AppDelegate.m` — modern `RCTAppDelegate` subclass:
  `moduleName = @"lucky_moon_20705"`, `logLevel = RCTLogLevelInfo`, plus all
  `react-native-push-notification` (iOS) notification delegate methods
  (`didRegisterForRemoteNotificationsWithDeviceToken`,
  `didReceiveRemoteNotification`, local-notification handling).
- `Info.plist` — Google Maps key (`GMSServicesApiKey`), push/remote-notification
  capabilities, URL schemes.
- `GoogleService-Info.plist` — Firebase config.

### 4.3 CI (`.circleci/config.yml`)

- `node` job — `circleci/node:20`, `yarn install`, cached node_modules,
  failure webhook.
- `android` job — `circleci/android:2024.07` (API 34/JDK 17 generation image),
  bundle install for fastlane, env-file population, then gradle build.
- `ios` job — macOS + Xcode 15.4, pod install + xcodebuild.

---

## 5. Development Workflow

### 5.1 Required environment (this machine)

All of this is already configured in `~/.bashrc` (run `source ~/.bashrc` in a new
terminal):

```bash
export JAVA_HOME="/home/workspace/jdk/jdk-17.0.20.1+1"   # Temurin JDK 17 (user install)
export PATH="$JAVA_HOME/bin:$PATH"
export ANDROID_HOME="/home/workspace/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
```

### 5.2 Scripts (`package.json`)

| Script | What it does |
|---|---|
| `yarn android` | `react-native run-android` (builds, installs, launches; expects a device/emulator + `ANDROID_HOME`) |
| `yarn ios` | `react-native run-ios` |
| `yarn start` | Metro dev server (port 8081) |
| `yarn bundle` | Release JS bundle → `android/app/src/main/assets/index.android.bundle` |
| `yarn build` | `./gradlew assembleRelease` (signed with `luckymoon.keystore`) |
| `yarn clean` | `./gradlew clean` |
| `yarn reset` | `yarn start --reset-cache` |
| `yarn postinstall` | `jetifier` → `rndebugger-open` → **`patch-package`** → `scripts/fix-svg-transformer.js` — **always run `yarn install` (or `npm install` with the equivalent) so the node_modules patches are re-applied** |
| `yarn lint` | ESLint |
| `yarn test` | Jest (preset `react-native`; only `__tests__/App-test.js`) |

### 5.3 Verification state at hand-over (2026-10-05)

- JS bundles: **iOS dev/release + Android dev/release all build** via
  `npx react-native bundle`.
- `./gradlew assembleDebug`: **BUILD SUCCESSFUL** (116 MB debug APK).
- Installed on emulator `Pixel_9_Pro` (API 37.2 system image); app launches,
  renders the `AuthMain` screen (Sign Up / Log in), **no JS or native errors** in
  logcat.

---

## 6. RN 0.80.3 Upgrade — Complete Change Log

Baseline: RN **0.64.2 / React 17.0.1 / legacy toolchain**. Target: RN **0.80.3 /
React 19.1.0**. Working branch: `upgrade/rn-0.80`. All changes below are on the
working tree (uncommitted).

### 6.1 Core JS dependency upgrades (package.json)

| Package | From | To | Why |
|---|---|---|---|
| `react-native` | 0.64.2 | **0.80.3** | target |
| `react` / `react-test-renderer` | 17.0.1 | **19.1.0** | required by RN 0.80 |
| `@react-navigation/native` | 5.9.x | **7.5.0** | RN 0.80 nav stack |
| `@react-navigation/stack` | 5.14.x | **7.12.0** | "" |
| `@react-navigation/bottom-tabs` | 5.11.x | **7.20.0** | "" |
| `@react-navigation/drawer` | (5.x) | **7.14.3** | "" |
| `react-native-screens` | 3.34.1 | **4.11.1** | 3.x cannot compile vs RN 0.80 codegen (Kotlin errors in `ScreenContainer.kt`, view-manager generic bounds) |
| `react-native-safe-area-context` | 4.14.1 | **5.4.0** | same reason (`SafeAreaProviderManager.kt` errors) |
| `react-native-gesture-handler` | (old) | 2.33.0 | required by nav v7; works on RN 0.80 (needs source-set fix, §6.9) |
| `lottie-react-native` | 6.7.2 | **7.3.0** | 6.7.2 Kotlin source not nullability-compatible with RN 0.80 (`ReadableMap?` errors); 7.4.0+/7.5.0 require React ≥19.2, so 7.3.0 is the highest compatible with React 19.1 |
| `@react-native-firebase/app,auth,firestore` | 12.7.2 | **21.14.0** | RN 0.80-compatible Firebase |
| `react-native-maps` | 0.28.0 | **1.18.4** | modern autolinking layout (`android/` dir) |
| `react-native-svg` / `-svg-transformer` | 12.x / 1.0.0 | **15.15.5 / 1.5.3** | RN 0.80 codegen |
| `react-native-permissions` | 3.x | **4.1.5** | modern API |
| `react-native-image-picker` | 4.x | **7.2.3** | "" |
| `react-native-date-picker` | 4.x old | **4.3.7** | newarch/oldarch source sets |
| `@react-native-async-storage/async-storage` | community 1.x | **3.1.1** | scoped successor, modern codegen |
| `react-native-push-notification` | 8.0.x | **8.1.1** | latest in 8.x line |
| `react-native-modal` | 13.0.1 | **13.0.2** | "" |
| `react-native-pager-view` | 6.0.x | **6.9.1** | "" |
| `@react-native-picker/picker` | 2.2.1 | **2.11.4** | modern codegen |
| `react-native-input-credit-card` | 0.5.5 | 0.5.5 (+patch) | used by AddCreditCardScreen; patched (§6.9) |
| `react-native-snap-carousel` | 3.9.1 | 3.9.1 (+patch) | used in 6 screens; registry mirror caps at 3.9.1, so patched (§6.9) |
| `react-native-payments` | 0.8.4 | 0.8.4 (+patch) | §6.9 |
| `native-base` | 2.15.2 | **2.15.2 (kept)** | no maintained v2 successor in registry; v3 has a breaking API. Works on React 19 with warnings (§7) |
| `react-redux` / `redux` / `redux-saga` / `redux-persist` | 7.1.3 / 4.0.5 / 1.1.3 / 6.0.0 | **9.2.0 / 4.2.1 / 1.3.0 / 6.0.0** | React 19 requires react-redux ≥9 |
| `axios` | 0.19.0 | **1.7.9** | security |
| `zustand` | (added) | 4.5.7 | used by a few components |

**Removed:**
- `react-navigation-stack` (legacy v1 package, only used by the deleted `src/features/` tree).
- `@react-native-community/clipboard` — zero usages in the app; its v1.5.1 uses the
  removed `ContextBaseJavaModule` class and its newer versions aren't in the
  registry mirror.
- Dead `src/features/` directory — 62 files (Maps1164xx / Add-Item1164xx /
  UserProfile1164xx Botics blueprints), **zero active imports anywhere** in
  `src/`.

### 6.2 Babel / Metro (JS transform pipeline)

The old setup (`metro-react-native-babel-preset` + Hermes parser with Flow) crashed
on RN 0.80's own Flow-typed sources. Final state:

- **`custom-rn-preset.js`** (new, root): wraps `@react-native/babel-preset` (0.80.3)
  and **filters out `babel-plugin-syntax-hermes-parser`** from the preset's
  overrides. That plugin enables the Hermes parser with Flow parsing globally,
  which broke both project files (JSX/Flow parser bugs) and node_modules.
- **`babel.config.js`** (simplified): presets = `['./custom-rn-preset.js'
  (unstable_transformProfile: 'default'), 'module:react-native-dotenv']`;
  plugins = `@babel/plugin-syntax-flow` + `@babel/plugin-transform-flow-strip-types`
  (both installed as devDependencies). No more per-file overrides, no
  `@babel/preset-env`/`preset-flow`/`preset-react` (removed as unused; the v8
  `preset-env` also caused a `@babel/core` peer conflict during installs).
- **`metro.config.js`**: uses `@react-native/metro-config` (`getDefaultConfig` +
  `mergeConfig`); `resolver.extraNodeModules.src = <project>/src` makes the
  app-wide `from 'src/...'` absolute imports resolve (this was previously a
  `src/package.json` hack); `resolver` adds `svg` to `sourceExts` and removes it
  from `assetExts` (react-native-svg-transformer handles SVGs);
  `transformer.minifierPath = 'metro-minify-terser'` with `safari10`/IIFE wrapping
  (fixes release-mode dynamic-import minification failures); `watchFolders`
  includes `src/assets`.
- **`scripts/fix-svg-transformer.js`** (new, run in postinstall): patches
  `react-native-svg-transformer` to use `metro-babel-transformer` directly — the
  transformer it tries to load (`@react-native/metro-babel-transformer`) is not in
  the registry mirror at a matching version.

### 6.3 Android native — build system

| File | Change |
|---|---|
| `android/gradle/wrapper/gradle-wrapper.properties` | Gradle **8.8 → 8.14.3** (AGP 8.9.2 requires ≥8.11.1; 8.14.3 is the RN 0.80 template version) |
| `android/build.gradle` | AGP **8.5.2 → 8.9.2** (matches `@react-native/gradle-plugin`'s version catalog, removes classpath version conflict); added `com.facebook.react:react-native-gradle-plugin` classpath + `apply plugin: "com.facebook.react.rootproject"`; ext: `buildToolsVersion 35.0.0`, `compileSdkVersion 35` (androidx.core 1.16+ demands ≥35), `minSdkVersion 24`, `targetSdkVersion 34` (kept to avoid runtime behavior changes), `ndkVersion 27.1.12297006` (installed; replaces 26.1.10909125 which wasn't present), `kotlinVersion 2.1.20` (required by lottie's build.gradle) |
| `android/settings.gradle` | Rewritten to RN 0.80 autolinking: `pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }`, `plugins { id("com.facebook.react.settings") }`, `ReactSettingsExtension.autolinkLibrariesFromCommand()`, `includeBuild` of the plugin. Removed all manual `include ':module'` lines and the legacy `native_modules.gradle` apply. |
| `android/app/build.gradle` | Added `react { autolinkLibrariesWithApp() }` — **this is what wires the autolinked library projects into the app's compile/runtime classpath** (the RN gradle plugin does not do this automatically). Deps now `com.facebook.react:react-android` (+ `hermes-android` when Hermes enabled). |
| `android/app/src/main/java/.../MainApplication.java` | Rewritten: `DefaultReactNativeHost` (with `isNewArchEnabled()` / `isHermesEnabled()` overrides), `getReactHost()` via `DefaultReactHost.getDefaultReactHost(context, host, null)`, `onCreate` calls `ReactNativeApplicationEntryPoint.loadReactNative(this)` (replaces `SoLoader.init`). |
| `android/app/src/main/java/.../MainActivity.java` | Rewritten: `DefaultReactActivityDelegate(this, mainComponentName, DefaultNewArchitectureEntryPoint.getFabricEnabled())` (the 0.64 `getReactNativeHost()` constructor no longer exists). |
| `android/app/src/main/AndroidManifest.xml` | `RNPushNotificationBootEventReceiver` given `android:exported="false"` (required on targetSdk 31+; this is where the app manifest, plus Google Maps key and permissions, live). |
| `android/local.properties` | Created: `sdk.dir=/home/workspace/Android/Sdk` (machine-local, gitignored). |

**Environment (machine, not repo):** no JDK existed and `sudo` requires a password →
installed **Temurin JDK 17.0.20** to `/home/workspace/jdk/` and exported
`JAVA_HOME` in `~/.bashrc`. Android SDK already present at
`/home/workspace/Android/Sdk` (platforms 34/35/36, build-tools 35/36, NDK 27.1/29,
AVD `Pixel_9_Pro`).

### 6.4 iOS native

- `ios/Podfile` — rewritten to the modern RN style: `react_native_pods` +
  `prepare_react_native_project!` + `use_native_modules!` + `use_react_native!(path:)`;
  explicit `react-native-maps` pod + `Google-Maps-iOS-Utils`; `post_install` with
  `react_native_post_install` and Bitcode disabled (Xcode 14+).
- `ios/lucky_moon_20705/AppDelegate.{h,m}` — modern `RCTAppDelegate` subclass
  (replaces the old `ReactAppDelegate` + manual `ReactNativeHost`); keeps all
  `react-native-push-notification` iOS delegates.
- `ios/lucky_moon_20705/Info.plist` — deployment target 15.0, Google Maps key,
  remote-notification/URL-scheme entries.
- CI iOS job pinned to macOS + Xcode 15.4.

### 6.5 CI/CD

`.circleci/config.yml`: node job on `circleci/node:20`; android job on
`circleci/android:2024.07` (JDK 17 generation); iOS job on Xcode 15.4.

### 6.6 JS source fixes (syntax errors that blocked bundling)

These pre-existing malformed files only surfaced once a real parser was used:

| File | Fix |
|---|---|
| `src/screens/Common/Login/index.js` | Added the missing `/>` close on the "Forgot password?" `<Text>` (line ~133) |
| `src/screens/Customer/BookingDetails/index.js` | Extra `)` in a conditional-block close (`))}` → `)}`) at the second "ongoing/upcoming" Button block |
| `src/screens/Customer/Task/index.js` | `<View` was missing its `style={{...}}` wrapper (raw style object after a bare `<View`) |
| `src/screens/Customer/PaymentDetailScreen/index.js` | Ternary branch needed parentheses: `cond ? (` around the fragment and `) : null}` close |

### 6.7 `src/redux/store.js` — redux-saga interop fix

`redux-saga@1.3.0` ships an `exports."."` map whose `import` condition points at
`import-condition-proxy.mjs`, which re-exports the CJS proxy's default **twice**
(`_default.default` after Babel's interop already unwrapped it) → the bundle's
default export is `undefined` → `createSagaMiddleware()` crashed on app start.
The `require`/`default` conditions resolve the working CJS entry, so the import is
now:

```js
const createSagaMiddleware = require('redux-saga').default;
```

### 6.8 Asset deduplication

`android/app/src/main/assets/fonts/` contained committed copies of all 16
`react-native-vector-icons` TTFs, which collided with the same files the RNVI
`fonts.gradle` task copies into `build/intermediates` → `mergeDebugResources`
"duplicate resources" failure. The 16 icon fonts were removed from the committed
folder (they're regenerated at build time); the 45 custom app fonts remain there.

### 6.9 node_modules patches (`patches/`, applied by `patch-package` in postinstall)

| Patch | Reason |
|---|---|
| `react-native-snap-carousel+3.9.1` | Package uses removed RN APIs: `ViewPropTypes` (gone in modern RN) and `View.propTypes.style` inside module-scope `propTypes` objects → crash on module load. Replaced the fallback expressions with `PropTypes.any`, removed the `ViewPropTypes` import and the `if (!ViewPropTypes)` warning block. |
| `react-native-input-credit-card+0.5.5` | Same class of bug: unguarded `Text.propTypes.style`, `TextInput.propTypes.style`, `ViewPropTypes.style` in `CCInput.js` / `CreditCardInput.js` / `LiteCreditCardInput.js`. Replaced with `PropTypes.any`. |
| `react-native-payments+0.8.4` | Legacy 2019 module: (a) `compileSdkVersion 28` hard-coded → now `safeExtGet`-based (34+); (b) `com.android.support:support-v4` removed (source uses AndroidX annotations); (c) `abiFilters` updated (arm64-v8a/x86_64 — RN 0.80 ships no 32-bit libs); (d) `lintOptions` → `lint`; (e) removed unused `import com.facebook.react.bridge.ReactBridge` (class removed from RN); (f) `play-services-wallet` pinned to **17.0.0** — the `MaskedWallet`/`FullWallet` Android Pay API this module compiles against was **removed from play-services-wallet 18+**, so 17.0.0 is required for it to compile. See §7. |

### 6.10 Gesture-handler source-set fix (`android/build.gradle`)

`react-native-gesture-handler@2.33.0` registers its paper-architecture codegen
file `paper/src/main/java/com/swmansion/gesturehandler/NativeRNGestureHandlerModuleSpec.java`
under `sourceSets.main.kotlin`. AGP 8 does not compile `.java` files registered in
a **Kotlin** source set, so the class was silently missing from the AAR →
runtime `NoClassDefFoundError: NativeRNGestureHandlerModuleSpec` when the app
loaded packages. The root `android/build.gradle` now adds a `subprojects` hook:

```groovy
subprojects { subproject ->
    subproject.plugins.withId('com.android.library') {
        if (subproject.name == 'react-native-gesture-handler'
                && project.findProperty('newArchEnabled') != 'true') {
            subproject.android.sourceSets.main.java.srcDirs +=
                    ["${subproject.projectDir}/paper/src/main/java"]
        }
    }
}
```

### 6.11 What did *not* change (intentionally)

- **Architecture stays legacy** (`newArchEnabled=false`) — Hermes enabled, paper
  view managers. New Architecture support is a separate migration.
- **`native-base` stays on 2.15.2** — the only usable v2 in the registry; it works
  on React 19 (with legacy-context warnings; see §7).
- **`targetSdkVersion` stays 34** while `compileSdkVersion` moved to 35 — avoids
  Android 15 runtime behavior changes during the upgrade.
- **`backend/` and `frontend/`** were untouched.
- Git: nothing committed (user manages commits).

---

## 7. Known Caveats & Maintenance Notes

### 7.1 native-base v2.15.2 on React 19 (largest remaining risk)

native-base v2 (and `native-base-shoutem-theme`) rely on React's **legacy context
API** (`contextTypes`/`childContextTypes`), which React 19 removed. In practice the
components still render (React 19 degrades legacy context to an empty context and
the shoutem theme falls back to its default theme), but you will see warnings such
as `'%s uses the legacy childContextTypes API which was removed in React 19 …
Styled(Root)'` in logs. Consequences: themed native-base styling may subtly differ
from the 0.64 baseline, and the library will never receive fixes. Used in ~65
files but only ~13 component types (`Button, Card, Container, Content, Footer,
FooterTab, Icon, Input, Picker, Text, Title, Toast, View`). **Long-term
recommendation:** replace these 13 usages with plain RN components + the app's own
`src/components` wrappers, or evaluate `native-base@3` (breaking API, rewrite
required). Until then, treat visual regressions in native-base screens as
library-related, not app-code bugs.

### 7.2 `play-services-wallet` pinned at 17.0.0 (react-native-payments patch)

The Google Pay path in `react-native-payments` uses the **Android Pay**
(`MaskedWallet`/`FullWallet`/`Wallet.Payments`) API, which Google **shut down** and
which was removed from `play-services-wallet` 18+. The pinned 17.0.0 makes the
module *compile*; the actual Google Pay flow cannot work at runtime on modern
devices. Apple Pay (`ApplePayButton`) uses a separate mechanism and is unaffected
by this pin. If Google Pay is a required feature, the module needs a rewrite to
`PaymentsClient`/`PaymentDataRequest` (wallet 19.x API) or a maintained fork.

### 7.3 `redux-saga` import

Keep the `require('redux-saga').default` style (or any `require`) for the **root**
`redux-saga` import — an ESM `import createSagaMiddleware from 'redux-saga'`
resolves the broken `import`-condition proxy under Metro and yields
`default === undefined`. The `redux-saga/effects` subpath is safe (its exports map
has no `import` condition) and all saga files use named imports from it.

### 7.4 Patches & postinstall

- `patches/` must stay in the repo; `postinstall` runs `patch-package`.
  After any `yarn install` / `npm install`, verify with `npx patch-package
  --error-on-fail`.
- To update a patched package: bump the version, re-apply changes in
  `node_modules`, then regenerate with `npx patch-package <pkg>`.
- `scripts/fix-svg-transformer.js` is idempotent (no-ops when already patched).
- If Metro behaves strangely after dep changes: `yarn reset`
  (`react-native start --reset-cache`).

### 7.5 Environment / tooling notes

- **JAVA_HOME**: user-local Temurin JDK 17 in `/home/workspace/jdk/` (system has no
  sudo-accessible package manager setup). If the machine is rebuilt, reinstall the
  JDK (any OpenJDK 17) and re-export `JAVA_HOME`.
- **ANDROID_HOME**: `/home/workspace/Android/Sdk`. `adb` and `emulator` come from
  `platform-tools`/`emulator` (already on PATH via `~/.bashrc`). Existing AVD:
  `Pixel_9_Pro` (API 37.2, x86_64).
- **Gradle**: first build downloads the 8.14.3 distribution (~200 MB) and Maven
  artifacts; a transient "Network is unreachable" from `dl.google.com` was observed
  once — just re-run.
- **Registry mirror**: the npm mirror caps several packages (e.g.
  `@react-native-community/clipboard` tops out at 1.5.1,
  `react-native-snap-carousel` at 3.9.1). When a "newer version needed" fix is
  unavailable there, use `patches/` instead.
- **`react-navigation` v7** was migrated mechanically (navigator definitions were
  already in JSX style; the 13 legacy `react-navigation-stack` feature navigators
  were dead code and deleted). After any navigation library update, spot-check
  tab bar and header options — v7 renamed a few (`cardStyle` deprecation,
  `headerBackButtonDisplayMode`, etc.).
- **redux/redux version skew**: `redux@4.2.1` with `react-redux@9.2.0`
  (peerOptional redux 5) installed under `--legacy-peer-deps`. Works today; if a
  future upgrade touches the redux stack, consider moving to redux 5.
- **CircleCI** config targets the new toolchain, but the android job will still
  need a JDK/Gradle setup consistent with §6.3 when first run.

### 7.6 Fast troubleshooting map

| Symptom | Likely cause / fix |
|---|---|
| `JAVA_HOME is not set` | `source ~/.bashrc` (or re-export; see §5.1) |
| `adb: not found` / "No emulators found" | `ANDROID_HOME`/PATH not in the current shell → `source ~/.bashrc` |
| "Minimum supported Gradle version" error | AGP/Gradle skew; keep AGP 8.9.2 + Gradle 8.14.3 |
| `Plugin with id 'com.facebook.react' not found` | `settings.gradle` not in RN 0.80 style, or `@react-native/gradle-plugin` missing from node_modules |
| `compileDebugJavaWithJavac` "is not specified" on a library | That library hardcodes `compileSdkVersion 28` (was react-native-payments; now patched) |
| Runtime `NoClassDefFoundError: …ModuleSpec` | A library registered codegen `.java` in a Kotlin source set (gesture-handler pattern; root-build hook in §6.10) |
| "Duplicate resources" on font TTFs | Committed icon-font copies vs RNVI gradle copy (§6.8) |
| `Cannot read property 'style' of undefined` in logs | A module-scope `X.propTypes`/`ViewPropTypes` access in a dep (snap-carousel/input-credit-card pattern; §6.9) |
| `createSagaMiddleware is not a function` | ESM default import of redux-saga root (§7.3) |
| "Failed to download JS bundle" + TransformError | Stale Metro Babel cache → `yarn reset`; or a node_modules patch not applied → `npx patch-package` |
| JS error but blank screen | Enable a temporary `ErrorUtils.setGlobalHandler` in `index.js` to capture stacks, then remove it |

### 7.7 Verification checklist (re-run after major changes)

```bash
# JS bundles (all four must succeed)
npx react-native bundle --platform android --dev true  --entry-file index.js --bundle-output /tmp/a1.js --assets-dest /tmp/a1-assets
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output /tmp/a2.js --assets-dest /tmp/a2-assets
npx react-native bundle --platform ios     --dev true  --entry-file index.js --bundle-output /tmp/i1.js --assets-dest /tmp/i1-assets
npx react-native bundle --platform ios     --dev false --entry-file index.js --bundle-output /tmp/i2.js --assets-dest /tmp/i2-assets

# Android build + install
cd android && ./gradlew assembleDebug && ./gradlew app:installDebug

# Run Metro, then launch and watch for JS errors
adb logcat -c; adb shell am start -n com.lucky_moon_20705/.MainActivity
adb logcat | grep -E "ReactNativeJS"
```

---

*End of document.*
