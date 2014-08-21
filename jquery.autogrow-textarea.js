// Based off https://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js?r=2
// Modified by David Beck

( function( factory ) {
    // UMD wrapper
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( [ 'jquery' ], factory );
    } else if ( typeof exports !== 'undefined' ) {
        // Node/CommonJS
        module.exports = factory( require( 'jquery' ) );
    } else {
        // Browser globals
        factory( jQuery );
    }
}( function( $ ) {

    /*
     * Auto-growing textareas; technique ripped from Facebook
     */
    $.fn.autogrow = function(options) {
        
		options = $.extend( {
			vertical: true,
			horizontal: false
		}, options);

		this.filter('textarea,input').each(function() {
			
            var $this       = $(this),
                minHeight   = $this.height(),
				maxHeight	= $this.attr( "maxHeight" ),
                lineHeight  = $this.css('lineHeight'),
				minWidth	= typeof( $this.attr( "minWidth" ) ) == "undefined" ? 0 : $this.attr( "minWidth" );
            
			if( typeof( maxHeight ) == "undefined" ) maxHeight = 1000000;
			
            var shadow = $('<div class="autogrow-shadow"></div>').css( {
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                fontSize:   $this.css('fontSize'),
                fontFamily: $this.css('fontFamily'),
				fontWeight: $this.css('fontWeight'),
                lineHeight: $this.css('lineHeight'),
                resize:     'none'
            } ).appendTo(document.body);

            shadow.html( 'a' );
            var characterWidth = shadow.width();
            shadow.html( '' );
            
            var update = function() {
    
                var times = function(string, number) {
                    for (var i = 0, r = ''; i < number; i ++) r += string;
                    return r;
                };
                
                var val = this.value;
				
				if( options.vertical )
					val = val.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/&/g, '&amp;')
						.replace(/\n$/, '<br/>&nbsp;')
						.replace(/\n/g, '<br/>')
						.replace(/ {2,}/g, function(space) { return times('&nbsp;', space.length -1) + ' '; });
				
				//if( options.horizontal )
				//	val = $.trim( val );
				
                shadow.html(val).css( "width", "auto" );
				
				if( options.horizontal )
				{
					var newWidth = Math.max( shadow.width() + characterWidth * 3, minWidth );
					var maxWidth = options.maxWidth;
					//if( typeof( maxWidth ) === "undefined" ) maxWidth = $this.parent().width() - 12; // not sure why we were doing this but seems like a bad idea. doesn't work with inline-block parents for one thing, since it is the text area that should be "pushing" them to be wider
					if( maxWidth ) newWidth = Math.min( newWidth, maxWidth );
					$(this).css( "width", newWidth );
				}
								
				if( options.vertical )
				{
					shadow.css( "width", $(this).width() - parseInt($this.css('paddingLeft'),10) - parseInt($this.css('paddingRight'),10) );
					var shadowHeight = shadow.height();
					var newHeight = Math.min( Math.max( shadowHeight, minHeight ), maxHeight );
					$(this).css( "height", newHeight );
					$(this).css( "overflow", newHeight == maxHeight ? "auto" : "hidden" );
				}
            };
            
            $(this)
				.change(update)
				.keyup(update)
				.keydown(update)
				.bind( "update.autogrow", update )
				.bind( "remove.autogrow", function() {
					shadow.remove();
				} );
            
            update.apply(this);
            
        });
        
        return this;
    };
    
} ) );
