/**
 * `@apilki/core` — общее рукописное ядро клиентов @apilki.
 *
 * Четыре модуля: `auth`, `http`, `errors`, `rate-limit`. Ядро не знает ни одного
 * вендора: конверты ошибок, разбор токенов и песочницы живут в клиентах.
 */
export declare const CORE_VERSION = "0.1.0";
export { authHeader, resolveToken } from './auth.ts';
export type { AuthConfig, AuthScheme } from './auth.ts';
export { ApiError, errorFromResponse, parseBody, reasonFor, redact, toApiError } from './errors.ts';
export type { ApiErrorInit } from './errors.ts';
export { CLIENT_ERROR_COST, DEFAULT_PAUSE_MS, RateLimiter } from './rate-limit.ts';
export type { RateLimitHeaders, RateLimitState, RateLimiterOptions } from './rate-limit.ts';
export { DEFAULT_RETRY, DEFAULT_TIMEOUT_MS, createHttpFetch } from './http.ts';
export type { FetchLike, HttpFetch, HttpFetchOptions, HttpFetchState, RetryPolicy } from './http.ts';
