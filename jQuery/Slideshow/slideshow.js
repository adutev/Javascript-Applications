'use strict';

$(function() {

    //settings for slider
    var WIDTH = 720;
    var ANIMATION_SPEED = 1000;
    var PAUSE = 5000;
    var CURRENT_SLIDE = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);
    var maxMarginLeft = WIDTH*($slides.length-2);

    var interval;

    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-='+WIDTH}, ANIMATION_SPEED, function() {
                if (++CURRENT_SLIDE === $slides.length) {
                    CURRENT_SLIDE = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, PAUSE);
    }

    function pauseSlider() {
        clearInterval(interval);
    }

    $("#previous-button").click(function(event) {
    	pauseSlider();
    	$slideContainer.animate({'margin-left': '+='+WIDTH}, ANIMATION_SPEED, function() {
    		if(--CURRENT_SLIDE == 0) {
    			CURRENT_SLIDE = $slides.length - 1;
    			$slideContainer.css('margin-left', -maxMarginLeft);
    		}
            });
    	startSlider();
    });

    $("#next-button").click(function(event) {
    	pauseSlider();
    	$slideContainer.animate({'margin-left': '-='+WIDTH}, ANIMATION_SPEED, function() {
    		if (++CURRENT_SLIDE === $slides.length) {
                    CURRENT_SLIDE = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
    	startSlider();
    });

    startSlider();


});
