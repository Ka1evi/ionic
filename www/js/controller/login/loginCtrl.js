/**
 * Created by root on 2017/5/24.
 */

app.register.controller('loginCtrl', ['$scope', '$state', '$ionicLoading', '$timeout', 'popup', 'projectInfo', 'promise', function ($scope, $state, $ionicLoading, $timeout, popup, projectInfo, promise) {

    var params;
    var path = env[env['get']]['login']; //获取登陆模块的路径
    var url = path['login'];

    //登录
    $scope.toProject = function () {
        var userName = document.getElementById('userName').value;
        var password = document.getElementById('password').value;

        params = angular.extend({
            'opr': 'login'
        }, {
            'name': userName,
            'pwd': password
        });

        promise(params, url).then(function (result) {
            if (result.flag) {
                if (result.data.status === 0) {
                    var projects = result.data.data; //获取的是数组
                    projectInfo.setUserName(userName);
                    projectInfo.setProjects(projects);

                    $state.go('tabs.project', {'projects': projects});

                    //清空表单数据
                    $scope.userName = '';
                    $scope.password = ''

                    // 登录加载效果
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
                    $timeout(function () {
                        $ionicLoading.hide();
                        console.log('I\'m go to tabs page!');
                    }, 1000);
                    console.log("This is project page!");
                } else {
                    popup.showAlert('提示', '<p class="text-center tips-danger">用户名或密码错误！</p>');
                    //清空表单数据
                    $scope.password = '';
                }
            }
        })
    }


}]);