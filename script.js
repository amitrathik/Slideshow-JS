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
		play(configs.lengthPerSlide * 1000);
	}
	
	$('body').on('click','.js-Next',{},function(){
		setTimeout(next(slides),3000);
	});
	$('body').on('click','.js-Prev',{},function(){
		setTimeout(prev(slides),3000);
	});
});

// Load next slide, move current slide to previous position
function next(slides){
	var currentSlideId = $('.media-player__content-slide--current').data('slide');
	if(currentSlideId < slides.length){
		var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
		currentSlideEl.addClass('media-player__content-slide--previous').removeClass('media-player__content-slide--current');
		var nextSlideId = currentSlideId + 1 < slides.length ? currentSlideId + 1 : slides.length;
		var nextSlideEl = $('body').find('[data-slide='+nextSlideId+']');
		nextSlideEl.removeClass('media-player__content-slide--next').addClass('media-player__content-slide--current');
		
	}
}
// Load previous slide, move current slide to next position
function prev(slides){
	var currentSlideId = $('.media-player__content-slide--current').data('slide');
	if(currentSlideId > 1){
		var currentSlideEl = $('body').find('[data-slide='+currentSlideId+']');
		currentSlideEl.addClass('media-player__content-slide--next').removeClass('media-player__content-slide--current');
		var prevSlideId = currentSlideId - 1 > 0 ? currentSlideId - 1 : 1;
		var prevSlideEl = $('body').find('[data-slide='+prevSlideId+']');
		prevSlideEl.removeClass('media-player__content-slide--previous').addClass('media-player__content-slide--current');
	}
}

// Play slideshow, with the time per transition = length per slide * index of slide 
function play(args){
	$('.media-player__content-slide').each(function(index){
		var slide = $(this);
		setTimeout(function(){	
		//
		}, args * index);
	});
}

