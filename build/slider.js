var slider = (function() {

    var CONSTANTS = {
        CLASS_ACTIVE: 'slider__item--active',
        CLASS_PREVIOUS: 'slider__item--previous',
    };
    var activeSlideId = 0;
    var previousSlideId;
    var slideItems;
    var speed = 5000;

    function init(_element, _speed) {
        slideItems = document.querySelectorAll(_element);
        speed = _speed ? _speed : speed;

        console.log(speed);

        if(!slideItems) {
            console.warn('No elements found for', _element);
            return false;
        }

        // Not using toggle because of no IE support
        window.requestAnimationFrame(function(){
            slideItems[activeSlideId].classList.remove(CONSTANTS.CLASS_ACTIVE);
            slideItems[activeSlideId].classList.add(CONSTANTS.CLASS_ACTIVE);

            play();
        });
    }

    function play() {
        var interval = setInterval(function(){
            window.requestAnimationFrame(function(){
                if(typeof previousSlideId !== 'undefined') {
                    slideItems[previousSlideId].classList.remove(CONSTANTS.CLASS_PREVIOUS);
                }

                previousSlideId = activeSlideId;
                activeSlideId += 1;

                if(activeSlideId === slideItems.length) {
                    activeSlideId = 0;
                }

                slideItems[previousSlideId].classList.remove(CONSTANTS.CLASS_ACTIVE);
                slideItems[activeSlideId].classList.add(CONSTANTS.CLASS_ACTIVE);

                slideItems[previousSlideId].classList.add(CONSTANTS.CLASS_PREVIOUS);
            });
        }, speed);
    };

    return {
        init: init
    }
});
