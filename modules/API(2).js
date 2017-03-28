WolfCore.CallBack = {};
WolfCore.CallBack.callbacks={
	"callback":{
		"name":function(){},
	},
};

WolfCore.CallBack.add = function(callback, name, func){
	if(WolfCore.CallBack.callbacks[callback]!=undefined){
		WolfCore.CallBack.callbacks[callback].puch({name:func});
	}else{
		WolfCore.CallBack.callbacks.push(callback:{name:func});
	}
};
WolfCore.CallBack.invoke=function(callback, a,b,c,d,e,f,g){
	for(var i in WolfCore.CallBack.callbacks[callback]){
		WolfCore.CallBack.callbacksp[callback][i](a,b,c,d,e,f,g);
	}
	
};


WolfCore.CallBack.add('NewLevel', 'test', function(a){
	print(a);
});

function newLevel(){
	WolfCore.CallBack.invoke('NewLevel', 'test');
}