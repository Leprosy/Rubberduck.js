Page = new RD.Controller();

Page.index = function() {
    this.getView('index', function(view) {
        view.render({
            title: "Welcome to the Page Controller",
            content: "Content of the index view of the Page Controller."
        });
    });
}