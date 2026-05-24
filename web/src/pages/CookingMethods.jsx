import { useState } from 'react'
import cookingData from '@data/cooking_methods.json'

const categories = [...new Set(cookingData.map(c => c['分类']))]

export default function CookingMethods() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? cookingData
    : cookingData.filter(c => c['分类'] === activeCategory)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">烹饪方式库</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-white border border-[var(--color-border)] hover:bg-gray-50'
          }`}
        >
          全部
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-white border border-[var(--color-border)] hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(method => (
          <div key={method['烹饪方式']} className="bg-white rounded-lg overflow-hidden border border-[var(--color-border)] flex flex-col md:flex-row">
            {method['图片'] && (
              <div className="md:w-48 h-36 md:h-auto shrink-0 overflow-hidden bg-gray-100">
                <img
                  src={method['图片']}
                  alt={method['烹饪方式']}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-5 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold">{method['烹饪方式']}</h3>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{method['分类']}</span>
                {method['出品效率'] && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                    出品效率: {method['出品效率']}
                  </span>
                )}
              </div>

              {method['操作要点'] && (
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">{method['操作要点']}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {method['适配菌菇'] && (
                  <div>
                    <span className="text-[var(--color-text-secondary)]">适配菌菇：</span>
                    <span>{Array.isArray(method['适配菌菇']) ? method['适配菌菇'].join('、') : method['适配菌菇']}</span>
                  </div>
                )}
                {method['经典菜品'] && (
                  <div>
                    <span className="text-[var(--color-text-secondary)]">经典菜品：</span>
                    <span>{Array.isArray(method['经典菜品']) ? method['经典菜品'].join('、') : method['经典菜品']}</span>
                  </div>
                )}
                {method['适配场景'] && (
                  <div>
                    <span className="text-[var(--color-text-secondary)]">适配场景：</span>
                    <span>{Array.isArray(method['适配场景']) ? method['适配场景'].join('、') : method['适配场景']}</span>
                  </div>
                )}
                {method['成本影响'] && (
                  <div>
                    <span className="text-[var(--color-text-secondary)]">成本影响：</span>
                    <span>{method['成本影响']}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
