/**
 * Created by Giorgi Megreli on 3/20/2016.
 */

$(document).ready(function () {
    var module = {
        init: function () {
            var me = this;
            me.new = {
                name: $("#new-component-group-name"),
                groupId: $("#new-component-group-group-id"),
                btn: $('#new-component-group-add-btn')
            };
            me.template = $('#component-group-template');
            me.list = $('#component-group-list');

            module.listen();
        },

        listen: function() {
            var me = this;

            me.new.btn.click(function () {
                me.addNewItem(me.new.name.val(), me.new.groupId.val());
            });

            $(document).on('click', '.update-btn', function () {
                var form = $(this).parents("form:first");
                var id = form.attr('data-id');
                var name = form.find(".name").first();
                var groupId = form.find(".group-id").first();
                me.updateItem(id, name, groupId);
            });

            $(document).on('click', '.remove-btn', function () {
                var form = $(this).parents("form:first");
                var id = form.attr('data-id');
                me.removeItem(id);
                form.detach();
            });
        },
        
        addNewItem: function (name, id) {
            var me = this;
            var callback = {
                success: function (resp) {
                    var clone = me.template.clone();
                    me.new.name.val('');
                    me.new.groupId.val('');
                    clone.html(
                        clone.html()
                            .replaceAll("#name#", name)
                            .replaceAll("#group_id#", id)
                            .replaceAll("#id#", resp.id)
                    ).css('display','');
                    me.list.append(clone);
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
                fail: function (resp) {}
            };

            app.ajax("remove", {id: id}, callback);
        },

        updateItem: function(id, name, groupId) {
            var callback = {
                success: function (resp) {
                    name.attr('data-old-value', name.val());
                    groupId.attr('data-old-value', groupId.val());
                },
                fail: function(resp) {}
            };
            app.ajax("update", {id: id, name: name.val(), group_id: groupId.val()}, callback);
        }
    };

    module.init();
});