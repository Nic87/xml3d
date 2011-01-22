window.onload = function(){
	  (function(){  
	   var VOZ = {
			elems:[],//Array to save all the elements found by the functions getById, getByC
			selectedElem:null,
			initScene:function() {
				var scene = document.getElementById("MyXml3d");
				if(scene && scene.setOptionValue) {
					scene.setOptionValue("accumulatepixels", true);
					scene.setOptionValue("oversampling", 1);
				}
			},
			//Get all elements by Idt gen	
			//It could take more than one parameter
			getById:function(){
				var tempElems = []; //temp Array to save the elements found
				for(var i = 0;i<arguments.length;i++){
					if(typeof arguments[i] === 'string'){ //Verify if the parameter is an string
						tempElems.push(document.getElementById(arguments[i])); //Add the element to tempElems
					}
				}
				this.elems = tempElems; //All the elements are copied to the property named elems
				return this; //Return this in order to chain
			},
					

			//Add a new class to the elements
			//This does not delete the all class, it just add a new one
			addClass:function(name){
				for(var i = 0;i<this.elems.length;i++){
							this.elems[i].className += ' ' + name; //Here is where we add the new class
						}
						return this; //Return this in order to chain
			},
				
					
			//Add an Event to the elements found by the methods: getById and getByClass
			//--Action is the event type like 'click','mouseover','mouseout',etc
			//--Callback is the function to run when the event is triggered
			 on: function(action, callback){
			   if(this.elems[0].addEventListener){
					for(var i = 0;i<this.elems.length;i++){
						this.elems[i].addEventListener(action,callback,false);//Adding the event by the W3C for Firefox, Safari, Opera...   
					}
				}
			   else if(this.elems[0].attachEvent){
						for(var i = 0;i<this.elems.length;i++){
							this.elems[i].attachEvent('on'+action,callback);//Adding the event to Internet Explorer :(
						}
				}
				return this;//Return this in order to chain
			},
					
			//Append Text into the elements
			//Text is the string to insert
			appendText:function(text){
				text = document.createTextNode(text); //Create a new Text Node with the string supplied
				for(var i = 0;i<this.elems.length;i++){
				this.elems[i].appendChild(text);//Append the text into the element
				}
				return this;//Return this in order to chain
			},
			moveMesh:function(id){
				 var transform = document.getElementById(id);
				 transform.translation.x += 0.1;
				 return this;
			   },
			
			copyObjects:function(id){
				var box = document.createElement('group');
				box.setAttribute('style','-moz-transform: url(#ex6_1_boxXfm2); transform: url(#ex6_1_boxXfm2);');
				var box2 = document.createElement('group');
				box2.setAttribute('style','shader: url(#ex4_2_texShader);');
				var newmesh = document.createElement('mesh');
				newmesh.setAttribute('type','triangles');
				newmesh.setAttribute('src','#squareData');
				box2.appendChild(newmesh);
				box.appendChild(box2);
				document.getElementById(id).appendChild(box);
				return this;
				},
			selectElement:function(){
				for(var i = 0;i<this.elems.length;i++){
					var element = this.elems[i];
					if(this.elems[i]=== this.selectedElem){
						var redShader = '#redShader'
						var elemAttr = element.getAttribute('oldShader');
						element.setAttribute('shader',elemAttr);
						element.removeAttribute('oldShader');
						this.selectedElem = null;
						$$.resetXml3D();
					} else if(this.selectedElem === null){
						var redShader = '#redShader'
						var elemAttr = element.getAttribute('shader');
						element.setAttribute('shader',redShader);
						element.setAttribute('oldShader',elemAttr);
						this.selectedElem = element;
						$$.resetXml3D();
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
				for(var i = 0;i<this.elems.length;i++){
				this.elems[i].style['display'] = (this.elems[i].style['display']==='none' || '') ?'block':'none'; //Check the status of the element to know if it could be displayed or hided
				
				}
				return this;//Return this in order to chain
			},
			capturekey:function(e){
				var key=(typeof event!='undefined')?window.event.keyCode:e.keyCode;
				if(this.selectedElem ===null){
					
				} else{
					var keyNumber = parseInt(key);
					if(key < 41 && key >36){
						$$.moveSelectedObject(keyNumber);
						
					}
				}
			},
			moveSelectedObject:function(keyNumber){
				$$.testPositionTransformer();
				var transformer = document.getElementById('posTransformer'+this.selectedElem.getAttribute('id'));
				alert('almost working:'+transformer.getAttribute('translation')+'transform:'+this.selectedElem.getAttribute('transform'));
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
				$$.resetXml3D();
				
			},
			createTransformer:function(name){
				alert('');
				if(document.getElementById(name)){
				} else {
				var transformer = document.createElement('transform');
				transformer.setAttribute('id',name);
				transformer.setAttribute('translation','0.0 0.0 0.0');
				document.getElementById('3dDefs').appendChild(transformer);
				$$.resetXml3D();				
				alert('Transformer Created: '+document.getElementById(name).parentNode.getAttribute('id'));
				}
			},
			copyTransformer:function(newTranformer,oldTransformer){
				alert('copying');

				alert('copying2');
				var oldNode = document.getElementById(oldTransformer);
				alert('copying2,5');
				var transformer2 =oldNode.cloneNode(false);
				transformer2.setAttribute('translation',oldNode.getAttribute('translation'));
				alert('copying3');
				transformer2.setAttribute('id',newTransformer);
				document.getElementById('3dDefs').appendChild(transformer2);
				alert('copying4');
				$$.resetXml3D();				
				alert('Transformer Created: '+document.getElementById(name).parentNode.getAttribute('id'));
			},
			testPositionTransformer:function(){
				if(this.selectedElem === null){
				}else{
					var transform = this.selectedElem.getAttribute('transform').toString();
					var elemId = this.selectedElem.getAttribute('id');
					var transformerName = '#posTransformer'+elemId;
					if(transform.toString()===transformerName){
						
					} else{
						$$.copyTransformer('posTransformer'+elemId,transform);
						this.selectedElem.setAttribute('transform',transformerName);
						$$.resetXml3D();
						alert(''+this.selectedElem.getAttribute('transform'));
					}
				}
			}
					
		}
		if(!window.$$){window.$$=VOZ;}//We create a shortcut for our framework, we can call the methods by $$.method();
		}
		)();
		//Look for the element with the Id myButtonBox and attach an onclick element
		$$.getById('box1').on('click',function(){
            //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
			$$.getById('box1').selectElement();
        });
		$$.getById('box2').on('click',function(){
            //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
			$$.getById('box2').selectElement();
        });
		$$.getById('btnMove').on('click',function(){
            //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
			$$.getById('box1').selectElement();
        });
		$$.getById('content').on('click',function(){
            //Add the class 'blackBorder' into this element
            $$.getById('content').addClass('blackBorder')
        });
    
    //Look for the element with the Id myButton and attach an onclick element
    $$.getById('myButton').on('click',function(){
            //Add the class 'blackBorder' into this element
            $$.getById('content').addClass('redBorder');
        });
    
    //Look for the element with the Id myButton and attach an onclick element
    $$.getById('myButtonToggle').on('click',function(){
            //Show and Hide the element depending of its status
            $$.getById('content').toggleHide();
        });
    
    //Look for the element with the Id myButtonBox and attach an onclick element
    $$.getById('myButtonBox').on('click',function(){
            //Look for the elements with the Id example2,example3, example4 and add the class 'boxesOnChange'
            $$.getById('example2','example3','example4').addClass('boxesOnChange');
        });
    
    //Look for the element with the Id myButtonBox and attach an onclick element
    $$.getById('myButtonToggleBox').on('click',function(){
            //Show and Hide the elements depending of their status
            $$.getById('example2','example3','example4').toggleHide();
        });
    
    //Look for the element with the Id myButtonBox and attach an onclick element
    $$.getById('btnAdd').on('click', function(){
            //Append new text to content everytime the event is fired
            $$.getById('content').appendText('Text added by Javascript :) ');
        });
	$$.initScene();
	if(navigator.appName!= "Mozilla"){document.onkeyup=$$.capturekey}
	else{document.addEventListener("keypress",$$.capturekey,true);}

}     
		