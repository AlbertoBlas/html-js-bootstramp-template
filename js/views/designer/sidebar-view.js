window.SidebarMainView = Backbone.View.extend({
	initialize: function() {
		this.template = _.template(tpl.get("sidebar-view"));
	},
	render: function(eventName) {
		
		$(this.el).html(this.template());
		
		return this;
	}
	
	
});

window.SidebarFieldPropView = Backbone.View.extend({
	initialize: function() {
		this.template = _.template(tpl.get("sidebar-field-prop-view"));
	},
	render: function(eventName) {
		
		$(this.el).html(this.template());
		
		return this;
	}
	
	
});

window.SidebarFormPropView = Backbone.View.extend({
	initialize: function() {
		this.template = _.template(tpl.get("sidebar-form-prop-view"));
	},
	render: function(eventName) {
		
		$(this.el).html(this.template());
		
		return this;
	}
	
	
});


window.FormListView = Backbone.View.extend({
	initialize: function() {
		this.template = _.template(tpl.get("form-list"));
	},
	_selectedIndex: 0,
	_currentModelSelected: {},
	render: function (event) {
		
		$(this.el).html(this.template({model:this.model.models}));
		
		
		return this;
	},
	events: {
    	//"dblclick"                : "open",
		"click #btnNew": "btnNewOnClick",
		"click #btnEdit": "btnEditOnClick",
		"click #btnDelete": "btnDeleteOnClick",
		"change #cmbDatabases": "cmbDatabasesChange"
	},
	btnNewOnClick : function( event ) {
		eventManager.trigger("showModal", new FormModel(), false);
		
		
	},

	btnEditOnClick : function( event ) {
		eventManager.trigger("showModal", this.model.models[this._selectedIndex], true);
		
	},
	
	btnDeleteOnClick : function( event ) {
		
		
		_currentModelSelected = this.model.models[this._selectedIndex];
		
		if ( currentModelSelected != null ) {
			currentModelSelected.destroy( {
				success: function() {
					alert("Si se eliminó");
				},
				error: function() {
					alert("No se eliminó");
					
				}
			});
		} else {
			alert("No hay bases de datos");
		}
		
		eventManager.trigger("reloadCombos", null);
		
	},
	cmbDatabasesChange: function( event ) {
		this._selectedIndex = event.currentTarget.selectedIndex;
		
		this.renderFields();
		
		//console.log(this._selectedIndex);
	},
	
	renderFields: function( event ) {
		this._currentModelSelected = this.model.models[this._selectedIndex];
		
			
 		$("#content").html(new FieldGenericView({model:this._currentModelSelected}).render().el);
			
 		
		var sortOptions = {
		axis: "y",
		cursor: "move",
		distance: 30
		};
		
		$('.sortables').sortable(sortOptions);
	}
});


