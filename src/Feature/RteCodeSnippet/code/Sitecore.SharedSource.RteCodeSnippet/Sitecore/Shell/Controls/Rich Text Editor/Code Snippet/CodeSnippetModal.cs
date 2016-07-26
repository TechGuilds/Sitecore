using System;
using System.Web;
using Sitecore.Diagnostics;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Web.UI.Pages;
using Sitecore.Web.UI.Sheer;

namespace Sitecore.SharedSource.RteCodeSnippet
{
    public class CodeSnippetModal : DialogForm
    {
        #region Fields

        protected Memo CodeSnippetText;

        #endregion

        #region Properties

        protected string Mode
        {
            get
            {
                string str = StringUtil.GetString(base.ServerProperties["Mode"]);
                if (!string.IsNullOrEmpty(str))
                {
                    return str;
                }
                return "shell";
            }
            set
            {
                Assert.ArgumentNotNull(value, "value");
                base.ServerProperties["Mode"] = value;
            }
        }

        #endregion

        #region Methods

        protected override void OnCancel(object sender, EventArgs args)
        {
            Assert.ArgumentNotNull(sender, "sender");
            Assert.ArgumentNotNull(args, "args");
            if (this.Mode == "webedit")
            {
                base.OnCancel(sender, args);
            }
            else
            {
                SheerResponse.Eval("scCancel()");
            }
        }

        protected override void OnOK(object sender, EventArgs args)
        {
            Assert.ArgumentNotNull(sender, "sender");
            Assert.ArgumentNotNull(args, "args");
            if (string.IsNullOrWhiteSpace(CodeSnippetText.Value))
            {
                SheerResponse.Alert("Please enter a code.", new string[0]);
            }

            if (this.Mode == "webedit")
            {
                //SheerResponse.SetDialogValue(StringUtil.EscapeJavascriptString(mediaUrl));
                base.OnOK(sender, args);
            }
            else
            {
                var encoded = Encode(CodeSnippetText.Value);
                SheerResponse.Eval("scClose('" + encoded + "')");
            }
        }

        private string Encode(string value)
        {
            var htmlEncoded = HttpUtility.HtmlEncode(value);
            var jsEncoded = HttpUtility.JavaScriptStringEncode(htmlEncoded);
            return jsEncoded;
        }

        #endregion
    }
}