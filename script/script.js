var officinaBook = { src: '/script/officinaBook.swf' };
var officinaBold = { src: '/script/officinaBold.swf' }

// You probably want to switch this on, but read <http://wiki.novemberborn.net/sifr3/DetectingCSSLoad> first.
// sIFR.useStyleCheck = true;
sIFR.activate(officinaBook, officinaBold);

sIFR.replace(officinaBook, {
  selector: '.developing'
  ,css: [
		'.sIFR-root { color: #999999; }'
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