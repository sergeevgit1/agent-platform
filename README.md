# Agent Platform — open-core платформа для AI-агентов

Open-core ядро оркестрации AI-агентов с визуальным «Pixel Department»,
50+ интеграциями Composio и прозрачной коллаборацией человек-ИИ.

## Принцип

Teamly, Lindy, Relevance, Fine — все закрыты. Мы строим открытую альтернативу:

- **Open-core ядро**: движок оркестрации под MIT-лицензией
- **Managed-хостинг**: платный SaaS поверх того же ядра
- **Человеко-агентная коллаборация**: не просто чат, а прозрачный процесс мышления

## Монорепозиторий

```
agent-platform/
├── packages/
│   ├── core/            # @agent-platform/core — движок оркестрации (MIT)
│   ├── integrations/    # @agent-platform/integrations — Composio-адаптер
│   ├── ui/              # @agent-platform/ui — React-компоненты (Pixel Department)
│   └── api/             # @agent-platform/api — REST + WebSocket API сервер
├── apps/
│   ├── web/             # Next.js приложение (SaaS-фронтенд)
│   └── docs/            # Документация (Nextra)
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## Стек

| Слой | Технология | Почему |
|------|-----------|--------|
| Оркестрация агентов | `@agent-platform/core` | LangGraph не даёт контроля над циклом |
| Интеграции | Composio SDK | 50+ приложений из коробки |
| LLM-роутинг | LiteLLM proxy | Единый API к OpenAI/Anthropic/Groq/локальные |
| Фронтенд | Next.js 14 + shadcn/ui | App Router, Server Components, Tailwind |
| Auth | Clerk | Готовая мультитенантность |
| База | PostgreSQL + pgvector | Реляционная модель + векторный поиск |
| Кэш / очереди | Redis + BullMQ | Сессии агентов, асинхронные задачи |
| Биллинг | Stripe | Подписки + usage-based |
| Хостинг | Vercel → Kubernetes | Быстрый старт → масштаб |

## Ядро (пакет `core`)

### Координатор

Главный цикл агента:

1. **Получить сообщение** от пользователя
2. **Построить контекст** (системный промпт, ростер команды, история, память)
3. **Цикл «план → действие → наблюдение»** (до 10 итераций):
   - LLM генерирует ответ + tool calls
   - Инструменты выполняются в песочнице
   - Пользователь видит **прозрачный лог мыслей** (CollaborationLog)
4. **Финальный ответ** — синтезированный из всех шагов

### Инструменты

```ts
const tools = new ToolRegistry();
tools.registerAll(builtInTools);  // file_read, file_write, web_search, delegate

// Composio — автоматически подтягивает 50+ интеграций
const composio = createComposioAdapter({ apiKey });
const slackTools = await composio.listTools("slack");
tools.registerAll(slackTools);
```

### Память

PARA-вдохновлённая структура: Projects, Areas, Resources, Archive.
Векторный поиск через pgvector + извлечение фактов из диалогов.

### CollaborationLog

**Ключевая дифференциация** — пользователь видит не только финальный ответ,
но и цепочку мыслей агента:

```
💭 Reese (reasoning): Анализирую запрос — нужен поиск конкурентов
🔧 Reese (tool_call): exa_search("AI agent platforms 2026")
📋 Reese (tool_result): 15 результатов, релевантность >0.7
🤝 Reese (delegation): Отправляю анализ Marcus для копирайтинга
⚡ Reese (decision): Топ-3 конкурента: Teamly, Lindy, Relevance
```

## Что готово сейчас

- [x] Структура монорепозитория (pnpm + turborepo)
- [x] Типы и протоколы (`@agent-platform/core`)
- [x] Движок координатора (агентный цикл)
- [x] LLM-сервис с мульти-провайдерным роутингом
- [x] Реестр инструментов + встроенные инструменты
- [x] CollaborationLog (прозрачный лог мышления)
- [x] Memory Store (базовая структура)
- [x] Composio-адаптер для 50+ интеграций
- [x] Next.js-фронтенд (1:1 клон Teamly: лендинг, логин, дашборд)

## Ближайшие шаги

1. **Запустить web** — `pnpm dev` с Clerk-ключами, проверить визуально
2. **Тесты ядра** — unit-тесты Coordinator + ToolRegistry
3. **API-сервер** — Express/Fastify с WebSocket для стриминга
4. **База данных** — PostgreSQL схема + миграции (Prisma)
5. **Редизайн под себя** — отойти от Teamly, свой стиль

## Лицензия

Ядро (`packages/core`) — MIT.  
Фронтенд и API — лицензия будет определена.

## Контрибьюция

Пулл-реквесты приветствуются. Начни с issues с меткой `good first issue`.
