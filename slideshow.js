var progressOfSlides = {};
var progressOfBar = {};
var slidesWatched = [];

var viewerConfigs = {
	'defaultClass' : 'media-player__content-slide',
	'activeClass' : 'media-player__content-slide--current',
	'previousClass' : 'media-player__content-slide--previous',
	'nextClass' : 'media-player__content-slide--next',
	'watchedClass' : 'media-player__content-slide--watched'
}

var slideshow = {
	load : function() {
		return $('.' + viewerConfigs.defaultClass).map(function(){
			return $(this).data('slide');
		}).get();
	},
	controls : {
		next : function(args){
			var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
			//Add the current slide to the slideswatched array
			if(slidesWatched.indexOf(currentSlideId) == -1){
				slidesWatched.push(currentSlideId);
			}
			var currentSlideProgressMarker = $('body').find('[data-progress='+currentSlideId+']');
			progressBar.update(currentSlideProgressMarker);
			if(currentSlideId < args.length){
				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
				currentSlideEl.addClass(viewerConfigs.previousClass).removeClass(viewerConfigs.activeClass);
				// add the --watched class to slides that have been watched if they don't exist already
				if(!currentSlideEl.hasClass(viewerConfigs.watchedClass)){
					currentSlideEl.addClass(viewerConfigs.watchedClass);
				}
				var nextSlideId = currentSlideId + 1 < args.length ? currentSlideId + 1 : args.length;
				var nextSlideEl = $('body').find('[data-slide='+nextSlideId+']');
				nextSlideEl.removeClass(viewerConfigs.nextClass).addClass(viewerConfigs.activeClass);
			}
		},
		prev : function(args){
			var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
			if(currentSlideId > 1){
				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
				currentSlideEl.addClass(viewerConfigs.nextClass).removeClass(viewerConfigs.activeClass);
				var prevSlideId = currentSlideId - 1 > 0 ? currentSlideId - 1 : 1;
				var prevSlideEl = $('body').find('[data-slide='+prevSlideId+']');
				prevSlideEl.removeClass(viewerConfigs.previousClass).addClass(viewerConfigs.activeClass);
			}
		},
		start : function(args){
			if(!args.withAudio){
				// if no audio, then length per slide is going to be set as a constant
				$('.'+viewerConfigs.defaultClass).each(function(index){
					var thisSlide = $(this);
					var currentSlide = setTimeout(function(){	
						slideshow.controls.next(args.slides);
					}, args.lengthPerSlide * (index+1));
					progressOfSlides[currentSlide] = 1;

				});
			}else{
				// if audio, then length per slide is going to depend on duration
				$('.' + viewerConfigs.defaultClass).each(function(index){
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