window.onload = function(){
          (function(){  
           var VOZ = {
            elems:[],//Array to save all the elements found by the functions getById, getByC

                //Get all elements by Id
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
            
            //Show and Hide the elements found
            toggleHide:function(){
                            for(var i = 0;i<this.elems.length;i++){
                            this.elems[i].style['display'] = (this.elems[i].style['display']==='none' || '') ?'block':'none'; //Check the status of the element to know if it could be displayed or hided
                            
                            }
                            return this;//Return this in order to chain
                        }
                    
    }
    if(!window.$$){window.$$=VOZ;}//We create a shortcut for our framework, we can call the methods by $$.method();
          })();
            
            
    
    
/* This is Where we start using our VOZ framework    
*/


    //Look for the element with the Id content and attach an onclick element
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
    
}     
            
        