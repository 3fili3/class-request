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
    }
    Get(path, functionsCalculeUpload, messageSuccess, messageErrorServer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Path = path;
            this.Method = 'GET';
            return yield this.Builder(functionsCalculeUpload, messageSuccess, messageErrorServer);
        });
    }
    Post(path, body, functionsCalculeUpload, messageSuccess, messageErrorServer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Path = path;
            this.Body = body;
            this.Method = 'POST';
            return yield this.Builder(functionsCalculeUpload, messageSuccess, messageErrorServer);
        });
    }
    Put(path, body, functionsCalculeUpload, messageSuccess, messageErrorServer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Path = path;
            this.Body = body;
            this.Method = 'PUT';
            return yield this.Builder(functionsCalculeUpload, messageSuccess, messageErrorServer);
        });
    }
    Delete(path, body, functionsCalculeUpload, messageSuccess, messageErrorServer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Path = path;
            this.Body = body;
            this.Method = 'DELETE';
            return yield this.Builder(functionsCalculeUpload, messageSuccess, messageErrorServer);
        });
    }
    getRouterPrive() {
        return this.RouterPrivate;
    }
    Builder(functionsCalculeUpload, messageErrorSuccess, messageErrorServer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = Https.Authorization();
                const result = ((yield (0, axios_1.default)({
                    url: `${Https.RouterPrivateGlobal}${this.Path}`,
                    method: this.Method,
                    data: this.Body,
                    headers: { authorization: token }
                })).data).service;
                return result;
            }
            catch (error) {
                const errorTemp = error;
                const MessageErrorSuccess = { message: errorTemp.response.data.message, status: errorTemp.response.data.status };
                if (errorTemp.response.data.status === 200) {
                    if (messageErrorSuccess != undefined) {
                        messageErrorSuccess(MessageErrorSuccess);
                        throw (MessageErrorSuccess);
                    }
                }
                else {
                    if (messageErrorServer != undefined) {
                        messageErrorServer(MessageErrorSuccess);
                        throw (MessageErrorSuccess);
                    }
                }
                throw (MessageErrorSuccess);
            }
        });
    }
}
exports.Https = Https;
