(this["webpackJsonpvizzion-client"]=this["webpackJsonpvizzion-client"]||[]).push([[0],{68:function(e,t,n){e.exports=n(84)},73:function(e,t,n){},74:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(13),l=n.n(r),i=(n(73),n(10)),c=(n(74),n(99)),s=(n(47),n(44),Object(c.a)({map:{display:"flex",height:"100%",flex:3}}),n(52)),u=n(53),d=n(51),m=n(58),f=n.n(m),p=n(3),g=n.n(p),h=n(59),b=n.n(h),v=Object(c.a)({mapContainer:{flex:3,position:"relative"},resetButton:{display:"flex",boxShadow:"0 1px 4px rgba(0,0,0,0.65)",height:26,width:26,fontSize:14,alignItems:"center",justifyContent:"center",borderRadius:"4px",background:"#FFFFFF",cursor:"pointer",color:"black"}}),E=function(e){var t=Object(a.useState)({lat:54,lng:-105,zoom:5}),n=Object(i.a)(t,2),r=(n[0],n[1],Object(a.useState)()),l=Object(i.a)(r,2),c=l[0],m=l[1],p=Object(a.useState)(null),h=Object(i.a)(p,2),E=h[0],j=h[1],O=Object(a.useRef)(null),y=Object(a.useRef)(null),S=v();Object(a.useEffect)((function(){O&&(console.log("here"),fetch("/SASK_Constituency_boundary.json").then((function(e){return e.json()})).then((function(e){j(e);var t=g.a.geoJSON(e).getBounds();m(t),O.current.leafletElement.fitBounds(t),console.log(g.a.geoJSON(e))})))}),[]),Object(a.useEffect)((function(){C()}),[e.data]),Object(a.useEffect)((function(){console.log("zoom to riding",e.selectedRiding),e.selectedRiding&&w(e.selectedRiding.name)}),[e.selectedRiding]);var x=function(t){try{if(e.data)return e.data.data.find((function(e){return e.name.toUpperCase()===t.toUpperCase()}))}catch(n){console.log("Couldn't get party results")}},C=function(t){if(t){var n=x(t.properties.Constituen),a="lightgrey";return n&&(a=function(t){if(e.parties){var n=e.parties.data.find((function(e){if(t.results[0].votes>0)return e.nameShort===t.results[0].partyCode}));return n?n.colour:"lightgrey"}}(n)),{fillColor:a,weight:.9,color:"black",fillOpacity:.8}}},w=function(e){var t=O.current.leafletElement,n=y.current.leafletElement,a=null;n.eachLayer((function(t){t.feature.properties.Constituen===e.toUpperCase()&&(a=t)})),t.fitBounds(a.getBounds())};return o.a.createElement("div",{className:S.mapContainer},o.a.createElement(s.a,{ref:O,maxBounds:[[29.305561325527698,-130.53515625000003],[74.16408546675687,-90.54296875000001]],minZoom:5},o.a.createElement(u.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"}),E&&o.a.createElement(d.a,{ref:y,style:C,data:E,onClick:function(t){t.target.getBounds();var n=t.layer.getBounds();O.current.leafletElement.fitBounds(n);var a=t.layer.feature.properties.Constituen,o=x(a);e.handleSelectRiding(o)}}),o.a.createElement(f.a,{position:"topleft"},o.a.createElement("a",{id:"zoomOut",style:{color:"black !important"},className:"leaflet-control-zoom ".concat(S.resetButton),onClick:function(){O.current.leafletElement.fitBounds(c)}},o.a.createElement(b.a,null)))))},j=n(61),O=n.n(j),y=n(60),S=n.n(y),x=n(102),C=Object(c.a)({resultsRoot:{padding:10},candidateRoot:{position:"relative",display:"flex",flexDirection:"row",height:120,padding:"10px 0"},resultsInfo:{display:"flex",alignItems:"center",justifyContent:"space-between","& #pollsReported":{fontSize:14,fontWeight:"bolder"},"& #totalVotes":{fontSize:12,color:"darkslategrey"}},imageDiv:{backgroundColor:"red",height:"100%",borderRadius:"8px",textAlign:"center",position:"relative","& img":{borderRadius:"8px"},"& div":{position:"absolute",bottom:4,width:"100%"}}}),w=function(e){var t=e.candidate,n=(e.color,C());return o.a.createElement("div",{className:n.candidateRoot},o.a.createElement("div",{className:n.imageDiv},o.a.createElement("img",{height:95,src:"/images.jpg"}),o.a.createElement("div",null,t.partyCode)),o.a.createElement("div",null,t.name))},R=function(e){var t=C(),n=e.data;return o.a.createElement("div",{className:t.resultsRoot},e.data&&o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:t.resultsInfo},o.a.createElement("div",{id:"pollsReported"},n.pollsReported,"/",n.pollsTotal," polls reported"),o.a.createElement("div",{id:"totalVotes"},n.votes.toLocaleString("en")," total votes")),o.a.createElement("div",null,e.data.results.map((function(e){return o.a.createElement(w,{candidate:e})})))))},k=Object(c.a)({sidebar:{flex:1,position:"relative",display:"flex",overflow:"hidden"},title:{width:"100%",top:0,backgroundColor:"darkgrey",color:"white",display:"flex",alignItems:"center",height:50,paddingLeft:10,fontWeight:"bolder"},content:{marginBottom:10,height:"calc(100% - 30px)",overflowX:"hidden",overflowY:"scroll"},LocationButton:{display:"flex",alignItems:"center",height:50,paddingLeft:10,justifyContent:"space-between","&:hover":{backgroundColor:"lightgrey",cursor:"pointer"}}}),N=function(e){var t=Object(a.useState)("Select a riding"),n=Object(i.a)(t,2),r=n[0],l=(n[1],Object(a.useState)(0)),c=Object(i.a)(l,2),s=c[0],u=c[1],d=k(),m=Object(a.useState)("location"),f=Object(i.a)(m,2),p=f[0],g=f[1],h=Object(a.useState)(null),b=Object(i.a)(h,2),v=b[0],E=b[1];Object(a.useEffect)((function(){e.results&&(console.log("setting results"),E(e.results),g("results"))}),[e.results]);var j=function(t){e.handleSelectRiding(t),E(t),g("results")},y=function(e){return o.a.createElement("div",{className:"".concat(d.LocationButton," menu-item"),onMouseEnter:function(){return u(e.resultId)},onMouseLeave:function(){return u(0)},onClick:function(){return j(e.resultData)}},e.children)};return o.a.createElement("div",{id:"widgetSidebar",className:d.sidebar},o.a.createElement("div",{style:{position:"absolute",top:0,height:"50px",width:"100%",backgroundColor:"darkgrey"}}),o.a.createElement(x.a,{in:"location"===p,timeout:500,unmountOnExit:!0,classNames:"menu-primary"},o.a.createElement("div",{className:"menu"},o.a.createElement("div",{className:d.title},r.toUpperCase()),o.a.createElement("div",{className:d.content},e.data&&e.data.data.map((function(e){return o.a.createElement(y,{resultId:e.id,resultData:e},e.name,s===e.id&&o.a.createElement(S.a,null))}))))),o.a.createElement(x.a,{in:"results"===p,unmountOnExit:!0,timeout:500,classNames:"menu-secondary"},o.a.createElement("div",{className:"menu"},o.a.createElement("div",{className:d.title},o.a.createElement(O.a,{onClick:function(){return g("location")},style:{cursor:"pointer"}}),v&&v.name.toUpperCase()),o.a.createElement("div",{className:d.content},e.data&&"results"===p&&o.a.createElement(R,{data:v})))))},B=Object(c.a)({app:{height:"100%",display:"flex",flexDirection:"row"}});var z=function(){var e=Object(a.useState)(null),t=Object(i.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(!0),c=Object(i.a)(l,2),s=(c[0],c[1]),u=Object(a.useState)(null),d=Object(i.a)(u,2),m=d[0],f=d[1],p=Object(a.useState)(null),g=Object(i.a)(p,2),h=g[0],b=g[1],v=B();Object(a.useEffect)((function(){return j()}),[]);var j=function(){fetch("/data/SASK_2016.json").then((function(e){return e.json()})).then((function(e){r(e),s(!1)})),fetch("/data/partylist.json").then((function(e){return e.json()})).then((function(e){f(e)}))},O=function(e){console.log(e),b(e)};return o.a.createElement("div",{id:"map-widget-app",className:v.app},o.a.createElement(E,{data:n,parties:m,handleSelectRiding:O,selectedRiding:h}),o.a.createElement(N,{data:n,results:h,handleSelectRiding:O}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[68,1,2]]]);
//# sourceMappingURL=main.2e8032e8.chunk.js.map