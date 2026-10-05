# React Native 0.64.2 → 0.80 Upgrade Plan — `lucky_moon_20705`

> Prepared: 2026-10-01
> Scope: Bare React Native app (Android + iOS + JS). The `frontend/` folder (separate CRA web project) is **out of scope**.
> Target: React Native **0.80** (React **19.1.0**), in a fully buildable, working state on both platforms.

---

## 1. Executive Summary

This app was generated with an RN 0.64-era template (late 2021) and has accumulated 16 major versions of drift. Upgrading straight to 0.80 in one step is **not safe**. The plan below:

1. Audits the current state (§2) and flags what must change.
2. Fixes the developer toolchain **before** touching React Native (§3).
3. Upgrades in **staged checkpoints** (0.64 → 0.72 → 0.76 → 0.80), using the official **React Native Upgrade Helper** at each step (§5).
4. Carries a complete dependency migration matrix for every native module (§6).
5. Documents all Android/iOS native file changes (§7, §8), JS-level breaking changes (§9), CI/CD updates (§10), risks (§11), and rollback strategy (§12).

**Biggest risks** (details in §11):

| # | Risk | Why |
|---|------|-----|
| 1 | **native-base v2** used in ~40 files | Unmaintained, built against RN 0.6x internals; the single largest UI-compat risk on 0.80 |
| 2 | **react-native-screens / safe-area-context / gesture-handler** pinned to 2021 alpha/early versions | Navigation stack will not work on 0.80 without 3.x/4.x/2.x |
| 3 | **@react-native-firebase 12.7.2 → 21.x** | 9 major versions; Podfile autolinking + native SDK bumps |
| 4 | **react-native-maps 0.28 → 1.x** | Pod wiring changed; Google Maps key must move to Info.plist |
| 5 | **Hermes disabled + JSC** | 0.80 is the **last** RN version with first-party JSC; enable Hermes |
| 6 | **Android build system** (Gradle 6.7 / AGP 3.5.2 / compileSdk 28 / jcenter) | jcenter is dead; 0.80 needs Gradle 8.x / AGP 8.x / SDK 34 / JDK 17 |
| 7 | **iOS Xcode 11 project + manual pod hacks** | Needs Xcode 15.1+ and modern Podfile (0.80 template style) |
| 8 | **Un-declared `src/` import alias** | App resolves `from 'src/...'` via a `src/package.json` hack; must be made explicit in Metro (§4.5) |

---

## 2. Current State Audit

### 2.1 Core versions (from `package.json`)

