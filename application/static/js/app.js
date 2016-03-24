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
    },
    
    uploadImage: function (url, files, callback) {
        var data = new FormData();

        $.each(files, function (key, value) {
            data.append(key, value);
        });
        
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (resp, textStatus, jqXHR) {
                if (textStatus != "200") {
                    callback.success(resp)
                } else {
                    callback.fail(resp);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('ERRORS: ' + textStatus);
            }
        })
    }
};

