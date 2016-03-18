from . import module

from flask import render_template, request, session, redirect, url_for, current_app


@module.route('/', methods=("GET", "POST"))
def index():
    session.pop("user_id")
    return redirect(url_for("main.index"))

