/**
 * Сшивка ядра со сгенерированным кодом Ozon.
 *
 * Генератор даёт 58 независимых `Configuration` (по одной на раздел). Здесь
 * один вызов `configure(items.Configuration)` отдаёт готовый конфиг раздела:
 * ключи продавца в заголовках, общий транспорт (таймаут, отмена, ретраи
 * 429/5xx по `Retry-After`) и общий лимитер с дефолтной паузой — заголовков
 * лимита Ozon не отдаёт, поэтому «нет заголовков» трактуется как «держи паузу».
 */
import { authHeaders, resolveAuth } from "./auth.js";
import { RateLimiter } from "./shared/rate-limit.js";
import { createHttpFetch } from "./shared/http.js";
export function configure(Ctor, options = {}) {
    var _a, _b, _c, _d, _e;
    const auth = resolveAuth(options, options.env);
    const limiterOptions = options.now ? { now: options.now } : {};
    const limiter = (_a = options.limiter) !== null && _a !== void 0 ? _a : new RateLimiter(limiterOptions);
    const probe = new Ctor({});
    const basePath = (_b = options.basePath) !== null && _b !== void 0 ? _b : probe.basePath;
    const transport = createHttpFetch(Object.assign(Object.assign(Object.assign(Object.assign({ fetch: (_c = options.fetchApi) !== null && _c !== void 0 ? _c : ((url, init) => fetch(url, init)), limiter, host: new URL(basePath).host }, (options.timeoutMs ? { timeoutMs: options.timeoutMs } : {})), (options.retry ? { retry: options.retry } : {})), (options.sleep ? { sleep: options.sleep } : {})), (options.now ? { now: options.now } : {})));
    const config = new Ctor({
        basePath,
        headers: authHeaders(auth),
        fetchApi: transport.fetch,
    });
    // Заголовки обязан принять именно Configuration: у схемы раздела может быть
    // своё имя поля, и тогда ключи ушли бы в никуда.
    const kept = ((_d = config.headers) === null || _d === void 0 ? void 0 : _d['Api-Key']) === auth.apiKey && ((_e = config.headers) === null || _e === void 0 ? void 0 : _e['Client-Id']) === auth.clientId;
    if (!kept) {
        throw new Error('Configuration не принял заголовки Client-Id/Api-Key — у схемы раздела другое поле');
    }
    return { config, limiter };
}
