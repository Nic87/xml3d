var X3D = X3D ? X3D : new Object();
X3D.gen = function() {
    var sources = [];
    var prefixes =[];
    var log, logname = "lib/genericsHandler.js";
    var xml3dNS = 'http://www.xml3d.org/2009/xml3d';
    //var prefix;
    var counter = 0;
    return {
		/* Adds another xml source to extract templates from.
		*/
        addSource : function(src){
            sources.push(src);
            var doc = this.getXmlDocument(src);
            prefixes.push(doc.getElementsByTagName('generics')[0].getAttribute('prefix'));
            
        },
        
        /* performs an HTTP GET to fetch the XML document containing our xml3d objects */
        getXmlDocument : function(src){
            var xmlhttp;
            if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest(); // IE7+, Firefox, Chrome, Opera, Safari
            else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // warum auch immer wir das brauchen
            
            xmlhttp.open("GET",src,false);
            xmlhttp.send();
            var xmldoc = xmlhttp.responseXML; 
            log.info('XML doc created'+xmldoc);
            return xmldoc;
        },
        /* Returns the element given the generics prefix and the generics $id*/
        searchElement :function(prefix, id){
            var xmlDoc = this.getXmlDocument(this.findSrc(prefix));
            return this.slowGetById(xmlDoc,id);
        },
        
        /* returns the child nodes of a given element with $id */
        getChildElementsById : function(xmldoc, id) {
            var elements = xmldoc.getElementById(id);
            return elements.childNodes;
        },
        /*Returns an array of elements given a certain tagname $type*/
        getElementsOfType : function(type){
            var xmldocs =[];
            var result = [];
            for(var i =0;i<sources.length;i++){    
                xmldocs.push(this.getXmlDocument(sources[i]));
                
            }
            for(var i =0;i<xmldocs.length;i++){
                prefix = xmldocs[i].getElementsByTagName('generics')[0].getAttribute('prefix');
                var temp = xmldocs[i].getElementsByTagName(type);
                for(var j =0;j<temp.length;j++){
                    result.push(''+prefix+':'+temp[j].getAttribute('id'));
					log.info('Found item: '+prefix+':'+temp[j].getAttribute('id'));
                }
            }
            return result;
        },
        
        /* returns true if the given text contains a diamond # at position 1 */
        startsWithDiamond : function(text){
            var x = text.substring(0,1);
            if(x == '#') return true;
            else return false;
        },
        
		/* Returns the source of a xmldoc given the prefix defined in the xml doc*/
        findSrc : function(searchPrefix){
            if(sources.length==prefixes.length){
                for(var i=0;i<prefixes.length;i++){
                    if(prefixes[i]===searchPrefix){
                        return sources[i];
                    }
                }
            }else{
                log.error('Sources and Prefixes Length doesnt not fit.');
                return null;
            }
        },
        
        /* imports shaders, transformers and Data objects that are needed by a template. */
        importGenericDependant : function (searchPrefix, genericID) {
            prefix = searchPrefix;
            src = this.findSrc(prefix);
            if (src != null){
                var xmldoc = this.getXmlDocument(src);
                this.checkOrCreateDef(xmldoc, '#'+genericID);
            }
        },
        /* Main method for inserting a template into the current document.  Parameters are
			guid: Global id for the new element
			searchPrefix: Prefix of the source document
			genericID: ID of the template in the source document*/
        insertGenericGroup : function(guid, searchPrefix, genericID){
            //prefix = searchPrefix;
            src = this.findSrc(searchPrefix);

            if(src!=null){
                log.info('Adding Group: '+src);
                var xmldoc = this.getXmlDocument(src);
                log.info('Prefix: '+prefix);
                var groupEle = this.slowGetById(xmldoc,genericID);
                var newGroup = document.createElementNS(xml3dNS,'group');
                this.dynamicInsertGenericGroup(xmldoc,groupEle,newGroup,guid,searchPrefix);
                newGroup.setAttribute('id',''+guid);
                var scene = document.getElementById('MyXml3d');
                scene.appendChild(newGroup);
                X3D.main.addSelectListener(newGroup);
                log.info('New Group was created: '+newGroup.getAttribute('id'));
                X3D.main.resetXml3D();
                return newGroup;
            }
            return null;
        },
        
		/* This function is used to control the copying process of a template into the document. Its also checks for dependant elements such as shaders, transformers and data. Parameters are:
			xmldoc: The parsed template document
			element: The parsed template element
			newElement: The empty new element which is to be added to the current docuement.
			guid: new id of element
			prefix: namespace of xml doc
		*/
        dynamicInsertGenericGroup : function(xmldoc,element, newElement, guid,prefix){
            var attributes = element.attributes;
            var children = element.childNodes;
            if(attributes == null){
            }else {
                for(var j =0;j<attributes.length;j++){
                    if(this.startsWithDiamond(attributes[j].value)){
                        var newId= this.checkOrCreateDef(xmldoc,attributes[j].value, guid,prefix);
						log.debug("Created def with id: "+newId);
                        newElement.setAttribute(attributes[j].name,'#'+newId);
                    } else{
                        newElement.setAttribute(attributes[j].name,attributes[j].value);
                    }
                }
            }
            if(children === null){
            }else {
                for(var i =0;i<children.length;i++){
                    if(children[i].tagName == null){
                        if(children[i].nodeValue.length >0){
                            var textNode = document.createTextNode(X3D.util.trimString(children[i].nodeValue));
                            newElement.appendChild(textNode);
                        }
                    }else {
                        var temp = document.createElementNS(xml3dNS,children[i].tagName);
                        this.dynamicInsertGenericGroup(xmldoc,children[i],temp);
                        newElement.appendChild(temp);
                    }
                }
            }
            
        },
        
        /* checks whether a definition with $id exists and creates it otherwise 
           returns the cleansed ID of the def element (without diamond) */
        checkOrCreateDef : function (xmldoc, id, guid, prefix) {
			var newId = prefix+this.removeDiamond(id);
            var element = document.getElementById(newId);
            if (element == null) {
                newId= this.insertDefElement(this.slowGetById(xmldoc, this.removeDiamond(id)),guid,prefix);
            }
			log.debug("checkOrCreateDef: "+newId);
            return newId;
        },
        
        /* returns a pseudorandom GUID (e.g. "12a33d85-7c4f-4f2f-8f27-5102c7dabb10") */
        getGUID : function(){
            var s4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return 'el'+(s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4());
        },
        
        /* creates a copy of a given element. An Id needs to be set afterwards.
		The ID of the old element is not copied.*/
        copyElement : function (element){
            var newElement = document.createElementNS(xml3dNS, element.tagName);
            var attributes = element.attributes;
            if(attributes != null){
                log.debug('Copying Attributes: '+attributes.length);
                for(var i = 0; i < attributes.length; i++){
                    //log.debug('Attribute: '+attributes[i].name+' Value: '+attributes[i].value);
                    newElement.setAttribute(attributes[i].name,attributes[i].value);
                }
            }
			if(newElement.hasAttribute('id'))newElement.removeAttribute('id');
            log.info('Copying children');
           /* This function adds the childNodes of the old Element to the new element*/
            this.appendChildren(newElement, element);
            
            return newElement;
        },
        
		/*Copies the childnodes of oldParrent to the newParent.  
		It checks whether it is a text node or a normal element.*/
        appendChildren:function(newParent,oldParent){
            var children = oldParent.childNodes;
            if (children == null) return;
            
            for(var i = 0; i< children.length; i++){
				//log.info("child nr. "+i+" tag: "+children[i].tagName + children[i].nodeType+children[i].nodeName+children[i].nodeValue);
                if (children[i].tagName == null && children[i].nodeValue.length > 0) {
					//log.info('creating text node: '+children[i].nodeValue);
                    var textNode = document.createTextNode(X3D.util.trimString(children[i].nodeValue));
                    newParent.appendChild(textNode);
                } else if(children[i].tagName != null){
                    var temp = document.createElementNS(xml3dNS, children[i].tagName);
                    var attributes = children[i].attributes;
                        
                    //log.info('Child object: '+children[i].tagName+' Attributes Array: '+attributes);
                    newParent.appendChild(temp);
                        
                    if(attributes != null) {
                        log.info('Attributes array has '+attributes.length+' Elements');
                        for(var j = 0; j < attributes.length; j++){
                            temp.setAttribute(attributes[j].name, attributes[j].value);
                            //log.info('Attribute: '+attributes[j].name+' Value: '+attributes[j].value);
                        }
                    }
                    this.appendChildren(temp,children[i]);
                }
            }
        },
        /* 
		Actually inserts a dependent element (shader, transformer, data) into the
		defs section of the current docuement.  Its also uses the standard prefixes of the X3D.main
		for ids so that they do not appear twice in the document. Parameters:
			element: element to be inserted
			guid: id of the group that depends on the new elmenet
			prefix: prefix of the template document
		Returns the new id of the dependent element.
		*/
        insertDefElement : function (element,guid,prefix) {
            log.debug('Adding a new element to defs: '+element.getAttribute('id'));
            var defs = document.getElementById('3dDefs');
            
            
            var newid = prefix+element.getAttribute('id');
            var newelement = this.copyElement(element);
			if(newelement.tagName === 'shader'){
				newid = X3D.main.getShaderPrefix()+guid;
			} else if(newelement.tagName === 'transform'){
				newid = X3D.main.getTransformerPrefix()+guid;
			}
			log.debug("old tagname: "+element.tagName+" new tagname: "+newelement.tagName+" newid: "+newid);
            newelement.setAttribute('id',newid);
            defs.appendChild(newelement);
			return newid;
        },
        
        /* returns the element with the $id. apparently we cannot use getElementById on
           a DOM tree other than document and need to use a pretty ugly workaround */
        slowGetById: function (xmldoc, id) {
            var elements = xmldoc.getElementsByTagName('*'); // XXX: super slow
            for(var i = 0; i < elements.length; i++){
                if(elements[i].getAttribute('id') == id) return elements[i];
                
            }
            return null;
        },
        
		/*
			Removes the first char of a String.  Used to remove the '#' of an id.
		*/
        removeDiamond : function(text){
            if(text!=null)return text.substring(1); else return null;
        },
        /*
			Initialized the generics handler and also inserts the default template document.
		*/
        init : function(){
            log = X3D.log.get(logname);
            // xss
            if (window.location.host == "localhost") {
                X3D.gen.addSource('http://localhost/xml3d/generics/defaulGenerics.xml');
            } else {
                X3D.gen.addSource('http://xml3d.labs.iodev.org/generics/defaulGenerics.xml');
            }
            log.info('Generics Handler has been initialized!');
            
        }
    };
}();
