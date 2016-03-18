from flask import render_template, request, session, redirect, url_for

from . import module
from .validation import validate_login


@module.route('/', methods=("GET", "POST"))
def index():
    kwargs = {}
    if request.method == "POST":
        validation = validate_login(request.form)
        if validation["status"] == "OK":
            session["user_id"] = str(validation["user"]["_id"])
            return redirect(url_for("main.index"))
        kwargs["validation"] = validation
    return render_template(
        "login/login.html",
        **kwargs
    )
