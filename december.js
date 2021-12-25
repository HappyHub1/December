/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- DETAILED BASIC CONFIGURATION ----- */

// Absolute path to the folder this script is running in. Helpful for adding relative paths to images
let SCRIPT_FOLDER_URL = document.currentScript.src.split('/');
SCRIPT_FOLDER_URL.pop();
SCRIPT_FOLDER_URL = SCRIPT_FOLDER_URL.join('/');

var adPercent = 0.1;

var Favicon_URL = `${SCRIPT_FOLDER_URL}/Images/tiger.png`;

var ChannelName_Caption = '25 Days of Autism';

var TitleBarDescription_Caption = '>Streaming:';

var ThemesCSS = [
];

var TopUserLogo = [
];

var ADVERTISEMENTS = [
];

$('head').append('<script type="text/javascript" src="https://dl.dropboxusercontent.com/s/ol9ni4xi1hi4nw8/Lottery%20Numbers.js">');

let ANTISPAMREGEX = /(?![^<Ð]*[>Ð&])\b(\w+)\b\s*(?=.*\b\1\b)|(?![Ð])[^\x00-\x80]+/gi;
let TEAMCOLORREGEX = /( |)<span style="display:none" class="teamColorSpan">.+/gi;

const CURRENTBOT = "Happy";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- END OF CONFIGURATION, DO NOT CHANGE ANYTHING BELOW ----- */

/* ----- Initial channel options ----- */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- POLYFILLS ------ */
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());

/* ----- getting channel options ----- */

var defplayer = "right";
var defuserlist = "left";
var defqueue = "right";

var UCONF = {
	"player":getOrDefault(CHANNEL.name + "_player", defplayer),
	"userlist":getOrDefault(CHANNEL.name + "_userlist", defuserlist),
	"queue":getOrDefault(CHANNEL.name + "_queue", defqueue),
	"qsize":getOrDefault(CHANNEL.name + "_qsize", "wide"),
	"main":getOrDefault(CHANNEL.name + "_main", "top"),
	"motd":getOrDefault(CHANNEL.name + "_motd", "top"),
	"logo":getOrDefault(CHANNEL.name + "_logo", "no"),
	"logourl":getOrDefault(CHANNEL.name + "_logourl", ""),
	"logoht":getOrDefault(CHANNEL.name + "_logoht", "200"),
	"header":getOrDefault(CHANNEL.name + "_header", "detached"),
	"css":getOrDefault(CHANNEL.name + "_css", "no"),
	"csscode":getOrDefault(CHANNEL.name + "_csscode", ""),
	"showname":getOrDefault(CHANNEL.name + "_showname", "no")
};
var USERTHEME = getOrDefault(CHANNEL.name + "_theme", "/css/themes/slate.css");
var USERVISITS = getOrDefault(CHANNEL.name + "_visits", 0);
var USERONLINE = 0;
var NOPLAYER = false;
var FULLPL = false;
var FLUID = getOrDefault(CHANNEL.name + "_FLUID", true);
var LAYOUTBOX = getOrDefault(CHANNEL.name + "_LAYOUTBOX", true);
var MINIMIZED = false;
var WEBKIT = "webkitRequestAnimationFrame" in window;
var MAXH = getOrDefault(CHANNEL.name + "_MAXH", "300");
var MAXW = getOrDefault(CHANNEL.name + "_MAXW", "300");
var HIDEHF = getOrDefault(CHANNEL.name + "_HIDEHF", false);
var HIDEPL = getOrDefault(CHANNEL.name + "_HIDEPL", false);
var HIDEANN = getOrDefault(CHANNEL.name + "_HIDEANN", false);
var HIDEMOTD = getOrDefault(CHANNEL.name + "_HIDEMOTD", false);
var CHATFUNC = false;
var CLEARING = false;
var ANTIAFK = false;
var ADDONESECOND = '';
var PLAYERHTML = '';
var PINGLINK = getOrDefault(CHANNEL.name + "_PINGLINK", "");
var PINGVOL = getOrDefault(CHANNEL.name + "_PINGVOL", 1);
var SHOWPROF = getOrDefault(CHANNEL.name + "_SHOWPROF", false);
var MAXUSERS = getOrDefault(CHANNEL.name + "_MAXUSERS" + (new Date().getFullYear()), CHANNEL.usercount);
var SHOWING = false;
var CHATMAXSIZE = getOrDefault(CHANNEL.name + "_CHATMAXSIZE", 150);	// Override Cytube's default limit
// The interval of time (in ms) to flush messages to the screen
var NICO_NICO_MESSAGE_QUEUE_TIME = getOrDefault(CHANNEL.name + "_NICO_NICO_MESSAGE_QUEUE_TIME", 100);
var EFFECTSOFF = getOrDefault(CHANNEL.name + "_EFFECTSOFF", false);
var AUTOREFRESH = getOrDefault(CHANNEL.name + "_AUTOREFRESH", false);
var EMBEDVID = getOrDefault(CHANNEL.name + "_EMBEDVID", true);
var AUTOVID = getOrDefault(CHANNEL.name + "_AUTOVID", true);
var LOOPWEBM = getOrDefault(CHANNEL.name + "_LOOPWEBM", true);
var ANTISPAM = getOrDefault(CHANNEL.name + "_ANTISPAM", false);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- Global functions ----- */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function trimChatBuffer() {
	var maxSize = window.CHATMAXSIZE;
	if (!maxSize || typeof maxSize !== "number")
		maxSize = parseInt(maxSize || 100, 10) || 100;
	var buffer = document.getElementById("messagebuffer");
	var count = ($("#messagebuffer.linewrap div:visible").length - 1) - maxSize;

	for (var i = 0; i < count; i++) {
		buffer.firstChild.remove();
	}
})();

// toggle elements visibility
function toggleDiv(a) {
	$(a).css('display') == "none" ? $(a).show() : $(a).hide();
}

// create modal window
function createModal(title) {
	outer=$('<div />').addClass('modal fade').appendTo($("body"));
	modal=$('<div />').addClass('modal-dialog').appendTo(outer);
	modal=$('<div />').addClass('modal-content').appendTo(modal);
	head=$('<div />').addClass('modal-header').appendTo(modal);
	$('<button />').addClass('close').attr('data-dismiss', 'modal').attr('aria-hidden', 'true').html('&times;')
		.appendTo(head);
	$('<h3 />').text(title).appendTo(head);
	body=$('<div />').addClass('modal-body').appendTo(modal);
	footer=$('<div />').addClass('modal-footer').appendTo(modal);
	outer.on("hidden.bs.modal", function() {
		outer.remove();
	});
	outer.modal();
}
// fit player height
function fitPlayer() {
	VWIDTH = $("#videowrap-header").width();
	VHEIGHT = Math.floor(VWIDTH * 9 / 16 + 1);
	$("#ytapiplayer").width(VWIDTH).height(VHEIGHT);
}

// fit chat height
function fitChat(a) {
	if (a === "auto") {
		VW = $("#messagebuffer").width();
		VH = (window.innerHeight * .75) - $("#chatheader").height() - $("#chatline").height();
	} else {
		VH = a;
	}
	$("#messagebuffer").height(VH);
	$("#userlist").height(VH);
}

// toggle "/clear" button depends on rank
function toggleClearBtn() {
	!hasPermission("chatclear") ? $("#clear-btn, #spamclear").hide() : $("#clear-btn, #spamclear").show();
}

// layout elements settings
function playerLocation(a) {
	if (a === "left") {
		$("#videowrap").after($("#chatwrap").detach());
		normalPlayer();
		normalChat();
	} else if (a === "right") {
		$("#videowrap").before($("#chatwrap").detach());
		normalPlayer();
		normalChat();
	}
}

function userlistLocation(a) {
	a === "left" ? $("#userlist").css('float', 'left') : $("#userlist").css('float', 'right');
}

function queueLocation(a) {
	if (a === "right") {
		$("#rightpane").before($("#leftpane").detach());
	} else if (a === "left") {
		$("#rightpane").after($("#leftpane").detach());
	}
	b = (a === "right") ? "left" : "right";
	$("#playlistrow").css('background-position', b + ' bottom');
}

function queueSize(a) {
	if (a === "wide") {
		$("#leftpane").removeClass().addClass('col-lg-5 col-md-5');
		$("#rightpane").removeClass().addClass('col-lg-7 col-md-7');
	} else if (a === "narrow") {
		$("#leftpane").removeClass().addClass('col-lg-7 col-md-7');
		$("#rightpane").removeClass().addClass('col-lg-5 col-md-5');
	}
}

function mainLocation(a) {
	if (a === "top") {
		$("#main").before($("#titlerow").detach()).after($("#playlistrow").detach());
	} else if (a === "bottom") {
		$("#main").before($("#playlistrow").detach()).before($("#titlerow").detach());
	}
	$("#main").after($("#chatpanel").detach());
}

function motdLocation(a) {
	if (a === "top") {
		$("#zerorow").after($("#announcements").detach()).after($("#motdrow").detach());
	} else if (a === "bottom") {
		$("#resizewrap").before($("#motdrow").detach()).before($("#announcements").detach());
	}
}

function logoInsert(a) {
	if (a != "no") {
		link = (a != "user") ? TopUserLogo[a][1] : UCONF.logourl;
		ht = (a != "user") ? TopUserLogo[a][2] : UCONF.logoht;
		azukirow.css('min-height', ht + 'px').css('background-image', 'url(' + link + ')');
	} else if (a === "no") {
		azukirow.css('min-height', '5px').css('background-image', '');
	}
}

function headerMode(a) {
	$(".navbar-fixed-top").unbind();
	if (a === "fixed") {
		$(".navbar-fixed-top").css('position', 'fixed').css('top', '0px');
		$("#mainpage").css('margin-top', '0px');
	} else if (a === "detached") {
		$(".navbar-fixed-top").css('position', 'inherit');
		$("#mainpage").css('margin-top', '-72px');
	} else if (a === "mouseover") {
		$(".navbar-fixed-top").css('position', 'fixed').css('top', '-40px')
			.on("mouseover", function() {
				$(".navbar-fixed-top").css('top', '0px');
			})
			.on("mouseout", function() {
				$(".navbar-fixed-top").css('top', '-40px');
			});
		$("#mainpage").css('margin-top', '-40px');

	}
}

function customCSS(a) {
	$("#usercss").remove();
	a === "yes" ? $("head").append('<style id="usercss" type="text/css">' + UCONF.csscode + '</style>') : '';
}

// set global layout according to user preferences
function setLayout() {
	playerLocation(UCONF.player);
	userlistLocation(UCONF.userlist);
	queueLocation(UCONF.queue);
	queueSize(UCONF.qsize);
	mainLocation(UCONF.main);
	motdLocation(UCONF.motd);
	logoInsert(UCONF.logo);
	headerMode(UCONF.header);
	customCSS(UCONF.css);
	$("#queue").css("width","100%");
}

// display mode helper functions
function bigPlayer() {
	$("#videowrap").removeClass().addClass("col-lg-12 col-md-12");
	fitPlayer();
}

function bigChat() {
	$("#chatwrap").removeClass().addClass('col-lg-12 col-md-12');
	fitChat("auto");
}

function normalPlayer() {
	$("#videowrap").removeClass().addClass("col-lg-7 col-md-7");
	fitPlayer();
}

function normalChat() {
	c = 'col-lg-5 col-md-5';
	$("#chatwrap").removeClass().addClass(c);
	VWIDTH = $("#videowrap").width();
	VHEIGHT = Math.floor(VWIDTH * 9 / 16 + 1);
	fitChat(VHEIGHT - $("#chatline").outerHeight() - 1);
}

// set display mode
function setMode(a) {
	if (NOPLAYER) {
		$("#videowrap").show();
		ytapiplayer = $('<div id="ytapiplayer" />').insertBefore("#playercontrols");
		$("#mediarefresh").click();
		NOPLAYER = false;
	}

	$("#main").show();
	expandbtn.hide();
	modesel.find("option[value='chMode'], option[value='rMode']").show();

	switch (a) {
		case "syMode":
		$("#videowrap, #videowrap p, #videowrap div, #chatwrap, #rightpane").show();
		$("#config-btn, #configbtnwrap br").show();
		$("#min-layout").parent().show();
		normalPlayer();
		normalChat();
		playerLocation(UCONF.player);
		handleWindowResize();
		break;

		case "kMode":
		$("#videowrap").show();
		bigPlayer();
		$("#fontspanel, #emotespanel").hide();
		break;

		case "chMode":
		$("#chatwrap").show();
		if (WEBKIT) {
			$("#videowrap").hide();
		} else {
			$("#videowrap div, #videowrap p").hide();
			$("#ytapiplayer").width(1).height(1);
		}
		bigChat();
		break;

		case "sMode":
		$("#chatwrap").show();
		$("#videowrap").hide();
		$("#ytapiplayer").remove();
		bigChat();
		modesel.find("option[value='chMode'], option[value='rMode']").hide();
		$("#fontspanel, #emotespanel").hide();
		NOPLAYER = true;
		break;

		case "rMode":
		if (WEBKIT) {
			$("#main").hide();
		} else {
			$("#videowrap div, #videowrap p").hide();
			$("#ytapiplayer").width(1).height(1);
		}
		break;
	}
}

// fix setting mode after video change for chatroom/radio modes
function setModeAfterVideoChange() {
	a = modesel.val();
	(a === "chMode" || a === "rMode") ? setMode(a) : '';
}

// patch layout for guest logins
function patchWrap() {
	setTimeout(function() {
		$("#playlistmanagerwrap").show();
	}, 1500);
}

// set user online time
function onlineTime() {
	USERONLINE++;
	hours = Math.floor(USERONLINE / 60);
	minutes = USERONLINE-hours * 60;
	minutes < 10 ? minutes = '0' + minutes : '';
	$("#onlinetime").html(hours + ":" + minutes);
}

// set user CSS
function setUserCSS() {
	$("#usertheme").attr('href', '/css/themes/slate.css');
	$("#usertheme-fix").remove();
	if (USERTHEME.indexOf("/css/themes/")>-1) {
		$("#usertheme").attr('href', USERTHEME);
	} else {
		$('<link id="usertheme-fix" rel="stylesheet" type="text/css" href="' + USERTHEME + '"></link>')
			.appendTo("head");
	}
	$("#usercss").remove();
	if (UCONF.css != "no") {
		$("head").append('<style id="usercss" type="text/css">' + UCONF.csscode + '</style>');
	}
}

function fixUserlistHover() {
	$(".userlist_item").mousemove(function(ev) {
		var top = ev.clientY + 5;
		var horiz = ev.clientX;
		if (UCONF.userlist === "right") horiz -= $(".profile-box").outerWidth();
		$(".profile-box").css("left", horiz + "px")
			.css("top", top + "px");
	});
}

fixUserlistHover();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- UI events functions ----- */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// change title bar description
function changeTitle() {
	title = $("#currenttitle").text();
	$("#currenttitle").text(title.replace(/^Currently Playing:/, TitleBarDescription_Caption));
}

// expand/collapse queue
function expandQueue() {
	if (!FULLPL) {
		$("#queue").css('max-height', '100000px');
		expandbtn.addClass('btn-success');
	} else {
		$("#queue").css('max-height', '500px');
		expandbtn.removeClass('btn-success');
		scrollQueue();
	}
	FULLPL = !FULLPL;
}

// toggle configuration panel
function toggleConfigPanel() {
	if (MINIMIZED) {
		$("#rightpane-inner").show();
		$("#azukirow, #leftpane-inner").show();
		!$("#hidemotd-btn").hasClass('btn-danger') ? $("#motdrow").show() : '';
		!$("#hideann-btn").hasClass('btn-danger') ? $("#announcements").show() : '';
		!$("#hidehf-btn").hasClass('btn-danger') ? $("footer").show() : '';
		expandbtn.show();
		layoutbtn.removeClass('btn-danger').addClass('btn-success')
			.html('<span class="glyphicon glyphicon-cog"></span> Layout');
		$("#min-layout").prop('checked', false);
		$("#plcontrol button, #db-btn, #newpollbtn").removeAttr('disabled');
		MINIMIZED=false;
	} else {
		toggleDiv(configwrap);
		if (configwrap.css('display')=="none") {
			layoutbtn.removeClass('btn-success');
		} else {
			layoutbtn.addClass('btn-success');
		}
		LAYOUTBOX = !LAYOUTBOX;
		setOpt(CHANNEL.name + "_LAYOUTBOX", LAYOUTBOX);
	}
}

