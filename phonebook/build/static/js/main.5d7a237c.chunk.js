(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(39)},20:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),o=n.n(c),u=(n(20),n(4)),l=n(2),i=n(3),d=n.n(i),m="http://localhost:3001/persons",s=function(){return d.a.get(m).then((function(e){return e.data}))},f=function(e){return d.a.post(m,e).then((function(e){return e.data}))},h=function(e){return d.a.delete("".concat(m,"/").concat(e))},b=function(e,t){return d.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},E=(n(38),function(e){var t=e.search,n=e.handleSearchInput;e.handleSearch;return r.a.createElement("div",null,"Filter shown with ",r.a.createElement("input",{value:t,onChange:n}))}),p=function(e){var t=e.addPerson,n=e.handleNameInput,a=e.newName,c=e.newNumber,o=e.handleNumberInput;return r.a.createElement("form",{onSubmit:t},r.a.createElement("h4",null,"Add a new"),r.a.createElement("div",null,"Name: ",r.a.createElement("input",{value:a,onChange:n})),r.a.createElement("div",null,"Number: ",r.a.createElement("input",{value:c,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add")))},v=function(e){var t=e.persons,n=e.handleRemove;return r.a.createElement("div",null,r.a.createElement("h2",null,"Numbers"),t.map((function(e){return r.a.createElement("li",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return n(e.id)}},"Delete"))})))},w=function(e){var t=e.msg;return r.a.createElement("div",null,""!==t.text?r.a.createElement("div",{className:!0===t.isError?"error":"success"},r.a.createElement("h2",null,t.text)):r.a.createElement("div",null))},O=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),i=Object(l.a)(o,2),d=i[0],m=i[1],O=Object(a.useState)(""),j=Object(l.a)(O,2),g=j[0],S=j[1],x=Object(a.useState)(""),N=Object(l.a)(x,2),k=N[0],y=N[1],C=Object(a.useState)(n),I=Object(l.a)(C,2),L=I[0],P=I[1],D=Object(a.useState)({text:"",isError:!1}),R=Object(l.a)(D,2),A=R[0],J=R[1];Object(a.useEffect)((function(){s().then((function(e){c(e),P(e)})).catch((function(e){B({text:"some error occured",isError:!0})}))}),[]);var B=function(e){J(e),setTimeout((function(){J({text:"",isError:!1})}),5e3)},F=function(e){var t=L.filter((function(t){return t.name.toLowerCase().includes(e.toLowerCase())}));c(t)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{msg:A}),r.a.createElement(E,{search:k,handleSearchInput:function(e){y(e.target.value),F(e.target.value)},handleSearch:F}),r.a.createElement(p,{newName:d,handleNameInput:function(e){m(e.target.value)},newNumber:g,handleNumberInput:function(e){S(e.target.value)},addPerson:function(e){e.preventDefault();var t=L.filter((function(e){return e.name===d}));if(t.length){var a=t[0];!0===window.confirm("".concat(d," is already added to Phonebook. Replace old number?"))?b(a.id,Object(u.a)(Object(u.a)({},a),{},{number:g})).then((function(e){c(n.map((function(t){return t.id!==a.id?t:e}))),P(L.map((function(t){return t.id!==a.id?t:e}))),B({text:"Successfully updated",isError:!1})})).catch((function(e){B({text:"".concat(a.name," could not be updated"),isError:!0})})):console.log("Opted not to update")}else{f({name:d,number:g}).then((function(e){e.name.toLowerCase().includes(k.toLowerCase())&&c(n.concat(e)),P(L.concat(e)),B({text:"Successfully added",isError:!1}),m(""),S("")})).catch((function(e){B({text:"".concat(d," could not be added"),isError:!0})}))}}}),r.a.createElement(v,{persons:n,handleRemove:function(e){var t=L.filter((function(t){return t.id===e}))[0].name;!0===window.confirm("Delete ".concat(t))?h(e).then((function(t){c(n.filter((function(t){return t.id!==e}))),P(L.filter((function(t){return t.id!==e}))),B({text:"Successfully deleted",isError:!1})})).catch((function(e){B({text:"Information of ".concat(t," has already been removed from server"),isError:!0})})):console.log("Opted not to delete")}}))};o.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.5d7a237c.chunk.js.map