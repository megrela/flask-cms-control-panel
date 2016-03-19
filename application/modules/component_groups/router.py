from flask import render_template, request, session, redirect, url_for

from . import module
from .setup import setup


@module.route('/', methods=("GET", "POST"))
def index():
    kwargs = {"dependencies": setup()}
    return render_template("component_groups/component_groups.html", **kwargs)
