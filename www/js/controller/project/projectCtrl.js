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

app.register.controller('projectCtrl', ['$scope', '$state', '$stateParams', 'promise', 'projectInfo', 'popup', function ($scope, $state, $stateParams, promise, projectInfo, popup) {
    var params,
        path,
        url;

    path = env[env['get']]['project']; //获取选择项目的路径
    url = path['project'];
    //获取项目列表
    $scope.projectList = $stateParams.projects;

    //跳转到模块列表
    $scope.toModule = function (projectName, projectId) {
        projectInfo.setProjectName(projectName);
        projectInfo.setProjectId(projectId);

        params = angular.extend({'opr': 'proquery'}, {'id': projectId});

        promise(params, url).then(function (result) {
            if (result.flag) {
                var projectDetail = result.data;
                var modules = projectDetail.model;
                console.log(projectDetail);
                projectInfo.setModules(modules);          //设置项目下的模块
                projectInfo.setFromPage('project');     //设置来的页面
                if (modules != '') {
                    $state.go('tabs.module', {'modules': modules, 'projectId': projectId, 'projectName':projectName});
                    console.log("this is module page!");
                } else {
                    popup.showAlert('提示', '<p class="text-center tips-danger">该项目下暂无模块！</p>');
                }
            }
        })
    }

    $scope.testResult = function (projectName, projectId) {
        projectInfo.setProjectName(projectName);
        projectInfo.setProjectId(projectId);

        params = angular.extend({'opr': 'proquery'}, {'id': projectId});

        promise(params, url).then(function (result) {
            if (result.flag) {
                var projectDetail = result.data;
                var module = projectDetail.model;
                projectInfo.setModules(module);          //设置项目下的模块
                projectInfo.setFromPage('project');     //设置来的页面
                $state.go('tabs.testResult', {'projectDetail': projectDetail, 'projectId': projectId, 'projectName': projectName});
                console.log("this is testResult page!");
            }
        })
    }

    $scope.useCaseTemplate = function (projectId) {
        params = angular.extend({"opr": "cmquery_app"}, {'pid': projectId});
        var path_1 = env[env['get']]['case_model'];
        var url_1 = path_1['case_model'];

        promise(params, url_1).then(function (result) {
            if (result.flag) {
                var templateDetail = result.data.data;
                if (templateDetail != '') {
                    $state.go('tabs.useCaseTemplate', {'templateDetail': templateDetail, 'projectId': projectId});
                    console.log("this is useCaseTemplate page!")
                } else {
                    popup.showAlert('提示', '<p class="text-center tips-danger">该项目下暂无用例模板！</p>');
                }

            }
        })
    }

    $scope.refreshProject = function () {
        params = angular.extend({'opr': 'proquery_app'});

        promise(params, url).then(function (result) {
            if (result.flag) {
                var projects = result.data.data;
                projectInfo.setProjects(projects);
                $scope.projectList = projectInfo.getProjects(projects);
            }
        })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                popup.showAlert('提示', '<p class="text-center tips-success">刷新成功！</p>');
            });
    };

}]);