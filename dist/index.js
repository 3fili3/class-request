"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Https = void 0;
const axios_1 = __importDefault(require("axios"));
class Https {
    constructor(routerPrive) {
        this.RouterPrivate = routerPrive;
        this.Path = '';
        this.Method = '';
        this.Body = null;
    }
    static config(data) {
        Https.RouterPrivateGlobal = data.router;
        if (data.auth != undefined) {
            Https.Authorization = data.auth;
        }
        if (data.functionError != undefined) {
            this.FunctionMessageError = data.functionError;
        }
        if (data.headers != undefined) {
            Https.Headers = data.headers;
        }
    }
    Get(path, messageSuccess, functionsCalculeUpload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Path = path;
            this.Method = 'GET';
            return yield this.Builder(messageSuccess, functionsCalculeUpload);
        });
    }
    Post(path, body, messageSuccess, functionsCalculeUpload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Path = path;
            this.Body = body;
            this.Method = 'POST';
            return yield this.Builder(messageSuccess, functionsCalculeUpload);
        });
    }
    Put(path, body, messageSuccess, functionsCalculeUpload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Path = path;
            this.Body = body;
            this.Method = 'PUT';
            return yield this.Builder(messageSuccess, functionsCalculeUpload);
        });
    }
    Delete(path, body, messageSuccess, functionsCalculeUpload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Path = path;
            this.Body = body;
            this.Method = 'DELETE';
            return yield this.Builder(messageSuccess, functionsCalculeUpload);
        });
    }
    getRouterPrive() {
        return this.RouterPrivate;
    }
    Builder(messageErrorSuccess, functionsCalculeUpload) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathServer = this.RouterPrivate === undefined ? Https.RouterPrivateGlobal : this.RouterPrivate;
            let otherHeaders = {};
            if (Https.Headers != undefined) {
                otherHeaders = Https.Headers();
            }
            console.log(otherHeaders);
            try {
                const token = Https.Authorization();
                const result = (yield (0, axios_1.default)({
                    url: `${pathServer}${this.Path}`,
                    method: this.Method,
                    data: this.Body,
                    headers: Object.assign({ authorization: `Bearer ${token}` }, otherHeaders)
                })).data;
                if (!result.hasOwnProperty('service')) {
                    if (messageErrorSuccess != undefined) {
                        messageErrorSuccess(result);
                    }
                }
                return result.service;
            }
            catch (error) {
                console.log(error);
                const errorTemp = error;
                const MessageErrorSuccess = { message: errorTemp.response.data.message, status: errorTemp.response.data.status };
                if (Https.FunctionMessageError != undefined) {
                    Https.FunctionMessageError(MessageErrorSuccess);
                }
                throw (MessageErrorSuccess);
            }
        });
    }
}
exports.Https = Https;
