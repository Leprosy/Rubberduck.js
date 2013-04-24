/* Create app */
var app = RD.createApp({
    name: 'testApp',
    controllers: 'Page'
});

/* Start */
app.ready = function() {
    app.getController('Page').index();
};