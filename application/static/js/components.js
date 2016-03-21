/**
 * Created by Giorgi Megreli on 3/21/2016.
 */
var components = {
    init: function() {
        var me = this;
        me.setListeners();
    },
    
    setListeners: function () {
        $('.component-list-filter').change(function () {

        });
    },

    updateList: function(groupId) {
        $('tr.component').each(function () {
            $(this).hasClass("visible")
        });
    }
};

$(document).ready(function () {
    components.init();
});

