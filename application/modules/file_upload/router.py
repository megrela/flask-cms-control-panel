from . import module
from flask import request, current_app, url_for, abort
from flask import send_file

import os
import json
import datetime
import uuid


@module.route("/", methods=("POST", "GET" ))
def index():
    file = request.files.get("0")
    if file:
        ext = os.path.splitext(file.filename)[-1]
        prefix = str(uuid.uuid4())
        suffix = datetime.datetime.now().strftime("%y%m%d_%H%M%S")
        new_name = "".join(["_".join([prefix, suffix]), ext])
        file.save(
            os.path.join(current_app.config["UPLOAD_FOLDER"], new_name)
        )
        return json.dumps({
            "src": url_for("file_upload.get", name=new_name),
            "name": new_name
        })
    abort(500)


@module.route("/get_file/<name>", methods=("GET",))
def get(name):
    return send_file(os.path.join("uploads", name))
