var $ = this.

var WolfCore = {};
WolfCore.Version = "d2.0.1.230217";
WolfCore.API = 1;

WolfCore.ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
WolfCore.context = ctx;
WolfCore.jsContext = org.mozilla.javascript.ContextFactory().enterContext();

WolfCore.UIrun = function(func){
	WolfCore.ctx.runOnUiThread(func);
};

WolfCore.LoadModules = function(name){
	var script = new java.lang.String(ModPE.getBytesFromTexturePack("modules/" + name + ".js"));
	WolfCore.jsContext.evaluateString($, script, name + ".js", 0, null);
};

print = function(a){
	WolfCore.UIrun(function() {
		try {
			android.widget.Toast.makeText(Mods.ctx,new android.text.Html.fromHtml(a),0).show();
		}catch(e){}
	});
}


new java.lang.Thread(function() {
	WolfCore.LoadModules("Date");
	WolfCore.LoadModules("Log");
	
	WolfCore.LoadModules("File");

}).start();