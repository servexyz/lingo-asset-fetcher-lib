!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getLingoSetupVariables=f,t.getKitId=p,t.getRelevantAssetContainers=h,t.formatAssetContainers=g,t.getAssetUuids=m,t.batchDownload=x,t.default=function(){return O.apply(this,arguments)};var r=u(n(2)),a=u(n(3));u(n(4));function u(e){return e&&e.__esModule?e:{default:e}}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,u=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,u=e}finally{try{r||null==s.return||s.return()}finally{if(a)throw u}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t,n,r,a,u,o){try{var s=e[u](o),i=s.value}catch(e){return void n(e)}s.done?t(i):Promise.resolve(i).then(r,a)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var u=e.apply(t,n);function o(e){i(u,r,a,o,s,"next",e)}function s(e){i(u,r,a,o,s,"throw",e)}o(void 0)})}}n(5).config();var l=console.log;function f(e,t){return null==e||null==t?[process.env.SPACE_ID,process.env.API_TOKEN]:[e,t]}function p(){return d.apply(this,arguments)}function d(){return(d=c(regeneratorRuntime.mark(function e(){var t,n,r=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"Capswan - Mobile App - Style Guide",e.prev=1,e.next=4,a.default.fetchKits();case 4:return e.sent.forEach(function(e){e.name===t&&(n=e.kit_uuid)}),e.abrupt("return",n);case 9:e.prev=9,e.t0=e.catch(1),l("getKitId() ".concat(e.t0));case 12:case"end":return e.stop()}},e,null,[[1,9]])}))).apply(this,arguments)}function h(e,t){return v.apply(this,arguments)}function v(){return(v=c(regeneratorRuntime.mark(function e(t,n){var r,u,o,s=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=s.length>2&&void 0!==s[2]?s[2]:0,e.prev=1,u={sections:[]},e.next=5,a.default.fetchKitOutline(t,r);case 5:return o=e.sent,n.sections.forEach(function(e){Object.values(o).forEach(function(t){var n=[];e.name===t.name&&(e.hasOwnProperty("headers")&&e.headers.forEach(function(e){t.headers.forEach(function(t){e===t.name&&n.push(t.uuid)})}),u.sections.push({name:t.name,uuid:t.uuid,headers:n}))})}),e.abrupt("return",u);case 10:e.prev=10,e.t0=e.catch(1),l("getRelevantAssetContainers() ".concat(e.t0));case 13:case"end":return e.stop()}},e,null,[[1,10]])}))).apply(this,arguments)}function g(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:assetContainers).sections,t=[];return e.forEach(function(e,n){e.hasOwnProperty("headers")&&0===e.headers.length?t.push(Object.assign({},s({},e.uuid,null))):e.headers.forEach(function(n){t.push(Object.assign({},s({},e.uuid,n)))})}),t}function b(e,t){if(t.length>=1){var n=t.split(",").map(function(e){return e.trim()}).map(function(e){return e.replace(/ /g,"_")}).join("_");return e.replace(/ /g,"_")+"_"+n}return e}function m(e){return y.apply(this,arguments)}function y(){return(y=c(regeneratorRuntime.mark(function e(t){var n,r,u,i,c,f,p,d,h,v,g,m,y,x,w,O,k,_,j,P,E,R,A,S,C,M=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=M.length>1&&void 0!==M[1]?M[1]:0,r=M.length>2&&void 0!==M[2]?M[2]:1,u=M.length>3&&void 0!==M[3]?M[3]:2e3,i=[],e.prev=4,c=!0,f=!1,p=void 0,e.prev=8,d=t[Symbol.iterator]();case 10:if(c=(h=d.next()).done){e.next=47;break}if(v=h.value,g=Object.keys(v)[0],null!==(m=Object.values(v)[0])){e.next=39;break}return e.next=17,a.default.fetchSection(g,n,r,u);case 17:for(y=e.sent,x=!0,w=!1,O=void 0,e.prev=21,k=y.items[Symbol.iterator]();!(x=(_=k.next()).done);x=!0)null!==(j=_.value).asset_uuid&&(P=j.asset.hasOwnProperty("keywords")?b(j.asset.name,j.asset.keywords):j.asset.name,i.push(Object.assign({},s({},j.asset_uuid,P))));e.next=29;break;case 25:e.prev=25,e.t0=e.catch(21),w=!0,O=e.t0;case 29:e.prev=29,e.prev=30,x||null==k.return||k.return();case 32:if(e.prev=32,!w){e.next=35;break}throw O;case 35:return e.finish(32);case 36:return e.finish(29);case 37:e.next=44;break;case 39:return e.next=41,a.default.fetchAssetsForHeading(g,m);case 41:for(E=e.sent,R=Object.entries(E,null,2),A=0;A<R.length;A++)S=o(R[A],2),S[0],null!==(C=S[1]).asset_uuid&&(P=C.asset.hasOwnProperty("keywords")?b(C.asset.name,C.asset.keywords):C.asset.name,i.push(Object.assign({},s({},C.asset_uuid,P))));case 44:c=!0,e.next=10;break;case 47:e.next=53;break;case 49:e.prev=49,e.t1=e.catch(8),f=!0,p=e.t1;case 53:e.prev=53,e.prev=54,c||null==d.return||d.return();case 56:if(e.prev=56,!f){e.next=59;break}throw p;case 59:return e.finish(56);case 60:return e.finish(53);case 61:return e.abrupt("return",i);case 64:e.prev=64,e.t2=e.catch(4),l("getAssetUuids() ".concat(e.t2));case 67:case"end":return e.stop()}},e,null,[[4,64],[8,49,53,61],[21,25,29,37],[30,,32,36],[54,,56,60]])}))).apply(this,arguments)}function x(e){return w.apply(this,arguments)}function w(){return(w=c(regeneratorRuntime.mark(function e(t){var n,u,o=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=o.length>1&&void 0!==o[1]?o[1]:"png",u=o.length>2&&void 0!==o[2]?o[2]:"./downloads";try{t.forEach(function(){var e=c(regeneratorRuntime.mark(function e(t){var o,s,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=Object.keys(t),s=Object.values(t),e.prev=2,e.next=5,a.default.downloadAsset(o,n.toUpperCase());case 5:return i=e.sent,e.next=8,r.default.outputFile("".concat(u,"/").concat(s,".").concat(n.toLowerCase()),i,"binary");case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),l("Err: ".concat(e.t0));case 13:case"end":return e.stop()}},e,null,[[2,10]])}));return function(t){return e.apply(this,arguments)}}())}catch(e){l("batchDownload(): ".concat(e))}case 3:case"end":return e.stop()}},e)}))).apply(this,arguments)}function O(){return(O=c(regeneratorRuntime.mark(function e(){var t,n,r,u,o,s,i,c,l=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=l.length>0&&void 0!==l[0]?l[0]:"Capswan - Mobile App - Style Guide",n=l.length>1&&void 0!==l[1]?l[1]:null,r=l.length>2&&void 0!==l[2]?l[2]:"./downloads",u=l.length>3&&void 0!==l[3]?l[3]:"PNG",o=l.length>4&&void 0!==l[4]?l[4]:null,s=l.length>5&&void 0!==l[5]?l[5]:null,i=l.length>6&&void 0!==l[6]?l[6]:0,null!=n){e.next=9;break}throw Error("Extract Target is required");case 9:return c=f(o,s),a.default.setup(c[0],c[1]),e.t0=x,e.t1=m,e.t2=g,e.t3=h,e.next=17,p(t);case 17:return e.t4=e.sent,e.t5=n,e.t6=i,e.next=22,(0,e.t3)(e.t4,e.t5,e.t6);case 22:return e.t7=e.sent,e.t8=(0,e.t2)(e.t7),e.next=26,(0,e.t1)(e.t8);case 26:return e.t9=e.sent,e.t10=u,e.t11=r,e.next=31,(0,e.t0)(e.t9,e.t10,e.t11);case 31:case"end":return e.stop()}},e)}))).apply(this,arguments)}},function(e,t){e.exports=require("fs-extra")},function(e,t){e.exports=require("Lingojs")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={testMe:{targetOne:{sections:[{name:"illustrations"}]},targetTwo:{sections:[{name:"illustrations",headers:["Lined"]}]}},capswan:{targetOne:{sections:[{name:"Illustrations"},{name:"Icons",headers:["Icons","Components"]}]},targetTwo:{sections:[{name:"Icons"}]}}}},function(e,t){e.exports=require("dotenv")}]));
//# sourceMappingURL=main.js.map