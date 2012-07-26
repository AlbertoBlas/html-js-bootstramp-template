window.FieldGenericView = Backbone.View.extend ({
	
	tagName: "ul",
	
	className: "span12 sortable",
	
	initialize:function () {
        
    },
    
    render:function (eventName) {
    	
    	var objModelJSON = this.model.toJSON();
    	var arrModelFields =objModelJSON.fields;
    	
    	_.each( arrModelFields, function() {


        	$(this.el).append( new FieldGenericItemView( {model: this.model} ).render().el );
    		
    	} , this ); 
        
        return this;
    },
	
	
});

window.FieldGenericItemView = Backbone.View.extend ({
	
	tagName: "li",
	className: "thumbnail",
	
	initialize:function () {
        this.template = _.template(tpl.get('field-generic-view'));
    },
    
    render:function (eventName) {
    	
        $(this.el).html( this.template({model:this.model.toJSON()}) );
        
        return this;
    },
	
	
});


