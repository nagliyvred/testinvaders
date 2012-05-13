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

  function iFrameReloader(src, iframe) {
    iframe.on('load', function() {
      this.contentWindow.eval(src.getValue());
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
        complete: complete,
      });

      $.ajax({
        url: base + "spec/" + n + "_spec.js",
        dataType: 'text',
        success: function(r) {
          data[n].spec = r;
        },
        complete: complete,
      });
    });
  }

  function ExampleSelector(default_example, data, spec, src) {
    return function() {
      var example = data[location.hash.slice(1)];

      if (!example) {
        example = data[default_example];
      }

      if (example && example.spec && example.src) {
        spec.setValue(example.spec);
        src.setValue(example.src);
      }
    };
  }

  function TitleUpdater(title) {
    return function() {
      var hash = location.hash || "#welcome";
      var link = $('[href="' + hash + '"]');
      title.text(link.text());
    }
  }

  $(function() {
    var spec = initEditor("spec");
    var src = initEditor("src");
    var out = initConsole("out");
    var bindings = $("[data-example]");

    window.addEventListener("hashchange", TitleUpdater($(".brand .title")));

    $(".chrome").hide();

    var examples = new ExampleLoader(bindings, "/public/javascript/game/", function(data) {
      new DelayedChangeScheduler(spec, 1000);
      new DelayedChangeScheduler(src, 1000);
      new SpecReloader([src, spec], out);
      new iFrameReloader(src, $("#game"));

      window.addEventListener("hashchange", ExampleSelector('welcome', data, spec, src));
      $(window).trigger('hashchange');

      $(".chrome-play").show();
      new ChromeVisibilityController($("[data-toggle=chrome]"), $(".chrome"));
    });
  });
})($, ace, console, require);
