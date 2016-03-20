/**
 * Created by gime on 3/16/2016.
 */
$(document).ready(function () {
    $('.invalid-input').focus(function () {
        $(this).removeClass("invalid-input");
    });

    $(".dropdown-toggle").dropdown();
});


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};