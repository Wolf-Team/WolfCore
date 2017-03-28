WolfCore.Date = {};
WolfCore.Date.time = new java.lang.String.valueOf(android.text.format.DateFormat.format("yyyy-MM-dd_HH.mm.ss", new java.util.Date()));
WolfCore.Date.Day = android.text.format.Time.MONTH_DAY;
WolfCore.Date.Month = android.text.format.Time.MONTH;
WolfCore.Date.Year = android.text.format.Time.YEAR;
WolfCore.Date.Hour = android.text.format.Time.HOUR;
WolfCore.Date.Minute = android.text.format.Time.MINUTE;
WolfCore.Date.Second = android.text.format.Time.SECOND;
new java.lang.Thread(new java.lang.Runnable(){
	run:function(){
		while(true){
			WolfCore.Date.time = new java.lang.String.valueOf(android.text.format.DateFormat.format("yyyy-MM-dd_HH.mm.ss", new java.util.Date()));
		}
	}
}).start();