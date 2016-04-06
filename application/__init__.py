import os, re, sys

from flask import Flask
from router_config import MODULES

app = Flask(__name__, static_path='/static')


def start():
    load_config(app)
    register_modules(app)
    load_template_functions(app)

    if app.config["DEBUG"]:
        app.debug = True
    if app.config["SECRET_KEY"]:
        app.secret_key = app.config["SECRET_KEY"]

    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=True
    )


def load_config(app):
    app.config.from_object("config")


def register_modules(app):
    app_dir = os.path.abspath(__file__)
    sys.path.append(os.path.dirname(app_dir) + "/modules")

    for module in MODULES:
        module_router = "%s.router" % module["name"]
        register = False
        try:
            router = __import__(module_router, globals(), locals(), [], 0)
        except ImportError:
            print(module["name"] + " can not be loaded")
        else:
            url = None
            if "url" in module:
                url = module["url"]
            if app.config["DEBUG"]:
                print("[MODULE] Registered module router in %s to URL %s" % module_router, url)
            if url == "/":
                url = None
            register = True
        finally:
            load_module_dependencies(app, module)

        if register:
            app.register_module(
                router.module,
                url_prefix=url,
                static_folder="static"
            )


def load_module_dependencies(app, module):
    if 'models' in module and module['models'] == False:
        return

    name = module["name"]
    if app.config["DEBUG"]:
        print("[MODEL] loding model %s" % name)

    models = "%s.models" % name

    try:
        models = __import__(models, globals(), locals(), [], 0)
    except ImportError as ex:
        if re.match(r'No module named', ex.msg):
            print('[MODEL] Unable to load the model for %s: %s' % (models, ex.msg))
        else:
            print('[MODEL] Other(%s): %s' % (models, ex.msg))
        return False
    return True


def load_template_functions(app):
    from .common import template_functions
    app.jinja_env.globals.update(load_css=template_functions.load_css)
    app.jinja_env.globals.update(load_script=template_functions.load_script)
