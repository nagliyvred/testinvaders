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

  function SpecReloader(sessions, data, out) {
    // TODO: Terrible hack.
    var outter = $("#out");

    var run = function() {
      var print = function(msg) {
        out.setValue(out.getValue() + msg);
      };

      var to_test = Object.keys(data).map(function(n) {
        return data[n].src;
      });
      to_test.push(data[getCurrentExample()].spec);

      out.setValue("");
      outter.css("background-color", "yellow");
      runner(print, "runner").run(to_test, function(jasmine_runner) {
        if (jasmine_runner.results().passed()) {
          outter.css("background-color", "green");
        } else {
          outter.css("background-color", "red");
        }
      });
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

    return {reload: function() {
      iframe.attr("src", iframe.attr("src"));
    }};
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
    var data = {};
    var fork_id = window.location.search.substring(1) || "new";

    this.deploy = function(on_deployed) {
      $.post(api_base + "new", JSON.stringify(data), function(response) {
        on_deployed(response.id);
      }, "json");
    };

    $.getJSON(api_base + fork_id, function(r) {
      data = r;
      on_loaded(data);
    });

    return this;
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

    $([spec_session, src_session]).on("change", function() {
      out_session.setValue("");
    });

    window.addEventListener("hashchange", titleUpdater($(".brand .title")));

    new ChromeVisibilityController($("[data-toggle=chrome]"), $(".chrome"), [spec_editor, src_editor, out_editor]);
    $(".chrome").hide();

    var loader = new ExampleLoader("/v1/forks/", function(data) {
      dataSync(spec_session, data, 'spec');
      dataSync(src_session, data, 'src');

      new SpecReloader([src_session, spec_session], data, out_session);

      var reloader = iFrameReloader(src_session, data, $("#game"));
      reloader.reload();

      window.addEventListener("hashchange", exampleSelector("welcome", data, spec_session, src_session));
      $(window).trigger("hashchange");

      $(".chrome-play").show();

      $(".btn-stop").closest("a").on("click", function() {
        $("#game")[0].contentWindow._game.stop();
      });

      $(".btn-reload").closest("a").on("click", function() {
        reloader.reload();
      });
    });

    $("[data-bind=deploy]").on("click", function() {
      var _this = $(this);
      if (_this.hasClass("disabled")) {
        return;
      } else {
        _this.addClass("disabled");
      }

      loader.deploy(function(fork_id) {
        window.open("/?" + fork_id, "_top");
      });
    });
  });
})($, ace, console, require);
