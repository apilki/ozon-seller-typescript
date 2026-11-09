"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shared = exports.configure = exports.redact = exports.ApiError = exports.createHttpFetch = exports.DEFAULT_TIMEOUT_MS = exports.DEFAULT_RETRY = exports.RateLimiter = exports.DEFAULT_PAUSE_MS = exports.CLIENT_ERROR_COST = exports.toOzonError = exports.ozonErrorFromResponse = exports.OzonApiError = exports.resolveAuth = exports.authHeaders = exports.CLIENT_ID_ENV = exports.API_KEY_ENV = exports.CORE_VERSION = void 0;
/**
 * Рукописное ядро клиента @apilki/ozon.
 *
 * Четыре модуля: `auth`, `http`, `errors`,
 * `rate-limit`. Ядро не зависит от сгенерированного кода: `typecheck` проходит
 * на чистом клоне, где `output/` ещё нет. Сшивка «ядро + API-классы» — `wiring.ts`.
 */
exports.CORE_VERSION = '0.1.0';
var auth_ts_1 = require("./auth.js");
Object.defineProperty(exports, "API_KEY_ENV", { enumerable: true, get: function () { return auth_ts_1.API_KEY_ENV; } });
Object.defineProperty(exports, "CLIENT_ID_ENV", { enumerable: true, get: function () { return auth_ts_1.CLIENT_ID_ENV; } });
Object.defineProperty(exports, "authHeaders", { enumerable: true, get: function () { return auth_ts_1.authHeaders; } });
Object.defineProperty(exports, "resolveAuth", { enumerable: true, get: function () { return auth_ts_1.resolveAuth; } });
var errors_ts_1 = require("./errors.js");
Object.defineProperty(exports, "OzonApiError", { enumerable: true, get: function () { return errors_ts_1.OzonApiError; } });
Object.defineProperty(exports, "ozonErrorFromResponse", { enumerable: true, get: function () { return errors_ts_1.ozonErrorFromResponse; } });
Object.defineProperty(exports, "toOzonError", { enumerable: true, get: function () { return errors_ts_1.toOzonError; } });
var rate_limit_ts_1 = require("./shared/rate-limit.js");
Object.defineProperty(exports, "CLIENT_ERROR_COST", { enumerable: true, get: function () { return rate_limit_ts_1.CLIENT_ERROR_COST; } });
Object.defineProperty(exports, "DEFAULT_PAUSE_MS", { enumerable: true, get: function () { return rate_limit_ts_1.DEFAULT_PAUSE_MS; } });
Object.defineProperty(exports, "RateLimiter", { enumerable: true, get: function () { return rate_limit_ts_1.RateLimiter; } });
var http_ts_1 = require("./shared/http.js");
Object.defineProperty(exports, "DEFAULT_RETRY", { enumerable: true, get: function () { return http_ts_1.DEFAULT_RETRY; } });
Object.defineProperty(exports, "DEFAULT_TIMEOUT_MS", { enumerable: true, get: function () { return http_ts_1.DEFAULT_TIMEOUT_MS; } });
Object.defineProperty(exports, "createHttpFetch", { enumerable: true, get: function () { return http_ts_1.createHttpFetch; } });
var errors_ts_2 = require("./shared/errors.js");
Object.defineProperty(exports, "ApiError", { enumerable: true, get: function () { return errors_ts_2.ApiError; } });
Object.defineProperty(exports, "redact", { enumerable: true, get: function () { return errors_ts_2.redact; } });
var wiring_ts_1 = require("./wiring.js");
Object.defineProperty(exports, "configure", { enumerable: true, get: function () { return wiring_ts_1.configure; } });
/** Общая часть ядра (@apilki/core), вендорено в `shared/`. */
exports.shared = require("./shared/index.js");
