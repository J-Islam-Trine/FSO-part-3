(this["webpackJsonpthe-phonebook"]=this["webpackJsonpthe-phonebook"]||[]).push([[0],{14:function(e,t,n){e.exports=n(36)},36:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),l=n(3),u=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:e.onChange})))},i=function(e){return r.a.createElement("form",{onSubmit:e.onSubmit},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:e.nameHandler})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:e.numberHandler})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){return r.a.createElement("table",null,r.a.createElement("tbody",null,e.persons.map((function(t){return r.a.createElement("tr",{key:t.id},r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:function(){return e.onClick(t.id,t.name)}},"delete")))}))))},m=n(2),f=n.n(m),s="/api/persons",p=function(){return f.a.get(s).then((function(e){return e.data}))},b=function(e){return f.a.post(s,e).then((function(e){return"object"===typeof e.data?{data:e.data}:"string"===typeof e.data?{error:e.data}:void 0}))},E=function(e){return f.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.status}))},h=function(e,t){return f.a.put("".concat(s,"/").concat(e),t).then((function(e){return"object"===typeof e.data?{data:e.data}:"string"===typeof e.data?{error:e.data}:void 0}))},g=function(e){var t=e.message,n={padding:"5px 5px 5px 10px",margin:"0px"};return null===t.text?r.a.createElement(r.a.Fragment,null):"notification"===t.type?r.a.createElement("div",{style:{color:"green",border:"2px solid",margin:"5px"}},r.a.createElement("p",{style:n}," ",t.text)):"error"===t.type?r.a.createElement("div",{style:{color:"red",border:"2px solid",margin:"5px"}},r.a.createElement("p",{style:n}," ",t.text)):void 0},y=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(n),m=Object(l.a)(c,2),f=m[0],s=m[1],y=Object(a.useState)(""),v=Object(l.a)(y,2),x=v[0],j=v[1],O=Object(a.useState)(""),k=Object(l.a)(O,2),w=k[0],C=k[1],S=Object(a.useState)({text:null,type:"notification"}),H=Object(l.a)(S,2),J=H[0],A=H[1],B=function(){p().then((function(e){o(e),s(e)})).catch((function(e){A({text:"server offline",type:"error"}),D()}))},D=function(){setTimeout((function(){A({text:null,type:"notification"}),B()}),3e3)};Object(a.useEffect)(B,[]);return r.a.createElement("div",null,r.a.createElement("h3",null,"Phonebook"),r.a.createElement(g,{message:J}),r.a.createElement(u,{onChange:function(e){var t=n.filter((function(t){return t.name.toLowerCase().includes(e.target.value)}));0!==t.length?s(t):s(n)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(i,{onSubmit:function(e){e.preventDefault();var t={name:x,number:w},a=n.filter((function(e){return e.name===x}));if(console.log(a),0===a.length)b(t).then((function(e){console.log(e),e.data?A({text:"added ".concat(x," ").concat(w),type:"notification"}):e.error&&A({text:"".concat(e.error),type:"error"}),D()}));else if(1===a.length){var r=a[0].id;h(r,t).then((function(e){console.log(e),e.data?A({text:"updated ".concat(x," ").concat(w),type:"notification"}):e.error&&A({text:"".concat(e.error),type:"error"}),D()}))}},nameHandler:function(e){j(e.target.value)},numberHandler:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{persons:f,onClick:function(e,t){console.log(e),window.confirm("".concat(t," will be deleted"))?E(e).then((function(e){204===e&&(B(),A({text:"".concat(t," is deleted."),type:"notification"}),D())})).catch((function(e){console.log(e),A({text:"".concat(t," has been already deleted from server"),type:"error"}),D()})):console.log("canceled")}}))};c.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.24e4e39a.chunk.js.map