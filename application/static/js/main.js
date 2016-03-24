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


copyFieldValues = function (source, target, classes) {
    for (var i = 0; i < classes.length; i++) {
        var cl = classes[i];
        var els = source.find(cl);
        if (els.length) {
            var el = els.first();
            var targetEl = target.find(cl).first();
            if (el.is('img')) {
                targetEl.attr('src', el.attr('src'));
            } else {
                var txt = el.text().trim();
                if (targetEl.is('input') || targetEl.is('select'))
                    targetEl.val(txt);
                else {
                    targetEl.text(txt);
                }
            }
        }
    }
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

Array.prototype.merge = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);
};