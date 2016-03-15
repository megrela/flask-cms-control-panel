from . import module


@module.route('/', methods=("GET", "POST"))
def index():
    return "World"


@module.route('/hello', methods=("GET", "POST"))
def hello_world():
    return "Hello World"
