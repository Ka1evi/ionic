/**
 * Created by root on 2017/6/17.
 */

app.run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.$on('$cordovaLocalNotification:schedule',
            function (event, notification, state) {
                console.log("SCHEDULE");
                console.log('event', event);
                console.log('notification', notification);
                console.log('state', state);
            });

        $rootScope.$on('$cordovaLocalNotification:trigger',
            function (event, notification, state) {
                console.log("TRIGGER");
                console.log('event', event);
                console.log('notification', notification);
                console.log('state', state);
            });

    });
})

app.register.controller('tabsCtrl', ['$scope', '$cordovaLocalNotification', 'socket', function ($scope, $cordovaLocalNotification, socket) {
    console.log("Now is the tabs page!");

    $scope.execInfo = [];
    // Socket listeners
    socket.emit('my_connect', {data: 'I\'m connected!'});
    socket.on('my_response', function (msg) {
        $scope.execInfo.push(angular.fromJson(msg));
        $cordovaLocalNotification.schedule({
            id: 1,
            text: '用例执行提醒',
            title: '有新的用例执行了，快来查看详情！',
        });
    })
    

}]);