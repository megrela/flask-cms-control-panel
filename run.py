from application import create_app

app = create_app()
if app.config["DEBUG"]:
    app.debug = True

app.run(
    host=app.config["HOST"],
    port=app.config["PORT"]
)
