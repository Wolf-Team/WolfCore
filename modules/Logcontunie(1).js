WolfCore.Log.File;

for (var i = 0;;i++)
	if (!WolfCore.FileAPI.select(WolfCore.Path.logs + WolfCore.Date.time + "-" + i + ".wcl").exists()) {
		WolfCore.FileAPI.create(WolfCore.Path.logs, WolfCore.Date.time + "-" + i + ".wcl");
		WolfCore.Log.File = WolfCore.FileAPI.select(WolfCore.Path.logs, WolfCore.Date.time + "-" + i + ".wcl");
		break;
	}
	

WolfCore.Log.Info = function(a){
	WolfCore.FileAPI.write(WolfCore.Log.File, "["+WolfCore.Abbr+"][LOG]:"+a);
}
WolfCore.Log.Warning = function(a){
	WolfCore.FileAPI.write(WolfCore.Log.File, "["+WolfCore.Abbr+"][WARNING]:"+a);

	//WolfCore.FileAPI.write(WolfCore.FileAPI.select(WolfCore.Log.File), WolfCore.FileAPI.read(WolfCore.FileAPI.select(WolfCore.Log.File))+"\n[WC][WARNING]:"+a);
}
WolfCore.Log.Error = function(a){
	WolfCore.FileAPI.write(WolfCore.Log.File, "["+WolfCore.Abbr+"][ERROR]:"+a);

	//WolfCore.FileAPI.write(WolfCore.FileAPI.select(WolfCore.Log.File), WolfCore.FileAPI.read(WolfCore.FileAPI.select(WolfCore.Log.File))+"\n[WC][ERROR]:"+a);
}