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
            me.template = $('#component-group-template');
            me.newComponentGroupAddBtn = $('#new-component-group-add-btn');
            module.listen();
        },

        toggleNewPage: function () {
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
                me.toggleNewPage();
            });

            me.newComponentGroupAddBtn.click(function () {
                me.addNewItem(
                    $('#new-component-group-name').val(),
                    $('#new-component-group-id').val()
                );
            });

            $('td.edit-icon').click(function () {
                $(this).parent().hide();
                $(this).parent().next(".edit-mode").show();
            });

            $('.update-comp-group').click(function () {
                $(this).parent().parent().hide();
                $(this).parent().parent().prev(".view-mode").show();
            });

            $('td.delete-icon').click(function () {
                $(this).parent().children(".icon-container").each(function () {
                    $(this).hide();
                });

                $(this).parent().children(".delete-mode").first().show();
            });

            $('.delete-component-group').click(function () {
                $(this).parent().parent().children(".icon-container").each(function () {
                    $(this).show();
                });

                $(this).parent().hide();
            });
        },
        
        addNewItem: function (name, id) {
            var me = this;
            var callback = {
                success: function (resp) {
                    var clone = me.template.clone();
                    clone.find("tr").each(function () {
                        $(this).html(
                            $(this).html()
                                .replaceAll("#name#", name)
                                .replaceAll("#group_id#", id)
                        );
                        me.componentsTable.append($(this));
                    });
                    me.toggleNewPage();
                },
                fail: function (resp) {
                    console.log("failed");
                }
            };
            app.ajax("add", {name: name, group_id: id }, callback);
        }
    };

    module.init();
});