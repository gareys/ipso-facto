import{C as e,R as t,G as a,a as s}from"./vendor.880eac16.js";function n(){const[s,n]=e.exports.useState();return e.exports.useEffect((()=>{(async()=>{const e=await fetch("http://ip-api.com/json"),t=await e.json();n(t)})()}),[]),t.createElement("div",{className:"App"},t.createElement("header",{className:"App-header"},t.createElement(a,{gif:"/ipso-facto/assets/ipso.c74cf61e.gif",still:"/ipso-facto/assets/ipso-still.33705b1a.png"}),s&&t.createElement(t.Fragment,null,t.createElement("h1",null,s.query),t.createElement("p",null,s.isp),t.createElement("p",null,s.city,", ",s.region," ",s.zip))))}s.render(t.createElement(t.StrictMode,null,t.createElement(n,null)),document.getElementById("root"));
