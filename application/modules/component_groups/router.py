from flask import render_template, request, session, redirect, url_for
from application.mongo_db import mongo

from . import module
from .setup import setup

import json
from bson.objectid import ObjectId


@module.route('/', methods=("GET", "POST"))
def index():
    kwargs = {"dependencies": setup()}
    return render_template("component_groups/component_groups.html", **kwargs)


@module.route('/add', methods=("POST",))
def add():
    res = mongo.db.component_groups.insert_one({
        "name": request.form.get("name"),
        "group_id": request.form.get("group_id")
    })
    return json.dumps({"id": str(res.inserted_id)})


@module.route('/remove', methods=("POST",))
def remove():
    mongo.db.component_groups.remove({
        "_id": ObjectId(request.form.get("id"))
    })
    return json.dumps({})


@module.route('/update', methods=("POST",))
def update():
    name = request.form.get("name")
    group_id = request.form.get("group_id")
    oid = request.form.get("id")
    mongo.db.component_groups.update(
        {
            "_id": ObjectId(oid)
        },
        {
            "$set": {
                "name": name,
                "group_id": group_id
            }
        }
    )
    return json.dumps({})
