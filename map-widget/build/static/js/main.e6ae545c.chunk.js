(this["webpackJsonpvizzion-client"]=this["webpackJsonpvizzion-client"]||[]).push([[0],{48:function(e,t,a){e.exports=a(62)},53:function(e,t,a){},54:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(12),i=a.n(r),l=(a(53),a(11)),c=(a(54),a(75)),s=a(36),d=a.n(s),u=a(33),m=a(34),f=a(32),p=a(37),g=a.n(p),v=a(3),h=a.n(v),E=a(41),b=a.n(E),y=Object(c.a)({geoTooltip:{fontFamily:"Roboto, Ubuntu, Helvetica",display:"flex",flexDirection:"column",transition:"1s"},tooltipName:{fontSize:20,fontWeight:"bolder"},tooltipPolls:{fontSize:14,color:"grey",paddingBottom:10},tooltipWinner:{backgroundColor:function(e){return e.color},color:"white",padding:5,"& #tooltipPartyCode":{fontSize:18},"& #tooltipWinnerName":{fontSize:20,fontWeight:"bolder"}}}),S=function(e){var t=y(e);return o.a.createElement("div",{className:t.geoTooltip},o.a.createElement("div",{className:t.tooltipName},e.results.name),o.a.createElement("div",{className:t.tooltipPolls},e.results.pollsReported,"/",e.results.pollsTotal," polls reported"),e.results.pollsReported>0&&o.a.createElement("div",{className:t.tooltipWinner,style:{backgroundColor:e.color}},o.a.createElement("div",{id:"tooltipPartycode"},e.results.results[0].partyCode),o.a.createElement("div",{id:"tooltipWinnerName"},e.results.results[0].name)))},j=Object(c.a)({mapContainer:{flex:4,position:"relative"},resetButton:{display:"flex",boxShadow:"0 1px 4px rgba(0,0,0,0.65)",height:26,width:26,fontSize:14,alignItems:"center",justifyContent:"center",borderRadius:"4px",background:"#FFFFFF",cursor:"pointer",color:"black"}}),N=function(e){var t=Object(n.useState)(),a=Object(l.a)(t,2),r=a[0],i=a[1],c=Object(n.useState)(),s=Object(l.a)(c,2),p=s[0],v=s[1],E=Object(n.useState)(null),y=Object(l.a)(E,2),N=y[0],O=y[1],x=Object(n.useRef)(null),C=Object(n.useRef)(null),w=j();Object(n.useEffect)((function(){console.log("render map"),x&&fetch("/geojson").then((function(e){return e.json()})).then((function(e){O(e);var t=h.a.geoJSON(e).getBounds();i(t),x.current.leafletElement.fitBounds(t)}))}),[]),Object(n.useEffect)((function(){e.selectedRiding&&z(e.selectedRiding.name)}),[e.selectedRiding]);var k=function(t){try{if(e.data)return e.data.data.find((function(e){return e.name.toUpperCase()===t.toUpperCase()}))}catch(a){console.log("Couldn't get party results")}},R=function(t){try{if(e.parties&&t.results.length>0){var a=e.parties.find((function(e){if(t.results[0].votes>0)return e.nameShort===t.results[0].partyCode}));return a?a.color:"lightgrey"}return"lightgrey"}catch(n){return console.log("Error getting Geo Fill for ",t.name),"lightgrey"}},z=function(e){try{var t=x.current.leafletElement,a=C.current.leafletElement,n=null;a.eachLayer((function(t){t.feature.properties.Name.toUpperCase()===e.toUpperCase()&&(n=t)})),t.fitBounds(n.getBounds())}catch(o){console.log("Error zooming to "+e)}};function B(e){var t=e.target;t.setStyle({weight:2,color:"black",fillOpacity:1}),h.a.Browser.ie||h.a.Browser.opera||h.a.Browser.edge||t.bringToFront()}function L(e){C.current.leafletElement.resetStyle(e.target)}return o.a.createElement("div",{className:w.mapContainer},o.a.createElement(u.a,{ref:x,minZoom:3},o.a.createElement(m.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"}),N&&o.a.createElement(f.a,{ref:C,style:function(e){if(e){var t=k(e.properties.Name),a="lightgrey";return t&&(a=R(t)),{fillColor:a,weight:.9,color:"black",fillOpacity:.9}}},data:N,onClick:function(t){var a=t.layer.getBounds();if(p===a)t.layer.closeTooltip();else{var n=x.current.leafletElement;v(a),n.fitBounds(a);var o=t.layer.feature.properties.Name,r=k(o);e.handleSelectRiding(r),t.layer.setStyle({weight:2,color:"black",fillOpacity:1})}},onEachFeature:function(e,t){if(e.properties){t.on({mouseover:B,mouseout:L});try{var a=k(e.properties.Name),n=R(a);a&&n&&t.bindTooltip(d.a.renderToString(o.a.createElement(S,{results:a,color:n})),{sticky:!1,direction:"top"})}catch(r){}}}}),o.a.createElement(g.a,{position:"topleft"},o.a.createElement("a",{id:"zoomOut",style:{color:"black !important"},className:"leaflet-control-zoom leaflet-bar ".concat(w.resetButton),onClick:function(){x.current.leafletElement.fitBounds(r)}},o.a.createElement(b.a,null)))))},O=a(44),x=a.n(O),C=a(43),w=a.n(C),k=a(78),R=a(42),z=a.n(R),B=Object(c.a)({resultsRoot:{padding:10},candidateRoot:{position:"relative",display:"flex",flexDirection:"row",height:120,padding:"10px 0"},resultsInfo:{display:"flex",alignItems:"center",justifyContent:"space-between","& #pollsReported":{fontSize:14,fontWeight:"bolder"},"& #totalVotes":{fontSize:12,color:"darkslategrey"}},imageDiv:{height:"100%",position:"relative",paddingBottom:25,width:70,"& #partyCode":{position:"absolute",bottom:32,color:"white",width:"100%",textAlign:"center"},"& img":{borderRadius:"8px",backgroundColor:"red",paddingBottom:30,width:"100%",height:"auto"}},candidateLeftDiv:{flex:3,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"10px 0 10px 10px","& #candidateIncumbent":{fontSize:13,fontWeight:"lighter"}},candidateName:{"& #candidateFirst":{fontWeight:"bolder",fontSize:14},"& #candidateLast":{fontWeight:"bolder",fontSize:22}},candidateRightDiv:{flex:2,justifySelf:"flex-end",display:"flex",flexDirection:"column",padding:"10px 0",justifyContent:"space-between","& #candidateElected":{display:"flex",alignItems:"center",justifyContent:"flex-end",fontSize:14}},votesDiv:{textAlign:"right","& #votesPercent":{fontSize:22,fontWeight:"bolder"},"& #votesTotal":{fontSize:14,fontWeight:"lighter"}}}),L=function(e){var t=e.candidate,a=e.color,n=B();return o.a.createElement("div",{className:n.candidateRoot},o.a.createElement("div",{className:n.imageDiv},o.a.createElement("img",{style:{backgroundColor:a},alt:"Candidate Headshot",src:"/images.jpg"}),o.a.createElement("div",{id:"partyCode"},t.partyCode)),o.a.createElement("div",{className:n.candidateLeftDiv},o.a.createElement("div",{className:n.candidateName},o.a.createElement("div",{id:"candidateFirst"},t.name.split(" ")[0]),o.a.createElement("div",{id:"candidateLast"},t.name.split(" ")[t.name.split(" ").length-1])),o.a.createElement("div",{id:"candidateIncumbent"},t.isIncumbent&&"Incumbent")),o.a.createElement("div",{className:n.candidateRightDiv},o.a.createElement("div",{className:n.votesDiv},o.a.createElement("div",{id:"votesPercent"},t.percent,"%"),o.a.createElement("div",{id:"votesTotal"},t.votes.toLocaleString("en")," total votes")),t.elected?o.a.createElement("div",{id:"candidateElected"},o.a.createElement(z.a,{style:{paddingRight:5,fontSize:14,color:"green"}})," Elected"):o.a.createElement("div",{style:{fontSize:14}})))},D=function(e){var t=B(),a=e.data;return o.a.createElement("div",{className:t.resultsRoot},e.data&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:t.resultsInfo},o.a.createElement("div",{id:"pollsReported"},a.pollsReported,"/",a.pollsTotal," polls reported"),o.a.createElement("div",{id:"totalVotes"},a.votes.toLocaleString("en")," total votes")),o.a.createElement("div",null,e.data.results.map((function(t,a){var n=function(t){var a="#595b5b";if(e.parties){var n=e.parties.find((function(e){return e.nameShort===t.partyCode}));n&&(a=n.color)}return a}(t);return o.a.createElement(L,{key:a,color:n,candidate:t})})))))},I=Object(c.a)({sidebar:{flex:2,position:"relative",display:"flex",overflow:"hidden"},title:{width:"100%",top:0,backgroundColor:"darkgrey",color:"white",display:"flex",alignItems:"center",height:50,paddingLeft:10,fontWeight:"bolder"},content:{marginBottom:10,height:"calc(100% - 50px)",overflowX:"hidden",overflowY:"scroll"},LocationButton:{display:"flex",alignItems:"center",height:50,paddingLeft:10,justifyContent:"space-between","&:hover":{backgroundColor:"lightgrey",cursor:"pointer"}}}),T=function(e){var t=Object(n.useState)(0),a=Object(l.a)(t,2),r=a[0],i=a[1],c=I(),s=Object(n.useState)("location"),d=Object(l.a)(s,2),u=d[0],m=d[1],f=Object(n.useState)(null),p=Object(l.a)(f,2),g=p[0],v=p[1];Object(n.useEffect)((function(){e.results&&(v(e.results),m("results"))}),[e.results]);var h=function(t){e.handleSelectRiding(t),v(t),m("results")},E=function(e){return o.a.createElement("div",{className:"".concat(c.LocationButton," menu-item"),onMouseEnter:function(){return i(e.resultId)},onMouseLeave:function(){return i(0)},onClick:function(){return h(e.resultData)}},e.children)};return o.a.createElement("div",{id:"widgetSidebar",className:c.sidebar},o.a.createElement("div",{style:{position:"absolute",top:0,height:"50px",width:"100%",backgroundColor:"darkgrey"}}),o.a.createElement(k.a,{in:"location"===u,timeout:500,unmountOnExit:!0,classNames:"menu-primary"},o.a.createElement("div",{className:"menu"},o.a.createElement("div",{className:c.title},"SELECT A RIDING"),o.a.createElement("div",{className:c.content},e.data&&e.data.data.sort((function(e,t){return e.name>t.name?1:-1})).map((function(e){return o.a.createElement(E,{key:e.id,resultId:e.id,resultData:e},e.name,r===e.id&&o.a.createElement(w.a,null))}))))),o.a.createElement(k.a,{in:"results"===u,unmountOnExit:!0,timeout:500,classNames:"menu-secondary"},o.a.createElement("div",{className:"menu"},o.a.createElement("div",{className:c.title},o.a.createElement(x.a,{onClick:function(){return m("location")},style:{cursor:"pointer"}}),g&&g.name.toUpperCase()),o.a.createElement("div",{className:c.content},e.data&&"results"===u&&o.a.createElement(D,{data:g,parties:e.parties})))))},W=function(){return o.a.createElement("div",{className:"spinnerDiv"},o.a.createElement("div",{className:"spinnerText"},"Loading Map.."),o.a.createElement("div",{className:"spinner"},o.a.createElement("div",{className:"double-bounce1"}),o.a.createElement("div",{className:"double-bounce2"})))},F=Object(c.a)({app:{height:"100%",display:"flex",flexDirection:"row"}});var U=function(){var e=Object(n.useState)(null),t=Object(l.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)(!0),c=Object(l.a)(i,2),s=c[0],d=c[1],u=Object(n.useState)(null),m=Object(l.a)(u,2),f=m[0],p=m[1],g=Object(n.useState)(null),v=Object(l.a)(g,2),h=v[0],E=v[1],b=Object(n.useState)(""),y=Object(l.a)(b,2),S=(y[0],y[1],F());Object(n.useEffect)((function(){O(),j()}),[]);var j=function(){setInterval((function(){O()}),1e5)},O=function(){console.log("fetching"),fetch("/fullresults").then((function(e){return e.json()})).then((function(e){r(e),d(!1)})).catch((function(e){return console.log("Error fetching FULLELECTIONDATA, check your env variables and try again")})),fetch("/overallresults").then((function(e){return e.json()})).then((function(e){p(e.partyResults)})).catch((function(e){return console.log("Error fetching OVERALLRESULTS, check your env variables and try again")}))},x=function(e){E(e)};return o.a.createElement("div",{id:"map-widget-app",className:S.app},s?o.a.createElement(W,null):o.a.createElement(N,{data:a,parties:f,handleSelectRiding:x,selectedRiding:h}),o.a.createElement(T,{data:a,parties:f,results:h,handleSelectRiding:x}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[48,1,2]]]);
//# sourceMappingURL=main.e6ae545c.chunk.js.map