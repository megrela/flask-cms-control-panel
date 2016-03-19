from flask import render_template, request, session, redirect, url_for

from . import module


@module.route('/', methods=("GET", "POST"))
def index():
    return "content_groups"
