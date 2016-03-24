/**
 * Created by gime on 3/23/2016.
 */

$(document).ready(function () {
    ComponentBase.availableClasses.merge([
        ".component-image",
        ".component-description"
    ]);

    ComponentBase.add = function () {
        var me = this;
        var fileUploadCallback = {
            success: function (resp) {
                console.log(resp)
            },
            fail: function () {

            }
        };
        var input = me.modal.find("input[name=image]").first();
        var files = input.prop("files");
        var url = input.attr('data-url');
        app.uploadImage(url, files, fileUploadCallback);
    };
});