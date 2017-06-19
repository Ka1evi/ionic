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

app.register.controller('moduleCtrl', ['$scope', '$state', '$stateParams', 'projectInfo', 'promise', 'popup', function ($scope, $state, $stateParams, projectInfo, promise, popup) {
    var params,
        path,
        url,
        projectId, //当前项目的id
        moduleName, //模块名
        projectName; //当前项目名称

    projectId = $stateParams.projectId;
    projectName = $stateParams.projectName;
    moduleName = $stateParams.modules;

    if (projectName != null) {
        $scope.projectName = projectName;
    }
    if (moduleName != null) {
        $scope.moduleList = moduleName;
    }

    $scope.toUseCase = function (moduleName) {
        params = angular.extend({"opr": "casequery_app"}, {'pmodel': moduleName, 'pid': projectId});
        path = env[env['get']]['model'];
        url = path['case'];

        promise(params, url).then(function (result) {
            if (result.flag) {
                var useCaseDetail = result.data.data;
                if (useCaseDetail != '') {
                    $state.go('tabs.useCase', {'useCaseDetail': useCaseDetail, 'moduleName': moduleName, 'projectId': projectId});
                    console.log('This is useCase page!');
                } else {
                    popup.showAlert('提示', '<p class="text-center tips-danger">该模块下暂无用例！</p>');
                }
            }
        })
    }

    $scope.refreshModule = function () {
        path = env[env['get']]['project']; //获取选择项目的路径
        url = path['project'];
        projectInfo.setProjectId(projectId);
        params = angular.extend({'opr': 'proquery'}, {'id': projectId});

        promise(params, url).then(function (result) {
            if (result.flag) {
                var projectDetail = result.data;
                var module = projectDetail.model;
                projectInfo.setModules(module);          //设置项目下的模块
                $scope.moduleList = projectInfo.getModules(module);
            }
        })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                popup.showAlert('提示', '<p class="text-center tips-success">刷新成功！</p>');
            });
    };

}]);