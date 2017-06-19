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

app.register.controller('testResultCtrl', ['$scope', '$stateParams', 'promise', 'projectInfo', 'popup', function ($scope, $stateParams, promise, projectInfo, popup) {
    var params,
        path,
        url,
        projectId, //当前项目的id
        projectName, //当前项目名称
        projectDetail; //项目详情

    projectId = $stateParams.projectId;
    projectName = $stateParams.projectName;
    projectDetail = $stateParams.projectDetail;
    if (projectDetail) {
        var desc = projectDetail.desc;
        var successed = projectDetail.suc_num;
        var failed = projectDetail.fail_num;
    }

    // 初始化charts实例
    var myChart = echarts.init(document.getElementById('projectChart'));

    //指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['成功次数', '失败次数']
        },
        series: [
            {
                name: '测试结果',
                type: 'pie',
                radius: ['50%', '70%'],
                color: ['#91c7ae', '#c23531'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: successed, name: '成功次数'},
                    {value: failed, name: '失败次数'}
                ]
            }
        ]
    };
    $scope.data = [successed, failed];
    //使用配置生成图表
    myChart.setOption(option);
    $scope.peojectDesc = desc;

    $scope.refreshResult = function () {
        projectInfo.setProjectName(projectName);
        projectInfo.setProjectId(projectId);
        params = angular.extend({'opr': 'proquery'}, {'id': projectId});
        path = env[env['get']]['project']; //获取选择项目的路径
        url = path['project'];

        promise(params, url).then(function (result) {
            if (result.flag) {
                var projectDetail = result.data;
                if (projectDetail) {
                    var desc = projectDetail.desc;
                    var successed = projectDetail.suc_num;
                    var failed = projectDetail.fail_num;
                }
                // 初始化charts实例
                var myChart = echarts.init(document.getElementById('projectChart'));
                //指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['成功次数', '失败次数']
                    },
                    series: [
                        {
                            name: '测试结果',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            color: ['#91c7ae', '#c23531'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: successed, name: '成功次数'},
                                {value: failed, name: '失败次数'}
                            ]
                        }
                    ]
                };
                $scope.data = [successed, failed];
                //使用配置生成图表
                myChart.setOption(option);
                $scope.peojectDesc = desc;
            }
        })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
                popup.showAlert('提示', '<p class="text-center tips-success">刷新成功！</p>');
            });
    };


}]);