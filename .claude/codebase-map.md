# Codebase Map — lucky-moon-20705

_Generated: 2026-09-30 18:21 | Commit: 137276d6_


## Directory Tree

```
lucky-moon-20705/
  .circleci/
    config.yml
    webhook_callback.sh
  .kilo/
    worktrees/
      four-tuba/
        .circleci/
        __tests__/
        android/
        backend/
        frontend/
        ios/
        patches/
        src/
        .buckconfig
        .env
        .eslintrc.js
        .flowconfig
        .git
        .gitattributes
        .gitignore
        .prettierrc.js
        .watchmanconfig
        App.js
        app.json
        babel.config.js
        heroku.yml
        index.js
        metro.config.js
        package.json
        react-native.config.js
        README.md
    .gitignore
  __tests__/
    App-test.js
  android/
    .gradle/
      6.7/
        executionHistory/
        fileChanges/
        fileHashes/
        javaCompile/
        vcsMetadata-1/
        gc.properties
      buildOutputCleanup/
        buildOutputCleanup.lock
        cache.properties
      checksums/
        checksums.lock
      configuration-cache/
        gc.properties
      vcs-1/
        gc.properties
    app/
      src/
        debug/
        main/
      _BUCK
      build.gradle
      build_defs.bzl
      debug.keystore
      google-services.json
      proguard-rules.pro
    fastlane/
      Appfile
      Fastfile
      README.md
    gradle/
      wrapper/
        gradle-wrapper.jar
        gradle-wrapper.properties
    .DS_Store
    build.gradle
    Gemfile
    Gemfile.lock
    gradle.properties
    gradlew
    gradlew.bat
    settings.gradle
  backend/
    booking/
      api/
        v1/
        __init__.py
      migrations/
        0001_initial.py
        0002_bookingrequestrecurring.py
        0003_auto_20230201_1248.py
        0004_auto_20230202_0704.py
        0005_auto_20230203_1018.py
        0006_auto_20230203_1136.py
        0007_bookingrequestservices_additional_info.py
        0008_auto_20230207_0801.py
        0009_auto_20230208_1354.py
        0010_auto_20230214_1318.py
        0011_auto_20230221_1140.py
        0012_auto_20230224_1038.py
        0013_auto_20230330_0638.py
        0014_auto_20230330_0816.py
        0015_auto_20230427_1948.py
        0016_auto_20230512_1159.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      tests.py
      views.py
    contact_us/
      api/
        v1/
        __init__.py
      migrations/
        0001_initial.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      tests.py
      views.py
    coupon/
      migrations/
        0001_initial.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      tests.py
      views.py
    events/
      api/
        v1/
        __init__.py
      migrations/
        0001_initial.py
        0002_eventimage.py
        0003_auto_20230116_1155.py
        0004_auto_20230116_1450.py
        0005_auto_20230117_0733.py
        0006_remove_calendarevent_show.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      tests.py
      views.py
    home/
      api/
        v1/
        __init__.py
      management/
        commands/
        __init__.py
      migrations/
        0001_initial.py
        0002_load_initial_data.py
        0003_bookingrequest_category_employee_employeecategory_employeephoto_employeesubscription_review_subscrip.py
        0004_auto_20210526_1156.py
        0005_auto_20210527_1056.py
        0006_auto_20210527_1117.py
        0007_auto_20210527_1531.py
        0008_auto_20210528_0644.py
        0009_auto_20210528_1100.py
        0010_auto_20210528_1107.py
        0011_notification.py
        0012_auto_20210531_1052.py
        0013_banner.py
        0014_notification_message.py
        0015_auto_20210601_0918.py
        0016_auto_20210603_0618.py
        0017_employee_description.py
        0018_bookingrequest_employee.py
        0019_auto_20210607_1456.py
        0020_auto_20210608_0722.py
        0021_auto_20210608_0726.py
        0022_auto_20210608_1403.py
        0023_remove_bookingrequest_employee.py
        0024_bookingrequest_employee.py
        0025_auto_20210609_1421.py
        0026_auto_20210609_1429.py
        0027_auto_20210610_1153.py
        0028_auto_20210611_1223.py
        0029_auto_20210615_1246.py
        0030_auto_20210615_1320.py
        0031_remove_usernotification_is_seen.py
        0032_auto_20210617_0712.py
        0033_auto_20210621_1154.py
        0034_review_image.py
        0035_message_usermessage.py
        0036_remove_message_image.py
        0037_auto_20210727_0602.py
        0038_auto_20210727_0607.py
        0039_auto_20210727_0609.py
        0040_bookingrequest_order_status.py
        0041_onboard.py
        0042_delete_onboard.py
        0043_onboard.py
        0044_auto_20210809_1234.py
        0045_auto_20210824_0747.py
        0046_auto_20210824_1103.py
        0047_auto_20210824_1112.py
        0048_auto_20210824_1132.py
        0049_auto_20210824_1209.py
        0050_auto_20210826_1504.py
        0051_bookingrequest_bookin_date_time.py
        0052_auto_20210827_1046.py
        0053_remove_bookingrequest_booking_date_time.py
        0054_information.py
        0055_auto_20210902_1351.py
        0056_auto_20210903_0641.py
        0057_auto_20211005_1238.py
        0058_auto_20211117_1431.py
        0059_answer_question_type.py
        0060_answer_user.py
        0061_remove_question_user.py
        0062_auto_20211229_0740.py
        0063_question_icon.py
        0064_auto_20220127_1105.py
        0065_addtobag.py
        0066_auto_20220207_0903.py
        0067_auto_20220208_0822.py
        0068_auto_20220208_0824.py
        0069_bookingrequest_transaction_status.py
        0070_auto_20220303_1429.py
        0071_auto_20220609_1015.py
        0072_auto_20220609_1650.py
        0073_auto_20220609_1654.py
        0074_bookingrequest_checkout_confirm.py
        0075_auto_20230105_1231.py
        0075_auto_20230109_0723.py
        0076_remove_category_allowed.py
        0076_remove_subscription_stripe_subscription_id.py
        0077_employeesubscription_stripe_subscription_id.py
        0077_subscriptionbasedservice_allowed.py
        0078_remove_subscriptionbasedservice_allowed.py
        0079_category_allowed.py
        0080_remove_category_allowed.py
        0081_merge_20230111_1040.py
        0082_servicedetail.py
        0083_auto_20230112_0633.py
        0084_remove_review_image.py
        0085_auto_20230120_0943.py
        0086_auto_20230124_1112.py
        0087_auto_20230126_0717.py
        0088_auto_20230127_0621.py
        0089_auto_20230127_0623.py
        0090_auto_20230214_0800.py
        0091_auto_20230221_1112.py
        0092_category_price.py
        0093_auto_20230222_1129.py
        0094_auto_20230222_1132.py
        0095_auto_20230222_1353.py
        0096_auto_20230223_1541.py
        0097_service.py
        0098_auto_20230512_1159.py
        __init__.py
      templates/
        account/
        crud/
        email/
        home/
        users/
        base.html
      templatetags/
        custom_tags.py
      __init__.py
      admin.py
      forms.py
      models.py
      storage_backends.py
      tests.py
      urls.py
      views.py
    lucky_moon_20705/
      __init__.py
      settings.py
      urls.py
      utils.py
      wsgi.py
    payments/
      api/
        v1/
        __init__.py
      migrations/
        0001_initial.py
        0002_auto_20210624_1226.py
        0003_auto_20210625_0945.py
        0004_auto_20210809_1217.py
        0005_auto_20210809_1219.py
        0006_productpriceid.py
        0007_delete_productpriceid.py
        0008_employeesubscription_subscription_subscriptionbasedservice_usersubscription.py
        0009_serviceincluded.py
        0010_addtip.py
        0011_subscription_interval.py
        0012_paymentrecord_extra_charge.py
        0013_products.py
        0014_auto_20230523_1239.py
        0015_auto_20230523_1250.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      tests.py
      urls.py
      views.py
    postgres-data/
      postgres/
        base/
        global/
        pg_commit_ts/
        pg_dynshmem/
        pg_logical/
        pg_multixact/
        pg_notify/
        pg_replslot/
        pg_serial/
        pg_snapshots/
        pg_stat/
        pg_stat_tmp/
        pg_subtrans/
        pg_tblspc/
        pg_twophase/
        pg_wal/
        pg_xact/
        pg_hba.conf
        pg_ident.conf
        PG_VERSION
        postgresql.auto.conf
        postgresql.conf
        postmaster.opts
    property_plan/
      api/
        v1/
        __init__.py
      migrations/
        0001_initial.py
        0002_auto_20230307_1023.py
        0003_auto_20230307_1054.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      tests.py
      views.py
    push_notification/
      api/
        v1/
        __init__.py
      migrations/
        0001_initial.py
        0002_auto_20210922_0952.py
        0003_auto_20210923_0940.py
        0004_notification_employee_category.py
        0005_auto_20230510_1026.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      tests.py
      views.py
    service_provider/
      api/
        v1/
        __init__.py
      migrations/
        0001_initial.py
        0002_auto_20210824_1635.py
        0003_employeeavailabletime.py
        0004_auto_20210826_1508.py
        0005_auto_20210826_1518.py
        0006_employeeavailabletime_status.py
        0007_auto_20210827_0720.py
        0008_employeeavailabletime_price.py
        0009_employeeavailabletime_service.py
        0010_auto_20230207_1224.py
        0010_availabletimeslots.py
        0011_merge_20230214_1315.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      tests.py
      views.py
    static/
      css/
        main.css
      img/
        slack-app-pencil.png
    terms_and_conditions/
      migrations/
        0001_terms_initial.py
        __init__.py
      __init__.py
      admin.py
      apps.py
      models.py
      options.py
      README.md
      serializers.py
      urls.py
      viewsets.py
    users/
      api/
        v1/
        __init__.py
      migrations/
        0001_initial.py
        0002_auto_20200929_1906.py
        0003_auto_20210527_0607.py
        0004_auto_20210601_1111.py
        0005_auto_20210601_1151.py
        0006_user_stripe_customer_id.py
        0007_user_image.py
        0008_addpet.py
        0009_auto_20230104_0941.py
        0010_auto_20230104_1107.py
        0011_zipcode.py
        0012_auto_20230109_1052.py
        0013_user_location.py
        0014_user_stripe_subscription_id.py
        0015_auto_20230120_0739.py
        0016_remove_user_stripe_subs_id.py
        0017_auto_20230125_0714.py
        0018_user_phone_number.py
        0019_auto_20230127_1122.py
        0020_auto_20230127_1203.py
        0021_auto_20230127_1243.py
        0022_auto_20230217_1001.py
        __init__.py
      tests/
        __init__.py
        factories.py
        test_forms.py
        test_models.py
        test_urls.py
        test_views.py
      __init__.py
      adapters.py
      admin.py
      apps.py
      forms.py
      models.py
      tasks.py
      urls.py
      views.py
    web_build/
      static/
        css/
        js/
        media/
      asset-manifest.json
      favicon.ico
      firebase-messaging-sw.js
      index.html
      manifest.json
      robots.txt
    .dockerignore
    .DS_Store
    .env
    .env.example
    .gitignore
    docker-compose.override.yml
    docker-compose.yml
    Dockerfile
    google-services.json
    heroku.yml
    manage.py
    Pipfile
    Pipfile.lock
    README.md
  frontend/
    .kilo/
      worktrees/
        unmarred-azalea/
      .gitignore
    public/
      favicon.ico
      firebase-messaging-sw.js
      index.html
      manifest.json
      robots.txt
    src/
      assets/
        fonts/
        images/
        scss/
      components/
        AuthModals/
        Button/
        Chat/
        Header/
        Image/
        Modals/
        PasswordInput/
        ProfileReviewsCard/
        searchFeild/
        SidebarMenu/
        Table/
        TextArea/
        UCalendar/
        UInput/
        UploadFile/
        USearch/
        USelect/
      config/
        navigation/
        app.js
      contexts/
        theme-context.js
      data/
        channels/
        messages/
        users/
        index.cjs
        index.d.ts
        index.js
        package.json
      layout/
        Admin/
        Auth/
        HomeLayout/
      pages/
        AddDesigner/
        AuthScreens/
        Bookings/
        CreateService/
        Dashboard/
        ForegroundNotification/
        GroupChat/
        ManageBookings/
        ManageResidents/
        ManageServices/
        Messages/
        MyProfile/
        NotFound/
        Notifications/
        Profile/
        PubNubChat/
        PubnubChatBoiler/
        ViewDesigner/
      reduxStore/
        rootReducer.js
        rootSaga.js
        store.js
      RouterGuard/
        index.js
      theme/
        Fonts.js
        Global.js
        Gutters.js
        Images.js
        index.js
        Layout.js
        Variables.js
      utils/
        alerts.js
        commonFunction.js
        constants.js
        http.js
        newUsers.json
        useForm.js
        utils.js
        validation.js
        XHR.js
      App.js
      App.test.js
      firebase.js
      index.css
      index.js
      Router.js
      serviceWorker.js
    .DS_Store
    .env
    .gitignore
    package-lock.json
    package.json
    README.md
    yarn.lock
  ios/
    fastlane/
      Appfile
      Fastfile
      Matchfile
      README.md
    lucky_moon_20705/
      Base.lproj/
        LaunchScreen.xib
      Images.xcassets/
        AppIcon-1.appiconset/
        Contents.json
      AppDelegate.h
      AppDelegate.m
      Info.plist
      lucky_moon_20705.entitlements
      main.m
    lucky_moon_20705-tvOS/
      Info.plist
    lucky_moon_20705-tvOSTests/
      Info.plist
    lucky_moon_20705.xcodeproj/
      project.xcworkspace/
        xcshareddata/
        contents.xcworkspacedata
      xcshareddata/
        xcschemes/
      project.pbxproj
    lucky_moon_20705.xcworkspace/
      xcshareddata/
        IDEWorkspaceChecks.plist
        WorkspaceSettings.xcsettings
      contents.xcworkspacedata
    lucky_moon_20705Tests/
      Info.plist
      lucky_moon_20705Tests.m
    .DS_Store
    File.swift
    Gemfile
    Gemfile.lock
    GoogleService-Info.plist
    lucky_moon_20705-Bridging-Header.h
    Podfile
    Podfile.lock
  patches/
    react-native+0.62.2.patch
  src/
    assets/
      fonts/
        CrimsonText-Bold.ttf
        CrimsonText-BoldItalic.ttf
        CrimsonText-Italic.ttf
        CrimsonText-Regular.ttf
        fontawesome.ttf
        icomoon.ttf
        Lato-Bold.ttf
        Lato-BoldItalic.ttf
        Lato-Italic.ttf
        Lato-Regular.ttf
        Merriweather-Bold.ttf
        Merriweather-BoldItalic.ttf
        Merriweather-Italic.ttf
        Merriweather-Regular.ttf
        Montserrat-Bold.ttf
        Montserrat-BoldItalic.ttf
        Montserrat-Italic.ttf
        Montserrat-Regular.ttf
        Moodern.ttf
        Nunito-Bold.ttf
        Nunito-BoldItalic.ttf
        Nunito-Italic.ttf
        Nunito-Regular.ttf
        OpenSans-Bold.ttf
        OpenSans-BoldItalic.ttf
        OpenSans-Italic.ttf
        OpenSans-Regular.ttf
        PlayfairDisplay-Bold.ttf
        PlayfairDisplay-BoldItalic.ttf
        PlayfairDisplay-Italic.ttf
        PlayfairDisplay-Regular.ttf
        Poppins-Light.ttf
        Poppins-Medium.ttf
        Poppins-Regular.ttf
        Righteous-Regular.ttf
        Roboto-Bold.ttf
        Roboto-BoldItalic.ttf
        Roboto-Italic.ttf
        Roboto-Light.ttf
        Roboto-Medium.ttf
        Roboto-Regular.ttf
        RobotoMono-Bold.ttf
        RobotoMono-BoldItalic.ttf
        RobotoMono-Italic.ttf
        RobotoMono-Regular.ttf
      icons/
        americanExpressIcon.png
        americanExpressIcon@2x.png
        americanExpressIcon@3x.png
        iconPlus.png
        iconPlus@2x.png
        iconPlus@3x.png
        masterCardIcon.png
        masterCardIcon@2x.png
        masterCardIcon@3x.png
        sendIcon.png
        sendIcon@2x.png
        sendIcon@3x.png
        Tick.png
        visaIcon.png
        visaIcon@2x.png
        visaIcon@3x.png
      images/
        icon/
        new/
        oldIcons/
        onboard/
        services/
        account.png
        addmore.png
        anne.png
        anneglim.png
        anneonbeach.png
        appearance.png
        arrowback.png
        backgroundLoginV1.png
        backgroundLoginV1@2x.png
        backgroundLoginV1@3x.png
        backgroundLoginV1DarkTheme.png
        backgroundLoginV1DarkTheme@2x.png
        backgroundLoginV1DarkTheme@3x.png
        beddark.png
        bedicon.png
        cam.png
        chat-dark.png
        chat.png
        check.png
        checkedwhite.png
        checkedyellow.png
        cleaning.png
        darkThemeImage.png
        darkThemeImage@2x.png
        darkThemeImage@3x.png
        dogicon.png
        dogwalkingicon.png
        dropdownicon.png
        giftcard.png
        grocery.png
        heart.png
        home-dark.png
        home.png
        homeicon.png
        housedark.png
        jessica.png
        jessicasoil.png
        john.png
        johnmark.png
        kittenImage.png
        kittenImage@2x.png
        kittenImage@3x.png
        kittenImageDark.png
        kittenImageDark@2x.png
        kittenImageDark@3x.png
        lightThemeImage.png
        lightThemeImage@2x.png
        lightThemeImage@3x.png
        LoginIcon.png
        logo.png
        logo@2x.png
        logo@3x.png
        logoDark.png
        logoDark@2x.png
        logoDark@3x.png
        logout.png
        mark.png
        mastercard.png
        message.png
        more.png
        nopic.png
        noti-dark.png
        noti.png
        notified.png
        profile.png
        questionmark.png
        reviewer.png
        screensImage.png
        screensImage@2x.png
        screensImage@3x.png
        screensImageDark.png
        screensImageDark@2x.png
        screensImageDark@3x.png
        send.png
        smallLogo.png
        smallLogo@2x.png
        smallLogo@3x.png
        smallLogoDark.png
        smallLogoDark@2x.png
        smallLogoDark@3x.png
        splash.png
        splashBack.png
        splashBack@2x.png
        splashBack@3x.png
        task-dark.png
        task.png
        title.png
        tool.png
        unchecked.png
        user-dark.png
        user.png
        usercleaning.png
        vacuum.png
        viewmore.png
        visacard.png
        walkingwithdog.png
        walkwithpets.png
        wallcleaning.png
        washingmachine.png
      loaders/
        around.json
        dotted-line.json
        snake.json
      event.png
      icons.js
    components/
      BadgeIcon/
        index.js
      BookingRequest/
        index.js
        styles.js
      Button/
        index.js
        styles.js
      Buttons/
        Back.js
        Exit.js
        Menu.js
      ChatNotification/
        index.js
        styles.js
      CodeVerificationInput/
        index.js
      CustomerReview/
        index.js
        styles.js
      DataAvailability/
        dotted-line.json
        index.js
        loader.json
        lottie.json
      DateTimePickerComponenet/
        index.js
        styles.js
      DiscountCard/
        index.js
        styles.js
      EarningCard/
        index.js
        styles.js
      Error/
        index.js
        styles.js
      ErrorBox/
        index.js
        styles.js
      Footer/
        index.js
        styles.js
      Header/
        index.js
        styles.js
      IconCard/
        index.js
        styles.js
      IdentityCard/
        index.js
        styles.js
      Input/
        index.js
        styles.js
      Line/
        index.js
        styles.js
      LuckyHeader/
        index.js
      Map/
        Markers/
        index.js
      MyOrders/
        index.js
        styles.js
      Notification/
        index.js
        styles.js
      PhoneInput/
        index.js
      Picker/
        index.js
        styles.js
      PopOver/
        index.js
        styles.js
      ProfileCard/
        index.js
        styles.js
      ProfilePicture/
        index.js
        styles.js
      RNModal/
        index.js
        styles.js
      Separator/
        index.js
      Service/
        index.js
        styles.js
      ServiceCard/
        index.js
        styles.js
      ServiceDetail/
        index.js
        styles.js
      Task/
        index.js
        styles.js
      Text/
        index.js
        styles.js
      index.js
    config/
      navigation/
        propTypes.js
      app.js
      crowdboticsTheme.js
      installed_blueprints.js
    data/
      img/
        avatars/
        Image1.png
        Image10.png
        Image11.png
        Image12.png
        Image2.png
        Image3.png
        Image4.png
        Image5.png
        Image6.png
        Image7.png
        Image8.png
        Image9.png
        photo1.png
        photo17.png
        photo18.png
        photo19.png
        photo2.png
        photo20.png
        photo3.png
        photo32.jpg
        photo4.png
        photo45.png
        photo46.png
        photo47.png
        photo48.png
        photo49.png
        photo5.png
        photo6.png
      raw/
        articles.js
        cards.js
        conversations.js
        notifications.js
        users.js
      dataGenerator.js
      index.js
    features/
      Add-Item116428/
        assets/
        screens/
        navigator.js
      Add-Item116477/
        assets/
        screens/
        navigator.js
      Add-Item117689/
        assets/
        screens/
        navigator.js
      Maps116424/
        screens/
        navigator.js
      Maps116429/
        screens/
        navigator.js
      Maps116473/
        screens/
        navigator.js
      Maps116478/
        screens/
        navigator.js
      Maps117685/
        screens/
        navigator.js
      Maps117690/
        screens/
        navigator.js
      SplashScreen/
        index.js
        styles.js
      UserProfile116420/
        components/
        screens/
        utils/
        navigator.js
      UserProfile116469/
        components/
        screens/
        utils/
        navigator.js
      UserProfile117681/
        components/
        screens/
        utils/
        navigator.js
    hooks/
      useForm.js
    navigator/
      AuthScreens.js
      CustomerScreen.js
      EmployeeScreen.js
      index.js
      mainNavigator.js
      NavigationService.js
      sideMenu.js
      slideMenuIcon.js
    redux/
      actions.js
      mainReducer.js
      mainSaga.js
      reducer.js
      sagas.js
      store.js
      types.js
    resources/
      Icons/
        back-white.png
        camera.png
        close.png
        collapse.png
        cross.png
        crushing-black.png
        crushing.png
        delete-conversation.png
        email.png
        facebook.png
        flex-mode-black.png
        flex-mode.png
        front-camera-off.png
        front-camera-on.png
        instagram.png
        left-arrow.png
        number-bg.png
        phone.png
        platinum.png
        profile-birthday.png
        profile-ethnicity.png
        profile-female.png
        profile-fitness.png
        profile-gender.png
        profile-gym.png
        profile-height.png
        profile-interest.png
        profile-name.png
        profile-spiritual.png
        rewind-black.png
        rewind.png
        right-arrow.png
        search.png
        send-message.png
        settings-change-email.png
        settings-change-password.png
        settings-change-phoneno.png
        settings-delete-account.png
        settings-edit-profile.png
        settings-filters.png
        settings-logout.png
        settings-membership-plans.png
        settings-notifications.png
        swipe-down.png
        swipe-up.png
        swipe.png
        tabbar-chat.png
        tabbar-crushes.png
        tabbar-discover.png
        tabbar-settings.png
        turn-on-camera.png
        upgrade-account.png
        upload.png
        verification-progress-bg.png
        verification-step-four.png
        verification-step-one.png
        verification-step-two.png
      Images/
        AuthOptionsBG.png
        AuthOptionsLogo.png
        crush-1.png
        crush-2.png
        crush-3.png
        crush-4.png
        crush-5.png
        crush-6.png
        CrushingBG.png
        discover-text-image.png
        DiscoverBG.png
        dummy-image.png
        FitMatchLogo.png
        FlexModeBG.png
        ForgotPasswordBG.png
        IntroductionPointOne.png
        IntroductionPointThree.png
        IntroductionPointTwo.png
        IntroductionScreenBG.png
        loader-image.png
        RewindBG.png
        SignInWithEmailBG.png
        SignInWithOptionsBG.png
        SignUpOptionsBG.png
        SignUpWithEmailBG.png
        VerificationStepFiveBG.png
        VerificationStepFourBG.png
        VerificationStepOneBG.png
        VerificationStepTwoBG.png
      index.js
    screens/
      Common/
        AuthMain/
        CalendarScreen/
        ChangePassword/
        ChatRoom/
        ForgotPassword/
        Login/
        LoginUserType/
        NewPassword/
        Notifications/
        OnBoard/
        PrivacyPolicy/
        Register/
        Splash/
        TermsAndCondition/
        Verification/
        index.js
      Customer/
        AddCreditCardScreen/
        AvailableBookingSlots/
        BookingCompleteMarkScreen/
        BookingCompleteReviewOneScreen/
        BookingCompleteReviewScreen/
        BookingCompleteScreen/
        BookingDetails/
        BookingDetailScreen/
        BookingForm/
        CreateBooking/
        EventDetails/
        EventsList/
        Help/
        Home/
        HouseCleaning/
        MyBag/
        MyBookings/
        OnBoard/
        PastOrdersScreen/
        PaymentDetailScreen/
        PaymentMethodScreen/
        PendingTaskScreen/
        PriceScreen/
        Profile/
        ServiceProfile/
        ServiceProfileCheckout/
        Services/
        Subscription/
        SuccessfullyBookedScreen/
        Task/
        TaskDetail/
        TaskRebook/
        TrackOrderDetailScreen/
        index.js
      Employee/
        AddService/
        Home/
        HomeV2/
        Profile/
        Task/
        TrackOrderDetailScreen/
        index.js
    services/
      PushNotification.js
    theme/
      Fonts.js
      Global.js
      Gutters.js
      Images.js
      index.js
      Layout.js
      Variables.js
    utils/
      Permission/
        index.js
        permissions.js
      alerts.js
      constants.js
      functions.js
      getDeviceInfo.js
      http.js
      index.js
      scale.js
      validation.js
      XHR.js
    package.json
  .buckconfig
  .DS_Store
  .env
  .eslintrc.js
  .flowconfig
  .gitattributes
  .gitignore
  .prettierrc.js
  .watchmanconfig
  App.js
  app.json
  babel.config.js
  heroku.yml
  index.js
  metro.config.js
  package-lock.json
  package.json
  react-native.config.js
  README.md
  yarn.lock
```

