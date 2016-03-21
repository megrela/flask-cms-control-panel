from flask import url_for
from application.modules import header


class MenuItemModel:
    module_id = "MENU_ITEM_MODULE"
    name = ""
    url = ""
    active = False
    children = []

    def __init__(self, name, url):
        self.name = name
        self.url = url
        self.children = []

    @staticmethod
    def get_all_items_for_module(module_name, container_name):
        if container_name == header.MODULE_NAME:
            ret = []
            item = MenuItemModel("Component Groups", url_for("component_groups.index"))
            item.active = module_name == "component_groups"
            ret.append(item)

            item = MenuItemModel("Components", "#")
            item.active = module_name == "components"
            item.children.extend([
                MenuItemModel("Texts", url_for("components.index", component_type="texts")),
                MenuItemModel("Images", url_for("components.index", component_type="images")),
                MenuItemModel("Links", url_for("components.index", component_type="links"))
            ])
            ret.append(item)

            return ret
