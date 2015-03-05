(function(){
	function ControlAlter(){
		console.log(this);
	}
	if (typeof define === 'function' && define.amd) {
		define(['control', 'hammer'], function(Control){
			
			console.log(Control.prototype);
		});
	}
}).call(this);