Page = new RD.Controller();

Page.index = function() {
    this.getView('index', function(view) {
        view.render({
            title: "Title of view",
            content: "Content of the view"
        });
    });
}