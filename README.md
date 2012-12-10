This is a jquery plugin that will auto-grow your text areas vertically (like facebook) or horizontally. It is based off [a code snippet by dhruvbird](https://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js?r=2). The plugin uses a hidden mirror textarea to calculate the idea height (and width) of the target text area. Differences from the original code snippet are:

* The plugin reverts back to simple math with IE 8 since IE 8 does not work well using the mirror approach, as mentioned in [http://stackoverflow.com/questions/9784547/jquery-textarea-auto-grow-plugin-cross-browser-compatible](this stack overflow question).
* Support for horizontal auto-growth of text areas. That is, text areas that expand horizontally as you type.
* Once the plugin has been activated on a textarea, the textarea will listen for the custom "remove.autogrow" event. If that event is triggered, the plugin will clean up the resources that is uses to avoid memory leaks. (Specifcally, the mirror textarea used by the plugin will be removed from the DOM.)

Use:

	$( "textarea" ).autogrow();

or for horizontal growth only:

	$( "textarea" ).autogrow( { vertical : false, horizontal : true } );

or for both (untested? I can't remember!)
	
	$( "textarea" ).autogrow( { vertical : true, horizontal : true } );

To cleanup before removing original textarea element from DOM, or after plugin is no longer needed:

	$( "textarea" ).trigger( "remove.autogrow" );