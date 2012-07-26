window.FormModel = Backbone.Model.extend ({
	urlRoot: "api/forms",
	defaults: {
		"id": null,
		"name": "",
		"description": "",
		"password": "",
		"fielsd": [] // of FieldModel ?
	},
	validate: function(attrs ){
		
		
	}
	
});

window.FieldModel = Backbone.Model.extend({
	urlRoot: "api/fields",
	defaults: {
		"id": null,
		"title": "",
		"instructions": "",
		"typeOf": "",
		"width": 0,
		"heigth": 0,
		"isUnique": false,
		"isPrivate": false,
	}
});

window.FormsCollection = Backbone.Collection.extend({
    model:FormModel,
    url:"api/forms"
});

window.FieldsCollection = Backbone.Collection.extend({
    model:FieldModel,
    url:"api/fields"
});