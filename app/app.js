/* Create app */
var app = RD.createApp({
    name: 'testApp',
    controllers: ['Page', 'Foo'],

    ready: function() {
        app.getController('Page').index();
    }
});