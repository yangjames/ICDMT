chrome.app.runtime.onLaunched.addListener(function() {
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = 1000;
    var height = 700;
    
    chrome.app.window.create('../html/starter.html', {
	bounds: {
	    width: width,
	    height: height,
	    left: Math.round((screenWidth-width)/2),
	    top: Math.round((screenHeight-height)/2)
	}
    });
});
