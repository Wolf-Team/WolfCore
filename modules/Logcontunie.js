WolfCore.Log.File;

for (var i = 0;;i++)
	if (!WolfCore.FileAPI.select(WolfCore.Path.logs + WolfCore.Date.time + "-" + i + ".wcl").exists()) {
		WolfCore.FileAPI.create(WolfCore.Path.logs, WolfCore.Date.time + "-" + i + ".wcl");
		WolfCore.Log.File = WolfCore.FileAPI.select(WolfCore.Path.logs, WolfCore.Date.time + "-" + i + ".wcl");
		break;
	}
	
WolfCore.Log.Write = function(a){
	if(!WolfCore.Log.File.exists()){
		WolfCore.Log.File.createNewFile();
	}
	WolfCore.FileAPI.write(WolfCore.Log.File, a);
}
	
WolfCore.Log.GetAbbr = function(a){
	if(a==null||typeof(a)!="string")
		return WolfCore.Abbr;
	else
		return a;
}
	
WolfCore.Log.Info = function(a, b){
	WolfCore.FileAPI.write(WolfCore.Log.File, "["+WolfCore.Log.GetAbbr(b)+"][LOG]:"+a);
}
WolfCore.Log.Warning = function(a,b){
	WolfCore.FileAPI.write(WolfCore.Log.File, "["+WolfCore.Log.GetAbbr(b)+"][WARNING]:"+a);
}
WolfCore.Log.Error = function(a,b){
	WolfCore.FileAPI.write(WolfCore.Log.File, "["+WolfCore.Log.GetAbbr(b)+"][ERROR]:"+a);
}

WolfCore.Log.Info(WolfCore.Name);
WolfCore.Log.Info("v."+WolfCore.Version);
WolfCore.Log.Info("©"+WolfCore.Author);
WolfCore.Log.Warning("Thanks:\n    -NML");
