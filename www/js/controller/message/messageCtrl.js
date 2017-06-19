/**
 * Created by root on 2017/5/24.
 */

app.register.controller('messageCtrl', ['$scope', '$ionicScrollDelegate', function ($scope, $ionicScrollDelegate) {
    console.log("This is the message page!");

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


}]);