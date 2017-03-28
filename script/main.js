var $ = this;

var WolfCore = {};
WolfCore.Name = "WolfCore";
WolfCore.Version = "d2.0.1.270317";
WolfCore.Author = "WolfTeam";
WolfCore.Abbr = "WC";
WolfCore.API = 1;

WolfCore.ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
WolfCore.context = WolfCore.ctx;
WolfCore.jsContext = org.mozilla.javascript.ContextFactory().enterContext();

WolfCore.UIrun = function(func){
	WolfCore.ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		try{
			func();
		}catch(e){
			WolfCore.Log.Error(e);
		}
	}}));
};

WolfCore.LoadModules = function(name){
	var script = new java.lang.String(ModPE.getBytesFromTexturePack("modules/" + name + ".js"));
	WolfCore.jsContext.evaluateString($, script, name + ".js", 0, null);
};

print = function(a){
	WolfCore.UIrun(function() {
		try {
			android.widget.Toast.makeText(WolfCore.ctx,new android.text.Html.fromHtml("<font color='#ff8500'>"+WolfCore.Name+"</font>:"+a),0).show();
		}catch(e){}
	});
}


new java.lang.Thread(function() {
	WolfCore.LoadModules("Loading");

	WolfCore.LoadModules('Types');
	WolfCore.LoadModules('var');
	WolfCore.LoadModules("Date");
	WolfCore.LoadModules("Log");
	
	WolfCore.LoadModules("File");
	try{
	WolfCore.LoadModules("UI");
	WolfCore.LoadModules("API");
	
	WolfCore.LoadModules("Dump");
	
	WolfCore.LoadModules("Mods");
	}catch(e){
		WolfCore.Log.Error(e);
	}
	LoadingWindow.dismiss();
	WolfCore.CallBack.invoke(WolfCore.Startup);
}).start();

