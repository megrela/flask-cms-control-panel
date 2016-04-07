from flask import render_template, request, url_for, jsonify
from application.mongo_db import mongo

from bson.objectid import ObjectId

from . import module
from . import validation
from .setup import setup


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
        return jsonify(result)
    else:
        return jsonify({}), 404


@module.route("/<component_type>/add", methods=("POST",))
def add(component_type):
    if validation.validate_type(component_type):
        data = {"type": component_type}
        for item in request.form:
            if item != "ajax" and item != 'id':
                data[item] = request.form[item]
        cid = mongo.db.components.insert_one(data).inserted_id

        if "image" in data:
            return jsonify(
                {"id": str(cid), "image": url_for("file_upload.get", name=data["image"])},
            )
        else:
            return jsonify(
                {"id": str(cid)}
            )
    else:
        return jsonify({}), 404


@module.route("/<component_type>/remove", methods=("POST",))
def remove(component_type):
    if validation.validate_type(component_type):
        mongo.db.components.remove({
            "_id": ObjectId(request.form.get("id"))
        })
        return jsonify({})
    else:
        return jsonify({}), 404


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
        mongo.db.components.update(
            {
                "_id": ObjectId(oid)
            },
            {
                "$set": data
            }
        )
        if "image" in data:
            src = u""+url_for("file_upload.get", name=data["image"])
            return jsonify({"image": src})
        return jsonify({})
    else:
        return jsonify({}), 404
