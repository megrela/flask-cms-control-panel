from . import module

from flask import render_template, request, session, redirect, url_for


@module.route('/', methods=("GET", "POST"))
def index():
    if "user_id" in session:
        html = '<a href="' + url_for("logout.index") + '">logout</a>'
        return html
    else:
        return redirect(url_for("login.index"))
