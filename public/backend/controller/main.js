"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){function n(o,i){try{var u=r[o](i),s=u.value}catch(e){return void t(e)}if(!u.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_isomorphicFetch=require("isomorphic-fetch"),_isomorphicFetch2=_interopRequireDefault(_isomorphicFetch),index=function(){var e=_asyncToGenerator(_regenerator2.default.mark(function e(r,t){return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(r.session.user),e.next=3,r.render("./frontend/index",{title:"首页",userInfo:r.session.user});case 3:case"end":return e.stop()}},e,void 0)}));return function(r,t){return e.apply(this,arguments)}}(),goodsList=function(){var e=_asyncToGenerator(_regenerator2.default.mark(function e(r,t){var n;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,_isomorphicFetch2.default)("http://jdhdev4.jdhui.com/apic/web/index.php?r=goods/goods-list/list",{method:"GET"});case 2:return n=e.sent,e.next=5,n.json();case 5:n=e.sent,r.body=n,console.log(n);case 8:case"end":return e.stop()}},e,void 0)}));return function(r,t){return e.apply(this,arguments)}}();exports.default={index:index,goodsList:goodsList};