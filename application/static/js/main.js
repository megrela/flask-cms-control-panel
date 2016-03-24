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
                el.prop("value","");
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
            var sourceValue = "";

            if (el.is("img")) {
                sourceValue = el.attr("src");
            } else if (el.is("input") || el.is("select")) {
                sourceValue = el.val();
            } else if (el.is("textarea")){
                sourceValue = el.prop("value");
            } else {
                sourceValue = el.text();
            }

            if (targetEl.is('img')) {
                targetEl.attr('src', sourceValue);
            } else if (targetEl.is("input") || targetEl.is("select")) {
                targetEl.val(sourceValue);
            } else if (targetEl.is("textarea")) {
                targetEl.text(sourceValue);
                targetEl.prop("value", sourceValue);
            } else {
                targetEl.text(sourceValue);
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