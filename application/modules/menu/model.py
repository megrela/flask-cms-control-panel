class MenuItemModel:
    module_id = "MENU_ITEM"
    name = ""
    url = ""

    def __init__(self, name, url):
        self.name = name
        self.url = url

    @staticmethod
    def get_all_items_for_module(module_name, menu_id):
        return [
            MenuItemModel("name1", "/name1"),
            MenuItemModel("name2", "/name2"),
            MenuItemModel("name3", "/name3")
        ]
