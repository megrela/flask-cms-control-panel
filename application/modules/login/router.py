from . import module

from flask import render_template, request, session, redirect, url_for, current_app
from .validation import validate_login


@module.route('/', methods=("GET", "POST"))
def index():
    if request.method == "POST":
        validation = validate_login(request.form)
        if validation["status"] == "OK":
            session["user_id"] = str(validation["user"]["_id"])
            return redirect(url_for("main.index"))
        else:
            return render_template("login/login.html", validation=validation)
    return render_template("login/login.html")
