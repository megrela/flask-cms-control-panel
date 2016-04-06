/**
 * Created by gime on 3/23/2016.
 */

$(document).ready(function () {
    ComponentBase.availableClasses.merge([
        ".component-image",
        ".component-description"
    ]);

    ComponentBase.save = function () {
        var me = this;
        var input = me.modal.find("input[name=image]").first();
        var files = input.prop("files");

        if (files.length != 0) {
            var url = input.attr('data-url');
            var fileUploadCallback = {
                success: function (resp) {
                    input.next().val(resp.name);
                    me.baseSave();
                },
                fail: function () {

                }
            };
            app.uploadImage(url, files, fileUploadCallback);
        } else {
            me.baseSave();
        }
    };
});