(function(){
	var min = Math.min,
		max = Math.max;

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], function($){
			return Control;
		});
	}

	function valueToAngle(value){
		return value * 360;
	}

	function setAngle(control, value){
		control.$holder.css({
			'transform': 'rotate(' + (valueToAngle(value) + control.options.incline) + 'deg)'
		});
	}

	function Control(holder, options){
		this.options = $.extend({
			startValue: 0,
			incline: 0
		}, options);
		this.$holder = $(holder);

		if (this.$holder.length){
			this.setValue(this.options.startValue || 0);
		}
	}

	Control.prototype = {
		getValue: function(){
			return this.value;
		},
		setValue: function(value){
			this.value = max(0, min(value, 1));
			setAngle(this, this.value);
		}
	};
}).call(this);