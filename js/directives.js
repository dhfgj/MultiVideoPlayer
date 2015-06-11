/**
 * Created by Sridhar Mane on 10/16/14.
 */
angular.module('MultiVideo.directives', [])
    .directive('videoTemplate', function () {
        return {
            restrict: 'E',
            templateNamespace:'svg',
            templateUrl: "videoTemplate.html",
        };
    });