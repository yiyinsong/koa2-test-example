"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){function n(o,u){try{var a=r[o](u),i=a.value}catch(e){return void t(e)}if(!a.done)return Promise.resolve(i).then(function(e){n("next",e)},function(e){n("throw",e)});e(i)}return n("next")})}}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),Router=require("koa-router"),router=new Router;router.get("/",function(){var e=_asyncToGenerator(_regenerator2.default.mark(function e(r,t){return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.render("./frontend/index");case 2:case"end":return e.stop()}},e,void 0)}));return function(r,t){return e.apply(this,arguments)}}()),exports.default=router;
//# sourceMappingURL=route.js.map
