from flask import url_for
from application.modules import header


class MenuItemModel:
    module_id = "MENU_ITEM_MODULE"
    name = ""
    url = ""
    active = False

    def __init__(self, name, url,):
        self.name = name
        self.url = url

    @staticmethod
    def get_all_items_for_module(module_name, container_name):
        if container_name == header.MODULE_NAME:
            item = MenuItemModel("Component Groups", url_for("component_groups.index"))
            item.active = module_name == "component_groups"
            return [item]
