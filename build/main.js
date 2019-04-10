!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("fs-extra")},function(e,t,n){n(2),e.exports=n(3)},function(e,t){e.exports=require("@babel/polyfill")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"SearchQuery",{enumerable:!0,get:function(){return r.SearchQuery}}),Object.defineProperty(t,"initInk",{enumerable:!0,get:function(){return r.initInk}}),Object.defineProperty(t,"getRelevantAssetContainers",{enumerable:!0,get:function(){return a.getRelevantAssetContainers}}),Object.defineProperty(t,"getRelevantAssetContainersTwo",{enumerable:!0,get:function(){return a.getRelevantAssetContainersTwo}}),Object.defineProperty(t,"getKitId",{enumerable:!0,get:function(){return a.getKitId}}),Object.defineProperty(t,"getLingoSetupVariables",{enumerable:!0,get:function(){return a.getLingoSetupVariables}}),Object.defineProperty(t,"getAssetUuids",{enumerable:!0,get:function(){return a.getAssetUuids}}),Object.defineProperty(t,"formatAssetContainers",{enumerable:!0,get:function(){return a.formatAssetContainers}}),Object.defineProperty(t,"batchDownload",{enumerable:!0,get:function(){return a.batchDownload}}),Object.defineProperty(t,"init",{enumerable:!0,get:function(){return a.init}});var r=n(4),a=n(10)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initInk=function(){(0,a.render)(r.default.createElement(g,null))},t.SearchQuery=void 0;var r=l(n(5)),a=n(6),u=l(n(7)),o=l(n(8)),i=l(n(0)),c=l(n(9));function l(e){return e&&e.__esModule?e:{default:e}}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){d(e,t,n[t])})}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}console.log;var g=function(e){function t(){var e,n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,(e=!(r=v(t).call(this))||"object"!==s(r)&&"function"!=typeof r?m(n):r).state={error:"",errorInfo:"",phase:"",env:{spaceId:"",apiToken:"",outputLoc:""},config:{quantity:"",tempKitName:"",kits:[],outputLoc:""}},e.handleIntro=e.handleIntro.bind(m(e)),e.handleEnvOutput=e.handleEnvOutput.bind(m(e)),e.handleEnvApiToken=e.handleEnvApiToken.bind(m(e)),e.handleEnvSpaceId=e.handleEnvSpaceId.bind(m(e)),e.handleConfigKitQuantity=e.handleConfigKitQuantity.bind(m(e)),e.handleConfigKitName=e.handleConfigKitName.bind(m(e)),e}var n,l,g;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,r["default"].Component),n=t,(l=[{key:"updatePhase",value:function(e){this.setState({phase:e})}},{key:"handleIntro",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:selection).value;this.setState({phase:e})}},{key:"handleEnvOutput",value:function(e){this.setNestedStateEnv({outputLoc:e})}},{key:"handleConfigOutput",value:function(e){this.setNestedStateConfig({outputLoc:e})}},{key:"handleEnvApiToken",value:function(e){this.setNestedStateEnv({apiToken:e})}},{key:"handleEnvSpaceId",value:function(e){this.setNestedStateEnv({spaceId:e})}},{key:"handleConfigKitQuantity",value:function(e){this.setNestedStateConfig({quantity:e})}},{key:"handleConfigKitName",value:function(e){this.setNestedStateConfig({tempKitName:e})}},{key:"handleConfigKitNameSubmit",value:function(){var e=this.state,t=e.config,n=e.config.tempKitName;if(n.length>0){var r=[].concat(p(Array.from(t.kits)),[{name:n}]);this.setState(function(e){return{config:f({},e.config,{kits:r,tempKitName:""})}})}}},{key:"setNestedStateEnv",value:function(e){var t=Object.keys(e);this.setState(function(n){return{env:f({},n.env,d({},t,e[t]))}})}},{key:"setNestedStateConfig",value:function(e){var t=Object.keys(e);this.setState(function(n){return{config:f({},n.config,d({},t,e[t]))}})}},{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"cIntro",value:function(){return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"What would you like to do?"),r.default.createElement(o.default,{items:[{label:"Generate empty boilerplate",value:"emptyBoilerplate"},{label:"Generate boilerplate interactively",value:"interactiveBoilerplate"}],onSelect:this.handleIntro}))}},{key:"cEnd",value:function(){var e=this.state,t=(e.spaceId,e.apiToken,e.config),n=t.outputLoc,u=t.kits,o=JSON.stringify(this.uGenerateLAFBoilerplate(".laf.json",Object.values(u)),null,2);return"dotLAF"==n?i.default.outputFile("".concat(process.cwd(),"/.laf.json"),o,function(e){if(e)throw e}):"clipboardConfig"==n&&c.default.writeSync(o),r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"state: $",JSON.stringify(this.state,null,2)))}},{key:"cConfigKitQuantity",value:function(){var e=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"How many kits would you like to download assets from?")," ",r.default.createElement(u.default,{value:this.state.config.quantity,onChange:this.handleConfigKitQuantity,onSubmit:function(){e.updatePhase("configKitName")},placeholder:"#"}))}},{key:"cError",value:function(e,t){return r.default.createElement(a.Box,null,r.default.createElement(a.Color,{blue:!0},e,"(): "),r.default.createElement(a.Color,{red:!0},"Error: ",t))}},{key:"cEmptyBoilerplate",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[""],n=process.cwd(),u=".env",o="SPACE_ID=''\nAPI_TOKEN=''",c=this.uGenerateLAFBoilerplate(".laf.json",t);return i.default.outputFile("".concat(n,"/").concat(u),o,function(t){if(t)return e.cError("cEmptyBoilerplate",t)}),i.default.outputFile("".concat(n,"/").concat(c.name),JSON.stringify(c.value,null,2),function(t){if(t)return e.cError("cEmptyBoilerplate",t)}),r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,r.default.createElement(a.Color,{blue:!0},c.name)," & ",r.default.createElement(a.Color,{blue:!0},u)," has been generated."))}},{key:"cEnvSpaceId",value:function(){var e=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"What's your Lingo Space ID?")," ",r.default.createElement(u.default,{value:this.state.env.spaceId,onChange:this.handleEnvSpaceId,onSubmit:function(){return e.updatePhase("envApiToken")},placeholder:"000000"}))}},{key:"cEnvApiToken",value:function(){var e=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"What's your Lingo API Token?")," ",r.default.createElement(u.default,{value:this.state.env.apiToken,onChange:this.handleEnvApiToken,onSubmit:function(){return e.updatePhase("envOutputMethod")},placeholder:"token"}))}},{key:"cConfigOutputMethod",value:function(){return this.cOutputMethodSelector([{label:"Write to ./.laf.json",value:"dotLAF"},{label:"Write to clipboard",value:"clipboardConfig"}],"config","end")}},{key:"cEnvOutputMethod",value:function(){return this.cOutputMethodSelector([{label:"Write to ./.env",value:"dotEnv"},{label:"Write to clipboard",value:"clipboard"}],"env","configKitQuantity")}},{key:"cOutputMethodSelector",value:function(e,t,n){var u=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"Where would you like to output this data?\n"),r.default.createElement(o.default,{items:e,onSelect:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:outputLoc).value;"env"===t?u.handleEnvOutput(e):u.handleConfigOutput(e),u.updatePhase(n)}}))}},{key:"cConfigKitName",value:function(){var e=this;return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"What's the name of your kit's config?")," ",r.default.createElement(u.default,{value:this.state.config.tempKitName,onChange:this.handleConfigKitName,onSubmit:function(){e.handleConfigKitNameSubmit()}}))}},{key:"uGenerateLAFBoilerplate",value:function(e,t){return{name:e,value:{kits:t.map(function(e){return{name:e.name,sections:[{name:"",headers:[""]}]}})}}}},{key:"renderIntro",value:function(){return""==this.state.phase?this.cIntro():"emptyBoilerplate"==this.state.phase?this.cEmptyBoilerplate():"interactiveBoilerplate"==this.state.phase?this.cEnvSpaceId():void 0}},{key:"renderEnv",value:function(){var e=this.state,t=e.phase,n=e.env,u=n.outputLoc,o=n.spaceId,l=n.apiToken;switch(t){case"envSpaceId":return this.cEnvSpaceId();case"envApiToken":return this.cEnvApiToken();case"envOutputMethod":return this.cEnvOutputMethod();case"envDone":var s="SPACE_ID='".concat(o,"'\nAPI_TOKEN='").concat(l,"'");return"dotEnv"==u?i.default.outputFile("".concat(process.cwd(),"/.env"),s,function(e){if(e)throw e}):"clipboard"==u&&c.default.writeSync(s),this.cConfigKitQuantity();default:return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"Nothing found in ",r.default.createElement(a.Color,{blue:!0},"renderEnv()")))}}},{key:"renderConfig",value:function(){var e=this.state,t=e.phase,n=e.config;switch(t){case"configKitQuantity":return this.cConfigKitQuantity();case"configKitName":return n.kits.length<n.quantity?this.cConfigKitName():this.cConfigOutputMethod();default:return r.default.createElement(a.Box,null,r.default.createElement(a.Text,null,"Nothing found in ",r.default.createElement(a.Color,{blue:!0},"renderConfig()")))}}},{key:"render",value:function(){var e=this.state.phase;return e.includes("Boilerplate")||""==e?this.renderIntro():e.includes("env")?this.renderEnv():e.includes("config")?this.renderConfig():"end"==e?this.cEnd():void 0}}])&&h(n.prototype,l),g&&h(n,g),t}();t.SearchQuery=g},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("ink")},function(e,t){e.exports=require("ink-text-input")},function(e,t){e.exports=require("ink-select-input")},function(e,t){e.exports=require("clipboardy")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getLingoSetupVariables=f,t.getKitId=d,t.getRelevantAssetContainers=h,t.getRAC=function(e,t){return m.apply(this,arguments)},t.getAssetUuids=g,t.batchDownload=O,t.init=function(){return k.apply(this,arguments)};var r=u(n(0)),a=u(n(11));u(n(12));function u(e){return e&&e.__esModule?e:{default:e}}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,u=void 0;try{for(var o,i=e[Symbol.iterator]();!(r=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,u=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw u}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t,n,r,a,u,o){try{var i=e[u](o),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,a)}function l(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var u=e.apply(t,n);function o(e){c(u,r,a,o,i,"next",e)}function i(e){c(u,r,a,o,i,"throw",e)}o(void 0)})}}n(13).config();var s=console.log;function f(e,t){return null==e||null==t?[process.env.SPACE_ID,process.env.API_TOKEN]:[e,t]}function d(){return p.apply(this,arguments)}function p(){return(p=l(regeneratorRuntime.mark(function e(){var t,n,r=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"Capswan - Mobile App - Style Guide",e.prev=1,e.next=4,a.default.fetchKits();case 4:return e.sent.forEach(function(e){e.name===t&&(n=e.kit_uuid)}),e.abrupt("return",n);case 9:e.prev=9,e.t0=e.catch(1),s("getKitId() ".concat(e.t0));case 12:case"end":return e.stop()}},e,null,[[1,9]])}))).apply(this,arguments)}function h(e,t){return v.apply(this,arguments)}function v(){return(v=l(regeneratorRuntime.mark(function e(t,n){var r,u,o,i=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=i.length>2&&void 0!==i[2]?i[2]:0,u={sections:[]},e.prev=2,e.next=5,a.default.fetchKitOutline(t,r);case 5:o=e.sent,n.sections.forEach(function(e){var t=[];Object.values(o).forEach(function(n){e.name===n.name&&(e.hasOwnProperty("headers")&&(s("targetSec has headers property"),e.headers.forEach(function(e){n.headers.forEach(function(n){e===n.name&&(s("this should be added: ".concat(n.uuid)),t.push(n.uuid))})})),u.sections.push({name:n.name,uuid:n.uuid,headers:t}))})}),s("uuids 1: ".concat(JSON.stringify(u,null,2))),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),s("getRelevantAssetContainers() ".concat(e.t0));case 13:return s("uuids 2: ".concat(JSON.stringify(u,null,2))),e.abrupt("return",u);case 15:case"end":return e.stop()}},e,null,[[2,10]])}))).apply(this,arguments)}function m(){return(m=l(regeneratorRuntime.mark(function e(t,n){var r,u,o,c,l=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=l.length>2&&void 0!==l[2]?l[2]:0,e.next=3,a.default.fetchKitOutline(t,r);case 3:return u=e.sent,o=n.sections,c=Object.values(o).map(function(e,t){return s("extract: ".concat(JSON.stringify(e,null,2))),Object.values(u).filter(function(t){return t.name===e.name}).map(function(e){var t=e.uuid,n=e.headers;return Object.assign({},i({},t,n))}).map(function(t){var n=Object.keys(t);return e.hasOwnProperty("headers")&&e.headers.length>0?Object.values(e.headers).map(function(e){return e}).map(function(e){return Object.values(t).flat().filter(function(t,n){var r=t.name,a=t.uuid;if(r===e)return s("insiiiiide nameXheader"),Object.assign({},{name:r,uuid:a})})}).map(function(e){s("matchedOriginHeaders: ".concat(JSON.stringify(e,null,2)));var t=e[0],r=t.name,a=t.uuid;return s("name: ".concat(r)),s("uuid: ".concat(a)),Object.assign({},i({},n,{name:r,uuid:a}))}).map(function(e){return s("matchedUuidHeaderKV: ".concat(JSON.stringify(e,null,2))),e}):Object.assign({},i({},n,{}))}).map(function(e){return s("extracted: ".concat(JSON.stringify(e,null,2))),e})}).map(function(e){return Object.values(e.flat())}),e.abrupt("return",c.flat());case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}function y(e,t){if(t.length>=1){var n=t.split(",").map(function(e){return e.trim()}).map(function(e){return e.replace(/ /g,"_")}).join("_");return e.replace(/ /g,"_")+"_"+n}return e}function g(e){return b.apply(this,arguments)}function b(){return(b=l(regeneratorRuntime.mark(function e(t){var n,r,u,c,l,f,d,p,h,v,m,g,b,O,E,k,x,S,w,j,C,P,I,A,_,T=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=T.length>1&&void 0!==T[1]?T[1]:0,r=T.length>2&&void 0!==T[2]?T[2]:1,u=T.length>3&&void 0!==T[3]?T[3]:2e3,c=[],e.prev=4,l=!0,f=!1,d=void 0,e.prev=8,p=t[Symbol.iterator]();case 10:if(l=(h=p.next()).done){e.next=46;break}if(v=h.value,m=Object.keys(v)[0],null!==(g=Object.values(v)[0])){e.next=39;break}return e.next=17,a.default.fetchSection(m,n,r,u);case 17:for(b=e.sent,O=!0,E=!1,k=void 0,e.prev=21,x=b.items[Symbol.iterator]();!(O=(S=x.next()).done);O=!0)null!==(w=S.value).asset_uuid&&(j=w.asset.hasOwnProperty("keywords")?y(w.asset.name,w.asset.keywords):w.asset.name,c.push(Object.assign({},i({},w.asset_uuid,j))));e.next=29;break;case 25:e.prev=25,e.t0=e.catch(21),E=!0,k=e.t0;case 29:e.prev=29,e.prev=30,O||null==x.return||x.return();case 32:if(e.prev=32,!E){e.next=35;break}throw k;case 35:return e.finish(32);case 36:return e.finish(29);case 37:e.next=43;break;case 39:return e.next=41,a.default.fetchAssetsForHeading(m,g);case 41:for(C=e.sent,P=0,I=Object.entries(C,null,2);P<I.length;P++)A=o(I[P],2),A[0],null!==(_=A[1]).asset_uuid&&(j=_.asset.hasOwnProperty("keywords")?y(_.asset.name,_.asset.keywords):_.asset.name,c.push(Object.assign({},i({},_.asset_uuid,j))));case 43:l=!0,e.next=10;break;case 46:e.next=52;break;case 48:e.prev=48,e.t1=e.catch(8),f=!0,d=e.t1;case 52:e.prev=52,e.prev=53,l||null==p.return||p.return();case 55:if(e.prev=55,!f){e.next=58;break}throw d;case 58:return e.finish(55);case 59:return e.finish(52);case 60:return e.abrupt("return",c);case 63:e.prev=63,e.t2=e.catch(4),s("getAssetUuids() ".concat(e.t2));case 66:case"end":return e.stop()}},e,null,[[4,63],[8,48,52,60],[21,25,29,37],[30,,32,36],[53,,55,59]])}))).apply(this,arguments)}function O(e){return E.apply(this,arguments)}function E(){return(E=l(regeneratorRuntime.mark(function e(t){var n,u,o=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=o.length>1&&void 0!==o[1]?o[1]:"png",u=o.length>2&&void 0!==o[2]?o[2]:"./downloads";try{t.forEach(function(){var e=l(regeneratorRuntime.mark(function e(t){var o,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=Object.keys(t),i=Object.values(t),e.prev=2,e.next=5,a.default.downloadAsset(o,n.toUpperCase());case 5:return c=e.sent,e.next=8,r.default.outputFile("".concat(u,"/").concat(i,".").concat(n.toLowerCase()),c,"binary");case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),s("Err: ".concat(e.t0));case 13:case"end":return e.stop()}},e,null,[[2,10]])}));return function(t){return e.apply(this,arguments)}}())}catch(e){s("batchDownload(): ".concat(e))}case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}function k(){return(k=l(regeneratorRuntime.mark(function e(){var t,n,r,u,o,i,c,l,p=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=p.length>0&&void 0!==p[0]?p[0]:"Test Me",n=p.length>1&&void 0!==p[1]?p[1]:null,r=p.length>2&&void 0!==p[2]?p[2]:"./downloads",u=p.length>3&&void 0!==p[3]?p[3]:"PNG",o=p.length>4&&void 0!==p[4]?p[4]:null,i=p.length>5&&void 0!==p[5]?p[5]:null,c=p.length>6&&void 0!==p[6]?p[6]:0,null!=n){e.next=9;break}throw Error("Extract Target is required");case 9:return l=f(o,i),a.default.setup(l[0],l[1]),e.prev=11,e.t0=O,e.t1=g,e.t2=formatAssetContainers,e.t3=h,e.next=18,d(t);case 18:return e.t4=e.sent,e.t5=n,e.t6=c,e.next=23,(0,e.t3)(e.t4,e.t5,e.t6);case 23:return e.t7=e.sent,e.t8=(0,e.t2)(e.t7),e.next=27,(0,e.t1)(e.t8);case 27:return e.t9=e.sent,e.t10=u,e.t11=r,e.next=32,(0,e.t0)(e.t9,e.t10,e.t11);case 32:e.next=37;break;case 34:e.prev=34,e.t12=e.catch(11),s("init() ".concat(e.t12));case 37:case"end":return e.stop()}},e,null,[[11,34]])}))).apply(this,arguments)}},function(e,t){e.exports=require("Lingojs")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default={testMe:{targetOne:{sections:[{name:"Illustrations"}]},targetTwo:{sections:[{name:"Illustrations",headers:["Lined"]}]}},capswan:{targetOne:{sections:[{name:"Illustrations"},{name:"Icons",headers:["Icons","Components"]}]},targetTwo:{sections:[{name:"Icons"}]}}}},function(e,t){e.exports=require("dotenv")}]));
//# sourceMappingURL=main.js.map