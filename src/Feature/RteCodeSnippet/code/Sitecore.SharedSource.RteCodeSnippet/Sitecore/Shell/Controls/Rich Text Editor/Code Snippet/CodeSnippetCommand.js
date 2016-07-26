var scEditor = null;
var scTool = null;

//var commandList = RadEditorCommandList;
//if (!commandList) {
//    commandList = Telerik.Web.UI.Editor.CommandList;
//}

//Set the Id of your button into the RadEditorCommandList[]
Telerik.Web.UI.Editor.CommandList["CodeSnippet"] = function (commandName, editor, a) {
    var d = Telerik.Web.UI.Editor.CommandList._getLinkArgument(editor);
    Telerik.Web.UI.Editor.CommandList._getDialogArguments(d, "A", editor, "DocumentManager");

    var args = {};
    var html = editor.getSelectionHtml();
    var element = editor.getSelectedElement();

    if (element.tagName.toLowerCase() === 'pre') {
        args.code = element.innerHTML;
    }
    scEditor = editor;
    editor.showExternalDialog(
        "/sitecore/shell/default.aspx?xmlcontrol=RichText.CodeSnippet&la=" + scLanguage,
        args, //argument
        640, //Height
        480, //Width
        scCodeSnippetCallback, //callback
        null, // callback args
        "CodeSnippet",
        true, //modal
        Telerik.Web.UI.WindowBehaviors.Close, // behaviors
        false, //showStatusBar
        false //showTitleBar
    );
};

function scCodeSnippetCallback(sender, returnValue) {
    if (!returnValue) {
        return;
    }
    var wrapped = '<pre class="prettyprint linenums"><code>' + returnValue.text + '</code></pre>';
    scEditor.pasteHtml(wrapped, "DocumentManager");
}