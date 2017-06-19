/**
 * Created by root on 2017/5/24.
 */

app.register.controller('userCtrl', ['$scope', '$state', 'projectInfo', function ($scope, $state, projectInfo) {
    console.log('This is user page!');

    $scope.company = "有路科技";
    $scope.department = "技术部";
    var userName = projectInfo.getUserName();
    if (userName != null) {
        $scope.currentUser = userName;
    }

    $scope.exit = function () {
        //退出时清空info服务的数据
        var infoKey = Object.keys(projectInfo);
        for (var attr in Object.keys(projectInfo)) {
            var key = infoKey[attr];
            var fn = projectInfo[key];
            if (key.includes('set')) {
                fn('');
            }
        }
        //跳转至登录页
        $state.go('login');
    }
}]);