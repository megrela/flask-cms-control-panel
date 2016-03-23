/**
 * Created by Giorgi Megreli on 3/21/2016.
 */
var ComponentBase = {
    init: function() {
        var me = this;
        me.setListeners();
        me.availableClasses = [
            ".component-name",
            ".component-key",
            ".component-group"
        ];
    },
    
    setListeners: function () {
        var me = this;
        $('.component-list-filter').change(function () {

        });

        $('#add-new-component-btn').click(function () {
            $('#detailed-view').modal("show");
        });

        $('#detailed-view').on('show.bs.modal', function (e) {
            var component = $(e.relatedTarget);
            var modal = $(this);
            resetModalFields(modal);
            if (component.hasClass("card")) {
                for (var i = 0; i < me.availableClasses.length; i++) {
                    var cl = me.availableClasses[i];
                    var els = component.find(cl);
                    if (els.length) {
                        var el = els.first();
                        var target = modal.find(cl).first();
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

