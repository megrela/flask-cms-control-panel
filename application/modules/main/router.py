from . import module

from flask import render_template, request, session, redirect, url_for

from .setup import setup


@module.route('/', methods=("GET", "POST"))
def index():
    kwargs = {}
    if "user_id" in session:
        kwargs["dependencies"] = setup()
        return render_template("main/index.html", **kwargs)
    else:
        return redirect(url_for("login.index"))
