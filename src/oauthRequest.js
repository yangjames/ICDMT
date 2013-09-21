var cb;

var parameters = {};
var parameter;

$('#testline').html("clicked");
$('#twitter-login-button').click(function() {
	$('#testline').html("clicked");
	cb = new Codebird;
	cb.setConsumerKey(twitterConsumerKey,twitterConsumerSecret);
	cb.__call(
		  "oauth_requestToken",
		  {oauth_callback: "oob"},
		  function (reply) {
		      // stores it
		      cb.setToken(reply.oauth_token, reply.oauth_token_secret);
		      
		      // gets the authorize screen URL
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
	var pin;
	if(e.keyCode==13) {
	    pin=$('#pin-submission').val();
	    //    $('#testline').html(pin);
	}
	submitPin(pin);
    });
$('#pin-submit-button').click(function() {
	submitPin($('#pin-submission').val());
    });

function submitPin(pin) {
    $('#testline').html(pin);
    cb.__call(
	      "oauth_accessToken",
	      {oauth_verifier: pin},
	      function (reply) {
		  $('#testline').html("got token " + reply.oauth_token);
		  cb.setToken(reply.oauth_token, reply.oauth_token_secret);
		  sendTweet();
	      }
	      );
}

function sendTweet() {

    $('#testline').html("got this far");
    cb.__call(
	      "statuses_update",
	      {"status": "jquery submission test"},
	      function(reply) {
		  $('#testline').html("got reply after tweet");
	      }
	      );
}