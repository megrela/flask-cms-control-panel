/**
 * Created by Giorgi Megreli on 3/23/2016.
 */

$(document).ready(function () {
    $('.file-upload').change(function (e) {
        var file = this.files[0];
        var src = URL.createObjectURL(file);
        $(this).next().next().show().children(".image-name").first()
            .text(file.name)
            .attr('href', src)
            .attr('target', '_blank');
        var img = $(this).parent().prev("img").first();
        img.fadeOut('fast', function () {
            img.attr('src', src);
            img.fadeIn('fast');
        });
        e.preventDefault();
        e.stopPropagation();
    });
});