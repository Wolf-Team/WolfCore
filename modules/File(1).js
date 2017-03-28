WolfCore.FileAPI = {
	File:java.io.File,
	FileReader:java.io.FileReader,
	BufferedReader:java.io.BufferedReader,
	InputStreamReader :java.io.InputStreamReader,
	FIS : java.io.FileInputStream,
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
	delete:function(path){
		try {
            var filed = new java.io.File(path);
            if (filed.isDirectory()) {
                var directoryFiles = filed.listFiles();
                for (var i in directoryFiles) {
                    WolfCore.FileAPI.delete(directoryFiles[i].getAbsolutePath());
                }
                filed.delete();
            }
            if (filed.isFile()) {
                filed.delete();
            }
        } catch (e) {
            WolfCore.Log.Print(WolfCore.ERROR, "{FileAPI}.{Delete}:"+e);
        }
		
	},
	
	read: function(selectedFile) {
        var readed = (new WolfCore.FileAPI.BufferedReader(new WolfCore.FileAPI.FileReader(selectedFile)));
        var data = new WolfCore.FileAPI.StringBuilder();
        var string;
        while ((string = readed.readLine()) != null) {
            data.append(string);
            data.append('\n');
        }
        return data.toString();
    },
    readLine: function(selectedFile, line) {
        var readT = new WolfCore.FileAPI.read(selectedFile);
        var lineArray = readT.split('\n');
        return lineArray[line - 1];
    },
    readLineText: function(path, sp, text) {
        var fileRLT = new WolfCore.FileAPI.File(path);
        var readerRLT = new WolfCore.FileAPI.BufferedReader(new WolfCore.FileAPI.InputStreamReader(new WolfCore.FileAPI.FIS(fileRLT)));
        var readRLT;
		var textRLT;
        while ((readRLT = readerRLT.readLine()) != null) {
            if (readRLT.split(sp)[0] == text) {
                textRLT = readRLT.split(sp)[1];
				return textRLT;
                break;
            }
        }
        readerRLT.close();
		return false;
        
    },
    readBytes: function(file) {
        if (!file.exists())
            file.createNewFile();
        var fileInput = new WolfCore.FileAPI.FIS(file);
        var output = [];
        var data = fileInput.read();
        while (data != -1) {
            output.push(data);
            data = fileInput.read();
        }
        fileInput.close();
        return output;
    },
    write: function(selectedFile, text) {
        WolfCore.FileAPI.rewrite(selectedFile, (new WolfCore.FileAPI.read(selectedFile)) + text);
    },
    rewrite: function(selectedFile, text) {
        var writeFOS = new WolfCore.FileAPI.FOS(selectedFile);
        writeFOS.write(new WolfCore.FileAPI.String(text).getBytes());
    },
    writeBytes: function(file, bytes) {
        if (!file.getParentFile().exists())
            file.getParentFile().mkdirs();
        file.createNewFile();
        var fileOutput = new WolfCore.FileAPI.FOS(file);
        fileOutput.write(bytes);
        fileOutput.close();
    },
    
	readFileList: function(path, lookFor) {
        var file = WolfCore.FileAPI.File(path);
        var Files = file.listFiles();
        var fileList = [];
        if (Files == null) return false;
		
        for (var a in Files) {
			
            var fileName2 = Files[a].getName();
			if(Files[a].isFile()){
				if (lookFor != null) {
                    if (typeof(lookFor) == "string") {
                        if (!fileName2.endsWith(lookFor)) {
                            continue;
                        }
                    } else
                    if (lookFor instanceof Array) {
                        var index = fileName2.lastIndexOf(".");
                        if (index == -1) continue;
                        for (var b in lookFor) {
                            if (lookFor[b] == fileName2.substring(index)) {
                                fileList.push(fileName2);
                                break;
                            }
                        }
                        continue;
                    }
                }
			}
        }
        fileList = fileList.sort();
        return fileList;
    },
    readFolderList: function(path) {
        var lookFor = ".js";
        var file = WolfCore.FileAPI.File(path);
        var Files = file.listFiles();
        var folderList = [];
        if (Files == null) return false;
		
        for (var a in Files) {
            var fileName2 = Files[a].getName();
            if (Files[a].isDirectory()) {
                folderList.push(fileName2);
            }
        }
        folderList = folderList.sort();
        return folderList;
    }
	
};

WolfCore.Path = {};
WolfCore.Path.sdcard = android.os.Environment.getExternalStorageDirectory();
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

WolfCore.LoadModules("Logcontunie");