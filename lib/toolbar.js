var X3D = X3D ? X3D : new Object();
X3D.tb = function() {
    var that = this;
    var log, logname = "lib/toolbar.js";
	var selection;
    return {
        init: function() {
            log = X3D.log.get(logname);
            log.info("initialized");
        },
        addCube: function() {
            alert("wie sie sehen sehn sie nix");
        },
		deleteAllChilds: function(element){
			if ( element.hasChildNodes() )
					{
						while ( element.childNodes.length >= 1 )
						{
							element.removeChild( element.firstChild );       
						} 
					}
		},
		addShadersToList: function(){
			var shaders = X3D.main.getElementsOfType('shader');
			var selectList = document.getElementById('selectable');
			this.deleteAllChilds(selectList);
			for(var i =0;i<shaders.length;i++){
				var ele = this.createOption(shaders[i].getAttribute('id'));
				selectList.appendChild(ele);
			}
		},
		createOption : function(option){
			var optionElem = document.createElement('li');
			optionElem.setAttribute('class','ui-widget-content');
			optionElem.setAttribute('id',option);
			var text = document.createTextNode(option);
			optionElem.appendChild(text);
			return optionElem;
		},
		setSelection : function(element){
			selection = element;
		},
		getSelection : function(){
			return selection;
		},
		
    };
}();
$(function() {
		// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
		$( "#dialog:ui-dialog" ).dialog( "destroy" );
		
		var allFields = $( [] ),
			tips = $( ".validateTips" );

		
		$( "#dialog-form" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Select Shader": function() {
					X3D.main.changeShader(X3D.tb.getSelection().getAttribute('id'));
					
					$( this ).dialog( "close" );
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});

		$( "#create-user" )
			
			//.button()
			.click(function() {
				if(X3D.main.elementsAreSelected()){
					X3D.tb.addShadersToList();
					$( "#dialog-form" ).dialog( "open" );
				}
			});
		$( "#selectable" ).selectable({
			stop: function() {
				$( ".ui-selected", this ).each(function() {
					X3D.tb.setSelection(this);
				});
			}
		});
	});