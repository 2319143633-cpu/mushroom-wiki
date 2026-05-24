import { useState } from 'react'
import { Link } from 'react-router-dom'
import scenariosData from '@data/scenarios.json'

export default function Scenarios() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">餐饮场景库</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {scenariosData.map(scenario => (
          <div
            key={scenario['场景名称']}
            className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden cursor-pointer hover:shadow-md transition-all"
            onClick={() => setExpanded(expanded === scenario['场景名称'] ? null : scenario['场景名称'])}
          >
            {scenario['图片'] && (
              <div className="h-36 overflow-hidden bg-gray-100">
                <img
                  src={scenario['图片']}
                  alt={scenario['场景名称']}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">{scenario['场景名称']}</h3>
                <span className="text-xs bg-[var(--color-warm-light)] text-[var(--color-warm)] px-2 py-0.5 rounded">
                  {scenario['客单价区间']}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{scenario['场景描述']}</p>
            </div>
          </div>
        ))}
      </div>

      {expanded && (() => {
        const scenario = scenariosData.find(s => s['场景名称'] === expanded)
        if (!scenario) return null
        return (
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{scenario['场景名称']}</h2>
              <button
                onClick={() => setExpanded(null)}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] text-xl"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">{scenario['场景描述']}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scenario['菌菇需求特征'] && (
                <div>
                  <h4 className="font-medium mb-2">菌菇需求特征</h4>
                  <div className="space-y-1 text-sm">
                    {typeof scenario['菌菇需求特征'] === 'object' && Object.entries(scenario['菌菇需求特征']).map(([k, v]) => (
                      <div key={k} className="flex">
                        <span className="text-[var(--color-text-secondary)] w-24 shrink-0">{k}：</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {scenario['推荐菌菇'] && (
                <div>
                  <h4 className="font-medium mb-2">推荐菌菇</h4>
                  <div className="flex flex-wrap gap-2">
                    {scenario['推荐菌菇'].map(name => (
                      <Link
                        key={name}
                        to={`/varieties/${encodeURIComponent(name)}`}
                        className="text-sm bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100"
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {scenario['推荐烹饪方式'] && (
                <div>
                  <h4 className="font-medium mb-2">推荐烹饪方式</h4>
                  <div className="flex flex-wrap gap-2">
                    {scenario['推荐烹饪方式'].map(c => (
                      <span key={c} className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {scenario['采购建议'] && (
                <div>
                  <h4 className="font-medium mb-2">采购建议</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{scenario['采购建议']}</p>
                </div>
              )}

              {scenario['用量规模'] && (
                <div>
                  <h4 className="font-medium mb-2">用量规模</h4>
                  <p className="text-sm">{scenario['用量规模']}</p>
                </div>
              )}

              {scenario['典型品牌参考'] && (
                <div>
                  <h4 className="font-medium mb-2">典型品牌</h4>
                  <div className="flex flex-wrap gap-2">
                    {scenario['典型品牌参考'].map(b => (
                      <span key={b} className="text-sm bg-gray-100 px-2 py-1 rounded">{b}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
