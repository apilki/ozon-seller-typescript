"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY_ENV = exports.CLIENT_ID_ENV = void 0;
exports.resolveAuth = resolveAuth;
exports.authHeaders = authHeaders;
/**
 * Авторизация Ozon Seller: два заголовка вместо одного.
 *
 * Ozon не использует `Authorization`: ключ продавца едет парой
 * `Client-Id` + `Api-Key`. Поэтому общий `authHeader` ядра не подходит, а
 * `resolveToken` — подходит: правило «конфиг важнее окружения, пробелы срезаем»
 * одинаковое у всех вендоров.
 */
const auth_ts_1 = require("./shared/auth.js");
exports.CLIENT_ID_ENV = 'OZON_CLIENT_ID';
exports.API_KEY_ENV = 'OZON_API_KEY';
/** Окружение без зависимости от типов Node (ядро годится и для бандла). */
function envOrEmpty() {
    var _a, _b;
    return (_b = (_a = globalThis.process) === null || _a === void 0 ? void 0 : _a.env) !== null && _b !== void 0 ? _b : {};
}
/** Ключи из конфига или окружения; без них — понятная ошибка до сети. */
function resolveAuth(config = {}, env = envOrEmpty()) {
    const clientId = (0, auth_ts_1.resolveToken)({ token: config.clientId }, env, exports.CLIENT_ID_ENV);
    const apiKey = (0, auth_ts_1.resolveToken)({ token: config.apiKey }, env, exports.API_KEY_ENV);
    const missing = [];
    if (!clientId)
        missing.push(`clientId (${exports.CLIENT_ID_ENV})`);
    if (!apiKey)
        missing.push(`apiKey (${exports.API_KEY_ENV})`);
    if (missing.length > 0)
        throw new Error(`нет ключей Ozon: передайте ${missing.join(' и ')}`);
    return { clientId, apiKey };
}
/** Заголовки авторизации для каждого запроса. */
function authHeaders(auth) {
    return { 'Client-Id': auth.clientId, 'Api-Key': auth.apiKey };
}
