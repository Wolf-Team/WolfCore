new java.lang.Thread(new java.lang.Runnable(){
	run:function(){
		while(true){
			WolfCore.ERROR = "type0";
			WolfCore.WARNING = "type1";
			WolfCore.MESSAGE = "type2";
			WolfCore.INFO = "type2";

			WolfCore.Startup = "type3";
			WolfCore.Chat = "type4";
			WolfCore.Command = "type5";
			WolfCore.Attack = "type6";
			WolfCore.Destroy = "type7";
			WolfCore.ContinueDestroy = "type8";
			WolfCore.StartDestroy = "type9";
			WolfCore.Use = "type10";
			WolfCore.ModTick = "type11";
			WolfCore.NewLevel = "type12";
			WolfCore.AddItems = "type13";
			WolfCore.AddBlocks = "type14";
		}
	}
}).start();