/**
 * Created by gime on 3/16/2016.
 */
$(document).ready(function () {
    $('.has-danger input').focus(function () {
        $(this).parents(".has-danger:first").removeClass("has-danger");
    });

    $('.file-upload').change(function () {
        var file = this.files[0];
        $(this).next().show().children(".image-name").first()
            .text(file.name)
            .attr('href', URL.createObjectURL(file))
            .attr('target', '_blank');
    });

    $('.upload-image').click(function () {
        var src = $(this).prev(".image-name").first().attr('href');
        var img = $(this).parent().parent().prev("img").first();

        img.fadeOut('fast', function () {
            img.attr('src', src);
            img.fadeIn('fast');
        });
    });

    $(".dropdown-toggle").dropdown();
});


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

Array.prototype.merge = function (other_array) {
    /* you should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {this.push(v)}, this);
};