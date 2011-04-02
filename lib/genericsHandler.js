var X3D = X3D ? X3D : new Object();
X3D.gen = function() {
    var sources = [];
    var prefixes =[];
    var log, logname = "lib/genericsHandler.js";
    var xml3dNS = 'http://www.xml3d.org/2009/xml3d';
    var prefix;
    var counter = 0;
    return {
        addSource : function(src){
            sources.push(src);
            var doc = this.getXmlDocument(src);
            prefixes.push(doc.getElementsByTagName('generics')[0].getAttribute('prefix'));
            
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
		searchElement :function(prefix, id){
			var xmlDoc = this.getXmlDocument(this.findSrc(prefix));
			return this.gid(xmlDoc,id);
		},
        getElementsByType : function(xmldoc,type){
            var elements = xmldoc.getElementById(type);
            return elements.childNodes;
        },
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
        hasRoute : function(text){
            var x = text.substring(0,1);
            if(x === '#')return true;
            else return false;
        },
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
        importGenericDependant : function(searchPrefix,genericID){
            prefix=searchPrefix;
            src = this.findSrc(prefix);
            if(src!=null){
                var xmldoc = this.getXmlDocument(src);
                this.checkDependantObject(xmldoc,'#'+genericID);
            }
        },
        insertGenericGroup : function(name, searchPrefix, id){
            prefix = searchPrefix;
            src = this.findSrc(prefix);
            if(src!=null){
                log.info('Adding Group: '+src);
                var xmldoc = this.getXmlDocument(src);
                log.info('Prefix: '+prefix);
                var groupEle = this.gid(xmldoc,id);
                var newGroup = document.createElementNS(xml3dNS,'group');
                this.dynamicInsertGenericGroup(xmldoc,groupEle,newGroup);
                newGroup.setAttribute('id',''+name);
                var scene = document.getElementById('MyXml3d');
                scene.appendChild(newGroup);
                X3D.main.addSelectListener(newGroup);
                log.info('New Group was created: '+newGroup.getAttribute('id'));
                X3D.main.resetXml3D();
                return newGroup;
            }
            return null;
        },
        dynamicInsertGenericGroup : function(xmldoc,element, newElement){
            var attributes = element.attributes;
            var children = element.childNodes;
            if(attributes == null){
            }else {
                for(var j =0;j<attributes.length;j++){
                    if(this.hasRoute(attributes[j].value)){
                        var newId= this.checkDependantObject(xmldoc,attributes[j].value);
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
                            var textNode = document.createTextNode(this.trimString(children[i].nodeValue));
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
        checkDependantObject : function(xmldoc,id){
            var newId = prefix+this.removeRoute(id);
            var element = this.gid(document,newId);
            if(element===null){
                this.insertDefElement(this.gid(xmldoc,this.removeRoute(id)));
            }
            return newId;
        },
        getGUID : function(){
            var s4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };

            return 'el'+(s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4());
        },
        copyElement : function(element){
            var newElement = document.createElementNS(xml3dNS,element.tagName);
            var attributes = element.attributes;
            if(attributes!=null){
                log.info('Copying Attributes: '+attributes.length);
                for(var i =0;i<attributes.length;i++){
                    log.info('Attribute: '+attributes[i].name+' Value: '+attributes[i].value);
                    newElement.setAttribute(attributes[i].name,attributes[i].value);
                }
            }
            log.info('Copying children');
            this.appendChildren(newElement,element);
            return newElement;
        },
        appendChildren:function(newParent,oldParent){
            var children = oldParent.childNodes;
            if(children!=null){
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
                        newParent.appendChild(temp);
                        if(attributes == null){
                        }else {
                            log.info('Attributes array has '+attributes.length+' Elements');
                            for(var j =0;j<attributes.length;j++){
                                temp.setAttribute(attributes[j].name,attributes[j].value);
                                log.info('Attribute: '+attributes[j].name+' Value: '+attributes[j].value);
                            }
                        }
                        
                        this.appendChildren(temp,children[i]);
                    }
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
            element = this.copyElement(element);
            element.setAttribute('id',newid);
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
            // xss
            if (window.location.host == "localhost") {
                X3D.gen.addSource('http://localhost/xml3d/generics/defaulGenerics.xml');
            } else {
                X3D.gen.addSource('http://xml3d.labs.iodev.org/generics/defaulGenerics.xml');
            }
            log.info('Generics Handler has been initialized!');
            
        },
        test : function(){
            var newElement = this.insertGenericGroup(this.getGUID(), 'default','box1');
            var newId = X3D.main.testPositionTransformer(newElement);
            var transe = document.getElementById(newId);
            var x =3;
            X3D.main.changeTransformerTranslationX(transe,x);
            
        }
    };
}();
