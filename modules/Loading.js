var LoadingWindow = new (function(){
	var popup;
	var text;
	WolfCore.UIrun(function(){
		var spritesheet = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/logo.png")); // создаём переменную, в которую складываем наш битмап
// теперь обрежем его:
var ExitBitmap = new android.graphics.Bitmap.createBitmap(spritesheet,0,0,400,400); // вот мы обрезали битмап. Первый аргумент - битмап, который обрезаем. 60 - x координата места, откуда начнётся обрезанный битмап, 0 - y координата места, откуда начнётся наш битмап. 18 - ширина обрезанного битмапа, 18 - высота обрезанного битмапа.
// теперь увеличим разрешение нашего битмапа:
var ScaledExitBitmap = android.graphics.Bitmap.createScaledBitmap(ExitBitmap,400,400,false); // 50 - ширина и высота битмапа
	
	var image = new android.widget.LinearLayout(WolfCore.ctx);
	image.setBackgroundDrawable(android.graphics.drawable.BitmapDrawable(ScaledExitBitmap));
	var lay = new android.widget.LinearLayout(WolfCore.ctx);
	lay.addView(image);
	text= new android.widget.TextView(WolfCore.ctx);
	text.setText("Loading...");
//	text.setTextColor()
	lay.addView(text);
	lay.setOrientation(1);
	popup = new android.widget.PopupWindow(lay, -1, -1);
	popup.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE));
	popup.showAtLocation(WolfCore.ctx.getWindow().getDecorView(),17,0,0);
	
	});
	
	this.setStatus=function(a){
		if(text!=null){
			WolfCore.UIrun(function(){
				text.setText(a);
			});}
	};
	this.dismiss=function(){
		WolfCore.UIrun(function(){
			if(popup){
				popup.dismiss();
				popup = null;
			}
		});
	}
	
})();