var cb;

$('#twitter-login-button').click(function() {
	cb = new Codebird;
	cb.setConsumerKey(twitterConsumerKey,twitterConsumerSecret);
	cb.__call(
		  "oauth_requestToken",
		  {oauth_callback: "oob"},
		  function (reply) {
		      cb.setToken(reply.oauth_token, reply.oauth_token_secret);
		      cb.__call(
				"oauth_authorize",
				{},
				function (auth_url) {
				    window.codebird_auth = window.open(auth_url);
				}
				);
		  }
		  );
	
	$('#twitter-login-button').hide();
	$('#pinform').show();
	$('#click-confirmation').html('Redirecting to login page. Please type in login information and click "Authorize App." Enter the PIN on the next page in the field below.');
    });

$('#pin-submission').bind('keypress', function (e) {
	if(e.keyCode==13) {
	    var pin=$('#pin-submission').val();
	    submitPin(pin);
	}
    });

$('#pin-submit-button').click(function() {
	submitPin($('#pin-submission').val());
    });

var user_id;
var screen_name;

function submitPin(pin) {
    cb.__call(
	      "oauth_accessToken",
	      {oauth_verifier: pin},
	      function (reply) {
		  cb.setToken(reply.oauth_token, reply.oauth_token_secret);
		  user_id=reply.user_id;
		  screen_name=reply.screen_name;
		  switchDisplay();
	      }
	      );
}

function sendTweet(str) {

    $('#testline').html("got this far");
    cb.__call(
	      "statuses_update",
	      {"status": str},
	      function(reply) {
		  $('#testline').html("got reply after tweet");
	      }
	      );
}

function switchDisplay() {
    $('.login').hide();
    $('.map').show();
    var window=chrome.app.window.current();

    $('#testline').html("got this far");
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = 850;
    var height = 700;
    window.moveTo(Math.round((screenWidth-width)/2),
		Math.round((screenHeight-height)/2)
		  );
}