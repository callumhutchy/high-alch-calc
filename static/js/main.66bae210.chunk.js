(this["webpackJsonphich-alch-calc"]=this["webpackJsonphich-alch-calc"]||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},,function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(5),c=n.n(i),o=(n(11),n(1)),s=n.n(o),l=n(2),u=n(3),p=(n(13),n(14),[]);var d=function(){return function(){x.apply(this,arguments)}(),r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h3",null,"Hutchy's High Alch list"),r.a.createElement("div",{id:"sortbuttons"},r.a.createElement("button",{id:"sort",type:"button",onClick:b},"Sort by Max Profit"),r.a.createElement("button",{id:"sort",type:"button",onClick:m},"Sort by Individual Profit")),r.a.createElement("div",{id:"table-div"},r.a.createElement("table",{id:"item_table"}))))};function f(e,t){var n,a=e.createTHead().insertRow(),r=Object(u.a)(t);try{for(r.s();!(n=r.n()).done;){var i=n.value,c=document.createElement("th"),o="";switch(i){case"icon":o="";break;case"name":o="Name";break;case"highalch":o="High Alch Value";break;case"price":o="GE Price";break;case"profit":o="Individual Profit";break;case"buy_limit":o="Buy Limit";break;case"max_profit":o="Max Profit";break;case"initial_capital":o="Initial Cash"}var s=document.createTextNode(o);c.appendChild(s),a.appendChild(c)}}catch(l){r.e(l)}finally{r.f()}}function h(e,t){var n,a=Object(u.a)(t);try{for(a.s();!(n=a.n()).done;){var r=n.value,i=e.insertRow();for(var c in r){var o=i.insertCell();switch(typeof r[c]){case"number":case"string":var s=document.createTextNode(r[c]);o.appendChild(s);break;case"object":var l=document.createElement("IMG");l.src=r[c].src,o.appendChild(l)}}}}catch(p){a.e(p)}finally{a.f()}}function m(){v(j)}function b(){v(_)}function v(e){document.getElementById("table-div").innerHTML="",document.getElementById("table-div").innerHTML='<table id="item_table"></table>',p.sort(e);var t=document.querySelector("table"),n=Object.keys(p[0]);h(t,p),f(t,n)}function y(e){return g.apply(this,arguments)}function g(){return(g=Object(l.a)(s.a.mark((function e(t){var n,a,r,i,c,o,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-complete.json");case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,r=[],e.t0=s.a.keys(a);case 8:if((e.t1=e.t0()).done){e.next=18;break}if(i=e.t1.value,a.hasOwnProperty(i)){e.next=12;break}return e.abrupt("continue",8);case 12:c=a[i],o=c.highalch,l=c.tradeable_on_ge,null!=o&&o>t&&null!=l&&1==l&&r.push(c),e.next=8;break;case 18:return e.abrupt("return",r);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return(x=Object(l.a)(s.a.mark((function e(){var t,n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k();case 2:return t=e.sent,n=t.find((function(e){return 561===e.id})).price,e.next=6,y(n);case 6:a=e.sent,E(t,a,n);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){return w.apply(this,arguments)}function w(){return(w=Object(l.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("HTTPS://api.runelite.net/runelite-1.6.17/item/prices");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(e,t,n){if(console.log(e),console.log(t),null!=t&&null!=e&&void 0!=t&&void 0!=e)for(var a=0;a<t.length;a++){var r=t[a].id,i=t[a].highalch,c=e.find((function(e){return e.id===r})).price,o=i-(c+n);if(i>c+n&&o>100){var s=new Image;s.src="data:image/png;base64,"+t[a].icon;var l={icon:s,name:t[a].name,highalch:i,price:c,profit:o,buy_limit:t[a].buy_limit,max_profit:t[a].buy_limit*(i-(c+n)),initial_capital:c*t[a].buy_limit};p.push(l)}}p.sort(_),console.log(p);var u=document.querySelector("table"),d=Object.keys(p[0]);h(u,p),f(u,d)}function _(e,t){return e.max_profit>t.max_profit?-1:1}function j(e,t){return e.profit>t.profit?-1:1}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[6,1,2]]]);
//# sourceMappingURL=main.66bae210.chunk.js.map