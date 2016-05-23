var casper = require('casper').create({
	viewportSize: { width: 1280, height: 1200 }
});
var x = require('casper').selectXPath;

casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36");
casper.start('http://breakbattles-spotify.pt/', function() {
});

var uname = casper.cli.get(0);
var pword = casper.cli.get(1);

casper.then(function(){
	console.log("Init");
	this.wait(2000);
	//this.captureSelector('inicio.png', 'html');
		
	
});

casper.then(function(){
	console.log("Init");
	this.wait(2000);
	//this.captureSelector('inicio.png', 'html');
		
	casper.click("#page_landing > div > div > a > img");

	
});

casper.then(function(){
	console.log("Facebook loaded");

	this.wait(2000);
	//this.captureSelector('passo.png', 'html');
		
	this.fill('form#login_form', { 
        email: uname, 
        pass:  pword
    }, true);
	
	//this.captureSelector('passo1'+uname+'.png', 'html');
	
	casper.click('#loginbutton');
});

casper.then(function(){
	
	console.log("Facebook Permission");

	if( this.getTitle().localeCompare("KitKat Break Battles") ){
		this.wait(2000);
		casper.click('#platformDialogForm > div._5lnf.uiOverlayFooter._5a8u._5eh1 > table > tbody > tr > td._51m-.uiOverlayFooterButtons._51mw > button._42ft._4jy0.layerConfirm._51_n.autofocus.uiOverlayButton._4jy5._4jy1.selected._51sy');
		casper.click('#platformDialogForm > div._5lnf.uiOverlayFooter._5a8u._5eh1 > table > tbody > tr > td._51m-.uiOverlayFooterButtons._51mw > button._42ft._4jy0.layerConfirm._51_n.autofocus.uiOverlayButton._4jy5._4jy1.selected._51sy');
		console.log("Permission granted");

        this.wait(2000);
	}else{
		console.log("Permission already granted");
	}
	
});

casper.then(function(){
	
	console.log("KitKat Break Battles");
	this.wait(2000);
	
	/*this.capture('passo2.jpg', undefined, {
        format: 'jpg',
        quality: 99
    });*/
	
	casper.click('#btn_start > img');
	
});

casper.then(function(){
	
	console.log("KitKat PlayLists");
	this.wait(2000);

	var filho = this.evaluate(function() {
		for (i = 0; i < 9; i++) { 
			if( !($('#playlistsList > div:nth-child(' + i + ') > div.p_name' ).text()).localeCompare("Universidade de Lisboa / Instituto Superior Técnico") )
				return i;
		}
		return -1;
	});
	
	this.captureSelector('O'+uname+'_a_votar_em.png', '#playlistsList > div:nth-child('+filho+')');

	casper.click('#playlistsList > div:nth-child('+filho+') > div.p_vote.row > div:nth-child(2) > a > img');
	
	console.log("DONE!");
	this.wait(4000);

});

casper.run();
