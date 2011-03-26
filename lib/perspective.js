var X3D = X3D ? X3D : new Object();

X3D.listener = new function() {
	var x_c = 0;
	var y_c = 0;
	var v;
	var Rotation;
	var tmp;
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
		doRotation : function(axis, direction){
			//console.log('test');
			//console.log('z: ' + tmp.orientation.axis.z);
			if(axis == 'x'){
				v.x = 1;
				v.y = 0;
				//v.z = 1;
			} else {
				v.x = 0;
				v.y = 1;
			}
			if(direction == 0)
				Rotation.setAxisAngle(v, (1/25));
			else
				Rotation.setAxisAngle(v, (-1/25));
				
			tmp.orientation = tmp.orientation.multiply(Rotation);
			
			//Neigung korrigieren
			var xml3dObj = document.getElementById('MyXml3d');
			var up_L = xml3dObj.createXML3DVec3();
			up_L.x = 0;
			up_L.y = 1;
			up_L.z = 0;
			var up_c = xml3dObj.createXML3DVec3();
			up_c = tmp.orientation.rotateVec3(up_L);
			
			//console.log('alt x:' + up_c.x + 'y:' + up_c.y + 'z:' + up_c.z);

			var phi = Math.acos(up_c.y / Math.sqrt(up_c.x * up_c.x + up_c.y * up_c.y));
			if(up_c.x < 0)
				phi = -phi;
			
			var z_c = xml3dObj.createXML3DVec3();
			z_c.x = 0;
			z_c.y = 0;
			z_c.z = 1;
			//console.log(phi);
			Rotation.setAxisAngle(z_c, phi);
			tmp.orientation = tmp.orientation.multiply(Rotation);
			
			//up_c = tmp.orientation.rotateVec3(up);
			//console.log('neu x:' + up_c.x + 'y:' + up_c.y + 'z:' + up_c.z);
				
			X3D.main.resetXml3D();
			/*
			var test = xml3dObj.createXML3DVec3();
			test.x = 1;
			test.y = 0;
			test.z = 0;
			var test2 = xml3dObj.createXML3DVec3();
			test2 = tmp.orientation.rotateVec3(test);
			console.log('ex =  ' + (Math.round(test2.x * 100)/100) + ', ' + (Math.round(test2.y * 100)/100) + ', ' + (Math.round(test2.z * 100)/100));
			test.x = 0;
			test.y = 1;
			test.z = 0;
			test2 = tmp.orientation.rotateVec3(test);
			console.log('ey =  ' + (Math.round(test2.x * 100)/100) + ', ' + (Math.round(test2.y * 100)/100) + ', ' + (Math.round(test2.z * 100)/100));
			test.x = 0;
			test.y = 0;
			test.z = 1;
			test2 = tmp.orientation.rotateVec3(test);
			console.log('ez =  ' + (Math.round(test2.x * 100)/100) + ', ' + (Math.round(test2.y * 100)/100) +  ', ' + (Math.round(test2.z * 100)/100));
			*/
		},
		handleKeyEvent : function(evt){
			tmp = document.getElementById('defaultView');
			var xml3dObj = document.getElementById('MyXml3d');
			v = xml3dObj.createXML3DVec3(); // Vec for rotation
			Rotation = xml3dObj.createXML3DRotation();
			v.z = 0;
			var xtmp = 0;
			var ytmp = 0;
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
				q = tmp.orientation.rotateVec3(q);
				tmp.position.x += q.x;
				tmp.position.y += q.y;
				tmp.position.z += q.z;
				X3D.main.resetXml3D();

				return false;
			}
		},
		init : function(){		
			tmp = document.getElementById('defaultView');
			var xml3dObj = document.getElementById('MyXml3d');
			v = xml3dObj.createXML3DVec3(); // Vec for rotation
			Rotation = xml3dObj.createXML3DRotation();
			v.z = 0;
			var xtmp = 0;
			var ytmp = 0;
			
			//console.log('x: ' + tmp.orientation.axis.x);
			//console.log('y: ' + tmp.orientation.axis.y);
			//console.log('z: ' + tmp.orientation.axis.z);
			
			/*document.onkeydown = function(evt){
				 
			};*/
			
			document.onmousemove = function(evt){
				if(X3D.main.getMode() === 'rotateRoom'){
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
					//console.log('Hoehe: ' + height + 'Y: ' + evt.clientY);
					if(evt.clientY >= height - 20){
						if(t == null)X3D.listener.timeout('x', 1);
					}
					if(evt.clientY < 10){
						if(t == null)X3D.listener.timeout('x', 0);
					}
					if(evt.clientX != y_c){
						if(y_c - evt.clientX > 0){
							ytmp++;
						}
						else{
							ytmp--;
						}
						if(ytmp == 10){	
							X3D.listener.doRotation('y', 0);
							ytmp = 0;
						}
						if(ytmp == -10){
							X3D.listener.doRotation('y', 1);
							ytmp = 0;
						}
						
						// Y wird nach oben hin kleiner; Nach links wird x kleiner
						y_c = evt.clientX;				
					}
					if(evt.clientY != x_c){
						if(x_c - evt.clientY > 0){
							xtmp++;
						}
						else{
							xtmp--;
						}
						v.x = 1;
						v.y = 0;					

						if(xtmp == 10){					
							X3D.listener.doRotation('x', 0);
							xtmp = 0
							}
						if(xtmp == -10){
							X3D.listener.doRotation('x', 1);
							xtmp = 0;
						}
						
						// Y wird nach oben hin kleiner; Nach links wird x kleiner
						x_c = evt.clientY;				
					}
					//console.log('Maus wurde bewegt!: ' + ' clientX ' + evt.clientX  + ' clientY ' + evt.clientY );
					//console.log('H�he: ' + pageHeight + 'Breite: '+ pageWidth + 'Pos. Links: ' + posLeft);
					//console.log('Pos. Oben: ' + posTop + 'Pos. Rechts: ' + posRight + 'Pos. Boden: ' + posBottom);
				}
			};
			
		}
	}
}();