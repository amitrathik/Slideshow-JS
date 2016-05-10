$(function(){

	// grab all the slides into an array
	var slides = slideshow.load();
	
	if(configs.autoplay){
		play(slides,configs.lengthPerSlide * 1000);
		// convert the config time to seconds
		var clickThroughWaitTime = configs.clickThroughWaitTime * 1000;
		setTimeout(function(){
			$('body').on('click','.js-Next',{},function(){
				setTimeout(slideshow.controls.next(slides),3000);
			});
			$('body').on('click','.js-Prev',{},function(){
				setTimeout(slideshow.controls.prev(slides),3000);
			});
		},clickThroughWaitTime);
	}else{
		$('body').on('click','.js-Next',{},function(){
			setTimeout(slideshow.controls.next(slides),3000);
		});
		$('body').on('click','.js-Prev',{},function(){
			setTimeout(slideshow.controls.prev(slides),3000);
		});
	}
	
});


// Play slideshow, with the time per transition = length per slide * index of slide 
function play(slides,lengthPerSlide){
	$('.media-player__content-slide').each(function(index){
		var slide = $(this);
		setTimeout(function(){	
			slideshow.controls.next(slides);
		}, lengthPerSlide * (index+1));
	});
	$('.progress-bar__progress').each(function(index){
		var progress = $(this);
		setTimeout(function(){
			progress.css('border','1px solid #666');
			progress.css('background-color','#00ff00');
		},lengthPerSlide *( index+1));
	});
}

function progress(){
	
}
