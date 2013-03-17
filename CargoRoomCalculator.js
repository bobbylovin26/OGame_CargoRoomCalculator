//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/**
TODO:
	check for honorable target
	correct the null pointer exception at the init
	create links when open older messages
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

Info('ITP OGame Cargo Room Calculator Extension [LOADED]');

/// GLOBALS ///
var SMALL_CARGO_FRET = 5000;
var LARGE_CARGO_FRET = 25000;
var interval;
/*searchResults.push(undefined);
for (var i = 1 ; i < 16 ; i++) {searchResults.push(false);}*/
//////////////////////////////////////////////////////////////////////////////////////////////////////
var moduleDomId='OGame Free Planet Finder Extension';
IsModuleLoaded(moduleDomId,true);
//////////////////////////////////////////////////////////////////////////////////////////////////////
if(document.location.href.indexOf('page=messages')!=-1){
	//timeout because it takes time to load the messages
	window.setTimeout(function() { document.getElementById('mailz').addEventListener('DOMSubtreeModified', triggerInjection, false) }, 250);
	window.setTimeout(triggerInjection, 250);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
function triggerInjection() {
	console.log('trigger');
	var subjectsList = document.getElementById('mailz').getElementsByClassName('subject');

	if (subjectsList.length > 0) 
		for (var i = 1 ; i < subjectsList.length ; i++) 
			subjectsList[i].getElementsByTagName('a')[0].onclick = launchCargoRoomCalculator;

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function launchCargoRoomCalculator() {
	stopCargoRoomCalculator();
	interval = window.setInterval(calculateCargoRoom, 250);
	window.setTimeout(stopCargoRoomCalculator, 1500);

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function stopCargoRoomCalculator() {
	window.clearInterval(interval);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function calculateCargoRoom() {
	console.log('mailSectionClicked');
	var element = document.getElementsByClassName("fragment spy2");

	var spyElementList = document.getElementsByClassName("fragment spy2"); 
	if (spyElementList.length > 0) {
		console.log('spy!');

		var tbody = spyElementList[0].childNodes[1];
		console.log(tbody);
		console.log(tbody.childNodes);
		console.log(tbody.childNodes[3].childNodes);

		var metal = tbody.childNodes[1].childNodes[1].innerHTML;
		var cristal = tbody.childNodes[1].childNodes[5].innerHTML;
		var deut = tbody.childNodes[3].childNodes[1].innerHTML;
		metal = parseInt(metal.replace('.', ''));
		cristal = parseInt(cristal.replace('.', ''));
		deut = parseInt(deut.replace('.', ''));
		total = metal + cristal + deut;

		console.log(metal + ' ' + cristal + ' ' + deut);
		console.log(total);

		//calculate needed cargos

		var row=document.createElement("tr");
		HTMLTableRow = '<td class="item">Small cargo to raid</td>'
					+ '<td>' + Math.ceil((total / 2) / SMALL_CARGO_FRET) + '</td>'
					+ '<td class="item">Large cargo to raid</td>'
					+ '<td>' + Math.ceil((total / 2) / LARGE_CARGO_FRET) + '</td>';

		row.innerHTML += HTMLTableRow;
		spyElementList[0].childNodes[1].appendChild(row);

		window.clearInterval(interval);
	}

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function stopInterval() {
	window.clearInterval()
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function DocumentLocationFullPathname(){
	return document.location.protocol+'//'+document.location.host+document.location.pathname;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Info(text){
	var txt="";
	for( var i = 0; i < arguments.length; i++ ) txt+=arguments[i];
	console.log(txt);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
function SmartCut(source,prefix,suffix){
	if(typeof(prefix)=='object'){
		var pi=0;
		var offset=0;
		for(var i=0;(i<prefix.length)&&(pi!=-1);i++){
			pi=source.indexOf(prefix[i],pi+offset);
			offset=prefix[i].length;
		}
		if(pi!=-1){
			var copyFrom=pi+offset;
			var si=source.indexOf(suffix,copyFrom);
			var r=source.substring(copyFrom,si);
			return r;
		}else return false;
	}else{
		var pi=source.indexOf(prefix);
		if(pi!=-1){
			var si=source.indexOf(suffix,pi+prefix.length);
			var r=source.substring(pi+prefix.length,si);
			return r;
		}else return false;
	};
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function getXmlHttp() {
   if (window.XMLHttpRequest) {
      xmlhttp=new XMLHttpRequest();
   } else if (window.ActiveXObject) {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
   }
   if (xmlhttp == null) {
      alert("Your browser does not support XMLHTTP.");
   }
   return xmlhttp;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function PostXMLHttpRequest(_url,_data,_callback){
	xmlhttp = getXmlHttp();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4) {
			_callback(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST", _url, true);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.send(_data);
	return xmlhttp;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function IsModuleLoaded(_moduleDomId,_add){
	var modules=document.head.getElementsByClassName("oge-loaded-module"), result=false;
	for(var i=0;i<modules.length;i++){
		if(modules[i].getAttribute("content")==_moduleDomId) {result=true;break}
	}
	if(!result && _add){
		var flag=document.createElement("meta");
		flag.setAttribute("class","oge-loaded-module");
		flag.setAttribute("content",_moduleDomId);
		document.head.appendChild(flag);
	}
	return result;
}
