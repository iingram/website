/***********************************************
* Image w/ description tooltip- By Dynamic Web Coding (www.dyn-web.com)
* Copyright 2002-2007 by Sharon Paine
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

/* IMPORTANT: Put script after tooltip div or 
	 put tooltip div just before </BODY>. */

var dom = (document.getElementById) ? true : false;
var ns5 = (!document.all && dom || window.opera) ? true: false;
var ie5 = ((navigator.userAgent.indexOf("MSIE")>-1) && dom) ? true : false;
var ie4 = (document.all && !dom) ? true : false;
var nodyn = (!ns5 && !ie4 && !ie5 && !dom) ? true : false;

var origWidth, origHeight;

// avoid error of passing event object in older browsers
if (nodyn) { event = "nope" }

///////////////////////  CUSTOMIZE HERE   ////////////////////
// settings for tooltip 
// Do you want tip to move when mouse moves over link?
var tipFollowMouse= false;	

// Be sure to set tipWidth wide enough for widest image
var tipWidth= 160;
var offX= 0;	// how far from mouse to show tip
var offY= 240; 
var absoluteY = 46; //REXY: this is the y position of the tumbnail, use this for absolute position
var absoluteX = 355;
var tipFontFamily= "Verdana, arial, helvetica, sans-serif";
var tipFontSize= "8pt";

// set default text color and background color for tooltip here
// individual tooltips can have their own (set in messages arrays)
// but don't have to
var tipFontColor= "#FFFFFF";
var tipBgColor= "#FFFFFF"; 
var tipBorderColor= "#FFFFFF";
var tipBorderWidth= 0;
var tipBorderStyle= "none";
var tipPadding= 0;

// tooltip content goes here (image, description, optional bgColor, optional textcolor)
var messages = new Array();
// multi-dimensional arrays containing: 
// image and text for tooltip
// optional: bgColor and color to be sent to tooltip

//REXY: the following assigment is from oldest to newest 
//REXY: there is a minor buf with [0], just leave it but don't access it
messages[0] = new Array('misc/images/thumbnails/00.jpg',"");
messages[1] = new Array('misc/images/thumbnails/01.jpg',"");
messages[2] = new Array('misc/images/thumbnails/02.jpg',"");
messages[3] = new Array('misc/images/thumbnails/03.jpg',"");
messages[4] = new Array('misc/images/thumbnails/04.jpg',"");
messages[5] = new Array('misc/images/thumbnails/05.jpg',"");
messages[6] = new Array('misc/images/thumbnails/06.jpg',"");
messages[7] = new Array('misc/images/thumbnails/07.jpg',"");
messages[8] = new Array('misc/images/thumbnails/08.jpg',"");
messages[9] = new Array('misc/images/thumbnails/09.jpg',"");
messages[10] = new Array('misc/images/thumbnails/10.jpg',"");
messages[11] = new Array('misc/images/thumbnails/11.jpg',"");
messages[12] = new Array('misc/images/thumbnails/12.jpg',"");
messages[13] = new Array('misc/images/thumbnails/13.jpg',"");
messages[14] = new Array('misc/images/thumbnails/14.jpg',"");
messages[15] = new Array('misc/images/thumbnails/15.jpg',"");
messages[16] = new Array('misc/images/thumbnails/16.jpg',"");
messages[17] = new Array('misc/images/thumbnails/17.jpg',"");
messages[18] = new Array('misc/images/thumbnails/18.jpg',"");
messages[19] = new Array('misc/images/thumbnails/19.jpg',"");
messages[20] = new Array('misc/images/thumbnails/20.jpg',"");
messages[21] = new Array('misc/images/thumbnails/21.jpg',"");
messages[22] = new Array('misc/images/thumbnails/22.jpg',"");
messages[23] = new Array('misc/images/thumbnails/23.jpg',"");

////////////////////  END OF CUSTOMIZATION AREA  ///////////////////

// preload images that are to appear in tooltip from arrays above
// REXY: this is modified to load the from buttom up/lateast to oldest 
if (document.images) 
{
	var theImgs = new Array();
	for (var i=messages.length-1; i>0; i--) 
	{
  		theImgs[i] = new Image();
		theImgs[i].src = messages[i][0];
  }
}

// to layout image and text, 2-row table, image centered in top cell
// these go in var tip in doTooltip function
// startStr goes before image, midStr goes between image and text
var startStr = '<table width="' + tipWidth + '"><tr><td align="center" width="100%"><img src="';
var midStr = '" border="0"></td></tr><tr><td valign="top" align="center">';
var endStr = '</td></tr></table>';

////////////////////////////////////////////////////////////
//  initTip	- initialization for tooltip.
//		Global variables for tooltip. 
//		Set styles
//		Set up mousemove capture if tipFollowMouse set true.
////////////////////////////////////////////////////////////
var tooltip, tipcss;
function initTip() 
{
	if (nodyn) return;
	tooltip = (ie4)? document.all['tipDiv']: (ie5||ns5)? document.getElementById('tipDiv'): null;
	tipcss = tooltip.style;
	if (ie4||ie5||ns5) {	// ns4 would lose all this on rewrites
		tipcss.width = tipWidth+"px";
		tipcss.fontFamily = tipFontFamily;
		tipcss.fontSize = tipFontSize;
		tipcss.color = tipFontColor;
		tipcss.backgroundColor = tipBgColor;
		tipcss.borderColor = tipBorderColor;
		tipcss.borderWidth = tipBorderWidth+"px";
		tipcss.padding = tipPadding+"px";
		tipcss.borderStyle = tipBorderStyle;
	}
	if (tooltip&&tipFollowMouse) {
		document.onmousemove = trackMouse;
	}
	doFirstTooltip();
}

