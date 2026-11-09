# @apilki/ozon-seller — JavaScript/TypeScript client

**Version: 0.3.1 · API as of 2026-04-07** <!-- штампуется пайплайном (GH-дистро); npm-карточка версию не носит -->

A **curated generated TypeScript client** for the **OZON Seller API** — generated from the official API specification, with edge-cases and conflicts resolved. Fully typed, fetch-based, zero runtime dependencies, works in Node.js ≥ 18 and browsers. Covers all 482 operations (56 API classes) and is regenerated on every upstream change.

```bash
npm install @apilki/ozon-seller
```

Docs: <https://docs.ozon.ru/api/seller/> · Full description (RU) below.

---

## Что это

Готовый TypeScript-клиент для **OZON Seller API** — продавец-сторона: товары, заказы, FBO/FBS, цены и остатки, отчёты, аналитика, финансы, отзывы и вопросы. Сгенерирован из официальной документации Ozon и **доведён до ума**: неоднозначности и конфликты документации разбираются агентами и автоматическими рецептами, результат проверяется тестами — вы получаете клиент, который просто работает.

- **Полное покрытие** — все 482 операции, 56 API-классов;
- **Всегда свежий** — перегенерируется при каждом изменении API Ozon;
- **Никаких зависимостей** — на чистом `fetch`, работает в Node.js ≥ 18 и в браузере;
- **Типизация / Ноль сюрпризов** — полная типизация TypeScript (`.d.ts` включены), имена полей сохранены из официальной документации.

## Установка

```bash
npm install @apilki/ozon-seller
```

## Быстрый старт

Авторизация OZON — пара заголовков `Client-Id` и `Api-Key` (личный кабинет продавца → Настройки → API-ключи). Клиент передаёт их первыми двумя аргументами каждого метода.

```javascript
import { Configuration, ProductAPI } from '@apilki/ozon-seller';

const config = new Configuration({
    basePath: 'https://api-seller.ozon.ru',
});

const productApi = new ProductAPI(config);

const clientId = 'YOUR_CLIENT_ID';
const apiKey = 'YOUR_API_KEY';

// POST /v3/product/info/list — информация о товарах по идентификаторам
const result = await productApi.productAPIGetProductInfoList(clientId, apiKey, {
    offer_id: ['offer-1'],
    product_id: [],
    sku: [],
});

console.log(result.result?.items);
```

### Работа с несколькими кабинетами

Ключ и Client-Id передаются в каждый вызов — один клиент обслуживает сколько угодно продавцов:

```javascript
await productApi.productAPIGetProductInfoList(ALICE_CLIENT_ID, ALICE_API_KEY, body);
await productApi.productAPIGetProductInfoList(BOB_CLIENT_ID, BOB_API_KEY, body);
```

## Особенности сборки

- **Типизация** — полная поддержка TypeScript (`.d.ts` включены);
- **Стиль имён методов** — генераторский, не `camelCase`: имя операции из документации API целиком (`productAPIGetProductInfoList`, `supplierAPISupplierAvailableWarehouses`). Сверяйтесь с автодополнением IDE;
- **Аргументы** — `Client-Id` и `Api-Key` первыми двумя аргументами каждого метода (в отличие от клиентов, где ключ живёт в конфигурации);
- **Node.js < 18** — требуется полифил `node-fetch` (встроенный `fetch` доступен с Node 18).

## Ошибки

На 4xx/5xx клиент бросает `ResponseError` — у него есть `.response` (fetch-Response), тело ошибки OZON читается из него.

```javascript
import { ResponseError } from '@apilki/ozon-seller';

try {
    await productApi.productAPIGetProductInfoList(clientId, apiKey, body);
} catch (error) {
    if (error instanceof ResponseError) {
        const body = await error.response.json(); // { error: { code, message, details } }
        console.error(`OZON ${error.response.status}:`, body.error?.message);
    }
}
```

## Отладка (middleware)

```javascript
const config = new Configuration({
    basePath: 'https://api-seller.ozon.ru',
    middleware: [{
        pre: async (context) => { console.log(`[OZON] ${context.init?.method} ${context.url}`); return context; },
    }],
});
```

## Покрытие API

Полная спецификация OZON Seller API: **482 операции, 56 API-классов** (товары, заказы, FBO/FBS, цены и остатки, отчёты, аналитика, финансы, отзывы, вопросы и ответы, категории и др.).

## Postman-коллекция

Готовая Postman Collection v2.1 (167 запросов) — отдельным артефактом: `apilki/ozon-seller-postman`.

## Тесты

`npm test` после установки — юнит-набор по ключевым путям (встроенный `node:test`, офлайн, без зависимостей и ключей); прогоняется перед каждой публикацией. Покрывает: авторизацию и POST/JSON, GET, path-параметры, бинарные ответы (Blob), ошибки 4xx/5xx и сетевые сбои, middleware, десериализацию и устойчивость к некорректному JSON.

## Языки

TypeScript/JavaScript сейчас; Python и Go — в планах (скоуп `@apilki`).

## Известные ограничения

- `cargoesAPICargoesLabelFile` (GET `/v1/cargoes-label/file/{file_guid}`) — метод устарел (Ozon отключает его 10.04.2026), параметр пути в документации API не раскрыт — URL передаётся как в документации. Используйте замену: `cargoesAPICargoesLabelGet` (POST `/v1/cargoes-label/get`, параметр `operation_id`).

## Лицензия

MIT © apilki. Документация OZON Seller API: <https://docs.ozon.ru/api/seller/>.