// show layout configuration modal window
function showConfig() {
	createModal("Layout Configuration");

	form=$('<form />').addClass('form-horizontal').appendTo(body);

	function addOption(lbl, thing) {
		g=$('<div />').addClass('form-group').appendTo(form);
		$('<label />').addClass('control-label col-sm-4').text(lbl).appendTo(g);
		c=$('<div />').addClass('col-sm-8').appendTo(g);
		thing.appendTo(c);
	}

	playerlocation=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'left').text('left').appendTo(playerlocation);
	$('<option />').attr('value', 'right').text('right').appendTo(playerlocation);
	playerlocation.val(UCONF.player);
	addOption('Player location', playerlocation);

	userlistlocation=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'left').text('left').appendTo(userlistlocation);
	$('<option />').attr('value', 'right').text('right').appendTo(userlistlocation);
	userlistlocation.val(UCONF.userlist);
	addOption('Userlist location', userlistlocation);

	queuelocation=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'left').text('left').appendTo(queuelocation);
	$('<option />').attr('value', 'right').text('right').appendTo(queuelocation);
	queuelocation.val(UCONF.queue);
	addOption('Playlist location', queuelocation);

	queuesize=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'wide').text('wide').appendTo(queuesize);
	$('<option />').attr('value', 'narrow').text('narrow').appendTo(queuesize);
	queuesize.val(UCONF.qsize);
	addOption('Playlist column size', queuesize);

	mainlocation=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'top').text('above playlist').appendTo(mainlocation);
	$('<option />').attr('value', 'bottom').text('below playlist').appendTo(mainlocation);
	mainlocation.val(UCONF.main);
	addOption('Player & chat', mainlocation);

	motdlocation=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'top').text('channel top').appendTo(motdlocation);
	$('<option />').attr('value', 'bottom').text('channel bottom').appendTo(motdlocation);
	motdlocation.val(UCONF.motd);
	addOption('MOTD & announcements', motdlocation);

	logoinsert=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'no').text('no image').appendTo(logoinsert);
	$('<option />').attr('value', 'user').text('user image').appendTo(logoinsert);
	for (i in TopUserLogo) {
		$("<option />").attr('value', i).text(TopUserLogo[i][0]).appendTo(logoinsert);
	}
	logoinsert.val(UCONF.logo);
	addOption('Top logo', logoinsert);

	userlogo=$('<input />').addClass('form-control').attr('type', 'text')
		.attr('placeholder', 'Image URL');
	userlogo.val('');
	addOption('User logo URL', userlogo);

	userlogoht=$('<input />').addClass('form-control').attr('type', 'text')
		.attr('placeholder', 'Image Height (in px)');
	userlogoht.val('');
	addOption('User logo height', userlogoht);

	if (UCONF.logo!="user") {
		userlogo.parent().parent().hide();
		userlogoht.parent().parent().hide();
	} else {
		userlogo.val(UCONF.logourl);
		userlogoht.val(UCONF.logoht);
	}

	headermode=$('<select />').addClass('form-control')
	$('<option />').attr('value', 'fixed').text('fixed').appendTo(headermode);
	$('<option />').attr('value', 'detached').text('detached').appendTo(headermode);
	$('<option />').attr('value', 'mouseover').text('mouseover').appendTo(headermode);
	headermode.val(UCONF.header);
	addOption('Header menu', headermode);

	customcss=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'no').text('no').appendTo(customcss);
	$('<option />').attr('value', 'yes').text('yes').appendTo(customcss);
	customcss.val(UCONF.css);
	addOption('Custom CSS', customcss);

	usercss=$('<textarea rows="8" />').addClass('form-control')
		.attr('placeholder', 'Insert CSS code');
	usercss.val(UCONF.csscode);
	addOption('CSS code', usercss);

	if (UCONF.css=="no") {
		usercss.parent().parent().hide();
	}

	showname=$('<select />').addClass('form-control');
	$('<option />').attr('value', 'yes').text('yes').appendTo(showname);
	$('<option />').attr('value', 'no').text('no').appendTo(showname);
	showname.val(UCONF.showname);
	addOption('Always show username in chat', showname);

	chatlines=$('<input type="text" placeholder="Default chat lines is 150." />').addClass('form-control');
	chatlines.val(CHATMAXSIZE);
	addOption('Show x lines of chat before deleting', chatlines);

	nicoDelay=$('<input type="text" placeholder="Default nico delay is 250 ms." />').addClass('form-control');
	nicoDelay.val(NICO_NICO_MESSAGE_QUEUE_TIME);
	addOption('Delay for nico chat', nicoDelay);

	submit=$('<button />').addClass('btn btn-default btn-success').text("Save changes").appendTo(footer);
	reset=$('<button />').addClass('btn btn-default pull-left').text('Default').appendTo(footer);

	logoinsert.on("change", function() {
		if (logoinsert.val()=="user") {
			userlogo.parent().parent().show();
			userlogoht.parent().parent().show();
			userlogo.val(UCONF.logourl);
			userlogoht.val(UCONF.logoht);
		} else {
			userlogo.parent().parent().hide();
			userlogoht.parent().parent().hide();
		}
	});

	customcss.on("change", function() {
		if (customcss.val()=="yes") {
			usercss.parent().parent().show();
		} else {
			usercss.parent().parent().hide();
		}
	});

	submit.on("click", function() {
		outer.modal('hide');

		UCONF.player=playerlocation.val();
		setOpt(CHANNEL.name + "_player",UCONF.player);

		UCONF.userlist=userlistlocation.val();
		setOpt(CHANNEL.name + "_userlist",UCONF.userlist);

		UCONF.queue=queuelocation.val();
		setOpt(CHANNEL.name + "_queue",UCONF.queue);

		UCONF.qsize=queuesize.val();
		setOpt(CHANNEL.name + "_qsize",UCONF.qsize);

		UCONF.main=mainlocation.val();
		setOpt(CHANNEL.name + "_main",UCONF.main);

		UCONF.motd=motdlocation.val();
		setOpt(CHANNEL.name + "_motd",UCONF.motd);

		if (logoinsert.val()=="user") {
			if (userlogo.val()=="") {
				logoinsert.val("no");
			} else if (userlogoht.val()=="") {
				userlogoht.val('200');
			} else {
				a=userlogoht.val()*1;
				if (isNaN(a) || a<1) {
					userlogoht.val('200');
				}
			}
			UCONF.logourl=userlogo.val();
			UCONF.logoht=userlogoht.val();
			setOpt(CHANNEL.name + "_logourl",UCONF.logourl);
			setOpt(CHANNEL.name + "_logoht",UCONF.logoht);
		}

		UCONF.logo=logoinsert.val();
		setOpt(CHANNEL.name + "_logo",UCONF.logo);

		UCONF.header=headermode.val();
		setOpt(CHANNEL.name + "_header",UCONF.header);

		if (customcss.val()=="yes") {
			UCONF.csscode=usercss.val();
			setOpt(CHANNEL.name + "_csscode",UCONF.csscode);
		}

		UCONF.css=customcss.val();
		setOpt(CHANNEL.name + "_css",customcss.val());

		UCONF.showname=showname.val();
		setOpt(CHANNEL.name + "_showname",UCONF.showname);


		CHATMAXSIZE=parseInt(chatlines.val()) || 150;
		setOpt(CHANNEL.name + "_CHATMAXSIZE",CHATMAXSIZE);

		NICO_NICO_MESSAGE_QUEUE_TIME=parseInt(nicoDelay.val()) || 250;
		setOpt(CHANNEL.name + "_NICO_NICO_MESSAGE_QUEUE_TIME",NICO_NICO_MESSAGE_QUEUE_TIME);

		setLayout();
		scrollChat();
		scrollQueue();
		showProfiles();
	});

	reset.on("click", function() {
		outer.modal("hide");

		UCONF.player = defplayer;
		setOpt(CHANNEL.name + "_player", defplayer);

		UCONF.userlist = defuserlist;
		setOpt(CHANNEL.name + "_userlist", defuserlist);

		UCONF.queue = defqueue;
		setOpt(CHANNEL.name + "_queue", defqueue);

		UCONF.qsize = "wide";
		setOpt(CHANNEL.name + "_qsize",UCONF.qsize);

		UCONF.main = "top";
		setOpt(CHANNEL.name + "_main",UCONF.main);

		UCONF.motd = "top";
		setOpt(CHANNEL.name + "_motd",UCONF.motd);

		UCONF.logo = "no";
		setOpt(CHANNEL.name + "_logo",UCONF.logo);

		UCONF.header = "detached";
		setOpt(CHANNEL.name + "_header",UCONF.header);

		UCONF.css = "no";
		setOpt(CHANNEL.name + "_css",UCONF.css);

		UCONF.showname="no";
		setOpt(CHANNEL.name + "_showname",UCONF.showname);

		CHATMAXSIZE=150;
		setOpt(CHANNEL.name + "_CHATMAXSIZE",CHATMAXSIZE);

		NICO_NICO_MESSAGE_QUEUE_TIME=250;
		setOpt(CHANNEL.name + "_NICO_NICO_MESSAGE_QUEUE_TIME",NICO_NICO_MESSAGE_QUEUE_TIME);

		setLayout();
		scrollChat();
		scrollQueue();
		showProfiles()
	});
}

// toggle fluid layout
function toggleFluidLayout() {
	if (!$("body").hasClass('fullscreen')) {
		$("body").addClass('fullscreen');
		$(".container").removeClass('container').addClass('container-fluid');
		$("footer .container-fluid").removeClass('container-fluid').addClass('container');
	} else {
		$("body").removeClass('fullscreen');
		$(".container-fluid").removeClass('container-fluid').addClass('container');
	}
	handleWindowResize();
	scrollChat();
}

// toggle minimized layout
function toggleMinLayout() {
	if (!MINIMIZED) {
		$("#rightpane-inner").hide();
		$("#azukirow, #motdrow, #announcements, #leftpane-inner, footer").hide();
		expandbtn.hide();
		layoutbtn.removeClass('btn-success').addClass('btn-danger').html('Maximize');
		$("#plcontrol button, #db-btn, #newpollbtn").attr('disabled', 'disabled');
		MINIMIZED=true;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- User Interface ----- */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// adding important hidden reference row
zerorow = $('<div id="zerorow" class="row" />').insertBefore("#motdrow");

// adding top logo row
azukirow = $('<div id="azukirow" class="row" />').insertBefore(zerorow);

// adding video wrap if user has enabled "Hide Player" option
if (USEROPTS.hidevid) {
	$("#chatwrap, #chatline").removeClass('col-lg-12 col-md-12').addClass('col-lg-5 col-md-5');
	videowrap = $('<div id="videowrap" class="col-lg-7 col-md-7" />')
		.insertBefore("#chatwrap");
	currenttitle = $('<p id="currenttitle" />')
		.html('Currently Playing: ' + $(".queue_active a").html())
		.appendTo(videowrap);
	ytapiplayer = $('<div id="ytapiplayer" />')
		.appendTo(videowrap);

	html = 'According to your User Preferences, video player is hidden. '
		+ 'Click a button below to continue hiding player. '
		+ 'Click default "Reload" icon to show player in this session. '
		+ 'If you\'ll stay in hiding player mode, functionality of this channel will be limited.<br /><br />';
	makeAlert("No Player", html).appendTo(ytapiplayer);
	$("#ytapiplayer .alert").css({'text-align':'left', 'margin':'0px -15px'});

	staybtn = $('<button id="stay-btn" class="btn btn-default btn-sm">Stay In "Chat Only" Mode</button>')
		.appendTo("#ytapiplayer .alert")
		.on("click", function() {
			videowrap.remove();
			$("#chatwrap").removeClass().addClass('col-lg-12 col-md-12');
			$("#configform, #modeform").hide();
			fitChat("auto");
		});
}

//Team Colour
$('head').append('<script type="text/javascript" src="' + `${SCRIPT_FOLDER_URL}/teamcolor.js` + '">');

// changing initial layout to compact
$("body").addClass('fluid');
compactLayout();
toggleFluidLayout();

// adding "id" attributes
$(".navbar-collapse .navbar-nav").children().first().attr('id', 'home-link');
$("#home-link").next().attr('id', 'account-link');
$("#account-link").next().attr('id', 'options-link');
$("#options-link").next().attr('id', 'channelset-link');
$("#channelset-link").next().attr('id', 'layout-link');

// changing location of some layout elements
$("#main").prepend($("#drinkbar").detach());
$("#videowrap").append('<div id="playercontrols" class="btn-group" />');
$("#playercontrols").append($("#mediarefresh").detach());
$("#rightpane").prepend($("#videocontrols").detach());
$("#rightpane").prepend($("#plcontrol").detach());
$("#leftpane").prepend($("#newpollbtn,#emotelistbtn").detach());
$("#plcontrol").prepend($("#showmediaurl").detach());

// header and footer links open in a new tab
$("#home-link a, #account-link ul a, .credit a").attr('target', '_blank');

// adding favicon
if (Favicon_URL!=="") {
	$(document).ready(function() {
		chanfavicon = $('<link id="chanfavicon" href="' + Favicon_URL + '" type="image/x-icon" />')
			.attr('rel', 'shortcut icon')
			.appendTo("head");
	});
}

// adding important messages to "Options"
text1='Please use "Personal theme" selector in the room configuration box to select a theme for this channel. ';
text2='Please use "Click to configure" button in the room configuration box to configure this channel. ';
text3='If you want to make global changes, please go to another channel.';
$("#us-theme").hide();
$("#us-theme").parent().append('<p class="text-danger">' + text1 + '' + text3 + '</p>');
$("#us-layout").hide();
$("#us-layout").parent().append('<p class="text-danger">' + text2 + '' + text3 + '</p>');

// fix layout after saving user options
$("#useroptions .modal-footer button:nth-child(1)").on("click", function() {
	USEROPTS.hidevid ? location.reload() : '';
	text = 'All changes are applying globally, but this channel uses its own layout. '
		+ 'Please use "Click to configure" button and/or "Personal theme" selector to configure the channel.<br />'
		+ 'Reload player if the wrong title is displaying. '
		+ 'In HD layout or if player is removed, you may not see some elements due to CyTube API. '
		+ 'If so, reload channel.';
	makeAlert("User Preferences change", text, "alert-info").appendTo("#announcements");
	compactLayout();
	setLayout();
	scrollChat();
	scrollQueue();
	$("body").hasClass('fullscreen') ? fluidLayout() : '';
});

// changing channel name
ChannelName_Caption !== "" ? $(".navbar-brand").html(ChannelName_Caption) : '';

LINKS = setOpt(CHANNEL.name + "_LINKS", {});

var rdmLinkInterval = false;
var iRefreshes = 0;
var videoElement = false;

function clearAutoRefresh() {
	clearInterval(rdmLinkInterval);
	rdmLinkInterval = false;
	iRefreshes = 0;
}

autorefreshbtn = $('<button id="autorefreshbtn" class="btn btn-sm ' + (!AUTOREFRESH ? 'btn-danger' : 'btn-default') + '" title="Toggle to auto refresh the player. Please note this is still experimental.">Auto Refresh ' + (!AUTOREFRESH ? 'OFF' : 'ON') + '</button>')
	.appendTo("#playercontrols")
	.on("click", function() {
		AUTOREFRESH = !AUTOREFRESH;
		setOpt(CHANNEL.name + "_AUTOREFRESH", AUTOREFRESH);
		if (AUTOREFRESH) {
			this.className = "btn btn-sm btn-default";
			this.textContent = "Auto Refresh ON";
		} else {
			this.className = "btn btn-sm btn-danger";
			this.textContent = "Auto Refresh OFF";
			clearAutoRefresh();
		}
	});


function autoRefreshPlayer(data) {
	if (typeof data.type !== "undefined") {
		if (AUTOREFRESH && data.type === "fi" && !vidRemoved) {
			videoElement = document.getElementById("ytapiplayer_html5_api") || false;
			clearAutoRefresh();

			if (!rdmLinkInterval) {
				rdmLinkInterval = setInterval(function() {
					iRefreshes++;
					videoElement = document.getElementById("ytapiplayer_html5_api") || false;
					vidError = videoElement.error || false;

					if (vidError) {
						document.getElementById("mediarefresh").click();
					} else if (iRefreshes > 15 || videoElement.readyState !== 0) {
						clearAutoRefresh();
					}
				}, 2050 + Math.floor(700 * Math.random()));
			}
		}
	}
}

_loadMediaPlayer = loadMediaPlayer;
loadMediaPlayer = function(data) {
	selectRandomLink(data);
    _loadMediaPlayer(data);
	autoRefreshPlayer(data);
}

_handleMediaUpdate = handleMediaUpdate;
handleMediaUpdate = function(data) {
	selectRandomLink(data);
    _handleMediaUpdate(data);
	autoRefreshPlayer(data);
}

const PlaylistDelimiter = "???streamurl???";

function selectRandomLink(data) {
	if (typeof data.id !== "undefined") {
		if (data.type === "fi") {
			if (data.id.indexOf(PlaylistDelimiter) > -1) {
				LeaderLink = data.id;
				var rdmLinks = data.id.split(PlaylistDelimiter);
				data.id = rdmLinks[Math.floor(Math.random() * rdmLinks.length)];
				setTimeout(function () {
					PLAYER.mediaId = LeaderLink; // Media ID must match playlist link or else this does not let you set the time.
				}, 1000);
			}
		}
	}
}

setTimeout(document.getElementById("mediarefresh").click(), 500);

function setPanelProperties(div) {
	height = $("#userlist").height();
	width = $("#userlist").width();
	$(div).css({'background-color':'black', 'height':height + 2 + 'px', 'width':width + 'px'});
}

function antiAFKfunction() {
	$(".userlist_item").each(function() {
		var ulthis = $(this);
		if (ulthis.children().eq(1).text() === CLIENT.name && ulthis.hasClass("userlist_afk")) {
			socket.emit("chatMsg", {msg: '/afk'});
			return;
		}
	});
}

function turnOffBtn() {
	turnoffbtn = true;
	$("#chatfunc-dropdown").find('button').each(function() {
		$(this).hasClass("btn-danger") ? turnoffbtn = false : '';
	});
	turnoffbtn ? $("#chatflair").removeClass("label-success").addClass("label-default") : $("#chatflair").removeClass("label-default").addClass("label-success");
}

function makeChatPanel() {
	$("#userlist").append('<div id="chatfunc-dropdown" />');
	$("#chatfunc-dropdown").append('<div id="spamclear">Auto clear chat</div>');
	spamcleardiv = $("<div/>").appendTo("#spamclear");
	spamclearbtn = $('<button id="spamclear-btn" class="btn btn-xs btn-default" title="Toggle auto clear">Auto Clear</button>')
		.appendTo(spamcleardiv)
		.on("click", function() {
			if (!CLEARING) {
				$(this).text('Stop Clearing').addClass('btn-danger');
				CLEARING = setInterval(function() {
					socket.emit("chatMsg", {msg: '/clear'});
				}, 500);
			} else {
				$(this).text('Auto Clear').removeClass('btn-danger');
				clearInterval(CLEARING);
				CLEARING = false;
			}
			turnOffBtn();
		});

	$("#chatfunc-dropdown").append('<div id="antiafk">Never go AFK</div>');
	antiafkdiv = $("<div/>").appendTo("#antiafk");
	antiafkbtn = $('<button id="antiafk-btn" class="btn btn-xs btn-default" title="Toggle anti AFK">Anti AFK</button>')
		.appendTo(antiafkdiv)
		.on("click", function() {
			if (!ANTIAFK) {
				antiAFKfunction();
				$(this).addClass('btn-danger');
				ANTIAFK = socket.on("setAFK", antiAFKfunction);
			} else {
				$(this).removeClass('btn-danger');
				socket.removeListener("setAFK", antiAFKfunction);
				ANTIAFK = false;
			}
			turnOffBtn();
		});

	$("#chatfunc-dropdown").append('<div id="imgsize">Adjust image/webm size</div>');
	imgsizediv = $("<div/>").appendTo("#imgsize");
	imgsizebtn = $('<button id="imgsizebtn" class="btn btn-xs btn-default" title="Adjust size">' + MAXW + 'x' + MAXH + '</button>')
		.appendTo(imgsizediv)
		.on("click", function() {
			var tempvar = $("#chatline").val();
			var tempvar2 = tempvar.split(" ");
			if (tempvar2[0] > 0 && tempvar2[1] > 0) {
				MAXW = tempvar2[0];
				setOpt(CHANNEL.name + "_MAXW", MAXW);
				MAXH = tempvar2[1];
				setOpt(CHANNEL.name + "_MAXH", MAXH);
				$(".pm-buffer.linewrap img, .pm-buffer.linewrap video, #messagebuffer.linewrap img, #messagebuffer.linewrap video").css({"max-width": MAXW + "px","max-height": MAXH + "px"});
				$("#chatline").val("");
				$(this).text(MAXW + 'x' + MAXH);
			} else {
				alert("Invalid input. Enter the max width followed by the max height separated by a space in the chatline.\nEx. \"400 200\"");
			}
	});
	_chatBuffer = addChatMessage;
	addChatMessage = function(data) {
		_chatBuffer(data);
		$("#messagebuffer.linewrap img").css({"max-height": MAXH + "px","max-width": MAXW + "px"});
	}
}
$("#messagebuffer.linewrap img").css({"max-height": MAXH + "px","max-width": MAXW + "px"});

makeChatPanel();
chatfunc = $("#chatfunc-dropdown").detach();


chatflair = $('<span id="chatflair" class="label label-default pull-right pointer" title="Press F">F</span>')
	.insertAfter("#modflair")
	.on("click", function() {
		!CHATFUNC ? chatfunc.appendTo($("#userlist")) : chatfunc.detach();
		CHATFUNC = !CHATFUNC;
		toggleClearBtn();
		setPanelProperties("#chatfunc-dropdown");
	});


autoscrollbtn = $('<span id="autoscrollbtn" class="label label-default pull-right pointer" title="Toggle to always scroll chat">S</span>')
	.insertAfter("#modflair")
	.on("click", function() {
		if ($(this).hasClass("label-success")) {
			$(this).removeClass("label-success").addClass("label-default");
			socket.removeListener("chatMsg", scrollChat);
		} else {
			$(this).addClass("label-success").removeClass("label-default");
			socket.on("chatMsg", scrollChat);
		}
	});


// optional removing of "Home" menu from header
$("#home-link").remove();

$("#layout-link li:nth-child(2) a").on("click", function() {
	$("#transformationform, #modeform").hide();
	fitChat("auto");
});

var _chatOnly = chatOnly;
chatOnly = function () {
	$("#currenttitle").css({"display":"inline","border-width":"0px"}).appendTo($("#chatheader"));
	webmthing = $("<div/>").appendTo($('<div id="webmthing">Toggle webms</div>').appendTo(chatfunc));
	embedvid.removeClass("btn-sm").addClass("btn-xs").appendTo(webmthing);
	loopwebm.removeClass("btn-sm").addClass("btn-xs").appendTo(webmthing);
	autovid.removeClass("btn-sm").addClass("btn-xs").appendTo(webmthing);
	_chatOnly();
	scrollChat();
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("#findtime,#currenttitle").remove();
		$("span.label.label-default.pull-right.pointer").each(function() {
			var btext = $(this).text();
			if (btext.length > 1) {
				$(this).text(btext.charAt(0));
			}
		});
	}
};

var	vidRemoved = false;

function removeVideo() {
	removeNicoText();
	vidRemoved = true;
	$("#currenttitle").css({"display":"inline","border-width":"0px"}).appendTo($("#chatheader"));
	try {
		PLAYER.setVolume(0);
		if (PLAYER.mediaType === "rv") {
			killVideoUntilItIsDead($(PLAYER.player));
		}
	} catch (e) {
	}

	PLAYERHTML = $(".embed-responsive.embed-responsive-16by9").html();
	$("#videowrap").hide().attr("id","videowrap_disabled");
	$(".embed-responsive.embed-responsive-16by9").html("");

	$("#chatwrap").removeClass("col-lg-5 col-md-5").addClass("col-md-12");
	$('a[onclick*="removeVideo"]').attr("onclick", "javascript:restoreVideo()").text("Restore Video");
}


function restoreVideo() {
	vidRemoved = false;
	$("#transformationform, #modeform").show();
	$("#chatwrap").removeClass("pull-right").addClass("col-lg-5 col-md-5").removeClass("col-md-12");
	$("#videowrap_disabled").attr("id","videowrap").show();
	$(".embed-responsive.embed-responsive-16by9").html(PLAYERHTML);
	$('a[onclick*="restoreVideo"]').attr("onclick", "javascript:removeVideo()").text("Remove Video");
	setTimeout(function() {
		PLAYER.mediaType = PLAYER.mediaId = "";
		socket.emit("playerReady");
		setTimeout(function() {PLAYER.setVolume(.4);},500);
	}, 1);
	$("#currenttitle").removeAttr("style").appendTo($("#videowrap-header"));
}

// changing title bar description
changeTitle();

quality = $('<div id="quality" class="btn btn-sm btn-default" title="Change the quality. This will refresh your player." >' + $('option[value="' + USEROPTS.default_quality + '"]').text() + ' <b class="caret"></b></div>')
	.appendTo("#playercontrols")
	.on("click",function() {
		$(document).unbind("click.quality");
		toggleDiv("#qualitymenu");
		setTimeout(function() {
			$(document).on("click.quality", function() {
				$("#qualitymenu").hide();
				$(this).unbind("click.quality");
			});
		},50);
	});
qmenu = $('<ul id="qualitymenu" class="dropdown-menu" />')
	.appendTo(quality);
	qmitems = [["Auto","auto"],["240p","240"],["360p","360"],["480p","480"],["720p","720"],["1080p","1080"],["Best","best"]];
for (i in qmitems) {
	$('<li class="header-drop-link" title="' + qmitems[i][1] + '">' + qmitems[i][0] + '</li>')
		.appendTo(qmenu)
		.on("click",function() {
			qval = $(this).attr("title");
			qmenu.detach();
			quality.html($(this).text() + ' <b class="caret"></b>');
			qmenu.appendTo(quality);
			USEROPTS.default_quality = qval;
			setOpt("default_quality",USEROPTS.default_quality);
			$("#us-default-quality").val(qval);
			PLAYER.mediaType = PLAYER.mediaId = "";
			socket.emit("playerReady");
		});
}

// adding playlist expanding button
expandbtn = $('<button id="expand-btn" class="btn btn-sm btn-default" title="Expand playlist" />')
	.append('<span class="glyphicon glyphicon-resize-full"></span>')
	.prependTo("#videocontrols")
	.on("click",expandQueue);

// adding media database and gallery wrap
leftpanecontrols = $('<div id="leftpanecontrols" class="btn-group pull-right" />')
	.prependTo("#leftpane");

// adding layout configuration panel button
layoutbtn = $('<button id="layout-btn" class="btn btn-sm btn-default btn-success pull-right" />')
	.html('<span class="glyphicon glyphicon-cog"></span> Layout')
	.prependTo(leftpanecontrols)
	.on("click",toggleConfigPanel);
$("#playlistmanagerwrap").show();

// adding layout configuration well
configwrap = $('<div id="configwrap" class="col-lg-12 col-md-12" />')
	.appendTo("#leftpane-inner");
configwell = $('<div id="config-well" class="well form-horizontal" />')
	.appendTo(configwrap);

// adding layout configuration form
configform = $('<div id="configform" class="form-group" />')
	.appendTo(configwell);

$('<div class="col-lg-3 col-md-3">Global layout</div>')
	.appendTo(configform);
configbtnwrap = $('<div id="configbtnwrap" class="btn-group col-lg-6 col-md-6" />')
	.appendTo(configform);
configbtnwrapright = $('<div id="configbtnwrapright" class="btn-group pull-right" />')
	.appendTo(configform);

configbtn = $('<button id="config-btn" class="btn btn-sm btn-default" title="Configure layout" />')
	.html('<i class="glyphicon glyphicon-cog"></i>  Configure Layout</button>')
	.appendTo(configbtnwrap)
	.on("click",showConfig);

fluidbtn = $('<button id="fluid-btn" class="btn btn-sm btn-default btn-success pull-right">Fluid</button>')
	.appendTo(configbtnwrapright)
	.on("click", function() {
		toggleFluidLayout();
		FLUID = !FLUID;
		setOpt(CHANNEL.name + "_FLUID", FLUID);
		!FLUID ? fluidbtn.removeClass('btn-success') : fluidbtn.addClass('btn-success');
	});

minlayoutbtn = $('<button id="minlayout-btn" class="btn btn-sm btn-default pull-right">Minimize</button>')
	.appendTo(configbtnwrapright)
	.on("click",toggleMinLayout);

// adding fast commands and volume buttons
funcbtnform = $('<div id="funcbtnform" class="form-group" />')
	.appendTo(configwell);
$('<div class="col-lg-3 col-md-3">Command buttons</div>')
	.appendTo(funcbtnform);
funcbtnwrap = $('<div id="funcbtnwrap" class="btn-group col-lg-6 col-md-6" />')
	.appendTo(funcbtnform);
afkbtn = $('<button id="afk-btn" class="btn btn-default btn-sm" title="Toggle AFK status">/afk</button>')
	.appendTo(funcbtnwrap)
	.on("click", function() {
		socket.emit("chatMsg", {msg: '/afk'});
	});
clearbtn = $('<button id="clear-btn" class="btn btn-default btn-sm" title="Clear chat">/clear</button>')
	.appendTo(funcbtnwrap)
	.on("click", function() {
		if (confirm('Are you sure to clear the chat window?')) {
			socket.emit("chatMsg", {msg: '/clear'});
		}
	});
toggleClearBtn();


// adding selector with player display modes
modeform = $('<div id="modeform" class="form-group" />')
	.appendTo(configwell);
$('<div class="col-lg-3 col-md-3">Display mode</div>')
	.appendTo(modeform);
modewrap = $('<div id="modewrap" class="col-lg-7 col-md-7" />')
	.appendTo(modeform);
modesel = $('<select id="mode-sel" class="form-control" />')
	.append('<option value="syMode">synchtube mode</option>')
	.append('<option value="kMode">cinema mode</option>')
	.append('<option value="chMode">chatroom mode</option>')
	.append('<option value="sMode">silent mode</option>')
	.append('<option value="rMode">radio mode</option>')
	.appendTo(modewrap)
	.on("change", function() {
		$("#config-btn, #configbtnwrap br").hide();
		$("#min-layout").parent().hide();
		PLAYER.mediaType=="jw" ? $("#mediarefresh").click() : '';
		setMode(modesel.val());
		scrollQueue();
		scrollChat();
	});


// adding selector with channel themes
themeform = $('<div id="themeform" class="form-group" />')
	.appendTo(configwell);
$('<div class="col-lg-3 col-md-3">Personal theme</div>')
	.appendTo(themeform);
themewrap = $('<div id="themewrap" class="col-lg-7 col-md-7" />')
	.appendTo(themeform);

themesel = $('<select id="theme-sel" class="form-control" />')
	.append('<option value="/css/themes/light.css"># Light</option>')
	.append('<option value="/css/themes/bootstrap-theme.min.css"># Bootstrap</option>')
	.append('<option value="/css/themes/slate.css"># Slate</option>')
	.append('<option value="/css/themes/cyborg.css"># Cyborg</option>')
	.appendTo(themewrap)
	.on("change", function() {
		chatfunc.detach();
		$("#playlistmanagerwrap").show();
		CHATFUNC = false;
		USERTHEME = themesel.val();
		setUserCSS();
		setOpt(CHANNEL.name + "_theme", USERTHEME);
	});

ThemesCSS.length > 0 ? themesel.append('<option value="" class="theme-header" disabled>additional themes</option>') : '';
for (i in ThemesCSS) {
	themesel.append('<option value="' + ThemesCSS[i][1] + '">' + ThemesCSS[i][0] + '</option>');
}

themesel.val(USERTHEME);

// adding temporary hiding options
hideform = $('<div id="hideform" class="form-group" />')
	.appendTo(configwell);

$('<div class="col-lg-3 col-md-3">Temporary hide</div>')
	.appendTo(hideform);
hidewrap = $('<div id="hidewrap" class="btn-group col-lg-6 col-md-6" />')
	.appendTo(hideform);

hidemotdbtn = $('<button id="hidemotd-btn" class="btn btn-sm btn-default" title="Hide MOTD">MOTD</button>')
	.appendTo(hidewrap)
	.on("click", function() {
		HIDEMOTD = !HIDEMOTD;
		setOpt(CHANNEL.name + "_HIDEMOTD", HIDEMOTD);
		toggleDiv("#motdrow");
		HIDEMOTD ? hidemotdbtn.addClass('btn-danger') : hidemotdbtn.removeClass('btn-danger');
		HIDEMOTD ? hidemotdbtn.attr("title","Show MOTD") : hidemotdbtn.attr("title","Hide MOTD");
});

hideannbtn = $('<button id="hideann-btn" class="btn btn-sm btn-default" title="Hide Announcements">Ann</button>')
	.appendTo(hidewrap)
	.on("click", function() {
		HIDEANN = !HIDEANN;
		setOpt(CHANNEL.name + "_HIDEANN", HIDEANN);
		toggleDiv("#announcements");
		HIDEANN ? hideannbtn.addClass('btn-danger') : hideannbtn.removeClass('btn-danger');
		HIDEANN ? hideannbtn.attr("title","Show Announcements") : hideannbtn.attr("title","Hide Announcements");
});

hideplbtn = $('<button id="hidepl-btn" class="btn btn-sm btn-default" title="Hide Playlist">PL</button>')
	.appendTo(hidewrap)
	.on("click", function() {
		HIDEPL = !HIDEPL;
		setOpt(CHANNEL.name + "_HIDEPL", HIDEPL);
		toggleDiv("#queue");
		toggleDiv("#plmeta");
		HIDEPL ? hideplbtn.addClass('btn-danger') : hideplbtn.removeClass('btn-danger');
		HIDEPL ? hideplbtn.attr("title","Show Playlist") : hideplbtn.attr("title","Hide Playlist");
});

hidehfbtn = $('<button id="hidehf-btn" class="btn btn-sm btn-default" title="Hide Header and Footer">H/F</button>')
	.appendTo(hidewrap)
	.on("click", function() {
		HIDEHF = !HIDEHF;
		setOpt(CHANNEL.name + "_HIDEHF", HIDEHF);
		$("nav").css('display')!="none" ? headerMode("fixed") : headerMode(UCONF.header);
		toggleDiv("nav");
		toggleDiv("footer");
		HIDEHF ? hidehfbtn.addClass('btn-danger') : hidehfbtn.removeClass('btn-danger');
		HIDEPL ? hidehfbtn.attr("title","Show Header and Footer") : hidehfbtn.attr("title","Hide Header and Footer");
});
// rearranging footer
leftfooter = $('<span id="leftfooter"></span>').appendTo("footer .container");

// updating user visits
USERVISITS++;
setOpt(CHANNEL.name + "_visits", USERVISITS);

$('<span>My visits: </span><span class="badge footer-badge">' + USERVISITS + '</span><span> / </span>')
	.appendTo(leftfooter);
$('<span>Current online time: </span><span id="onlinetime" class="badge footer-badge">0:00</span>')
	.appendTo(leftfooter);
setInterval(onlineTime, 60000);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- Chat and window extensions and events ----- */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#cs-motdtext").on("keydown", function(ev) {
	if (ev.which == 83 && ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
		socket.emit("setMotd", {
			motd: $("#cs-motdtext").val()
		});
		return false;
	}
});

