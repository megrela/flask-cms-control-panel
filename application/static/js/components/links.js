/**
 * Created by Giorgi Megreli on 4/6/2016.
 */

$(document).ready(function () {
    ComponentBase.availableClasses.merge([
        ".component-href"
    ]);

    ComponentBase.save = function () {
        this.baseSave();
    };
});