WolfCore.Log = {};

WolfCore.Log.Print = function(type, message){
	if(type==WolfCore.ERROR){
		print("<font color='#ff0000'>[ERROR]</font>:");
	}
	if(type==WolfCore.WARNING){
		print("<font color='#ffff00'>[WARNING]</font>:");
	}
	if(type==WolfCore.INFO){
		print("<font color='#ffffff'>[INFO]</font>:");
	}
}

