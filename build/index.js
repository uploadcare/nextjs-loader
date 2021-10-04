"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadcareLoader = void 0;
const UploadcareImage_1 = __importDefault(require("./components/UploadcareImage"));
const loader_1 = __importDefault(require("./utils/loader"));
exports.uploadcareLoader = loader_1.default;
exports.default = UploadcareImage_1.default;
