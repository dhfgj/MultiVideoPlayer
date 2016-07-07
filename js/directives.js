/**
 * Created by Sridhar Mane on 10/16/14.
 */
angular.module('MultiVideo.directives', [])

.directive("dropzone", [function () {
    return {
        restrict: "A",

        link: function (scope, element, attrs) {

            /**
             *Handle Drag Over and Drag Enter
             */
            var processDragOverOrEnter = function (event) {
                if (event !== null) {
                    event.preventDefault();
                }
                return false;
            };
            element.bind('dragover', processDragOverOrEnter);
            element.bind('dragenter', processDragOverOrEnter);

            var validMimeTypes = attrs.dropzone;

            var isTypeValid = function (type) {
                if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
                    return true;
                } else {
                    alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                    return false;
                }
            };

            return element.bind('drop', function (event) {

                if (event !== null) {
                    event.stopPropagation();
                    event.preventDefault();
                }

                var videoPosition = attrs.id.split("-")[1];
                console.log("vdeo dropped at :" + videoPosition);
                for (var i = 0; i < event.dataTransfer.files.length; i++) {
                    if (event.dataTransfer.files.length === 1) {
                        document.getElementsByTagName("video")[videoPosition].src = window.URL.createObjectURL(event.dataTransfer.files[i]);
                    }
                    if (event.dataTransfer.files.length > 1) {
                        document.getElementsByTagName("video")[i].src = window.URL.createObjectURL(event.dataTransfer.files[i]);
                    }
                }


                return false;
            });

        }
    };
}]);