// The in-memory Store. Encapsulates logic to access wine data.
window.store = {
	formsList: {},
    forms: {},

    populate: function () {

        this.forms[1] = {
	        "id": 1,
			"name": "Empleados",
			"description": "Todos los empleados de Morelosoft",
			"password": "",
			"fields": [
						{
							"id": "c1",
							"title": "Date",
							"instructions": "Agregue info de campo",
							"typeOf": "date",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c2",
							"title": "Text 2",
							"instructions": "Agregue info de campo 2",
							"typeOf": "text",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c3",
							"title": "Text 3",
							"instructions": "Agregue info de campo 3",
							"typeOf": "text",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c4",
							"title": "Text 4",
							"instructions": "Agregue info de campo 4",
							"typeOf": "text",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
					  ]
        };
        this.forms[2] = {
	        "id": 2,
			"name": "Inventario Firewalls",
			"description": "Todos los firewalls de Hova",
			"password": "123",
			"fields": [
						{
							"id": "c1",
							"title": "Date",
							"instructions": "Agregue info de campo",
							"typeOf": "date",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c2",
							"title": "Text 2",
							"instructions": "Agregue info de campo 2",
							"typeOf": "date",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c3",
							"title": "Text 3",
							"instructions": "Agregue info de campo 3",
							"typeOf": "text",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
						{
							"id": "c4",
							"title": "Text 4",
							"instructions": "Agregue info de campo 4",
							"typeOf": "text",
							"width": 0,
							"heigth": 0,
							"isUnique": false,
							"isPrivate": false,
						
						},
					  ]
        };


        this.lastId = 2;
    },

    find: function (model) {
        return this.forms[model.id];
    },

    findAll: function () {
        return _.values(this.forms);
    },

    create: function (model) {
        this.lastId++;
        model.set('id', this.lastId);
        this.forms[this.lastId] = model;
        
        console.log("Se ha creado correctamente");
        
        return model;
    },

    update: function (model) {
        this.forms[model.id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.forms[model.id];
        return model;
    },
    
    pupulateFormList: function() {
    	 this.formsList[1] = {
	        "id": 1,
			"name": "Formulario 1"
			}
    	 this.formsList[2] = {
	        "id": 2,
			"name": "Formulario 2"
			}
    }
    


};

store.populate();

// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple in-memory approach.
Backbone.sync = function (method, model, options) {

    var resp;

	if ( model.url == "api/forms" || model.urlRoot == "api/forms")
	{
	    switch (method) {
	        case "read":
	            resp = model.id ? store.find(model) : store.findAll();
	            break;
	        case "create":
	            resp = store.create(model);
	            break;
	        case "update":
	            resp = store.update(model);
	            break;
	        case "delete":
	            resp = store.destroy(model);
	            break;
	    }
	} else if ( model.url == "api/fields" ) {
		alert("no se ha implementado de api fields");
	}

    if (resp) {
        options.success(resp);
    } else {
        options.error("Record not found");
    }
};