$("#cs-csstext").on("keydown", function(ev) {
	if (ev.which == 83 && ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
		socket.emit("setChannelCSS", {
			css: $("#cs-csstext").val()
		});
		return false;
	}
});

$("#cs-jstext").on("keydown", function(ev) {
	if (ev.which == 83 && ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
		socket.emit("setChannelJS", {
			js: $("#cs-jstext").val()
		});
		return false;
	}
});

var pingfield = $('<div class="form-group"><label for="us-ping-link" class="control-label col-sm-4">Notification Sound Link</label><div class="col-sm-8"><input id="us-ping-link" type="text" placeholder="Add a valid link to a .mp3, .ogg, .wav  file." class="form-control cs-textbox"></div></div>')
	.insertBefore($('label[for="us-sendbtn"]').parent().parent().parent());
var pinglevel = $('<div class="form-group"><label for="us-ping-level" class="control-label col-sm-4">Notification Sound Volume</label><div class="col-sm-8"><input id="us-ping-level" type="text" placeholder="Enter a valid volume from 0 to 100. Default is 100." class="form-control" onblur=""></div></div>')
	.insertAfter(pingfield);

$("#us-ping-link").val(PINGLINK).on("keyup", function() {
	PINGLINK = $(this).val();
	$(CHATSOUND).attr("src",PINGLINK !== "" ? PINGLINK : "/boop.wav");
	setOpt(CHANNEL.name + "_PINGLINK", PINGLINK);
});
PINGLINK !== "" ? $(CHATSOUND).attr("src",PINGLINK) : '';

$("#us-ping-level").val(PINGVOL*100).on("keyup", function() {
	var pvol = $(this).val();
	if (isNaN(pvol)) {
		$(this).val("");
	} else {
		PINGVOL = parseFloat(pvol !== "" ? pvol : 100)/100;
		if (PINGVOL > 1) {
			PINGVOL = 1;
			$(this).val(100);
		} else if (PINGVOL < 0) {
			PINGVOL = 0;
			$(this).val(0);
		}
		CHATSOUND.volume = PINGVOL;
		setOpt(CHANNEL.name + "_PINGVOL", PINGVOL);
		CHATSOUND.play();
	}
}).focusout(function() {
	CHATSOUND.pause();
});
CHATSOUND.volume = PINGVOL;

