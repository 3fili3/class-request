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
        this.RouterPrivate = 'https://clicko.com.mx/storage/v1/';
        this.Authorization = '';
        if (routerPrive != undefined) {
            this.RouterPrivate = routerPrive;
        }
        if (Https.RouterPrivateGlobal != undefined) {
            this.RouterPrivate = Https.RouterPrivateGlobal;
        }
        if (Https.Authorization != '') {
            this.Authorization = Https.Authorization;
        }
        this.Path = '';
        this.Method = '';
        this.Body = null;
        this.apiKey = '';
    }
    static config(data) {
        this.RouterPrivateGlobal = data.router;
        this.Authorization = data.auth != undefined ? data.auth : '';
    }
    Get(path) {
        this.Path = path;
        this.Method = 'GET';
        return this;
    }
    Post(path, body) {
        this.Path = path;
        this.Body = body;
        this.Method = 'POST';
        return this;
    }
    Put(path, body) {
        this.Path = path;
        this.Body = body;
        this.Method = 'PUT';
        return this;
    }
    Delete(path, body) {
        this.Path = path;
        this.Body = body;
        this.Method = 'DELETE';
        return this;
    }
    Auth(auth) {
        this.Authorization = auth;
        return this;
    }
    ApiKey(apiKey) {
        this.apiKey = apiKey;
        return this;
    }
    getRouterPrive() {
        return this.RouterPrivate;
    }
    Builder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = ((yield (0, axios_1.default)({
                    url: `${this.RouterPrivate}${this.Path}`,
                    method: this.Method,
                    data: this.Body,
                    headers: this.apiKey === '' ? { authorization: `Bearer ${this.Authorization}` } : { authorization: this.apiKey }
                })).data).service;
                return result;
            }
            catch (error) {
                throw ({ message: error });
            }
        });
    }
}
exports.Https = Https;
