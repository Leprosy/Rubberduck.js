Page = new RD.Controller();

Page.index = function() {
    this.getView('app/views/Page/index.tpl', function(data) {
        var view = Handlebars.compile(data)

        $('#' + app.renderTo).html(view({
            title: "Title of view",
            content: "Content of the view"
        }));
    })
    
}