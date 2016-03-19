from . import MODULE_NAME

from application.modules import header
from application.modules.header.model import HeaderModel
from application.modules.menu.model import MenuItemModel


def setup_header_menu():
    menu = MenuItemModel.get_all_items_for_module(
        MODULE_NAME,
        header.MODULE_NAME
    )
    return menu


def setup_header():
    header_module = HeaderModel("CMS", setup_header_menu())
    return header_module


def setup():
    dependencies = {
        "header": setup_header()
    }
    return dependencies
