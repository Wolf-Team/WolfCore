WolfCore.FileAPI = {
	File:java.io.File,
	FileReader:java.io.FileReader,
	BufferedReader:java.io.BufferedReader,
	InputStreamReader :java.io.InputStreamReader,
	FileInputStream : java.io.FileInputStream,
	FOS:java.io.FileOutputStream,
	String:java.lang.String,
	StringBuilder:java.lang.StringBuilder,
	
	select:function(dir,Name){
		return (new this.File(dir,Name));	
	},
	createNewDir:function(dir, newDirName){
		return (new this.File(dir, newDirName).mkdir());
	},
	exists:function(file){
		return file.exists();
	},
	create:function(path, name){
		new this.File(path, name).createNewFile();
		return this.File;
	},
};

WolfCore.Path = {};
WolfCore.Path.sdcard = android.os.Environment.getExternalStorageDirectory
WolfCore.Path.minecraft = new java.io.File(WolfCore.Path.sdcard+"/games/com.mojang/minecraftpe");
WolfCore.Path.mods = new java.io.File(WolfCore.Path.minecraft, "mods");
WolfCore.Path.configs = new java.io.File(WolfCore.Path.minecraft, "configs");
WolfCore.Path.logs = new java.io.File(WolfCore.Path.minecraft, "logs");
WolfCore.Path.tmp = new java.io.File(WolfCore.Path.minecraft,"tmp");

WolfCore.Path.minecraft.mkdirs();
WolfCore.Path.mods.mkdirs();
WolfCore.Path.configs.mkdirs();
WolfCore.Path.logs.mkdirs();
WolfCore.Path.tmp.mkdirs();