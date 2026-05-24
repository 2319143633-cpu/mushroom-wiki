import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import varietiesData from '@data/varieties.json'

export default function Varieties() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceSort, setPriceSort] = useState('none')

  const filtered = useMemo(() => {
    let result = varietiesData

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(m =>
        m['名称'].includes(q) ||
        (m['别名'] && m['别名'].includes(q)) ||
        (m['风味描述'] && m['风味描述'].includes(q))
      )
    }

    if (categoryFilter !== 'all') {
      result = result.filter(m => m['分类'] === categoryFilter)
    }

    if (priceSort === 'asc' || priceSort === 'desc') {
      result = [...result].sort((a, b) => {
        const aPrice = parseInt(a['价格区间(元/斤)']?.split('-')[0]) || 0
        const bPrice = parseInt(b['价格区间(元/斤)']?.split('-')[0]) || 0
        return priceSort === 'asc' ? aPrice - bPrice : bPrice - aPrice
      })
    }

    return result
  }, [search, categoryFilter, priceSort])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">菌菇品种库</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="搜索品种名称、别名..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 border border-[var(--color-border)] rounded-lg flex-1 min-w-[200px] focus:outline-none focus:border-[var(--color-primary)]"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white"
        >
          <option value="all">全部分类</option>
          <option value="野生菌">野生菌</option>
          <option value="栽培菌">栽培菌</option>
        </select>
        <select
          value={priceSort}
          onChange={e => setPriceSort(e.target.value)}
          className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white"
        >
          <option value="none">价格排序</option>
          <option value="asc">价格从低到高</option>
          <option value="desc">价格从高到低</option>
        </select>
      </div>

      <div className="text-sm text-[var(--color-text-secondary)] mb-4">
        共 {filtered.length} 个品种
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m => (
          <Link
            key={m['名称']}
            to={`/varieties/${encodeURIComponent(m['名称'])}`}
            className="block bg-white rounded-lg overflow-hidden border border-[var(--color-border)] hover:shadow-md hover:border-[var(--color-primary-light)] transition-all"
          >
            <div className="h-40 overflow-hidden bg-gray-100">
              <img
                src={m['图片']}
                alt={m['名称']}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{m['名称']}</h3>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  m['分类'] === '野生菌'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {m['分类']}
                </span>
              </div>
              {m['别名'] && (
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  {m['别名']}
                </p>
              )}
              <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                {m['风味描述']}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-gray-100 px-2 py-0.5 rounded">{m['价格区间(元/斤)']} 元/斤</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded">风味 {m['风味强度(1-5)']}/5</span>
                {m['全年可得性'] === '是' && <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded">全年可得</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
