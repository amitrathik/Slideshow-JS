var configs = {
		mediaType : 'slideshow',
		withAudio : false,
		autoplay : true,
		lengthPerSlide : 5,
		clickThroughWaitTime : 15
};
$(function(){
	// grab all the slides into an array
	var slides = $('.media-player__content-slide').map(function(){
		return $(this).data('slide');
	}).get();
	
	if(configs.autoplay){
		play(slides,configs.lengthPerSlide * 1000);
	}
	
	$('body').on('click','.js-Next',{},function(){
		setTimeout(slideshow.controls.next(slides),3000);
	});
	$('body').on('click','.js-Prev',{},function(){
		setTimeout(slideshow.controls.prev(slides),3000);
	});
});


// Play slideshow, with the time per transition = length per slide * index of slide 
function play(slides,lengthPerSlide){
	$('.media-player__content-slide').each(function(index){
		var slide = $(this);
		setTimeout(function(){	
			next(slides);
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
