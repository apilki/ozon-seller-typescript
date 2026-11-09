export declare const CLIENT_ID_ENV = "OZON_CLIENT_ID";
export declare const API_KEY_ENV = "OZON_API_KEY";
export interface OzonAuth {
    clientId: string;
    apiKey: string;
}
export interface OzonAuthConfig {
    clientId?: string;
    apiKey?: string;
}
/** Ключи из конфига или окружения; без них — понятная ошибка до сети. */
export declare function resolveAuth(config?: OzonAuthConfig, env?: Record<string, string | undefined>): OzonAuth;
/** Заголовки авторизации для каждого запроса. */
export declare function authHeaders(auth: OzonAuth): Record<string, string>;
