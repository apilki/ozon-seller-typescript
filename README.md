# @apilki/ozon-seller — JavaScript/TypeScript клиент

**Версия: 0.4.0 · API от 17.11.2026** <!-- штампуется пайплайном (GH-дистро); npm-карточка версию не носит -->

**@apilki/ozon-seller** — generated TypeScript/JavaScript client for the **OZON Seller API** (fetch-based; works in Node.js ≥ 18 and browsers).

```bash
npm install @apilki/ozon-seller
```

Docs: <https://docs.ozon.ru/api/seller/> · Полное описание (RU) — ниже.

---

## Что это

JavaScript/TypeScript клиент для **OZON Seller API** (продавец-сторона): товары, заказы, FBO/FBS, цены и остатки, отчёты, аналитика, финансы, отзывы и вопросы. Сгенерирован из официального сваггера, построен на базе `fetch` API — работает и в Node.js (≥ 18), и в браузере. Публикуется в npm-скоупе `@apilki` (GitHub-орг `apilki`).

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

### Отладка (middleware)

```javascript
const config = new Configuration({
    basePath: 'https://api-seller.ozon.ru',
    middleware: [{
        pre: async (context) => { console.log(`[OZON] ${context.init?.method} ${context.url}`); return context; },
    }],
});
```

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

## Покрытие API

Полный сваггер OZON Seller API: **463 операции, 58 API-классов** (товары, заказы, FBO/FBS, цены и остатки, отчёты, аналитика, финансы, отзывы, вопросы и ответы, категории и др.).

## Postman-коллекция

Готовая Postman Collection v2.1 (482 запроса — все операции спецификации) — отдельный репозиторий
[apilki/ozon-seller-postman](https://github.com/apilki/ozon-seller-postman). Импортируйте
`postman/collection.json` и заполните переменные коллекции `clientId` и `apiKey` — авторизация
уже подставлена во все запросы.

## Языки

TypeScript/JavaScript сейчас; Python и Go — в планах (скоуп `@apilki`).

## Лицензия

MIT © apilki. Документация OZON Seller API: <https://docs.ozon.ru/api/seller/>.
