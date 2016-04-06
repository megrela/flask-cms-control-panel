/**
 * Created by Giorgi Megreli on 3/21/2016.
 */
var ComponentBase = {
    init: function() {
        var me = this;
        me.modal = $('#detailed-view');
        me.template = $('#component-template');
        me.list = $('#component-list-wrapper');
        me.filter = $('#component-group-filter');
        me.setListeners();
        me.availableClasses = [
            ".component-name",
            ".component-key",
            ".component-group",
            ".component-id"
        ];
    },

    baseSave: function () {
        var me = this;
        var request = {};
        var url = me.modalState;
        var callback = {
            success: function (resp) {
                if (me.modalState == "add") {
                    var clone = me.template.clone();
                    var html = clone.html();
                    $.each(resp, function (key, value) {
                        html = html.replaceAll("#"+key+"#", value);
                    });
                    $.each(request, function (key, value) {
                        html = html.replaceAll("#"+key+"#", value);
                    });
                    me.applyFilter(clone, me.filter.val() );
                    clone.html(html).attr("id","").appendTo(me.list);
                } else {
                    copyFieldValues(me.modal, me.component, me.availableClasses);
                    me.applyFilter(me.component, me.filter.val());
                }
            },
            fail: function (resp) {
                console.log(resp);
            }
        };

        me.modal.find(".value").each(function () {
            var val = "";
            if ($(this).is("textarea"))
                val = $(this).prop("value");
            else val = $(this).val();
            request[$(this).attr('name')] = val;
        });
        app.ajax(url, request, callback);
    },

    remove: function () {
        var me = this;
        var id = me.component.find(".component-id").first().text();
        var callback = {
            success: function (resp) {
                me.component.detach();
            },
            fail: function (resp) {
            }
        };
        app.ajax("remove", {id: id}, callback);
    },

    setListeners: function () {
        var me = this;
        $('.component-list-filter').change(function () {

        });

        $('#add-new-component-btn').click(function () {
            me.modalState = "add";
            me.modal.modal("show");
        });

        $('#modal-save').click(function () {
            me.save();

        });

        $('#modal-delete').click(function () {
            me.remove();
        });

        $('#detailed-view').on('show.bs.modal', function (e) {
            me.component = $(e.relatedTarget);
            resetModalFields(me.modal);
            if (me.component.hasClass("component")) {
                me.modalState = "update";
                copyFieldValues(me.component, me.modal, me.availableClasses);
            }
        });

        me.filter.change(function () {
            var group = $(this).val();
            me.list.find(".component").each(function () {
                if ($(this).attr('id') != me.template.attr('id'))
                    me.applyFilter($(this), group);
            });
        });
    },

    applyFilter: function (component, group) {
        var should = (group == "" || component.find(".component-group").first().text().trim() == group);
        if (!component.is(":visible") && should) {
            component.fadeIn();
        } else {
            if (component.is(":visible") && !should)
                component.fadeOut();
        }
    }
};

$(document).ready(function () {
    ComponentBase.init();
});

