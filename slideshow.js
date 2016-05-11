var progressOfSlides = {};
var progressOfBar = {};
var slidesWatched = [];

var slideshow = {
	load : function() {
		return $('.media-player__content-slide').map(function(){
			return $(this).data('slide');
		}).get();
	},
	controls : {
		next : function(args){
			var currentSlideId = $('.media-player__content-slide--current').data('slide');
			//Add the current slide to the slideswatched array
			if(slidesWatched.indexOf(currentSlideId) == -1){
				slidesWatched.push(currentSlideId);
			}
			var currentSlideProgressMarker = $('body').find('[data-progress='+currentSlideId+']');
			progressBar.update(currentSlideProgressMarker);
			if(currentSlideId < args.length){
				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
				currentSlideEl.addClass('media-player__content-slide--previous').removeClass('media-player__content-slide--current');
				// add the --watched class to slides that have been watched if they don't exist already
				if(!currentSlideEl.hasClass('media-player__content-slide--watched')){
					currentSlideEl.addClass('media-player__content-slide--watched');
				}
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
			if(!args.withAudio){
				// if no audio, then length per slide is going to be set as a constant
				$('.media-player__content-slide').each(function(index){
					var thisSlide = $(this);
					var currentSlide = setTimeout(function(){	
						slideshow.controls.next(args.slides);
					}, args.lengthPerSlide * (index+1));
					progressOfSlides[currentSlide] = 1;

				});
			}else{
				// if audio, then length per slide is going to depend on duration
				$('.media-player__content-slide').each(function(index){
					var thisSlide = $(this);
					var thisSlideDuration = args.lengthPerSlide[index];
					var currentSlide = setTimeout(function(){	
						slideshow.controls.next(args.slides);
					}, thisSlideDuration);
					progressOfSlides[currentSlide] = 1;

				});
				
			}
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
//	start : function(args){
//		$('.progress-bar__progress').each(function(index){
//			var thisProgress = $(this);
//			var currentProgress = setTimeout(function(){
//				thisProgress.css('border','1px solid #666');
//				thisProgress.css('background-color','#00ff00');
//			},args.lengthPerSlide * ( index+1));
//			progressOfBar[currentProgress] = 1;
//		});
//	},
//	pause : function(){
//		for (var currentProgress in progressOfBar) if (progressOfBar.hasOwnProperty(currentProgress)) {
//		    clearTimeout(currentProgress);
//		    delete progressOfBar[currentProgress];
//		  }
//	},
	update : function(args){
		args.css('background-color','#00ff00');
		// make ajax call to update user data with current progress
	}
}