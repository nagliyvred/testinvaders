;(function($, ace, console, require) {
  "use strict";

  var aceModeJavascript = require("ace/mode/javascript").Mode;

  function runner(print, name) {
    return {
      run: function(scripts, callback){
        $("#" + name).remove();

        var sandbox = $('<iframe />').attr({id: name, src: "/public/html/runner.html"}).on('load', function() {
          this.contentWindow.run(scripts, print, callback);
        }).appendTo(document.body);
      }
    };
  }

  function initEditor(id) {
    var editor = ace.edit(id);
    editor.setShowPrintMargin(false);
    editor.setTheme("ace/theme/vibrant_ink");

    var session = editor.getSession();
    session.setMode(new aceModeJavascript());

    return editor;
  }

  function initConsole(id) {
    var editor = ace.edit(id);
    editor.setHighlightActiveLine(false);
    editor.setPrintMarginColumn(false);
    editor.setReadOnly(true);
    editor.setShowPrintMargin(false);
    editor.setTheme("ace/theme/vibrant_ink");

    var renderer = editor.renderer;
    renderer.hideCursor(true);
    renderer.setShowGutter(false);

    return editor;
  }

  function SpecReloader(sessions, spec, data, out) {
    var run = function() {
      var print = function(msg) {
        out.setValue(out.getValue() + msg);
      };

      var to_test = Object.keys(data).map(function(n) {
        return data[n].src;
      });
      to_test.push(spec.getValue());

      out.setValue("");
      runner(print, "runner").run(to_test);
    };

    sessions.forEach(function(e) {
      e.on("delay:change", run);
    });

    return this;
  }

  function ChromeVisibilityController(data_binding, controls, editors) {
    data_binding.on('click', function() {
      controls.forEach(function(e) {
        $(e).toggle();
      });

      editors.forEach(function(e) {
        e.resize();
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

  function ExampleLoader(api_base, on_loaded) {
    var _this = this;

    var fork_id = window.location.search.substring(1) || "new";

    this.data = {};
    this.deploy = function(on_deployed) {
      $.post(api_base + "new", JSON.stringify(this.data), function(response) {
        on_deployed(response.id);
      }, "json");
    };

    $.getJSON(api_base + fork_id, function(r) {
      _this.data = r;
      on_loaded(_this);
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
    var spec_editor = initEditor("spec");
    var spec_session = spec_editor.getSession();
    new DelayedChangeScheduler(spec_session, 1000);

    var src_editor = initEditor("src");
    var src_session = src_editor.getSession();
    new DelayedChangeScheduler(src_session, 1000);

    var out_editor = initConsole("out");
    var out_session = out_editor.getSession();

    window.addEventListener("hashchange", titleUpdater($(".brand .title")));

    new ChromeVisibilityController($("[data-toggle=chrome]"), $(".chrome"), [spec_editor, src_editor, out_editor]);
    $(".chrome").hide();

    new ExampleLoader("/v1/forks/", function(loader) {
      var data = loader.data;

      new SpecReloader([src_session, spec_session], spec_session, data, out_session);

      dataSync(spec_session, data, 'spec');
      dataSync(src_session, data, 'src');
      iFrameReloader(src_session, data, $("#game"));

      window.addEventListener("hashchange", exampleSelector("welcome", data, spec_session, src_session));
      $(window).trigger("hashchange");

      $(".chrome-play").show();

      $(".icon-pause").closest("a").on("click", function() {
        $("#game")[0].contentWindow._game.stop();
      });

      $(".icon-play").closest("a").on("click", function() {
        $("#game")[0].contentWindow._game.run();
      });

      $("[data-bind=deploy]").on("click", function() {
        loader.deploy(function(fork_id) {
          window.open("/?" + fork_id, "_top");
        });
      });
    });
  });
})($, ace, console, require);
