/**
 * Created by Giorgi Megreli on 3/20/2016.
 */

$(document).ready(function () {
    var module = {
        init: function () {
            var me = this;
            me.state = "LIST";
            me.newName = $('#new-component-group-name');
            me.newGid = $('#new-component-group-id');
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
                    me.newName.val(),
                    me.newGid.val()
                );
                me.newName.val("");
                me.newGid.val("");
            });

            $(document).on("click",'td.edit-icon', function () {
                $(this).parent().hide();
                $(this).parent().next(".edit-mode").show();
            });

            $(document).on("click",'.update-comp-group', function () {
                var name = $($(this).parent().parent().find(".name")[0]).val();
                var groupId = $($(this).parent().parent().find(".group-id")[0]).val();

                $($(this).parent().parent().prev(".view-mode").find(".name")[0]).text(name);
                $($(this).parent().parent().prev(".view-mode").find(".group-id")[0]).text(groupId);

                $(this).parent().parent().hide();
                $(this).parent().parent().prev(".view-mode").show();

                me.updateItem( $(this).attr("data-id"), name, groupId );
            });

            $(document).on("click", 'td.delete-icon', function () {
                $(this).parent().children(".icon-container").each(function () {
                    $(this).hide();
                });

                $(this).parent().children(".delete-mode").first().show();
            });

            $(document).on("click", '.delete-component-group', function () {
                $(this).parent().parent().next().detach();
                $(this).parent().parent().detach();
                me.removeItem($(this).attr("data-id"));
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
                                .replaceAll("#id#", resp.id)
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
        },

        removeItem: function (id) {
            var me = this;

            var callback = {
                success: function(resp) {},
                fail: function (resp) {
                    console.log("failed");
                }
            };

            app.ajax("remove", {id: id}, callback);
        },

        updateItem: function(id, name, groupId) {
            var callback = {
                success: function (resp) {

                },
                fail: function(resp) {
                    console.log("failed");
                }
            };
            app.ajax("update", {id: id, name: name, group_id: groupId}, callback);
        }


    };

    module.init();
});