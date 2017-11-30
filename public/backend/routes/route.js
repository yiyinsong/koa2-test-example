"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _koaRouter=require("koa-router"),_koaRouter2=_interopRequireDefault(_koaRouter),_utils=require("../controller/api/utils"),_utils2=_interopRequireDefault(_utils),_main=require("../controller/main"),_main2=_interopRequireDefault(_main),_sign=require("../controller/sign"),_sign2=_interopRequireDefault(_sign),router=new _koaRouter2.default;router.get("/",_main2.default.index),router.get("/register",_sign2.default.register),router.get("/login",_sign2.default.login),router.post("/admin/register",_sign2.default.registerHandle),router.post("/admin/login",_sign2.default.loginHandle),router.get("/logout",_sign2.default.logoutHandle),router.post("/goodslist",_main2.default.goodsList),router.post("/api/upload",_utils2.default.upload),exports.default=router;