| Item | Current | Notes |
|------|---------|-------|
| react-native | **0.64.2** | |
| react | **17.0.1** | 0.80 requires **19.1.0** |
| react-native-screens | **1.0.0-alpha.22** | Alpha from 2019/2020! |
| react-native-safe-area-context | 3.1.9 | |
| react-native-gesture-handler | 1.10.3 | |
| react-native-reanimated | 1.9.0 | **Not imported anywhere in `src/`** (verified by grep) — removable unless UI Kitten needs it |
| react-native-svg | 12.1.1 | |
| react-native-svg-transformer | 1.0.0 | Old config style (`babelTransformerPath`) |
| native-base | 2.15.2 | ~40 files import it (Container/Content/Icon/Picker/Input/…) |
| react-navigation (v4 core) | 4.4.3 | Used only by dead `src/navigator/mainNavigator.js` (§4.4) |
| @react-navigation/* (v5) | 5.9–5.14 | The **live** navigation stack |
| @react-native-firebase/{app,auth,firestore} | 12.7.2 | |
| react-native-maps | 0.28.0 | |
| react-native-vector-icons | 6.6.0 | |
| lottie-react-native / lottie-ios | 4.0.3 / **3.2.3** | lottie-ios pinned as an npm package — very old |
| @react-native-picker/picker | 2.2.1 | |
| @react-native-community/async-storage | 1.12.1 | |
| @react-native-community/{slider, checkbox, clipboard, masked-view, toolbar-android} | 2021-era | |
| redux / react-redux / redux-saga / redux-persist | 4.0.5 / **7.1.3** / 1.1.3 / 6.0.0 | react-redux 7.x does **not** support React 19 |
| axios | **0.19.0** | 2019-era |
| moment | 2.27.0 | Optional: replace with day.js for size |
| jest / babel-jest | 26.6.3 | |
| eslint | 7.14.0 | |
| patch-package | 6.4.7 | One stale patch: `react-native+0.62.2.patch` (app is on 0.64 → patch never applies; remove) |
| Odd deps | `watchman`, `emoji-picker-react` (a **web** library), `dotenv` | Clean up |

### 2.2 Android (android/)

| Item | Current | Target (0.80) |
|------|---------|---------------|
| Gradle | 6.7 | 8.x (match 0.80 template) |
| Android Gradle Plugin | **3.5.2** | 8.5.x |
| compileSdk / targetSdk | **28 / 28** | 34 / 34 |
| minSdk | 21 | 21 (keep) |
| JDK | not pinned (build uses old default) | **JDK 17** |
| Repositories | `jcenter()` (dead since 2021) | google() + mavenCentral() only |
| react dep | `compile "com.facebook.react:react-native:0.64.2" { force = true }` + `implementation` duplicate | single `implementation` line, no version pin |
| Multidex | `com.android.support:multidex` (old support lib) | `androidx.multidex:multidex` or drop (minSdk 21 → default) |
| Hermes | **disabled** (`enableHermes: false`) | **enabled** |
| Flipper | 0.33.1 wired manually | optional; keep or drop |
| google-services plugin | 4.3.8 | 4.4.2 |
| BUCK files | `_BUCK`, `build_defs.bzl`, `.buckconfig` | remove (BUCK is dead) |
| Native modules wiring | `native_modules.gradle` from `@react-native-community/cli-platform-android` | 0.80 template style (`autolinkLibraries` via `react.gradle` / `RCTReactNativeProject`) |

### 2.3 iOS (ios/)

| Item | Current | Target (0.80) |
|------|---------|---------------|
| Xcode | 11.1 (CircleCI image) | **15.1+** |
| Podfile platform | `:ios, '12.0'` | 13.4+ (0.80 template minimum) |
| Podfile style | `require_relative 'native_modules'`, manual `use_native_modules!`, manual `DoubleConversion`/`glog` podspecs | modern 0.80 `use_react_native!` template style |
| post_install hacks | `find_and_replace` Xcode 12.5 beta patches on RN sources | **remove entirely** (no longer needed) |
| Hermes | disabled | enabled |
| AppDelegate.m | old `RCTBridge` + manual `RCTRootView` + hardcoded Google Maps key `[GMSServices provideAPIKey:@"…"]` | 0.80 template style (`RCTAppDelegate` / `ReactAppDelegate`), Maps key in `Info.plist` |
| Firebase pods | manual `pod 'Firebase/Core'`, `pod 'Firebase/Auth'`, … and `pod 'RNFBAuth', :path => …` | autolinked by RNFB 21.x; drop manual lines |
| Maps pods | `pod 'react-native-maps'`, `pod 'react-native-google-maps'`, `pod 'GoogleMaps'`, `Google-Maps-iOS-Utils` | maps 1.x wiring (§8.3) |
| Lottie pods | manual `pod 'lottie-react-native'` + `pod 'lottie-ios'` (3.2.3) | autolinked lottie 6.x+ |
| Launch screen | `LaunchScreen.xib` + `UIRequiresDeviceCapabilities: armv7` | storyboard-based per 0.80 template; drop armv7 requirement |
| Info.plist | many vector-icons fonts + custom fonts | keep font list; add Maps key |

### 2.4 JavaScript / app code findings

- **No deep imports** of `react-native/Libraries/…` anywhere in `src/` or `App.js` (verified by grep) — the 0.80 deep-import deprecation is low risk for this codebase.
- **Bare `src/...` alias imports** are used in ~40+ files (`import {Colors} from 'src/theme'`, `from 'src/screens/Common'`, etc.) but there is **no alias in `metro.config.js`**. Resolution currently relies on the `src/package.json` (`{"name": "src"}`) trick + Metro's internal resolution. This **must** be made explicit with `resolver.alias` in `metro.config.js` before/after the upgrade, or the app will break when Metro's resolver changes (§4.5).
- **Dead legacy navigation**: `src/navigator/mainNavigator.js` imports `react-navigation` v4 + `react-navigation-stack` + `react-navigation-drawer` (the latter two aren't even in `package.json`) and is not referenced by the live app (`App.js` → `src/navigator/index.js` → @react-navigation v5). **Delete `mainNavigator.js`** (and review the unused `src/features/*` template folders).
- **redux store** (`src/redux/store.js`) uses `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` with a `persistCombineReducers` + saga setup — fine, but `react-redux` must move to **9.x** for React 19.
- **Jest haste warning** in terminal: `Haste module naming collision: src` caused by `src/package.json`. Remove/replace `src/package.json` once the explicit Metro alias is in place.
- `index.js` entry + `AppRegistry.registerComponent` — keep as is.
- `.env` contains a **Google Maps API key** (`API_KEY=…`) and it is also **hardcoded in `AppDelegate.m`**. Move it to `Info.plist` (`GMSServicesApiKey`) / Android manifest `meta-data` — stop hardcoding.
- Patches folder contains only `react-native+0.62.2.patch` (stale; app is on 0.64). Remove it.
- `android/app/src/main/assets/index.android.bundle` is a checked-in prebuilt bundle — verify it is not what ships (gradle release build should regenerate it).

### 2.5 CI (CircleCI)

- Node image: `circleci/node:10` → **node:20** (0.80 needs Node ≥ 18).
- Android image: `circleci/android:api-28-node` (ancient) → an image with Android SDK 34 + JDK 17 (e.g. `circleci/android:2024-04`-class or a custom Dockerfile).
- iOS: `xcode: "11.1.0"` + `macos` (unnamed) → **macos-13/14 image with Xcode 15.1+**; update CocoaPods step; add Pod cache keyed on `Podfile.lock`.
- Ruby 2.5 pin in CI is obsolete.

---

## 3. Phase 0 — Toolchain Prerequisites (do this first, before any RN bump)

React Native 0.80 requires: **Node ≥ 18 (use 20 LTS), JDK 17, Android SDK 34 (compile/target 34, build-tools 34.0.0), Xcode 15.1+, CocoaPods 1.13+, Android Studio Hedgehog+**.

1. **Node**: install Node 20 LTS (system node is v24 — that also works for 0.80, but pin with `.nvmrc` to avoid surprises; some 2021-era tooling misbehaves on bleeding-edge Node).
2. **JDK 17**: install Temurin/OpenJDK 17; point `JAVA_HOME` at it. (Current environment has no `java` at all — install required.)
3. **Android Studio**: update to a 2023.1+ release, install SDK 34 + build-tools 34 + platform-tools; accept licenses (`sdkmanager --licenses`).
4. **Xcode 15.1+** on a macOS 13/14 machine (CI macOS runner must match).
5. **CocoaPods**: `gem install cocoapods` (1.13+).
6. Create a dedicated upgrade branch: `git checkout -b upgrade/rn-0.80` from a tagged, known-good `main` (`git tag v-pre-upgrade`).
7. **Baseline**: build both apps successfully on 0.64 (debug + release) and record:
   - APK/A-IPA install + launch + one full user-flow smoke test (login → home → task → chat → notifications → profile) on a real Android device (API 28+ emulator ok) and iOS 15+ simulator/device.
   - `yarn test` (jest) results.
   - App size (APK/A-IPA) — 0.80 should be **smaller** (prebuilt `ReactNativeDependencies.xcframework` on iOS, better Android packaging).
8. Remove stale `patches/react-native+0.62.2.patch` and `android/app/_BUCK`, `android/app/build_defs.bzl`, `.buckconfig`.

**Gate:** toolchain verified; baseline builds + smoke test recorded. No RN changes yet.

---

## 4. Phase 1 — Codebase Prep (still on 0.64)

Make low-risk cleanups now so every later step is cleaner. Commit each item separately.

### 4.1 Dead code
- Delete `src/navigator/mainNavigator.js` (react-navigation v4, broken imports).
- Delete `react-navigation` (v4) from `package.json` — the live app uses @react-navigation v5 only. (Verify with grep first: `rg "react-navigation'" src` should hit only v5 imports.)
- Review `src/features/*` — most look like unused Branch template leftovers; keep only `UserProfile116469` if actually referenced (grep imports).
- Remove `watchman`, `emoji-picker-react` from `dependencies`; remove `react-native-reanimated` **if** UI Kitten doesn't need it (it's not imported in `src/` — try removing and run UI Kitten screens; if fine, drop it and `@react-native-community/masked-view` too).

### 4.2 Fix the `src/` alias explicitly
`metro.config.js` → add an explicit alias (replace the `src/package.json` hack):

```js
const path = require('path');
const {getDefaultConfig} = require('metro-config');

const config = getDefaultConfig(__dirname);
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((e) => e !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];
config.resolver.alias = {
  src: path.resolve(__dirname, 'src'),
};
module.exports = config;
```

Then delete `src/package.json` (fixes the jest haste collision warning). Verify app boots and jest runs.

### 4.3 Small JS modernizations (safe on 0.64, removes landmines for React 19)
- Replace `axios` 0.19 → **1.x** in `src/utils/XHR.js` (API-compatible for the uses here).
- `react-redux` 7.1.3 → **9.x** (works with React 17 *and* 19; de-risks the final step). Also `@types/react-redux` not needed (JS project).
- `uuid` 3.3.2 → 9.x (or keep; low priority).
- Keep `redux` 4.x, `redux-saga` 1.x, `redux-persist` 6.x (all fine with React 19).
- Migrate `native-base` `Toast` import in `src/screens/Common/NewPassword/redux/sagas.js` to `react-native-flash-message`/`react-native-toast-message` already used in the app (cuts native-base surface area by one file).

### 4.4 Make the app "upgrade-helper friendly"
- Ensure `package.json` `"name"` matches the app; ensure `app.json` name matches iOS `moduleName`.
- No file-level RN source patches remain (stale patch already removed in Phase 0).

### 4.5 Pin the list of screens that must be verified after upgrade
1. Splash / Auth (AuthMain, Login, Register, OTP/Verification, ForgotPassword, TermsAndCondition)
2. Employee: Home, Task, AddService, TrackOrderDetail, HomeV2, Profile, Chat/Messages, Notifications, ChangePassword/NewPassword
3. Customer: MyBookings, AvailableBookingSlots, CreateBooking, BookingDetails, TaskDetail, TaskRebook, PastOrders, PendingTask, ServiceProfile, EventsList, EventDetails
4. Push notification foreground/background/receive events (both platforms)
5. Google Maps rendering + directions + geocoding
6. Payments (react-native-payments) flow
7. Media recorder (video/voice) flow
8. Firebase auth + firestore reads/writes
9. All icon fonts (vector-icons) and custom fonts rendering
10. Lottie animations

**Gate:** app still builds & smoke-tests on 0.64 after cleanup.

---

## 5. Phase 2 — Staged React Native Upgrades

Use the **React Native Upgrade Helper** (https://react-native-community.github.io/upgrade-helper/) at **every** step: set app name `lucky_moon_20705`, package `com.lucky_moon_20705` / `com.lucky_moon_20705`, from→to versions, and apply its generated diffs to `android/`, `ios/`, and `package.json` files. The helper produces the canonical template diff; your customizations (fonts, google-services, manifest keys, signing) must be preserved — the helper prompts on conflicts.

Repeat this loop **per checkpoint**:

```
1. npx react-native upgrade <target>        # applies template diff w/ interactive conflicts
   (or apply upgrade-helper diff manually per file)
2. yarn (fresh install; delete node_modules + lockfile churn where advised)
3. Apply the dependency bumps listed for that checkpoint (§6)
4. Clean native:
   - android: ./gradlew clean  (new project dir? no — keep customizations)
   - ios: pod deintegrate && pod install --repo-update (or rm -rf Pods + pod install)
5. yarn start && run on device; run the §4.5 smoke list
6. yarn test && yarn lint
7. git commit  ("RN 0.6x → 0.7x")
```

### Checkpoint A: 0.64.2 → 0.72 (landing pad for 2022-era ecosystem)
Focus: modernize build system incrementally without jumping the JDK.
- Gradle 6.7 → 7.x; AGP 3.5.2 → **7.0.1/7.1.3**; **JDK 11** for this step.
- compileSdk/targetSdk → 31/31 (0.72 template). minSdk stays 21.
- `jcenter()` → `mavenCentral()` (build.gradle, both buildscript and allprojects).
- `android.enableJetifier` can stay true for now (some 2021-era libraries still pull support libs); revisit at 0.76.
- Flipper: keep (still in 0.72 template) or remove if unused in dev.
- JS: `react-native-gesture-handler` 1.10.3 → **1.10.3 stays** (2.x comes at checkpoint C to match reanimated-free nav); `react-native-screens` → **3.x** and `react-native-safe-area-context` → **4.x** **now** (react-navigation v5 needs them; doing it early isolates nav breakage from the React 19 step).
- `react-native-svg` → 13.x; `react-native-svg-transformer` → 1.1.x (config stays same style).
- `@react-native-firebase` 12 → **14.x** (0.72-compatible; follow RNFB upgrade guide 13→14 changelogs).
- `lottie-react-native` → 5.x; drop the `lottie-ios` npm pin and manual pod.
- `@react-native-picker/picker` → 2.4.x; `react-native-maps` → 0.31.x (still old wiring, fine at this step).
- `react-native-vector-icons` → 7.1.0+.
- Hermes: keep disabled for this checkpoint (flip at C).
- iOS: platform 12.0 → 11.0/13.0 per helper; keep old Podfile style (0.72 still uses it); Xcode 13.4+.

### Checkpoint B: 0.72 → 0.76 (Hermes on, JDK 17, build system lands)
- **JDK 17** becomes mandatory (0.73). AGP → 7.3.0+ (0.73 template) / 8.1.1 (0.76 template); Gradle 7.5+/8.x.
- 0.73: codegen for native modules — install `react-native-codegen` if prompted; **enable Hermes** (`enableHermes: true` + Podfile `:hermes_enabled => true` / modern flag).
- 0.73: `use_react_native!` modern Podfile form introduced by helper — apply it; delete `DoubleConversion`/`glog` manual pods and the `post_install` `find_and_replace` hacks (they target files that no longer exist).
- `@react-native-firebase` → **17–19.x** (0.76-compatible; follow changelogs 15→19).
- `react-native-maps` → **1.9.x** (new autolinking; Podfile changes: single `pod 'react-native-maps', :path => ...` + `pod 'Google-Maps-iOS-Utils'` for directions; move Maps key to `Info.plist` `GMSServicesApiKey` + Android manifest meta-data `com.google.android.geo.API_KEY`).
- `lottie-react-native` → 6.x.
- `react-native-gesture-handler` → **2.x** (wrap app root in `GestureHandlerRootView` in `App.js`; imports of `ScrollView`/`TouchableOpacity`/`TextInput` from it stay valid).
- `native-base` v2: known to degrade on 0.73+ (internal style/deep-import changes). **Decision point:** keep + patch via `patch-package` if build succeeds (validate §4.5 screens), else start the §9.3 UI-kit migration in parallel.
- `axios`, `react-redux` already modernized in Phase 1.

### Checkpoint C: 0.76 → 0.80 (the target)
- Helper diff 0.76 → 0.80: template changes are small (Gradle 8.8/AGP 8.5.2 alignment, Kotlin 2.1.20, `New Architecture` opt-in flag, iOS prebuilt `ReactNativeDependencies.xcframework` — free size win).
- **React 17 → 19.1.0** (`react` + `react-native` + `react-test-renderer` all to matching versions; `jest`/`babel-jest` → 29.7).
- ESLint 7 → 8 (with `@react-native-community/eslint-config` 3.x); fix any new `react-hooks` (v5) lint errors.
- Verify **no deep imports** (already grep-clean in Phase 1; re-grep after helper diffs).
- **Architecture decision (§11.1):** enable New Architecture (`newArchEnabled=true` / `:new_arch_enabled => true`) **only if** every native module in §6 supports it; otherwise stay Legacy (frozen but still shipped in 0.80). Recommendation for this app: **start on Legacy at 0.80** (fewer native modules to validate), treat New Arch as the follow-on upgrade to 0.83+.
- jcenter removal already done; drop `android.enableJetifier` only if no library still uses support libs (check `./gradlew :app:dependencies | grep "com.android.support"`).
- Hermes stays on. Confirm release build uses Hermes bytecode (`hermes` enabled in release flavor).
- `@react-native-firebase` → **21.x** (0.80-compatible). Remove the manual `pod 'Firebase/…'` + `pod 'RNFBAuth', :path` lines from Podfile (autolinked now); regenerate `GoogleService-Info.plist` / `google-services.json` if project config changed.
- `react-native-push-notification` → **8.1.2** (AppDelegate `RNCPushNotificationIOS` delegate methods unchanged; re-test push on both OSes).
- `@react-native-community/checkbox` → **2.x** (API change: `value`/`onValueChange` props; update usages) or stay 0.5.x if it compiles legacy-arch.
- `@react-native-community/slider` → 4.x; `@react-native-community/clipboard` → 4.x (API identical).
- `react-native-permissions` → 4.x; `react-native-image-picker` → 7.x; `react-native-pager-view` → 6.x; `react-native-modal` → 13.x; `react-native-date-picker` → 4.2.x+ (verify iOS min target).
- `react-native-maps-directions` 1.8.0 — verify it builds against maps 1.x (it only wraps Google-Maps-iOS-Utils; if broken, implement the small directions call directly against Google-Maps-iOS-Utils).
- `pubnub-react` 2.0.0, `react-native-media-recorder` 1.6.6, `react-native-payments` 0.8.4, `@react-native-community/geolocation` 2.0.2, `@twotalltotems/react-native-otp-input`, `react-native-app-intro-slider` 4.0.4, `react-native-calendars`, `react-native-geocoding`, `react-native-toast-message`, `react-native-flash-message`, `react-native-snap-carousel`, `react-native-tab-view`, `react-native-ratings`, `react-native-input-credit-card`, `react-native-keyboard-aware-scroll-view`, `react-native-elements` 3.4.x, `zustand` 4.x, `moment`, `lodash`, `prop-types`, `@react-native-community/toolbar-android`, `@react-native-community/async-storage` → final check §6 table.
- After clean install: `pod install`, `./gradlew clean assembleDebug`, build both platforms, run full §4.5 smoke list, run jest + eslint, produce release builds and test payments/push/maps on device.

**Gate:** 0.80 debug + release builds work on Android (API 24/28/34) and iOS (15/16 sim + device). All §4.5 flows green.

---

## 6. Dependency Migration Matrix (final state at 0.80)

| Package | From | To | Notes |
|---|---|---|---|
| react-native | 0.64.2 | 0.80.x | staged via helper |
| react | 17.0.1 | 19.1.0 | matches 0.80 |
| react-test-renderer | 17.0.1 | 19.1.0 | match react |
| jest / babel-jest | 26.6.3 | 29.7.0 | preset `react-native` now ships in RN ≥0.73 |
| @babel/core, @babel/runtime | ^7.12 | ^7.24+ | |
| metro-react-native-babel-preset | ^0.64 | ^0.80 | match RN |
| eslint | 7.14 | 8.57 | + `@react-native-community/eslint-config` ^3 |
| react-native-screens | 1.0.0-alpha.22 | 3.34.0 (legacy) / 4.2.0 (new arch) | nav-critical; do at checkpoint A |
| react-native-safe-area-context | 3.1.9 | 4.11.x | checkpoint A |
| react-native-gesture-handler | 1.10.3 | 2.20.x | checkpoint B; add `GestureHandlerRootView` |
| react-native-svg | 12.1.1 | 15.8.x | checkpoint B |
| react-native-svg-transformer | 1.0.0 | 2.1.x | switch to `resolveRequest`-based config; update metro.config.js accordingly |
| native-base | 2.15.2 | 2.15.2 + patch-package (or migrate, §9.3) | **highest-risk item** |
| @react-native-firebase/{app,auth,firestore} | 12.7.2 | 21.x | 3 sub-steps (14 → 19 → 21); Podfile autolink |
| react-native-maps | 0.28.0 | 1.18.x | Podfile + Info.plist key |
| react-native-maps-directions | 1.8.0 | 1.8.0 (verify) | depends on maps + Google-Maps-iOS-Utils |
| react-native-vector-icons | 6.6.0 | 10.2.0 | fonts unchanged |
| lottie-react-native | 4.0.3 | 6.7.x | drop `lottie-ios` npm dep + manual pods |
| @react-native-picker/picker | 2.2.1 | 5.3.x | |
| @react-native-community/async-storage | 1.12.1 | 2.1.x (or `@react-native-async-storage/async-storage` 2.2.x — same API, rename import) | |
| @react-native-community/slider | 3.0.0 | 4.5.x | |
| @react-native-community/checkbox | 0.5.8 | 2.2.x (API: `value`/`onValueChange`) | |
| @react-native-community/clipboard | 1.5.1 | 4.4.x | |
| @react-native-community/geolocation | 2.0.2 | 2.1.x | mostly JS; verify |
| @react-native-community/masked-view | 0.1.11 | 0.1.11 (remove if unneeded after reanimated removal) | |
| @react-native-community/toolbar-android | 0.1.0-rc.2 | keep / verify usage | grep usages; likely removable |
| @react-native-community/cli-platform-android | 8.0.2 | **remove** | wiring now in RN template files |
| react-native-reanimated | 1.9.0 | remove (unused in code) — or 3.16.x if UI Kitten needs it | if kept with Legacy arch on 0.80: max 3.14.x |
| @ui-kitten/components | 5.1.1 | 5.3.0 | + `@eva-design/eva` 2.2.0, `react-native-ui-kitten` 5.x |
| react-native-push-notification | 7.3.1 | 8.1.2 | + `@react-native-community/push-notification-ios` stays |
| react-native-permissions | 3.2.0 | 4.1.x | |
| react-native-image-picker | 4.7.3 | 7.1.x | |
| react-native-pager-view | 5.4.0 | 6.3.x | |
| react-native-modal | 12.0.2 | 13.0.1 | |
| react-native-date-picker | 4.2.9 | 4.3.x (or 5.x) | |
| react-native-app-intro-slider | 4.0.4 | 4.0.4 (verify) | |
| react-native-calendars | 1.1264.0 | 1.13xx | pure JS |
| react-native-flash-message | 0.1.23 | 0.14.x (verify) | |
| react-native-toast-message | 1.4.9 | 2.2.x | |
| react-native-elements | 3.4.2 | 3.4.3 | avoid v5 (breaking) |
| react-native-snap-carousel | 3.9.1 | 3.9.1 | pure JS, verify |
| react-native-tab-view | 3.1.1 | 3.5.x | |
| react-native-ratings | 8.1.0 | 8.1.1 | |
| react-native-geocoding | 0.5.0 | 0.5.0 (verify) | JS wrapper around geolocation API |
| react-native-google-places-autocomplete | 2.4.1 | 2.6.x | |
| react-native-input-credit-card | 0.5.5 | 0.5.x (verify) | |
| react-native-keyboard-aware-scroll-view | 0.9.1 | 0.9.5 | pure JS |
| pubnub-react | 2.0.0 | 2.0.0 (**verify builds on 0.80**; native module — if unmaintained, migrate chat to PubNub JS SDK over WebSocket instead of native) | **check vendor** |
| react-native-media-recorder | 1.6.6 | 1.6.6+ (verify) | native; test mic/camera perms |
| react-native-payments | 0.8.4 | 0.8.4 (verify) | native; test on device |
| @twotalltotems/react-native-otp-input | 1.3.11 | 1.4.x (verify) | |
| axios | 0.19.0 | 1.7.x | done in Phase 1 |
| react-redux | 7.1.3 | 9.1.x | done in Phase 1 |
| redux / redux-saga / redux-persist | 4.0.5 / 1.1.3 / 6.0.0 | 4.2.1 / 1.3.0 / 6.10.0 | |
| zustand | 4.3.8 | 4.5.x | |
| moment | 2.27.0 | 2.30.x (or day.js 1.11.x to cut ~25KB×4-arch) | |
| lodash | 4.17.20 | 4.17.21 | |
| uuid | 3.3.2 | 9.0.1 (ESM-safe) | |
| patch-package | 6.4.7 | 6.6.x / 7.x | keep for native-base patch if needed |
| react-native-debugger-open | 0.3.24 | keep (dev-only) | |
| dotenv / react-native-dotenv / @types/react-native-dotenv | 10 / 0.2 | same | babel preset unchanged |
| prop-types | ^15.7 | ^15.8 | |
| Removed | `watchman`, `emoji-picker-react`, `lottie-ios`, `react-navigation` (v4), `@react-native-community/cli-platform-android`, `jsc-android` (implicit) | — | cleanup |

**Verification rule for "verify" items:** after `yarn install`, the only acceptance test is *clean build on both platforms + smoke test of the feature that uses it*. If a 2021-era native library refuses to compile on 0.80 (ABI/compile errors), replace with the listed alternative or a maintained fork; document in the risk register.

---

## 7. Android Native Changes (concrete, cumulative to 0.80)

1. **`android/build.gradle`** (top level) — rewrite to 0.80 template:
   - `buildToolsVersion = "34.0.0"`, `minSdkVersion = 21`, `compileSdkVersion = 34`, `targetSdkVersion = 34`
   - `classpath("com.android.tools.build:gradle:8.5.2")` (match helper), `classpath 'com.google.gms:google-services:4.4.2'`
   - repositories: `google()`, `mavenLocal()`, `mavenCentral()` — **no jcenter**
   - `allprojects` repositories: `google()`, `mavenCentral()`, jitpack (only if some dep needs it), + RN maven dirs kept as in helper output
2. **`android/app/build.gradle`**:
   - Remove `compile ("com.facebook.react:react-native:0.64.2") { force = true }`; keep single `implementation "com.facebook.react:react-native:+"` (or template version pin)
   - `project.ext.react = [entryFile: "index.js", enableHermes: true]`
   - Replace `implementation 'com.android.support:multidex:1.0.3'` with `implementation 'androidx.multidex:multidex:2.0.1'` (or remove if minSdk 21 and no legacy lib)
   - Flipper block: keep with `FLIPPER_VERSION=0.205.0` (0.80-compatible) or delete
   - Hermes block: keep template form (aars now under `node_modules/hermes-engine/android/`)
   - Remove `task copyDownloadableDepsToLibs` (BUCK, dead)
   - Native modules wiring: replace `native_modules.gradle` line with template autolink (0.73+ style: `apply from: file("../../node_modules/react-native/react.gradle")` + new arch flags per helper)
   - `packagingOptions pickFirst libc++_shared.so` → template's `packagingOptions` (kept)
3. **`android/gradle.properties`**:
   ```
   org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
   android.useAndroidX=true
   android.enableJetifier=true   # remove at 0.80 if no support-lib transitive remains
   # Hermes default true in 0.80 template; set explicitly:
   hermesEnabled=true            # (flag name per template: enableHermes / hermesEnabled)
   newArchEnabled=false          # Legacy at 0.80 (see §11.1); flip later
   ```
   Keep the `MYAPP_RELEASE_*` keystore vars (prefer moving to `gradle.properties` outside git or CI secrets — they are currently committed in plaintext; **recommend rotating/externalizing**).
4. **`android/gradle/wrapper/gradle-wrapper.properties`** → `gradle-8.8-bin.zip` (template value).
5. **`android/app/src/main/AndroidManifest.xml`**:
   - `android:extractNativeLibs`/`largeHeap` per template; ensure `INTERNET` + `ACCESS_COARSE/FINE_LOCATION` + `CAMERA` + `RECORD_AUDIO` perms present (check geolocation/media-recorder/geocoding usage)
   - Add Google Maps meta-data: `<meta-data android:name="com.google.android.geo.API_KEY" android:value="@string/google_maps_key"/>` (string built from `.env`/CI, not hardcoded)
   - Keep Firebase permissions (`com.google.android.gms.permutation…` — actually FCM: `com.google.android.c2dm.permission.RECEIVE`)
6. **`android/app/src/debug/AndroidManifest.xml` + `ReactNativeFlipper.java`**: keep if Flipper kept; else remove both.
7. **`android/app/google-services.json`**: unchanged (regenerate only if Firebase project changed).
8. **Delete**: `android/app/_BUCK`, `android/app/build_defs.bzl`, root `.buckconfig`.
9. **Signing**: `luckymoon.keystore` + passwords in `gradle.properties` — committed to git; rotate + move to CI env for release.
10. **`hermes`**: after enabling, `./gradlew clean` + fresh build; verify startup log shows Hermes on device.

---

## 8. iOS Native Changes (concrete, cumulative to 0.80)

1. **`ios/Podfile`** — rewrite to 0.80 template shape:
   ```ruby
   platform :ios, min_ios_version_supported
   require Pod::Installer::Xcode::PodFileSanitizer.pod_target_dependency_callbacks if ... # per template

   target 'lucky_moon_20705' do
     use_react_native!(
       :path => relative_path('../node_modules/react-native'),
       :app_path => relative_path('./')
     )

     # Maps (react-native-maps 1.x)
     pod 'react-native-maps', :path => '../node_modules/react-native-maps'
     pod 'Google-Maps-iOS-Utils'

     # Firebase: autolinked by @react-native-firebase 21.x — remove manual Firebase/Core|Auth|Firestore|Analytics + RNFBAuth pod lines
     # Lottie: autolinked — remove manual lottie-react-native / lottie-ios pod lines
     # react-native-permissions pods: now autolinked — remove the four Permission-* lines
     # react-native-payments: autolinked (remove manual line if autolink works, else keep :path line)

     target 'lucky_moon_20705Tests' do
       inherit! :complete
     end
   end
   ```
   - **Remove** the entire `post_install do |installer| … find_and_replace … end` block (patches RN sources that no longer exist on 0.73+; keeping it will crash `pod install`).
   - Keep tvOS target or remove if unused.
2. **`ios/lucky_moon_20705/AppDelegate.{h,m}`** — regenerate from 0.80 template (uses `RCTAppDelegate`/`ReactAppDelegate` + `RCTTurboModuleManagerDelegate`), **preserving**:
   - Push notification delegate methods (`RNCPushNotificationIOS didRegisterForRemoteNotifications…`, `didReceiveRemoteNotification`, `didFailToRegister`, `userNotificationCenter:didReceiveNotificationResponse:`, `willPresentNotification:`)
   - Firebase is initialized by RNFB JS interop — no explicit `[FIRApp configure]` needed (if kept, harmless)
   - **Remove** `[GMSServices provideAPIKey:…]`; the key goes to `Info.plist` instead.
3. **`ios/lucky_moon_20705/Info.plist`**:
   - Add `<key>GMSServicesApiKey</key><string>…</string>` (Maps)
   - `UILaunchStoryboardName` → `LaunchScreen` (storyboard per template; keep existing .xib only if template keeps xib — 0.80 uses LaunchScreen.storyboard; import existing assets into it)
   - Drop `armv7` from `UIRequiredDeviceCapabilities` (arm64-only builds now)
   - Keep `UIAppFonts` array; keep `UIModalPresentationStyle`/camera/location/photo permission strings
   - Add `NSMicrophoneUsageDescription` (media recorder) if missing
4. **Xcode project** (`project.pbxproj`): upgrade helper handles build settings; manually verify:
   - Deployment target ≥ 13.4 (0.80 min supported iOS is 13.4? — 0.80 supports iOS 13+; use 15.0 target for safety with latest pods; **recommend 15.0** since Play Store/App Store audiences are fine and maps/firebase SDKs require it)
   - Remove references to deleted files (Flipper is iOS-agnostic here; check `Pods` references)
   - Signing config (fastlane Match) untouched
5. **`main.m`** — template regenerates (unchanged API).
6. **GoogleService-Info.plist** — unchanged; regenerate if Firebase project changed.
7. **Pod cache/clean procedure**: `cd ios && rm -rf Pods Podfile.lock && pod install` at each checkpoint (B and C) — do **not** incrementally `pod update` the whole world.
8. **Tests target**: keep; `lucky_moon_20705Tests.m` template-updated.

---

## 9. JavaScript / React Breaking-Changes Checklist

### 9.1 React 17 → 19 (lands at 0.80)
- `react`/`react-native`/`react-test-renderer` all pinned to `19.1.0` (RN 0.80 bundles React 19.1).
- **react-redux 9.x** (Phase 1) — class `connect` API unchanged; context-based API in v9 still supports `connect`.
- Redux store: `composeEnhancers` line uses `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` — `window` is not defined in RN; guard it: `const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;`
- Class components: verify none use `ReactDOM.render`-style legacy patterns (they don't — all functional + hooks).
- `prop-types` usage: fine under React 19.
- No `dangerouslySetInnerHTML`/`findDOMNode` usage found in core screens (re-grep to confirm at checkpoint C).

### 9.2 React Native 0.80 JS API changes
- **Deep imports deprecated** — verified none in this codebase (grep `react-native/Libraries`). Re-grep after helper diffs; fix any that appear by importing from `'react-native'`.
- **`package.json` `exports` field in react-native** — Metro platform-extension shims already provided by RN; no action unless a library does `require('react-native/Libraries/…')` (check node_modules of `native-base`! native-base v2 historically imports RN internals — if it breaks here, that's the native-base decision point).
- ESLint: `eslint-plugin-react-hooks` v5 — new signals possible; run `yarn lint` and fix.
- Jest 29: `snapshot`/`mock` APIs mostly stable; re-run `yarn test`; update `__tests__/App-test.js` if preset changes (preset now ships inside `react-native` ≥0.73).
- Metro: use `getDefaultConfig(__dirname)` (sync) — update `metro.config.js` as in §4.2; at checkpoint C also migrate svg-transformer v2 config style (`resolveRequest`/`transformerPath` per its README).

### 9.3 native-base v2 strategy (decision)
Options, in order of preference:
1. **Keep + patch** (lowest effort): if it compiles and renders on 0.76/0.80, pin 2.15.2, fix any deep-import breakage with `patch-package` on `node_modules/native-base`. Acceptable as an interim state; schedule migration.
2. **Migrate to Native Base v3/v4** (medium): v3 is built on `react-native-ui-kitten` — this app **already uses UI Kitten**, so component mapping (`<Container>/<Content>/<Icon>/<Button>/<Input>/<Picker>` → UI Kitten `Layout/…/…`) is feasible screen-by-screen; ~40 files; do it as a parallel workstream with its own branch if patching proves unstable.
3. **Migrate to plain UI Kitten + react-native-elements** (highest effort, cleanest future).
Decision rule: try option 1 first at checkpoint B. If any of §4.5 screens renders wrong or crashes, start option 2 immediately — do **not** carry a broken UI kit into checkpoint C.

---

## 10. CI/CD Updates (CircleCI)

- `node` job: `image: circleci/node:20` (Node ≥ 18 for 0.80).
- `android` job: replace `circleci/android:api-28-node` with an image providing **JDK 17 + Android SDK 34** (e.g. `circleci/android:2024-04` or a maintained `app via Dockerfile`); update `bundle exec fastlane` lanes for AGP 8 (fastlane `gradle`/`gradle_properties` fine; verify `build_android_release` lane paths).
- `ios` job: `macos: {xcode: "15.4", image: "macos-13"}`; `pod install` step unchanged; update fastlane test lane (simulator names e.g. `iPhone 15`/`iPhone 14`).
- Cache keys: keep checksum-based; add `ios/Pods` cache on `Podfile.lock` (already present).
- `heroku.yml` + `frontend/`: untouched (separate web app).
- Secrets: release keystore + passwords currently in `android/gradle.properties` → move to CircleCI env vars.

---

## 11. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1.1 | **New Architecture decision** | — | High | Default to **Legacy arch on 0.80** (`newArchEnabled=false`, `:new_arch_enabled => false`). Legacy is frozen in 0.80 but fully shipped and works with all libs that support legacy. Re-evaluate New Arch as a follow-on once 0.83+; only flip if all native modules in §6 list new-arch support. |
| 1.2 | native-base v2 breakage on 0.73+/0.80 | High | High | §9.3 strategy; early validation at checkpoint B; patch-package; fallback UI-Kitten migration workstream |
| 1.3 | Firebase 12→21 (auth/firestore behavior) | Medium | High | Sub-steps 12→14→19→21 with RNFB changelogs; dedicated auth+firestore smoke tests at each sub-step; keep Firestore rules unchanged |
| 1.4 | react-native-maps 0.28→1.x pod/key issues | Medium | High | §8 steps; test map rendering + directions + places autocomplete on both OSes; move key to Info.plist/manifest |
| 1.5 | JSC removal (last first-party version is 0.80) | Certain after 0.80 | Medium | Enable Hermes in checkpoint B; verify Hermes release builds; if any library needs JSC at 0.80, use `@react-native-community/javascriptcore` |
| 1.6 | pubnub-react / react-native-payments / react-native-media-recorder unmaintained native code failing on new ABI | Medium | Medium | Vendor check at checkpoint B; if pubnub-react breaks, switch chat to PubNub Web SDK (WebSocket) — no native module needed; media-recorder/payments: device-test |
| 1.7 | react-native-screens/gesture-handler migration regressions in bottom-tab + stack nav | Medium | High | Early bump at checkpoint A/B; full nav smoke (§4.5) at every checkpoint; keep `@react-navigation` v5 (stable with screens 3/4) |
| 1.8 | Gradle 6→8 + AGP 3.5→8.5 build breakage (plugins, flipper, google-services) | High (mechanical) | Medium | Helper diffs + known-good 0.80 template as reference; keep fastlane lanes dry-run in CI early |
| 1.9 | `src/` alias resolution breaks after Metro change | Low (after fix) | High | §4.2 explicit alias in Phase 1; delete `src/package.json` |
| 1.10 | Signed-release config (keystore in repo, jetifier, multidex) | Medium | Medium | Rotate keystore; externalize secrets; validate `assembleRelease` at every checkpoint, not just at the end |
| 1.11 | Lottie version jump 3.2.3→4.x (pod) | Low | Low | Autolinked lottie-react-native 6.x; test all Lottie screens |
| 1.12 | Push notification regression (7.3.1→8.1.2, both OSes) | Medium | Medium | Full push matrix test (foreground/background/foreground-tap) at checkpoint C |
| 1.13 | Hermes + old native modules edge cases | Low | Medium | Hermes on at checkpoint B; monitor dev logs |
| 1.14 | 0.80 is already EOL (0.87 current as of this writing) | High | Low | This plan targets 0.80 as requested; design keeps upgrades forward-compatible (Legacy→New Arch, ESLint 8, modern toolchain) so 0.83/0.87 hops are much cheaper |

---

## 12. Rollback & Safety Strategy

1. **Tag before every checkpoint**: `v0.64-baseline`, `v0.72-upgraded`, `v0.76-upgraded`, `v0.80`.
2. Each checkpoint = one or a few small commits; **never** mix a dependency bump with unrelated refactors.
3. If a checkpoint fails to build after 1–2 days of effort: `git revert`/`reset` to the checkpoint tag, fix the cause on a side branch, re-merge.
4. Keep `main` deployable at all times: upgrade work happens on `upgrade/rn-0.80` only; release builds are cut from `main` until 0.80 passes the full gate (§5 Gate + release-store submission dry run).
5. Store the last known-good APK/A-IPA per checkpoint.
6. CI (CircleCI) stays on the old toolchain until checkpoint C; switch CI images in the same PR that lands 0.80 (or stage: node image at A, android/ios images at C).

---

## 13. Estimated Effort & Timeline (1–2 engineers)

| Phase | Work | Estimate |
|---|---|---|
| 0 | Toolchain + baseline + cleanup | 1–2 days |
| 1 | Codebase prep (alias, dead code, react-redux/axios) | 1–2 days |
| 2A | 0.64 → 0.72 | 3–5 days |
| 2B | 0.72 → 0.76 (Hermes, maps, firebase 19, native-base decision) | 4–7 days |
| 2C | 0.76 → 0.80 (React 19, firebase 21, final deps) | 3–5 days |
| 2.5 | (parallel) native-base/UI-kit migration **only if needed** | 5–15 days |
| 3 | CI switch + release builds + store submission dry runs | 1–2 days |
| **Total** | | **~3–5 weeks (without UI-kit migration), up to +2–3 weeks with it** |

---

## 14. Final Definition of Done (0.80)

- [ ] `react-native@0.80.x` + `react@19.1.0` in package.json; `yarn install` clean
- [ ] Android debug + release builds on SDK 34 / JDK 17 / Gradle 8.x / AGP 8.5.x; Hermes enabled; no jcenter
- [ ] iOS build on Xcode 15.1+; modern Podfile; no source-patching hacks; Hermes enabled
- [ ] §4.5 smoke list passes on a real Android device (API 24 & 34) and iOS device/sim (iOS 15+)
- [ ] `yarn test` (jest 29) green; `yarn lint` (eslint 8) clean
- [ ] Push notifications, Maps, Firebase auth/firestore, payments, media recording verified on device
- [ ] App size at or below 0.64 baseline (expect iOS size win from prebuilt xcframework)
- [ ] CI green end-to-end; release keystore externalized
- [ ] No known regressions vs baseline recorded in the upgrade tracker

---

## 15. References

- React Native Upgrade Helper: https://react-native-community.github.io/upgrade-helper/
- RN 0.80 release notes: https://reactnative.dev/blog/2025/06/12/react-native-0.80.md
- RN upgrading guide: https://reactnative.dev/docs/upgrading
- RN version/support matrix (0.80: Android 7.0 min, JDK 17, Xcode 15.1, CocoaPods 1.13+, Node ≥ 18): https://github.com/reactwg/react-native-releases/blob/main/docs/support.md
- RN 0.80 changelog: https://github.com/facebook/react-native/blob/main/CHANGELOG.md
- React 19 upgrade guide: https://react.dev/learn/react-19-upgrade-guide
- React Native Firebase upgrade guide: https://invertase.io/roadmap/react-native/upgrade-guide
- react-native-maps changelog (0.28 → 1.x Podfile changes): https://github.com/react-native-maps/react-native-maps/releases
- Reanimated upgrade: https://docs.swmansion.com/react-native-reanimated/docs/getting-started/upgrading-from-1.x/
- Deep imports deprecation (0.80): https://reactnative.dev/blog/2025/06/12/moving-towards-a-stable-javascript-api.md
