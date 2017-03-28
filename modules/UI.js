LoadingWindow.setStatus("Load UIAPI")
WolfCore.Log.Info("Инициализация UIAPI");

WolfCore.UI = {};
WolfCore.UI.ctx = WolfCore.ctx;
WolfCore.UI.context = WolfCore.ctx;


WolfCore.Display = new (function() {
	var metrics = WolfCore.UI.ctx.getResources().getDisplayMetrics();
	
	this.width = metrics.widthPixels > metrics.heightPixels ? metrics.widthPixels : metrics.heightPixels, 
	this.height = metrics.heightPixels < metrics.widthPixels ? metrics.heightPixels : metrics.widthPixels, 
	this.dpi = metrics.density
})();

WolfCore.UI.dp2pixel=function(dp) {
	return dp * WolfCore.Display.dpi;
};

WolfCore.UI.get9Patch = function(path, widthDp, heightDp, widthPadding, heightPadding){
	var bytes = ModPE.getBytesFromTexturePack(path);
	if (bytes == null)
		return false;
	var bitmap =  android.graphics.BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
	var scaledBitmap = android.graphics.Bitmap.createScaledBitmap(bitmap, Math.round(WolfCore.UI.dp2pixel(widthDp)), Math.round(WolfCore.UI.dp2pixel(heightDp)), false); // scale image to a bigger size and based on density
	var NO_COLOR = 0x00000001;
	var buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());
	buffer.put(0x01); //was translated
	for (var i = 1;i <= 2;i++) buffer.put(0x02); //divx & divy size
	buffer.put(0x09); //color size
	for (var i = 1;i <= 7;i++) buffer.putInt(0); //skip + padding + skip 4 bytes
	buffer.putInt(WolfCore.UI.dp2pixel(widthPadding));
	buffer.putInt(WolfCore.UI.dp2pixel(widthDp - widthPadding));
	buffer.putInt(WolfCore.UI.dp2pixel(heightPadding));
	buffer.putInt(WolfCore.UI.dp2pixel(heightDp - heightPadding));
	for (var i = 1;i <= 9;i++) buffer.putInt(NO_COLOR);

	return new android.graphics.drawable.NinePatchDrawable(WolfCore.ctx.getResources(), scaledBitmap, buffer.array(), new android.graphics.Rect(), ""); // convert to NinePatch
}
WolfCore.UI.get=function(path){
	var bytes = ModPE.getBytesFromTexturePack(path);
		if (bytes == null)
			return false;
		return bytes;
};


WolfCore.UI.Color = {};

WolfCore.UI.Color.default = {
	text:'#FFDDDDDD',
	background:new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT),
};
WolfCore.UI.Color.dark = new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(127, 0, 0, 0));

WolfCore.UI.Resource = {};
WolfCore.UI.Resource.button_normal = WolfCore.UI.get9Patch("gui/button/normal.png", 16, 16, 4, 4);
WolfCore.UI.Resource.button_pressed = WolfCore.UI.get9Patch("gui/button/pressed.png", 16, 16, 4, 4);
WolfCore.UI.Resource.window = WolfCore.UI.get9Patch("gui/window.png", 32, 32, 8, 8);
WolfCore.UI.Resource.panel = WolfCore.UI.get9Patch("gui/panel.png", 28, 28, 6, 6);

WolfCore.FileAPI.writeBytes(new java.io.File(WolfCore.Path.tmp, "font.ttf"), WolfCore.UI.get("font.ttf"));
WolfCore.UI.Resource.font = android.graphics.Typeface.createFromFile(new java.io.File(WolfCore.Path.tmp, "font.ttf"));
new java.io.File(WolfCore.Path.tmp, "font.ttf")["delete"]();

WolfCore.FileAPI.writeBytes(new java.io.File(WolfCore.Path.tmp, "null.png"), WolfCore.UI.get("logo.png"));
WolfCore.UI.Resource.nullLogo =  android.graphics.BitmapFactory.decodeFile(new java.io.File(WolfCore.Path.tmp, "null.png"));
new java.io.File(WolfCore.Path.tmp, "null.png")["delete"]();

WolfCore.UI.Top = 48;
WolfCore.UI.Left = 3;
WolfCore.UI.Bottom = 80;
WolfCore.UI.Right =  5;
WolfCore.UI.Center = 17;
WolfCore.UI.TopLeft = 51;
WolfCore.UI.TopRight = 53;
WolfCore.UI.BottomLeft = 83;
WolfCore.UI.BottomRight = 85;

