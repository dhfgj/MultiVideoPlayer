angular.module('MultiVideo.controllers', [])

.controller('VideoCtrl', ["$scope", "$sce", function ($scope, $sce) {
        // Form data for the login modal
        $scope.status = 'paused';
        $scope.playbackRate = 1;
        $scope.volume = 100;
        $scope.muted = false;
        $scope.currentTime = 0;
        $scope.duration = 0;
        $scope.videos = [
            {
                src: "",
                volume: 100,
                isMute: false,
                obj: document.getElementById("video-0"),
                id: "video-0"
            },
            {
                src: "",
                volume: 100,
                isMute: false,
                obj: document.getElementById("video-1"),
                id: "video-1"
            },
            {
                src: "",
                volume: 100,
                isMute: false,
                obj: document.getElementById("video-2"),
                id: "video-2"
            },
            {
                src: "",
                volume: 100,
                isMute: false,
                obj: document.getElementById("video-3"),
                id: "video-3"
            }
        ];

        $scope.updateProgress = function (e) {
            $scope.$apply(function () {

                $scope.currentTime = $scope.videos[0].obj.currentTime;

                console.log($scope.currentTime + ":" + $scope.duration);
            });
        };

        $scope.updateDuration = function () {
            $scope.$apply(function () {
                $scope.videos[0].obj = document.getElementById("video-0");
                $scope.duration = $scope.videos[0].obj.duration;
                document.getElementById("seekBar").max = Math.floor($scope.duration);
                console.log("durationChanged to: " + $scope.duration);
            });
        };
        $scope.doSeek = function () {
            Array.prototype.forEach.call($scope.videos, function (video) {
                if (video.obj) {
                    video.obj.currentTime = $scope.currentTime;
                    console.log(video.id + " : " + video.obj.currentTime);
                }
            });
        };
        $scope.togglePlayPause = function () {
            for (var i = 0; i < 4; i++) {
                var video = document.getElementById("video-" + i);
                //Add event listener only for 1st video
                $scope.videos[i].obj = video;
                if (i === 0) {
                    video.addEventListener('timeupdate', $scope.updateProgress, false);
                    video.addEventListener('durationchange', $scope.updateDuration, false);
                }
                if ($scope.currentTime === 0)
                    video.load();
                if (video.paused && video.src !== '') {
                    video.play();
                    $scope.status = "playing";
                } else if (!video.paused && video.src !== '') {
                    video.pause();
                    $scope.status = "paused";
                }
            }
        };
        $scope.stop = function () {
            Array.prototype.forEach.call($scope.videos, function (video) {
                if (video.obj) {
                    video.obj.load(); //Loads the video and reset the play head to the beginning of the video
                    console.log("Stopping: " + video.id);
                }
                $scope.status = "paused";
                $scope.currentTime = 0;
            });
        };
        $scope.setPlaybackRate = function () {
            Array.prototype.forEach.call($scope.videos, function (video) {
                video.obj.playbackRate = $scope.playbackRate;
            });

        };
        $scope.setVolume = function () {
            Array.prototype.forEach.call($scope.videos, function (video) {
                video.obj.volume = $scope.volume;
                console.log("video-" + video.id + " volume : " + video.obj.volume);
            });

        };
        $scope.toggleMute = function (indexes) {
            console.log(indexes.length + " " + indexes);
            if (indexes.length === 4) {
                $scope.muted = !$scope.muted;
                for (var i = 0; i < indexes.length; i++) {
                    if ($scope.videos[indexes[i]].obj)
                        $scope.videos[indexes[i]].obj.muted = $scope.muted;
                    console.log(i + ":" + $scope.muted);
                }
            } else {
                var video = $scope.videos[indexes[0]];
                if (video.obj === null)
                    video.obj = document.getElementById("video-" + indexes[0]);
                if (video.obj.muted === true) {
                    video.obj.muted = false;
                } else {
                    video.obj.muted = true;
                }
                console.log("video-" + indexes[0] + " " + video.obj.muted);
            }
        };

        $scope.clearVideo = function (index) {
            var video = $scope.videos[index];
            video.src = "";
            if (video.obj)
                video.obj.src = "";
            else {
                video.obj = document.getElementById("video-" + index);
                video.obj.src = "";
            }
            console.log("source cleared");
        };
}])
    .filter('mmss', function () {
        return function (time) {
            var mm = Math.floor(time / 60.0);
            var ss = parseInt(time) % 60;
            ss = (ss < 10) ? '0' + ss : ss;
            return mm + ":" + ss;
        }
    });