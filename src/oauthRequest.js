var cb=new Codebird;
var current_url=location.toString();
var query=current_url.match(/\?(.+)$/).split("&amp;");
var parameters = {};
var parameter;

cb.setConsumerKey(twitterConsumerKey,twitterConsumerSecret);

function requestOAuthToken() {
    document.getElementById('').value;
    cb.__call(
	"oauth_requestToken",
	{oauth_callback: "tbd"},
	function (reply) {
	    cb.setToken(reply.