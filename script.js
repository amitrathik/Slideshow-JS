$(function(){	
	// grab all the slides into an array
	var slides = slideshow.load();

	if(!configs.withAudio){
		/*
		 * slide show without audio
		 */
		if(!configs.autoplay){
			// slideshow without audio and  with autoplay off
			// has no progress bar
			// has no click through wait time
			// has no length per slide
			// load slides and controls (next and forward)	
			$('body').on('click','.js-Next',{},function(){
				setTimeout(slideshow.controls.next(slides),3000);
			}).on('click','.js-Prev',{},function(){
				setTimeout(slideshow.controls.prev(slides),3000);
			});

		}else{
			// slideshow without audio and with autoplay on
			// has progress bar
			// has click through wait time
			// has length per slide
			// convert the config time to seconds
			var clickThroughWaitTime = configs.clickThroughWaitTime * 1000;
			var lengthPerSlide = configs.lengthPerSlide * 1000;
			var currentSlideId = $('.media-player__content-slide--current').data('slide');
			var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
			setTimeout(function(){
				$('body').on('click','.js-Next',{},function(){
					slideshow.controls.pause();
					progressBar.pause();
					// we want to make sure they have already viewed the next slide, else they have to wait
					if(slidesWatched.indexOf(currentSlideEl) != -1){
						setTimeout(slideshow.controls.next(slides));
					}else{
						slideshow.controls.start({
							slides : slides,
							lengthPerSlide : lengthPerSlide
						});
						progressBar.start({
							lengthPerSlide : lengthPerSlide
						});
					}
				}).on('click','.js-Prev',{},function(){
					// pause everything
					slideshow.controls.pause();
					progressBar.pause();
					setTimeout(slideshow.controls.prev(slides));
					// resume everything
					slideshow.controls.start({
						slides : slides,
						lengthPerSlide : lengthPerSlide
					});
					progressBar.start({
						lengthPerSlide : lengthPerSlide
					});
				}).on('click','.js-Pause',{},function(){
					slideshow.controls.pause();
					progressBar.pause();
				}).on('click','.js-Play',{},function(){
					slideshow.controls.start({
						slides : slides,
						lengthPerSlide : lengthPerSlide
					});
					progressBar.start({
						lengthPerSlide : lengthPerSlide
					});
				});
			},clickThroughWaitTime);
			
			// Start the slideshow and progress bar
			slideshow.controls.start({
				slides : slides,
				lengthPerSlide : lengthPerSlide
			});
			progressBar.start({
				lengthPerSlide : lengthPerSlide
			});
			
		}
	}else{ 
		/*
		 * slide show with audio
		 */
		if(!configs.autoplay){
			// slideshow with audio and with autoplay off
			// has progress bar
			// no click through wait time
			// has no length per slide
			// length per slide will depend on the timestamp
			$('body').on('click','.js-Next',{},function(){
				setTimeout(slideshow.controls.next(slides),3000);
			}).on('click','.js-Prev',{},function(){
				setTimeout(slideshow.controls.prev(slides),3000);
			}).on('click','.js-Pause',{},function(){
				audio.controls.pause();
				slideshow.controls.pause();
				progressBar.pause();
			}).on('click','.js-Play',{},function(){
				audio.controls.start();
				slideshow.controls.start({
					slides : slides,
					lengthPerSlide : 0
				});
				progressBar.start({
					lengthPerSlide : 0
				});
			});
		}else{
			// slideshow with audio and with autoplay on
			// has progress bar
			// no click through wait time
			// has no length per slide
			// length per slide will depend on the timestamp
			audio.controls.start();
			$('body').on('click','.js-Next',{},function(){
				setTimeout(slideshow.controls.next(slides),3000);
			}).on('click','.js-Prev',{},function(){
				setTimeout(slideshow.controls.prev(slides),3000);
			}).on('click','.js-Pause',{},function(){
				audio.controls.pause();
				slideshow.controls.pause();
				progressBar.pause();
			}).on('click','.js-Play',{},function(){
				audio.controls.start();
				slideshow.controls.start({
					slides : slides,
					lengthPerSlide : 0
				});
				progressBar.start({
					lengthPerSlide : 0
				});
			});
			
		}
	}
		
});



