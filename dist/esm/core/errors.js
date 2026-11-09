var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Ошибки Ozon Seller: один класс ядра + разбор вендорского конверта.
 *
 * Ozon отвечает `{ code, message, details }` (у части методов `details` — массив
 * объектов, у части — строка). Класс ошибки, редактирование секретов и статусные
 * формулировки — общие (`@apilki/core`); здесь только выбор полей конверта.
 */
import { ApiError, parseBody, redact } from "./shared/errors.js";
export class OzonApiError extends ApiError {
    constructor(init) {
        var _a, _b;
        super({
            status: init.status,
            code: (_a = init.code) !== null && _a !== void 0 ? _a : null,
            detail: (_b = init.message) !== null && _b !== void 0 ? _b : null,
            retryAfterSeconds: init.retryAfterSeconds,
            body: init.body,
        });
        this.name = 'OzonApiError';
        this.details = init.details;
    }
}
const asRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value
    : undefined;
const asText = (value) => typeof value === 'string' && value.trim() ? value.trim() : undefined;
/** Тело ответа + статус → `OzonApiError`. */
export function toOzonError(status, body, options = {}) {
    var _a, _b;
    const record = asRecord(body);
    if (record) {
        return new OzonApiError({
            status,
            code: (_a = asText(record['code'])) !== null && _a !== void 0 ? _a : null,
            message: (_b = asText(record['message'])) !== null && _b !== void 0 ? _b : null,
            details: record['details'],
            retryAfterSeconds: options.retryAfterSeconds,
            body,
        });
    }
    const text = asText(typeof body === 'string' ? body : undefined);
    return new OzonApiError({
        status,
        message: text !== undefined && text.length <= 200 && !text.startsWith('<') ? redact(text) : null,
        retryAfterSeconds: options.retryAfterSeconds,
        body,
    });
}
/** Неуспешный ответ → `OzonApiError`. Тело читается из клона: `Response` остаётся живым. */
export function ozonErrorFromResponse(response) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = yield response.clone().text().catch(() => '');
        const header = response.headers.get('retry-after');
        const seconds = header === null || header.trim() === '' ? NaN : Number(header);
        return toOzonError(response.status, parseBody(text), {
            retryAfterSeconds: Number.isFinite(seconds) && seconds >= 0 ? seconds : undefined,
        });
    });
}
