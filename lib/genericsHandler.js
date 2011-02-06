var X3D = X3D ? X3D : new Object();
X3D.gen = function() {
	var sources = [];
	var log, logname = "lib/genericsHandler.js";
	var xml3dNS = 'http://www.xml3d.org/2009/xml3d';
	var prefix;
	return {
		addSource : function(src){
			sources.push(src);
		},
		getXmlDokument : function(src){
			var xmlhttp;
			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.open("GET",src,false);
			xmlhttp.send();
			return xmlhttp.responseXML; 
		},
		getElementsByType : function(xmldoc,type){
			var elements = xmldoc.getElementById(type);
			return elements.childNodes;
		},
		prepareInsertGenericGroup: function(element){
			var shaderId = this.removeRoute(element.getAttribute('shader'));
			if(shaderId === null){
			} else{
				var shader = gid(document,prefix+shaderId);
				if(shader===null){
				}else {
					insertDefElement(shaderId);
				}
				shaderId=prefix+shadierId;
				
			}
			var transformerId = this.removeRoute(element.getAttribute('transform'));
			if(transformerId === null){
			} else{
				var transformer= gid(document,prefix+transformerId);
				if(transformer===null){
				}else {
					insertDefElement(transformerId);
				}
				transformerId=prefix+ transformerId;
				
			}
			var mesh = element.getElementsByTagName('mesh');
			if(mesh.size() ==1){
				mesh = mesh[0];
				var sourceId = this.removeRoute(mesh.getAttribute('src'));
				if(sourceId === null){
				} else{
					var dataElem= gid(document,prefix+sourceId);
					if(dataElem===null){
					}else {
						insertDefElement(dataElem);
					}
					sourceId=prefix+ sourceId;
					
				}
			}
			
		},
		insertGenericGroup : function(){
		}
		insertDefElement : function(element){
			var defs = document.getElementById('3dDefs');
			var newid = prefix+element.getAttribute('id);
			element = element.cloneNode(true);
			element.setAttribute('id',newid);
			defs.appendChild(element);
			},
		gid : function(xmldoc,id){
			return xmldoc.getElementById(id);
		},
		removeRoute : function(text){
			if(text!=null)return text.substring(1); else return null;
		},
		init : function(){
			log = X3D.log.get(logname);
			X3D.gen.addSource('generics/defaultGenerics.xml');
		}
	};
}();