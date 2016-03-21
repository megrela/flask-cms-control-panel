from flask import render_template, request, session, redirect, url_for
from application.mongo_db import mongo


import json
from bson.objectid import ObjectId

from . import module
from . import validation
from .setup import setup


@module.route("/<component_type>", methods=("GET", "POST"))
def index(component_type):
    kwargs = {}
    if validation.validate_type(component_type):
        kwargs["dependencies"] = setup(component_type)
        return render_template("components/%s.html" % component_type, **kwargs)
    else:
        return "", 404


@module.route("/<component_type>/filter", methods=("POST",))
def index(component_type):
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
def delete(component_type):
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
def delete(component_type):
    if validation.validate_type(component_type):
        mongo.db.components.remove({
            "_id": ObjectId(request.form.get("id"))
        })
        return json.dumps({})
    else:
        return json.dumps({}), 404


@module.route("/<component_type>/update", methods=("POST",))
def delete(component_type):
    if validation.validate_type(component_type):
        result = list(
            mongo.db.components.find({
                "group_id": ObjectId(request.form.get("group_id"))
            })
        )
        return json.dumps(result)
    else:
        return json.dumps({}), 404

