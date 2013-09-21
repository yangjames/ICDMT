
var cb = new Codebird;
var current_url=location.toString();
cb.setConsumerKey(twitterConsumerKey,twitterConsumerSecret);

//var query=current_url.match(/);
//$('#testline').html(query);

//.split("&amp;");

var parameters = {};
var parameter;

$('#testline').html("clicked");
$('#twitter-login-button').click(function() {
	$('#testline').html("clicked");
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
	$('#pin-submission').show();
	$('#click-confirmation').html('Redirecting to login page. Please type in login information and click "Authorize App." Enter the PIN on the next page in the field below.');
    });

$('#pin-submission').submit(function (e) {
	var $inputs = $('#pin-submission :input');
	var pin=$inputs.val();
	$('#testline').html(pin);
	cb.__call(
		  "oauth_accessToken",
		  {oauth_verifier: pin},
		  function (reply) {
		      cb.setToken(reply.oauth_token, reply.oauth_token_secret);
		  }
		  );
	
	cb.__call(
		  "statuses_update",
		  {"status": "jquery submission test"},
		  function(reply) {}
		  );
    });