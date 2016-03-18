from . import module

from flask import render_template, request, session, redirect, url_for, current_app
from .validation import validate_login

from application.modules.header.model import HeaderModel
from application.modules.menu.model import MenuItemModel


@module.route('/', methods=("GET", "POST"))
def index():
    header = HeaderModel("CMS", MenuItemModel.get_all_items_for_module(module.name, HeaderModel.name))
    if request.method == "POST":
        validation = validate_login(request.form)
        if validation["status"] == "OK":
            session["user_id"] = str(validation["user"]["_id"])
            return redirect(url_for("main.index"))
        else:
            return render_template("login/login.html", validation=validation, header=header)
    return render_template("login/login.html")
