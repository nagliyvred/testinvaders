require([
    "require",
    "ace/ace",

    "order!/public/javascript/ext/zepto.min.js",
    "order!/public/javascript/ext/bootstrap-dropdown.js",
    "order!/public/javascript/runner.js"], function(require, ace, jsmode) {

  $(function() {
    var src, spec, out;

    var iframe = document.getElementById('game');

    $(iframe).bind('load', function() {
      this.contentWindow.eval(src.getSession().getValue());
    });

    $(".chrome").hide();

    $(".btn").click(function(e) {
      $(".ui").toggle();
      $(".chrome").toggle();

      e.preventDefault();
    });

    require(["ace/mode-javascript", "ace/theme-twilight"], function() {
      var JavaScriptMode = require("ace/mode/javascript").Mode;
      var themeTwilight = require("ace/theme-twilight");

      src = ace.edit("src");
      src.setTheme("ace/theme/twilight");
      src.getSession().setMode(new JavaScriptMode());
      src.setShowPrintMargin(false);

      spec = ace.edit("spec");
      spec.setTheme("ace/theme/twilight");
      spec.getSession().setMode(new JavaScriptMode());
      spec.setShowPrintMargin(false);

      out = ace.edit("out");
      out.setTheme("ace/theme/twilight");
      out.setReadOnly(true);
      out.setHighlightActiveLine(false);
      out.setShowPrintMargin(false);
      out.setPrintMarginColumn(false);
      out.renderer.setShowGutter(false);
      out.renderer.hideCursor(true);

      var scheduledRuns = [];

      setInterval(function(){
        var r = scheduledRuns.pop();
        r && r();
      }, 1000);

      function delayedRun(){
        scheduledRuns = [];
        scheduledRuns[scheduledRuns.length] = function(){
          function print(msg){
            out.getSession().setValue(out.getSession().getValue() + msg);
          }

          out.getSession().setValue("");
          jasmine.iframeRunner(print, "runner").run([src.getSession().getValue(), spec.getSession().getValue()]);

          iframe.src = iframe.src;
        }
      }

      spec.getSession().addEventListener("change", delayedRun);
      src.getSession().addEventListener("change", delayedRun);
    });
  });
});
