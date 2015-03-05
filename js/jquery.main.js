// page init
jQuery(function(){
	jQuery('.controller').each(function(){
		window.zzz = new Control(this, {
			startValue: 0
		});
	});
});


;(function($){
	var min = Math.min,
		max = Math.max;

	function valueToAngle(value){
		return value * 360;
	}

	function setAngle(control, value){
		control.$holder.css({
			'transform': 'rotate(' + (valueToAngle(value) + control.options.incline) + 'deg)'
		});
	}

	window.Control = function(holder, options){
		this.options = $.extend({
			startValue: 0,
			incline: 0
		}, options);
		this.$holder = $(holder);

		if (this.$holder.length){
			this.setValue(this.options.startValue || 0);
		}
	};

	Control.prototype = {
		getValue: function(){
			return this.value;
		},
		setValue: function(value){
			this.value = max(0, min(value, 1));
			setAngle(this, this.value);
		}
	};
})(jQuery);

;(function($){
	window.VolumeControl = function(holder, options){
		this.options = $.extend({
			startAngle: 0,
			incline: 90
		}, options);
		this.$holder = $(holder);

		if (this.$holder.length){
			this.init();
		}
	};

	function getValue(opt){
		var x = opt.mx - opt.c.x;
		var y = opt.c.y - opt.my;
		var angle = Math.atan2(x, y);
		var value;

		if (angle < 0){
			value = (2 * Math.PI + angle) / (2 * Math.PI);
		} else {
			value = angle / (2 * Math.PI);
		}

		console.log('x:', x, 'y:', y, 'value:', value);

		return value;
	}

	function getAngle(value){
		var angle;

		angle = value * 360;

		console.log('angle:', parseInt(angle) + 'deg');
		return angle;
	}

	VolumeControl.prototype = {
		init: function(){
			// set initial
			this.setAngle(this.options.startAngle || 0);
			this.getOffsets();
			this.attachEvents();
		},
		attachEvents: function(){
			var self = this;

			this.moveHandler = function(e){
				var value = getValue({
					mx: e.clientX,
					my: e.clientY,
					c: self.center
				});
				var angle = getAngle(value);

				self.setAngle(angle);

				
			};

			this.$holder.on({
				mousedown: function(e){
					var direction, start, end;

					// if (angle > self.angle){
					// 	direction = 1;
					// 	start = self.angle;
					// 	end = angle;
					// } else {
					// 	direction = -1;
					// 	start = angle;
					// 	end = self.angle;
					// }

					// self.$holder.css({
					// 	'transform': 'rotate(' + angle + 'deg)'
					// });
					// for (var i = start; i < end; i += direction){
					// }

					// self.angle = angle;

					self.$holder.on('mousemove', self.moveHandler);
				},
				mouseup: function(){
					self.$holder.off('mousemove', self.moveHandler);
				}
			});
		},
		setAngle: function(angle){
			this.$holder.css({
				'transform': 'rotate(' + angle + 'deg)'
			});

			this.angle = angle;
		},
		getOffsets: function(){
			var holder = this.$holder,
				hOffset = holder.offset();

			this.width = holder.outerWidth();
			this.height = holder.outerHeight();

			this.center = {
				x: hOffset.left + this.width / 2,
				y: hOffset.top + this.height / 2
			};
		}
	};
})(jQuery);