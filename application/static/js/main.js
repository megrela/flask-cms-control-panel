/**
 * Created by gime on 3/16/2016.
 */
$(document).ready(function () {
    $('.has-danger input').focus(function () {
        $(this).parents(".has-danger:first").removeClass("has-danger");
    });
    $(".dropdown-toggle").dropdown();
});

resetModalFields = function (modal) {
    modal.find('.reset').each(function () {
        var el = $(this);
        if (el.is('input') || el.is('select') ) {
            el.val('');
        } else {
            if (el.is("img")) {
                el.attr('src', '');
            } else {
                el.text("");
            }
        }
    });

    modal.find('.reset-hide').each(function () {
        $(this).hide();
    });
};


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

Array.prototype.merge = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);
};