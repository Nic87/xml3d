var X3D = X3D ? X3D : new Object();
X3D.gen = function() {
	var sources = [];
	var log, logname = "lib/genericsHandler.js";
	var xml3dNS = 'http://www.xml3d.org/2009/xml3d';
	var prefix;
	var counter = 0;
	return {
		addSource : function(src){
			sources.push(src);
		},
		getXmlDocument : function(src){
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
			var xmldoc= xmlhttp.responseXML; 
			log.info('XML doc created'+xmldoc);
			return xmldoc;
		},
		getElementsByType : function(xmldoc,type){
			var elements = xmldoc.getElementById(type);
			return elements.childNodes;
		},
		prepareInsertGenericGroup: function(xmldoc,element){
			var shaderId = this.removeRoute(element.getAttribute('shader'));
			log.info('Generic ShaderId: '+shaderId);
			if(shaderId === null){
			} else{
				var shader = this.gid(document,prefix+shaderId);
				if(shader===null){
					this.insertDefElement(this.gid(xmldoc,shaderId));
				}
				shaderId=prefix+shaderId;
				
			}
			log.info('New ShaderId: '+shaderId);
			var transformerId = this.removeRoute(element.getAttribute('transform'));
			log.info('Generic transformerId: '+transformerId);
			if(transformerId === null){
			} else{
				var transformer= this.gid(document,prefix+transformerId);
				if(transformer===null){
					this.insertDefElement(this.gid(xmldoc,transformerId));
				}
				transformerId=prefix+ transformerId;
				
			}
			log.info('New transformerId: '+transformerId);
			var mesh = element.getElementsByTagName('mesh');
			if(mesh.length ==1){
				mesh = mesh[0];
				var sourceId = this.removeRoute(mesh.getAttribute('src'));
				log.info('Generic sourceId: '+sourceId);
				if(sourceId === null){
				} else{
					var dataElem= this.gid(document,prefix+sourceId);
					if(dataElem===null){
						this.insertDefElement(this.gid(xmldoc,sourceId));
					}
					sourceId=prefix+ sourceId;
					
				}
			}
			X3D.main.resetXml3D();
			log.info('New sourceId: '+sourceId);
			var newGroup = document.createElementNS(xml3dNS,'group');
			if(shaderId != null)newGroup.setAttribute('shader','#'+shaderId);
			if(transformerId != null)newGroup.setAttribute('transform','#'+transformerId);
			var mesh = document.createElementNS(xml3dNS,'mesh');
			mesh.setAttribute('src','#'+sourceId);
			mesh.setAttribute('type','triangles');
			newGroup.appendChild(mesh);
			newGroup.setAttribute('id',''+this.getGUID());
			var scene = document.getElementById('MyXml3d');
			scene.appendChild(newGroup);
			X3D.main.addSelectListener(newGroup);
			log.info('New Group was created: '+newGroup.getAttribute('id'));
			X3D.main.resetXml3D();
			return newGroup;
			
		},
		getGUID : function(){
			counter++;
			return 'element'+counter;
		},
		insertGenericGroup : function(){
		},
		copyElement : function(element){
			var newElement = document.createElementNS(xml3dNS,element.tagName);
			var attributes = element.attributes;
			log.info('Copying Attributes: '+attributes.length);
			for(var i =0;i<attributes.length;i++){
				log.info('Attribute: '+attributes[i].name+' Value: '+attributes[i].value);
				newElement.setAttribute(attributes[i].name,attributes[i].value);
			}
			log.info('Copying children');
			this.appendChildren(newElement,element);
			return newElement;
		},
		appendChildren:function(newParent,oldParent){
			var children = oldParent.childNodes;
			for(var i =0;i<children.length;i++){
				if(children[i].tagName == null){
					if(children[i].nodeValue.length >0){
						var textNode = document.createTextNode(this.trimString(children[i].nodeValue));
						newParent.appendChild(textNode);
					}
				}else {
					var temp = document.createElementNS(xml3dNS,children[i].tagName);
					var attributes = children[i].attributes;
					log.info('Child object: '+children[i].tagName+' Attributes Array: '+attributes);
					
					if(attributes == null){
					}else {
						log.info('Attributes array has '+attributes.length+' Elements');
						for(var j =0;j<attributes.length;j++){
							temp.setAttribute(attributes[j].name,attributes[j].value);
							log.info('Attribute: '+attributes[j].name+' Value: '+attributes[j].value);
						}
					}
					newParent.appendChild(temp);
					this.appendChildren(temp,children[i]);
				}
			}
		},
		trimString: function (str){
			if (str.trim)
				return str.trim();
			else
				return str.replace(/(^\s*)|(\s*$)/g, ""); //find and remove spaces from left and right hand side of string
		},
		insertDefElement : function(element){
			log.info('Adding a new element to defs: '+element.getAttribute('id'));
			var defs = document.getElementById('3dDefs');
			var newid = prefix+element.getAttribute('id');
			log.info('Namespace before cloning: '+element.lookupNamespaceURI());
			element = this.copyElement(element);
			element.setAttribute('id',newid);
			log.info('Namespace after setting: '+element.lookupNamespaceURI()+' id: '+element.getAttribute('id'));
			//element.setNamespace(xml3dNS);
			defs.appendChild(element);
			},
		gid : function(xmldoc,id){
			var element= this.customGetById(xmldoc,id);
			log.info('Element was found: '+element+' with id: '+id);
			return element;
		},
		customGetById:function(xmldoc,id){
			var elements= xmldoc.getElementsByTagName('*');
			for(var i = 0;i<elements.length;i++){
				if(elements[i].getAttribute('id')===id)return elements[i];
				
			}
			return null;
		},
		removeRoute : function(text){
			if(text!=null)return text.substring(1); else return null;
		},
		init : function(){
			log = X3D.log.get(logname);
			X3D.gen.addSource('http://wipux2.wifo.uni-mannheim.de/~mataa/tp/generics/defaulGenerics.xml');
			log.info('Generics Handler has been initialized!');
			
		},
		test : function(){
			log.info('Running Test: '+sources[0]);
			var xmldoc = this.getXmlDocument(sources[0]);
			prefix = xmldoc.getElementsByTagName('generics')[0].getAttribute('prefix');
			log.info('Prefix: '+prefix);
			var groupEle = this.gid(xmldoc,'test');
			log.info('GroupEle with id '+groupEle.getAttribute('id')+ ' was found');
			this.prepareInsertGenericGroup(xmldoc,groupEle);
			log.info('Test object was inserted');
		}
	};
}();