window.onload = initTip;  
/////////////////////////////////////////////////
//  doTooltip function
//			Assembles content for tooltip and writes 
//			it to tipDiv
/////////////////////////////////////////////////
var t1,t2;	// for setTimeouts
var tipOn = false;	// check if over tooltip link

function doFirstTooltip() 
{
	var firstPic = messages.length-1;
	if (!tooltip) return;
	if (t1) clearTimeout(t1);	
	if (t2) clearTimeout(t2);
	tipOn = true;
	// set colors if included in messages array
	if (messages[firstPic][2])	var curBgColor = messages[firstPic][2];
	else curBgColor = tipBgColor;
	if (messages[firstPic][3])	var curFontColor = messages[firstPic][3];
	else curFontColor = tipFontColor;
	if (ie4||ie5||ns5) 
	{
		var tip = startStr + messages[firstPic][0] + midStr + '<span style="font-family:' + tipFontFamily + '; font-size:' + tipFontSize + '; color:' + curFontColor + ';">' + messages[firstPic][1] + '</span>' + endStr;
		tipcss.backgroundColor = curBgColor;
	 	tooltip.innerHTML = tip;
	}
	if (!tipFollowMouse) positionFirstTip();
	else t1=setTimeout("tipcss.visibility='visible'",100);
}

function doTooltip(evt,num) 
{
	if (!tooltip) return;
	if (t1) clearTimeout(t1);	
	if (t2) clearTimeout(t2);
	tipOn = true;
	// set colors if included in messages array
	if (messages[num][2])	var curBgColor = messages[num][2];
	else curBgColor = tipBgColor;
	if (messages[num][3])	var curFontColor = messages[num][3];
	else curFontColor = tipFontColor;
	if (ie4||ie5||ns5) 
	{
		var tip = startStr + messages[num][0] + midStr + '<span style="font-family:' + tipFontFamily + '; font-size:' + tipFontSize + '; color:' + curFontColor + ';">' + messages[num][1] + '</span>' + endStr;
		tipcss.backgroundColor = curBgColor;
	 	tooltip.innerHTML = tip;
	}
	if (!tipFollowMouse) positionTip(evt);
	else t1=setTimeout("tipcss.visibility='visible'",100);
}

var mouseX, mouseY;

function trackMouse(evt) {
	standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body 
	//create reference to common "body" across doctypes
	mouseX = (ns5)? evt.pageX: window.event.clientX + standardbody.scrollLeft;
	mouseY = (ns5)? evt.pageY: window.event.clientY + standardbody.scrollTop;
	if (tipOn) positionTip(evt);
}

/////////////////////////////////////////////////////////////
//  positionTip function
//		If tipFollowMouse set false, so trackMouse function
//		not being used, get position of mouseover event.
//		Calculations use mouseover event position, 
//		offset amounts and tooltip width to position
//		tooltip within window.
/////////////////////////////////////////////////////////////
function positionFirstTip() {
	//var boxPosX = 300;
	if (!tipFollowMouse) {
		standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body
	}
	// tooltip width and height
	//var tpWd = (ie4||ie5)? tooltip.clientWidth: tooltip.offsetWidth;
	//var tpHt = (ie4||ie5)? tooltip.clientHeight: tooltip.offsetHeight;
	// document area in view (subtract scrollbar width for ns)
	//var winWd = (ns5)? window.innerWidth-20+window.pageXOffset: standardbody.clientWidth+standardbody.scrollLeft;
	//var winHt = (ns5)? window.innerHeight-20+window.pageYOffset: standardbody.clientHeight+standardbody.scrollTop;
		
	tipcss.left = absoluteX+"px";
	tipcss.top = absoluteY+"px";
	
	if (!tipFollowMouse) t1=setTimeout("tipcss.visibility='visible'",100);
}

function positionTip(evt) {
	//var boxPosX = 300;
	
	if (!tipFollowMouse) {
		standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body
		mouseX = (ns5)? evt.pageX: window.event.clientX + standardbody.scrollLeft;
		mouseY = (ns5)? evt.pageY: window.event.clientY + standardbody.scrollTop;
	}
	// tooltip width and height
	//var tpWd = (ie4||ie5)? tooltip.clientWidth: tooltip.offsetWidth;
	//var tpHt = (ie4||ie5)? tooltip.clientHeight: tooltip.offsetHeight;
	// document area in view (subtract scrollbar width for ns)
	//var winWd = (ns5)? window.innerWidth-20+window.pageXOffset: standardbody.clientWidth+standardbody.scrollLeft;
	//var winHt = (ns5)? window.innerHeight-20+window.pageYOffset: standardbody.clientHeight+standardbody.scrollTop;
	// check mouse position against tip and window dimensions
	// and position the tooltip 
	
	tipcss.left = absoluteX+"px";
	tipcss.top = absoluteY+"px";
	
	if (!tipFollowMouse) t1=setTimeout("tipcss.visibility='visible'",100);
}

//REXY: this is modified so the image stays after the mouse moved away
function hideTip() {
	tipOn = true;
}

document.write('<div id="tipDiv" style="position:absolute; padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px; visibility:hidden; z-index:100"></div>')