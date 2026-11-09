/**
 * Рукописное ядро клиента @apilki/ozon.
 *
 * Четыре модуля: `auth`, `http`, `errors`,
 * `rate-limit`. Ядро не зависит от сгенерированного кода: `typecheck` проходит
 * на чистом клоне, где `output/` ещё нет. Сшивка «ядро + API-классы» — `wiring.ts`.
 */
export declare const CORE_VERSION = "0.1.0";
export { API_KEY_ENV, CLIENT_ID_ENV, authHeaders, resolveAuth } from './auth.ts';
export type { OzonAuth, OzonAuthConfig } from './auth.ts';
export { OzonApiError, ozonErrorFromResponse, toOzonError } from './errors.ts';
export type { OzonErrorInit } from './errors.ts';
export { CLIENT_ERROR_COST, DEFAULT_PAUSE_MS, RateLimiter } from './shared/rate-limit.ts';
export type { RateLimitState, RateLimiterOptions } from './shared/rate-limit.ts';
export { DEFAULT_RETRY, DEFAULT_TIMEOUT_MS, createHttpFetch } from './shared/http.ts';
export type { FetchLike, HttpFetch, RetryPolicy } from './shared/http.ts';
export { ApiError, redact } from './shared/errors.ts';
export { configure } from './wiring.ts';
export type { ClientOptions, ConfigurationCtor, ConfigurationLike, WiredConfiguration } from './wiring.ts';
/** Общая часть ядра (@apilki/core), вендорено в `shared/`. */
export * as shared from './shared/index.ts';
