(this["webpackJsonpvizzion-client"]=this["webpackJsonpvizzion-client"]||[]).push([[0],{107:function(e,t,a){e.exports=a(219)},112:function(e,t,a){},113:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},114:function(e,t,a){},219:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(96),o=a.n(i),c=(a(112),a(17)),l=(a(113),a(114),a(234)),s=a(233),u=Object(l.a)({partyContainer:function(e){return{backgroundColor:e.party.color,padding:5,maxHeight:40,margin:3,borderRadius:5,color:"white",fontWeight:"bold",letterSpacing:1,display:"flex",justifyContent:"space-between"}}}),d=function(e){var t=u(e);return r.a.createElement("div",{className:t.partyContainer},r.a.createElement("div",null,e.party.nameShort),r.a.createElement("div",null,e.result>0&&"+",e.result))},m=a(22),f=Object(l.a)({partyContainer:function(e){var t;return t={alignItems:"center",height:25,margin:3,position:"relative",width:"80%",color:"black",fontWeight:"bold",letterSpacing:1,display:"flex"},Object(m.a)(t,"position","relative"),Object(m.a)(t,"justifyContent","space-between"),Object(m.a)(t,"borderBottom","1px solid black"),Object(m.a)(t,"& #minus",{position:"absolute",left:-15}),Object(m.a)(t,"& #plus",{position:"absolute",right:-15}),t},gainsBar:{backgroundColor:function(e){return e.color},position:"absolute",bottom:0,right:function(e){return e.width<=0&&"50%"},left:function(e){return e.width>0&&"50%"},height:"60%",borderWidth:"1px",borderStyle:"solid",borderColor:function(e){return e.color},margin:0,padding:0,transition:"width 300ms ease-in-out",transitionDelay:"100ms"}}),g=function(e){var t=f(e),a=Object(n.useState)(0),i=Object(c.a)(a,2),o=i[0],l=i[1];return Object(n.useEffect)((function(){l(e.width)}),[e]),r.a.createElement("div",{className:t.partyContainer},r.a.createElement("div",{id:"minus"},"-"),r.a.createElement("div",{style:{width:"".concat(Math.abs(o),"%")},className:t.gainsBar}),r.a.createElement("div",{id:"plus"},"+"))},p=Object(l.a)({gainsDiv:{flex:5,display:"flex",flexDirection:"column",alignItems:"center"}}),h=function(e){var t=Object(n.useState)(0),a=Object(c.a)(t,2),i=a[0],o=a[1],l=p(e);return Object(n.useEffect)((function(){var t=0;e.data&&(e.data.partyResults.forEach((function(e){console.log("party",e.seatChange,t),Math.abs(e.seatChange)>t&&(t=Math.abs(e.seatChange))})),o(t))}),[e.data]),r.a.createElement("div",{className:l.gainsDiv},e.data&&e.data.partyResults.map((function(e,t){var a=0;return 0!==i&&(a=e.seatChange/(i+1)*100),r.a.createElement(g,{key:t,color:e.color,width:"".concat(a/2)})})))},v=Object(l.a)({main:{fontSize:function(e){return e.small&&12},display:"flex",position:"relative",flexDirection:"column",padding:"10px 20px",backgroundColor:"#f2f2f2",alignContent:"center"},content:{display:"flex",flexDirection:function(e){return e.small?"column":"row"},paddingBottom:"15px"},left:{flex:3,maxHeight:250,alignItems:"center"},right:{flex:4,maxHeight:250},title:{fontWeight:"bold",marginLeft:5,fontSize:function(e){return e.small?16:18}},border:{borderRight:"1px solid grey",marginRight:10},chartHolder:{display:"flex",flexDirection:"row",height:"100%",alignItems:"center"},partyBars:{flex:3,alignSelf:"center"},chartDiv:{flex:function(e){return e.small?3:2}}});var b=function(e){var t=Object(n.useState)(null),a=Object(c.a)(t,2),i=a[0],o=a[1],l=Object(n.useState)(!0),u=Object(c.a)(l,2),m=u[0],f=u[1],g=Object(n.useState)(3e5),p=Object(c.a)(g,2),b=p[0],y=(p[1],v(e));Object(n.useEffect)((function(){console.log("Updating every ".concat(b/1e3," seconds")),x(),E()}),[]);var E=function(){setInterval((function(){console.log("updating"),x()}),b)},x=function(){console.log("fetching"),fetch("/overallresults").then((function(e){return e.json()})).then((function(e){o(e),f(!1)})).catch((function(e){console.log("Error fetching election results")}))};return r.a.createElement("div",{id:"graphWidget-main",className:y.main},!m&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:y.content},r.a.createElement("div",{className:y.left},r.a.createElement("div",{className:y.title},"Popular vote"),r.a.createElement("div",{className:y.chartHolder},r.a.createElement("div",{className:y.partyBars},i&&i.partyResults.map((function(e,t){return r.a.createElement(d,{key:t,party:e,result:"".concat(e.votesPercent,"%")})}))),r.a.createElement("div",{className:y.chartDiv},i&&r.a.createElement(s.a,{id:"widgetPie",padding:50,padAngle:function(e){return e.datum.y},innerRadius:130,data:i.partyResults,x:"nameShort",y:"votesPercent",labels:function(e){e.datum;return""},style:{data:{fill:function(e){return e.datum.color}}}})))),r.a.createElement("div",{className:y.border}),r.a.createElement("div",{className:y.right},r.a.createElement("div",{className:y.title},"Gains/Losses"),r.a.createElement("div",{className:y.chartHolder},r.a.createElement("div",{className:y.partyBars},i&&i.partyResults.map((function(e,t){return r.a.createElement(d,{key:t,party:e,result:"".concat(e.seatChange)})}))),r.a.createElement(h,{data:i})))),r.a.createElement("div",null,r.a.createElement("div",{className:y.update},"Last updated: ",Date(i.generated)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var y=window.screen.width<500;o.a.render(r.a.createElement(b,{small:y?"true":void 0}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[107,1,2]]]);
//# sourceMappingURL=main.20448280.chunk.js.map