/**
 * Created by Giorgi Megreli on 3/21/2016.
 */
var ComponentBase = {
    init: function() {
        var me = this;
        me.modal = $('#detailed-view');
        me.template = $('#component-template');
        me.list = $('#component-list-wrapper');
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
                    clone.html(html).attr("id","").appendTo(me.list);
                } else {
                    copyFieldValues(me.modal, me.component, me.availableClasses);
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

        $('#detailed-view').on('show.bs.modal', function (e) {
            me.component = $(e.relatedTarget);
            resetModalFields(me.modal);
            if (me.component.hasClass("component")) {
                me.modalState = "update";
                copyFieldValues(me.component, me.modal, me.availableClasses);
            }
        });
    }
};

$(document).ready(function () {
    ComponentBase.init();
});

