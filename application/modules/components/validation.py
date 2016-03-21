from application.constants import constants


def validate_type(component_type):
    return component_type in constants["components"]["types"]

