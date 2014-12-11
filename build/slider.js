/**
 * Options
 *
 * Arrows: [true|false] : show arrows
 * Position [before|after] : Where the arrows go
 * - Bullets [true|false] : Show bullets
 * - Autoplay [true|false] : Autoplay slider
 * Speed [int] : Slideshow speed
 * - Animation [slide|fade] : The type of animation
 * Slides [element] : default is 'li'
 * Wrapper [element] : The wrapper element
 * Endless [true|false] : endless slider
 * Keyboard [true|false] : Use keyboard arrows
 *
 * slideChanged [function] : called when slide in moved , data = current slide
 */

(function($) {
    $.fn.slide = function(userSettings, callback) {
        var $this = this,
            animating = false,
            settings = {
                animation: 'slide',
                arrows: true,
                autoplay: false,
                bullets: false,
                debug: false,
                keyboard: false,
                position: 'after',
                endless: false,
                slides: $('li', $this),
                speed: 500,
                wrapper: $this.parent(),
                slideChanged: function(){}
            };

        function log(msg){
            if(settings.debug && console){
                console.log(msg);
                console.log('---');
            }
        }

        function init(){
            // Check if settings could be callback
            if(typeof settings === 'function') {
                callback = settings;
                settings = {};
            }

            $.extend(settings, userSettings);

            log('Init slider');

            setIndex();

            // Build CSS etc
            setSizes();

            if(settings.arrows){
                // Add arrows
                setArrows();
            }
        }

        function setSizes(){
            log('Set sizes');

            var length = settings.slides.length,
                elWidth = settings.slides.width();

            settings.wrapper.width(elWidth);
            settings.slides.width(elWidth);

            $this.width(elWidth * length).css('left', '0');
        }

        function setIndex(){
            log('Set Indexes');

            settings.slides.each(function(index){
                $(this).attr('data-index', (index + 1));
            });
        }

        function setArrows(){
            log('Set arrows');

            if(settings.position === 'before'){
                settings.wrapper.prepend('<a href="#" class="sl-arrow sl-left">left</a>').prepend('<a href="#" class="sl-arrow sl-right">right</a>')
            } else {
                settings.wrapper.append('<a href="#" class="sl-arrow sl-left">left</a>').append('<a href="#" class="sl-arrow sl-right">right</a>')
            }

            // Add event listeners for arrows
            addListeners();
        }

        function addListeners(){
            log('Add listeners');

            $('.sl-arrow').bind('click', function(event){
                event.preventDefault();

                if($(this).is('.sl-left')){
                    log('Arrow clicked <<< Left');

                    move('left');
                } else if ($(this).is('.sl-right')){
                    log('Arrow clicked >>> Right');

                    move('right');
                }
            });

            $('body').bind('keydown', function(event){
                if(event.keyCode === 37){
                    move('left');
                }

                if(event.keyCode === 39){
                    move('right');
                }
            });
        }

        function move(direction){
            var length = settings.slides.length,
                elWidth = settings.slides.width(),
                currentLeft = parseInt($this.css('left'));

            if(direction === 'right'){
                elWidth = parseInt('-' + elWidth);
            }

            var move = currentLeft + elWidth;

            if(move > 0 && direction === 'left'){
                if(!settings.endless){
                    return false;
                } 

                move = -(elWidth * (length - 1));

            } else if (move <= (elWidth * length)  && direction === 'right'){
                if(!settings.endless){
                    return false;
                }

                move = 0;
            }

            animate(move);
            
        }

        function animate(move){
            if(animating){
                return;
            }

            log('Move');

            animating = true;

            if(settings.animation === 'fade'){
                // Fade the slides
            } else {
                $this.stop().animate({
                    'left': move
                }, settings.speed, function(){
                    animating = false;

                    if(typeof settings.slideChanged === 'function'){
                        settings.slideChanged();
                    }
                });
            }
        }

        init();

        if(typeof callback !== 'undefined'){
            callback(errors);
        }
    };
}(jQuery));