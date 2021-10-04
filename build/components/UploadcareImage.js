"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadcareImage = void 0;
const image_1 = __importDefault(require("next/image"));
const react_1 = __importDefault(require("react"));
const loader_1 = require("../utils/loader");
function UploadcareImage(props) {
    return react_1.default.createElement(image_1.default, Object.assign({ loader: loader_1.uploadcareLoader }, props));
}
exports.UploadcareImage = UploadcareImage;
