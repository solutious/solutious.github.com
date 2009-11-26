var officinaBook = { src: '/script/officina.swf' };

Cufon.replace('.developing, .screencast h3, #sifrAnd');

Cufon.replace('.nav li span, #sifrRightTools, .productHeading, .stellaPageOverview h2, .rudyPageOverview h2, .screencast p, .sifr, .reparte, .speaking .event', {
	hover: true
	});	

noSpam = function( user, domain ) {
	document.location = 'mailto:' + user + '@' + domain;
}