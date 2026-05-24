import { useState } from 'react'
import suppliersData from '@data/suppliers.json'

const categoryNames = Object.keys(suppliersData).filter(k => k !== '数据库信息' && k !== '采购建议')

const logoColors = [
  'bg-emerald-100 text-emerald-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
  'bg-indigo-100 text-indigo-700',
  'bg-orange-100 text-orange-700',
]

function SupplierLogo({ supplier, index }) {
  const [imgError, setImgError] = useState(false)
  const colorClass = logoColors[index % logoColors.length]
  const displayName = supplier['名称'].replace(/\s*\(.*\)/, '')
  const initial = displayName.charAt(0)

  if (supplier.logo && !imgError) {
    return (
      <img
        src={supplier.logo}
        alt={displayName}
        className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-1"
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${colorClass}`}>
      {initial}
    </div>
  )
}

export default function Suppliers() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">供应链信息</h1>

      {categoryNames.map(catName => (
        <section key={catName} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-[var(--color-border)]">
            {catName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suppliersData[catName].map((supplier, idx) => (
              <div key={supplier['名称']} className="bg-white rounded-lg p-5 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-3">
                  <SupplierLogo supplier={supplier} index={idx} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{supplier['名称']}</h3>
                    {supplier['股票代码'] && (
                      <span className="text-xs text-[var(--color-text-secondary)]">{supplier['股票代码']}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {supplier['类型'] && <InfoRow label="类型" value={supplier['类型']} />}
                  {supplier['主营品种'] && <InfoRow label="主营品种" value={Array.isArray(supplier['主营品种']) ? supplier['主营品种'].join('、') : supplier['主营品种']} />}
                  {supplier['规模_产能'] && <InfoRow label="产能" value={supplier['规模_产能']} />}
                  {supplier['覆盖区域'] && <InfoRow label="覆盖区域" value={Array.isArray(supplier['覆盖区域']) ? supplier['覆盖区域'].join('、') : supplier['覆盖区域']} />}
                  {supplier['供货形态'] && <InfoRow label="供货形态" value={Array.isArray(supplier['供货形态']) ? supplier['供货形态'].join('、') : supplier['供货形态']} />}
                  {supplier['适合客户类型'] && <InfoRow label="适合客户" value={supplier['适合客户类型']} />}
                  {supplier['价格竞争力'] && <InfoRow label="价格竞争力" value={supplier['价格竞争力']} />}
                  {supplier['地址'] && <InfoRow label="地址" value={supplier['地址']} />}
                  {supplier['备注'] && <InfoRow label="备注" value={supplier['备注']} />}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {suppliersData['采购建议'] && (
        <section className="bg-[var(--color-warm-light)] rounded-xl p-6 mt-8">
          <h2 className="text-lg font-semibold mb-4">采购建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(suppliersData['采购建议']).map(([k, v]) => (
              <div key={k} className="bg-white/60 rounded-lg p-4">
                <h4 className="font-medium mb-1">{k}</h4>
                {typeof v === 'object' ? (
                  <div className="text-sm space-y-1">
                    {v['推荐渠道'] && <p><span className="text-[var(--color-text-secondary)]">推荐渠道：</span>{v['推荐渠道']}</p>}
                    {v['说明'] && <p className="text-[var(--color-text-secondary)]">{v['说明']}</p>}
                  </div>
                ) : (
                  <p className="text-sm">{v}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex">
      <span className="text-[var(--color-text-secondary)] w-24 shrink-0">{label}：</span>
      <span>{value}</span>
    </div>
  )
}