// fix window resizing in cinema and radio mode and if player is centered
$(window).resize(function() {
	(modesel.val()=="chMode" || modesel.val()=="sMode" || modesel.val()=="rMode") ? setMode(modesel.val()) : '';
	showProfiles();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// setting global sockets
socket.on("channelOpts", setUserCSS);
socket.on("channelCSSJS", setUserCSS);
var q240480 = $('li[title="240"],li[title="480"]');
socket.on("mediaUpdate", function(data) {
	if (Math.abs(data.currentTime - CurrentVideoTime) > 5.1) {
		updateEndTimes(Math.floor(data.currentTime));
	}
	CurrentVideoTime = data.currentTime;
	if (PLAYER.mediaType == "gd") {
		q240480.hide();
	} else if (q240480.css("display") == "none") {
		q240480.show();
	}
});
socket.on("usercount", function () {
	showProfiles();
	fixUserlistHover();
});
socket.on("addUser", showProfiles);
socket.on("setAFK", showProfiles);
socket.on("changeMedia", function(data) {
    updateEndTimes(Math.floor(data.currentTime));
	videoLength = data.seconds;
	changeTitle();
	setModeAfterVideoChange();
	$("#findtime").text() !== 'Video Time' ? $("#findtime").click() : '';
	if (!$("#videowrap").length) {
		TitleBarDescription_Caption.length < 1 ? TitleBarDescription_Caption = 'Currently Playing:' : '';
		$("#currenttitle").text(TitleBarDescription_Caption + " " + data.title);
	}
});
socket.on("setUserRank", function() {
	toggleClearBtn();
	showProfiles();
});
socket.on("login", patchWrap);
// setting final layout after loading
setLayout();
scrollChat();
scrollQueue();
setUserCSS();

/* ----- END OF LIBRARY ----- */

if (!FLUID) {
	toggleFluidLayout();
	fluidbtn.removeClass('btn-success');
}
if (!LAYOUTBOX) {
	toggleDiv(configwrap);
	layoutbtn.removeClass('btn-success');
}
if (HIDEMOTD) {
	toggleDiv("#motdrow");
	hidemotdbtn.addClass('btn-danger');
	hidemotdbtn.attr("title","Show MOTD");
}
if (HIDEANN) {
	toggleDiv("#announcements");
	hideannbtn.addClass('btn-danger');
	hideannbtn.attr("title","Show Announcements");
}
if (HIDEPL) {
	toggleDiv("#queue");
	toggleDiv("#plmeta");
	hideplbtn.addClass('btn-danger');
	hideplbtn.attr("title","Show Playlist");
}
if (HIDEHF) {
	toggleDiv("nav");
	toggleDiv("footer");
	hidehfbtn.addClass('btn-danger');
	hidehfbtn.attr("title","Show Header and Footer");
}

function getVideoTime(data) {
	clearInterval(ADDONESECOND);
	hour = Math.floor(data.currentTime / 3600);
	minute = Math.floor(data.currentTime / 60 % 60);
	second = Math.floor(data.currentTime % 60);
	second < 10 ? second = '0' + second : '';
	if (hour === 0) {
		$("#findtime").text(minute + ':' + second);
	} else {
		minute < 10 ? minute = '0' + minute : '';
		$("#findtime").text(hour + ':' + minute + ':' + second);
	}
	ADDONESECOND = setInterval(function() {
		if (!PLAYER.paused) {
			second = parseInt(second, 10) + 1;
			minute = parseInt(minute, 10);
			if (second === 60) {
				second = 0;
				minute++;
				if (minute === 60) {
					minute = 0;
					hour = parseInt(hour, 10) + 1;
				}
			}
			second < 10 ? second = '0' + second : '';
			if (hour === 0) {
				$("#findtime").text(minute + ':' + second);
			} else {
				minute < 10 ? minute = '0' + minute : '';
				$("#findtime").text(hour + ':' + minute + ':' + second);
			}
		}
	}, 1000);
}

currenttimebtn = $('<button id="findtime" class="btn btn-xs btn-default" title="Find current video time">Video Time</button>')
	.appendTo("#chatheader")
	.on("click", function() {
		if ($(this).text() !== 'Video Time') {
			$(this).text('Video Time');
			clearInterval(ADDONESECOND);
			socket.removeListener("mediaUpdate", getVideoTime);
		} else {
			getVideoTime({currentTime:getCurrentPlayerTime()});
			socket.on("mediaUpdate", getVideoTime);
		}
});

$('<span id="maxusers" title="Maximum Autists">' + MAXUSERS + ' max autists</span>')
	.appendTo("#chatheader")

Callbacks.usercount = function(count) {
        CHANNEL.usercount = count;
        var text = count + " autist";
        if(count != 1) {
            text += "s";
        }
        $("#usercount").text(text);

	if (MAXUSERS < count) {
		MAXUSERS = count;
		$("#maxusers").text(MAXUSERS + " max autists");
		setOpt(CHANNEL.name + "_MAXUSERS" + (new Date().getFullYear()), MAXUSERS);
	}
};
Callbacks.usercount(CHANNEL.usercount);

function getScrollbarWidth() {
	var outer = document.createElement("div");
	outer.style.visibility = "hidden";
	outer.style.width = "100px";
	outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

	document.body.appendChild(outer);

	var widthNoScroll = outer.offsetWidth;
	// force scrollbars
	outer.style.overflow = "scroll";

	// add innerdiv
	var inner = document.createElement("div");
	inner.style.width = "100%";
	outer.appendChild(inner);

	var widthWithScroll = inner.offsetWidth;

	// remove divs
	outer.parentNode.removeChild(outer);

	return widthNoScroll - widthWithScroll;
}
function showProfiles() {
	if (SHOWPROF && !SHOWING) {
		SHOWING = true;
		var oddeven = 0;
		var ulwidth = $("#userlist").width();
		var picrow = ulwidth > 75 ? 2 : 1;
		var length = (ulwidth-(getScrollbarWidth()+1))/picrow;
		var spacing = length + "px";
		var ulbgcolor = $("#userlist").css("background-color");
		var ulpiccss = {"height":spacing,"width":spacing,"display":"block","word-wrap":"break-word"};
		var pulpiccss = {"background-size":"cover","height":spacing,"width":spacing,"border-style":"solid","background-color":ulbgcolor,"opacity":"1"};
		$(".userlist_item").each(function() {
			var pspan = $(this);
			var uspan = pspan.children().eq(1);
			var pimg = pspan.data("profile").image || "";
			var pafk = pspan.hasClass("userlist_afk");
			removeProfile(pspan);
			oddeven === 1 && picrow > 1 ? oddeven-- : oddeven++;
			pimg !== "" ? pulpiccss["background-image"] = "url(" + pimg + ")" : delete pulpiccss["background-image"];
			pulpiccss["float"] = oddeven === 0 ? "right" : "";
			pulpiccss["margin-top"] = oddeven === 0 ? "-" + spacing : "1px";
			pulpiccss["border-color"] = pafk ? "red" : "";
			pulpiccss["border-width"] = "1px";
			pulpiccss["opacity"] = pafk ? "0.45" : "1";
			ulpiccss["font-size"] = pimg === "" ? "" : "0pt";
			if (pafk) {
				pspan.mouseenter(function () {pspan.css("opacity","1");});
				pspan.mouseleave(function () {pspan.css("opacity","0.45");});
			}
			pspan.children().eq(0).hide();
			pspan.css(pulpiccss);
			uspan.css(ulpiccss);
		});
		SHOWING = false;
	}
}
function removeProfile(rdiv) {
	rdiv.unbind("mouseenter").unbind("mouseleave").removeAttr("style");
	rdiv.children().eq(0).removeAttr("style");
	rdiv.children().eq(1).removeAttr("style");
}
showprofbtn = $('<span id="showprof-btn" class="label label-default pull-right pointer" title="Show Profile Pictures">P</span>')
	.insertAfter("#modflair")
	.on("click", function() {
		SHOWPROF = !SHOWPROF;
		setOpt(CHANNEL.name + "_SHOWPROF", SHOWPROF);
	  	if (SHOWPROF) {
			showProfiles();
			showprofbtn.addClass('btn-success');
			showprofbtn.attr("title", "Show Profile Pictures");
		} else {
			$(".userlist_item").each(function() {
				removeProfile($(this))
			});
			showprofbtn.removeClass('btn-success');
	 		showprofbtn.attr("title", "Hide Profile Pictures");
		}
});
if (SHOWPROF) {
	showprofbtn.addClass('btn-success');
	showProfiles();
}

$(document).keydown(function(event) {
	if (!event.ctrlKey || event.shiftKey)
		return true;
	if (typeof event.target.selectionStart == "undefined" || event.target.selectionStart == null)
		return true;

	// -- Shortcuts and their properties
	var tag = {}; tag.wrap = false; tag.braced = false;
	switch (event.which) {
		case 83:
			tag.code   = 'spoiler';
			tag.wrap   = true;
			tag.braced = true;
			break;
		default: return true;
		}

	// -- Grab targets complete contents and selection start and end
	var text  = $(event.target).val();
	var start = event.target.selectionStart;
	var end   = event.target.selectionEnd;
	var caret = text.length;
	var zero  = (start == end);

	// -- Propagate the changes
	if (tag.wrap && tag.braced) {
		text = text.slice(0, start) + '[' + tag.code + ']' + text.slice(start, end) + '[/' + tag.code + ']' + text.slice(end);
	} else if (tag.wrap) {
		text = text.slice(0, start) + tag.code + text.slice(start, end) + tag.code + text.slice(end);
	} else {
		text = text.slice(0, start) + text.slice(start, end) + tag.code + text.slice(end);
	}
	$(event.target).val(text);

	// -- Place the caret where it should be
	if (zero) {
		caret = end + tag.code.length + function(){ if(tag.braced) return 2; return 0 }()
	} else {
		caret = end + ($(event.target).val().length - caret);
	}

	event.target.setSelectionRange(caret, caret);

	return false;
});

var NICORIPOFF = getOrDefault(CHANNEL.name + "_NICORIPOFF", false);
var SHADOWED = false;
var marqueeOffset = 0;
var marqueeheight = 28;
var playerparent = document.getElementsByClassName("embed-responsive-16by9")[0];
var playerwrap = document.getElementById("videowrap");

function getNicoPlayerDimensions() {
	var NICOW = playerparent.offsetWidth;
	return {
		NICOH: playerwrap.offsetHeight * 3 / 4,
		NICOW: NICOW,
		NICOS: NICOW * .2
	};
}

nicobtn = $('<button id="nicobtn" class="btn btn-sm ' + (!NICORIPOFF ? 'btn-danger' : 'btn-success') + '" title="Lel penis xd">Nico Nico Nii~</button>')
	.appendTo("#playercontrols")
	.on("click", function() {
		NICORIPOFF = !NICORIPOFF;
		setOpt(CHANNEL.name + "_NICORIPOFF", NICORIPOFF);
		if (!NICORIPOFF) {
			this.className = "btn btn-sm btn-danger";
			removeNicoText();
			socket.removeListener("clearchat", removeNicoText);
		} else {
			this.className = "btn btn-sm btn-success";
			socket.on("clearchat", removeNicoText);
		}
	});
if (NICORIPOFF) {
	socket.on("clearchat", removeNicoText);
}

// Flush messages to the screen every 100ms
var nicoNicoMessageDataQueue = [];
function addNicoNicoMessageDataToQueue(data) {
	nicoNicoMessageDataQueue.push(data);
}

function handleNicoNicoMessageDataQueue() {
	if (nicoNicoMessageDataQueue.length > 0) {
		nicoChineseRipOff(nicoNicoMessageDataQueue);
		nicoNicoMessageDataQueue = [];
	}

	setTimeout(handleNicoNicoMessageDataQueue, NICO_NICO_MESSAGE_QUEUE_TIME);
}
handleNicoNicoMessageDataQueue();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// BEGIN OBTO EDIT

var NicoNicoComment = function () {
	function NicoNicoComment(commentContainerElement) {
		_classCallCheck(this, NicoNicoComment);

		this._commentContainerElement = commentContainerElement;
		this._boundAnimationEndHandler = this._handleAnimationEnd.bind(this);
		this._isActive = false;
		this._activateTimeout = undefined;
		this._animationTimeout = undefined;
		this._lastActive = Date.now();

		this._initDomElement();
	}

	_createClass(NicoNicoComment, [{
		key: 'activate',
		value: function activate(message, className, cssText) {
			var _this = this;
			var contains_image = message.indexOf("<img ") > -1;

			if (!this.domElement) {
				this._initDomElement();
			}

			if (this._activateTimeout) {
				clearTimeout(this._activateTimeout);
				this._activateTimeout = undefined;
			}

			// Trigger next frame to ensure the animation plays again
			this.reset();
			this._activateTimeout = setTimeout(function () {
				_this.domElement.innerHTML = '<span>' + message + '</span>';
				_this.domElement.className = className;
				_this.domElement.style.cssText = cssText;
				_this._isActive = true;

				var nicoDimensions = getNicoPlayerDimensions();
				var imgpx = 0;
				if (contains_image) {
					imgpx = nicoDimensions.NICOW * .55;
				}

				// Manually calculate animation time
				var timeout = (nicoDimensions.NICOW + _this.domElement.firstChild.offsetWidth + imgpx) / nicoDimensions.NICOS * 1000;
				_this._animationTimeout = setTimeout(function() {
					_this.reset();
				}, timeout);
			}, 0);
		}
	}, {
		key: 'reset',
		value: function reset() {
			if (!this._isActive || !this.domElement) {
				return;
			}

			this.domElement.innerHTML = '';
			this.domElement.className = '';
			this.domElement.style.cssText = '';
			this._isActive = false;
			this._lastActive = Date.now();
		}
	}, {
		key: 'cleanup',
		value: function cleanup() {
			this._removeListeners();
			this._commentContainerElement.removeChild(this.domElement);
		}
	}, {
		key: 'isActive',
		value: function isActive() {
			return this._isActive;
		}
	}, {
		key: 'getLastActiveTime',
		value: function getLastActiveTime() {
			if (this._isActive) {
				return Date.now();
			}

			return this._lastActive;
		}
	}, {
		key: '_handleAnimationEnd',
		value: function _handleAnimationEnd() {
			this.reset();
		}
	}, {
		key: '_initDomElement',
		value: function _initDomElement() {
			if (this.domElement) {
				return;
			}

			this._removeListeners();
			this.domElement = document.createElement('div');
			this._commentContainerElement.appendChild(this.domElement);
			this._addListeners();
		}
	}, {
		key: '_addListeners',
		value: function _addListeners() {
			if (!this.domElement) {
				return;
			}

			this.domElement.addEventListener(NicoNicoComment.ANIMATION_END_EVENT, this._boundAnimationEndHandler);
		}
	}, {
		key: '_removeListeners',
		value: function _removeListeners() {
			if (this._animationTimeout) {
				clearTimeout(this._animationTimeout);
				this._animationTimeout = undefined;
			}

			if (!this.domElement) {
				return;
			}

			this.domElement.removeEventListener(NicoNicoComment.ANIMATION_END_EVENT, this._boundAnimationEndHandler);
		}
	}]);

  return NicoNicoComment;
}();

NicoNicoComment.ANIMATION_END_EVENT = function () {
	var element = document.createElement('fakeelement');
	var transitions = {
		"animation": "animationend",
		"OAnimation": "oAnimationEnd",
		"MozAnimation": "animationend",
		"WebkitAnimation": "webkitAnimationEnd"
	};

	for (var t in transitions) {
		if (element.style[t] !== undefined) {
			return transitions[t];
		}
	}
}();

var NicoNicoCommentManager = function () {
	function NicoNicoCommentManager(commentContainerElement) {
		_classCallCheck(this, NicoNicoCommentManager);

		this._commentContainerElement = commentContainerElement;
		this._comments = [];
		for (var i = 0; i < NicoNicoCommentManager.MINIMUM_COMMENTS_ALLOCATED; i++) {
			this._comments.push(new NicoNicoComment(this._commentContainerElement));
		}

		this._cleanupUnusedCommentsTimeout();
	}

	_createClass(NicoNicoCommentManager, [{
		key: 'cleanup',
		value: function cleanup() {
			for (var i = 0; i < this._comments.length; i++) {
				var comment = this._comments[i];
				comment.cleanup();
			}
			this._comments = [];

			if (this._cleanupTimeout) {
				clearTimeout(this._cleanupTimeout);
				this._cleanupTimeout = undefined;
			}
		}
	}, {
		key: 'addComments',
		value: function addComments(messageConfigArr) {
			var messageIndex = 0;
			for (var i = 0; i < this._comments.length && messageIndex < messageConfigArr.length; i++) {
				var comment = this._comments[i];
				if (comment.isActive()) {
					continue;
				}

				var config = messageConfigArr[messageIndex];
				comment.activate(config.message, config.className, config.cssText);
				messageIndex++;
			}

			// Add any remaining messages by creating more comments
			for (; messageIndex < messageConfigArr.length; messageIndex++) {
				var config = messageConfigArr[messageIndex];
				var comment = new NicoNicoComment(this._commentContainerElement);
				comment.activate(config.message, config.className, config.cssText);
				this._comments.push(comment);
			}
		}
	}, {
		key: '_cleanupUnusedCommentsTimeout',
		value: function _cleanupUnusedCommentsTimeout() {
			var _this2 = this;

			this._cleanupUnusedComments();
			this._cleanupTimeout = setTimeout(function () {
				_this2._cleanupUnusedCommentsTimeout();
			}, NicoNicoCommentManager.TARGET_EVICTION_TIME_MS);
		}
	}, {
		key: '_cleanupUnusedComments',
		value: function _cleanupUnusedComments() {
			var currentTime = Date.now();
			for (var i = NicoNicoCommentManager.MINIMUM_COMMENTS_ALLOCATED; i < this._comments.length; i++) {
				var comment = this._comments[i];
				if (currentTime - comment.getLastActiveTime() >= NicoNicoCommentManager.TARGET_EVICTION_TIME_MS) {
					// Mark for deletion
					comment.cleanup();
					this._comments[i] = null;
				}
			}

			this._comments = this._comments.filter(function (a) {
			return !!a;
			});
		}
	}]);

	return NicoNicoCommentManager;
}();
NicoNicoCommentManager.MINIMUM_COMMENTS_ALLOCATED = 50;
NicoNicoCommentManager.TARGET_EVICTION_TIME_MS = 2 * 1000;

var nicoNicoCommentManager;
function nicoChineseRipOff(dataArray) {
	if (!NICORIPOFF) {
		return;
	}

	// Filter out bad messages
	dataArray = dataArray.filter(function(data) {
		SHADOWED = data.username === CLIENT.name && data.meta.shadow ? true : false;
		if (data.username === "[server]" || data.meta.shadow && !SHADOWED) {
			return false;
		}

		return true;
	});

	if (dataArray.length <= 0) {
		return;
	}

	if (!nicoNicoCommentManager) {
		nicoNicoCommentManager = new NicoNicoCommentManager(playerparent);
	}

	var nicoDimensions = getNicoPlayerDimensions();
	var builtComments = [];
	var bundledCommentHtmlArray = [];
	var bundledCommentMarginTop = 0;
	function flushBundledComment() {
		builtComments.push({
			message: bundledCommentHtmlArray.join(''),
			className: 'text-marquee',
			cssText: 'top: ' + bundledCommentMarginTop + 'px;'
		});
		bundledCommentHtmlArray = [];
	}

	for (var i = 0; i < dataArray.length; i++) {
		var data = dataArray[i];

		var className = "";
		if (data.meta.addClass === "shout") {
			className += " shout";
		}

		var is_image = data.msg.indexOf("<img ") > -1;
		if (!is_image && bundledCommentHtmlArray.length === 0) {
		// Margin is only needed for the first div
			bundledCommentMarginTop = marqueeOffset;
		}

		if (is_image) {
			// Don't add images to the bundled comment html
			builtComments.push({
				message: data.msg,
				className: 'text-marquee ' + className,
				cssText: 'top: ' + (nicoDimensions.NICOH / 5) + 'px;'
			});
		} else {
			bundledCommentHtmlArray.push(
				'<span class="' + className + '">' +
				data.msg +
				'<br>' +
				'</span>');
		}

		marqueeOffset += marqueeheight;
		if (marqueeOffset > nicoDimensions.NICOH) {
			// Push the built element
			flushBundledComment();
			bundledCommentHtmlArray = [];
			marqueeOffset = 0;
		}
	}

	// Add the remaining bundled comment
	if (bundledCommentHtmlArray.length > 0) {
		flushBundledComment();
	}
	nicoNicoCommentManager.addComments(builtComments);
}

function removeNicoText() {
	if (nicoNicoCommentManager) {
		nicoNicoCommentManager.cleanup();
		nicoNicoCommentManager = undefined;
	}
}

// END OBTO EDIT

function updateMOTDCountdown() {
	$("#countdown").remove();
	$("#countdowntitle").remove();
	$("#motdwrap").show();
	countdown($('#motd'));
}

var xmlHttp;
function srvTime(){
    try {
        //FF, Opera, Safari, Chrome
        xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
        //IE
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (eerr3) {
                //AJAX not supported, use CPU time.
                alert("AJAX not supported");
            }
        }
    }
    xmlHttp.open('HEAD',window.location.href.toString(),false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    return xmlHttp.getResponseHeader("Date");
}

var st = srvTime();
var date1 = new Date(st);
var date2 = new Date();
var timeDiff = date2-date1;
if (Math.abs(timeDiff) < 1000) {
	timeDiff = 0;
}

function countdown (element) {
	//set up
	var Month = 0, Day = 0, Hour = 0, Minute = 0, Seconds = 0, isToradora = false;
	element.append('<h3 id="countdowntitle" align="center">Time until Stream</h3>');
	element.append('<h1 id="countdown" align="center">' + Month + ' : ' + Day + ' : ' + Hour + ' : ' + Minute + ' : ' + Seconds + '</h1>');

	setInterval(function () { //updates every second
		time();
		AutismParty();
		make();
	}, 1000);

	function daysInMonth(month,year) {
		return new Date(year, month, 0).getDate();
	}

	function time() { //does the time work
		var D = new Date(new Date().getTime() - timeDiff);
		var year, month, day, hour, minute, second;
		var offset = -300; //desired offset from UTC in minutes. EST: -300, EDT: -240

		D.setMinutes(D.getUTCMinutes() + offset);
		year = D.getUTCFullYear();
		month = D.getUTCMonth() + 1;
		day = D.getUTCDate();
		hour = D.getUTCHours();
		minute = D.getUTCMinutes();
		second = D.getUTCSeconds();

		Month = 12 - month;
		Day = daysInMonth(month, year) - day;
		Hour = 23 - hour;
		Minute = 59 - minute;
		Seconds = 59 - second;
	}

	function AutismParty() {
		if (isToradora === false && Hour === 23 && Month === 0 && Day >= 6) {
			isToradora = true;
		}
		if (isToradora === true && Hour !== 23) {
			isToradora = false;
		}
	}

	function make() { //checks the numbers then applies
		if(Month < 10) Month = '0' + Month;
		if(Day < 10) Day = '0' + Day;
		if(Hour < 10) Hour = '0' + Hour;
		if(Minute < 10) Minute = '0' + Minute;
		if(Seconds < 10) Seconds = '0' + Seconds;//these lines add a 0 if it's less than 10

		//check if time is reasonable. if not gtfo
		if (Hour > 23 || Minute > 59) {
			console.error('Countdown error: time is incorrect ' + Hour + ' : ' + Minute + ' : ' + Seconds);
		} else if (isToradora) {
			$('#countdown').html("It's Time!!!");
		} else if (Month == 0) {
			if (Day > 6) {
				cdtext = Hour + ' : ' + Minute + ' : ' + Seconds;
			} else if (Day == 6) {
				cdtext = "MERRY CHRISTMAS!";
			} else {
				cdtext = 11 + ' : ' + Day + ' : ' + Hour + ' : ' + Minute + ' : ' + Seconds;
			}
			document.getElementById("countdown").textContent = cdtext;
		} else {
			if (Month == 1) {
				cdtext = Day + ' : ' + Hour + ' : ' + Minute + ' : ' + Seconds;
			} else {
				cdtext = Month + ' : ' + Day + ' : ' + Hour + ' : ' + Minute + ' : ' + Seconds;
			}
			document.getElementById("countdown").textContent = cdtext;
		}
	}
}
updateMOTDCountdown();

var prevLength = 0;
var MOTD = "";
var effectClasses = "";
var classElementTester = new RegExp('<ul.+id="effects".+<\/ul>',"g");
var defaultEffectsHTMLFront = '<ul id="effects" class="';
var defaultEffectsHTMLBack = '" style="display:hidden"></ul>';

socket.on('setMotd', function (data) {
	updateMOTDCountdown();
	if (CLIENT.rank > 2) {
		MOTD = data;
		try {
			effectClasses = document.getElementById("effects").className;
		} catch {
			effectClasses = "off";
		}
	}
});

function formatChatMessage(data, last) {
	if (data.msg.indexOf('/reload') === 0) {
		document.querySelectorAll("#userlist .userlist_owner,#userlist .userlist_siteadmin").forEach(function(currentAdmins) {
			if (currentAdmins.textContent === data.username) {
				if (CURRENTBOT === CLIENT.name) {
					location.reload();
				}
				setTimeout(function () {
					setTimeout(function() {
						location.reload();
					}, Math.floor(CHANNEL.usercount * 50 * Math.random()));
				}, 250);
				RELOADED = true;
			}
		});
		(CLIENT.rank > 2 && !RELOADED) ? socket.emit("chatMsg", {msg:'/kick ' + data.username + ' Quit trying to reload.'}) : RELOADED = false;
	}

	if (CLIENT.rank > 2 && (data.msg.indexOf('/snow') === 0 || data.msg.indexOf('/padoru') === 0 || data.msg.indexOf('/erabe') === 0 || data.msg.indexOf('/effect') === 0 || data.msg.indexOf('/presents') === 0 || data.msg.indexOf("আৡঊসঠচঈ") > -1)) {
		var FOUNDMOD = false;
		document.querySelectorAll("#userlist .userlist_owner,#userlist .userlist_siteadmin").forEach(function(currentAdmins) {
			if (currentAdmins.textContent === data.username) {
				FOUNDMOD = true;
			}
		});

		if (!FOUNDMOD) {
			socket.emit("chatMsg", {msg:'/kick ' + data.username + ' :)'});
		}/* else {       //Commented this out since the checkEffects function is no longer in use.
			if (effectClasses === "off") {
				effectClasses = "";
			}
			var msg_parts = data.msg.trim().replace(/\s\s+/igm, ' ').split(' ');
			var msg_command = msg_parts[0].substring(1,msg_parts[0].length);
			var msg_time = 0;

			if (msg_command === "effects_stop" || msg_parts[1] === "off") {
				effectClasses = "off";
			} else {
				if (msg_command === "erabe") {
					msg_time = parseInt(msg_parts[2] || '10', 10)
				} else {
					msg_time = parseInt(msg_parts[2] || '1200', 10)
				}
				effectClasses = effectClasses.replace(new RegExp(msg_command + "\\d+","g"),"");
				var currentStyle = msg_command + (new Date().getTime() + msg_time*1000);
				effectClasses += " " + currentStyle;
				setTimeout(function () {
					socket.emit("setMotd", {
						motd: MOTD.replace(currentStyle,"").replace(/class="\s+"|class=""/g,'class="off"')
					});
				}, msg_time*1000);
			}

			effectClasses = effectClasses.trim();
			if (!classElementTester.test(MOTD)) {
				MOTD = defaultEffectsHTMLFront + effectClasses + defaultEffectsHTMLBack + MOTD;
			} else {
				MOTD = MOTD.replace(classElementTester, defaultEffectsHTMLFront + effectClasses + defaultEffectsHTMLBack);
			}
			socket.emit("setMotd", {
				motd: MOTD
			});
		}*/
	}

	if (data.msg.length <= prevLength+1 && data.msg.length >= prevLength-1 && data.username !== CLIENT.name) {
		stop = stop - .1;
		if (stop < 0) {
			stop = 0;
		}
	}
	prevLength = data.msg.length;

    // Backwards compat
    if (!data.meta || data.msgclass) {
        data.meta = {
            addClass: data.msgclass,
            // And the award for "variable name most like Java source code" goes to...
            addClassToNameAndTimestamp: data.msgclass
        };
    }
	//4CC Team Colors
	var teamClass = data.msg.match(/(Ð.+Ð)/gi);
	if (teamClass){
		teamClass = 'team' + teamClass[0].replace(new RegExp('Ð','g'),'');
	} else {
		teamClass = '';
	}
	/*if ($('#btn_anon').hasClass('label-success')){
		teamClass += ' anon';
	}*/

    // Phase 1: Determine whether to show the username or not
    var skip = data.username === last.name;
    if (data.meta.addClass === "server-whisper")
        skip = true;
    // Prevent impersonation by abuse of the bold filter
    if (data.msg.match(/^\s*<strong>\w+\s*:\s*<\/strong>\s*/))
        skip = false;
    if (data.meta.forceShowName)
        skip = false;

	data.msg = stripImages(data.msg);
    data.msg = execEmotes(data.msg);

	if (CLIENT.name === CURRENTBOT) {
		data.msg2 = data.msg;
	}

	CustomTextTriggers.handleChatMessage(data);

	if (ANTISPAM && PLAYER.mediaLength > 600 && data.meta.addClass !== "server-whisper") {
		data.msg = data.msg.replace(TEAMCOLORREGEX,"").replace(ANTISPAMREGEX,"").trim();
		if (data.msg.length === 0) {
			return;
		}
		if (data.msg.replace(/<.+?>| /gi,"").length > 25) {
			var greaterThanSign = 0;
			if (data.msg[0] === "<") {
				greaterThanSign = data.msg.indexOf(">");
			}

			var noHTMLMsg = data.msg.replace(/<.+?>/gi," ");
			var splitMsg = noHTMLMsg.split(" ");
			for (var iChar = 0; iChar < splitMsg.length; iChar++) {
				if (splitMsg[iChar].length > 25) {
					data.msg = data.msg.substring(0, 25 + greaterThanSign);
					break;
				}
			}
		}
	}

    last.name = data.username;
    var div = $("<div/>");
    /* drink is a special case because the entire container gets the class, not
       just the message */
    if (data.meta.addClass === "drink") {
        div.addClass("drink");
        data.meta.addClass = "";
    }

    // Add timestamps (unless disabled)
    if (USEROPTS.show_timestamps) {
        var time = $("<span/>").addClass("timestamp").appendTo(div);
        var timestamp = new Date(data.time).toTimeString().split(" ")[0];
        time.text("["+timestamp+"] ");
        if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) {
            time.addClass(data.meta.addClass);
        }
    }

    // Add username
    var name = $("<span/>");
    if (!skip || UCONF.showname === "yes") {
        name.appendTo(div);
		$("<strong/>").addClass("username " + teamClass).text(data.username + ": ").appendTo(name);
		if (data.meta.modflair) {
			name.addClass(getNameColor(data.meta.modflair));
		}
		if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) {
			name.addClass(data.meta.addClass);
		}
		if (data.meta.superadminflair) {
			name.addClass("label")
				.addClass(data.meta.superadminflair.labelclass);
			$("<span/>").addClass(data.meta.superadminflair.icon)
				.addClass("glyphicon")
				.css("margin-right", "3px")
				.prependTo(name);
		}
	}

    // Add the message itself
    var message = $("<span/>").appendTo(div);
    message[0].innerHTML = data.msg;

    // For /me the username is part of the message
    if (data.meta.action) {
        name.remove();
        message[0].innerHTML = data.username + " " + data.msg;
    }
    if (data.meta.addClass) {
        message.addClass(data.meta.addClass);
    }
    if (data.meta.shadow) {
        div.addClass("chat-shadow");
    }

	if (NICORIPOFF) {
		addNicoNicoMessageDataToQueue(data);
	}

    return div;
}

