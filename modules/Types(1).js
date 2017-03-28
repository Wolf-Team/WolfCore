new java.lang.Thread(new java.lang.Runnable(){
	run:function(){
		while(true){
			WolfCore.ERROR = "type0";
			WolfCore.WARNING = "type1";
			WolfCore.MESSAGE = "type2";
			WolfCore.INFO = "type2";			
		}
	}
}).start();