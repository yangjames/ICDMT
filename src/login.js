//********************************
// TWITTER LOGIN OPTION **********
//********************************
var cb;
var screen_name;

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
	
	$('#login-options').hide();
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

function submitPin(pin) {
    $('#pinform').hide();
    $('#login-status-text').html('Loading. Please wait...');
    cb.__call(
	      "oauth_accessToken",
	      {oauth_verifier: pin},
	      function (reply) {
		  cb.setToken(reply.oauth_token, reply.oauth_token_secret);
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

//********************************
// ICDMT Account Login
//********************************
var login_email;

$('#email-login-button').click(function() {
    $('#login-options').hide();
    $('#email-form').show();
});

$('#login-email').bind('keypress', function (e) {
    if(e.keyCode==13)
		checkInfo();
});

$('#login-password').bind('keypress', function(e) {
    if(e.keyCode==13)
		checkInfo();
});

$('#email-login-submit-button').click(function() {
    checkInfo();
});
    
function sendLoginInfo(login_form) {
    $('#login-status-text').html(serverURL+'/cgi-bin/hello.py');
	$.ajax({
		url: serverURL+'/cgi-bin/hello.py',
		type: 'post',
		data: login_form,
		dataType:'json',
		success: function() {
			$('#login-status-text').html("submitted!");
		},
		error: function(jqXHR,exception) {
			$('#login-status-text').html("error while submit : "+jqXHR.status +"<br>submitted: " + login_form.email + " " + login_form.password);
		}
    });
}

//********************************
// EMAIL AND PASSWORD VALIDATION *
//********************************

function checkInfo() {
    var email = $('#login-email').val();
    var password = $('#login-password').val();
    // var serialized_form=JSON.stringify(login_form);
    if (validateEmail(email) && validatePassword(password)) {
		var login_form = {email: email, password: password};
		sendLoginInfo(login_form);
		login_email=email;
    }
    else {
		$('#login-status-text').html("Invalid email or password. Please try again.");

		$('#login-status-text').fadeOut(2000, function() {
			$('#login-status-text').html("");
			$('#login-status-text').show();
		});
    }
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function validatePassword(password) {
    return true;
}

//********************************
// NO LOGIN **********************
//********************************
$('#no-login-button').click(function() {
	switchDisplay();
    });
//********************************
function switchDisplay() {
    $('.login').hide();
    $('.map-area').show();
    mapSetup();
}