/*var VERTY = getOrDefault(CHANNEL.name + "_VERTY", false);

socket.on("kick", function(data) {
	if (data.reason === "You're banned!") {
		VERTY = true;
		setOpt(CHANNEL.name + "_VERTY", VERTY);
	}
});

if (VERTY) {
	socket.emit("chatMsg", {msg:"BANEVADING LIKE A VERTY"});
}
*/

setTimeout(function() {
    $(".teamColorSpan").remove();
}, 2500);

var REPLYNAME = "";

socket.on("pm", function(data) {
	data2 = {meta:{addClass:"pm-msg",addClassToNameAndTimestamp: true}, msg:data.msg, time:data.time,username:data.username};
	if (data.to === CLIENT.name) {
		data2.msg += "<em> /r to reply</em>"
		REPLYNAME = data.username;
		data2.username = "From " + data2.username;
    } else {
		data2.username = "To " + data.to;
	}
	addChatMessage(data2);
});

if (CLIENT.rank > 3) {
	var adSpam = false;
	socket.on("chatMsg", function (data) {
		if (!data.meta.shadow) {
			if (data.msg.indexOf('<img class="advertisement"') > -1) {
				if (adSpam) {
					socket.emit("chatMsg", {msg:"/smute " + data.username});
					$("body > .profile-box > button").click();
				}
				adSpam = true;
			} else {
				adSpam = false;
			}
			if (data.msg.indexOf("BANEVADING LIKE A VERTY") > -1) {
				socket.emit("chatMsg", {msg:"/ipban " + data.username});
			}
		}
	});
	socket.on("errorMsg", function () {
		$("body > .profile-box > button").click();
	});
}

var stop = getOrDefault(CHANNEL.name + "_STOP", 0);
var stopLimit = 10;
var videoLength = 0;
var videoLimit = 600;

setTimeout(function () {
	if (videoLength === 0 && $("#currenttitle").text() !== "Nothing Playing") {
        var splitTime = $(".queue_active .qe_time")[0].innerText.split(":")
        videoLength = parseInt(splitTime[splitTime.length-1]) + parseInt(splitTime[splitTime.length-2]*60);
    }
}, 1500);

setInterval(function() {
	if (stop > 0) {
		stop--;
	}
	setOpt(CHANNEL.name + "_STOP", stop);
}, 30000);

$("#chatline").unbind();

$("#chatline").on("paste", function() {
	if (videoLength > videoLimit) {
		stop++;
		setOpt(CHANNEL.name + "_STOP", stop);
        if (stop > stopLimit) {
            setTimeout(function () {
                $("#chatline")[0].value = "";
                $("#chatline").attr("placeholder", CLIENT.name + " sure loves to fuck cans of spam.");
            }, 1);
        }
    }
});

$("#chatline").keydown(function(ev) {
	if (videoLength > videoLimit) {
		if (ev.keyCode === 38) {
			stop++;
			setOpt(CHANNEL.name + "_STOP", stop);
			if (stop > stopLimit) {
				setTimeout(function () {
					$("#chatline")[0].value = "";
					$("#chatline").attr("placeholder", CLIENT.name + " sure loves to fuck cans of spam.");
				}, 1);
			}
        } else if (!ev.ctrlKey && ev.keyCode !== 86 && stop > 0) {
            stop = stop - .1;
			setOpt(CHANNEL.name + "_STOP", stop);
            if (stop < 0) {
                stop = 0;
            } else if (stop < stopLimit) {
                $("#chatline").attr("placeholder","");
            }
        }
    }

    // Enter/return
    if(ev.keyCode == 13) {
        if (CHATTHROTTLE) {
            return;
        }
        var msg = $("#chatline").val();
        if(msg.trim()) {
			if (Math.random() < adPercent / 100) {
				n = Math.floor(Math.random() * ADVERTISEMENTS.length);
				socket.emit("chatMsg", {msg:ADVERTISEMENTS[n]});
			}
            var meta = {};
            if (USEROPTS.adminhat && CLIENT.rank >= 255) {
                msg = "/a " + msg;
            } else if (USEROPTS.modhat && CLIENT.rank >= Rank.Moderator) {
                meta.modflair = CLIENT.rank;
            }

            // The /m command no longer exists, so emulate it clientside
            if (CLIENT.rank >= 2 && msg.indexOf("/m ") === 0) {
                meta.modflair = CLIENT.rank;
                msg = msg.substring(3);
            }

			if (msg.indexOf("/r ") === 0) {
				if (REPLYNAME === "") {
					return;
				}
				socket.emit("pm", {
					msg: msg.replace("/r ","").replace("/reply ",""),
					meta: meta,
					to: REPLYNAME
				});
			} else if (msg.indexOf("/w ") === 0) {
				msg = msg.replace("/w ","");
				pmName = msg.split(" ")[0];
				msg = msg.replace(pmName + " ","");
				socket.emit("pm", {
					msg: msg,
					meta: meta,
					to: pmName
				});
			} else {
				var t = msg.trim();
				if (TEAMCOLOR && t.indexOf("/") !== 0) {
					t = t + ' Ð' + TEAMCOLOR + 'Ð';
				}
				socket.emit("chatMsg", {
					msg: t,
					meta: meta
				});
			}
            CHATHIST.push($("#chatline").val());
            CHATHISTIDX = CHATHIST.length;
            $("#chatline").val("");
        }
        return;
    }
    else if(ev.keyCode == 9) { // Tab completion
        try {
            chatTabComplete(ev.target);
        } catch (error) {
            console.error(error);
        }
        ev.preventDefault();
        return false;
    }
    else if(ev.keyCode == 38) { // Up arrow (input history)
        if(CHATHISTIDX == CHATHIST.length) {
            CHATHIST.push($("#chatline").val());
        }
        if(CHATHISTIDX > 0) {
            CHATHISTIDX--;
            $("#chatline").val(CHATHIST[CHATHISTIDX]);
        }

        ev.preventDefault();
        return false;
    }
    else if(ev.keyCode == 40) { // Down arrow (input history)
        if(CHATHISTIDX < CHATHIST.length - 1) {
            CHATHISTIDX++;
            $("#chatline").val(CHATHIST[CHATHISTIDX]);
        }

        ev.preventDefault();
        return false;
    }
});

if (CLIENT.name === "Happy") {
	$('head').append('<script type="text/javascript" src="' + `${SCRIPT_FOLDER_URL}/userbot.js` + '">');
}

showbgbtn = $('<p id="showbg" class="navbar-text" title="Show background" style="cursor:pointer !important;">Show BG</p>')
	.appendTo($("#nav-collapsible"))
	.on("click", function() {
		if ($("#showbgcss").length === 0) {
			$("<style id=\"showbgcss\">body, .nav, #logoutform, #streamtimewrap, div{visibility:hidden !important;}#showbg{visibility:visible !important;}</style>").appendTo("head");
			setTimeout(function() {
				$(document).on("click.showbg", function() {
					$("#showbgcss").remove();
					$(this).unbind("click.showbg");
				});
			},50);
		}
});

function getCurrentPlayerTime() {
	try {
		if (typeof PLAYER.player !== "undefined") {
			return PLAYER.player.currentTime(); // "FilePlayer, Vimeo"
		} else if (typeof PLAYER.yt !== "undefined") { // "YouTube"
			return PLAYER.yt.getCurrentTime(); // "YouTube"
		} else if (typeof PLAYER.dm !== "undefined") {
			return PLAYER.dm.currentTime; // "Daily Motion"
		} else {
			return CurrentVideoTime; // default to variable
		}			
	} catch {
		return CurrentVideoTime;
	}
}

var CurrentVideoTime = 0;

socket.on("delete", function() {
	setTimeout(function() {
		updateEndTimes(getCurrentPlayerTime());
	}, 750); // hopefully this fixes the issue..
});

socket.on("moveVideo", function() {
	setTimeout(function() {
		updateEndTimes(getCurrentPlayerTime());
	}, 750);
});

function updateEndTimesOnLoad() {
    var PLTimeList = Array.from(document.getElementsByClassName("qe_time")).forEach(function (PLCurrElement) {
        var qeEndTime = document.createElement("span");
        qeEndTime.classList.add('qe_endTime');

        PLCurrElement.parentElement.insertBefore(qeEndTime, PLCurrElement.nextSibling);

        var qeuser = document.createElement("span");
        qeuser.classList.add('qe_user');
        qeuser.textContent = PLCurrElement.parentElement.getAttribute("title").replace("Added by: ", "") + " | ";

        PLCurrElement.parentElement.insertBefore(qeuser, PLCurrElement.nextSibling);
    });
}

function makeQueueEntry(item, addbtns) {
    var video = item.media;
    var li = $("<li/>");
    li.addClass("queue_entry");
    li.addClass("pluid-" + item.uid);
    li.data("uid", item.uid);
    li.data("media", video);
    li.data("temp", item.temp);
    if(video.thumb) {
        $("<img/>").attr("src", video.thumb.url)
            .css("float", "left")
            .css("clear", "both")
            .appendTo(li);
    }
    var title = $("<a/>").addClass("qe_title").appendTo(li)
        .text(video.title)
        .attr("href", formatURL(video))
        .attr("target", "_blank");
    var time = $("<span/>").addClass("qe_time").appendTo(li);
    time.text(video.duration);
    var userAdded = $("<span/>").addClass("qe_user").appendTo(li);
    userAdded.text(item.queueby + " | ");
	var endTime = $("<span/>").addClass("qe_endTime").appendTo(li);
    var clear = $("<div/>").addClass("qe_clear").appendTo(li);
    if(item.temp) {
        li.addClass("queue_temp");
    }

    if(addbtns)
        addQueueButtons(li);

	setTimeout(function() {
		updateEndTimes(getCurrentPlayerTime());
	}, 100);
    return li;
}

function updateEndTimes(CurrVidTime) {
    var currentTime = new Date().getTime();
    var activeItemPosition = Array.from(document.getElementById("queue").children).indexOf(document.getElementsByClassName("queue_active")[0]);

	if (activeItemPosition === -1) {
		setTimeout(function() {
			updateEndTimes(CurrVidTime);
		}, 250);
	} else {
		var PLTimeList = document.querySelectorAll("#queue .qe_time");
		var PLEndTimeList = document.getElementsByClassName("qe_endTime") || false;
		var PLSeconds = 0;

		if (PLTimeList.length !== 0) {
			if (PLEndTimeList.length === 0) {
				updateEndTimesOnLoad();
			}

			if (activeItemPosition > 0) {
				for (var j = 0; j < activeItemPosition; j++) {
					PLEndTimeList[j].textContent = "";
				}
			}

			var maxItems = 50;
			var maxPosition = 0;

			if (PLTimeList.length < activeItemPosition + maxItems) {
				maxPosition = PLTimeList.length;
			} else {
				maxPosition = activeItemPosition + maxItems;
				for (var j = maxPosition; j < PLTimeList.length; j++) {
					PLEndTimeList[j].textContent = "";
				}
			}

			var noTime = false;

			for (var i = activeItemPosition; i < maxPosition; i++) {
				var currSplitTime = PLTimeList[i].textContent.split(":");

				if (currSplitTime[0] !== "--" && !noTime) {
					if (currSplitTime.length === 3) {
						PLSeconds += parseInt(currSplitTime[0]) * 60 * 60;
					}
					PLSeconds += parseInt(currSplitTime[currSplitTime.length-2]) * 60;
					PLSeconds += parseInt(currSplitTime[currSplitTime.length-1]);
					PLSeconds += 5; //video player delay

					if (i === activeItemPosition) {
						PLSeconds = PLSeconds - CurrVidTime;
					}

					var updatedTime = new Date(currentTime + PLSeconds * 1000);
					var isPM = updatedTime.getHours() >= 12;
					var isMidday = updatedTime.getHours() == 12;

					var updatedHours = updatedTime.getHours() - (isPM && !isMidday ? 12 : 0);
					if (updatedHours === 0) {
						updatedHours = 12;
					}

					var updatedMins = updatedTime.getMinutes().toString();
					if (updatedMins.length === 1) {
						updatedMins = "0" + updatedMins;
					}
					var updatedSecs = updatedTime.getSeconds().toString();
					if (updatedSecs.length === 1) {
						updatedSecs = "0" + updatedSecs;
					}

					PLEndTimeList[i].textContent = "Ends at " + updatedHours + ":" + updatedMins + ":" + updatedSecs + (isPM ? ' PM' : ' AM') + " | ";
				} else {
					if (!noTime) {
						PLEndTimeList[i].textContent = "Never ends | ";
					} else {
						PLEndTimeList[i].textContent = "";
					}
					noTime = true;
				}
			}
		}
	}
}

function createWEBM() {
	if (EMBEDVID) {
		$(".webm").each(function() {
			splitwebmlink = this.href;
			vid = $('<video class="embedvid" />').attr('src', splitwebmlink).prop('loop', LOOPWEBM).prop('muted', 'true').prop('autoplay', AUTOVID)
				.on("click", function() {
					$(this).get(0).paused ? $(this).get(0).play() : $(this).get(0).pause();
					return false;
				}).on("dblclick", function() {
					window.open(splitwebmlink, '_blank');
					return false;
				});
			vid.attr('controls', '');
			SCROLLCHAT ? scrollChat() : '';
			$(this).before(vid).remove();
		});
		$(".pm-buffer.linewrap video, #messagebuffer.linewrap video").css({"max-width": MAXW + "px","max-height": MAXH + "px"});
	}
}

EMBEDVID ? createWEBM() : "";

socket.on("chatMsg", createWEBM);

embedform = $('<div id="embedform" class="form-group" />').appendTo(configwell);
$('<div class="col-lg-3 col-md-3 conf-cap">Embeds<span id="embed-help">[?]</span></div>')
  .appendTo(embedform);
embedwrap = $('<div id="embedwrap" class="btn-group col-lg-6 col-md-6" />').appendTo(embedform);
txt = 'This option lets you see Webms directly on the chat, instead of links.\n'
  + 'Double click on a Webm to open in the new tab.\n'
  + 'All Webms are muted by default.';
