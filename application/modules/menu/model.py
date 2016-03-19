from flask import url_for
from application.modules import header


class MenuItemModel:
    module_id = "MENU_ITEM_MODULE"
    name = ""
    url = ""

    def __init__(self, name, url):
        self.name = name
        self.url = url

    @staticmethod
    def get_all_items_for_module(module_name, container_name):
        if module_name == "main" and container_name == header.MODULE_NAME:
            return [
                MenuItemModel("Content Groups", url=url_for("content_groups.index"))
            ]
