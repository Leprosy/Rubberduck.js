/* Create app */
var app = WL.createApp({
    name: 'invento',
    controllers: 'Page'
});

/* Start */
app.ready = function() {
    app.getController('Page').index();
};