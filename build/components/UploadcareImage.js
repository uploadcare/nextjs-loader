"use strict";;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const react_1 = __importDefault(require("react"));
const __1 = require("../");
function UploadcareImage(props) {
    return react_1.default.createElement(image_1.default, Object.assign({ loader: __1.uploadcareLoader }, props));
}
exports.default = UploadcareImage;
module.exports = exports["default"];
