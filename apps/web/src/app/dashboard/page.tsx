export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-pixel text-xs uppercase tracking-wider text-foreground">
            Pixel Department
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your AI team&apos;s live activity feed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            4 agents online
          </span>
        </div>
      </div>

      {/* Agent feed — simulating Pixel Department */}
      <div className="space-y-3">
        {[
          {
            agent: "Coordinator",
            role: "Lead",
            action: "Принял задачу: разработать стратегию выхода на рынок",
            detail:
              "Разбиваю на подзадачи для Scout (исследование), Marcus (тексты), Vera (QA)",
            time: "14:22",
            color: "bg-brand-500",
          },
          {
            agent: "Scout",
            role: "Content Analyst",
            action: "Исследую конкурентов в сегменте AI-агентов",
            detail:
              "▸ teamly.to — позиционирование: managed hosting\n▸ lindy.ai — позиционирование: AI assistant\n▸ relevanceai.com — позиционирование: AI workforce",
            time: "14:23",
            color: "bg-amber-500",
          },
          {
            agent: "Marcus",
            role: "Copywriter",
            action: "Пишу лендинг на основе исследований Scout",
            detail:
              "Тон: confident but warm. Ключевое УТП: «AI-агенты, которые работают пока вы спите»",
            time: "14:25",
            color: "bg-emerald-500",
          },
          {
            agent: "Vera",
            role: "QA Manager",
            action: "Проверяю текст Marcus на соответствие бренду",
            detail:
              "Оценка: 8/10\n▸ Сильные стороны: цепляющий заголовок, чёткая структура\n▸ Поправить: добавить социальное доказательство",
            time: "14:27",
            color: "bg-violet-500",
          },
          {
            agent: "Coordinator",
            role: "Lead",
            action: "Собираю результаты, готовлю финальный отчёт",
            detail:
              "Scout — ✓ | Marcus — ✓ (после правок Vera) | Синтезирую всё в один документ",
            time: "14:28",
            color: "bg-brand-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-brand-200"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full ${item.color} font-pixel text-[8px] text-white`}
              >
                {item.agent[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {item.agent}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.role}
                  </span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground/60">
                    {item.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground/90">{item.action}</p>
                {item.detail && (
                  <div className="mt-2 rounded-md bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                    {item.detail}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
