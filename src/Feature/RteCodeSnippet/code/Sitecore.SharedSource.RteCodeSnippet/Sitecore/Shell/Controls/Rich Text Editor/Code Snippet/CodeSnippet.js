function GetDialogArguments() {
    return getRadWindow().ClientParameters;
}

function getRadWindow() {
    if (window.radWindow) {
        return window.radWindow;
    }

    if (window.frameElement && window.frameElement.radWindow) {
        return window.frameElement.radWindow;
    }
    return null;
}

var isRadWindow = true;

var radWindow = getRadWindow();

if (radWindow) {
    if (window.dialogArguments) {
        radWindow.Window = window;
    }
}

function scClose(text) {
    var returnValue = {
        text: text
    };
    getRadWindow().close(returnValue);
}

function scCancel() {
    getRadWindow().close();
}

function scCloseWebEdit(text) {
    window.returnValue = text;
    window.close();
}

if (window.focus && Prototype.Browser.Gecko) {
    window.focus();
}