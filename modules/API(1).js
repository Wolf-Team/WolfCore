WolfCore.Log.Info("Инициализация API");
WolfCore.Log.Info("Инициализация CallBack")
WolfCore.CallBack={};
WolfCore.CallBack.callbacks={};

WolfCore.CallBack.add = function(name,func,num){
	if(num==null)
		num=-1;
		
	var list = WolfCore.CallBack.callbacks[name];
  if(!list) list = [];
  if(num==-1)
  list.push({call:func});
  else
  list[num]={call:func};
  
  WolfCore.CallBack.callbacks[name] = list;
	
	};

WolfCore.CallBack.invoke=function(name,a,b,c,d,e,f,g,h){
	var list = WolfCore.CallBack.callbacks[name];
	if(!list)return
	for(var i in list){
		list[i].call(a,b,c,d,f,g,h);
	//	WolfCore.CallBack.callbacks[name][i].call(a,b,c,d,e f,g,h);
	}
};

WolfCore.CallBack.add('NewLevel',function(worldName, worldDir){
	print('world\nName:'+worldName+'\nDir:'+worldDir);
});

function newLevel(){
	WolfCore.CallBack.invoke('NewLevel', Level.getWorldName(), Level.getWorldDir());
}

function modTick(){
	WolfCore.CallBack.invoke('ModTick',Player.getX(),Player.getY(),Player.getZ(),Level.getTime(),Level.getGameMode(),[
	Player.getCarriedItem(),
 Player.getCarriedItemCount(),
 Player.getCarriedItemData(),
	],Entity.getPitch(Player.getEntity()),Entity.getYaw(Player.getEntity()));
}

function useItem(x,y,z,i,b,s,id,bd){
	WolfCore.CallBack.invoke('UseItem',[x,y,z],[i,id],[b,s,bd])
}

WolfCore.Log.Info("Инициалищация завершена")
