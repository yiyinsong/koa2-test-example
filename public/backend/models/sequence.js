"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _mongoose=require("mongoose"),_mongoose2=_interopRequireDefault(_mongoose),_sequence=require("../schemas/sequence"),_sequence2=_interopRequireDefault(_sequence),sequenceModel=_mongoose2.default.model("sequence",_sequence2.default);exports.default=sequenceModel;