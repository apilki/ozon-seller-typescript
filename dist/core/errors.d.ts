/**
 * Ошибки Ozon Seller: один класс ядра + разбор вендорского конверта.
 *
 * Ozon отвечает `{ code, message, details }` (у части методов `details` — массив
 * объектов, у части — строка). Класс ошибки, редактирование секретов и статусные
 * формулировки — общие (`@apilki/core`); здесь только выбор полей конверта.
 */
import { ApiError } from './shared/errors.ts';
export interface OzonErrorInit {
    status: number;
    code?: string | null;
    message?: string | null;
    details?: unknown;
    retryAfterSeconds?: number | null;
    body?: unknown;
}
export declare class OzonApiError extends ApiError {
    /** Машинный код вендора (`code` из конверта). */
    readonly details: unknown;
    constructor(init: OzonErrorInit);
}
/** Тело ответа + статус → `OzonApiError`. */
export declare function toOzonError(status: number, body: unknown, options?: {
    retryAfterSeconds?: number;
}): OzonApiError;
/** Неуспешный ответ → `OzonApiError`. Тело читается из клона: `Response` остаётся живым. */
export declare function ozonErrorFromResponse(response: Response): Promise<OzonApiError>;
