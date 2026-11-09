"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpFetch = exports.DEFAULT_TIMEOUT_MS = exports.DEFAULT_RETRY = exports.RateLimiter = exports.DEFAULT_PAUSE_MS = exports.CLIENT_ERROR_COST = exports.toApiError = exports.redact = exports.reasonFor = exports.parseBody = exports.errorFromResponse = exports.ApiError = exports.resolveToken = exports.authHeader = exports.CORE_VERSION = void 0;
/**
 * `@apilki/core` — общее рукописное ядро клиентов @apilki.
 *
 * Четыре модуля по контракту (requirements:86 п.1): `auth`, `http`, `errors`,
 * `rate-limit`. Ядро не знает ни одного вендора: конверты ошибок, разбор
 * токенов и песочницы живут в клиентах. В реестр пакет не публикуется — едет
 * бандлом внутрь каждого клиента.
 */
exports.CORE_VERSION = '0.1.0';
var auth_ts_1 = require("./auth.js");
Object.defineProperty(exports, "authHeader", { enumerable: true, get: function () { return auth_ts_1.authHeader; } });
Object.defineProperty(exports, "resolveToken", { enumerable: true, get: function () { return auth_ts_1.resolveToken; } });
var errors_ts_1 = require("./errors.js");
Object.defineProperty(exports, "ApiError", { enumerable: true, get: function () { return errors_ts_1.ApiError; } });
Object.defineProperty(exports, "errorFromResponse", { enumerable: true, get: function () { return errors_ts_1.errorFromResponse; } });
Object.defineProperty(exports, "parseBody", { enumerable: true, get: function () { return errors_ts_1.parseBody; } });
Object.defineProperty(exports, "reasonFor", { enumerable: true, get: function () { return errors_ts_1.reasonFor; } });
Object.defineProperty(exports, "redact", { enumerable: true, get: function () { return errors_ts_1.redact; } });
Object.defineProperty(exports, "toApiError", { enumerable: true, get: function () { return errors_ts_1.toApiError; } });
var rate_limit_ts_1 = require("./rate-limit.js");
Object.defineProperty(exports, "CLIENT_ERROR_COST", { enumerable: true, get: function () { return rate_limit_ts_1.CLIENT_ERROR_COST; } });
Object.defineProperty(exports, "DEFAULT_PAUSE_MS", { enumerable: true, get: function () { return rate_limit_ts_1.DEFAULT_PAUSE_MS; } });
Object.defineProperty(exports, "RateLimiter", { enumerable: true, get: function () { return rate_limit_ts_1.RateLimiter; } });
var http_ts_1 = require("./http.js");
Object.defineProperty(exports, "DEFAULT_RETRY", { enumerable: true, get: function () { return http_ts_1.DEFAULT_RETRY; } });
Object.defineProperty(exports, "DEFAULT_TIMEOUT_MS", { enumerable: true, get: function () { return http_ts_1.DEFAULT_TIMEOUT_MS; } });
Object.defineProperty(exports, "createHttpFetch", { enumerable: true, get: function () { return http_ts_1.createHttpFetch; } });
