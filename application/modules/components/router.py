from flask import render_template, request, session, redirect, url_for, current_app
from application.mongo_db import mongo
import os

import json
from bson.objectid import ObjectId

from . import module
from . import validation
from .setup import setup

from werkzeug.utils import secure_filename


@module.route("/<component_type>/", methods=("GET", "POST"))
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
        data = {"type": component_type}
        for item in request.form:
            if item != "ajax" and item != 'id':
                data[item] = request.form[item]
        cid = mongo.db.components.insert_one(data).inserted_id
        return json.dumps({"id": str(cid)})
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
        data = {"type": component_type}
        for item in request.form:
            if item == "ajax":
                continue
            if item != 'id' and request.form.get(item) != '':
                data[item] = request.form.get(item)
        oid = request.form.get("id")
        print(data)
        mongo.db.components.update(
            {
                "_id": ObjectId(oid)
            },
            {
                "$set": data
            }
        )
        return json.dumps({})
    else:
        return json.dumps({}), 404