WolfCore.UI.stylizeText=function(textView){
	textView.setTextSize(16);
	textView.setAllCaps(false);
	textView.setTextColor(android.graphics.Color.parseColor(WolfCore.UI.Color.default.text));

	textView.setTypeface(WolfCore.UI.Resource.font);
	textView.setPaintFlags(textView.getPaintFlags() | android.graphics.Paint.SUBPIXEL_TEXT_FLAG);
	textView.setLineSpacing(4 * WolfCore.Display.dpi, 1);
	var something = Math.round((textView.getLineHeight() - (4 * WolfCore.Display.dpi)) / 8);
	textView.setShadowLayer(1, something, something, android.graphics.Color.parseColor("#FF393939"));
};

WolfCore.UI.run = function(a){
	WolfCore.UI.context.runOnUiThread(new java.lang.Runnable({run: function(){
		try{
			a();
		}catch(e){
			WolfCore.Log.Error(e);
		}
	}}));
}

WolfCore.UI.Button = function(text){
	if(text == null){
		text = "WolfCore.Button";
	}
	
	var button = new android.widget.Button(WolfCore.UI.ctx);
	button.setTextSize(16);
	button.setText(text);
	
	button.setOnTouchListener(
		new android.view.View.OnTouchListener(
			function(v, motionEvent) {
				if (button.isClickable())
					WolfCore.UI.Utils.onTouch(v, motionEvent);
				return false;
			}
		)
	);
	button.setBackground(WolfCore.UI.Resource.button_normal.getConstantState().newDrawable());
	button.setPadding(8 * WolfCore.Display.dpi, 8 * WolfCore.Display.dpi, 8 * WolfCore.Display.dpi, 8 * WolfCore.Display.dpi);
	WolfCore.UI.stylizeText(button);
	
	WolfCore.Log.Info("Create button "+text);
	return button;
}
WolfCore.UI.Text = function(text){
	var textView = new android.widget.TextView(WolfCore.UI.context);
	textView.setText(text);
	WolfCore.UI.stylizeText(textView);
	
	WolfCore.Log.Info("Create text "+text);
	return textView;
};
WolfCore.UI.Panel = function(x,y,w,h,titleText, isCenter, outsideTouchable, pad){
	if(isCenter==null){
		isCenter = true;
	}
	if(outsideTouchable==null){
		outsideTouchable = true;
	}
	if(titleText==null){
		titleText = "Panel";
	}
	if(pad==null){
		pad=10;
	}
	var scroll = new android.widget.ScrollView(WolfCore.UI.ctx);
	scroll.setBackgroundDrawable(WolfCore.UI.Resource.panel);
	
	var layout = new android.widget.LinearLayout(WolfCore.UI.ctx);
	layout.setPadding(WolfCore.UI.dp2pixel(pad),WolfCore.UI.dp2pixel(pad),WolfCore.UI.dp2pixel(pad),WolfCore.UI.dp2pixel(pad));
	layout.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(-1,-1));
	scroll.addView(layout);
	var window = new android.widget.PopupWindow(scroll, w, h);
	var title = new WolfCore.UI.Text(titleText);
	title.setVisibility(android.view.View.GONE);
	var darkWindow;
	var dwl = new android.widget.LinearLayout(WolfCore.UI.ctx);
	if(!outsideTouchable){
		darkWindow = new android.widget.PopupWindow(dwl, -1, -1);
		darkWindow.setBackgroundDrawable(WolfCore.UI.Color.dark);
	}
	
	WolfCore.UI.run(function(){
		if(!outsideTouchable)
			darkWindow.showAtLocation(WolfCore.UI.ctx.getWindow().getDecorView(), WolfCore.UI.Center, 0, 0);
		
		window.showAtLocation(WolfCore.UI.ctx.getWindow().getDecorView(), isCenter ? WolfCore.UI.Center : WolfCore.UI.TopLeft, x, y);
	});
	
	
	var controls = {
		dismiss:function(){
			WolfCore.UI.run(function(){
				if(window){
					window.dismiss();
					window = null;
				}
			});
		},
		addView:function(view){
			WolfCore.UI.run(function(){
				layout.addView(view);
			});
		},
		setTitle:function(text){
			WolfCore.UI.run(function(){
				if(title.getVisibility()!=android.view.View.VISIBLE){
				title.setVisibility(android.view.View.VISIBLE);
			}
			title.setText(text);
			});
		},
		hideTitle:function(){
			WolfCore.UI.run(function(){
				title.setVisibility(android.view.View.GONE);
			});
		}
	};
	WolfCore.Log.Info("Create panel "+titleText);
	return controls;
};
WolfCore.UI.PanelWithoutScroll = function(x,y,w,h,titleText, isCenter, outsideTouchable, pad){
	if(isCenter==null){
		isCenter = true;
	}
	if(outsideTouchable==null){
		outsideTouchable = true;
	}
	if(titleText==null){
		titleText = "Panel";
	}
	if(pad==null){
		pad=10;
	}
	var layout = new android.widget.LinearLayout(WolfCore.UI.ctx);
	layout.setBackgroundDrawable(WolfCore.UI.Resource.panel);
	layout.setPadding(WolfCore.UI.dp2pixel(pad),WolfCore.UI.dp2pixel(pad),WolfCore.UI.dp2pixel(pad),WolfCore.UI.dp2pixel(pad));
	layout.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(-1,-1));
	var window = new android.widget.PopupWindow(layout, w, h);
	var title = new WolfCore.UI.Text(titleText);
	title.setVisibility(android.view.View.GONE);
	var darkWindow;
	var dwl = new android.widget.LinearLayout(WolfCore.UI.ctx);
	if(!outsideTouchable){
		darkWindow = new android.widget.PopupWindow(dwl, -1, -1);
		darkWindow.setBackgroundDrawable(WolfCore.UI.Color.dark);
	}
	
	WolfCore.UI.run(function(){
		if(!outsideTouchable)
			darkWindow.showAtLocation(WolfCore.UI.ctx.getWindow().getDecorView(), WolfCore.UI.Center, 0, 0);
		
		window.showAtLocation(WolfCore.UI.ctx.getWindow().getDecorView(), isCenter ? WolfCore.UI.Center : WolfCore.UI.TopLeft, x, y);
	});
	
	
	var controls = {
		dismiss:function(){
			WolfCore.UI.run(function(){
				if(window){
					window.dismiss();
					window = null;
				}
			});
		},
		addView:function(view){
			WolfCore.UI.run(function(){
				layout.addView(view);
			});
		},
		setTitle:function(text){
			WolfCore.UI.run(function(){
				if(title.getVisibility()!=android.view.View.VISIBLE){
				title.setVisibility(android.view.View.VISIBLE);
			}
			title.setText(text);
			});
		},
		hideTitle:function(){
			WolfCore.UI.run(function(){
				title.setVisibility(android.view.View.GONE);
			});
		}
	};
	WolfCore.Log.Info("Create panel "+titleText);
	return controls;
};

