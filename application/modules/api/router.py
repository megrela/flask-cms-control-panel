import json
from flask import request, url_for
from application.mongo_db import mongo

from . import module
from .validation import validate


@module.route("/get_group", methods=("POST", ))
def get_group():
    req = request.get_json()
    client_id = req["client_id"]
    token = req["token"]
    if not validate(client_id, token):
        return json.dumps({}), 400

    group_id = req["group_id"]
    components = list(mongo.db.components.find({"group_id": group_id}))

    res = {
        "texts": {},
        "images": {},
        "links": {}
    }
    for component in components:
        if component["type"] == "texts":
            res["texts"][component["key"]] = {
                "name": component["name"],
                "value": component["value"]
            }
        elif component["type"] == "images":
            res["images"][component["key"]] = {
                "name": component["name"],
                "description": component["description"],
                "src": url_for("file_upload.get", name=component["image"], _external=True)
            }
        elif component["type"] == "links":
            res["links"][component["key"]] = {
                "name": component["name"],
                "href": component["href"],
                "text": component["text"]
            }
        else:
            return json.dumps({})
    return json.dumps(res)
