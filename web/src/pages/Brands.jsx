import { useState } from 'react'
import brandsData from '@data/brands.json'

const categoryNames = Object.keys(brandsData).filter(k => k !== '数据说明')

const brandColors = [
  'bg-red-100 text-red-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-amber-100 text-amber-700',
  'bg-pink-100 text-pink-700',
  'bg-teal-100 text-teal-700',
  'bg-indigo-100 text-indigo-700',
]

function BrandLogo({ brand, index }) {
  const [imgError, setImgError] = useState(false)
  const colorClass = brandColors[index % brandColors.length]
  const initial = brand['品牌名称'].charAt(0)

  if (brand.logo && !imgError) {
    return (
      <img
        src={brand.logo}
        alt={brand['品牌名称']}
        className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1"
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${colorClass}`}>
      {initial}
    </div>
  )
}

export default function Brands() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const allBrands = categoryNames.flatMap(catName =>
    brandsData[catName].map(b => ({ ...b, categoryName: catName }))
  )

  const filtered = allBrands.filter(b => {
    const matchCategory = activeCategory === 'all' || b.categoryName === activeCategory
    const matchSearch = !search ||
      b['品牌名称']?.includes(search) ||
      b['品牌定位']?.includes(search)
    return matchCategory && matchSearch
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">品牌案例库</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="搜索品牌..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 border border-[var(--color-border)] rounded-lg min-w-[200px] focus:outline-none focus:border-[var(--color-primary)]"
        />
        <select
          value={activeCategory}
          onChange={e => setActiveCategory(e.target.value)}
          className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white"
        >
          <option value="all">全部类型</option>
          {categoryNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="text-sm text-[var(--color-text-secondary)] mb-4">
        共 {filtered.length} 个品牌
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((brand, idx) => (
          <div key={brand['品牌名称']} className="bg-white rounded-lg p-5 border border-[var(--color-border)]">
            <div className="flex items-start gap-4 mb-3">
              <BrandLogo brand={brand} index={idx} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{brand['品牌名称']}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded shrink-0 ml-2">
                    {brand.categoryName}
                  </span>
                </div>
                {brand['品牌定位'] && (
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">{brand['品牌定位']}</p>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {brand['菜系_业态'] && <InfoItem label="业态" value={brand['菜系_业态']} />}
              {brand['客单价_元'] && <InfoItem label="客单价" value={`${brand['客单价_元']} 元`} />}
              {brand['门店规模'] && <InfoItem label="门店规模" value={brand['门店规模']} />}
              {brand['菌菇使用方式'] && <InfoItem label="使用方式" value={brand['菌菇使用方式']} />}
              {brand['菌菇在菜单中的地位'] && <InfoItem label="菜单地位" value={brand['菌菇在菜单中的地位']} />}
              {brand['主要使用菌菇品种'] && (
                <div>
                  <span className="text-[var(--color-text-secondary)]">使用品种：</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(Array.isArray(brand['主要使用菌菇品种']) ? brand['主要使用菌菇品种'] : [brand['主要使用菌菇品种']]).map(v => (
                      <span key={v} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded">{v}</span>
                    ))}
                  </div>
                </div>
              )}
              {brand['代表菌菇菜品'] && (
                <InfoItem label="代表菜品" value={Array.isArray(brand['代表菌菇菜品']) ? brand['代表菌菇菜品'].join('、') : brand['代表菌菇菜品']} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <span className="text-[var(--color-text-secondary)]">{label}：</span>
      <span>{value}</span>
    </div>
  )
}
