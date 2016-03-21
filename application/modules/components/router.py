from flask import render_template, request, session, redirect, url_for
from application.mongo_db import mongo



import json
from bson.objectid import ObjectId

from . import module
from . import validation


@module.route("/<component_type>", methods=("GET", "POST"))
def index(component_type):
    if validation.validate_type(component_type):
        return component_type
    else:
        return ""
