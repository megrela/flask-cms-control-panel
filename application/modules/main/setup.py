from application.modules.header.model import HeaderModel
from application.modules.menu.model import MenuItemModel
from application.modules.main import module


def setup_header_menu():
    menu = MenuItemModel.get_all_items_for_module(module.name, HeaderModel.module_id)
    return menu


def setup_header():
    header = HeaderModel("CMS", setup_header_menu())
    return header


def setup():
    dependencies = {
        "header": setup_header()
    }
    return dependencies

