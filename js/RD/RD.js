/**
 * RD Sinlgeton
 */
var RD = {
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
        RD.debug(function(){console.group('Creating App')});
        var options = {
            path: 'app/',
            name: 'RDapp',
            controllers: 'Index',
            renderTo: 'app'
        }

        $.extend(options, opt);
        var app = new RD.Application(options)
        RD.debug('App created', options);

        /* Controllers */
        RD.debug('Creating app controllers');
        var controllerPath = app.path + 'controllers/';

        if (typeof app.controllers == 'object') {
            for (name in app.controllers) {
                app.getController(name);
            }
        }

        RD.debug(function(){console.groupEnd()});
        return app;
    },

    include: function(src, callback) {
        RD.debug(function(){console.group('Including class in ' + src)});
        RD.debug('Including ' + src);
        var scr = document.createElement('script');

        if (typeof callback == 'function') {            
            scr.src = src;
            scr.onload = function() {
                RD.debug(src + ' included and ready');
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

        RD.debug(function(){console.groupEnd()});
    }
}



/**
 * Application
 */
RD.Application = function(opt) {
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
        RD.debug('Application ready');
        _this.ready();
    });
};
RD.Application.prototype.getController = function(name) {
    var _this = this;

    if (typeof this.controllers[name] != 'object') {
        var controllerPath = _this.path + 'controllers/';

        RD.include(controllerPath + name + '.js', function() {
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
RD.View = function(opt) {
    $.extend(this, opt);
}
RD.View.prototype.render = function() {
    console.log("view " + this.name + ":" + this.id + " rended");
}



/**
 * Controller
 */
RD.Controller = function(opt) {
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
RD.Controller.prototype.getView = function(src, callback) {
    RD.debug(function(){console.group('Including view in ' + src)});
    RD.debug('Including view ' + src);

    $.ajax(src, {
        complete: function(data, msg) {
            if (msg == 'success') {
                callback(data.responseText);
                RD.debug('View ' + src + ' included');
            }
        } 
    })

    RD.debug(function(){console.groupEnd()});
}