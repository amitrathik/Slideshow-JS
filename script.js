$(function(){

	// grab all the slides into an array
	var slides = slideshow.load();
	
	if(configs.autoplay){
		slideshow.controls.start({
			slides : slides,
			lengthPerSlide : configs.lengthPerSlide * 1000
		});
		progressBar.start({
			lengthPerSlide : configs.lengthPerSlide * 1000
		});
		// convert the config time to seconds
		var clickThroughWaitTime = configs.clickThroughWaitTime * 1000;
		setTimeout(function(){
			$('body').on('click','.js-Next',{},function(){
				setTimeout(slideshow.controls.next(slides),3000);
			}).on('click','.js-Prev',{},function(){
				setTimeout(slideshow.controls.prev(slides),3000);
			}).on('click','.js-Pause',{},function(){
				
			});
		},clickThroughWaitTime);
	}else{
		$('body').on('click','.js-Next',{},function(){
			setTimeout(slideshow.controls.next(slides),3000);
		}).on('click','.js-Prev',{},function(){
			setTimeout(slideshow.controls.prev(slides),3000);
		}).on('click','.js-Pause',{},function(){
			clearTimeout(currentSlide);

		});
	}
	
});


// Play slideshow, with the time per transition = length per slide * index of slide 
function play(slides,lengthPerSlide){
	$('.media-player__content-slide').each(function(index){
		var slide = $(this);
		var currentSlide = setTimeout(function(){	
			slideshow.controls.next(slides);
		}, lengthPerSlide * (index+1));
	});
	$('.progress-bar__progress').each(function(index){
		var progress = $(this);
		var currentProgress = setTimeout(function(){
			progress.css('border','1px solid #666');
			progress.css('background-color','#00ff00');
		},lengthPerSlide * ( index+1));
	});
}

function progress(){
	
}
