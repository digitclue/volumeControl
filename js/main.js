require.config({
	paths: {
		'jquery': 'vendor/jquery-1.11.1.min',
		'hammer': 'vendor/hammer.min'
	}
});


require(['control', 'controlMouseHandler'], function(Control){
	jQuery('.controller').each(function(){
		window.zzz = new Control(this, {
			startValue: 0
		});
	});
});