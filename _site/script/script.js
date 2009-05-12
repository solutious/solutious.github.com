var officinaBook = { src: '/script/officina.swf' };
var officinaBold = { src: '/script/officinaBold.swf' }

// You probably want to switch this on, but read <http://wiki.novemberborn.net/sifr3/DetectingCSSLoad> first.
// sIFR.useStyleCheck = true;
sIFR.activate(officinaBook, officinaBold);

sIFR.replace(officinaBook, {
  selector: '.developing, .screencast h3'
  ,css: [
		'.sIFR-root { color: #999999; }'
  ]
});
sIFR.replace(officinaBook, {
  selector: '#sifrAnd'
	,wmode: 'transparent'
  ,css: [
		'.sIFR-root { text-align: center; color: #336666; font-style: italic; font-weight: bold; }'
  ]
});
sIFR.replace(officinaBook, {
  selector: '.nav li span'
	,wmode: 'transparent'
  ,css: [
		'.sIFR-root { text-align: center; font-weight: bold; color: #000000; }'
		,'a { text-decoration: none; }'
    ,'a:link { color: #000000; }'
    ,'a:hover { color: #336666; }'
  ]
});
sIFR.replace(officinaBook, {
  selector: '#sifrRightTools, .productHeading, .stellaPageOverview h2, .rudyPageOverview h2, .screencast p'
	,wmode: 'transparent'
  ,css: [
		'.sIFR-root { font-weight: bold; color: #000000; }'
		,'a { text-decoration: none; }'
    ,'a:link { color: #000000; }'
    ,'a:hover { color: #336666; }'
  ]
});
sIFR.replace(officinaBook, {
  selector: '.reparte'
	,wmode: 'transparent'
  ,css: [
		'.sIFR-root { color: #00cccc; font-weight: bold; }'
  ]
});


/*
sIFR.replace(officinaBook, {
  selector: '.stellaOverview h2'
  ,css: [
		'.sIFR-root { color: #000000; }'
  ]
});
*/