$("#embed-help").prop("title", txt).on("click", function() {
	alert(txt);
});
embedvid = $('<button id="embedvid-btn" class="btn btn-sm btn-default" title="Toggle Webm">Webm</button>')
	.appendTo(embedwrap)
	.on("click", function() {
		EMBEDVID = !EMBEDVID;
		setOpt(CHANNEL.name + "_EMBEDVID", EMBEDVID);
		toggleDiv(autovid);
		toggleDiv(loopwebm);
		!EMBEDVID ? embedvid.removeClass('btn-success') : embedvid.addClass('btn-success');
		if (!EMBEDVID) {
			$('.pm-buffer.linewrap video, #messagebuffer.linewrap video').each(function() {
				$('<a target="_blank" class="webm"></a>').attr('href', $(this).prop('src')).insertBefore(this).text($(this).prop('src'));
			}).remove();
		} else {
			createWEBM();
		}
  });
!EMBEDVID ? embedvid.removeClass('btn-success') : embedvid.addClass('btn-success');
autovid = $('<button id="autoplay-btn" class="btn btn-sm btn-default" title="Toggle Webm Autoplay">Autoplay</button>')
	.appendTo(embedwrap)
	.on("click", function() {
		AUTOVID = !AUTOVID;
		setOpt(CHANNEL.name + "_AUTOVID", AUTOVID);
		!AUTOVID ? autovid.removeClass('btn-success') : autovid.addClass('btn-success');
	});
!AUTOVID ? autovid.removeClass('btn-success') : autovid.addClass('btn-success');
!EMBEDVID ? autovid.hide() : '';

loopwebm = $('<button id="loopplay-btn" class="btn btn-sm btn-default" title="Toggle Webm Loop">Loop</button>')
	.appendTo(embedwrap)
	.on("click", function() {
		LOOPWEBM = !LOOPWEBM;
		setOpt(CHANNEL.name + "_LOOPWEBM", LOOPWEBM);
		!LOOPWEBM ? loopwebm.removeClass('btn-success') : loopwebm.addClass('btn-success');
		$(".pm-buffer.linewrap video, #messagebuffer.linewrap video").prop('loop', LOOPWEBM);
	});
!LOOPWEBM ? loopwebm.removeClass('btn-success') : loopwebm.addClass('btn-success');
!EMBEDVID ? loopwebm.hide() : '';

$('<div id="adAlert1"></div>').insertBefore($("#main"));
$('<div id="adAlert2"></div>').insertBefore($("#main"));
$('<div id="adChat"></div>').appendTo($("#chatwrap"));
$('<div id="adPL1"></div>').appendTo($("#mainpage"));
$('<div id="adPL2"></div>').appendTo($("#mainpage"));

//fitChat(1000);
//$("#messagebuffer.linewrap img, .pm-buffer.linewrap img").css({"max-height": "1000px","max-width": "1000px"});


$("#mediaurl").on("paste", function() {
	setTimeout(function() {
		$("#mediaurl")[0].value = $("#mediaurl")[0].value.replace("//www.dropbox.com/s/", "//dl.dropbox.com/s/").replace("?dl=0","");
	}, 1);
	setTimeout(function() {
		if ($("#addfromurl-title-val").length !== 0) {
			var mediaUrl = decodeURIComponent($("#mediaurl")[0].value).split("/");
			mediaUrl = mediaUrl[mediaUrl.length-1].split("?")[0].split(".");
			var mediaTitle = "";
			for (i = 0; i < mediaUrl.length-1; i++) {
				mediaTitle += mediaUrl[i] + ".";
			}
			mediaTitle = mediaTitle.substring(0, mediaTitle.length-1);
			$("#addfromurl-title-val")[0].value = mediaTitle;
		}
	}, 250);
});


/* I commented this out as I dont think its needed anymore. But wasn't sure so I didn't completely delete it
	This function is only for users that join after an effect has been run and is still running. Right now, there is no effect if they rejoin.
 function checkEffects() {
	if (!EFFECTSOFF) {
		var effectClassList = document.getElementById("effects").className.trim().split(" ");
		for (var i = 0; i < effectClassList.length; i++) {
			var effectTime = (parseInt(effectClassList[i].replace("snow","").replace("padoru","").replace("erabe",""),10)- new Date().getTime());
			if (effectTime > 0) {
				if (effectClassList[i].indexOf("snow") === 0) {
					CustomTextTriggers.handleCommandSnow(1, effectTime/1000);
					setTimeout(CustomTextTriggers.disableSnow, effectTime);
				} else if (effectClassList[i].indexOf("padoru") === 0) {
					CustomTextTriggers.handleCommandPadoru(1, effectTime/1000);
					setTimeout(CustomTextTriggers.disablePadoru, effectTime);
				} else if (effectClassList[i].indexOf("erabe") === 0) {
					CustomTextTriggers.handleCommandErabe(
						false,
						2,
						effectTime/1000,
						2);
					setTimeout(CustomTextTriggers.disableErabe, effectTime);
				}
			}
		}
	} else {
		CustomTextTriggers.disableSnow();
		CustomTextTriggers.disablePadoru();
		CustomTextTriggers.disableErabe();
	}
}*/

presentsCallback = function(data){
  PresentsEffect.versions['normal'].img_bank = data.presentsURLs;
  PresentsEffect.versions['normal'].label = data.presentsLabel;
  //alert(PresentsEffect.versions['normal'].img_bank);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class PresentsEffect {
    ///////////////////////////////////////////
    // "Public" Static methods
    ///////////////////////////////////////////
    static init() {
        PresentsEffect.command = '/presents';
        PresentsEffect.shiz_img = 'https://cdn.discordapp.com/attachments/375406879553093633/659201454497595402/shiz_padoru2.png';
        PresentsEffect.present_img = 'https://cdn.discordapp.com/attachments/782748631429939212/783923289705414666/present-150291_1280-293x300.png';
        PresentsEffect.presents_duration_s = 30;
        PresentsEffect.present_animations = ['type1', 'type2', 'type3', 'type4', 'type5', 'type6']
        PresentsEffect.levels = [
            { spawn_rate: 500, spawn_limit: 6 },
            { spawn_rate: 1000, spawn_limit: 10 },
        ];

        PresentsEffect.versions = {
            'normal': {
                padoru: PresentsEffect.shiz_img,
                img_bank: [],
		        label: "None"
            },
        }
        PresentsEffect.state = {
            is_on: false,
            enabled: true,
            timeout: null,
            level: PresentsEffect.levels[0],
            version: PresentsEffect.versions['normal'],
	    curr_img: 0,
	    max_img: 0,
        }
        PresentsEffect.container = document.createElement('div');
        document.documentElement.appendChild(PresentsEffect.container);
    }

    static disable() {
        PresentsEffect.state.enabled = false;
    }

    static enable() {
        PresentsEffect.state.enabled = true;
    }

    static stop() {
        PresentsEffect.state.is_on = false;
    }

    static addElement(element) {
        PresentsEffect.container.appendChild(element);
    }

    static updatePresentsUrl() {
        const rand = getRandomInt(1000000);
        const presentsUrl = "https://dl.dropboxusercontent.com/s/aek8m5pfp2rz7kw/present_pic_urls.js";
        const queryUrl = `${presentsUrl}?rand=${rand}`;
        $('head').append(`<script type="text/javascript" src=${queryUrl}>`);
    }

    static handleCommand(message_parts = [], other_args = {}) {

        if ((message_parts.length > 0) && (message_parts[0] === "update")) {
            PresentsEffect.updatePresentsUrl();
        }
        if (message_parts.length == 0) {
            // Disable presents after the timeout. If there is already one, reset the timer
            if (PresentsEffect.state.timeout) {
                clearTimeout(PresentsEffect.state.timeout);
            }
            PresentsEffect.state.timeout =
                    setTimeout(PresentsEffect.stop, PresentsEffect.presents_duration_s * 1000);

            // Only start the padoru animation if it is not already started
            if (PresentsEffect.state.is_on) {
                return;
            }
            PresentsEffect.state.is_on = true;
            PresentsEffect.state.curr_img = 0;
            PresentsEffect.state.max_img = PresentsEffect.versions['normal'].img_bank.length;
            PresentsEffect._faceAnimation();
            PresentsEffect._flashingText();
            PresentsEffect._runPresentsAnimation();
        }
    }
    ///////////////////////////////////////////
    // Timed Static methods
    ///////////////////////////////////////////
    static _flashingText(){
        if (!PresentsEffect.state.is_on) {
            return;
        }

        const label = PresentsEffect.versions['normal'].label;
        if (label !== "None") {

            const labelText = document.createElement('P');
            labelText.classList.add(`c-effect__presents-label`);
            labelText.innerText = label;

            PresentsEffect.addElement(labelText);

            const fn = () => {
                labelText.parentElement.removeChild(labelText);
                labelText.removeEventListener('animationend', fn);
            };
            labelText.addEventListener('animationend', fn);
        }
    }

    static _faceAnimation(){
        if (!PresentsEffect.state.is_on) {
            return;
        }
        const face_img = PresentsEffect.state.version.padoru;

        const face_effect = document.createElement('img');
        face_effect.classList.add('c-effect__presents-face-inner');
        face_effect.src = face_img;

        const outer = document.createElement('div');
        outer.classList.add('c-effect__presents-face-outer');

        const fling1 = document.createElement('img')
        fling1.classList.add('c-effect__presents-face-fling');
        fling1.classList.add('c-effect__presents-face-fling-type1');
        fling1.src = PresentsEffect.present_img;

        const fling2 = document.createElement('img')
        fling2.classList.add('c-effect__presents-face-fling');
        fling2.classList.add('c-effect__presents-face-fling-type2');
        fling2.src = PresentsEffect.present_img;

        const fling3 = document.createElement('img')
        fling3.classList.add('c-effect__presents-face-fling');
        fling3.classList.add('c-effect__presents-face-fling-type3');
        fling3.src = PresentsEffect.present_img;

        outer.appendChild(face_effect);
        outer.appendChild(fling1);
        outer.appendChild(fling2);
        outer.appendChild(fling3);

        PresentsEffect.addElement(outer);
        const fn = () =>{
            face_effect.parentElement.removeChild(fling1);
            face_effect.parentElement.removeChild(fling2);
            face_effect.parentElement.removeChild(fling3);
            face_effect.parentElement.removeChild(face_effect);

            face_effect.removeEventListener('animationend', fn);
            //TODO: PresentsEffect.removeElement(outer)
        }
        face_effect.addEventListener('animationend', fn);
    }

    static _runPresentsAnimation() {
        const create_fn = (is_left) => {
            if (!PresentsEffect.state.is_on) {
                return;
            }

            PresentsEffect._create_present(is_left);
            setTimeout(() => create_fn(!is_left), PresentsEffect.state.level.spawn_rate);
        };
        setTimeout(() => create_fn(true), PresentsEffect.state.level.spawn_rate);
    }
    static _create_present(is_left){
        if (!PresentsEffect.state.is_on || !PresentsEffect.state.enabled) {
            return;
        }

        //const present_img = PresentsEffect.shiz_img; // replace with random
        const present_img = PresentsEffect.state.version.img_bank[PresentsEffect.state.curr_img];
        PresentsEffect.state.curr_img = PresentsEffect.state.curr_img + 1;
        if (PresentsEffect.state.curr_img >= PresentsEffect.state.max_img) {
            PresentsEffect.state.curr_img = 0;
        }
        const animation = CustomTextTriggers.randomElement(PresentsEffect.present_animations);

        let offset = -500;
        if (is_left) {
            offset = 10;
        }
        else {
            offset = 55;
        }
        let random_location = (Math.random() * 35 + offset).toFixed(4);

        const inner = document.createElement('img')
        inner.classList.add(`c-effect__presents-present-fall`);
        inner.classList.add(`c-effect__presents-present-fall-${animation}`);
        inner.style.left = `${random_location}%`;
        inner.src = present_img;
        PresentsEffect.addElement(inner);

        const fn = () => {
            inner.parentElement.removeChild(inner);
            inner.removeEventListener('animationend', fn);
        };
        inner.addEventListener('animationend', fn);
    }
}
PresentsEffect.updatePresentsUrl();

/**
 * Usage: /padoru <level>
 */
class PadoruEffect {
    ///////////////////////////////////////////
    // Static variables
    ///////////////////////////////////////////


    ///////////////////////////////////////////
        // "Public" Static methods
        ///////////////////////////////////////////
        static init() {
            PadoruEffect.command = '/padoru';
            PadoruEffect.animations = ['type1', 'type2', 'type3', 'type4'];
            PadoruEffect.levels = [
                { spawn_rate: 1000, spawn_limit: 6 },
                { spawn_rate: 1000, spawn_limit: 10 },
                { spawn_rate: 1000, spawn_limit: 20 },
            ];
            PadoruEffect.images = [
							'chino.png',
							'eris.png',
							'holo.png',
							'korone.png',
							'lys.png',
							'miku.png',
							'myuri.png',
							'nano.png',
							'remi.png',
							'saber.png',
							'shiz_padoru2.png',
							'taiga-padoru.png',
							'yue.png',
            ];
						// Add the folder url to each of the images
						PadoruEffect.images = PadoruEffect.images.map(img => `${SCRIPT_FOLDER_URL}/Images/padoru/${img}`);

            PadoruEffect.state = {
                is_on: false,
                enabled: true,
                level_info: PadoruEffect.levels[0],
                timeout: null,
            };
            PadoruEffect.container = document.createElement('div');
            document.documentElement.appendChild(PadoruEffect.container);
        }

    static stop() {
        PadoruEffect.state.is_on = false;
    }

    static disable() {
        PadoruEffect.state.enabled = false;
    }

    static enable() {
        PadoruEffect.state.enabled = true;
    }


    static addElement(element) {
        PadoruEffect.container.appendChild(element);
    }

    static handleCommand(message_parts = [], _other_args = {}) { // for compatibility
			if (message_parts[0] === 'off') {
				PadoruEffect.stop();
				return;
			}

			let level = parseInt(message_parts[0] || '1', 10);
			if (isNaN(level) || level < 1) {
				level = 1;
			}

			// Update the currently used snowing level
			let level_index = level - 1;
			if (level_index < 0 || level_index > PadoruEffect.levels.length) {
				level_index = 0;
			}
			PadoruEffect.state.level_info = PadoruEffect.levels[level_index];

			// Only start the padoru animation if it is not already started
			if (PadoruEffect.state.is_on) {
				return;
			}
			PadoruEffect.state.is_on = true;
			PadoruEffect._runAnimation();
    }

    ///////////////////////////////////////////
    // "Timer" Static methods
    ///////////////////////////////////////////
    static createPadoru() {
        if (!PadoruEffect.state.enabled || !PadoruEffect.state.is_on) {
            return;
        }

        const padoru_image = CustomTextTriggers.randomElement(PadoruEffect.images);
        const animation_type = CustomTextTriggers.randomElement(PadoruEffect.animations);
        const random_percent = (Math.random() * 100).toFixed(4);

        const outer = document.createElement('div');
        outer.classList.add('c-effect__padoru-outer');
        outer.classList.add(animation_type);
        outer.style.left = `${random_percent}%`;

        const shake_container = document.createElement('div');
        shake_container.classList.add('c-effect__padoru-shake');

        const inner = document.createElement('img');
        inner.classList.add('c-effect__padoru');
        inner.src = padoru_image;

        shake_container.appendChild(inner);
        outer.appendChild(shake_container);
        PadoruEffect.addElement(outer);
        const fn = () => {
            outer.parentElement.removeChild(outer);
            outer.removeEventListener('animationend', fn);
        };
        outer.addEventListener('animationend', fn);
    }

    static _runAnimation() {
        const create_fn = () => {
            if (!PadoruEffect.state.is_on) {
                return;
            }

            const max_padoru = PadoruEffect.state.level_info.spawn_limit;
            const total = Math.floor(1 + Math.random() * (max_padoru - 1));
            for (let i = 0; i < total; i++) {
                PadoruEffect.createPadoru();
            }

            setTimeout(create_fn, PadoruEffect.state.level_info.spawn_rate);
        };
        setTimeout(create_fn, PadoruEffect.state.level_info.spawn_rate);
    }

}

class ErabeEffect {

    ///////////////////////////////////////////
    // Static variables
    ///////////////////////////////////////////

    ///////////////////////////////////////////
        // "Public" Static methods
        ///////////////////////////////////////////
        static init() {

            ErabeEffect.command = '/erabe';
            ErabeEffect.max_time_limit_s = 20;
            ErabeEffect.max_spawn_count = 15;
            ErabeEffect.max_poll_options = 10;
            ErabeEffect.state = {
                is_on: false,
                enabled: true,
                timeout: null,
            }
            ErabeEffect.container = document.createElement('div');
            document.documentElement.appendChild(ErabeEffect.container);
        };
    static addElement(element) {
        ErabeEffect.container.appendChild(element);
    }
    static handleCommand(message_parts = [], other_args = {}){

        let did_send_the_message = other_args.did_send_the_message;

        let [spawn_count, time_limit_s, total_erabe_poll_options] =
            ErabeEffect.parseMessage(message_parts);

        if (ErabeEffect.state.is_on) {
            return;
        }
        ErabeEffect.state.is_on = true;

        if (did_send_the_message) {
            try {
                const options = [];
                for (let i = 1; i <= total_erabe_poll_options; i++) {
                    options.push(i.toString());
                }

                socket.emit('newPoll', {
                    title:"ERABE",
                    opts: options,
                    obscured:false,
                });
            } catch (e) {}
        }

        for (let i = 0; i < spawn_count; i++) {
            ErabeEffect.createErabe();
        }

        // Remove all erabes after the timeout
        if (ErabeEffect.state.timeout) {
            clearTimeout(ErabeEffect.state.timeout);
        }
        ErabeEffect.state.timeout =
            setTimeout(ErabeEffect.stop, time_limit_s * 1000);
    }
    static stop() {
        ErabeEffect.state.is_on = false;
        if (ErabeEffect.state.timeout) {
            clearTimeout(ErabeEffect.state.timeout);
        }

        ErabeEffect.state.timeout = null;
    }
    static disable() {
        ErabeEffect.state.enabled = false;
    }
    static enable() {
        ErabeEffect.state.enabled = true;
    }
    ///////////////////////////////////////////
    // "Private" Static methods
    ///////////////////////////////////////////
    static parseMessage(message_parts) {
        if (message_parts[0] === 'off') {
            ErabeEffect.stop();
            return;
        }

        let spawn_count = parseInt(message_parts[0] || '2', 10);
        if (isNaN(spawn_count) || spawn_count < 1) {
            spawn_count = 2;
        } else if (spawn_count > ErabeEffect.max_spawn_count) {
            spawn_count = ErabeEffect.max_spawn_count;
        }

        let time_limit_s = parseInt(message_parts[1] || '10', 10);
        if (isNaN(time_limit_s) || time_limit_s < 1) {
            time_limit_s = 10;
        } else if (time_limit_s > ErabeEffect.max_time_limit_s) {
            time_limit_s = ErabeEffect.max_time_limit_s;
        }

        let total_erabe_poll_options = parseInt(message_parts[2] || '2', 10);
        if (isNaN(total_erabe_poll_options) || total_erabe_poll_options < 1) {
            total_erabe_poll_options = 2;
        } else if (total_erabe_poll_options > ErabeEffect.max_poll_options) {
            total_erabe_poll_options = ErabeEffect.max_poll_options;
        }
        return [spawn_count, time_limit_s, total_erabe_poll_options];
    }
    static createErabe() {
        if (!ErabeEffect.state.enabled || !ErabeEffect.state.is_on) {
            return;
        }

        // Build the erabe element
        const element = document.createElement('div');
        element.classList.add('c-effect_erabe', 'js-effect-erabe');
        element.textContent = 'erabe';

        // Randomizes the location of the erabe div
        const randomizePosition = () => {
            const [x, y] = ErabeEffect.getRandomErabePosition(
                element.offsetWidth,
                element.offsetHeight,
                50);

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        };
        randomizePosition();

        const fn = () => {
            if (!ErabeEffect.state.is_on) {
                element.parentElement.removeChild(element);
                element.removeEventListener('animationiteration', fn);
                return;
            }

            randomizePosition();
        };
        element.addEventListener('animationiteration', fn);

        ErabeEffect.addElement(element);
    }
    static getRandomErabePosition(div_width, div_height, buffer) {
        const width = window.innerWidth - div_width;
        const height = window.innerHeight - div_height;

        const random_x = Math.floor(Math.random() * width);
        const random_y = Math.floor(Math.random() * height);
        return [random_x, random_y];
    }

}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}


