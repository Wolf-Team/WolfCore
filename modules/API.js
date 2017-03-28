LoadingWindow.setStatus("Load API");
LoadingWindow.setStatus("Load CallBackAPI");

WolfCore.Log.Info("Инициализация API");
WolfCore.Log.Info("Инициализация CallBack")
WolfCore.CallBack={};
WolfCore.CallBack.callbacks={};

WolfCore.CallBack.add = function(name,func,num){
	if(num==null)
		num=-1;
	
	var list = WolfCore.CallBack.callbacks[name];
	
	if(!list) list = [];
	
	if(num==-1){
		var a = list.length+1;
		list.push({call:func});
	}else
		list[num]={call:func};
	
	WolfCore.CallBack.callbacks[name] = list;	
	if(num==-1)
		return a;
};

WolfCore.CallBack.invoke=function(name,a,b,c,d,e,f,g,h){
	var list = WolfCore.CallBack.callbacks[name];
	if(!list)return
	for(var i in list){
		list[i].call(a,b,c,d,f,g,h);
	//	WolfCore.CallBack.callbacks[name][i].call(a,b,c,d,e f,g,h);
	}
};

function newLevel(){
	WolfCore.CallBack.invoke(WolfCore.NewLevel, Level.getWorldName(), Level.getWorldDir());
}

function modTick(){
	WolfCore.CallBack.invoke(WolfCore.ModTick,{
		x:Player.getX(),
		y:Player.getY(),
		z:Player.getZ(),
		item:{
			id:Player.getCarriedItem(),
			data:Player.getCarriedItemData(),
			count:Player.getCarriedItemCount(),
		},
		pitch:Entity.getPitch(Player.getEntity()),
		yaw:Entity.getYaw(Player.getEntity()),
		gamemode:Level.getGameMode(),
	},Level.getTime());
}

function useItem(a,b,c,d,e,f,g,h){
	WolfCore.CallBack.invoke(WolfCore.Use,{
		x:a,
		y:b,
		z:c,
	},{
		id:d,
		data:g,
	},{
		id:e,
		side:f,
		data:h,
	});
}

function startDestroyBlock(x, y, z, side){
	WolfCore.vars.destroyBlock.id = getTile(x,y,z);
	WolfCore.vars.destroyBlock.data = Level.getData(x,y,z);
	
	WolfCore.CallBack.invoke(WolfCore.StartDestroy,x,y,z,WolfCore.vars.destroyBlock.id,WolfCore.vars.destroyBlock.data,side);
}
function continueDestroyBlock(x, y, z, side, progress){
	WolfCore.vars.destroyBlock.id = getTile(x,y,z);
	WolfCore.vars.destroyBlock.data = Level.getData(x,y,z);
	
	WolfCore.CallBack.invoke(WolfCore.ContinueDestroy,x,y,z,WolfCore.vars.destroyBlock.id,WolfCore.vars.destroyBlock.data,side, progress);

}

function destroyBlock(x, y, z, side){
	WolfCore.CallBack.invoke(WolfCore.Destroy,x,y,z,WolfCore.vars.destroyBlock.id,WolfCore.vars.destroyBlock.data,side);
}

function attackHook(a,b){
	WolfCore.CallBack.invoke(WolfCore.Attack,a,b);
}

function chatHook(str) {
	if (str.startsWith("/")) {
		var spl = str.slice(1).split(" ");
		WolfCore.CallBack.invoke(WolfCore.Command,spl);
	} else {
		WolfCore.CallBack.invoke(WolfCore.Chat,str)
	}
}

function screenChangeHook(screenName){
	WolfCore.vars.screen = screenName;
	WolfCore.CallBack.invoke(WolfCore.ScreenChange,WolfCore.vars.screen);
}

WolfCore.Add = {};
WolfCore.blocks = [];
WolfCore.items=[];
WolfCore.Add.Item=function(a, b, c, d){
	if(a==null){
		WolfCore.Log.Error("Предмет не был создан. Не задан ID");
		return
	}
	if(b==null){
		WolfCore.Log.Error("Предмет "+a+" не был создан. Не задано имя");
		return
	}
	if(c==null){
		WolfCore.Log.Warning("Предмету "+a+" не задана текстура")
			c = ["null", 0]
	}else{
		if(typeof(c[0]) != "string"||c[0]==null){
			WolfCore.Log.Warning("Предмету "+a+" не задано имя текстуры")
			c = ["null", 0]
		}else{
			if(typeof(c[1])!="number"||c[1]==null){
				c[1]=0;
			}
		}
	}
	if(d == null){
		d = 64;
	}
	WolfCore.items.push({
		id:a,
		name:b,
		texture:{
			name:c[0],
			data:c[1],
		},
		stack:d,
	})
};
WolfCore.Add.Block = function(a,b,c){
	if(a==null){
		WolfCore.Log.Error("Блок не был создан. Не задан ID");
		return
	}
	if(b==null){
		WolfCore.Log.Error("Блок "+a+" не был создан. Не задано имя");

		return
	}
	if(c==null){
		WolfCore.Log.Warning("Блоку "+a+" не задано имя текстуры")
		c=[["null",0]];
	}
	WolfCore.blocks.push({
		id:a,
		name:b,
		texture:c,
	});
}

WolfCore.Add.Items = function(b){
	var errors = 0;
	for(var c in b){
		var a = b[c];
		try{
			Item.defineItem(a.id, a.texture.name, a.texture.data, a.name, a.stack);
		}catch(e){
			errors++;
			Item.defineItem(a.id, "null",  0, a.name, a.stack);
			WolfCore.Log.Warning("Текстура не найдена");
		}
	}
	WolfCore.CallBack.add(WolfCore.AddItems, errors);
}
WolfCore.Add.Blocks = function(b){
	var errors = 0;
	for(var c in b){
		var a = b[c];
		try{
			Block.defineBlock(a.id, a.name, a.texture, 0, false, 0);
		}catch(e){
			errors++;
			Block.defineBlock(a.id, a.name, [['null',0]], 0, false, 0);
		}
	}
	WolfCore.CallBack.add(WolfCore.AddBlocks, errors);
}

WolfCore.CallBack.add(WolfCore.Startup, function(){
	WolfCore.Add.Items(WolfCore.items);
	WolfCore.Add.Blocks(WolfCore.blocks);
});

WolfCore.Log.Info("Инициализация завершена")