var X3D = X3D ? X3D : new Object();
function Command(){
}
Command.prototype.execute = function(){
}
Command.prototype.undo = function(){
}
X3D.queue = function() {
	var log, logname = "lib/actionQueue.js";
	var commands = [];
	var commandsUndone = [];
	
	return {
		init: function() {
            log = X3D.log.get(logname);
            log.info("initialized");
			index =0;
        },
		resetCommands : function(){
			commands = [];
			commandsUndone = [];
		},
		createCommand : function(){
			return new Command();
		},
		pushCommand : function(exec,undo){
			var command = new Command();
			command.execute = exec;
			command.undo = undo;
			commands.push(command);
			commandsUndone = [];
			command.execute();
		},
		pushCommand2 : function(command){
			commands.push(command);
			commandsUndone = [];
			command.execute();
		},
		undo : function(){
			if(commands.length >0){
				var command = commands.pop();
				command.undo();
				commandsUndone.push(command);
			}
		},
		redo : function(){
			if(commandsUndone.length >0){
				var command = commandsUndone.pop();
				command.execute();
				commands.push(command);
			}
		},
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