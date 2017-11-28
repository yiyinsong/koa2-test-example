"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){function n(o,a){try{var u=r[o](a),s=u.value}catch(e){return void t(e)}if(!u.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},_createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),_mongoose=require("mongoose"),_mongoose2=_interopRequireDefault(_mongoose),Schema=_mongoose2.default.Schema,SessionSchema=new Schema({_id:{type:String,unique:!0,require:!0},value:String}),MongooseStore=function(){function e(){_classCallCheck(this,e),this.SessionModel=_mongoose2.default.model("session",SessionSchema)}return _createClass(e,[{key:"get",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark(function e(r){var t;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.SessionModel.findOne({_id:r});case 3:return t=e.sent,e.abrupt("return",JSON.parse(t.value));case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0);case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(r){return e.apply(this,arguments)}}()},{key:"set",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark(function e(r,t,n){var o,a;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=_extends({},t),o=t.cookie&&(t.cookie.maxAge||t.cookie.maxage),t.ttl=new Date((n||("number"==typeof o?o:864e5))+Date.now()),e.prev=3,e.next=6,this.SessionModel.findOneAndUpdate({_id:r},{value:JSON.stringify(t)},{upsert:!0,returnNewDocument:!0});case 6:return a=e.sent,e.abrupt("return",a);case 10:return e.prev=10,e.t0=e.catch(3),console.log(e.t0),e.abrupt("return",e.t0);case 14:case"end":return e.stop()}},e,this,[[3,10]])}));return function(r,t,n){return e.apply(this,arguments)}}()},{key:"destroy",value:function(){var e=_asyncToGenerator(_regenerator2.default.mark(function e(r){var t;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("........................destroy......................"),e.prev=1,e.next=4,this.SessionModel.findOneAndRemove({_id:r});case 4:return t=e.sent,e.abrupt("return",t);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}},e,this,[[1,8]])}));return function(r){return e.apply(this,arguments)}}()}]),e}();exports.default=MongooseStore;