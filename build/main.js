!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("fs-extra")},function(e,t,n){n(2),e.exports=n(3)},function(e,t){e.exports=require("@babel/polyfill")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"SearchQuery",{enumerable:!0,get:function(){return r.SearchQuery}}),Object.defineProperty(t,"initInk",{enumerable:!0,get:function(){return r.initInk}}),Object.defineProperty(t,"getRelevantAssetContainers",{enumerable:!0,get:function(){return a.getRelevantAssetContainers}}),Object.defineProperty(t,"getKitId",{enumerable:!0,get:function(){return a.getKitId}}),Object.defineProperty(t,"getLingoSetupVariables",{enumerable:!0,get:function(){return a.getLingoSetupVariables}}),Object.defineProperty(t,"getAssetUuids",{enumerable:!0,get:function(){return a.getAssetUuids}}),Object.defineProperty(t,"formatAssetContainers",{enumerable:!0,get:function(){return a.formatAssetContainers}}),Object.defineProperty(t,"batchDownload",{enumerable:!0,get:function(){return a.batchDownload}}),Object.defineProperty(t,"init",{enumerable:!0,get:function(){return a.init}});var r=n(4),a=n(10)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initInk=function(){(0,a.render)(r.default.createElement(b,null))},t.SearchQuery=void 0;var r=l(n(5)),a=n(6),u=l(n(7)),o=l(n(8)),i=l(n(0)),c=l(n(9));function l(e){return e&&e.__esModule?e:{default:e}}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){d(e,t,n[t])})}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}console.log;var b=function(e){function t(){var e,n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,(e=!(r=v(t).call(this))||"object"!==s(r)&&"function"!=typeof r?m(n):r).state={error:"",errorInfo:"",phase:"",env:{spaceId:"",apiToken:"",outputLoc:""},config:{quantity:"",tempKitName:"",kits:[],outputLoc:""}},e.handleIntro=e.handleIntro.bind(m(e)),e.handleEnvOutput=e.handleEnvOutput.bind(m(e)),e.handleEnvApiToken=e.handleEnvApiToken.bind(m(e)),e.handleEnvSpaceId=e.handleEnvSpaceId.bind(m(e)),e.handleConfigKitQuantity=e.handleConfigKitQuantity.bind(m(e)),e.handleConfigKitName=e.handleConfigKitName.bind(m(e)),e}var n,l,b;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,r["default"].Component),n=t,(l=[{key:"updatePhase",value:function(e){this.setState({phase:e})}},{key:"handleIntro",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:selection).value;this.setState({phase:e})}},{key:"handleEnvOutput",value:function(e){this.setNestedStateEnv({outputLoc:e})}},{key:"handleConfigOutput",value:function(e){this.setNestedStateConfig({outputLoc:e})}},{key:"handleEnvApiToken",value:function(e){this.setNestedStateEnv({apiToken:e})}},{key:"handleEnvSpaceId",value:function(e){this.setNestedStateEnv({spaceId:e})}},{key:"handleConfigKitQuantity",value:function(e){this.setNestedStateConfig({quantity:e})}},{key:"handleConfigKitName",value:function(e){this.setNestedStateConfig({tempKitName:e})}},{key:"handleConfigKitNameSubmit",value:function(){var e=this.state,t=e.config,n=e.config.tempKitName;if(n.length>0){var r=[].concat(p(Array.from(t.kits)),[{name:n}]);this.setState(function(e){return{config:f({},e.config,{kits:r,tempKitName:""})}})}}},{key:"setNestedStateEnv",value:function(e){var t=Object.keys(e);this.setState(function(n){return{env:f({},n.env,d({},t,e[t]))}})}},{key:"setNestedStateConfig",value:function(e){var t=Object.keys(e);this.setState(function(n){return{config:f({},n.config,d({},t,e[t]))}})}},{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"cIntro",value:function(){return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"What would you like to do?"),r.default.createElement(o.default,{items:[{label:"Generate empty boilerplate",value:"emptyBoilerplate"},{label:"Generate boilerplate interactively",value:"interactiveBoilerplate"}],onSelect:this.handleIntro}))}},{key:"cEnd",value:function(){var e=this.state,t=(e.spaceId,e.apiToken,e.config),n=t.outputLoc,u=t.kits,o=JSON.stringify(this.uGenerateLAFBoilerplate(".laf.json",Object.values(u)),null,2);return"dotLAF"==n?i.default.outputFile("".concat(process.cwd(),"/.laf.json"),o,function(e){if(e)throw e}):"clipboardConfig"==n&&c.default.writeSync(o),r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"state: $",JSON.stringify(this.state,null,2)))}},{key:"cConfigKitQuantity",value:function(){var e=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"How many kits would you like to download assets from?")," ",r.default.createElement(u.default,{value:this.state.config.quantity,onChange:this.handleConfigKitQuantity,onSubmit:function(){e.updatePhase("configKitName")},placeholder:"#"}))}},{key:"cError",value:function(e,t){return r.default.createElement(a.Box,null,r.default.createElement(a.Color,{blue:!0},e,"(): "),r.default.createElement(a.Color,{red:!0},"Error: ",t))}},{key:"cEmptyBoilerplate",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[""],n=process.cwd(),u=".env",o="SPACE_ID=''\nAPI_TOKEN=''",c=this.uGenerateLAFBoilerplate(".laf.json",t);return i.default.outputFile("".concat(n,"/").concat(u),o,function(t){if(t)return e.cError("cEmptyBoilerplate",t)}),i.default.outputFile("".concat(n,"/").concat(c.name),JSON.stringify(c.value,null,2),function(t){if(t)return e.cError("cEmptyBoilerplate",t)}),r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,r.default.createElement(a.Color,{blue:!0},c.name)," & ",r.default.createElement(a.Color,{blue:!0},u)," has been generated."))}},{key:"cEnvSpaceId",value:function(){var e=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"What's your Lingo Space ID?")," ",r.default.createElement(u.default,{value:this.state.env.spaceId,onChange:this.handleEnvSpaceId,onSubmit:function(){return e.updatePhase("envApiToken")},placeholder:"000000"}))}},{key:"cEnvApiToken",value:function(){var e=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"What's your Lingo API Token?")," ",r.default.createElement(u.default,{value:this.state.env.apiToken,onChange:this.handleEnvApiToken,onSubmit:function(){return e.updatePhase("envOutputMethod")},placeholder:"token"}))}},{key:"cConfigOutputMethod",value:function(){return this.cOutputMethodSelector([{label:"Write to ./.laf.json",value:"dotLAF"},{label:"Write to clipboard",value:"clipboardConfig"}],"config","end")}},{key:"cEnvOutputMethod",value:function(){return this.cOutputMethodSelector([{label:"Write to ./.env",value:"dotEnv"},{label:"Write to clipboard",value:"clipboard"}],"env","configKitQuantity")}},{key:"cOutputMethodSelector",value:function(e,t,n){var u=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"Where would you like to output this data?\n"),r.default.createElement(o.default,{items:e,onSelect:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:outputLoc).value;"env"===t?u.handleEnvOutput(e):u.handleConfigOutput(e),u.updatePhase(n)}}))}},{key:"cConfigKitName",value:function(){var e=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"What's the name of your kit's config?")," ",r.default.createElement(u.default,{value:this.state.config.tempKitName,onChange:this.handleConfigKitName,onSubmit:function(){e.handleConfigKitNameSubmit()}}))}},{key:"uGenerateLAFBoilerplate",value:function(e,t){return{name:e,value:{kits:t.map(function(e){return{name:e.name,sections:[{name:"",headers:[""]}]}})}}}},{key:"renderIntro",value:function(){return""==this.state.phase?this.cIntro():"emptyBoilerplate"==this.state.phase?this.cEmptyBoilerplate():"interactiveBoilerplate"==this.state.phase?this.cEnvSpaceId():void 0}},{key:"renderEnv",value:function(){var e=this.state,t=e.phase,n=e.env,u=n.outputLoc,o=n.spaceId,l=n.apiToken;switch(t){case"envSpaceId":return this.cEnvSpaceId();case"envApiToken":return this.cEnvApiToken();case"envOutputMethod":return this.cEnvOutputMethod();case"envDone":var s="SPACE_ID='".concat(o,"'\nAPI_TOKEN='").concat(l,"'");return"dotEnv"==u?i.default.outputFile("".concat(process.cwd(),"/.env"),s,function(e){if(e)throw e}):"clipboard"==u&&c.default.writeSync(s),this.cConfigKitQuantity();default:return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"Nothing found in ",r.default.createElement(a.Color,{blue:!0},"renderEnv()")))}}},{key:"renderConfig",value:function(){var e=this.state,t=e.phase,n=e.config;switch(t){case"configKitQuantity":return this.cConfigKitQuantity();case"configKitName":return n.kits.length<n.quantity?this.cConfigKitName():this.cConfigOutputMethod();default:return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"Nothing found in ",r.default.createElement(a.Color,{blue:!0},"renderConfig()")))}}},{key:"render",value:function(){var e=this.state.phase;return e.includes("Boilerplate")||""==e?this.renderIntro():e.includes("env")?this.renderEnv():e.includes("config")?this.renderConfig():"end"==e?this.cEnd():void 0}}])&&h(n.prototype,l),b&&h(n,b),t}();t.SearchQuery=b},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("ink")},function(e,t){e.exports=require("ink-text-input")},function(e,t){e.exports=require("ink-select-input")},function(e,t){e.exports=require("clipboardy")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getLingoSetupVariables=f,t.getKitId=d,t.getRelevantAssetContainer=h,t.getAssetUuids=y,t.batchDownload=g,t.init=function(){return E.apply(this,arguments)};var r=u(n(0)),a=u(n(11));u(n(12)),n(13);function u(e){return e&&e.__esModule?e:{default:e}}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,u=void 0;try{for(var o,i=e[Symbol.iterator]();!(r=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,u=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw u}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t,n,r,a,u,o){try{var i=e[u](o),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,a)}function l(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var u=e.apply(t,n);function o(e){c(u,r,a,o,i,"next",e)}function i(e){c(u,r,a,o,i,"throw",e)}o(void 0)})}}n(14).config();var s=console.log;function f(e,t){return null==e||null==t?[process.env.SPACE_ID,process.env.API_TOKEN]:[e,t]}function d(){return p.apply(this,arguments)}function p(){return(p=l(regeneratorRuntime.mark(function e(){var t,n,r=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"Capswan - Mobile App - Style Guide",e.prev=1,e.next=4,a.default.fetchKits();case 4:return e.sent.forEach(function(e){e.name===t&&(n=e.kit_uuid)}),e.abrupt("return",n);case 9:e.prev=9,e.t0=e.catch(1),s("getKitId() ".concat(e.t0));case 12:case"end":return e.stop()}},e,null,[[1,9]])}))).apply(this,arguments)}function h(e,t){return v.apply(this,arguments)}function v(){return(v=l(regeneratorRuntime.mark(function e(t,n){var r,u,o,c,l=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=l.length>2&&void 0!==l[2]?l[2]:0,e.next=3,a.default.fetchKitOutline(t,r);case 3:return u=e.sent,o=n.sections,c=Object.values(o).map(function(e,t){return Object.values(u).filter(function(t){return t.name===e.name}).map(function(e){var t=e.uuid,n=e.headers;return Object.assign({},i({},t,n))}).map(function(t){var n=Object.keys(t);return e.hasOwnProperty("headers")&&e.headers.length>0?Object.values(e.headers).map(function(e){return e}).map(function(e){return Object.values(t).flat().filter(function(t,n){var r=t.name,a=t.uuid;if(r===e)return Object.assign({},{name:r,uuid:a})})}).map(function(e){var t=e[0],r=t.name,a=t.uuid;return Object.assign({},i({},n,{name:r,uuid:a}))}).map(function(e){return e}):Object.assign({},i({},n,{}))}).map(function(e){return e})}).map(function(e){return s("x: ".concat(JSON.stringify(e,null,2))),Object.values(e.flat())}),e.abrupt("return",c.flat());case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}function m(e,t){if(t.length>=1){var n=t.split(",").map(function(e){return e.trim()}).map(function(e){return e.replace(/ /g,"_")}).join("_");return e.replace(/ /g,"_")+"_"+n}return e}function y(e){return b.apply(this,arguments)}function b(){return(b=l(regeneratorRuntime.mark(function e(t){var n,r,u,c,l,f,d,p,h,v,y,b,g,k,E,O,x,S,w,j,C,I,P,_,A,T,K,N,B,M=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=M.length>1&&void 0!==M[1]?M[1]:0,r=M.length>2&&void 0!==M[2]?M[2]:1,u=M.length>3&&void 0!==M[3]?M[3]:2e3,e.prev=3,c=[],l=!0,f=!1,d=void 0,e.prev=8,p=t[Symbol.iterator]();case 10:if(l=(h=p.next()).done){e.next=51;break}v=h.value,y=0,b=Object.entries(v);case 13:if(!(y<b.length)){e.next=48;break}if(g=o(b[y],2),k=g[0],E=g[1],null!=(O=E.uuid)){e.next=41;break}return e.next=19,a.default.fetchSection(k,n,r,u);case 19:for(x=e.sent,S=!0,w=!1,j=void 0,e.prev=23,C=x.items[Symbol.iterator]();!(S=(I=C.next()).done);S=!0)P=I.value,s("item: ".concat(P)),null!==P.asset_uuid&&(_=P.asset.hasOwnProperty("keywords")?m(P.asset.name,P.asset.keywords):P.asset.name,c.push(Object.assign({},i({},P.asset_uuid,_))));e.next=31;break;case 27:e.prev=27,e.t0=e.catch(23),w=!0,j=e.t0;case 31:e.prev=31,e.prev=32,S||null==C.return||C.return();case 34:if(e.prev=34,!w){e.next=37;break}throw j;case 37:return e.finish(34);case 38:return e.finish(31);case 39:e.next=45;break;case 41:return e.next=43,a.default.fetchAssetsForHeading(k,O);case 43:for(A=e.sent,T=0,K=Object.entries(A,null,2);T<K.length;T++)N=o(K[T],2),N[0],null!==(B=N[1]).asset_uuid&&(_=B.asset.hasOwnProperty("keywords")?m(B.asset.name,B.asset.keywords):B.asset.name,c.push(Object.assign({},i({},B.asset_uuid,_))));case 45:y++,e.next=13;break;case 48:l=!0,e.next=10;break;case 51:e.next=57;break;case 53:e.prev=53,e.t1=e.catch(8),f=!0,d=e.t1;case 57:e.prev=57,e.prev=58,l||null==p.return||p.return();case 60:if(e.prev=60,!f){e.next=63;break}throw d;case 63:return e.finish(60);case 64:return e.finish(57);case 65:return e.abrupt("return",c);case 68:e.prev=68,e.t2=e.catch(3),s("getAssetUuids() ".concat(e.t2));case 71:case"end":return e.stop()}},e,null,[[3,68],[8,53,57,65],[23,27,31,39],[32,,34,38],[58,,60,64]])}))).apply(this,arguments)}function g(e){return k.apply(this,arguments)}function k(){return(k=l(regeneratorRuntime.mark(function e(t){var n,u,o=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=o.length>1&&void 0!==o[1]?o[1]:"png",u=o.length>2&&void 0!==o[2]?o[2]:"./downloads";try{t.forEach(function(){var e=l(regeneratorRuntime.mark(function e(t){var o,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=Object.keys(t),i=Object.values(t),e.prev=2,e.next=5,a.default.downloadAsset(o,n.toUpperCase());case 5:c=e.sent,r.default.outputFileSync("".concat(u,"/").concat(i,".").concat(n.toLowerCase()),c,"binary"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),s("Err: ".concat(e.t0));case 12:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}())}catch(e){s("batchDownload(): ".concat(e))}case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}function E(){return(E=l(regeneratorRuntime.mark(function e(){var t,n,r,u,o,i,c,l,p=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=p.length>0&&void 0!==p[0]?p[0]:"Test Me",n=p.length>1&&void 0!==p[1]?p[1]:null,r=p.length>2&&void 0!==p[2]?p[2]:"./downloads",u=p.length>3&&void 0!==p[3]?p[3]:"PNG",o=p.length>4&&void 0!==p[4]?p[4]:null,i=p.length>5&&void 0!==p[5]?p[5]:null,c=p.length>6&&void 0!==p[6]?p[6]:0,null!=n){e.next=9;break}throw Error("Extract Target is required");case 9:return l=f(o,i),a.default.setup(l[0],l[1]),e.prev=11,e.t0=g,e.t1=y,e.t2=h,e.next=17,d(t);case 17:return e.t3=e.sent,e.t4=n,e.t5=c,e.next=22,(0,e.t2)(e.t3,e.t4,e.t5);case 22:return e.t6=e.sent,e.next=25,(0,e.t1)(e.t6);case 25:return e.t7=e.sent,e.t8=u,e.t9=r,e.next=30,(0,e.t0)(e.t7,e.t8,e.t9);case 30:return e.abrupt("return",!0);case 33:return e.prev=33,e.t10=e.catch(11),s("init() ".concat(e.t10)),e.abrupt("return",!1);case 37:case"end":return e.stop()}},e,null,[[11,33]])}))).apply(this,arguments)}},function(e,t){e.exports=require("Lingojs")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default={testMe:{targetOne:{sections:[{name:"Illustrations"}]},targetTwo:{sections:[{name:"Illustrations",headers:["Lined"]}]}},capswan:{targetOne:{sections:[{name:"Illustrations"},{name:"Icons",headers:["Icons","Components"]}]},targetTwo:{sections:[{name:"Icons"}]}}}},function(e,t){e.exports=require("luxon")},function(e,t){e.exports=require("dotenv")}]));
//# sourceMappingURL=main.js.map