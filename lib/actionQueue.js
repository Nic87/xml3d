/*
	Skipt: actionQueue.js
	Namespace: X3D.queue
	Author: Holger
	Description: This skript enables undo and redo functions for the user interface.  
	Can be improved to act as a history.
*/

var X3D = X3D ? X3D : new Object();

/*
	This is an Interface for a typical Command.  It has the functions 
	execute and undo which need to be overriden to fit needs of other content.
*/
function Command(){
}
Command.prototype.execute = function(){
}
Command.prototype.undo = function(){
}
/*
	A CommandMacro is used to combine different Commands into one 
	which ensures that they are executed and undone at the same time.
*/
function CommandMacro(){
	this.commands = [];
	
}
CommandMacro.prototype = new Command();
CommandMacro.prototype.execute = function(){
	for(var i =0;i<this.commands.length;i++){
		this.commands[i].execute();
	}
}
CommandMacro.prototype.undo = function(){
	for(var i =0;i<this.commands.length;i++){
		this.commands[i].undo();
	}
}
X3D.queue = function() {
	var log, logname = "lib/actionQueue.js";
	var commands = [];
	var commandsUndone = [];
	
	return {
		init: function() {
            log = X3D.log.get(logname);
            log.info("initialized");
			//index =0;
        },
		/*
			This method empties the lists of commands.
		*/
		resetCommands : function(){
			commands = [];
			commandsUndone = [];
		},
		createCommand : function(){
			return new Command();
		},
		/*
			Adds a new Command to the queue.  
			Paramters are the new exec and undo method.
			The Command is EXECUTED during the method call.
		*/
		pushCommand : function(exec,undo){
			var command = new Command();
			command.execute = exec;
			command.undo = undo;
			commands.push(command);
			commandsUndone = [];
			command.execute();
		},
		/*
			Adds a command to the queue and EXECUTES it.  Another Script
			should not execute command directly as it would be executed twice.
			This is to ensure, that the commandsUndone array is cleared correctly.
		*/
		pushCustomCommand : function(command){
			commands.push(command);
			commandsUndone = [];
			command.execute();
		},
		
		/*
		*/
		pushMultipleCommands : function(commandArray){
			var command = new CommandMacro();
			command.commands = commandArray;
			this.pushCustomCommand(command);
			
		},
		/*
			This method is used to undo the last action
		*/
		undo : function(){
			if(commands.length >0){
				var command = commands.pop();
				command.undo();
				commandsUndone.push(command);
			}
		},
		/*
			This method is used to redo the last undone action.  
			If an execute method has been called, all undone actions
			are lost.
		*/
		redo : function(){
			if(commandsUndone.length >0){
				var command = commandsUndone.pop();
				command.execute();
				commands.push(command);
			}
		},
		/*
			This is a test method which enures that queue is working properly.
		*/
		test: function(){
			var number =0;
			var execute = function(){
				number = number+1;
				log.info("Number: "+number);
			};
			var undo = function(){
				number = number-1;
				log.info("Number: "+number);
			};
			this.pushCommand(execute,undo);
			this.pushCommand(execute,undo);
			this.pushCommand(execute,undo);
			this.undo();
			this.undo();
			this.redo();
			this.pushCommand(execute,undo);
		}
	}
}();