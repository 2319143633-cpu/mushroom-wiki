import { Link } from 'react-router-dom'
import varietiesData from '@data/varieties.json'
import cookingData from '@data/cooking_methods.json'
import scenariosData from '@data/scenarios.json'
import brandsData from '@data/brands.json'
import suppliersData from '@data/suppliers.json'

const brandCategories = Object.keys(brandsData).filter(k => k !== '数据说明')
const totalBrands = brandCategories.reduce((sum, k) => sum + brandsData[k].length, 0)

const modules = [
  {
    path: '/varieties',
    title: '菌菇品种库',
    icon: '🍄',
    desc: '29种常见食用菌的详细资料',
    stat: `${varietiesData.length} 个品种`,
  },
  {
    path: '/cooking',
    title: '烹饪方式库',
    icon: '🔥',
    desc: '从干烹到生食的全方位烹饪指南',
    stat: `${cookingData.length} 种方式`,
  },
  {
    path: '/scenarios',
    title: '餐饮场景库',
    icon: '🏪',
    desc: '不同业态的菌菇应用方案',
    stat: `${scenariosData.length} 个场景`,
  },
  {
    path: '/brands',
    title: '品牌案例库',
    icon: '🏷️',
    desc: '知名餐饮品牌的菌菇使用案例',
    stat: `${totalBrands} 个品牌`,
  },
  {
    path: '/suppliers',
    title: '供应链信息',
    icon: '🚚',
    desc: '种植企业、批发市场、服务商',
    stat: '全链路覆盖',
  },
  {
    path: '/history',
    title: '历史与文化',
    icon: '📜',
    desc: '从先秦到现代的菌菇文化脉络',
    stat: '2000+年历史',
  },
]

export default function Home() {
  return (
    <div>
      <section className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=1400&h=400&fit=crop&q=80"
          alt="菌菇"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 md:p-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">中国菌菇百科大全</h1>
            <p className="text-sm md:text-base opacity-90 max-w-2xl">
              面向餐饮从业者的专业菌菇数据库，涵盖品种、烹饪、场景、品牌、供应链与文化六大模块
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {modules.map(m => (
          <Link
            key={m.path}
            to={m.path}
            className="block bg-white rounded-xl p-6 border border-[var(--color-border)] hover:shadow-lg hover:border-[var(--color-primary-light)] transition-all"
          >
            <div className="text-3xl mb-3">{m.icon}</div>
            <h2 className="text-lg font-semibold mb-1">{m.title}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">{m.desc}</p>
            <span className="inline-block text-xs bg-[var(--color-warm-light)] text-[var(--color-warm)] px-2 py-1 rounded">
              {m.stat}
            </span>
          </Link>
        ))}
      </section>

      <section className="bg-white rounded-xl p-8 border border-[var(--color-border)]">
        <h2 className="text-xl font-semibold mb-4">快速了解</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--color-primary)]">4325万吨</div>
            <div className="text-sm text-[var(--color-text-secondary)]">中国年产量(2023)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-primary)]">70%+</div>
            <div className="text-sm text-[var(--color-text-secondary)]">全球产量占比</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-primary)]">60+种</div>
            <div className="text-sm text-[var(--color-text-secondary)]">人工栽培品种</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-primary)]">2000万人</div>
            <div className="text-sm text-[var(--color-text-secondary)]">从业人员</div>
          </div>
        </div>
      </section>
    </div>
  )
}