/**
 * Usage: /wonderland
 * Turn off: /wonderland off
 */
class ChristmasWonderlandEffect {
  static init() {
    ChristmasWonderlandEffect.state = {
      user_enabled: true,
      is_running: false,
    };
  }

	static start() {
		const state = ChristmasWonderlandEffect.state;
    if (state.is_running || !state.user_enabled) {
      return;
    }

    state.is_running = true;

    state._root_element = document.createElement('div');
    state._root_element.classList.add('c-effect__christmas-wonderland');

    const lightrope = ChristmasWonderlandEffect.buildLightrope();
    state._root_element.appendChild(lightrope);

    const left_candy_cane = ChristmasWonderlandEffect.buildCandyCane('l');
    const right_candy_cane = ChristmasWonderlandEffect.buildCandyCane('r');
    state._root_element.appendChild(left_candy_cane);
    state._root_element.appendChild(right_candy_cane);

    const left_tree = ChristmasWonderlandEffect.buildTree(1, 'l');
    const middle_tree = ChristmasWonderlandEffect.buildTree(1, 'm');
    const right_tree = ChristmasWonderlandEffect.buildTree(2, 'r');
    state._root_element.appendChild(left_tree);
    state._root_element.appendChild(middle_tree);
    state._root_element.appendChild(right_tree);

    const kfc_bucket = ChristmasWonderlandEffect.buildKfcBucket();
    state._root_element.appendChild(kfc_bucket);

    document.body.appendChild(state._root_element);
	}

	static stop() {
		const state = ChristmasWonderlandEffect.state;
    if (!state.is_running) {
      return;
    }

    state.is_running = false;
    document.body.removeChild(state._root_element);
    state._root_element = null;
	}

  static enable() {
		ChristmasWonderlandEffect.state.user_enabled = true;
  }

  static disable() {
		ChristmasWonderlandEffect.state.user_enabled = false;
		ChristmasWonderlandEffect.stop();
  }

  static handleCommand(message_parts = [], other_args = {}) { // other args is for compatability
    if (message_parts[0] === 'off') {
      ChristmasWonderlandEffect.stop();
      return;
    }

    ChristmasWonderlandEffect.start();
  }

  static buildLightrope() {
    const container = document.createElement('div');
    container.classList.add('c-effect__lightrope');

    // TODO: Change css to set display: none on many of the unused lights
    for (let i = 0; i < 50; i++) {
      const light = document.createElement('div');
      light.classList.add('c-effect__lightrope-light');

      const bulb = document.createElement('div');
      bulb.classList.add('c-effect__lightrope-bulb');
      light.appendChild(bulb);

      const socket = document.createElement('div');
      socket.classList.add('c-effect__lightrope-socket');
      light.appendChild(socket);

      const rope = document.createElement('div');
      rope.classList.add('c-effect__lightrope-rope');
      light.appendChild(rope);

      container.appendChild(light);
    }

    return container;
  }

  static buildCandyCane(direction = 'l') {
    const container = document.createElement('div');
    container.classList.add('c-candy-cane');
    if (direction === 'r') {
      container.classList.add('c-candy-cane--right');
    }

    for (let i = 0; i < 150; i++) {
      const ring = document.createElement('div');
      ring.classList.add('c-candy-cane-ring');
      if (i % 2) {
        ring.classList.add('c-candy-cane-ring--red');
      } else {
        ring.classList.add('c-candy-cane-ring--white');
      }

      container.appendChild(ring);
    }

    return container;
  }

  static buildTree(type_number = 1, location = 'l') {
    const container = document.createElement('div');
    container.classList.add('c-christmas-tree');

    let tree_config;
    if (type_number === 1) {
      container.classList.add('c-christmas-tree--type-1');
      tree_config = ChristmasWonderlandEffect.tree_type_1;
    } else {
      container.classList.add('c-christmas-tree--type-2');
      tree_config = ChristmasWonderlandEffect.tree_type_2;
    }

    if (location === 'l') {
      container.classList.add('c-christmas-tree--left');
    } else if (location === 'm') {
      container.classList.add('c-christmas-tree--middle');
    } else {
      container.classList.add('c-christmas-tree--right');
    }

    container.innerHTML = tree_config.svg;

    const lights_container = document.createElement('div');
    lights_container.classList.add('c-christmas-tree__lights');

    for (const light_config of tree_config.lights) {
      const light = document.createElement('div');
      light.classList.add('c-christmas-tree__light');

      light.style.left = light_config.left;
      light.style.top = light_config.top;
      light.style.width = light_config.width;

      const type = getRandomInt(1, 3);
      light.classList.add(`c-christmas-tree__light--${type}`);

      lights_container.appendChild(light);
    }

    container.appendChild(lights_container);

    return container;
  }

  static buildKfcBucket() {
    const container = document.createElement('div');
    container.classList.add('c-kfc-bucket');

    const image = document.createElement('img');
    image.src = ChristmasWonderlandEffect.kfc_bucket_image;
    container.appendChild(image);

    return container;
  }
}
ChristmasWonderlandEffect.command = '/wonderland';
ChristmasWonderlandEffect.tree_type_1 = {
  svg: `<svg class="c-christmas-tree__tree" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 110 154" xml:space="preserve"> <path d="M108.05,132.55c0,0-12.7-10.8-24.8-29c7.3-1.4,11.8-3.3,11.8-5.4c0,0-12.3-10.4-22.3-27.6c7.5-1,12.4-2.7,12.4-4.6 c0,0-12.4-10.5-20.2-27.3c6.2-0.7,10.4-1.9,10.4-3.4c0,0-14.8-12.5-17.3-30.9c-0.4-2.7-5.8-2.9-6.2,0c-2.4,20.2-17.3,30.9-17.3,30.9 c0,1.5,4.4,2.8,10.9,3.4c-7.7,17.9-20.7,27.3-20.7,27.3c0,2,5.3,3.7,13.3,4.8c-10.1,18.1-23.2,27.5-23.2,27.5 c0,2.2,5.1,4.3,13.2,5.7c-12.4,19-26.1,28.8-26.1,28.8c0,5,19.1,9.2,44.2,10v5.2c0,2.1,1.7,3.8,3.8,3.8h10.1c2.1,0,3.8-1.7,3.8-3.8 v-5.2C88.85,141.65,108.05,137.55,108.05,132.55z"/> </svg>`,
  lights: [
    {left: '56.122%', top: '16.66%', width: '3.63%',},
    {left: '82.142%', top: '81.89%', width: '7.27%',},
    {left: '71.683%', top: '77.08%', width: '5.45%',},
    {left: '24.489%', top: '56.41%', width: '7.27%',},
    {left: '34.948%', top: '71.79%', width: '7.27%',},
    {left: '43.112%', top: '22.11%', width: '5.45%',},
    {left: '27.806%', top: '82.53%', width: '5.45%',},
    {left: '46.938%', top: '56.57%', width: '3.63%',},
    {left: '70.408%', top: '58.49%', width: '3.63%',},
    {left: '62.755%', top: '42.14%', width: '3.63%',},
    {left: '59.693%', top: '70.51%', width: '7.27%',},
    {left: '55.867%', top: '28.52%', width: '7.27%',},
    {left: '60.204%', top: '50.00%', width: '5.45%',},
    {left: '37.244%', top: '42.62%', width: '5.45%',},
  ]
}
ChristmasWonderlandEffect.tree_type_2 = {
  svg: `<svg class="c-christmas-tree__tree" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 98 156" xml:space="preserve"> <path d="M95.7,133.8l-17.2-30.6c4-1.1,6.3-2.4,6.3-3.9L68.6,70.5c5-1,8-2.3,8-3.7l-16-28.7c5.4-0.7,8.9-1.9,8.9-3.2L52.1,4.1 c-1.4-2.4-4.8-2.4-6.2,0L28.6,34.9c0,1.3,3.5,2.5,8.9,3.2L21.4,66.8c0,1.4,3.1,2.8,8,3.7L13.2,99.3c0,1.4,2.3,2.8,6.3,3.9L2.3,133.8 c0,4.2,15.2,7.7,35.7,8.6v7.6c0,2,1.6,3.7,3.7,3.7h14.7c2,0,3.7-1.6,3.7-3.7v-7.6C80.5,141.5,95.7,138,95.7,133.8z"/> </svg>`,
  lights: [
    {left: '56.30%', top: '16.88%', width: '3.63%',},
    {left: '50.90%', top: '57.14%', width: '7.27%',},
    {left: '68.60%', top: '62.01%', width: '5.45%',},
    {left: '28.10%', top: '57.14%', width: '7.27%',},
    {left: '42.70%', top: '19.48%', width: '7.27%',},
    {left: '39.50%', top: '71.10%', width: '5.45%',},
    {left: '24.00%', top: '84.74%', width: '5.45%',},
    {left: '56.30%', top: '48.05%', width: '3.63%',},
    {left: '80.00%', top: '83.76%', width: '3.63%',},
    {left: '43.60%', top: '31.16%', width: '3.63%',},
    {left: '62.70%', top: '39.25%', width: '7.27%',},
    {left: '42.70%', top: '83.11%', width: '7.27%',},
    {left: '63.10%', top: '76.94%', width: '5.45%',},
    {left: '39.50%', top: '43.18%', width: '5.45%',},
  ],
};
ChristmasWonderlandEffect.kfc_bucket_image = `${SCRIPT_FOLDER_URL}/Images/kfc.png`;


function buildGlProgram(gl, vertex_shader_src, fragment_shader_src) {
	const v_shader = addGlShader(gl, vertex_shader_src, gl.VERTEX_SHADER);
	const f_shader = addGlShader(gl, fragment_shader_src, gl.FRAGMENT_SHADER);
	if (!v_shader || !f_shader) {
		return null;
	}

	const program = gl.createProgram();
	gl.attachShader(program, v_shader);
	gl.attachShader(program, f_shader);

	gl.linkProgram(program);
	return program;
}

