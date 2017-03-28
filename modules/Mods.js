WolfCore.Log.Info("Загрузка модов");
LoadingWindow.setStatus("Загрузка модов");

WolfCore.Mods={};
WolfCore.Mods.mods = [{
	name:WolfCore.Name,
	author:WolfCore.Author,
	version:WolfCore.Version,
	description:"..."
}];

WolfCore.Mods.Enabled = function(a){
	var file = WolfCore.FileAPI.select(WolfCore.Path.mods+"/"+a,"config.wcc");
	if(WolfCore.FileAPI.exists(file)){

		if( WolfCore.FileAPI.readLineText(file,":","enable")=="true")
		return true;
		
	}
	return false;
};

WolfCore.Mods.Load = function(){
	var a = WolfCore.FileAPI.readFolderList(WolfCore.Path.mods);
	for(var b in a){
var c = b+1;
if(WolfCore.Mods.Enabled(a[b])){
	if(WolfCore.FileAPI.exists(WolfCore.FileAPI.select(WolfCore.Path.mods+"/"+a[b],"pack.wcc"))){
			var d = WolfCore.FileAPI.select(WolfCore.Path.mods+"/"+a[b],"pack.wcc");
			WolfCore.Mods.mods.push({
				name:WolfCore.FileAPI.readLineText(d,":","name"),
				author:WolfCore.FileAPI.readLineText(d,":","author"),
				version:WolfCore.FileAPI.readLineText(d,":","version"),
				description:WolfCore.FileAPI.readLineText(d,":","description"),
			});
			WolfCore.Log.Info(WolfCore.FileAPI.readLineText(d,":","name")+" v."+WolfCore.FileAPI.readLineText(d,":","version")+" by "+WolfCore.FileAPI.readLineText(d,":","author")+" загружен");
WolfCore.Mods.Read(a[b]);

}
	}
	}
}

WolfCore.Mods.Read=function(x){
	var a = WolfCore.FileAPI.readFileList(WolfCore.Path.mods+"/"+x+"/", "js");
	var script = WolfCore.FileAPI.select(WolfCore.Path.mods+"/"+x, "script.wcs");
	if(!WolfCore.FileAPI.exists(script)){
		script.createNewFile();
	}
	//WolfCore.Log.Info(a);
//	WolfCore.Log.Info(WolfCore.Path.mods+"/"+x);
	WolfCore.FileAPI.rewrite(script,"");
	for(var b in a){
		var c = a[b];
		var d = WolfCore.FileAPI.select(WolfCore.Path.mods+"/"+x, c);
	//	WolfCore.Log.Info(a[b]);
		if(b==0)
			WolfCore.FileAPI.rewrite(script, WolfCore.FileAPI.read(d));
		else
			WolfCore.FileAPI.write(script, WolfCore.FileAPI.read(d));
	}
	
	WolfCore.jsContext.evaluateString($, WolfCore.FileAPI.read(script), x, 0, null);

}


WolfCore.Mods.Load();
//WolfCore.Log.Info(typeof(WolfCore.FileAPI.readLineText(WolfCore.FileAPI.select(WolfCore.Path.mods+"/mod1","config.wcc"),":","enable")));
//WolfCore.Log.Info("mod1"+WolfCore.Mods.Enabled("mod1"));