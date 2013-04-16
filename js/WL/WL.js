/**
 * WL Sinlgeton
 */
var WL = {
    debug: function(obj) {
        var dbg = true;
        if (dbg) {
            if (typeof obj == 'string') {
                console.debug(obj);
            } else {
                obj();
            }
        }
    },

    createApp: function(opt) {
        WL.debug(function(){console.group('Creating App')});
        var options = {
            path: 'app/',
            name: 'WLapp',
            controllers: 'Index',
            renderTo: 'app'
        }

        $.extend(options, opt);
        var app = new WL.Application(options)
        WL.debug('App created', options);

        /* Controllers */
        WL.debug('Creating app controllers');
        var controllerPath = app.path + 'controllers/';

        if (typeof app.controllers == 'object') {
            for (name in app.controllers) {
                app.getController(name);
            }
        }

        WL.debug(function(){console.groupEnd()});
        return app;
    },

    include: function(src, callback) {
        WL.debug(function(){console.group('Including class in ' + src)});
        WL.debug('Including ' + src);
        var scr = document.createElement('script');

        if (typeof callback == 'function') {            
            scr.src = src;
            scr.onload = function() {
                WL.debug(src + ' included and ready');
                callback();
            };

            document.body.appendChild(scr);
        } else if(typeof callback == 'boolean' && !callback) {
            $.ajax(src, {
                async: false,
                complete: function(data, msg) {
                    if (msg == 'success') {
                        scr.innerHTML = data.responseText;
                        document.body.appendChild(scr);
                    }
                } 
            })
        }

        WL.debug(function(){console.groupEnd()});
    }
}



/**
 * Application
 */
WL.Application = function(opt) {
    $.extend(this, opt);

    /* Controller list */
    if (typeof this.controllers == 'string') {
        var tmp = this.controllers;
        this.controllers = {};
        this.controllers[tmp] = undefined;
    }

    /* Fire when ready */
    var _this = this;
    $(window).load(function() {
        WL.debug('Application ready');
        _this.ready();
    });
};
WL.Application.prototype.getController = function(name) {
    var _this = this;

    if (typeof this.controllers[name] != 'object') {
        var controllerPath = _this.path + 'controllers/';

        WL.include(controllerPath + name + '.js', function() {
            _this.controllers[name] = window[name];
            delete window[name];
        });
    } else {
        return this.controllers[name];
    }
}



/**
 * View
 */
WL.View = function(opt) {
    $.extend(this, opt);
}
WL.View.prototype.render = function() {
    console.log("view " + this.name + ":" + this.id + " rended");
}



/**
 * Controller
 */
WL.Controller = function(opt) {
    $.extend(this, opt);

    /* Views */
    if (typeof this.views == 'string') {
        var tmp = this.views;
        this.views = {};
        this.views[tmp] = undefined;
    }

    if (typeof app.controllers == 'object') {
        for (name in app.controllers) {
            app.getController(name);
        }
    }
}