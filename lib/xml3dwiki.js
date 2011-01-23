var X3D = X3D ? X3D : new Object();
X3D.main = function() {
	var that = this;
	var elems = [];
	//Array to save all the elements found by the functions getById, getByC
	var selectedElems = [];
	

	
	return {		
		//Get all elements by Idt gen	
		//It could take more than one parameter
		getById:function(){
			var tempElems = []; //temp Array to save the elements found
			for(var i = 0;i<arguments.length;i++){
				if(typeof arguments[i] === 'string'){ //Verify if the parameter is an string
					tempElems.push(document.getElementById(arguments[i])); //Add the element to tempElems
				}
			}
			elems = tempElems; //All the elements are copied to the property named elems
			//alert('ident: '+elems.length);
			return this; //Return this in order to chain
		},
		getElems:function(){
			return elems;
		},

		//Add a new class to the elements
		//This does not delete the all class, it just add a new one
		addClass:function(name){
			for(var i = 0;i<elems.length;i++){
						elems[i].className += ' ' + name; //Here is where we add the new class
					}
					return this; //Return this in order to chain
		},
			
				
		//Add an Event to the elements found by the methods: getById and getByClass
		//--Action is the event type like 'click','mouseover','mouseout',etc
		//--Callback is the function to run when the event is triggered
		 on: function(action, callback){
		   if(elems[0].addEventListener){
				for(var i = 0;i<elems.length;i++){
					elems[i].addEventListener(action,callback,false);//Adding the event by the W3C for Firefox, Safari, Opera...   
				}
			}
		   else if(elems[0].attachEvent){
					for(var i = 0;i<elems.length;i++){
						elems[i].attachEvent('on'+action,callback);//Adding the event to Internet Explorer :(
					}
			}
			return this;//Return this in order to chain
		},
				
		//Append Text into the elements
		//Text is the string to insert
		appendText:function(text){
			text = document.createTextNode(text); //Create a new Text Node with the string supplied
			for(var i = 0;i<elems.length;i++){
			elems[i].appendChild(text);//Append the text into the element
			}
			return this;//Return this in order to chain
		},
		moveMesh:function(id){
			 var transform = document.getElementById(id);
			 transform.translation.x += 0.1;
			 this.resetXml3D();
			 return this;
		   },
		
		createBox:function(){
			var box = document.createElement('group');
			box.setAttribute('transform','#posTransformbox3');
			var newmesh = document.createElement('mesh');
			newmesh.setAttribute('type','triangles');
			newmesh.setAttribute('src','#squareData');
			box.appendChild(newmesh);
			box.setAttribute('id','box3');
			document.getElementById('MyXml3d').appendChild(box);
			this.resetXml3D();
			//alert('box created: '+document.getElementById('box3').getAttribute('transform'));
			return this;
			},
		contains:function(sarray, ele){
			//alert('contains function');
			for(var i = 0;i<sarray.length;i++){
				if(sarray[i]===ele)return true;
			}
			return false;
		},
		indexOfEle:function(sarray,ele){
			for(var i = 0;i<sarray.length;i++){
				if(sarray[i]===ele){
				return i;
				}
			}
			return -1;
		},
		selectElement:function(){
			for(var i = 0;i<elems.length;i++){
				var element = elems[i];
				if(this.contains(selectedElems,element)){
					var elemAttr = element.getAttribute('oldShader');
					element.setAttribute('shader',elemAttr);
					element.removeAttribute('oldShader');
					selectedElems.splice(this.indexOfEle(selectedElems,element),1);
					this.resetXml3D();
				} else {
					var redShader = '#redShader'
					var elemAttr = element.getAttribute('shader');
					element.setAttribute('shader',redShader);
					element.setAttribute('oldShader',elemAttr);
					selectedElems.push(element);
					this.resetXml3D();
				}
			}
			return this;
		},
		//Show and Hide the elements found
		resetXml3D:function(){
			var xml3dobj = document.getElementById('MyXml3d');
			//var defs = document.getElementById('3dDefs');
			//var start = document.getElementById('start');
			//document.getElementById('start').appendChild(xml3dobj);
			//defs.update();
			//this.selectedElem.update();
			xml3dobj.update();
		},
		toggleHide:function(){
			for(var i = 0;i<elems.length;i++){
			elems[i].style['display'] = (elems[i].style['display']==='none' || '') ?'block':'none'; //Check the status of the element to know if it could be displayed or hided
			
			}
			return this;//Return this in order to chain
		},
		capturekey:function(e){
			var key=(typeof event!='undefined')?window.event.keyCode:e.keyCode;
			if(selectedElems.length===0){
				
			} else{
				var keyNumber = parseInt(key);
				if(key < 41 && key >36){
					//alert(this);
					X3D.main.moveSelectedObject(keyNumber);
					
				}
			}
		},
		moveSelectedObject:function(keyNumber){
			//$$.testPositionTransformer();
			for(var i = 0;i<selectedElems.length;i++){
				var element = selectedElems[i];
				var transformerIdRaw = element.getAttribute('transform').toString();
				var transformerId = transformerIdRaw.substring(1,transformerIdRaw.length);
				var transformer = document.getElementById(transformerId);
				//alert('almost working:'+transformer.getAttribute('translation')+'transform:'+this.selectedElem.getAttribute('transform'));
				//alert(transformerId + ' Using');
				switch(parseInt(keyNumber)){
					case 37:{
						transformer.translation.x -= 0.1;
						break;
					}
					case 38:{
						transformer.translation.y += 0.1;
						break;
					}
					case 39:{
						transformer.translation.x += 0.1;
						break;
					}
					case 40:{
						transformer.translation.y -= 0.1;
						break;
					}
				}
				
			}
			this.resetXml3D();
		},
		createTransformer:function(name){
			alert('');
			if(document.getElementById(name)){
			} else {
			var transformer = document.createElement('transform');
			transformer.setAttribute('id',name);
			transformer.setAttribute('translation','0.0 0.0 0.0');
			document.getElementById('3dDefs').appendChild(transformer);
			this.resetXml3D();				
			alert('Transformer Created: '+document.getElementById(name).parentNode.getAttribute('id'));
			}
		},
		copyTransformer:function(newTranformer,oldTransformer){
			var oldNode = document.getElementById(oldTransformer);
			alert('copying2,5');
			var transformer2 =oldNode.cloneNode(false);
			transformer2.setAttribute('translation',oldNode.getAttribute('translation'));
			alert('copying3');
			transformer2.setAttribute('id',newTransformer);
			document.getElementById('3dDefs').appendChild(transformer2);
			alert('copying4');
			this.resetXml3D();				
			alert('Transformer Created: '+document.getElementById(name).parentNode.getAttribute('id'));
		},
		testPositionTransformer:function(){
			if(this.selectedElems.length === 0){
			}else{
				var transform = selectedElem.getAttribute('transform').toString();
				var elemId = selectedElem.getAttribute('id');
				var transformerName = '#posTransformer'+elemId;
				if(transform.toString()===transformerName){
					
				} else{
					this.createTransformer('posTransformer'+elemId);
					this.selectedElem.setAttribute('transform',transformerName);
					this.resetXml3D();
					alert(''+this.selectedElem.getAttribute('transform'));
				}
			}
		},
		init: function() {
				var scene = document.getElementById("MyXml3d");
				if(scene && scene.setOptionValue) {
					scene.setOptionValue("accumulatepixels", true);
					scene.setOptionValue("oversampling", 1);
				}
						//Look for the element with the Id myButtonBox and attach an onclick element
				if(navigator.appName!= "Mozilla"){document.onkeyup=X3D.main.capturekey}
				else{document.addEventListener("keypress",X3D.main.capturekey,true);}
				
				X3D.main.getById('box1');
				X3D.main.on('click',function(){
						//Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
						X3D.main.getById('box1').selectElement();
					});
				X3D.main.getById('box2');
				X3D.main.on('click',function(){
						//Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
						X3D.main.getById('box2').selectElement();
					});
				
		}
					
	}
		

}();
