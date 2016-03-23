from . import module
from flask import request, send_from_directory, current_app, url_for, abort
from werkzeug.utils import secure_filename

import os
import json


@module.route("<filename>", methods=("POST", "GET"))
def index(filename=None):
    if request.method == "POST":
        file = request.files('file')
        if file:
            filename = secure_filename(file.filename)
            file.save(os.pardir.join(current_app.config["UPLOAD_FOLDER"], filename))
            return json.dumps({
                "src": url_for("file_upload.index", filename=filename)
            })
        abort(500)
    else:
        return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)