WolfCore.UI.Popup=function(view, gravity){
	var window = new android.widget.PopupWindow(view, -2,-2);
	WolfCore.UI.run(function(){
		window.showAtLocation(WolfCore.UI.ctx.getWindow().getDecorView(), gravity, 2, 2);
	});
	
	var controls = {
		dismiss:function(){
			WolfCore.UI.run(function(){
				if(window){
					window.dismiss();
					window = null;
				}
			});
		},
	};
	return controls;
}

WolfCore.UI.Utils = {
	onTouch: function(v, motionEvent) {
		var textColor = "#FFDDDDDD";

		var action = motionEvent.getActionMasked();

		if (action == android.view.MotionEvent.ACTION_DOWN) //button pressed
			WolfCore.UI.Utils.changeToPressedState(v);

		if (action == android.view.MotionEvent.ACTION_CANCEL || action == android.view.MotionEvent.ACTION_UP) //button released
			WolfCore.UI.Utils.changeToNormalState(v, textColor);

		if (action == android.view.MotionEvent.ACTION_MOVE) {
			var rect = new android.graphics.Rect(v.getLeft(), v.getTop(), v.getRight(), v.getBottom());
			if (rect.contains(v.getLeft() + motionEvent.getX(), v.getTop() + motionEvent.getY())) {
				// pointer inside the view
				if (v.getTag() == false) {
					// restore pressed state
					v.setTag(true); // is pressed?

					WolfCore.UI.Utils.changeToPressedState(v);
				}
			} else {
				// pointer outside the view
				if (v.getTag() == true) {
					// restore pressed state
					v.setTag(false); // is pressed?

					WolfCore.UI.Utils.changeToNormalState(v, textColor);
				}
			}
		}
	},
	changeToNormalState: function(button, textColor) {
		button.setBackground(WolfCore.UI.Resource.button_normal);
		button.setTextColor(android.graphics.Color.parseColor(textColor));
		var something = Math.round((button.getLineHeight() - (4 * WolfCore.Display.dpi)) / 8);
		button.setShadowLayer(1, something, something, android.graphics.Color.parseColor("#FF393939"));
	}, 
	changeToPressedState: function(button) {
		button.setBackground(WolfCore.UI.Resource.button_pressed);
		button.setTextColor(android.graphics.Color.parseColor("#FFFFFF9C"));
		var something = Math.round((button.getLineHeight() - (4 * WolfCore.Display.dpi)) / 8);
		button.setShadowLayer(1, something, something, android.graphics.Color.parseColor("#FF3E3E28"));
	}
};
WolfCore.Log.Info("Инициализация UIAPI завершена");