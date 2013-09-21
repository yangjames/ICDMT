chrome.app.runtime.onLaunched.addListener(function() {
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = 400;
    var height = 500;
    
    chrome.app.window.create('../html/starter.html', {
	bounds: {
	    width: width,
	    height: height,
	    left: Math.round((screenWidth-width)/2),
	    top: Math.round((screenHeight-height)/2)
	}
    });
});
