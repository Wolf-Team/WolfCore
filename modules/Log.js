WolfCore.Log = {};

WolfCore.Log.Print = function(type, message){
	if(type==WolfCore.ERROR){
		print("<font color='#ff0000'>[ERROR]</font>:"+message);
	}
	if(type==WolfCore.WARNING){
		print("<font color='#ffff00'>[WARNING]</font>:"+message);
	}
	if(type==WolfCore.INFO){
		print("<font color='#ffffff'>[INFO]</font>:"+message);
	}
}
