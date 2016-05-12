//Step 1) Media Type
//
//if slideshow
//
//Step 2) Has Audio Track? (only slideshow)
//
//if yes, show audio track upload
//if no, show autoplay selection (yes/no), show click through length (seconds)
//
//Step 3) Autoplay (only non-audio)
//
//if yes, show configuration for slide duration (seconds)
//if no, do nothing
//
//Step 4) Click through Length (only non-audio)
//
//default value = 0 (seconds)
//
//Step 5) Slide Repeater
//
//show, image, title
//if is audio, show timestamp for when the slide shows (seconds)

$(function(){	
	// grab all the slides into an array
	var slides = slideshow.load();
	//progress bar will show for Autoplay, Audio Track (and of ourse vidoes)
	if(configs.withAudio || configs.autoplay){
		// if we have audio, autoplay settings should be ignored
		if(configs.withAudio){
			var duration =[];
			$('.' + viewerConfigs.defaultClass).each(function(index){
				duration.push($(this).attr('data-timestamp')*1000);
			});
			
			$('body').on('click','.js-Next',{},function(){
				slideshow.controls.pause();
				// find the slide with the current class on it, get it's id
				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
				var nextSlideId;
				if(currentSlideId + 1 > slides.length){
					nextSlideId = slides.length;
				}else{
					nextSlideId = currentSlideId + 1;
				}
				// get the next slide id
				var nextEl = $('body').find('[data-slide='+nextSlideId+']');
				// we want to get the time stamp of that slide
				if(nextSlideId > slides.length){
					var currentTimeStamp = slides.length;
				}else{
					var currentTimeStamp = nextEl.attr('data-timestamp');
				}
				$('audio')[0].currentTime = currentTimeStamp;
				var loadNextSlide = setTimeout(slideshow.controls.next(slides),3000);
				clearTimeout(loadNextSlide);
				// set the time of video to the timestamp of the current slide
				slideshow.controls.start({
					withAudio : true,
					slides : slides,
					lengthPerSlide : duration
				});
			}).on('click','.js-Prev',{},function(){
				slideshow.controls.pause();
				// find the slide with the current class on it, get it's id
				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
				var prevSlideId;
				if(currentSlideId < 1){
					prevSlideId = currentSlideId;
				}else{
					prevSlideId = currentSlideId - 1;
				}
				// get the previous slide id
				var prevEl = $('body').find('[data-slide='+prevSlideId+']');
				// we want to get the time stamp of that slide
				if(currentSlideId == 1){
					var currentTimeStamp = 0
				}else{
					var currentTimeStamp = prevEl.attr('data-timestamp');
				}
				$('audio')[0].currentTime = currentTimeStamp;
				var loadPreviousSlide = setTimeout(slideshow.controls.prev(slides),3000);
				clearTimeout(loadPreviousSlide);
				// set the time of video to the timestamp of the current slide
				slideshow.controls.start({
					withAudio : true,
					slides : slides,
					lengthPerSlide : duration
				});
			}).on('click','.js-Pause',{},function(){
				// find the slide with the current class on it, get it's id
				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
				// we want to get the time stamp of that slide
				if(currentSlideId == 1){
					var currentTimeStamp = 0
				}else{
					var currentTimeStamp = currentSlideEl.attr('data-timestamp');
				}
				// pause the audio
				audio.controls.pause();
				// set the time of video to the timestamp of the current slide
				$('audio')[0].currentTime = currentTimeStamp;
				// pause the slideshow
				slideshow.controls.pause();
			}).on('click','.js-Play',{},function(){
				audio.controls.start();
				slideshow.controls.start({
					withAudio : true,
					slides : slides,
					lengthPerSlide : duration
				});
			});
		}else{
			var clickThroughWaitTime = configs.clickThroughWaitTime * 1000;
			var lengthPerSlide = configs.lengthPerSlide * 1000;

			// if we have autoplay
			// we should get the lenght per slide
			if(configs.autoplay){
				// Start the slideshow and progress bar
				slideshow.controls.start({
					slides : slides,
					lengthPerSlide : lengthPerSlide
				});
				$('body').on('click','.js-Next',{},function(){
					var clickThroughWaitTime = configs.clickThroughWaitTime * 1000;
					var lengthPerSlide = configs.lengthPerSlide * 1000;
					var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
					var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
					var nextSlideId;
					if(currentSlideId + 1 > slides.length){
						nextSlideId = slides.length;
					}else{
						nextSlideId = currentSlideId + 1;
					}
					// get the next slide id
					var nextEl = $('body').find('[data-slide='+nextSlideId+']');
					if(nextEl.hasClass(viewerConfigs.watchedClass)){
						slideshow.controls.pause();
						var loadNextSlide = setTimeout(slideshow.controls.next(slides));
						clearTimeout(loadNextSlide);
						
						slideshow.controls.start({
							slides : slides,
							lengthPerSlide : lengthPerSlide
						});
					}
				}).on('click','.js-Prev',{},function(){
					// pause everything
					slideshow.controls.pause();
					var loadPreviousSlide = setTimeout(slideshow.controls.prev(slides));
					clearTimeout(loadPreviousSlide);
					// resume everything
					slideshow.controls.start({
						slides : slides,
						lengthPerSlide : lengthPerSlide
					});
				}).on('click','.js-Pause',{},function(){
					slideshow.controls.pause();
				}).on('click','.js-Play',{},function(){
					slideshow.controls.start({
						slides : slides,
						lengthPerSlide : lengthPerSlide
					});
				});
			}
			// regardless we should have a click through wait time per slide
		}
		
	}else{
		// load basic slideshow control events
		$('body').on('click','.js-Next',{},function(){
			var loadNextSlide = setTimeout(slideshow.controls.next(slides),3000);
			clearTimeout(loadNextSlide);
		}).on('click','.js-Prev',{},function(){
			var loadPreviousSlide = setTimeout(slideshow.controls.prev(slides),3000);
			clearTimeout(loadPreviousSlide);
		});
	}
});
	
	
//	if(!configs.withAudio){
//		/*
//		 * slide show without audio
//		 */
//		if(!configs.autoplay){
//			// slideshow without audio and  with autoplay off
//			// has no progress bar
//			// has no click through wait time
//			// has no length per slide
//			// load slides and controls (next and forward)	
//			$('body').on('click','.js-Next',{},function(){
//				setTimeout(slideshow.controls.next(slides),3000);
//			}).on('click','.js-Prev',{},function(){
//				setTimeout(slideshow.controls.prev(slides),3000);
//			});
//
//		}else{
//			// slideshow without audio and with autoplay on
//			// has progress bar
//			// has click through wait time
//			// has length per slide
//			// convert the config time to seconds
//			var clickThroughWaitTime = configs.clickThroughWaitTime * 1000;
//			var lengthPerSlide = configs.lengthPerSlide * 1000;
//			var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
//			var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
//			setTimeout(function(){
//				$('body').on('click','.js-Next',{},function(){
//					slideshow.controls.pause();
//					// we want to make sure they have already viewed the next slide, else they have to wait
//					if(slidesWatched.indexOf(currentSlideEl) != -1){
//						setTimeout(slideshow.controls.next(slides));
//					}else{
//						slideshow.controls.start({
//							slides : slides,
//							lengthPerSlide : lengthPerSlide
//						});
//					}
//				}).on('click','.js-Prev',{},function(){
//					// pause everything
//					slideshow.controls.pause();
//					setTimeout(slideshow.controls.prev(slides));
//					// resume everything
//					slideshow.controls.start({
//						slides : slides,
//						lengthPerSlide : lengthPerSlide
//					});
//				}).on('click','.js-Pause',{},function(){
//					slideshow.controls.pause();
//				}).on('click','.js-Play',{},function(){
//					slideshow.controls.start({
//						slides : slides,
//						lengthPerSlide : lengthPerSlide
//					});
//				});
//			},clickThroughWaitTime);
//			
//			// Start the slideshow and progress bar
//			slideshow.controls.start({
//				slides : slides,
//				lengthPerSlide : lengthPerSlide
//			});
//			
//		}
//	}else{ 
//		/*
//		 * slide show with audio
//		 */
//		if(!configs.autoplay){
//			// slideshow with audio and with autoplay off
//			// has progress bar
//			// no click through wait time
//			// has no length per slide
//			// length per slide will depend on the timestamp
//			var duration =[];
//			$('.' + viewerConfigs.defaultClass).each(function(index){
//				duration.push($(this).attr('data-timestamp')*1000);
//			});
//			
//			$('body').on('click','.js-Next',{},function(){
//				slideshow.controls.pause();
//				// find the slide with the current class on it, get it's id
//				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
//				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
//				var nextSlideId;
//				if(currentSlideId + 1 > slides.length){
//					nextSlideId = slides.length;
//				}else{
//					nextSlideId = currentSlideId + 1;
//				}
//				// get the next slide id
//				var nextEl = $('body').find('[data-slide='+nextSlideId+']');
//				// we want to get the time stamp of that slide
//				if(nextSlideId > slides.length){
//					var currentTimeStamp = slides.length;
//				}else{
//					var currentTimeStamp = nextEl.attr('data-timestamp');
//				}
//				$('audio')[0].currentTime = currentTimeStamp;
//				setTimeout(slideshow.controls.next(slides),3000);
//				// set the time of video to the timestamp of the current slide
//				slideshow.controls.start({
//					withAudio : true,
//					slides : slides,
//					lengthPerSlide : duration
//				});
//			}).on('click','.js-Prev',{},function(){
//				slideshow.controls.pause();
//				// find the slide with the current class on it, get it's id
//				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
//				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
//				var prevSlideId;
//				if(currentSlideId < 1){
//					prevSlideId = currentSlideId;
//				}else{
//					prevSlideId = currentSlideId - 1;
//				}
//				// get the previous slide id
//				var prevEl = $('body').find('[data-slide='+prevSlideId+']');
//				// we want to get the time stamp of that slide
//				if(currentSlideId == 1){
//					var currentTimeStamp = 0
//				}else{
//					var currentTimeStamp = prevEl.attr('data-timestamp');
//				}
//				$('audio')[0].currentTime = currentTimeStamp;
//				setTimeout(slideshow.controls.prev(slides),3000);
//				// set the time of video to the timestamp of the current slide
//				slideshow.controls.start({
//					withAudio : true,
//					slides : slides,
//					lengthPerSlide : duration
//				});
//			}).on('click','.js-Pause',{},function(){
//				// find the slide with the current class on it, get it's id
//				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
//				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
//				// we want to get the time stamp of that slide
//				if(currentSlideId == 1){
//					var currentTimeStamp = 0
//				}else{
//					var currentTimeStamp = currentSlideEl.attr('data-timestamp');
//				}
//				// pause the audio
//				audio.controls.pause();
//				// set the time of video to the timestamp of the current slide
//				$('audio')[0].currentTime = currentTimeStamp;
//				// pause the slideshow
//				slideshow.controls.pause();
//			}).on('click','.js-Play',{},function(){
//				audio.controls.start();
//				slideshow.controls.start({
//					withAudio : true,
//					slides : slides,
//					lengthPerSlide : duration
//				});
//			});
//		}else{
//			// slideshow with audio and with autoplay on
//			// has progress bar
//			// no click through wait time
//			// has no length per slide
//			// length per slide will depend on the timestamp
//			var duration =[];
//			$('.' + viewerConfigs.defaultClass).each(function(index){
//				duration.push($(this).attr('data-timestamp')*1000);
//			});
//			audio.controls.start();
//			slideshow.controls.start({
//				withAudio : true,
//				slides : slides,
//				lengthPerSlide : duration
//			});
//			$('body').on('click','.js-Next',{},function(){
//				slideshow.controls.pause();
//				// find the slide with the current class on it, get it's id
//				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
//				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
//				var nextSlideId;
//				if(currentSlideId + 1 > slides.length){
//					nextSlideId = slides.length;
//				}else{
//					nextSlideId = currentSlideId + 1;
//				}
//				// get the next slide id
//				var nextEl = $('body').find('[data-slide='+nextSlideId+']');
//				// we want to get the time stamp of that slide
//				if(nextSlideId > slides.length){
//					var currentTimeStamp = slides.length;
//				}else{
//					var currentTimeStamp = nextEl.attr('data-timestamp');
//				}
//				$('audio')[0].currentTime = currentTimeStamp;
//				setTimeout(slideshow.controls.next(slides),3000);
//				// set the time of video to the timestamp of the current slide
//				slideshow.controls.start({
//					withAudio : true,
//					slides : slides,
//					lengthPerSlide : duration
//				});
//			}).on('click','.js-Prev',{},function(){
//				slideshow.controls.pause();
//				// find the slide with the current class on it, get it's id
//				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
//				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
//				var prevSlideId;
//				if(currentSlideId < 1){
//					prevSlideId = currentSlideId;
//				}else{
//					prevSlideId = currentSlideId - 1;
//				}
//				// get the previous slide id
//				var prevEl = $('body').find('[data-slide='+prevSlideId+']');
//				// we want to get the time stamp of that slide
//				if(currentSlideId == 1){
//					var currentTimeStamp = 0
//				}else{
//					var currentTimeStamp = prevEl.attr('data-timestamp');
//				}
//				$('audio')[0].currentTime = currentTimeStamp;
//				setTimeout(slideshow.controls.prev(slides),3000);
//				// set the time of video to the timestamp of the current slide
//				slideshow.controls.start({
//					withAudio : true,
//					slides : slides,
//					lengthPerSlide : duration
//				});
//			}).on('click','.js-Pause',{},function(){
//				// find the slide with the current class on it, get it's id
//				var currentSlideId = $('.' + viewerConfigs.activeClass).data('slide');
//				var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
//				// we want to get the time stamp of that slide
//				if(currentSlideId == 1){
//					var currentTimeStamp = 0
//				}else{
//					var currentTimeStamp = currentSlideEl.attr('data-timestamp');
//				}
//				// pause the audio
//				audio.controls.pause();
//				// set the time of video to the timestamp of the current slide
//				$('audio')[0].currentTime = currentTimeStamp;
//				// pause the slideshow
//				slideshow.controls.pause();
//			}).on('click','.js-Play',{},function(){
//				audio.controls.start();
//				slideshow.controls.start({
//					withAudio : true,
//					slides : slides,
//					lengthPerSlide : duration
//				});
//			});
//		}
//	}
	
		
//});