## File Distribution

- `.py`: 291 files (33%)
- `.png`: 230 files (26%)
- `.js`: 175 files (20%)
- `.ttf`: 45 files (5%)
- `(no ext)`: 38 files (4%)
- `.json`: 22 files (3%)
- `.lock`: 8 files (1%)
- `.md`: 7 files (1%)
- `.yml`: 6 files (1%)
- `.properties`: 6 files (1%)
- `.plist`: 6 files (1%)
- `.conf`: 4 files (0%)
- `.gradle`: 3 files (0%)
- `.html`: 3 files (0%)
- `.m`: 3 files (0%)

## Code Index


### `App.js`
  export default () => <App />;

### `src/resources/index.js`
  export default resources;

### `src/screens/Employee/index.js`
  export {Home, Task, HomeV2, Profile, AddServiceScreen, TrackOrderDetailScreen};

### `src/screens/Employee/AddService/styles.js`
  export default StyleSheet.create({

### `src/screens/Employee/TrackOrderDetailScreen/database.js`
  export default class Database {

### `src/screens/Employee/TrackOrderDetailScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Employee/Profile/styles.js`
  export default StyleSheet.create({

### `src/screens/Employee/HomeV2/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(HomeV2);

### `src/screens/Employee/HomeV2/styles.js`
  export default StyleSheet.create({

### `src/screens/Employee/Home/styles.js`
  export default StyleSheet.create({

### `src/screens/Employee/Task/database.js`
  export default class Database {

### `src/screens/Employee/Task/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/index.js`
  export {

### `src/screens/Customer/BookingCompleteReviewScreen/index.js`
  export default connect(

### `src/screens/Customer/BookingCompleteReviewScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/HouseCleaning/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/TrackOrderDetailScreen/database.js`
  export default class Database {

### `src/screens/Customer/TrackOrderDetailScreen/index.js`
  export default connect(

### `src/screens/Customer/TrackOrderDetailScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/BookingCompleteMarkScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/BookingDetails/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/Profile/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/MyBookings/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/PaymentDetailScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/BookingDetailScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/Services/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/EventDetails/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/AvailableBookingSlots/index.js`
  export default connect(

### `src/screens/Customer/AvailableBookingSlots/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/EventsList/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/ServiceProfileCheckout/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/Home/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/MyBag/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(MyBag);

### `src/screens/Customer/MyBag/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/Help/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(Help);

### `src/screens/Customer/Help/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/BookingCompleteReviewOneScreen/index.js`
  export default connect(mapStateToProps, null)(BookingCompleteReviewOneScreen);

### `src/screens/Customer/BookingCompleteReviewOneScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/CreateBooking/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/AddCreditCardScreen/index.js`
  export default connect(

### `src/screens/Customer/AddCreditCardScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/BookingCompleteScreen/index.js`
  export default connect(

### `src/screens/Customer/BookingCompleteScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/Subscription/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/PaymentMethodScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/SuccessfullyBookedScreen/index.js`
  export default connect(

### `src/screens/Customer/SuccessfullyBookedScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/Task/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/OnBoard/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(OnBoard);

### `src/screens/Customer/OnBoard/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/PastOrdersScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/BookingForm/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/TaskDetail/database.js`
  export default class Database {

### `src/screens/Customer/TaskDetail/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/ServiceProfile/database.js`
  export default class Database {

### `src/screens/Customer/ServiceProfile/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/PendingTaskScreen/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(PendingTaskScreen);

### `src/screens/Customer/PendingTaskScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Customer/TaskRebook/index.js`
  export default connect(mapStateToProps, null)(TaskRebook);

### `src/screens/Customer/TaskRebook/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/index.js`
  export {

### `src/screens/Common/TermsAndCondition/index.js`
  export default TermsAndCondition;

### `src/screens/Common/TermsAndCondition/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/ChangePassword/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

### `src/screens/Common/ChangePassword/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/Verification/index.js`
  export default connect(

### `src/screens/Common/Verification/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/Login/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(Login);

### `src/screens/Common/Login/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/CalendarScreen/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/NewPassword/index.js`
  export default connect(

### `src/screens/Common/NewPassword/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/LoginUserType/index.js`
  export default LoginUserType;

### `src/screens/Common/Register/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/ForgotPassword/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

### `src/screens/Common/ForgotPassword/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/OnBoard/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(OnBoard);

### `src/screens/Common/OnBoard/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/PrivacyPolicy/index.js`
  export default PrivacyPolicy;

### `src/screens/Common/PrivacyPolicy/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/ChatRoom/database.js`
  export default class Database {

### `src/screens/Common/ChatRoom/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

### `src/screens/Common/ChatRoom/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/AuthMain/index.js`
  export default AuthMain;

### `src/screens/Common/Notifications/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

### `src/screens/Common/Notifications/styles.js`
  export default StyleSheet.create({

### `src/screens/Common/Splash/index.js`
  export default SplashScreen;

### `src/theme/Fonts.js`
  export default StyleSheet.create({

### `src/theme/Global.js`
  export default StyleSheet.create({

### `src/theme/Gutters.js`
  export default StyleSheet.create({

### `src/theme/Images.js`
  export default {

### `src/theme/Layout.js`
  export default StyleSheet.create({

### `src/theme/Variables.js`
  export const Colors = {
  export const lightTheme = {
  export const FontSize = {
  export const MetricsSizes = {

### `src/theme/index.js`
  export {default as Fonts} from './Fonts';
  export {default as Gutters} from './Gutters';
  export {default as Images} from './Images';
  export {default as Layout} from './Layout';
  export {default as Global} from './Global';
  export {Colors, FontSize, lightTheme} from './Variables';

### `src/config/app.js`
  export const appConfig = {

### `src/config/crowdboticsTheme.js`
  export const crowdboticsTheme = {

### `src/config/installed_blueprints.js`
  export const installed_blueprints = [

### `src/config/navigation/propTypes.js`
  export default NavigationType;

### `src/components/index.js`
  export {

### `src/components/Input/index.js`
  export default Input;

### `src/components/Input/styles.js`
  export default StyleSheet.create({

### `src/components/Service/index.js`
  export default Service;

### `src/components/Service/styles.js`
  export default StyleSheet.create({

### `src/components/Error/index.js`
  export default Error;

### `src/components/Error/styles.js`
  export default styles;

### `src/components/ChatNotification/index.js`
  export default ChatNotification;

### `src/components/ChatNotification/styles.js`
  export default StyleSheet.create({

### `src/components/Picker/index.js`
  export default Picker;

### `src/components/Picker/styles.js`
  export default StyleSheet.create({

### `src/components/BadgeIcon/index.js`
  export default connect(mapStateToProps)(BadgeIcon);

### `src/components/MyOrders/index.js`
  export default MyOrders;

### `src/components/MyOrders/styles.js`
  export default StyleSheet.create({

### `src/components/EarningCard/index.js`
  export default EarningCard;

### `src/components/EarningCard/styles.js`
  export default StyleSheet.create({

### `src/components/RNModal/index.js`
  export default RNModal;

### `src/components/RNModal/styles.js`
  export default StyleSheet.create({

### `src/components/Text/index.js`
  export default Text;

### `src/components/Text/styles.js`
  export default StyleSheet.create({

### `src/components/Notification/index.js`
  export default Notification;

### `src/components/Notification/styles.js`
  export default StyleSheet.create({

### `src/components/CustomerReview/index.js`
  export default CustomerReview;

### `src/components/CustomerReview/styles.js`
  export default StyleSheet.create({

### `src/components/Footer/index.js`
  export default Footer;

### `src/components/Footer/styles.js`
  export default StyleSheet.create({

### `src/components/ProfilePicture/index.js`
  export default ProfilePicture;

### `src/components/ProfilePicture/styles.js`
  export default StyleSheet.create({

### `src/components/Button/index.js`
  export default Button;

### `src/components/Button/styles.js`
  export default StyleSheet.create({

### `src/components/DataAvailability/index.js`
  export default DataAvailability;

### `src/components/Buttons/Back.js`
  export {Back};

### `src/components/Buttons/Exit.js`
  export {Exit};

### `src/components/Buttons/Menu.js`
  export {Menu};

### `src/components/CodeVerificationInput/index.js`
  export default CodeVerificationInput;

### `src/components/DiscountCard/index.js`
  export default DiscountCard;

### `src/components/DiscountCard/styles.js`
  export default StyleSheet.create({

### `src/components/ServiceDetail/index.js`
  export default ServiceDetail;

### `src/components/ServiceDetail/styles.js`
  export default StyleSheet.create({

### `src/components/Header/index.js`
  export default Header;

### `src/components/Header/styles.js`
  export default StyleSheet.create({

### `src/components/IconCard/index.js`
  export default IconCard;

### `src/components/IconCard/styles.js`
  export default StyleSheet.create({

### `src/components/LuckyHeader/index.js`
  export default LuckyHeader;

### `src/components/PhoneInput/index.js`
  export default PhoneField;

### `src/components/Line/index.js`
  export default Line;

### `src/components/Line/styles.js`
  export default StyleSheet.create({

### `src/components/IdentityCard/index.js`
  export default IdentityCard;

### `src/components/IdentityCard/styles.js`
  export default StyleSheet.create({

### `src/components/ProfileCard/index.js`
  export default ProfileCard;

### `src/components/ProfileCard/styles.js`
  export default StyleSheet.create({

### `src/components/ServiceCard/index.js`
  export default ServiceCard;

### `src/components/ServiceCard/styles.js`
  export default StyleSheet.create({

### `src/components/ErrorBox/index.js`
  export default function ErrorBox({ errorText }) {

### `src/components/ErrorBox/styles.js`
  export default styles;

### `src/components/Task/index.js`
  export default Task;

### `src/components/Task/styles.js`
  export default StyleSheet.create({

### `src/components/BookingRequest/index.js`
  export default BookingRequest;

### `src/components/BookingRequest/styles.js`
  export default StyleSheet.create({

### `src/components/Separator/index.js`
  export default Separator;

### `src/components/Map/index.js`
  export default Map;

### `src/components/Map/Markers/index.js`
  export default Markers;

### `src/components/PopOver/index.js`
  export default PopOver;

### `src/components/PopOver/styles.js`
  export default StyleSheet.create({

### `src/components/DateTimePickerComponenet/index.js`
  export default DateTimePickerComponent;

### `src/components/DateTimePickerComponenet/styles.js`
  export default StyleSheet.create({

### `src/utils/XHR.js`
  export default (url, options) =>

### `src/utils/alerts.js`
  export const errorAlert = (err) => {
  export const successAlert = (msg) => {
  export const showMessageSuccess = (msg) => {
  export const showMessageFailure = (msg) => {

### `src/utils/constants.js`
  export const startingDateStyle = {
  export const inBetweenStyle = {
  export const endingDateStyle = {
  export const days = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'];

### `src/utils/functions.js`
  export const addEllipsis = (string, characters = 2) => {
  export const emailEllipsis = (str, characters = 3) => {
  export const getMinDate = () => {
  export const styledDataGenerator = (starting, ending) => {
  export const getMessageTime = (dateString) => {
  export const ParseDateStringForChat = (dateString) => {
  export const formattedtDate = (timeString) => {

### `src/utils/getDeviceInfo.js`
  export default getDeviceInfo;
  export const getScreenWidth = () => Dimensions.get('screen').width;

### `src/utils/http.js`
  export const request = axios.create({
  export function setupHttpConfig(callBack) {

### `src/utils/index.js`
  export const ParseDateStringForChat = (dateString) => {

### `src/utils/scale.js`
  export {scale, scaleVertical, scaleModerate};

### `src/utils/validation.js`
  export default validator;

### `src/utils/Permission/index.js`
  export const checkForPermissions = async () => {

### `src/utils/Permission/permissions.js`
  export async function checkMultiplePermissions(permissions) {
  export async function checkPermission(permission) {

### `src/data/dataGenerator.js`
  export default populateSeeds;

### `src/data/index.js`
  export const data = new DataProvider();

### `src/data/raw/articles.js`
  export default articles;

### `src/data/raw/cards.js`
  export default cards;

### `src/data/raw/conversations.js`
  export const Conversations = [
  export default Conversations;

### `src/data/raw/notifications.js`
  export default notifications;

### `src/data/raw/users.js`
  export default users;

### `src/redux/actions.js`
  export const postNotification = (data) => ({
  export const postNotificationSuccess = (data) => ({
  export const postNotificationFailure = () => ({

### `src/redux/mainReducer.js`
  export default {

### `src/redux/mainSaga.js`
  export function* mainSaga() {

### `src/redux/reducer.js`
  export default (state = initialState, action) => {

### `src/redux/sagas.js`
  export default all([takeLatest(types.postNotification, notifications)]);

### `src/redux/store.js`
  export { store };

### `src/redux/types.js`
  export default {

### `src/services/PushNotification.js`
  export default RemotePushController;

### `src/features/UserProfile117681/navigator.js`
  export default ProfilesBlueprintNavigator = createStackNavigator(

### `src/features/UserProfile117681/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/UserProfile117681/screens/profile1.js`
  export default ProfileV1 = withStyles(_ProfileV1, theme => ({

### `src/features/UserProfile117681/screens/profile2.js`
  export default ProfileV2 = withStyles(_ProfileV2, theme => ({

### `src/features/UserProfile117681/screens/profile3.js`
  export default ProfileV3 = withStyles(_ProfileV3, theme => ({

### `src/features/UserProfile117681/screens/slideShow.js`
  export default SlideShow = withStyles(_SlideShow, theme => ({

### `src/features/UserProfile117681/components/gallery.js`
  export class Gallery extends React.Component {

### `src/features/UserProfile117681/utils/textUtils.js`
  export default formatNumber;

### `src/features/Maps116478/navigator.js`
  export default MapsNavigator = createStackNavigator(

### `src/features/Maps116478/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/UserProfile116420/navigator.js`
  export default ProfilesBlueprintNavigator = createStackNavigator(

### `src/features/UserProfile116420/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/UserProfile116420/screens/profile1.js`
  export default ProfileV1 = withStyles(_ProfileV1, theme => ({

### `src/features/UserProfile116420/screens/profile2.js`
  export default ProfileV2 = withStyles(_ProfileV2, theme => ({

### `src/features/UserProfile116420/screens/profile3.js`
  export default ProfileV3 = withStyles(_ProfileV3, theme => ({

### `src/features/UserProfile116420/screens/slideShow.js`
  export default SlideShow = withStyles(_SlideShow, theme => ({

### `src/features/UserProfile116420/components/gallery.js`
  export class Gallery extends React.Component {

### `src/features/UserProfile116420/utils/textUtils.js`
  export default formatNumber;

### `src/features/Add-Item116477/navigator.js`
  export default AddItemBlueprintNavigator = createStackNavigator(

### `src/features/Add-Item116477/screens/addItem.js`
  export default AddItem = withStyles(_AddItem, theme => ({

### `src/features/Add-Item116477/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/SplashScreen/index.js`
  export default class App extends Component {

### `src/features/SplashScreen/styles.js`
  export const styles = StyleSheet.create({

### `src/features/Maps116429/navigator.js`
  export default MapsNavigator = createStackNavigator(

### `src/features/Maps116429/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/Maps117685/navigator.js`
  export default MapsNavigator = createStackNavigator(

### `src/features/Maps117685/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/Maps116473/navigator.js`
  export default MapsNavigator = createStackNavigator(

### `src/features/Maps116473/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/Maps116424/navigator.js`
  export default MapsNavigator = createStackNavigator(

### `src/features/Maps116424/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/Maps117690/navigator.js`
  export default MapsNavigator = createStackNavigator(

### `src/features/Maps117690/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/Add-Item116428/navigator.js`
  export default AddItemBlueprintNavigator = createStackNavigator(

### `src/features/Add-Item116428/screens/addItem.js`
  export default AddItem = withStyles(_AddItem, theme => ({

### `src/features/Add-Item116428/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/Add-Item117689/navigator.js`
  export default AddItemBlueprintNavigator = createStackNavigator(

### `src/features/Add-Item117689/screens/addItem.js`
  export default AddItem = withStyles(_AddItem, theme => ({

### `src/features/Add-Item117689/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/UserProfile116469/navigator.js`
  export default ProfilesBlueprintNavigator = createStackNavigator(

### `src/features/UserProfile116469/screens/index.js`
  export default class Root extends PureComponent {

### `src/features/UserProfile116469/screens/profile1.js`
  export default ProfileV1 = withStyles(_ProfileV1, theme => ({

### `src/features/UserProfile116469/screens/profile2.js`
  export default ProfileV2 = withStyles(_ProfileV2, theme => ({

### `src/features/UserProfile116469/screens/profile3.js`
  export default ProfileV3 = withStyles(_ProfileV3, theme => ({

### `src/features/UserProfile116469/screens/slideShow.js`
  export default SlideShow = withStyles(_SlideShow, theme => ({

### `src/features/UserProfile116469/components/gallery.js`
  export class Gallery extends React.Component {

### `src/features/UserProfile116469/utils/textUtils.js`
  export default formatNumber;

### `src/hooks/useForm.js`
  export default useForm;

### `src/navigator/AuthScreens.js`
  export default AuthStackScreen;

### `src/navigator/EmployeeScreen.js`
  export default EmployeeStackScreen;

### `src/navigator/NavigationService.js`
  export const navigationRef = React.createRef();
  export function navigate(name, params) {
  export function navigateAndReset(routes = [], index = 0) {
  export function navigateAndSimpleReset(name, index = 0) {
  export function goBack() {

### `src/navigator/index.js`
  export default connect(mapStateToProps, null)(RootNavigationStack);

### `src/navigator/mainNavigator.js`
  export default AppContainer;

### `src/navigator/sideMenu.js`
  export default SideMenu = withStyles(_SideMenu, theme => ({

### `src/navigator/slideMenuIcon.js`
  export class SlideMenuIcon extends React.Component {

### `src/assets/icons.js`
  export const FontIcons = {
  export const FontAwesome = {

### `frontend/src/App.js`
  export default connect(mapStateToProps, null)(App);

### `frontend/src/Router.js`
  export const routes = [

### `frontend/src/firebase.js`
  export default messaging;
  export const onMessageListener = () =>
  export const fetchToken = () => {

### `frontend/src/serviceWorker.js`
  export const registerServiceWorker = () => {

### `frontend/src/theme/Fonts.js`
  export default StyleSheet.create({

### `frontend/src/theme/Global.js`
  export default StyleSheet.create({

### `frontend/src/theme/Gutters.js`
  export default StyleSheet.create({

### `frontend/src/theme/Images.js`
  export const Images = {

### `frontend/src/theme/Layout.js`
  export default StyleSheet.create({

### `frontend/src/theme/Variables.js`
  export const Colors = {
  export const FontSize = {
  export const MetricsSizes = {

### `frontend/src/theme/index.js`
  export { default as Fonts } from './Fonts';
  export { default as Gutters } from './Gutters';
  export { default as Images } from './Images';
  export { default as Layout } from './Layout';
  export { default as Global } from './Global';
  export { Colors, FontSize } from './Variables';

### `frontend/src/config/app.js`
  export const publishKey = process.env.REACT_APP_PUB_KEY;
  export const subscribeKey = process.env.REACT_APP_SUB_KEY;

### `frontend/src/config/navigation/propTypes.js`
  export default NavigationType;

### `frontend/src/components/UInput/index.js`
  export default UInput

### `frontend/src/components/Image/index.js`
  export default Image

### `frontend/src/components/searchFeild/index.js`
  export default function SearchBar() {

### `frontend/src/components/searchFeild/newindex.js`
  export default connect(mapStateToProps, mapDispatchToProps)(SearchField);

### `frontend/src/components/Table/index.js`
  export default ListTable;

### `frontend/src/components/USearch/index.js`
  export default USearch

### `frontend/src/components/Button/index.js`
  export default Button;

### `frontend/src/components/PasswordInput/index.js`
  export default PasswordInput

### `frontend/src/components/UCalendar/index.js`
  export default UCalendar

### `frontend/src/components/ProfileReviewsCard/index.js`
  export default ProfileReviewsCard;

### `frontend/src/components/TextArea/index.js`
  export default TextArea

### `frontend/src/components/UploadFile/index.js`
  export default UploadFile

### `frontend/src/components/USelect/index.js`
  export default USelect

### `frontend/src/components/SidebarMenu/index.js`
  export default ResponsiveDrawer;

### `frontend/src/components/SidebarMenu/prevIndex.js`
  export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)

### `frontend/src/pages/Messages/index.js`
  export default Messages;

### `frontend/src/pages/Profile/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);

### `frontend/src/pages/NotFound/index.js`
  export default NotFound

### `frontend/src/pages/GroupChat/index.js`
  export default GroupChat;

### `frontend/src/pages/AddDesigner/index.jsx`
  export default connect(mapStateToProps, mapDispatchToProps)(AddDesigner);

### `frontend/src/pages/ManageResidents/index.jsx`
  export default connect(mapStateToProps, mapDispatchToProps)(ManageResidents);

### `frontend/src/pages/ManageBookings/index.jsx`
  export const ManageBookings = (props) => {

### `frontend/src/pages/PubNubChat/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(ChatApp)

### `frontend/src/pages/Dashboard/index.js`
  export default Dashboard;

### `frontend/src/pages/ViewDesigner/index.jsx`
  export default connect(mapStateToProps, mapDispatchToProps)(ViewDesigner);

### `frontend/src/pages/MyProfile/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

### `frontend/src/pages/PubnubChatBoiler/index.js`
  export default connect(mapStateToProps, null)(PubnubChat)

### `frontend/src/pages/ForegroundNotification/index.js`
  export default connect(

### `frontend/src/pages/Notifications/index.js`
  export default connect(mapStateToProps, mapDispatchToProps)(Notifications)

### `frontend/src/pages/ManageServices/index.jsx`
  export default connect(mapStateToProps, mapDispatchToProps)(ManageServices);

### `frontend/src/utils/XHR.js`
  export default (url, options) => axios(url, options).then(checkStatus).then(parseJSON);

### `frontend/src/utils/alerts.js`
  export const errorAlert = (err) => {
  export const successAlert = (msg) => {

### `frontend/src/utils/commonFunction.js`
  export const firstLetterCapital = value => {

### `frontend/src/utils/constants.js`
  export const notificationItems = []

### `frontend/src/utils/http.js`
  export const request = axios.create({
  export function setupHttpConfig(callBack) {

### `frontend/src/utils/useForm.js`
  export default useForm

### `frontend/src/utils/utils.js`
  export const cloneArray = (data) => {
  export const fetchChannels = (pubnub, userId, Name) => {
  export const timeSince = (date) => {
  export const removeDuplication = (arr) => {
  export const sortArray = (arr) => {
  export function getByValue(arr, value) {
  export const loadHistory = (data) => {
  export const listener = (state, dispatch, user) => ({
  export const makeChannelsList = (list) => {
  export const createDirectChannel = async (
  export const createGroupChannel = async (

### `frontend/src/utils/validation.js`
  export default validator;

### `frontend/src/data/index.js`
  export { default as users } from "./users/users.json";
  export { default as directChannels } from "./channels/direct.json";
  export { default as eventChannels } from "./channels/event.json";
  export { default as socialChannels } from "./channels/social.json";
  export { default as workChannels } from "./channels/work.json";
  export { default as loremMessages } from "./messages/lorem.json";
  export { default as socialMessages } from "./messages/social.json";

### `frontend/src/reduxStore/rootReducer.js`
  export const combinedReducers = combineReducers({

### `frontend/src/reduxStore/rootSaga.js`
  export function* rootSaga() {

### `frontend/src/reduxStore/store.js`
  export const history = createBrowserHistory()
  export {store, persistor}

### `frontend/src/layout/HomeLayout/index.js`
  export default HomeLayout;

### `frontend/src/layout/Auth/index.js`
  export default Auth;

### `frontend/src/layout/Admin/index.js`
  export default Admin;

### `frontend/src/contexts/theme-context.js`
  export const ThemeContext = createContext({

### `frontend/src/RouterGuard/index.js`
  export default connect(mapStateToProps, null)(RouteGuard);

### `frontend/.kilo/worktrees/unmarred-azalea/App.js`
  export default () => <App />;

### `backend/manage.py`
  def main()

### `backend/property_plan/admin.py`
  class PropertyAdmin(admin.ModelAdmin)
  class FloorPlanAdmin(admin.ModelAdmin)

### `backend/property_plan/apps.py`
  class PropertyPlanConfig(AppConfig)

### `backend/property_plan/models.py`
  class Property(models.Model)
    def __str__(self)
  class FloorPlan(models.Model)
  class Meta

### `backend/property_plan/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/property_plan/migrations/0002_auto_20230307_1023.py`
  class Migration(migrations.Migration)

### `backend/property_plan/migrations/0003_auto_20230307_1054.py`
  class Migration(migrations.Migration)

### `backend/property_plan/api/v1/serializers.py`
  class PropertySerializer(serializers.ModelSerializer)
  class FloorPlanSerializer(serializers.ModelSerializer)
  class Meta
  class Meta

### `backend/property_plan/api/v1/viewsets.py`
  class PropertyViewSet(ModelViewSet)
    def list(self, request)
    def get_property_floor_plan(self, request, pk)

### `backend/service_provider/admin.py`
  class LiveTrackingAdmin(admin.ModelAdmin)
  class EmployeeAvailableTimeAdmin(admin.ModelAdmin)
  class AvailableTimeSlotsAdmin(admin.ModelAdmin)

### `backend/service_provider/apps.py`
  class ServiceProviderConfig(AppConfig)

### `backend/service_provider/models.py`
  class LiveTracking(models.Model)
    def __str__(self)
  class EmployeeAvailableTime(models.Model)
    def __str__(self)
  class AvailableTimeSlots(models.Model)

### `backend/service_provider/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0002_auto_20210824_1635.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0003_employeeavailabletime.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0004_auto_20210826_1508.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0005_auto_20210826_1518.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0006_employeeavailabletime_status.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0007_auto_20210827_0720.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0008_employeeavailabletime_price.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0009_employeeavailabletime_service.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0010_auto_20230207_1224.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0010_availabletimeslots.py`
  class Migration(migrations.Migration)

### `backend/service_provider/migrations/0011_merge_20230214_1315.py`
  class Migration(migrations.Migration)

### `backend/service_provider/api/v1/serializers.py`
  class UserProfile(serializers.ModelSerializer)
  class EmployeeProfileSerializer(serializers.ModelSerializer)
    def update(self, request, validated_data)
  class EmployeeProfileImageSerializer(serializers.ModelSerializer)
  class LiveTrackingSerializer(serializers.ModelSerializer)
  class EmployeeCategorySerializer(serializers.ModelSerializer)
  class EmployeeBookingRequestSerializer(serializers.ModelSerializer)
  class EmployeeServiceTimeSerializer(serializers.ModelSerializer)
  class EmployeeAvailableTimeSerializer(serializers.ModelSerializer)
  class AvailableTimeSlotSerializer(serializers.ModelSerializer)
    def validate(self, attrs)
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta

### `backend/service_provider/api/v1/viewsets.py`
  class EmployeeProfileViewSet(ModelViewSet)
    def get_queryset(self)
    def set_employee_profile_picture(self, request, pk)
  class LiveTrackingViewSet(ModelViewSet)
    def get_queryset(self)
  class EmployeeServiceViewSet(ModelViewSet)
    def get_queryset(self)
  class EmployeeBookingRequestViewSet(ModelViewSet)
    def get_queryset(self)
    def update(self, request)
  class EmployeeBookingRequestPendingViewSet(ModelViewSet)
    def get_queryset(self)
  class EmployeeBookingRequestAcceptedViewSet(ModelViewSet)
    def get_queryset(self)
  class EmployeeServiceTimeViewSet(ModelViewSet)
    def get_queryset(self)
  class EmployeeAvailableTimeViewSet(ModelViewSet)
    def list(self, request)
    def get_employee_slots(self, request, pk)
  class AvailableTimeSlotViewSet(ModelViewSet)
    def list(self, request)

### `backend/booking/admin.py`
  def custom_titled_filter(title)
  class BookingRequestAdmin(admin.ModelAdmin)
  class BookingRequestServicesAdmin(admin.ModelAdmin)
  class BookingRequestRecurringAdmin(admin.ModelAdmin)
  class ServicesTimeSlotsAdmin(admin.ModelAdmin)
  class Wrapper(admin.FieldListFilter)
    def __new__(cls)

### `backend/booking/apps.py`
  class BookingConfig(AppConfig)

### `backend/booking/models.py`
  class BookingRequest(models.Model)
    def __str__(self)
  class BookingRequestServices(models.Model)
    def __str__(self)
  class BookingRequestRecurring(models.Model)
  class ServicesTimeSlots(models.Model)
  class Meta

### `backend/booking/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0002_bookingrequestrecurring.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0003_auto_20230201_1248.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0004_auto_20230202_0704.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0005_auto_20230203_1018.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0006_auto_20230203_1136.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0007_bookingrequestservices_additional_info.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0008_auto_20230207_0801.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0009_auto_20230208_1354.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0010_auto_20230214_1318.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0011_auto_20230221_1140.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0012_auto_20230224_1038.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0013_auto_20230330_0638.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0014_auto_20230330_0816.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0015_auto_20230427_1948.py`
  class Migration(migrations.Migration)

### `backend/booking/migrations/0016_auto_20230512_1159.py`
  class Migration(migrations.Migration)

### `backend/booking/api/v1/serializers.py`
  class ServicesTimeSlotsSerializer(serializers.ModelSerializer)
  class BookingRequestRecurringSerializer(serializers.ModelSerializer)
  class BookingRequestServiceCreateSerializer(serializers.ModelSerializer)
  class BookingRequestCreateSerializer(serializers.ModelSerializer)
    def create(self, validated_data)
  class BookingRequestServiceUpdateSerializer(serializers.ModelSerializer)
    def update(self, instance, validated_data)
  class BookingRequestUpdateSerializer(serializers.ModelSerializer)
  class EmployeeSerializer(serializers.ModelSerializer)
  class AvailableTimeSerializer(serializers.ModelSerializer)
  class BookingRequestServiceSerializer(serializers.ModelSerializer)
  class BookingRequestSerializer(serializers.ModelSerializer)
  class BookingRequestPastServiceSerializer(serializers.ModelSerializer)
    def get_booking_date(self, object)
  class BookingServiceDetailSerializer(serializers.ModelSerializer)
  class AllServicesSerializer(serializers.ModelSerializer)
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta

### `backend/booking/api/v1/viewsets.py`
  class BookingRequestViewSet(ModelViewSet)
    def get_booking_services(self, request, pk)
    def get_past_service(self, request)
    def get_recurring_service(self, request)
    def get_serializer_class(self)
    def create(self, request)
    def get_queryset(self)
    def update(self, request)
  class BookingRequestServiceViewSet(ModelViewSet)
    def get_serializer_class(self)
    def update(self, request)
  class CommunityDesignerBookingViewSet(ModelViewSet)
    def retrieve(self, request)
    def list(self, request)
  class BookingServiceEvents
    def __init__(self, booking_id, employee_name, service_name, service_image, booking_date, ...)
  class AllServicesViewSet(ModelViewSet)
    def list(self, request)

### `backend/coupon/admin.py`
  class CouoponAdmin(admin.ModelAdmin)

### `backend/coupon/apps.py`
  class CouponConfig(AppConfig)

### `backend/coupon/models.py`
  class Coupons(models.Model)
    def __str__(self)

### `backend/coupon/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/contact_us/admin.py`
  class ContactUsAdmin(admin.ModelAdmin)

### `backend/contact_us/apps.py`
  class ContactUsConfig(AppConfig)

### `backend/contact_us/models.py`
  class ContactUs(models.Model)

### `backend/contact_us/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/contact_us/api/v1/serializers.py`
  class ContactUsSerializer(serializers.ModelSerializer)
  class Meta

### `backend/contact_us/api/v1/viewsets.py`
  class ContactUsViewSet(ModelViewSet)

### `backend/payments/admin.py`
  class PaymentRecordAdmin(admin.ModelAdmin)
  class SubscriptionAdmin(admin.ModelAdmin)
  class EmployeeSubscriptionAdmin(admin.ModelAdmin)
  class AvailableServiceAdmin(admin.ModelAdmin)
  class UserSubscriptionAdmin(admin.ModelAdmin)
  class ServiceIncludedAdmin(admin.ModelAdmin)
  class ProductAdmin(admin.ModelAdmin)
    def save_model(self, request, obj, form, change)
    def delete_model(self, request, obj)

### `backend/payments/apps.py`
  class PaymentsConfig(AppConfig)

### `backend/payments/models.py`
  class PaymentRecord(models.Model)
    def __str__(self)
  class AddTip(models.Model)
  class Subscription(models.Model)
    def __str__(self)
  class ServiceIncluded(models.Model)
  class EmployeeSubscription(models.Model)
    def __str__(self)
  class UserSubscription(models.Model)
  class SubscriptionBasedService(models.Model)
  class Products(models.Model)
    def __str__(self)
  class Meta
  class Meta

### `backend/payments/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0002_auto_20210624_1226.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0003_auto_20210625_0945.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0004_auto_20210809_1217.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0005_auto_20210809_1219.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0006_productpriceid.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0007_delete_productpriceid.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0008_employeesubscription_subscription_subscriptionbasedservice_usersubscription.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0009_serviceincluded.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0010_addtip.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0011_subscription_interval.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0012_paymentrecord_extra_charge.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0013_products.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0014_auto_20230523_1239.py`
  class Migration(migrations.Migration)

### `backend/payments/migrations/0015_auto_20230523_1250.py`
  class Migration(migrations.Migration)

### `backend/payments/api/v1/serializers.py`
  class CardDetailSerializer(serializers.Serializer)
  class ChargeSerializer(serializers.ModelSerializer)
  class EmployeeSubscriptionSerializer(serializers.ModelSerializer)
  class ServiceIncludedSerializer(serializers.ModelSerializer)
  class SubscriptionSerializer(serializers.ModelSerializer)
  class SubscriptionBasedServiceSerializer(serializers.ModelSerializer)
  class AddTipSerializer(serializers.ModelSerializer)
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta

### `backend/payments/api/v1/viewsets.py`
  class CardDetailView(APIView)
    def post(request)
  class AddCharge(APIView)
    def post(request)
  class PaymentViewSet(ViewSet)
    def get_customer_id(self, request)
    def get_subscription(self, customer_id)
    def delete_subscription(self, subs_id)
    def delete_card(self, request)
    def get_all_cards(self, request)
    def get_card(self, request)
    def set_card_default(self, request)
    def get_plans(self, request)
    def get_subs(self, request)
    def delete_subs(self, request)
    def create_product(self, request)
    def create_subscription(self, request)
  class EmployeeSubscriptionViewSet(ModelViewSet)
    def create(self, request)
  class SubscriptionViewSet(ModelViewSet)
    def create(self, request)
  class ServiceIncludedView(ModelViewSet)

### `backend/push_notification/admin.py`
  class NotificationAdmin(admin.ModelAdmin)

### `backend/push_notification/apps.py`
  class PushNotificationConfig(AppConfig)
    def ready(self)

### `backend/push_notification/models.py`
  class Notification(models.Model)
    def __str__(self)
  class UserNotification(models.Model)
    def __str__(self)
  def send_notification(sender, instance, created)
  class MessagesNotification(models.Model)

### `backend/push_notification/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/push_notification/migrations/0002_auto_20210922_0952.py`
  class Migration(migrations.Migration)

### `backend/push_notification/migrations/0003_auto_20210923_0940.py`
  class Migration(migrations.Migration)

### `backend/push_notification/migrations/0004_notification_employee_category.py`
  class Migration(migrations.Migration)

### `backend/push_notification/migrations/0005_auto_20230510_1026.py`
  class Migration(migrations.Migration)

### `backend/push_notification/api/v1/serializers.py`
  class FCMDeviceSerializer(serializers.ModelSerializer)
  class NotificationSerializer(serializers.ModelSerializer)
    def get_is_seen(self, obj)
  class UserNotificationSerializer(serializers.ModelSerializer)
  class MessagesNotificationSerializer(serializers.ModelSerializer)
  class Meta
  class Meta
  class Meta
  class Meta

### `backend/push_notification/api/v1/viewsets.py`
  class UserFCMDeviceAdd(CreateAPIView)
    def perform_create(self, serializer)
    def create(self, request)
  class SendTestNotification(APIView)
    def get(request)
  class NotificationViewSet(ModelViewSet)
    def get_queryset(self)
  class UserNotificationViewSet(ModelViewSet)
    def create(self, request)
  class MessagesNotificationViewSet(ModelViewSet)
    def create(self, request)

### `backend/events/admin.py`
  class EventAdmin(admin.ModelAdmin)
  class EventImageAdmin(admin.ModelAdmin)
  class CalendarEventAdmin(admin.ModelAdmin)

### `backend/events/apps.py`
  class EventConfig(AppConfig)

### `backend/events/models.py`
  class Event(models.Model)
    def __str__(self)
  class EventImage(models.Model)
  class CalendarEvent(models.Model)

### `backend/events/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/events/migrations/0002_eventimage.py`
  class Migration(migrations.Migration)

### `backend/events/migrations/0003_auto_20230116_1155.py`
  class Migration(migrations.Migration)

### `backend/events/migrations/0004_auto_20230116_1450.py`
  class Migration(migrations.Migration)

### `backend/events/migrations/0005_auto_20230117_0733.py`
  class Migration(migrations.Migration)

### `backend/events/migrations/0006_remove_calendarevent_show.py`
  class Migration(migrations.Migration)

### `backend/events/api/v1/serializers.py`
  class EventImageSerializer(serializers.ModelSerializer)
  class EventSerializer(serializers.ModelSerializer)
  class CalendarEventSerializer(serializers.ModelSerializer)
  class Meta
  class Meta
  class Meta

### `backend/events/api/v1/viewsets.py`
  class EventView(ModelViewSet)
    def list(self, request)
    def create(self, request)
    def update(self, request)

### `backend/lucky_moon_20705/utils.py`
  def add_notifications(title, message, sender, user_type, receiver)

### `backend/users/adapters.py`
  class AccountAdapter(DefaultAccountAdapter)
    def is_open_for_signup(self, request: HttpRequest)
  class SocialAccountAdapter(DefaultSocialAccountAdapter)
    def is_open_for_signup(self, request: HttpRequest, sociallogin: Any)

### `backend/users/admin.py`
  class UserAdmin(auth_admin.UserAdmin)
  class AddPetAdmin(admin.ModelAdmin)
  class ZipCodeAdmin(admin.ModelAdmin)
  class MarketingAdmin(admin.ModelAdmin)

### `backend/users/apps.py`
  class UsersConfig(AppConfig)
    def ready(self)

### `backend/users/forms.py`
  class UserChangeForm(forms.UserChangeForm)
  class UserCreationForm(forms.UserCreationForm)
    def clean_username(self)
  class Meta(forms.UserChangeForm.Meta)
  class Meta(forms.UserCreationForm.Meta)

### `backend/users/models.py`
  class User(AbstractUser)
    def get_absolute_url(self)
    def srid(self)
    def latitude(self)
    def longitude(self)

### `backend/users/tasks.py`
  def send_user_custom_notification(user_id, title, message)

### `backend/users/views.py`
  class UserDetailView(LoginRequiredMixin, DetailView)
  class UserUpdateView(LoginRequiredMixin, UpdateView)
    def get_success_url(self)
    def get_object(self)
  class UserRedirectView(LoginRequiredMixin, RedirectView)
    def get_redirect_url(self)

### `backend/users/tests/factories.py`
  class UserFactory(DjangoModelFactory)
    def password(self, create: bool, extracted: Sequence[Any])
  class Meta

### `backend/users/tests/test_forms.py`
  class TestUserCreationForm
    def test_clean_username(self)

### `backend/users/tests/test_models.py`
  def test_user_get_absolute_url(user: settings.AUTH_USER_MODEL)

### `backend/users/tests/test_urls.py`
  def test_detail(user: settings.AUTH_USER_MODEL)
  def test_update()
  def test_redirect()

### `backend/users/tests/test_views.py`
  class TestUserUpdateView
    def test_get_success_url(self, user: settings.AUTH_USER_MODEL, request_factory: RequestFactory)
    def test_get_object(self, user: settings.AUTH_USER_MODEL, request_factory: RequestFactory)
  class TestUserRedirectView
    def test_get_redirect_url(self, user: settings.AUTH_USER_MODEL, request_factory: RequestFactory)

### `backend/users/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0002_auto_20200929_1906.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0003_auto_20210527_0607.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0004_auto_20210601_1111.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0005_auto_20210601_1151.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0006_user_stripe_customer_id.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0007_user_image.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0008_addpet.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0009_auto_20230104_0941.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0010_auto_20230104_1107.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0011_zipcode.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0012_auto_20230109_1052.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0013_user_location.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0014_user_stripe_subscription_id.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0015_auto_20230120_0739.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0016_remove_user_stripe_subs_id.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0017_auto_20230125_0714.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0018_user_phone_number.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0019_auto_20230127_1122.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0020_auto_20230127_1203.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0021_auto_20230127_1243.py`
  class Migration(migrations.Migration)

### `backend/users/migrations/0022_auto_20230217_1001.py`
  class Migration(migrations.Migration)

### `backend/users/api/v1/serializers.py`
  class SignupSerializer(serializers.ModelSerializer)
    def _get_request(self)
    def validate_email(self, email)
    def create(self, validated_data)
    def save(self, request)
  class ProfileUpdateSerializer(serializers.ModelSerializer)
  class UserSerializer(serializers.ModelSerializer)
  class CustomTokenSerializer(serializers.ModelSerializer)
  class PasswordSerializer(PasswordResetSerializer)
  class UserSubscriptionSerializer(serializers.ModelSerializer)
  class CommunityDesignerSerializer(serializers.ModelSerializer)
    def validate_email(self, email)
    def create(self, validated_data)
  class DesignerProfileSerializer(serializers.ModelSerializer)
  class DesignerWithReviewsSerializer(serializers.ModelSerializer)
    def get_reviews(self, obj)
  class NewLoginSerializer(LoginSerializer)
  class ResidentsListSerializer(serializers.ModelSerializer)
    def get_subscription(self, obj)
  class NewConciergeLoginSerializer(LoginSerializer)
  class ResetPasswordConfirmSerializer(PasswordTokenSerializer)
    def validate(self, attrs)
  class SendDesignerEmailAndPassSerializer(serializers.Serializer)
  class AllUsersListSerializer(serializers.ModelSerializer)
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta

### `backend/users/api/v1/viewsets.py`
  class SignupViewSet(ModelViewSet)
    def get_serializer_class(self)
  class CommunityDesignerView(ModelViewSet)
  class LoginViewSet(ViewSet)
    def create(self, request)
  class ZipCodeCheckView(views.APIView)
    def get(self, request)
  class DesignerProfileView(ModelViewSet)
    def get_profile_with_reviews(self, request, pk)
    def get_queryset(self)
    def update(self, request)
    def destroy(self, request)
  class LoginAsConcierge(ViewSet)
    def create(self, request)
  class ResidentsListView(ModelViewSet)
    def get_queryset(self)
    def destroy(self, request)
  class ResetPasswordConfirmViewSet(ModelViewSet)
    def create(self, request)
  class SendDesignerEmailAndPassViewSet(GenericAPIView)
    def post(self, request)
  class AllUsersListViewSet(ModelViewSet)

### `backend/terms_and_conditions/apps.py`
  class TermsAndConditionsConfig(AppConfig)

### `backend/terms_and_conditions/models.py`
  class TermAndCondition(models.Model)

### `backend/terms_and_conditions/serializers.py`
  class TermAndConditionSerializer(serializers.ModelSerializer)
  class Meta

### `backend/terms_and_conditions/viewsets.py`
  class ReadOnly(BasePermission)
    def has_permission(self, request, view)
  class TermAndConditionViewSet(viewsets.ModelViewSet)

### `backend/terms_and_conditions/migrations/0001_terms_initial.py`
  class Migration(migrations.Migration)

### `backend/home/admin.py`
  class EmployeeAdmin(admin.ModelAdmin)
  class EmployeePhotoAdmin(admin.ModelAdmin)
  class CategoryAdmin(admin.ModelAdmin)
  class ReviewAdmin(admin.ModelAdmin)
  class BannerAdmin(admin.ModelAdmin)
  class ServiceTimeSlotAdmin(admin.ModelAdmin)
  class MessageAdmin(admin.ModelAdmin)
  class UserMessageAdmin(admin.ModelAdmin)
  class OnBoardAdmin(admin.ModelAdmin)
  class TypeInlineAdmin(admin.TabularInline)
  class OptionAdmin(admin.ModelAdmin)
  class QuestionAdmin(admin.ModelAdmin)
  class AnswerAdmin(admin.ModelAdmin)
  class AddToBagAdmin(admin.ModelAdmin)
  class ServiceDetailAdmin(admin.ModelAdmin)
  class EmployeeCategoryAdmin(admin.ModelAdmin)

### `backend/home/models.py`
  class Category(models.Model)
    def __str__(self)
  class Service(models.Model)
    def __str__(self)
  class Employee(models.Model)
    def __str__(self)
  class EmployeePhoto(models.Model)
    def __str__(self)
  class EmployeeCategory(models.Model)
    def __str__(self)
    def avg_review(self)
  class Review(models.Model)
  class AddToBag(models.Model)
    def __str__(self)
  class BookingRequest(models.Model)
    def __str__(self)
  class Banner(models.Model)
  class ServiceTimeSlot(models.Model)
    def __str__(self)
  class Message(models.Model)
    def __str__(self)
  class UserMessage(models.Model)
    def __str__(self)
  class OnBoard(models.Model)
    def __str__(self)
  class Question(models.Model)
    def __str__(self)
  class Option(models.Model)
    def __str__(self)
  class Answer(models.Model)
  class CustomText(models.Model)
    def __str__(self)
    def api(self)
    def field(self)
  class HomePage(models.Model)
    def api(self)
    def field(self)
  class ServiceDetail(models.Model)
  class Meta
  class Meta

### `backend/home/storage_backends.py`
  class MediaStorage(S3Boto3Storage)

### `backend/home/views.py`
  def home(request)

### `backend/home/migrations/0001_initial.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0002_load_initial_data.py`
  def create_customtext(apps, schema_editor)
  def create_homepage(apps, schema_editor)
  def create_site(apps, schema_editor)
  class Migration(migrations.Migration)

### `backend/home/migrations/0003_bookingrequest_category_employee_employeecategory_employeephoto_employeesubscription_review_subscrip.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0004_auto_20210526_1156.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0005_auto_20210527_1056.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0006_auto_20210527_1117.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0007_auto_20210527_1531.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0008_auto_20210528_0644.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0009_auto_20210528_1100.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0010_auto_20210528_1107.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0011_notification.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0012_auto_20210531_1052.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0013_banner.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0014_notification_message.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0015_auto_20210601_0918.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0016_auto_20210603_0618.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0017_employee_description.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0018_bookingrequest_employee.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0019_auto_20210607_1456.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0020_auto_20210608_0722.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0021_auto_20210608_0726.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0022_auto_20210608_1403.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0023_remove_bookingrequest_employee.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0024_bookingrequest_employee.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0025_auto_20210609_1421.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0026_auto_20210609_1429.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0027_auto_20210610_1153.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0028_auto_20210611_1223.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0029_auto_20210615_1246.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0030_auto_20210615_1320.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0031_remove_usernotification_is_seen.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0032_auto_20210617_0712.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0033_auto_20210621_1154.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0034_review_image.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0035_message_usermessage.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0036_remove_message_image.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0037_auto_20210727_0602.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0038_auto_20210727_0607.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0039_auto_20210727_0609.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0040_bookingrequest_order_status.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0041_onboard.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0042_delete_onboard.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0043_onboard.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0044_auto_20210809_1234.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0045_auto_20210824_0747.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0046_auto_20210824_1103.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0047_auto_20210824_1112.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0048_auto_20210824_1132.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0049_auto_20210824_1209.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0050_auto_20210826_1504.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0051_bookingrequest_bookin_date_time.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0052_auto_20210827_1046.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0053_remove_bookingrequest_booking_date_time.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0054_information.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0055_auto_20210902_1351.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0056_auto_20210903_0641.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0057_auto_20211005_1238.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0058_auto_20211117_1431.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0059_answer_question_type.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0060_answer_user.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0061_remove_question_user.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0062_auto_20211229_0740.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0063_question_icon.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0064_auto_20220127_1105.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0065_addtobag.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0066_auto_20220207_0903.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0067_auto_20220208_0822.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0068_auto_20220208_0824.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0069_bookingrequest_transaction_status.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0070_auto_20220303_1429.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0071_auto_20220609_1015.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0072_auto_20220609_1650.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0073_auto_20220609_1654.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0074_bookingrequest_checkout_confirm.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0075_auto_20230105_1231.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0075_auto_20230109_0723.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0076_remove_category_allowed.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0076_remove_subscription_stripe_subscription_id.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0077_employeesubscription_stripe_subscription_id.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0077_subscriptionbasedservice_allowed.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0078_remove_subscriptionbasedservice_allowed.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0079_category_allowed.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0080_remove_category_allowed.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0081_merge_20230111_1040.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0082_servicedetail.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0083_auto_20230112_0633.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0084_remove_review_image.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0085_auto_20230120_0943.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0086_auto_20230124_1112.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0087_auto_20230126_0717.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0088_auto_20230127_0621.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0089_auto_20230127_0623.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0090_auto_20230214_0800.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0091_auto_20230221_1112.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0092_category_price.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0093_auto_20230222_1129.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0094_auto_20230222_1132.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0095_auto_20230222_1353.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0096_auto_20230223_1541.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0097_service.py`
  class Migration(migrations.Migration)

### `backend/home/migrations/0098_auto_20230512_1159.py`
  class Migration(migrations.Migration)

### `backend/home/templatetags/custom_tags.py`
  def jsonify(obj)
  def model_name(view)

### `backend/home/management/commands/createsuperuserauto.py`
  class Command(createsuperuser.Command)
    def add_arguments(self, parser)
    def handle(self)

### `backend/home/management/commands/customchangepassword.py`
  class Command(BaseCommand)
    def add_arguments(self, parser)
    def handle(self)

### `backend/home/management/commands/generate_project_report.py`
  class Command(BaseCommand)
    def handle(self)

### `backend/home/api/v1/serializers.py`
  class SpecificFieldUserSerializer(serializers.ModelSerializer)
  class ServicesSerializer(serializers.ModelSerializer)
  class ServiceTimeSlotSerializer(serializers.ModelSerializer)
  class EmployeeServicesSerializer(serializers.ModelSerializer)
  class EmployeeCategorySerializer(serializers.ModelSerializer)
  class EmployeePhotoSerializer(serializers.ModelSerializer)
  class EmployeeReviewSerializer(serializers.ModelSerializer)
  class EmployeeReviewCreateSerializer(serializers.ModelSerializer)
  class EmployeeProfileSerializer(serializers.ModelSerializer)
  class BookingRequestSerializer(serializers.ModelSerializer)
  class BannerSerializer(serializers.ModelSerializer)
  class MessageSerializer(serializers.ModelSerializer)
    def get_is_seen(self, obj)
  class OnBoardSerializer(serializers.ModelSerializer)
  class OptionSerializer(serializers.ModelSerializer)
  class QuestionSerializer(serializers.ModelSerializer)
  class AnswerSerializer(serializers.ModelSerializer)
  class CustomerUpdateProfileSerializer(serializers.ModelSerializer)
  class AddToBagSerializer(serializers.ModelSerializer)
  class ServiceDetailSerializer(serializers.ModelSerializer)
    def get_question(self, obj)
  class ServiceSerializer(serializers.ModelSerializer)
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta
  class Meta

### `backend/home/api/v1/viewsets.py`
  class CategoryFilter(rest_filters.FilterSet)
  class ServicesViewSet(ModelViewSet)
    def get_queryset(self)
    def update(self, request)
  class EmployeeProfileViewSet(ModelViewSet)
    def get_queryset(self)
    def get_photo(self, request, pk)
    def get_review(self, request, pk)
    def get_emp_tracking(self, request, pk)
  class EmployeePhotoViewSet(ModelViewSet)
    def get_queryset(self)
    def create(self, request)
  class EmployeeReviewViewSet(ModelViewSet)
    def get_serializer_class(self)
  class BookingRequestViewSet(ModelViewSet)
    def get_queryset(self)
    def get_past_service(self, request)
    def get_cate_detail(self, request, pk)
    def create(self, request)
    def update(self, request)
  class BannerViewSet(ModelViewSet)
  class EmployeeCategoryViewSet(ModelViewSet)
    def get_employee(self, request, pk)
  class MessageViewSet(ModelViewSet)
    def get_queryset(self)
  class OnBoardViewSet(ModelViewSet)
    def get_queryset(self)
  class CustomerUpdateProfileViewSet(ModelViewSet)
    def get_queryset(self)
    def set_profile_picture(self, request, pk)
    def update(self, request)
  class QuestionViewSet(ModelViewSet)
    def get_queryset(self)
  class OptionViewSet(ModelViewSet)
    def get_queryset(self)
  class AnswerViewSet(ModelViewSet)
    def get_queryset(self)
  class AddToBagViewSet(ModelViewSet)
    def get_queryset(self)
  class ServiceDetailViewSet(ModelViewSet)

### `.kilo/worktrees/four-tuba/App.js`
  export default () => <App />;

### `.kilo/worktrees/four-tuba/backend/manage.py`
  def main()