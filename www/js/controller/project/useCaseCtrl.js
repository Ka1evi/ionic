/**
 * Created by root on 2017/6/2.
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

app.register.controller('useCaseCtrl', ['$scope', '$state', '$stateParams', '$ionicScrollDelegate', 'promise', 'projectInfo', 'popup', function ($scope, $state, $stateParams, $ionicScrollDelegate, promise, projectInfo, popup) {
    var params,
        path,
        url,
        projectId, //当前项目的id
        moduleName, //模块名称
        useCaseDetail; //用例信息

    projectId = $stateParams.projectId;
    useCaseDetail = $stateParams.useCaseDetail;
    moduleName = $stateParams.moduleName;
    $scope.useCaseList = useCaseDetail;

    //控制列表折叠显示内容
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };

    //回到顶部操作
    $scope.scrollTop = function () { //ng-click for back to top button
        //true means trun on animation : )
        $ionicScrollDelegate.scrollTop(true);
    };

    $scope.getScrollPosition = function () {
        //monitor the scroll
        $scope.moveData = $ionicScrollDelegate.$getByHandle('ScrollToTop').getScrollPosition().top;

        if ($scope.moveData >= 250) {
            angular.element('.scrollToTop').fadeIn();
        } else if ($scope.moveData < 250) {
            angular.element('.scrollToTop').fadeOut();
        }
    };

    $scope.testRecord = function (useCaseId) {
        var path = env[env['get']]['model'];
        var url = path['result'];
        var params = angular.extend({'opr': 'caseresult'}, {'id': useCaseId})

        promise(params, url).then(function (result) {

            if (result.flag) {
                try {
                    var execDetail = result.data.data;
                    if(execDetail != '') {
                        $state.go('tabs.testRecord', {'execDetail': execDetail, 'useCaseId': useCaseId});
                        console.log('this is the testRecord page!');
                    } else {
                        popup.showAlert('提示', '<p class="text-center tips-danger">该用例暂无执行记录！</p>');
                    }
                } catch (e) {
                    popup.showAlert('提示', '<p class="text-center tips-danger">查询失败，请查看相关日志！</p>');
                }
            }
        })
    }

    $scope.refreshUseCase = function () {
        params = angular.extend({"opr": "casequery_app"}, {'pmodel': moduleName, 'pid': projectId});
        path = env[env['get']]['model'];
        url = path['case'];

        promise(params, url).then(function (result) {
            if (result.flag) {
                useCaseDetail = result.data.data;
                $scope.useCaseList = useCaseDetail;
            }
        })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                popup.showAlert('提示', '<p class="text-center tips-success">刷新成功！</p>');
            });
    };


}]);