WolfCore.getDump=function(){
	var a = WolfCore.FileAPI.select(WolfCore.Path.minecraft, "dump.txt");
	if(!a.exists()){
		a.createNewFile();
	}
	WolfCore.FileAPI.rewrite(a, WolfCore.FileAPI.readAssets("modules/dump.txt"));
};