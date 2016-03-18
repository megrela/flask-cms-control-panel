from flask import render_template, request, session, redirect, url_for

from . import module

from application.mongo_db import mongo
from application.constants import constants


@module.route('/', methods=("GET", "POST"))
def index():
    return "here will be displayed all content-groups"


@module.route("/new", methods=("GET", "POST"))
def new():
    return "new content group creation"


