var X3D = X3D ? X3D : new Object();

X3D.listener = new function() {
	var x_c = 0;
	var y_c = 0;
	var v;
	var Rotation;
	var view;
	var t = null;
	
	var status = false;
	
	return{
		pageWidth : function() {
			return window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
		},
		pageHeight : function() {
			return  window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ?  document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
		}, 
		
		timeout : function(axis, direction){
			t = window.setInterval(function(){X3D.listener.doRotation(axis, direction);},1000);
		},
		getStatus : function(){
			return status;
		},
		/*Creates the roation for the flying mode*/
		doRotation : function(axis, direction){
			if(axis == 'x'){
				v.x = 1;
				v.y = 0;
			} else {
				v.x = 0;
				v.y = 1;
			}
			if(direction == 0)
				Rotation.setAxisAngle(v, (1/25));
			else
				Rotation.setAxisAngle(v, (-1/25));
				
			view.orientation = view.orientation.multiply(Rotation);
			
			//Neigung korrigieren
			var xml3dObj = document.getElementById('MyXml3d');
			var up_L = xml3dObj.createXML3DVec3();
			up_L.x = 0;
			up_L.y = 1;
			up_L.z = 0;
			var up_c = xml3dObj.createXML3DVec3();
			up_c = view.orientation.rotateVec3(up_L);

			var phi = Math.acos(up_c.y / Math.sqrt(up_c.x * up_c.x + up_c.y * up_c.y));
			if(up_c.x < 0)
				phi = -phi;
			
			var z_c = xml3dObj.createXML3DVec3();
			z_c.x = 0;
			z_c.y = 0;
			z_c.z = 1;
			
			Rotation.setAxisAngle(z_c, phi);
			view.orientation = view.orientation.multiply(Rotation);
			
			console.log('x:' + view.orientation.axis.x);
			console.log('y:' + view.orientation.axis.y);
			console.log('z:' + view.orientation.axis.x);
			
			/*console.log(view.orientation.toMatrix().m11 + view.orientation.toMatrix().m12 + view.orientation.toMatrix().m13 + view.orientation.toMatrix().m14);	
			console.log(view.orientation.toMatrix().m21 + view.orientation.toMatrix().m22 + view.orientation.toMatrix().m23 + view.orientation.toMatrix().m24);
			console.log(view.orientation.toMatrix().m31 + view.orientation.toMatrix().m32 + view.orientation.toMatrix().m33 + view.orientation.toMatrix().m34);
			console.log(view.orientation.toMatrix().m41 + view.orientation.toMatrix().m42 + view.orientation.toMatrix().m43 + view.orientation.toMatrix().m44);*/			
				
			X3D.main.resetXml3D();
		},
		/*Allows the user to 'walk' in the Xml3d application*/
		handleKeyEvent : function(evt){
			var xml3dObj = document.getElementById('MyXml3d');
			view = X3D.main.getCurrentView();
			//console.log(X3D.main.getCurrentView());
			v = xml3dObj.createXML3DVec3(); // Vec for rotation
			Rotation = xml3dObj.createXML3DRotation();
			v.z = 0;
			var xview = 0;
			var yview = 0;
			var key = evt.keyCode;
			if(key != 87 || key != 83 || key != 65 || key != 68){
				var q = xml3dObj.createXML3DVec3();
				q.z = 0;
				q.x = 0;
				q.y = 0;
				// w = 87; a = 65; s = 83; d = 68; q = 81
				if(key == 87){
					q.z = -1;
				}
				if(key == 83){
					q.z = 1;
				}
				if(key == 65){
					q.x = -1;
				}
				if(key == 68){
					q.x = 1;
				}
				q = view.orientation.rotateVec3(q);
				view.position.x += q.x;
				view.position.y += q.y;
				view.position.z += q.z;
				X3D.main.resetXml3D();

				return false;
			}
		},
		/*Delivers the flying mode.  The flying mode has to be activated with 'Q'.
		If the user reaches a border of the browser, a automatic rotation will be activated.*/
		init : function(){		
			view = X3D.main.getCurrentView();
			var xml3dObj = document.getElementById('MyXml3d');
			v = xml3dObj.createXML3DVec3(); // Vec for rotation
			Rotation = xml3dObj.createXML3DRotation();
			v.z = 0;
			var xview = 0;
			var yview = 0;
		
			document.onmousemove = function(evt){
				if(X3D.main.getMode() === 'rotateRoom'){
					console.log('rotating');
					var height = X3D.listener.pageHeight();
					var width = X3D.listener.pageWidth();
					
					if(t!=null && evt.clientX < width - 50){
						window.clearInterval(t);
						t=null;
					}
					if(evt.clientX >= width - 50){
						if(t == null)X3D.listener.timeout('y', 1);
					}
					if(evt.clientX < 10){
						if(t == null)X3D.listener.timeout('y', 0);
					}
					
					if(evt.clientY >= height - 20){
						if(t == null)X3D.listener.timeout('x', 1);
					}
					if(evt.clientY < 10){
						if(t == null)X3D.listener.timeout('x', 0);
					}
					if(evt.clientX != y_c){
						if(y_c - evt.clientX > 0){
							yview++;
						}
						else{
							yview--;
						}
						if(yview == 10){	
							X3D.listener.doRotation('y', 0);
							yview = 0;
						}
						if(yview == -10){
							X3D.listener.doRotation('y', 1);
							yview = 0;
						}
						
						// Y wird nach oben hin kleiner; Nach links wird x kleiner
						y_c = evt.clientX;				
					}
					if(evt.clientY != x_c){
						if(x_c - evt.clientY > 0){
							xview++;
						}
						else{
							xview--;
						}
						v.x = 1;
						v.y = 0;					

						if(xview == 10){					
							X3D.listener.doRotation('x', 0);
							xview = 0
							}
						if(xview == -10){
							X3D.listener.doRotation('x', 1);
							xview = 0;
						}
						
						// Y wird nach oben hin kleiner; Nach links wird x kleiner
						x_c = evt.clientY;				
					}
				}
			};
			
		}
	}
}();
