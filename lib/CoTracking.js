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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
var cheerio_1 = __importDefault(require("cheerio"));
var Track_1 = __importDefault(require("./entities/Track"));
var Order_1 = __importDefault(require("./entities/Order"));
var CoTracking = /** @class */ (function () {
    function CoTracking() {
        var _this = this;
        this.verifyOrderCode = function (code) {
            return /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(code);
        };
        this.formatTrack = function (data) {
            var replaceData = data.replace(/\n|\t|\|/g, '#');
            var newData = replaceData.split('#').filter(function (dt) { return dt !== ''; });
            var lis = newData.reduce(function (acc, cur) {
                var _a = cur.split(': '), key = _a[0], value = _a[1];
                var index = key.trim().toLowerCase();
                acc[index] = value.trim();
                return acc;
            }, {});
            return lis;
        };
        this.track = function (code) { return __awaiter(_this, void 0, void 0, function () {
            var promises, orders, isValid, response, html, $, uls, tracks, order;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(code)) return [3 /*break*/, 2];
                        promises = code.map(function (cd) { return __awaiter(_this, void 0, void 0, function () {
                            var isValid, response, html, $, uls, tracks, order;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        isValid = this.verifyOrderCode(cd);
                                        if (!isValid) {
                                            throw new Error("Code " + cd + " is invalid.");
                                        }
                                        return [4 /*yield*/, isomorphic_fetch_1.default("https://www.linkcorreios.com.br/" + cd)];
                                    case 1:
                                        response = _a.sent();
                                        return [4 /*yield*/, response.text()];
                                    case 2:
                                        html = _a.sent();
                                        $ = cheerio_1.default.load(html);
                                        uls = [];
                                        $('.linha_status').each(function (index, element) {
                                            uls.push($(element).text().toString().trim());
                                        });
                                        tracks = uls.map(function (ul) {
                                            var stringUl = ul.toString();
                                            var trackUl = _this.formatTrack(stringUl);
                                            var track = new Track_1.default(trackUl.status, trackUl.origem, trackUl.destino, trackUl.data, trackUl.hora);
                                            return track;
                                        });
                                        order = new Order_1.default(cd, tracks);
                                        return [2 /*return*/, order];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, orders];
                    case 2:
                        isValid = this.verifyOrderCode(code);
                        if (!isValid) {
                            throw new Error('Invalid code.');
                        }
                        return [4 /*yield*/, isomorphic_fetch_1.default("https://www.linkcorreios.com.br/" + code)];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 4:
                        html = _a.sent();
                        $ = cheerio_1.default.load(html);
                        uls = [];
                        $('.linha_status').each(function (index, element) {
                            uls.push($(element).text().toString().trim());
                        });
                        tracks = uls.map(function (ul) {
                            var stringUl = ul.toString();
                            var trackUl = _this.formatTrack(stringUl);
                            var track = new Track_1.default(trackUl.status, trackUl.origem, trackUl.destino, trackUl.data, trackUl.hora);
                            return track;
                        });
                        order = new Order_1.default(code, tracks);
                        return [2 /*return*/, order];
                }
            });
        }); };
    }
    return CoTracking;
}());
exports.default = CoTracking;
//# sourceMappingURL=CoTracking.js.map