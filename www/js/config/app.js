var app = angular.module('myApp', ['ionic', 'oc.lazyLoad', 'ngCordova']);

/**
 * 异步加载ui-router-config.js中resolve属性配置的js
 */
app.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {

    //由于script.js是异步加载的，在加载js时angular的controller还没有实例化，所以需要给controller赋值
    app.register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service,
        provider:$provide.provider,
    };

    // app.asyncjs = function (js) {
    //     return ["$q", "$route", "$rootScope", function ($q, $route, $rootScope) {
    //         var deferred = $q.defer();
    //         $script(js, function () {
    //             $rootScope.$apply(function () {
    //                 deferred.resolve();
    //             });
    //         });
    //         return deferred.promise;
    //     }];
    // }
});