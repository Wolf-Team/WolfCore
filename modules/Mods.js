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

WolfCore.Mods.UI = {};
WolfCore.Mods.UI.mb = null;
WolfCore.Mods.UI.l = null;

WolfCore.Mods.UI.MainButton = function(){
	var but = WolfCore.UI.Button(WolfCore.Abbr);
	but.setOnClickListener(new android.view.View.OnClickListener({
		onClick: function(viewarg){
			WolfCore.Mods.UI.mb.dismiss();
			WolfCore.Mods.UI.List(WolfCore.Mods.mods);
		}
	}));
	WolfCore.Mods.UI.mb = WolfCore.UI.Popup(but, WolfCore.UI.Top|WolfCore.UI.Left);
}

WolfCore.Mods.UI.disAll = function(){
	try{WolfCore.Mods.UI.mb.dismiss();}catch(e){}
	try{WolfCore.Mods.UI.l.dismiss();}catch(e){}
}

WolfCore.Mods.UI.List = function(a){
	try{
		WolfCore.Mods.UI.l = WolfCore.UI.PanelWithoutScroll(0,0,WolfCore.Display.width-20,WolfCore.Display.height-20);

		/*
		*RIGHT PAGE
		*/
		var rmain = new android.widget.LinearLayout(WolfCore.UI.ctx);
		rmain.setPadding(WolfCore.UI.dp2pixel(10),WolfCore.UI.dp2pixel(10),WolfCore.UI.dp2pixel(10),WolfCore.UI.dp2pixel(10));
		rmain.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1,-1));
		rmain.setVisibility(android.view.View.GONE);
		var rlay = new android.widget.LinearLayout(WolfCore.UI.ctx);
		rlay.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1,-1));
		rlay.setOrientation(1);
		rlay.setGravity(android.view.Gravity.CENTER|android.view.Gravity.TOP);
		var rlaytitle = new android.widget.LinearLayout(WolfCore.UI.ctx);
		rlaytitle.setGravity(android.view.Gravity.CENTER);
		rlaytitle.setPadding(WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5));
		var rlayv = new android.widget.LinearLayout(WolfCore.UI.ctx);
		rlayv.setPadding(WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5));
		rlayv.setGravity(android.view.Gravity.CENTER);
		var rlayd = new android.widget.LinearLayout(WolfCore.UI.ctx);
		rlayd.setPadding(WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5),WolfCore.UI.dp2pixel(5));
		rlayd.setGravity(android.view.Gravity.CENTER);
		var NA = WolfCore.UI.Text("Name and Author");
		NA.setTextSize(24);
		var version = WolfCore.UI.Text("Version");
		var desc = WolfCore.UI.Text("Descript DescriptDescriptDescriptDescriptDescriptDescriptDescriptDescriptDescriptDescript");
		desc.setTextSize(14);
		rlaytitle.addView(NA);
		rlay.addView(rlaytitle);
		rlayv.addView(version);
		rlay.addView(rlayv);
		rlayd.addView(desc);
		rlay.addView(rlayd);
		rmain.addView(rlay);
		
		/*
		*LEFT PAGE
		*/
		var lmain = new android.widget.LinearLayout(WolfCore.UI.ctx);
		lmain.setOrientation(1);
		
		var exit = WolfCore.UI.Button("Exit");
		exit.setOnClickListener(new android.view.View.OnClickListener({
			onClick: function(viewarg){
				WolfCore.Mods.UI.l.dismiss();
				WolfCore.Mods.UI.MainButton();
			}
		}));
		var lllay = new android.widget.LinearLayout(WolfCore.UI.ctx);
		lllay.setPadding(0,WolfCore.UI.dp2pixel(10),0,0);
		var lscroll = new android.widget.ScrollView(WolfCore.UI.ctx);
		var llay = new android.widget.LinearLayout(WolfCore.UI.ctx);
		llay.setOrientation(1);
		lscroll.addView(llay);
		
		a.forEach(function(b,c){
			var but = WolfCore.UI.Button(b.name);
			but.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					rmain.setVisibility(android.view.View.VISIBLE);
					
					NA.setText(b.name+" by "+b.author);
					version.setText("v."+b.version);
					desc.setText(b.description);

				}
			}));
			llay.addView(but);
		});
		
		lmain.addView(exit);
		lllay.addView(lscroll)
		lmain.addView(lllay);

		WolfCore.Mods.UI.l.addView(lmain);
		WolfCore.Mods.UI.l.addView(rmain);
		
	}catch(e){
		WolfCore.Log.Error(e);
		WolfCore.Mods.UI.MainButton();
		WolfCore.Mods.UI.l.dismiss();
	}
}


WolfCore.CallBack.add(WolfCore.Startup, function(){
	WolfCore.Mods.UI.MainButton();
});
WolfCore.CallBack.add(WolfCore.ScreenChange, function(a){
	switch(a){
		case "start_screen":
		WolfCore.Mods.UI.MainButton();
		break;
		default:
			WolfCore.Mods.UI.disAll();
		break;
	}
});


WolfCore.Mods.Load();