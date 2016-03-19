/**
 * Created by Giorgi Megreli on 3/20/2016.
 */

$(document).ready(function () {
    var module = {
        init: function () {
            var me = this;
            me.state = "LIST";
            me.addNewBtn = $('#add-new-component-group');
            me.componentsTable = $('#component-list');
            me.newComponentPage = $('#new-component-page');
            me.saveComponentBtn = $('#save-component-btn');
            me.cancelAddition = $('#cancel-addition');

            module.listen();
        },

        togglePage: function () {
            var me = this;
            if (me.state == "LIST") {
                me.addNewBtn
                    .removeClass("btn-success")
                    .addClass("btn-danger")
                    .text("Cancel");
                me.state = "LIST,ADD"
            } else {
                me.addNewBtn
                    .addClass("btn-success")
                    .removeClass("btn-danger")
                    .text("Add New");
                me.state = "LIST";
            }
            me.newComponentPage.toggle();
        },

        listen: function() {
            var me = this;

            me.addNewBtn.click(function () {
                me.togglePage();
            });

            me.saveComponentBtn.click(function () {
                //ajax call to server
                //check
                //notify
            });
        }
    };

    module.init();
});