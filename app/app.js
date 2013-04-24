/* Create app */
var app = RD.createApp({
    name: 'invento',
    controllers: 'Page'
});

/* Start */
app.ready = function() {
    app.getController('Page').index();
};