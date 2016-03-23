/**
 * Created by Giorgi Megreli on 3/23/2016.
 */

$(document).ready(function () {
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
});