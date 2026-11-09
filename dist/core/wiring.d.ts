import type { OzonAuthConfig } from './auth.ts';
import { RateLimiter } from './shared/rate-limit.ts';
import type { FetchLike, RetryPolicy } from './shared/http.ts';
/** Минимум, который нужен от сгенерированного Configuration (typescript-fetch). */
export interface ConfigurationLike {
    basePath: string;
    headers?: Record<string, string>;
    fetchApi?: FetchLike;
}
export type ConfigurationCtor<T extends ConfigurationLike> = new (options: Record<string, unknown>) => T;
export interface ClientOptions extends OzonAuthConfig {
    /** Другой источник окружения (тесты). */
    env?: Record<string, string | undefined>;
    /** Своя база (прокси, стенд). */
    basePath?: string;
    /** Таймаут одного запроса, мс (по умолчанию 60 000). */
    timeoutMs?: number;
    /** Политика повторов (по умолчанию 3 повтора, 500 мс база). */
    retry?: Partial<RetryPolicy>;
    /** Общий лимитер на несколько разделов. */
    limiter?: RateLimiter;
    /** Подмена сети: тесты и свои транспорты. */
    fetchApi?: FetchLike;
    /** Подмена ожидания: тесты не должны спать по-настоящему. */
    sleep?: (ms: number) => Promise<void>;
    /** Инъекция времени (тесты дедлайнов лимитера). */
    now?: () => number;
}
export interface WiredConfiguration<T extends ConfigurationLike> {
    config: T;
    limiter: RateLimiter;
}
export declare function configure<T extends ConfigurationLike>(Ctor: ConfigurationCtor<T>, options?: ClientOptions): WiredConfiguration<T>;
