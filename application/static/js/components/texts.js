/**
 * Created by Giorgi Megreli on 3/25/2016.
 */


$(document).ready(function () {
    ComponentBase.availableClasses.merge([
        ".component-value"
    ]);

    ComponentBase.save = function () {
        this.baseSave();
    };
});