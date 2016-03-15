from . import module


@module.route('/', methods=("GET", "POST"))
def index():
    return "Hello"


@module.route('/to/<name>', methods=("GET", "POST"))
def hello_to(name):
    return "Hello " + name

