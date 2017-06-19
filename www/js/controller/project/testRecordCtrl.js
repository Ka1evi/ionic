/**
 * Created by root on 2017/5/24.
 */

//下拉刷新
app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    })
})

app.register.controller('testRecordCtrl', ['$scope', '$stateParams', 'promise', 'popup', function ($scope, $stateParams, promise, popup) {
    var params,
        path,
        url,
        useCaseId, //当前用例的id
        execDetail; //执行信息

    execDetail = $stateParams.execDetail;
    useCaseId = $stateParams.useCaseId;
    $scope.execInfo = execDetail;

    $scope.refreshRecord = function () {
        params = angular.extend({"opr": "caseresult"}, {'id': useCaseId});
        path = env[env['get']]['model'];
        url = path['result'];

        promise(params, url).then(function (result) {
            if (result.flag) {
                execDetail = result.data.data;
                $scope.execInfo = execDetail;
            }
        })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                popup.showAlert('提示', '<p class="text-center tips-success">刷新成功！</p>');
            });

    };


}]);