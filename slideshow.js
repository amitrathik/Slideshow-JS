var progressOfSlides = {};
var progressOfBar = {};
var slideshow = {
	load : function() {
		return $('.media-player__content-slide').map(function(){
			return $(this).data('slide');
		}).get();
	},
	controls : {
		next : function(args){
			var currentSlideId = $('.media-player__content-slide--current').data('slide');
			if(currentSlideId < args.length){
				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
				currentSlideEl.addClass('media-player__content-slide--previous').removeClass('media-player__content-slide--current');
				var nextSlideId = currentSlideId + 1 < args.length ? currentSlideId + 1 : args.length;
				var nextSlideEl = $('body').find('[data-slide='+nextSlideId+']');
				nextSlideEl.removeClass('media-player__content-slide--next').addClass('media-player__content-slide--current');
				
			}
		},
		prev : function(args){
			var currentSlideId = $('.media-player__content-slide--current').data('slide');
			if(currentSlideId > 1){
				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
				currentSlideEl.addClass('media-player__content-slide--next').removeClass('media-player__content-slide--current');
				var prevSlideId = currentSlideId - 1 > 0 ? currentSlideId - 1 : 1;
				var prevSlideEl = $('body').find('[data-slide='+prevSlideId+']');
				prevSlideEl.removeClass('media-player__content-slide--previous').addClass('media-player__content-slide--current');
			}
		},
		start : function(args){
			$('.media-player__content-slide').each(function(index){
				var thisSlide = $(this);
				var currentSlide = setTimeout(function(){	
					slideshow.controls.next(args.slides);
				}, args.lengthPerSlide * (index+1));
				progressOfSlides[currentSlide] = 1;

			});
		},
		pause : function(){
			for (var currentSlide in progressOfSlides) if (progressOfSlides.hasOwnProperty(currentSlide)) {
			    clearTimeout(currentSlide);
			    delete progressOfSlides[currentSlide];
			  }
		}
	}
};

var audio = {
	controls : {
		start : function(args){
			var audioEl = $('body').find('audio').trigger('play');
		},
		pause : function(args){
			var audioEl = $('body').find('audio').trigger('pause');
		}
	}
};

var progressBar = {
	start : function(args){
		$('.progress-bar__progress').each(function(index){
			var thisProgress = $(this);
			var currentProgress = setTimeout(function(){
				thisProgress.css('border','1px solid #666');
				thisProgress.css('background-color','#00ff00');
			},args.lengthPerSlide * ( index+1));
			progressOfBar[currentProgress] = 1;
		});
	},
	pause : function(){
		for (var currentProgress in progressOfBar) if (progressOfBar.hasOwnProperty(currentProgress)) {
		    clearTimeout(currentProgress);
		    delete progressOfBar[currentProgress];
		  }
	},
	update : function(args){
		
	}
}