
def load_css(name):
    tag = '<link href="/static/css/min/{0}.css" rel="stylesheet">'.format(name)
    return tag


def load_script(name):
    tag = '<script src="/static/js/{0}.js" type="text/javascript"></script>'.format(name)
    return tag
