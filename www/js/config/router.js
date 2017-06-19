/*
 * 配置项目路由，同时异步加载所需的js文件
 */

app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    //配置tabs样式及显示位置
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.scrolling.jsScrolling(false);

    // 配置页面路由跳转路径
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login/login.html',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['js/controller/login/loginCtrl.js', 'js/service/popup.js', 'js/service/projectInfo.js', 'js/service/promise.js']);
                }],
            },
            controller: 'loginCtrl'
        })

        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'pages/tabs/tabs.html',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['js/controller/tabs/tabsCtrl.js', 'js/service/popup.js', 'js/service/projectInfo.js', 'js/service/promise.js', 'js/service/socket.js']);
                }],
            },
            controller: 'tabsCtrl'
        })

        .state('tabs.project', {
            url: '/project',
            views: {
                'project-tab': {
                    templateUrl: 'pages/project/project.html',
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controller/project/projectCtrl.js', 'js/service/projectInfo.js', 'js/service/promise.js']);
                        }],
                    },
                    controller: 'projectCtrl'
                }
            },
            params: {projects: null}
        })

        .state('tabs.testResult', {
            url: '/testResult',
            views: {
                'project-tab': {
                    templateUrl: 'pages/project/testResult.html',
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controller/project/testResultCtrl.js', 'js/service/projectInfo.js', 'js/service/promise.js']);
                        }],
                    },
                    controller: 'testResultCtrl'
                }
            },
            params: {projectDetail: null, projectId: null, projectName: null}
        })

        .state('tabs.useCaseTemplate', {
            url: '/useCaseTemplate',
            views: {
                'project-tab': {
                    templateUrl: 'pages/project/useCaseTemplate.html',
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controller/project/useCaseTemplateCtrl.js', 'js/service/projectInfo.js', 'js/service/promise.js']);
                        }],
                    },
                    controller: 'useCaseTemplateCtrl'
                }
            },
            params: {templateDetail: null, projectId: null}
        })

        .state('tabs.module', {
            url: "/module",
            views: {
                'project-tab': {
                    templateUrl: "pages/project/module.html",
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controller/project/moduleCtrl.js', 'js/service/projectInfo.js', 'js/service/promise.js']);
                        }],
                    },
                    controller: 'moduleCtrl'
                }
            },
            params: {modules: null, projectId: null, projectName: null}
        })

        .state('tabs.testRecord', {
            url: '/testReview',
            views: {
                'project-tab': {
                    templateUrl: 'pages/project/testRecord.html',
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controller/project/testRecordCtrl.js', 'js/service/projectInfo.js', 'js/service/promise.js']);
                        }],
                    },
                    controller: 'testRecordCtrl'
                }
            },
            params: {execDetail: null, useCaseId: null}
        })

        .state('tabs.useCase', {
            url: '/useCase',
            views: {
                'project-tab': {
                    templateUrl: 'pages/project/useCase.html',
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controller/project/useCaseCtrl.js', 'js/service/popup.js', 'js/service/projectInfo.js', 'js/service/promise.js']);
                        }],
                    },
                    controller: 'useCaseCtrl'
                }
            },
            params: {useCaseDetail: null, moduleName: null, projectId: null}
        })

        .state('tabs.message', {
            url: '/message',
            cache: false,
            views: {
                'message-tab': {
                    templateUrl: 'pages/message/message.html',
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controller/message/messageCtrl.js']);
                        }],
                    },
                    controller: 'messageCtrl'
                }
            }
        })

        .state('tabs.user', {
            url: '/user',
            cache: false,
            views: {
                'user-tab': {
                    templateUrl: 'pages/user/user.html',
                    resolve: {
                        load: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controller/user/userCtrl.js', 'js/service/projectInfo.js']);
                        }],
                    },
                    controller: 'userCtrl'
                }
            },
            params: {useName: null}
        });

    // 设置路由默认跳转路径
    $urlRouterProvider.otherwise('login');

}])