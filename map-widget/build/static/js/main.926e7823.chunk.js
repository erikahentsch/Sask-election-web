(this["webpackJsonpvizzion-client"]=this["webpackJsonpvizzion-client"]||[]).push([[0],{58:function(e,t,n){e.exports=n(89)},63:function(e,t,n){},64:function(e,t,n){},89:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(13),i=n.n(r),l=(n(63),n(10)),c=(n(64),n(102)),s=n(23),d=n.n(s),u=n(46),m=n.n(u),f=n(43),p=n(44),g=n(42),v=n(47),h=n.n(v),E=n(3),b=n.n(E),y=n(51),S=n.n(y),C=Object(c.a)({geoTooltip:{fontFamily:"Roboto, Ubuntu, Helvetica",display:"flex",flexDirection:"column",transition:"1s"},tooltipName:{fontSize:20,fontWeight:"bolder"},tooltipPolls:{fontSize:14,color:"grey",paddingBottom:10},tooltipWinner:{backgroundColor:function(e){return e.color},color:function(e){return"#C0C0C0"===e.color?"black":"white"},padding:5,"& #tooltipPartyCode":{fontSize:18},"& #tooltipWinnerName":{fontSize:20,fontWeight:"bolder"}}}),O=function(e){var t=C(e);return o.a.createElement("div",{className:t.geoTooltip},console.log(e.color),o.a.createElement("div",{className:t.tooltipName},e.results.name),o.a.createElement("div",{className:t.tooltipPolls},e.results.pollsReported,"/",e.results.pollsTotal," polls reported"),e.results.pollsReported>0&&o.a.createElement("div",{className:t.tooltipWinner,style:{backgroundColor:e.color}},o.a.createElement("div",{id:"tooltipPartycode"},e.results.results[0].partyCode),o.a.createElement("div",{id:"tooltipWinnerName"},e.results.results[0].name)))},j=Object(c.a)({mapContainer:{flex:4,position:"relative"},resetButton:{display:"flex",boxShadow:"0 1px 4px rgba(0,0,0,0.65)",height:26,width:26,fontSize:14,alignItems:"center",justifyContent:"center",borderRadius:"4px",background:"#FFFFFF",cursor:"pointer",color:"black"}}),N={weight:.9,color:"black",fillOpacity:.9},w={weight:3,fillOpacity:1},x=function(e){var t=Object(a.useState)(),n=Object(l.a)(t,2),r=n[0],i=n[1],c=Object(a.useState)(),s=Object(l.a)(c,2),u=s[0],v=s[1],E=Object(a.useState)(null),y=Object(l.a)(E,2),C=y[0],x=y[1],R=Object(a.useRef)(null),z=Object(a.useRef)(null),k=j();Object(a.useEffect)((function(){console.log("render map"),R.current?d.a.get("/geojson").then((function(e){if(200===e.status){x(e.data);var t=b.a.geoJSON(e.data).getBounds();i(t),console.log("mapref",R);var n=R.current.leafletElement;console.log("map",n),n.fitBounds(t)}})).catch((function(e){console.log(e),console.log("error getting geojson data")})):console.log("no mapReff")}),[]),Object(a.useEffect)((function(){(console.log(z),e.selectedRiding)?(I(e.selectedRiding.name),z.current&&z.current.leafletElement.eachLayer((function(t){t.feature.properties.Name.toUpperCase()===e.selectedRiding.name.toUpperCase()&&t.setStyle({weight:3,fillOpacity:1})}))):W()}),[z.current,e.selectedRiding]);var L=function(t){try{if(e.data)return e.data.data.find((function(e){return e.name.toUpperCase()===t.toUpperCase()}))}catch(n){console.log("Couldn't get party results")}},D=function(t){try{if(e.parties&&t.results.length>0){var n=e.parties.find((function(e){if(t.results[0].votes>0)return e.nameShort===t.results[0].partyCode}));return n?n.color:e.parties[4].color}return"rgb(89, 91, 91)"}catch(a){return console.log("Error getting Geo Fill for ",t.name),"rgb(89, 91, 91)"}},I=function(e){try{if(z.current){var t=R.current.leafletElement,n=z.current.leafletElement,a=null;n.eachLayer((function(t){t.feature.properties.Name.toUpperCase()===e.toUpperCase()&&(a=t)})),t.fitBounds(a.getBounds())}}catch(o){console.log("error zooming on riding")}},W=function(){try{R.current.leafletElement.fitBounds(r),e.handleSelectRiding(null)}catch(t){}};return o.a.createElement("div",{className:k.mapContainer},o.a.createElement(f.a,{ref:R,zoomSnap:.25,zoomDelta:.5,minZoom:3},o.a.createElement(p.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"}),C&&o.a.createElement(g.a,{ref:z,style:function(e){if(e){var t=L(e.properties.Name),n="rgb(89, 91, 91)";return t&&(n=D(t)),{fillColor:n,weight:.9,color:"black",fillOpacity:.9}}},data:C,onClick:function(t){var n=t.layer.getBounds();if(u===n)t.layer.closeTooltip();else{var a=R.current.leafletElement;v(n),a.fitBounds(n);var o=t.layer.feature.properties.Name,r=L(o);e.handleSelectRiding(r),t.layer.setStyle(w)}},onEachFeature:function(e,t){if(e.properties)try{var n=L(e.properties.Name),a=D(n);n&&a&&t.bindTooltip(m.a.renderToString(o.a.createElement(O,{results:n,color:a})),{sticky:!1,direction:"top"})}catch(r){}},onMouseOver:function(e){e.layer.setStyle(w)},onMouseOut:function(t){e.selectedRiding?t.layer.feature.properties.PED_Name_E.toUpperCase()!==e.selectedRiding.name.toUpperCase()&&t.layer.setStyle(N):t.layer.setStyle(N)}}),o.a.createElement(h.a,{position:"topleft"},o.a.createElement("a",{id:"zoomOut",style:{color:"black !important"},className:"leaflet-control-zoom leaflet-bar ".concat(k.resetButton),onClick:W},o.a.createElement(S.a,null)))))},R=n(54),z=n.n(R),k=n(53),L=n.n(k),D=n(105),I=n(52),W=n.n(I),B=Object(c.a)((function(e){return{resultsRoot:{padding:10},candidateRoot:{position:"relative",display:"flex",flexDirection:"row",height:120,padding:"10px 0"},resultsInfo:{display:"flex",alignItems:"center",justifyContent:"space-between","& #pollsReported":{fontSize:12,fontWeight:"bolder"},"& #totalVotes":{fontSize:10,color:"darkslategrey"}},imageDiv:{height:function(e){return e.screensize<700?100:120},position:"relative",marginBottom:25,minWidth:50,width:function(e){return e.screensize<700?50:70},borderRadius:"8px",overflow:"hidden","& #partyCode":{position:"absolute",bottom:8,color:"white",width:"100%",textAlign:"center"},"& img":{width:"100%",height:"auto"}},candidateLeftDiv:{flex:3,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"10px 0 10px 10px","& #candidateIncumbent":{fontSize:13,fontWeight:"lighter"}},candidateName:{"& #candidateFirst":{fontWeight:"bolder",fontSize:function(e){return e.screensize<700?12:14}},"& #candidateLast":{fontWeight:"bolder",fontSize:function(e){return e.screensize<700?16:22}}},candidateRightDiv:{flex:2,justifySelf:"flex-end",display:"flex",flexDirection:"column",padding:"10px 0",justifyContent:"space-between","& #candidateElected":{display:"flex",alignItems:"center",justifyContent:"flex-end",fontSize:function(e){return e.screensize<700?12:14}}},votesDiv:{textAlign:"right","& #votesPercent":{fontSize:function(e){return e.screensize<700?16:22},fontWeight:"bolder"},"& #votesTotal":{fontSize:function(e){return e.screensize<700?12:14},fontWeight:"lighter"}}}})),F=function(e){var t=e.candidate,n=(e.color,B(e));t.name.split(" ").pop();return o.a.createElement("div",{className:n.candidateRoot},o.a.createElement("div",{style:{backgroundColor:e.color},className:n.imageDiv},o.a.createElement("img",{alt:"Candidate Headshot",style:{},onError:function(e){e.target.onError=null,e.target.src="/img/images.jpg"},src:"/image/".concat(t.cachedHeadFilename)}),o.a.createElement("div",{id:"partyCode",style:{fontWeight:"bolder",color:"#C0C0C0"===e.color?"black":"white"}},t.partyCode)),o.a.createElement("div",{className:n.candidateLeftDiv},o.a.createElement("div",{className:n.candidateName},o.a.createElement("div",{id:"candidateFirst"},t.firstName),o.a.createElement("div",{id:"candidateLast"},t.lastName)),o.a.createElement("div",{id:"candidateIncumbent"},t.isIncumbent&&"Incumbent")),o.a.createElement("div",{className:n.candidateRightDiv},o.a.createElement("div",{className:n.votesDiv},o.a.createElement("div",{id:"votesPercent"},t.percent,"%"),o.a.createElement("div",{id:"votesTotal"},t.votes.toLocaleString("en")," total votes")),t.isElected?o.a.createElement("div",{id:"candidateElected"},o.a.createElement(W.a,{style:{paddingRight:5,fontSize:14,color:"green"}})," Elected"):o.a.createElement("div",{style:{fontSize:14}})))},T=function(e){var t=B(),n=e.data;return o.a.createElement("div",{className:t.resultsRoot},e.data&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:t.resultsInfo},o.a.createElement("div",{id:"pollsReported"},n.pollsReported,"/",n.pollsTotal," polls reported"),o.a.createElement("div",{id:"totalVotes"},n.votes.toLocaleString("en")," total votes")),o.a.createElement("div",null,e.data.results.map((function(t,n){var a=function(t){var n="#C0C0C0";if(e.parties){var a=e.parties.find((function(e){return e.nameShort===t.partyCode}));a&&(n=a.color)}return n}(t);return o.a.createElement(F,{screensize:e.screensize,key:n,color:a,candidate:t})})))))},U=Object(c.a)({sidebar:{flex:2,minWidth:250,position:"relative",display:"flex",overflow:"hidden"},title:{width:"100%",top:0,backgroundColor:"darkgrey",color:"white",display:"flex",alignItems:"center",minHeight:50,paddingLeft:10,fontWeight:"bolder"},content:{marginBottom:10,height:"calc(100% - 50px)",overflowX:"hidden",overflowY:"scroll"},LocationButton:{display:"flex",alignItems:"center",minHeight:50,paddingLeft:10,justifyContent:"space-between","&:hover":{backgroundColor:"lightgrey",cursor:"pointer"}}}),H=function(e){var t=Object(a.useState)(0),n=Object(l.a)(t,2),r=n[0],i=n[1],c=U(),s=Object(a.useState)("location"),d=Object(l.a)(s,2),u=d[0],m=d[1],f=Object(a.useState)(null),p=Object(l.a)(f,2),g=p[0],v=p[1];Object(a.useEffect)((function(){e.results?(v(e.results),m("results")):(console.log("no results"),v(null),m("location"))}),[e.results]);var h=function(t){e.handleSelectRiding(t),v(t),m("results")},E=function(e){return o.a.createElement("div",{className:"".concat(c.LocationButton," menu-item"),onMouseEnter:function(){return i(e.resultId)},onMouseLeave:function(){return i(0)},onClick:function(){return h(e.resultData)}},e.children)};return o.a.createElement("div",{id:"widgetSidebar",className:c.sidebar},o.a.createElement("div",{style:{position:"absolute",top:0,height:"50px",width:"100%",backgroundColor:"darkgrey"}}),o.a.createElement(D.a,{in:"location"===u,timeout:500,unmountOnExit:!0,classNames:"menu-primary"},o.a.createElement("div",{className:"menu"},o.a.createElement("div",{className:c.title},"SELECT A RIDING"),o.a.createElement("div",{className:c.content},e.data&&e.data.data.sort((function(e,t){return e.name>t.name?1:-1})).map((function(e){return o.a.createElement(E,{key:e.id,resultId:e.id,resultData:e},e.name,r===e.id&&o.a.createElement(L.a,null))}))))),o.a.createElement(D.a,{in:"results"===u,unmountOnExit:!0,timeout:500,classNames:"menu-secondary"},o.a.createElement("div",{className:"menu"},o.a.createElement("div",{className:c.title},o.a.createElement(z.a,{onClick:function(){m("location"),e.handleSelectRiding(null)},style:{cursor:"pointer"}}),g&&g.name.toUpperCase()),o.a.createElement("div",{className:c.content},e.data&&"results"===u&&o.a.createElement(T,{screensize:e.small,data:g,parties:e.parties})))))},M=function(){return o.a.createElement("div",{className:"spinnerDiv"},o.a.createElement("div",{className:"spinnerText"},"Loading Map.."),o.a.createElement("div",{className:"spinner"},o.a.createElement("div",{className:"double-bounce1"}),o.a.createElement("div",{className:"double-bounce2"})))},P=(o.a.memo((function(e){var t=e.data;return o.a.createElement("div",{style:{display:"none"}},t.data.map((function(e){return e.results.map((function(e){return o.a.createElement("img",{alt:"Candidate Headshot",onError:function(e){e.target.onError=null,e.target.src="/img/images.jpg"},src:"/image/".concat(e.cachedHeadFilename)})}))})))})),Object(c.a)({app:{height:"100%",display:"flex",flexDirection:"row"}}));var A=function(){var e=Object(a.useState)(null),t=Object(l.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)(!0),c=Object(l.a)(i,2),s=c[0],u=c[1],m=Object(a.useState)(null),f=Object(l.a)(m,2),p=f[0],g=f[1],v=Object(a.useState)(null),h=Object(l.a)(v,2),E=h[0],b=h[1],y=Object(a.useState)(3e5),S=Object(l.a)(y,2),C=S[0],O=(S[1],Object(a.useState)(window.innerWidth)),j=Object(l.a)(O,2),N=j[0],w=(j[1],P());Object(a.useEffect)((function(){console.log("Updating every ".concat(C/1e3," seconds")),z(),R()}),[]),Object(a.useEffect)((function(){k()}),[s]);var R=function(){setInterval((function(){z()}),1e4)},z=function(){console.log("fetching"),d.a.get("/fullresults").then((function(e){200===e.status&&(r(e.data),u(!1))})).catch((function(e){return console.log("Error fetching FULLELECTIONDATA, check your env variables and try again",e)})),d.a.get("/overallresults").then((function(e){200===e.status&&g(e.data.partyResults)})).catch((function(e){return console.log("Error fetching OVERALLRESULTS, check your env variables and try again")}))},k=function(){try{var e=window.location.hash;if(e){var t=e=decodeURI(e.replace("#",""));if(n){var a=n.data.find((function(e){return e.name.toLowerCase()===t.toLowerCase()}));a&&b(a)}}}catch(o){console.log("could not find riding by hash")}},L=function(e){b(e)};return o.a.createElement("div",{id:"map-widget-app",className:w.app},s?o.a.createElement(M,null):o.a.createElement(x,{data:n,parties:p,handleSelectRiding:L,selectedRiding:E}),o.a.createElement(H,{data:n,parties:p,results:E,handleSelectRiding:L,small:N}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[58,1,2]]]);
//# sourceMappingURL=main.926e7823.chunk.js.map