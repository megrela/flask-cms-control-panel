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

            },
            failed: function (resp) {

            }
        };

        me.modal.find(".value").each(function () {
            request[$(this).attr('name')] = $(this).val();
        });
        app.ajax(url, request, callback);
    },
    
    setListeners: function () {
        var me = this;
        $('.component-list-filter').change(function () {

        });

        $('#add-new-component-btn').click(function () {
            me.modalState = "new";
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
                for (var i = 0; i < me.availableClasses.length; i++) {
                    var cl = me.availableClasses[i];
                    var els = component.find(cl);
                    if (els.length) {
                        var el = els.first();
                        var target = me.modal.find(cl).first();
                        if (el.is('img')) {
                            target.attr('src', el.attr('src'));
                        } else {
                            var txt = el.text().trim();
                            if (target.is('input') || target.is('select'))
                                target.val(txt);
                            else {
                                target.text(txt);
                            }
                        }
                    }
                }
            }
        });
    }
};

$(document).ready(function () {
    ComponentBase.init();
});

