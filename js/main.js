Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};


var AppRouter = Backbone.Router.extend({ 
	 	
 	initialize:function () {
   		
   		//$('#tab3').html(new SidebarFormPropView().render().el);
   		
   		
	},
	
	routes:{
	    "":"login",
	    "designer":"designer"
	},
	
	login:function () {
		//TODO: Cargar el login
	},
	designer: function() {
		
		$('#appContainer').html(new DesignerView().render().el);
		$('#header').html(new HeaderView().render().el);
   		$('#footer').html(new FooterView().render().el);
   		$('#tab1').html(new SidebarMainView().render().el);
   		$('#tab2').html(new SidebarFieldPropView().render().el);
		
		
		var forms = new FormsCollection();
		
		forms.fetch ({
			success: function( event ) {
				$('#formListContainer').html(new FormListView({model:forms}).render().el);
				
				$("#cmbDatabases").prop('selectedIndex', -1);
			}
		});
	}
	

});





var eventManager = {};

$(document).ready(function () {
	
	var sortOptions = {
		axis: "y",
		cursor: "move",
		distance: 30
	};
	
	$('.sortables').sortable(sortOptions);
	$('#myModal').modal({show:false});
	
	_.extend(eventManager, Backbone.Events);
	
	eventManager.on("showModal", function ( paramModel, isEdit ){
		
		$('#myModal').html(new FormPropertiesView({model:paramModel, editMode:isEdit}).render().el);
		$('#myModal').modal('show');
		//$('.formName').focus();
	});
	
	eventManager.on("hideModal", function ( paramModel, msg ){
		
		$('#myModal').modal('hide');
		//$('.formName').focus();
	});
	
	eventManager.on("reloadCombos", function ( paramModel, msg ){
		var forms = new FormsCollection();
		
		
		forms.fetch ({
			success: function( event ) {
				$('#formListContainer').html(new FormListView({model:forms}).render().el);
			}
		});
	});
	
	
	
});



// Aquí se añade el array de vistas que se vayan a renderizar
tpl.loadTemplates(['header-view', 'footer-view', 'sidebar-view', 'sidebar-field-prop-view', 'sidebar-form-prop-view', 'form-list', 'form-properties',
                   'field-generic-view', 'designer-view'], function () {
    app = new AppRouter();
    Backbone.history.start();
});