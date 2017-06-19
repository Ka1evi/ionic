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

app.register.controller('useCaseTemplateCtrl', ['$scope', '$state', '$stateParams', '$ionicScrollDelegate', 'promise', 'popup', function ($scope, $state, $stateParams, $ionicScrollDelegate, promise, popup) {
    var params,
        path,
        url,
        projectId, //当前项目的id
        templateDetail; //模板信息

    projectId = $stateParams.projectId;
    templateDetail = $stateParams.templateDetail;
    $scope.templateList = templateDetail;

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

    $scope.refreshTemplate = function () {
        params = angular.extend({"opr": "cmquery_app"}, {'pid': projectId});
        path = env[env['get']]['case_model'];
        url = path['case_model'];

        promise(params, url).then(function (result) {
            if (result.flag) {
                templateDetail = result.data.data;
                $scope.templateList = templateDetail;
            }
        })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                popup.showAlert('提示', '<p class="text-center tips-success">刷新成功！</p>');
            });
    };


}]);