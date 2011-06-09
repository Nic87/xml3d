function init_nav() {
   for(i = 0; i < document.getElementsByTagName('ul').length; 
       i++) {
      if(document.getElementsByTagName('ul')[i].className == 
      "opened") {
         id = 
         document.getElementsByTagName('ul')[i].parentNode.id;
         toggle(id, false);
      }
   }
   if(window.name.length > 0)       
      load_nav();
}
 
function toggle(id, save) {
   ul = "ul_" + id;
   img = "img_" + id;
   ul_element = document.getElementById(ul);
   img_element = document.getElementById(img);
   if(ul_element) {
       if(ul_element.className == 'closed') {
          ul_element.className = "opened";
          img_element.src = "opened.gif";
       } 
       else {
          ul_element.className = "closed";
          img_element.src = "closed.gif";
       }
   }
   if(save == true) save_nav();
}
 
function save_nav() {
   var save = "";
   for(var i = 0; i < document.getElementsByTagName('ul').length;
   i++) {
      if((document.getElementsByTagName('ul')[i].className == 
      "opened" || 
      document.getElementsByTagName('ul')[i].className == 
      "closed") && document.getElementsByTagName('ul')[i].id != 
      'root') 
         save = save + document.getElementsByTagName('ul')[i].id 
         + "=" + document.getElementsByTagName('ul')[i].className 
         + ",";
   }
   if(save.lastIndexOf(",") > 0) 
      save = save.substring(0, save.lastIndexOf(","));
   window.name = save;
}
 
function load_nav() {
   var items = window.name.split(",");
   if(items.length > 0) {
      for(var i = 0; i < items.length; i++) {        
         id_value = items[i].split("=");         
         if(id_value.length == 2) {
            id = id_value[0];  
            value = id_value[1];
            document.getElementById(id).className = value;
            img = "img_" + id.substring(3, id.length);
            img_element = document.getElementById(img);
            if(value == "closed")
               img_element.src = "closed.gif";  
            else
               img_element.src = "opened.gif";
         }
      }
   }
}