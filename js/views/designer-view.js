window.DesignerView = Backbone.View.extend ({
	
	initialize:function () {
        this.template = _.template(tpl.get('designer-view'));
    },

    render:function (eventName) {
    
        $(this.el).html(this.template());
        return this;
    },
	
	
});
