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

        $('#detailed-view').on('show.bs.modal', function (e) {
            var component = $(e.relatedTarget);
            var modal = $(this);

            for (var i=0; i<me.availableClasses.length; i++) {
                var cl = me.availableClasses[i];
                var els = component.find(cl);
                if (els.length) {
                    var el = els.first();
                    var target = modal.find(cl).first();

                    if (el.is('img')) {
                        target.attr('src', el.attr('src'));
                        console.log(el.attr('src'));
                    } else {
                        var txt = el.text().trim();
                        console.log(txt);
                        if (target.is('input') || target.is('select'))
                            target.val(txt);
                        else
                            target.text(txt);
                    }
                }
            }

            modal.find('.reset').each(function () {
                $(this).text('');
                $(this).val('');
            });

            modal.find('.reset-hide').each(function () {
                $(this).hide();
            });
        });
    },

    updateList: function(groupId) {
        $('tr.component').each(function () {
            $(this).hasClass("visible")
        });
    }
};

$(document).ready(function () {
    ComponentBase.init();
});

