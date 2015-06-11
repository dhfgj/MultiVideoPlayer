angular.module('MultiVideo.controllers', [])

.controller('VideoCtrl', ["$scope", "$sce", function ($scope, $sce) {
    // Form data for the login modal
    this.config = {

        }
        //$sce.trustAsResourceUrl($videos)
    $scope.vgAPIArr = [];
    $scope.videos = [
        {
            source: [
                {
                    src: "animation0.mp4",
                    type: "video/mp4"
                }
                ]
            },
        {
            source: [
                {
                    src: "animation1.mp4",
                    type: "video/mp4"
                }
                ]
            },
        {
            source: [
                {
                    src: "animation2.mp4",
                    type: "video/mp4"
                }
                ]
            },
        {
            source: [
                {
                    src: "animation3.mp4",
                    type: "video/mp4"
                }
                ]
            }
        ];
    $scope.onPlayerReady = function (API, index) {
        $scope.vgAPIArr[index] = API;

    };

    $scope.togglePlayPause = function () {

        if ($scope.vgAPIArr[0].currentState === "play") {
            for (var i = 0; i < 4; i++) {
                $scope.vgAPIArr[i].pause();
            }
        } else if ($scope.vgAPIArr[0].currentState === "pause") {
            for (var i = 0; i < 4; i++) {
                $scope.vgAPIArr[i].play();
            }
        } else if ($scope.vgAPIArr[0].currentState === "stop") {
            for (var i = 0; i < 4; i++) {
                $scope.vgAPIArr[i].play();
            }
        }


    };



}]);