(this["webpackJsonpvizzion-client"]=this["webpackJsonpvizzion-client"]||[]).push([[0],{58:function(e,t,n){e.exports=n(89)},63:function(e,t,n){},64:function(e,t,n){},89:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(13),i=n.n(r),l=(n(63),n(8)),c=(n(64),n(102)),s=n(21),u=n.n(s),d=n(35),f=n.n(d),m=n(45),p=n(46),g=n(44),v=n(48),h=n.n(v),b=n(3),y=n.n(b),E=n(52),O=n.n(E),j=Object(c.a)({geoTooltip:{fontFamily:"Roboto, Ubuntu, Helvetica",display:"flex",flexDirection:"column",transition:"1s",width:200,wordBreak:"break-word",whiteSpace:"pre-wrap"},tooltipName:{fontSize:20,fontWeight:"bolder"},tooltipPolls:{fontSize:14,color:"grey",paddingBottom:10},tooltipWinner:{backgroundColor:function(e){return e.color},color:function(e){return"#C0C0C0"===e.color?"black":"white"},padding:5,"& #tooltipPartyCode":{fontSize:18},"& #tooltipWinnerName":{fontSize:20,fontWeight:"bolder"},"& #tooltipWinningBy":{}}}),S=function(e){var t=j(e);return o.a.createElement("div",{className:t.geoTooltip},o.a.createElement("div",{className:t.tooltipName},e.results.name),o.a.createElement("div",{className:t.tooltipPolls},e.results.pollsReported,"/",e.results.pollsTotal," polls reported"),e.results.pollsReported>0&&function(){try{if(e.results.results[0].votes>0)return o.a.createElement("div",{className:t.tooltipWinner,style:{backgroundColor:e.color}},o.a.createElement("div",{id:"tooltipPartycode"},e.results.results[0].partyCode),o.a.createElement("div",{id:"tooltipWinnerName"},e.results.results[0].name),o.a.createElement("div",{id:"tooltipWinningBy"},function(){try{var t=e.results.results[0],n=e.results.results[1];if(t.votes>n.votes)return"Leading by ".concat((t.votes-n.votes).toLocaleString("en")," votes")}catch(a){}}()))}catch(n){console.log(n)}}())},w=Object(c.a)({mapContainer:{flex:1},resetButton:{display:"flex",boxShadow:"0 1px 4px rgba(0,0,0,0.65)",height:26,width:26,fontSize:14,alignItems:"center",justifyContent:"center",borderRadius:"4px",background:"#FFFFFF",cursor:"pointer",color:"black"}}),C={weight:.9,fillOpacity:.9},N={weight:3,fillOpacity:1},x=function(e){var t=Object(a.useState)(),n=Object(l.a)(t,2),r=n[0],i=n[1],c=Object(a.useState)(),s=Object(l.a)(c,2),d=s[0],v=s[1],b=Object(a.useState)(null),E=Object(l.a)(b,2),j=E[0],x=E[1],R=Object(a.useRef)(null),z=Object(a.useRef)(null),k=w();Object(a.useEffect)((function(){console.log("render map"),R.current?u.a.get("/".concat(e.province,"/geojson")).then((function(e){if(200===e.status){x(e.data);var t=y.a.geoJSON(e.data).getBounds();i(t),R.current.leafletElement.fitBounds(t)}})).catch((function(e){console.log(e),console.log("error getting geojson data")})):console.log("no mapReff")}),[]),Object(a.useEffect)((function(){e.selectedRiding?T(e.selectedRiding.name):W()}),[e.selectedRiding,z.current]),Object(a.useEffect)((function(){z.current&&z.current.leafletElement.eachLayer((function(e){B(e.feature,e)}))}),[e.data]);var L=function(t){try{if(e.data)return e.data.data.find((function(e){return e.name.toUpperCase()===t.toUpperCase()}))}catch(n){console.log("Couldn't get party results")}},D=function(t){try{if(e.parties&&t.results.length>0){if(t.results[0].votes>0){if("NDP"===t.results[0].partyCode)return"rgb(221, 102, 0)";if("PC"===t.results[0].partyCode)return"rgb(0, 51, 153)";var n=e.parties.find((function(e){return e.nameShort===t.results[0].partyCode}));return n?n.color:"rgb(192, 192, 192)"}return"rgb(89, 91, 91)"}}catch(a){return console.log("Error getting Geo Fill for ",t.name),"rgb(89, 91, 91)"}},T=function(e){try{if(z.current){var t=R.current.leafletElement,n=z.current.leafletElement,a=null;n.eachLayer((function(t){t.feature.properties.Name.toUpperCase()===e.toUpperCase()&&(a=t)})),t.fitBounds(a.getBounds())}}catch(o){console.log("error zooming on riding")}},W=function(){try{var t=R.current.leafletElement;e.handleSelectRiding(null),t.fitBounds(r),t.eachLayer((function(e){"tooltipPane"===e.options.pane&&e.removeFrom(t)}))}catch(n){}};var B=function(e,t){if(console.log("toolgtip"),e.properties)try{var n=[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some((function(e){return navigator.userAgent.match(e)})),a=window.screen.width<500,r=L(e.properties.Name),i=D(r);if(r&&i)if(t._tooltip){if(!t._tooltip._content.includes(i)){var l=f.a.renderToString(o.a.createElement(S,{small:a,results:r,color:i}));t.setTooltipContent(l,{sticky:!1,direction:"top"})}}else t.bindTooltip(f.a.renderToString(o.a.createElement(S,{small:a,results:r,color:i})),{sticky:!n,offset:n?[0,50]:[0,0],direction:n?"top":"auto"})}catch(c){}};return o.a.createElement("div",{className:k.mapContainer},o.a.createElement(m.a,{ref:R,zoomSnap:.25,zoomDelta:.5,minZoom:3},o.a.createElement(p.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"}),j&&o.a.createElement(g.a,{ref:z,style:function(t){if(t){var n=L(t.properties.Name),a="rgb(89, 91, 91)";if(n)return a=D(n),e.selectedRiding&&e.selectedRiding.name.toUpperCase()===t.properties.Name.toUpperCase()?{fillColor:a,weight:3,color:"black",fillOpacity:1}:{fillColor:a,weight:.9,color:"black",fillOpacity:.9}}},data:j,onClick:function(t){try{var n=t.layer.getBounds();d===n&&t.layer.closeTooltip();var a=R.current.leafletElement;v(n),a.fitBounds(n);var o=t.layer.feature.properties.Name,r=L(o);e.handleSelectRiding(r),t.layer.setStyle(N)}catch(t){}},onEachFeature:B,onMouseOver:function(e){e.layer.setStyle(N)},onMouseOut:function(t){e.selectedRiding?t.layer.feature.properties.Name.toUpperCase()!==e.selectedRiding.name.toUpperCase()&&t.layer.setStyle(C):t.layer.setStyle(C)}}),o.a.createElement(h.a,{position:"topleft"},o.a.createElement("a",{id:"zoomOut",style:{color:"black !important"},className:"leaflet-control-zoom leaflet-bar ".concat(k.resetButton),onClick:W},o.a.createElement(O.a,null)))))},R=n(54),z=n.n(R),k=n(53),L=n.n(k),D=n(105),T=n(31),W=n.n(T),B=Object(c.a)((function(e){return{resultsRoot:{padding:10},candidateRoot:{position:"relative",display:"flex",flexDirection:"row",height:120,padding:"10px 0"},resultsInfo:{display:"flex",alignItems:"center",justifyContent:"space-between","& #pollsReported":{fontSize:12,fontWeight:"bolder"},"& #totalVotes":{fontSize:10,color:"darkslategrey"}},imageDiv:{height:function(e){return e.screensize<700?100:120},position:"relative",marginBottom:25,minWidth:50,width:function(e){return e.screensize<700?50:70},borderRadius:"8px",overflow:"hidden","& #partyCode":{position:"absolute",bottom:8,color:"white",width:"100%",textAlign:"center"},"& img":{width:"100%",transition:"width 500ms"}},candidateLeftDiv:{flex:3,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"10px 0 10px 10px","& #candidateIncumbent":{fontSize:13,fontWeight:"lighter"}},candidateName:{"& #candidateFirst":{fontWeight:"bolder",fontSize:function(e){return e.screensize<700?12:14}},"& #candidateLast":{fontWeight:"bolder",fontSize:function(e){return e.screensize<700?16:22}}},candidateRightDiv:{flex:2,justifySelf:"flex-end",display:"flex",flexDirection:"column",padding:"10px 0",justifyContent:"space-between","& #candidateElected":{display:"flex",alignItems:"center",justifyContent:"flex-end",fontSize:function(e){return e.screensize<700?12:14}}},votesDiv:{textAlign:"right","& #votesPercent":{fontSize:function(e){return e.screensize<700?16:22},fontWeight:"bolder"},"& #votesTotal":{fontSize:function(e){return e.screensize<700?12:14},fontWeight:"lighter"}}}})),I=function(e){var t=e.candidate,n=Object(a.useState)(""),r=Object(l.a)(n,2),i=r[0],c=r[1],s=Object(a.useRef)(null);Object(a.useEffect)((function(){c(t.name);try{i===s.current.name?s.current.style.width="100%":(s.current.style.width=0,setTimeout((function(){s.current.style.width="100%"}),1e3))}catch(e){console.log("error resetting candidate image")}}),[t]);var u=B(e);t.name.split(" ").pop();return o.a.createElement("div",{className:u.candidateRoot},o.a.createElement("div",{style:{backgroundColor:e.color},className:u.imageDiv},o.a.createElement("img",{ref:s,alt:"Candidate Headshot",name:t.name,onLoad:function(e){return e.target.style.width="100%"},onError:function(e){e.target.onError=null,e.target.src="/img/no_headshot.png"},src:"/image/".concat(e.prov,"/").concat(t.cachedHeadFilename)}),o.a.createElement("div",{id:"partyCode",style:{fontWeight:"bolder",color:"#C0C0C0"===e.color?"black":"white"}},t.partyCode)),o.a.createElement("div",{className:u.candidateLeftDiv},o.a.createElement("div",{className:u.candidateName},o.a.createElement("div",{id:"candidateFirst"},t.firstName),o.a.createElement("div",{id:"candidateLast"},t.lastName)),o.a.createElement("div",{id:"candidateIncumbent"},t.isIncumbent&&"Incumbent")),o.a.createElement("div",{className:u.candidateRightDiv},o.a.createElement("div",{className:u.votesDiv},o.a.createElement("div",{id:"votesPercent"},t.percent,"%"),o.a.createElement("div",{id:"votesTotal"},t.votes.toLocaleString("en")," total votes")),t.isElected?o.a.createElement("div",{id:"candidateElected"},o.a.createElement(W.a,{style:{paddingRight:5,fontSize:14,color:"green"}})," Elected"):o.a.createElement("div",{style:{fontSize:14}})))},F=function(e){var t=B(),n=e.data;return o.a.createElement("div",{className:t.resultsRoot},e.data&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:t.resultsInfo},o.a.createElement("div",{id:"pollsReported"},n.pollsReported,"/",n.pollsTotal," polls reported"),o.a.createElement("div",{id:"totalVotes"},n.votes.toLocaleString("en")," total votes")),o.a.createElement("div",null,e.data.results.map((function(t,n){var a=function(t){var n="#C0C0C0";if("NDP"===t.partyCode)return"rgb(221, 102, 0)";if("PC"===t.partyCode)return"rgb(0, 51, 153)";if(e.parties){var a=e.parties.find((function(e){return e.nameShort===t.partyCode}));a&&(n=a.color)}return n}(t);return o.a.createElement(I,{prov:e.prov,screensize:e.screensize,key:n,color:a,candidate:t})})))))},P=Object(c.a)({sidebar:{flex:2,minWidth:260,position:"relative",display:"flex",overflow:"hidden"},title:{width:"100%",top:0,backgroundColor:"darkgrey",color:"white",display:"flex",alignItems:"center",minHeight:50,paddingLeft:10,fontWeight:"bolder"},content:{marginBottom:10,height:"calc(100% - 50px)",overflowX:"hidden",overflowY:"scroll"},LocationButton:{display:"flex",alignItems:"center",minHeight:50,paddingLeft:10,justifyContent:"space-between","&:hover":{backgroundColor:"lightgrey",cursor:"pointer"}}}),U=function(e){var t=Object(a.useState)(0),n=Object(l.a)(t,2),r=n[0],i=n[1],c=P(),s=Object(a.useState)("location"),u=Object(l.a)(s,2),d=u[0],f=u[1],m=Object(a.useState)(null),p=Object(l.a)(m,2),g=p[0],v=p[1],h=Object(a.useRef)(null);Object(a.useEffect)((function(){e.results?(v(e.results),f("results")):(v(null),f("location"),i(0))}),[e.results,e.data]);var b=function(t){e.handleSelectRiding(t),v(t),f("results")},y=function(e){return o.a.createElement("div",{className:"".concat(c.LocationButton," menu-item"),onMouseEnter:function(){return i(e.resultId)},onMouseLeave:function(){return i(0)},onTouchMove:function(t){return i(e.resultId)},onTouchEnd:function(t){return b(e.resultData)},onClick:function(){return b(e.resultData)}},e.children)};return o.a.createElement("div",{id:"widgetSidebar",className:c.sidebar},o.a.createElement("div",{style:{position:"absolute",top:0,height:"50px",width:"100%",backgroundColor:"darkgrey"}}),o.a.createElement(D.a,{in:"location"===d,timeout:500,unmountOnExit:!0,nodeRef:h,classNames:"menu-primary"},o.a.createElement("div",{className:"menu"},o.a.createElement("div",{className:c.title},"SELECT A RIDING"),o.a.createElement("div",{className:c.content},e.data&&e.data.data.sort((function(e,t){return e.name>t.name?1:-1})).map((function(e){return o.a.createElement(y,{key:e.id,resultId:e.id,resultData:e},e.name,r===e.id&&o.a.createElement(L.a,null))}))))),o.a.createElement(D.a,{in:"results"===d,unmountOnExit:!0,timeout:500,nodeRef:h,classNames:"menu-secondary"},o.a.createElement("div",{className:"menu"},o.a.createElement("div",{className:c.title},o.a.createElement(z.a,{onClick:function(){f("location"),e.handleSelectRiding(null)},style:{cursor:"pointer"}}),o.a.createElement("div",{style:{paddingRight:"15px"}},g&&g.name.toUpperCase())),o.a.createElement("div",{className:c.content},e.data&&"results"===d&&o.a.createElement(F,{prov:e.prov,screensize:e.small,data:g,parties:e.parties})))))},A=function(){return o.a.createElement("div",{className:"spinnerDiv"},o.a.createElement("div",{className:"spinnerText"},"Loading Map.."),o.a.createElement("div",{className:"spinner"},o.a.createElement("div",{className:"double-bounce1"}),o.a.createElement("div",{className:"double-bounce2"})))},M=Object(c.a)({root:{backgroundColor:function(e){return e.color},color:"white",fontSize:18,fontWeight:"bold",padding:5,justifyContent:"center",display:"flex",alignSelf:"center",width:"100%","& svg":{paddingRight:5}}}),H=function(e){var t=M(e);return o.a.createElement("div",{className:t.root},o.a.createElement(W.a,null),e.declarationText)},_=Object(c.a)({app:{height:"100%",display:"flex",flexDirection:"row"},left:{flex:4,position:"relative",display:"flex",flexDirection:"column"}});var J=function(){var e=Object(a.useState)(null),t=Object(l.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)(!0),c=Object(l.a)(i,2),s=c[0],d=c[1],f=Object(a.useState)(null),m=Object(l.a)(f,2),p=m[0],g=m[1],v=Object(a.useState)(null),h=Object(l.a)(v,2),b=h[0],y=h[1],E=Object(a.useState)(3e4),O=Object(l.a)(E,2),j=O[0],S=(O[1],Object(a.useState)(window.innerWidth)),w=Object(l.a)(S,2),C=w[0],N=(w[1],Object(a.useState)("")),R=Object(l.a)(N,2),z=R[0],k=R[1],L=Object(a.useState)(null),D=Object(l.a)(L,2),T=D[0],W=D[1],B=Object(a.useState)(""),I=Object(l.a)(B,2),F=I[0],P=I[1],M=Object(a.useState)(""),J=Object(l.a)(M,2),V=J[0],G=J[1],X=_();Object(a.useEffect)((function(){var e="nb",t=function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(window.location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}("prov");t&&(e=t),G(e),e&&(Z(e),Y(e)),console.log("Updating every ".concat(j/1e3," seconds"))}),[]),Object(a.useEffect)((function(){$()}),[s]);var Y=function(e){setInterval((function(){Z(e)}),j)};Object(a.useEffect)((function(){q()}),[n]),Object(a.useEffect)((function(){try{if(n&&T)if(T.overallResult.partyName&&T.overallResult.resultText){var e=T.overallResult.partyName+" "+T.overallResult.resultText;k(e);var t=p.find((function(e){return e.name===T.overallResult.partyName}));P(t.color)}else k("")}catch(a){}}),[n,p,T]);var Z=function(e){console.log("fetching data"),u.a.get("/".concat(e,"/fullresults")).then((function(e){200===e.status&&(r(e.data),d(!1))})).catch((function(e){return console.log("Error fetching FULLELECTIONDATA, check your env variables and try again",e)})),u.a.get("/".concat(e,"/overallresults")).then((function(e){200===e.status&&g(e.data.partyResults)})).catch((function(e){return console.log("Error fetching OVERALLRESULTS, check your env variables and try again")})),u.a.get("/".concat(e,"/declaration")).then((function(e){200===e.status&&W(e.data)})).catch((function(e){console.log("Error fetching results")}))},$=function(){try{var e=window.location.hash;if(e){var t=e=decodeURI(e.replace("#",""));if(n){var a=n.data.find((function(e){return e.name.toLowerCase()===t.toLowerCase()}));a&&y(a)}}}catch(o){console.log("could not find riding by hash")}},q=function(){if(b){var e=b.name,t=n.data.find((function(t){return t.name===e}));e===t.name&&y(t)}},K=function(e){y(e)};return o.a.createElement("div",{id:"map-widget-app",className:X.app},o.a.createElement("div",{className:X.left},z&&o.a.createElement(H,{color:F,declarationText:z}),s?o.a.createElement(A,null):o.a.createElement(x,{data:n,parties:p,province:V,handleSelectRiding:K,selectedRiding:b})),o.a.createElement(U,{data:n,parties:p,results:b,handleSelectRiding:K,small:C,prov:V}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[58,1,2]]]);
//# sourceMappingURL=main.6ec49dd1.chunk.js.map