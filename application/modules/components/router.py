from flask import render_template, request, session, redirect, url_for, current_app
from application.mongo_db import mongo
import os

import json
from bson.objectid import ObjectId

from . import module
from . import validation
from .setup import setup

from werkzeug.utils import secure_filename


@module.route("/<component_type>", methods=("GET", "POST"))
def index(component_type):
    kwargs = {}
    if validation.validate_type(component_type):
        kwargs["dependencies"] = setup(component_type)
        return render_template("components/%s.html" % component_type, **kwargs)
    else:
        return "", 404


@module.route("/<component_type>/filter", methods=("POST",))
def filter_components(component_type):
    if validation.validate_type(component_type):
        result = list(
            mongo.db.components.find({
                "group_id": ObjectId(request.form.get("group_id"))
            })
        )
        return json.dumps(result)
    else:
        return json.dumps({}), 404


@module.route("/<component_type>/add", methods=("POST",))
def add(component_type):
    if validation.validate_type(component_type):
        result = list(
            mongo.db.components.find({
                "group_id": ObjectId(request.form.get("group_id"))
            })
        )
        return json.dumps(result)
    else:
        return json.dumps({}), 404


@module.route("/<component_type>/remove", methods=("POST",))
def remove(component_type):
    if validation.validate_type(component_type):
        mongo.db.components.remove({
            "_id": ObjectId(request.form.get("id"))
        })
        return json.dumps({})
    else:
        return json.dumps({}), 404


@module.route("/<component_type>/update", methods=("POST",))
def update(component_type):
    if validation.validate_type(component_type):
        file = request.files('file')
        if file:
            filename = secure_filename(file.filename)
            file.save(os.pardir.join(current_app.config["UPLOAD_FOLDER"], filename))
        result = list(
            mongo.db.components.find({
                "group_id": ObjectId(request.form.get("group_id"))
            })
        )
        return json.dumps(result)
    else:
        return json.dumps({}), 404

