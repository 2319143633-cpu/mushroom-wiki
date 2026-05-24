import historyData from '@data/history_culture.json'

export default function History() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{historyData.title}</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">从先秦至今的菌菇食用、栽培与文化发展脉络</p>

      {/* 食用历史时间线 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-[var(--color-border)]">食用历史</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">{historyData.食用历史.summary}</p>

        <div className="relative pl-6 border-l-2 border-[var(--color-primary-light)] space-y-6">
          {historyData.食用历史.dynasty_evolution.map(era => (
            <div key={era.period} className="relative">
              <div className="absolute -left-[25px] w-3 h-3 bg-[var(--color-primary)] rounded-full"></div>
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold">{era.period}</span>
                  <span className="text-xs text-[var(--color-text-secondary)]">{era.years}</span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{era.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 典籍记载 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-[var(--color-border)]">重要典籍</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {historyData.食用历史.earliest_records.map(record => (
            <div key={record.source} className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
              <h4 className="font-semibold mb-1">{record.source}</h4>
              <p className="text-xs text-[var(--color-text-secondary)] mb-2">{record.dynasty}</p>
              <p className="text-sm mb-2">{record.content}</p>
              <p className="text-xs text-[var(--color-primary)]">{record.significance}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 驯化栽培 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-[var(--color-border)]">驯化栽培史</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">{historyData.驯化栽培史.summary}</p>

        <div className="space-y-3">
          {historyData.驯化栽培史.cultivation_milestones.map(milestone => (
            <div key={milestone.event} className="flex gap-4 bg-white rounded-lg p-4 border border-[var(--color-border)]">
              <div className="shrink-0 w-32 text-sm font-medium text-[var(--color-primary)]">{milestone.year}</div>
              <div>
                <h4 className="font-medium">{milestone.event}</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{milestone.description}</p>
                {milestone.key_figure && (
                  <span className="text-xs bg-[var(--color-warm-light)] text-[var(--color-warm)] px-2 py-0.5 rounded mt-1 inline-block">
                    {milestone.key_figure}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 文化内涵 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-[var(--color-border)]">文化内涵</h2>

        <h3 className="font-medium mb-3">药食同源</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {historyData.文化内涵.药食同源.medicinal_fungi.map(f => (
            <div key={f.name} className="bg-white rounded-lg p-3 border border-[var(--color-border)] text-center">
              <div className="font-medium">{f.name}</div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">{f.function}</div>
            </div>
          ))}
        </div>

        <h3 className="font-medium mb-3">象征意义</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {historyData.文化内涵.象征意义.map(s => (
            <div key={s.mushroom} className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{s.mushroom}</span>
                <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded">{s.symbolism}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{s.description}</p>
            </div>
          ))}
        </div>

        <h3 className="font-medium mb-3">地方菌菇文化</h3>
        <div className="space-y-3">
          {historyData.文化内涵.地方菌菇文化.map(region => (
            <div key={region.region} className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
              <h4 className="font-medium mb-1">{region.region}</h4>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">{region.description}</p>
              <div className="flex flex-wrap gap-2">
                {region.cultural_features.map(f => (
                  <span key={f} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 中国菌菇之最 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-[var(--color-border)]">中国菌菇之最</h2>
        <div className="space-y-3">
          {historyData.中国菌菇之最.world_firsts.map(record => (
            <div key={record.record} className="bg-white rounded-lg p-4 border border-[var(--color-border)] flex items-start gap-3">
              <span className="text-[var(--color-primary)] text-lg">🏆</span>
              <div>
                <div className="font-medium">{record.record}</div>
                <div className="text-sm text-[var(--color-text-secondary)]">{record.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
