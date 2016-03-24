/**
 * Created by Giorgi Megreli on 3/21/2016.
 */
var ComponentBase = {
    init: function() {
        var me = this;
        me.modal = $('#detailed-view');
        me.setListeners();
        me.availableClasses = [
            ".component-name",
            ".component-key",
            ".component-group"
        ];
    },

    baseSave: function () {
        var me = this;
        var request = {};
        var url = me.modalState;
        var callback = {
            success: function (resp) {
                console.log(resp);
            },
            fail: function (resp) {
                console.log(resp);
            }
        };

        me.modal.find(".value").each(function () {
            var val = "";
            if ($(this).is("textarea")) val = $(this).text();
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
            var component = $(e.relatedTarget);
            resetModalFields(me.modal);
            if (component.hasClass("component")) {
                me.modalState = "update";
                copyFieldValues(component, me.modal, me.availableClasses);
            }
        });
    }
};

$(document).ready(function () {
    ComponentBase.init();
});

