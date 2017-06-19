/**
 * Created by root on 2017/5/31.
 */

app.register.provider('popup', function () {
    this.$get = function ($ionicPopup, $timeout) {
        var popup = {};
        popup.showAlert = function (titleText, contentText) {
            var alertPopup = $ionicPopup.show({
                title: titleText,
                template: contentText
            });
            $timeout(function () {
                alertPopup.close(); // 1.5秒后关闭弹窗
            }, 1500);
            return alertPopup;
        };
        return popup;
    }
})