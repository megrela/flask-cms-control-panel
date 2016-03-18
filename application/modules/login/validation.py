from application.mongo_db import mongo
from application.constants import constants


def validate_login(form):
    if not validate_login_form_fields(form):
        return constants["validation"]["empty_fields"]

    username = form.get("username")
    user = get_user(username)
    if user is None:
        return constants["validation"]["user_not_found"]

    if user["password"] != form.get("password"):
        return constants["validation"]["password_incorrect"]

    return {
        "status": constants["validation"]["OK"]["status"],
        "user": user
    }


def validate_login_form_fields(form):
    if form.get("username") == "":
        return False

    if form.get("password") == "":
        return False

    return True


def get_user(username):
    return mongo.db.users.find_one(
        {"username": username}
    )

