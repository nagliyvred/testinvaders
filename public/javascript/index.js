;(function($, ace, console, require) {
  "use strict";

  var aceModeJavascript = require("ace/mode/javascript").Mode;

  function runner(print, name) {
    return {
      run: function(scripts, callback){
        $("#" + name).remove();

        var sandbox = $('<iframe />').attr({id: name, src: "runner.html"}).on('load', function() {
          this.contentWindow.run(scripts, print, callback);
        }).appendTo(document.body);
      }
    };
  }

  function initEditor(id) {
    var editor = ace.edit(id);
    editor.setShowPrintMargin(false);
    editor.setTheme("ace/theme/twilight");

    var session = editor.getSession();
    session.setMode(new aceModeJavascript());

    return session;
  }

  function initConsole(id) {
    var editor = ace.edit(id);
    editor.setHighlightActiveLine(false);
    editor.setPrintMarginColumn(false);
    editor.setReadOnly(true);
    editor.setShowPrintMargin(false);
    editor.setTheme("ace/theme/twilight");

    var renderer = editor.renderer;
    renderer.hideCursor(true);
    renderer.setShowGutter(false);

    return editor.getSession();
  }

  function SpecReloader(sessions, out) {
    var run = function() {
      var print = function(msg) {
        out.setValue(out.getValue() + msg);
      };
      var to_test = sessions.map(function(s) {
        return s.getValue();
      });

      out.setValue("");
      runner(print, "runner").run(to_test);
    };

    sessions.forEach(function(e) {
      e.on("delay:change", run);
    });

    return this;
  }

  function ChromeVisibilityController(data_binding, controls) {
    data_binding.on('click', function() {
      controls.forEach(function(e) {
        $(e).toggle();
      });

      return false;
    });
  }

  function iFrameReloader(src, data, iframe) {
    iframe.on('load', function() {
      var sources = Object.keys(data).map(function(n) {
        return data[n].src;
      });

      sources.push("Init();");

      var script = this.contentDocument.createElement("script");
      var script_text = this.contentDocument.createTextNode(sources.join("\n"));
      script.appendChild(script_text);
      this.contentDocument.body.appendChild(script);
    });

    src.on("delay:change", function() {
      iframe.attr("src", iframe.attr("src"));
    });
  }

  function DelayedChangeScheduler(watch, delay) {
    var _this = this;

    _this.scheduled = false;

    setInterval(function() {
      if (_this.scheduled) {
        watch._emit("delay:change");
        _this.scheduled = false;
      }
    }, delay);

    watch.on("change", function() {
      _this.scheduled = true;
    });

    return _this;
  }

  function ExampleLoader(bindings, base, on_loaded) {
    var data = {};
    var names = bindings.map(function() {
      return $(this).data("example");
    });

    var inflight = names.length * 2;

    function try_done() {
      if (!inflight && on_loaded) {
        on_loaded(data);
      }
    }

    names.forEach(function(n) {
      // TODO: When things fall apart, they tend to shatter.
      // So handle errors.

      data[n] = {};

      function complete() {
        inflight--;
        try_done();
      }

      $.ajax({
        url: base + n + ".js",
        dataType: 'text',
        success: function(r) {
          data[n].src = r;
        },
        complete: complete
      });

      $.ajax({
        url: base + "spec/" + n + "_spec.js",
        dataType: 'text',
        success: function(r) {
          data[n].spec = r;
        },
        complete: complete
      });
    });
  }

  function exampleSelector(default_example, data, spec, src) {
    return function() {
      var example = data[getCurrentExample()];

      if (example && example.spec != null && example.src != null) {
        spec.setValue(example.spec);
        src.setValue(example.src);
      }
    };
  }

  function getCurrentExample() {
    return location.hash.slice(1) || "welcome";
  }

  function titleUpdater(title) {
    return function() {
      var link = $('[href="#' + getCurrentExample() + '"]');
      title.text(link.text());
    };
  }

  function dataSync(editor, data, view) {
    editor.on("delay:change", function() {
      data[getCurrentExample()][view] = editor.getValue();
    });
  }

  $(function() {
    var spec = initEditor("spec");
    new DelayedChangeScheduler(spec, 1000);

    var src = initEditor("src");
    new DelayedChangeScheduler(src, 1000);

    var out = initConsole("out");
    new SpecReloader([src, spec], out);

    window.addEventListener("hashchange", titleUpdater($(".brand .title")));

    new ChromeVisibilityController($("[data-toggle=chrome]"), $(".chrome"));
    $(".chrome").hide();

    new ExampleLoader($("[data-example]"), "/public/javascript/game/", function(data) {
      dataSync(spec, data, 'spec');
      dataSync(src, data, 'src');
      iFrameReloader(src, data, $("#game"));

      window.addEventListener("hashchange", exampleSelector("welcome", data, spec, src));
      $(window).trigger("hashchange");

      $(".chrome-play").show();
    });
  });
})($, ace, console, require);
