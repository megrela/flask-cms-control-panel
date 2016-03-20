/**
 * Created by Giorgi Megreli on 3/20/2016.
 */

var app = {
    ajax: function(url, data, callback) {
        data.ajax = true;
        $.ajax({
            method: "POST",
            url: url,
            data: data,
            success: function (resp) {
                callback.success(JSON.parse(resp));
            },
            error: function(resp) {
                callback.fail(resp);
            }
        });
    }
};

