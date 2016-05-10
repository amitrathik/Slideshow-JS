$(function(){	
	// grab all the slides into an array
	var slides = slideshow.load();
	// if slideshow has autoplay, lets check if it has audio
	if(configs.autoplay){
		if(configs.withAudio){
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
					lengthPerSlide : configs.lengthPerSlide * 1000
				});
				progressBar.start({
					lengthPerSlide : configs.lengthPerSlide * 1000
				});
			});
		}else{
			// convert the config time to seconds
			var clickThroughWaitTime = configs.clickThroughWaitTime * 1000;
			setTimeout(function(){
				$('body').on('click','.js-Next',{},function(){
					setTimeout(slideshow.controls.next(slides),3000);
				}).on('click','.js-Prev',{},function(){
					setTimeout(slideshow.controls.prev(slides),3000);
				}).on('click','.js-Pause',{},function(){
					slideshow.controls.pause();
					progressBar.pause();
				}).on('click','.js-Play',{},function(){
					slideshow.controls.start({
						slides : slides,
						lengthPerSlide : configs.lengthPerSlide * 1000
					});
					progressBar.start({
						lengthPerSlide : configs.lengthPerSlide * 1000
					});
				});
			},clickThroughWaitTime);
		}
		slideshow.controls.start({
			slides : slides,
			lengthPerSlide : configs.lengthPerSlide * 1000
		});
		progressBar.start({
			lengthPerSlide : configs.lengthPerSlide * 1000
		});
	
	}else{
		if(configs.withAudio){
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
					lengthPerSlide : configs.lengthPerSlide * 1000
				});
				progressBar.start({
					lengthPerSlide : configs.lengthPerSlide * 1000
				});
			});
		}else{
			$('body').on('click','.js-Next',{},function(){
				setTimeout(slideshow.controls.next(slides),3000);
			}).on('click','.js-Prev',{},function(){
				setTimeout(slideshow.controls.prev(slides),3000);
			}).on('click','.js-Pause',{},function(){
				slideshow.controls.pause();
				progressBar.pause();
			}).on('click','.js-Play',{},function(){
				slideshow.controls.start({
					slides : slides,
					lengthPerSlide : configs.lengthPerSlide * 1000
				});
				progressBar.start({
					lengthPerSlide : configs.lengthPerSlide * 1000
				});
			});
		}
	}
	
});



