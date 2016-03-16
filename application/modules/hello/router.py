from . import module

from flask import render_template


@module.route('/', methods=("GET", "POST"))
def index():
    return render_template("hello/hello.html")


@module.route('/to/<name>', methods=("GET", "POST"))
def hello_to(name):
    return render_template("hello/to.html", name=name)