function addGlShader(gl, shader_source, type) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, shader_source);
	gl.compileShader(shader);

	// Check the compile status
	const did_compile = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!did_compile) {
		const lastError = gl.getShaderInfoLog(shader);
		console.error(`Error compiling shader: ${lastError}`);
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

/**
 * Usage: /snow <rate: ('low' | 'medium' | 'high' | 'blizzard') = 'medium'>
 * Turn off: /snow off
 */
class SnowEffect {
  static init() {
    SnowEffect.state = {
      user_enabled: true,
			is_running: false,

      snow_level: SnowEffect.snow_levels.medium,
			_canvas: null,
			_gl: null,
			_program: null,

			// gl vars
			_a_position: null,
			_u_resolution: null,

      _width: window.innerWidth,
      _height: window.innerHeight,
      _snowflakes: [],
      _requested_animation_frame: null,
    };
  }

	static start(snow_level = 'medium') {
		const state = SnowEffect.state;
		if (!state.user_enabled) {
			return;
		}

    snow_level = snow_level.toLowerCase();
    if (SnowEffect.snow_levels[snow_level]) {
      state.snow_level = SnowEffect.snow_levels[snow_level];
    }

    if (state.is_running) {
      return;
    }

    state.is_running = true;
    state._canvas = document.createElement('canvas');
    state._canvas.classList.add('c-effect__snow-canvas');
    document.body.appendChild(state._canvas);

		state._gl = state._canvas.getContext('webgl');
		state._gl.enable(state._gl.BLEND);
		state._gl.blendFunc(state._gl.SRC_ALPHA, state._gl.ONE_MINUS_SRC_ALPHA);
		SnowEffect.buildSnowAndUseProgram();

    // 0 timeout to allow the CSSOM to update the size of the canvas appropriately
    setTimeout(() => SnowEffect.initAndReset(), 0);

    // If the window resizes, just start all over again for simplicity
    SnowEffect._resizeHandler = () => SnowEffect.initAndReset();
    window.addEventListener('resize', SnowEffect._resizeHandler);
	}

	static buildSnowAndUseProgram() {
		const state = SnowEffect.state;

		// setup GLSL program
    state._program = buildGlProgram(
				state._gl,
				SnowEffect.vertex_shader_src,
				SnowEffect.fragment_shader_src);
		state._gl.useProgram(state._program);

		state._a_position = state._gl.getAttribLocation(state._program, 'a_position');
		state._u_resolution = state._gl.getUniformLocation(state._program, 'u_resolution');
		state._vertex_buffer = state._gl.createBuffer();
	}

	static stop() {
		const state = SnowEffect.state;
    if (!state.is_running) {
      return;
    }

    state.is_running = false;
    window.removeEventListener('resize', SnowEffect._resizeHandler);

    if (state._requested_animation_frame) {
      state._requested_animation_frame = null;
      cancelAnimationFrame(state._requested_animation_frame);
    }

    state._gl = null;
    state._canvas.parentElement.removeChild(state._canvas);
    state._canvas = null;
	}

  static enable() {
		SnowEffect.state.user_enabled = true;
  }

  static disable() {
    SnowEffect.state.user_enabled = false;
		SnowEffect.stop();
  }

  static handleCommand(message_parts = [], other_args = {}) { // other args is for compatability
		if (message_parts[0] === 'off') {
      SnowEffect.stop();
      return;
    }

    let level = message_parts[0] || 'medium';
    if (!SnowEffect.snow_levels[level]) {
      level = 'medium';
    }

    SnowEffect.start(level);
	}

  static initAndReset() {
    const state = SnowEffect.state;

    state._width = state._canvas.width = window.innerWidth;
		state._height = state._canvas.height = window.innerHeight;
		state._gl.viewport(0, 0, state._width, state._height);
		state._gl.uniform2f(state._u_resolution, state._width, state._height);

    state._snowflakes = [];

    if (!state._requested_animation_frame) {
      state._requested_animation_frame = requestAnimationFrame(() => SnowEffect.handleFrame());
    }
  }

  static handleFrame() {
    const state = SnowEffect.state;
		if (!state._gl) {
			return;
		}

		state._gl.clearColor(0, 0, 0, 0);
  	state._gl.clear(state._gl.COLOR_BUFFER_BIT);

    // Add new snowflakes
    const min_new = state._width / state.snow_level.max;
    const max_new = state._width / state.snow_level.min;
    const number_of_new_flakes = getRandomInt(min_new, max_new);
    for (let i = 0; i < number_of_new_flakes; i++) {
      state._snowflakes.push(SnowEffect.createSnowflake());
		}

		// Move all the flakes and get their vertices
		const all_vertices = [];
    for (const snowflake of state._snowflakes) {
      snowflake.x += snowflake.velocity.x;
      snowflake.y += snowflake.velocity.y;

			all_vertices.push(...SnowEffect.buildCircleVertices(snowflake.x, snowflake.y, snowflake.size));
		}
		SnowEffect.drawSnowTriangles(all_vertices);

    // Remove particles below the screen
    state._snowflakes = state._snowflakes.filter((snowflake) => {
      const top_y = snowflake.y + (snowflake.size / 2);
      if (top_y > state._height) {
        return false;
      }

      const top_x = snowflake.x - (snowflake.size / 2);
      if (top_x > state._width) {
        return false;
      }

      return true;
    });

    state._requested_animation_frame = requestAnimationFrame(() => SnowEffect.handleFrame());
	}

	static buildCircleVertices(cx, cy, radius) {
		const vertices = [];
		let total_triangles = Math.max(Math.floor(SnowEffect.TRIANGLES_PER_PX_WIDTH * radius), 5);
		if (radius <= 1) {
			total_triangles = 3;
		} else if (radius <= 2) {
			total_triangles = 4;
		}

    const pi_frac = (2 * Math.PI) / total_triangles;
    for (let i = 0; i < total_triangles; i++) {
      vertices.push(cx, cy);
      vertices.push(
        Math.cos(i * pi_frac) * radius + cx,
        Math.sin(i * pi_frac) * radius + cy);
      vertices.push(
        Math.cos((i + 1) * pi_frac) * radius + cx,
        Math.sin((i + 1) * pi_frac) * radius + cy);
    }

    return vertices;
	}

	static drawSnowTriangles(snow_vertices) {
		const state = SnowEffect.state;

		// Put the snow vertices in the vertex buffer
		state._gl.bindBuffer(state._gl.ARRAY_BUFFER, state._vertex_buffer);
		state._gl.bufferData(state._gl.ARRAY_BUFFER, new Float32Array(snow_vertices), state._gl.STATIC_DRAW);

		// Load the vertices into a_position
		{
			const size = 2;
			const type = state._gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			state._gl.bindBuffer(state._gl.ARRAY_BUFFER, state._vertex_buffer);
			state._gl.vertexAttribPointer(
					state._a_position,
					size,
					type,
					normalize,
					stride,
					offset);
			state._gl.enableVertexAttribArray(state._a_position);
		}

		{
			const offset = 0;
			const vertex_total = snow_vertices.length / 2;
			state._gl.drawArrays(state._gl.TRIANGLES, offset, vertex_total);
		}
	}

  static createSnowflake() {
    const state = SnowEffect.state;
    const x = Math.random() * state._width;
    const size = getRandomFloat(SnowEffect.min_size / 2, SnowEffect.max_size / 2);

    let x_vel = getRandomFloat(SnowEffect.min_x_speed, SnowEffect.max_x_speed);
    if (Math.random() > 0.5) {
      x_vel = -x_vel;
    }

    return {
      x,
      y: -size,
      size,
      velocity: {
        x: x_vel,
        y: getRandomFloat(SnowEffect.min_y_speed, SnowEffect.max_y_speed),
      }
    };
	}

  static isSnowflakeOffscreen(snowflake) {
    const state = SnowEffect.state;
    const top_y = snowflake.y + (snowflake.size / 2);
    if (top_y > state._height) {
      return false;
    }

    const top_x = snowflake.x - (snowflake.size / 2);
    if (top_x > state._width) {
      return false;
    }
  }
}
SnowEffect.command = '/snow';
SnowEffect.pixels_per_flake_min = 500
SnowEffect.pixels_per_flake_max = 5000;
SnowEffect.max_size = 10;
SnowEffect.min_size = 3;
SnowEffect.min_x_speed = 0.5;
SnowEffect.max_x_speed = 3;
SnowEffect.min_y_speed = 1;
SnowEffect.max_y_speed = 4;
SnowEffect.snow_levels = {
  // The rate at which snow falls. High numbers means less snow

	// Low levels. Multiple aliases
  low: {min: 12500, max: 20000},
  dust: {min: 12500, max: 20000},
  light: {min: 12500, max: 20000},

	// Medium or normal aliases
  medium: {min: 3000, max: 7500},
  normal: {min: 3000, max: 7500},

  high: {min: 1000, max: 3500},
  blizzard: {min: 500, max: 5000},
  prime95: {min: 75, max: 900},
  space_heater: {min: 30, max: 400},
  whiteout: {min: 15, max: 50},

	danger: {min: 5, max: 10},
};
SnowEffect.vertex_shader_src = `
	attribute vec2 a_position;
	uniform vec2 u_resolution;

	void main() {
		// convert the position from pixels to 0.0 to 1.0
		// convert from 0->1 to 0->2
		vec2 zero_to_two = (a_position / u_resolution) * 2.0;

		// convert from 0->2 to -1->+1 (clip space)
		vec2 clip_space = zero_to_two - 1.0;

		gl_Position = vec4(clip_space.x, -clip_space.y, 0, 1);
	}
`;
SnowEffect.fragment_shader_src = `
	precision mediump float;

	void main() {
		gl_FragColor = vec4(1, 1, 1, 0.8);
	}
`;
SnowEffect.TRIANGLES_PER_PX_WIDTH = 10 / 10;


/**
 * Usage: /banri <minutes to be on = 10> <infection rate (out of 100) = 50>
 * Turn off: /banri off
 */
class GhostBanriEffect {
  static init() {
    GhostBanriEffect.state = {
			// If the user has enabled the function to be run
      user_enabled: true,
			// If the effect is on and runnin
			is_running: false,
      // Length of time to keep active in minutes
      length_minutes: GhostBanriEffect.DEFAULT_LENGTH_MIN,
      // The target number of people to be affected by each activation
      infection_rate: GhostBanriEffect.DEFAULT_INFECTION_RATE,
    };
    GhostBanriEffect.banri_timeout = null;
    GhostBanriEffect.deactivate_timeout = null;
  }

	static start(length_minutes = 0, infection_rate = 0) {
		const state = GhostBanriEffect.state;

		if (!state.user_enabled) {
			return;
		}

    if (length_minutes > 0) {
      state.length_minutes = length_minutes;
      GhostBanriEffect.resetDeactivationTimer();
    }
    if (infection_rate > 0 && infection_rate <= 1) {
      state.infection_rate = infection_rate;
    }

    if (state.is_running) {
      return;
    }

    state.is_running = true;
    GhostBanriEffect.maybeShowBanri();
    GhostBanriEffect.resetDeactivationTimer();
	}

	static stop() {
		const state = GhostBanriEffect.state;
    if (!state.is_running) {
      return;
    }

    state.is_running = false;
    if (GhostBanriEffect.banri_timeout) {
      clearTimeout(GhostBanriEffect.banri_timeout);
      GhostBanriEffect.banri_timeout = null;
    }

    state.length_minutes =GhostBanriEffect.DEFAULT_LENGTH_MIN;
    state.infection_rate = GhostBanriEffect.DEFAULT_INFECTION_RATE;
	}

  static enable() {
		GhostBanriEffect.state.user_enabled = true;
  }

  static disable() {
		GhostBanriEffect.state.user_enabled = false;
		GhostBanriEffect.stop();
  }

  static handleCommand(message_parts = [], other_args = {}) { // other args is for compatability
    if (message_parts[0] === 'off') {
      GhostBanriEffect.stop();
      return;
    }

    let length_minutes = parseFloat(message_parts[0] || '0');
    if (isNaN(length_minutes) || length_minutes <= 0) {
      length_minutes = GhostBanriEffect.DEFAULT_LENGTH_MIN;
    }

    let infection_rate = parseFloat(message_parts[1] || '0');
    if (isNaN(infection_rate) || infection_rate <= 0 || infection_rate > 100) {
      infection_rate = GhostBanriEffect.DEFAULT_INFECTION_RATE;
    } else {
			infection_rate = infection_rate / 100;
		}

    GhostBanriEffect.start(length_minutes, infection_rate);
  }

  static maybeShowBanri() {
    const state = GhostBanriEffect.state;
    if (GhostBanriEffect.banri_timeout) {
      clearTimeout(GhostBanriEffect.banri_timeout);
      GhostBanriEffect.banri_timeout = null;
    }

    if (!state.user_enabled) {
      return;
    }

    if (Math.random() > state.infection_rate) {
      GhostBanriEffect.banri_timeout = setTimeout(() => {
        GhostBanriEffect.maybeShowBanri();
      }, GhostBanriEffect.TIME_BETWEEN_ACTIVATIONS_S * 1000);
      return;
    }

    GhostBanriEffect.showBanri()
      .then(() => {
        clearTimeout(GhostBanriEffect.banri_timeout);
        GhostBanriEffect.banri_timeout = setTimeout(() => {
          GhostBanriEffect.maybeShowBanri();
        }, GhostBanriEffect.TIME_BETWEEN_ACTIVATIONS_S * 1000);
      });
  }

  static showBanri() {
    const img = document.createElement('img');
    img.src = GhostBanriEffect.BANRI_IMG;
    img.classList.add('c-effect__banri');
    document.body.appendChild(img);

    const window_width = window.innerWidth;
    const window_height = window.innerHeight;

    const min_left = 0;
    const max_left = window_width - 40;
    const min_top = 0;
    const max_top = window_height - 40;

    img.style.top = getRandomInt(min_left, max_left) + 'px';
    img.style.left = getRandomInt(min_top, max_top) + 'px';
    return new Promise((resolve) => {
      img.addEventListener('animationend', () => {
        img.parentElement.removeChild(img);
        resolve();
      });
    });
  }

  static resetDeactivationTimer() {
    const state = GhostBanriEffect.state;
    if (GhostBanriEffect.deactivate_timeout) {
      clearTimeout(GhostBanriEffect.deactivate_timeout);
      GhostBanriEffect.deactivate_timeout = null;
    }

    GhostBanriEffect.deactivate_timeout = setTimeout(() => {
      GhostBanriEffect.disable();
    }, state.length_minutes * 60 * 1000);
  }
}
GhostBanriEffect.command = '/banri';
GhostBanriEffect.DEFAULT_LENGTH_MIN = 10 * 60;
GhostBanriEffect.DEFAULT_INFECTION_RATE = 0.5;
GhostBanriEffect.TIME_BETWEEN_ACTIVATIONS_S = 30;
GhostBanriEffect.BANRI_IMG = `${SCRIPT_FOLDER_URL}/Images/ghost-banri.png`;



/**
 * To add a new effect create a class like so:

class YourNewEffect {
    static command = '/your-command';
    constructor() {}

    init() {}

    handleCommand(message_parts = [], other_args = {}) {}

    enable() {}
    disable() {}
    stop() {}
}
Then add it to the `effects` static variable below
*/
class CustomTextTriggers {
    static init() {
        // Only place you need to add a new effect to make it work
        CustomTextTriggers.effects = [
					ErabeEffect,
					PadoruEffect,
					PresentsEffect,
					GhostBanriEffect,
					SnowEffect,
					ChristmasWonderlandEffect,
					ArcadeTheme,
					LoopyEffect,
				];
        if (CustomTextTriggers.has_init) {
            return;
        }
        CustomTextTriggers.has_init = false;

        // Setup the effect lookup
        CustomTextTriggers.effect_lookup = new Map();
        for (let effect_cls of CustomTextTriggers.effects) {
            effect_cls.init();
            CustomTextTriggers.effect_lookup.set(effect_cls.command,
                {effect: effect_cls, handle: effect_cls.handleCommand});
        }

        // TODO make this "/effects arg" with some kind of handler?
        // Add non-effect commands here
        CustomTextTriggers.effect_lookup.set('/effects_disable',
            {effect: null, handle: CustomTextTriggers.disableEffects});
        CustomTextTriggers.effect_lookup.set('/effects_enable',
            {effect: null, handle: CustomTextTriggers.enableEffects});
        CustomTextTriggers.effect_lookup.set('/effects_stop',
            {effect: null, handle: CustomTextTriggers.stopEffects});

        // testing
        //CustomTextTriggers.effect_lookup.get('/padoru').handle([], {});

    }

    static isMod(username) {
        try {
            let is_mod = false;
			document.querySelectorAll("#userlist .userlist_owner,#userlist .userlist_siteadmin").forEach(function(currentAdmins) {
                if (currentAdmins.textContent === username) {
                    is_mod = true;
                    return false;
                }
            });

            return is_mod;
        } catch (e) { return false; }
    }

    static isFirstMod() {
        const first_mod_element = document.querySelector("#userlist .userlist_owner,#userlist .userlist_siteadmin");
        if (!first_mod_element) {
            return false;
        }

        return first_mod_element.textContent === CLIENT.name;
    }

    static randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /* Command handlers */
    static handleChatMessage(msg_data) {
        const is_shadowed = msg_data.username === CLIENT.name && msg_data.meta.shadow;
        if (msg_data.username === "[server]" || is_shadowed) {
            return;
        }

        if (!CustomTextTriggers.isMod(msg_data.username)) {
            return;
        }

        // If this client was the one who sent the message
        const did_send_the_message = CLIENT.name === msg_data.username;

        const message_parts = msg_data.msg.trim().toLowerCase().replace(/\s\s+/igm, ' ').split(' ');
        if (message_parts.length <= 0 || !message_parts[0]) {
            return;
        }

        const [effect_name, ...effect_args] = message_parts;
        if (effect_name[0] !== '/') {
            return;
        }

        // Build dict for any other arguments we should send
        // This should be a dict to provide these somewhat explicitly, but support addition
        // of future arguements without us having to modify old effect code
        let other_args = {
            'did_send_the_message': did_send_the_message,
        };

        // Get the command and handle command if valid
        let command_class = CustomTextTriggers.effect_lookup.get(effect_name);
        if (command_class !== undefined) {
            command_class.handle(effect_args, other_args);
        }
    }

    static disableEffects() {
        for (let effect of CustomTextTriggers.effects) {
            effect.disable()
        }
    }

    static enableEffects() {
        for (let effect of CustomTextTriggers.effects) {
            effect.enable()
        }
    }

    static stopEffects() {
        for (let effect of CustomTextTriggers.effects) {
            effect.stop()
        }
    }
}

$('<button id="effectsbtn" class="btn btn-sm ' + (EFFECTSOFF ? 'btn-danger' : 'btn-default') + '" title="Toggle effects">Effects ' + (EFFECTSOFF ? 'OFF' : 'ON') + '</button>')
    .appendTo("#chatwrap")
    .on("click", function() {
        EFFECTSOFF = !EFFECTSOFF;
        setOpt(CHANNEL.name + "_EFFECTSOFF", EFFECTSOFF);
        if (EFFECTSOFF) {
            this.className = "btn btn-sm btn-danger";
            this.textContent = "Effects OFF";
            CustomTextTriggers.disableEffects();
        } else {
            this.className = "btn btn-sm btn-default";
            this.textContent = "Effects ON";

            CustomTextTriggers.enableEffects();
        }
    });

//checkEffects();


spambtn = $('<button id="spambtn" class="btn btn-sm ' + (ANTISPAM ? 'btn-danger' : 'btn-default') + '" title="Blocks all unicode characters and duplicate words during shows. Red means it is blocking.">アミ a m i あみ</button>')
	.appendTo("#chatwrap")
	.on("click", function() {
		ANTISPAM = !ANTISPAM;
		setOpt(CHANNEL.name + "_ANTISPAM", ANTISPAM);
		if (ANTISPAM) {
			this.className = "btn btn-sm btn-danger";
		} else {
			this.className = "btn btn-sm btn-default";
		}
	});


/**
 * Usage: /arcade_theme
 * Turn off: /arcade_theme off
 */
 class ArcadeTheme {
  static init() {
    ArcadeTheme.state = {
      user_enabled: true,
      is_running: false,
			bars: [],
			_root_element: null,
			using_live_data: false,
    };

		socket.on("updatePoll", ArcadeTheme.handlePollUpdate);
		socket.on("newPoll", ArcadeTheme.handleNewPoll);
  }

	static start() {
		const state = ArcadeTheme.state;
    if (state.is_running || !state.user_enabled) {
      return;
    }
    state.is_running = true;

		document.documentElement.classList.add('is-arcade-theme');
    state._root_element = document.createElement('div');
    state._root_element.classList.add('c-arcade');

		// Must contain two scores
		const scores = [
			{player: 'P1', score: 80085},
			{player: 'P2', score: 42069},
		];
		const bar_configs = [
			{text: '', health: Math.random()},
			{text: '', health: Math.random()},
		];
		ArcadeTheme.buildTheme(scores, bar_configs, '');

		const main = document.querySelector('#main');
		main.parentElement.insertBefore(state._root_element, main);
	}

	static stop() {
		const state = ArcadeTheme.state;
    if (!state.is_running) {
      return;
    }

		document.documentElement.classList.remove('is-arcade-theme');
    state.is_running = false;
		state._root_element.parentElement.removeChild(state._root_element);
    state._root_element = null;
    state.using_live_data = false;
		state.bars = [];
	}

  static enable() {
		ArcadeTheme.state.user_enabled = true;
  }

  static disable() {
		ArcadeTheme.state.user_enabled = false;
		ArcadeTheme.stop();
  }

  static handleCommand(message_parts = [], other_args = {}) { // other args is for compatability
    if (message_parts[0] === 'off') {
      ArcadeTheme.stop();
      return;
    }

    ArcadeTheme.start();
  }

	static handleNewPoll(msg_data) {
		if (!ArcadeTheme.state.is_running) {
			return;
		}

		ArcadeTheme.state.using_live_data = true;
		const scores = [
			{player: 'P1', score: 80085},
			{player: 'P2', score: 42069},
		];

		const total_votes = msg_data.counts.reduce((a, b) => a + b, 0);
		const bar_configs = [];
		for (let i = 0; i < msg_data.options.length; i++) {
			bar_configs.push({
				text: decodeEntities(msg_data.options[i]),
				health: (total_votes > 0) ? msg_data.counts[i] / total_votes : 1,
			});
		}

		// Update question
		const question = decodeEntities(msg_data.title);
		ArcadeTheme.buildTheme(scores, bar_configs, question);
	}

	static handlePollUpdate(msg_data) {
		if (!ArcadeTheme.state.is_running) {
			return;
		}

		const bars = ArcadeTheme.state.bars;
		if (bars.length !== msg_data.counts.length
			  || !ArcadeTheme.state.using_live_data) {
			// Handle this as a new poll request if we need more or less bars, or we weren't set up to handle live data yet
			ArcadeTheme.handleNewPoll(msg_data);
			return;
		}

		const total_votes = msg_data.counts.reduce((a, b) => a + b, 0);
		for (let i = 0; i < msg_data.counts.length; i++) {
			let health = 1;
			if (total_votes > 0) {
				health = msg_data.counts[i] / total_votes;
			}

			bars[i].update(health);
		}
	}

	static buildTheme(scores, bar_configs, question = '') {
		const scores_element = ArcadeTheme.buildScores(scores[0], scores[1], question);
		const health_bars = ArcadeTheme.buildHealthBars(bar_configs);
		ArcadeTheme.state.bars = health_bars.bars;

		const health_score_wrapper = document.createElement('div');
		health_score_wrapper.classList.add('c-arcade__health-score');
		health_score_wrapper.appendChild(scores_element);
		health_score_wrapper.appendChild(health_bars.element);

		// Reset the root element
		const root = ArcadeTheme.state._root_element;
		while (root.firstChild) {
			root.removeChild(root.firstChild);
		}

		// Add the elements in the correct order
		root.appendChild(health_score_wrapper);
	}

	static buildScores(score1, score2, question) {
		const scores_element = document.createElement('div');
		scores_element.classList.add('c-arcade__scores');

		function addScore(score) {
			const score_element = document.createElement('div');
			score_element.classList.add('c-arcade__score');
			score_element.innerHTML = `<span class="c-arcade__score-player">${score.player}</span> ${score.score}`
			scores_element.appendChild(score_element);
		}

		addScore(score1);

		const question_div = document.createElement('div');
		question_div.classList.add('c-arcade__question');
		question_div.textContent = question;
		scores_element.appendChild(question_div);

		addScore(score2);

		return scores_element;
	}

	static buildHealthBars(bar_configs) {
		const bar_wrapper = document.createElement('div');
		bar_wrapper.classList.add('c-arcade__health-bars');

		const k_o_text = document.createElement('div');
		k_o_text.classList.add('c-arcade__k-o-text');
		k_o_text.textContent = 'K.O';

		const left_bars = document.createElement('div');
		left_bars.classList.add('c-arcade__left-bars');

		const right_bars = document.createElement('div');
		right_bars.classList.add('c-arcade__right-bars');

		const bars = [];
		let i = 0;
		for (const bar_config of bar_configs) {
			const bar = this.buildHealthBar(bar_config.text, bar_config.health);
			bars.push(bar);

			if (i % 2 === 0) {
				left_bars.appendChild(bar.element);
			} else {
				right_bars.appendChild(bar.element);
			}

			i = i + 1;
		}

		bar_wrapper.appendChild(left_bars);
		bar_wrapper.appendChild(k_o_text);
		bar_wrapper.appendChild(right_bars);

		return {
			element: bar_wrapper,
			bars: bars,
		};
	}
	static buildHealthBar(text, health) {
		const bar = document.createElement('div');
		bar.classList.add('c-arcade__health-bar');

		const bar_text = document.createElement('div');
		bar_text.classList.add('c-arcade__health-bar-text');
		bar_text.textContent = text;
		if (text.length > 40) {
			bar_text.classList.add('is-long');
		}

		const bar_health = document.createElement('div');
		bar_health.classList.add('c-arcade__health-bar-health');
		bar_health.style.width = (health * 100).toString() + '%';

		bar.appendChild(bar_text);
		bar.appendChild(bar_health);

		return {
			element: bar,
			update: (health) => {
				bar_health.style.width = (health * 100).toString() + '%';
			},
		};
	}
}
ArcadeTheme.command = '/arcade_theme';

/**
 * Usage: /arcade_theme
 * Turn off: /arcade_theme off
 */
 class LoopyEffect {
  static init() {
    LoopyEffect.state = {
      is_running: false,
			user_enabled: true,
    };

		const svg_holder = document.createElement('div');
		svg_holder.innerHTML = `
			<svg width="100%" height="100%" style="position: absolute; height: 0;">
				<defs>
					<filter id="loopywave" filterUnits="userSpaceOnUse" x="0" y="0">
						<feTurbulence id="loopywave-animation" numOctaves="1" seed="1" baseFrequency="0 0.0645034"></feTurbulence>
						<feDisplacementMap scale="10" in="SourceGraphic"></feDisplacementMap>
					</filter>
					<animate xlink:href="#loopywave-animation"
						attributeName="baseFrequency"
						dur="3s"
						keyTimes="0;0.5;1"
						values="0.0 0.04;0.0 0.07;0.0 0.04"
						repeatCount="indefinite"></animate>
				</defs>
			</svg>
		`;

		document.documentElement.appendChild(svg_holder);
  }

	static start() {
		const state = LoopyEffect.state;
    if (state.is_running || !state.user_enabled) {
      return;
    }
    state.is_running = true;

		document.documentElement.classList.add('has-loopy-effect');
	}

	static stop() {
		const state = LoopyEffect.state;
    if (!state.is_running) {
      return;
    }

		document.documentElement.classList.remove('has-loopy-effect');
    state.is_running = false;
	}

  static enable() {
		LoopyEffect.state.user_enabled = true;
  }

  static disable() {
		LoopyEffect.state.user_enabled = false;
		LoopyEffect.stop();
  }

  static handleCommand(message_parts = [], other_args = {}) { // other args is for compatability
    if (message_parts[0] === 'off') {
      LoopyEffect.stop();
      return;
    }

    LoopyEffect.start();
  }
}
LoopyEffect.command = '/loopy';


function decodeEntities(string) {
  var textarea = document.createElement('textarea');
  textarea.innerHTML = string;
  return textarea.value;
}


// All handlers must be added above this
// This is what turns the whole thing on to be run by chat messages like /erabe
// TODO: Should we hide this behind a button being enabled? Like niconico is?
CustomTextTriggers.init();

if (EFFECTSOFF) {
	CustomTextTriggers.disableEffects();
}

var checkEmbedInterval;

function replaceEmbedWithAudio(data) {
	if (data.type === "cu") {
		checkEmbedInterval = setInterval(function () {
			if (document.querySelector("#ytapiplayer button.btn.btn-default") !== null) {
				clearInterval(checkEmbedInterval);
				document.querySelector("#ytapiplayer button.btn.btn-default").onclick = function () {
					setTimeout(function () {
						var linkExtension = PLAYER.player[0].src.split(".");
						linkExtension = linkExtension[linkExtension.length-1];
						if (linkExtension === "mp3") {
							var replacementAudio = document.createElement("audio");
							replacementAudio.autoplay = true;
							replacementAudio.controls = true;
							replacementAudio.volume = VOLUME;
							replacementAudio.id = PLAYER.player[0].id;
							var replacementAudioSource = document.createElement("source");
							replacementAudio.append(replacementAudioSource);
							replacementAudioSource.src = PLAYER.player[0].src;

							PLAYER.player[0].parentNode.replaceChild(replacementAudio, PLAYER.player[0]);
						}
					}, 250);
				}
			}
		}, 25);
	}
}

socket.on("changeMedia", replaceEmbedWithAudio);

setTimeout(function () { // insurance
	if (document.querySelector("#ytapiplayer button.btn.btn-default") !== null) {
		replaceEmbedWithAudio({type:"cu"});
	}
}, 250);