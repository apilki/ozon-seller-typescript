/**
 * Авторизация Ozon Seller: два заголовка вместо одного.
 *
 * Ozon не использует `Authorization`: ключ продавца едет парой
 * `Client-Id` + `Api-Key`. Поэтому общий `authHeader` ядра не подходит, а
 * `resolveToken` — подходит: правило «конфиг важнее окружения, пробелы срезаем»
 * одинаковое у всех вендоров.
 */
import { resolveToken } from "./shared/auth.js";
export const CLIENT_ID_ENV = 'OZON_CLIENT_ID';
export const API_KEY_ENV = 'OZON_API_KEY';
/** Окружение без зависимости от типов Node (ядро годится и для бандла). */
function envOrEmpty() {
    var _a, _b;
    return (_b = (_a = globalThis.process) === null || _a === void 0 ? void 0 : _a.env) !== null && _b !== void 0 ? _b : {};
}
/** Ключи из конфига или окружения; без них — понятная ошибка до сети. */
export function resolveAuth(config = {}, env = envOrEmpty()) {
    const clientId = resolveToken({ token: config.clientId }, env, CLIENT_ID_ENV);
    const apiKey = resolveToken({ token: config.apiKey }, env, API_KEY_ENV);
    const missing = [];
    if (!clientId)
        missing.push(`clientId (${CLIENT_ID_ENV})`);
    if (!apiKey)
        missing.push(`apiKey (${API_KEY_ENV})`);
    if (missing.length > 0)
        throw new Error(`нет ключей Ozon: передайте ${missing.join(' и ')}`);
    return { clientId, apiKey };
}
/** Заголовки авторизации для каждого запроса. */
export function authHeaders(auth) {
    return { 'Client-Id': auth.clientId, 'Api-Key': auth.apiKey };
}
