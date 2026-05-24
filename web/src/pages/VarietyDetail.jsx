import { useParams, Link } from 'react-router-dom'
import varietiesData from '@data/varieties.json'
import cookingData from '@data/cooking_methods.json'
import scenariosData from '@data/scenarios.json'

export default function VarietyDetail() {
  const { name } = useParams()
  const decodedName = decodeURIComponent(name)
  const mushroom = varietiesData.find(m => m['名称'] === decodedName)

  if (!mushroom) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-[var(--color-text-secondary)]">未找到该品种</p>
        <Link to="/varieties" className="text-[var(--color-primary)] mt-4 inline-block">返回品种库</Link>
      </div>
    )
  }

  const relatedCooking = cookingData.filter(c =>
    c['适配菌菇'] && c['适配菌菇'].includes(mushroom['名称'])
  )

  const relatedScenarios = scenariosData.filter(s =>
    s['推荐菌菇'] && s['推荐菌菇'].includes(mushroom['名称'])
  )

  const flavorScore = parseInt(mushroom['风味强度(1-5)']) || 0
  const difficultyScore = parseInt(mushroom['采购难度(1-5)']) || 0

  return (
    <div>
      <Link to="/varieties" className="text-sm text-[var(--color-primary)] mb-4 inline-block">
        ← 返回品种库
      </Link>

      <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-border)]">
        <div className="h-64 md:h-80 overflow-hidden bg-gray-100">
          <img
            src={mushroom['图片']?.replace('w=400&h=300', 'w=1200&h=400')}
            alt={mushroom['名称']}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{mushroom['名称']}</h1>
            <span className={`text-sm px-3 py-1 rounded ${
              mushroom['分类'] === '野生菌' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
            }`}>
              {mushroom['分类']}
            </span>
          </div>
          {mushroom['拉丁学名'] && (
            <p className="text-sm italic text-[var(--color-text-secondary)] mb-1">{mushroom['拉丁学名']}</p>
          )}
          {mushroom['别名'] && (
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">别名：{mushroom['别名']}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <InfoRow label="主产地" value={mushroom['主产地']} />
              <InfoRow label="上市季节" value={mushroom['上市季节(月份)']} />
              <InfoRow label="全年可得" value={mushroom['全年可得性']} />
              <InfoRow label="价格区间" value={`${mushroom['价格区间(元/斤)']} 元/斤`} />
              <InfoRow label="价格趋势" value={mushroom['价格趋势']} />
              <InfoRow label="保鲜期" value={`${mushroom['保鲜期(天)']} 天`} />
              <InfoRow label="储运要求" value={mushroom['储运要求']} />
            </div>
            <div className="space-y-3">
              <InfoRow label="口感" value={mushroom['口感描述']} />
              <InfoRow label="风味" value={mushroom['风味描述']} />
              <InfoRow label="风味强度" value={`${'★'.repeat(flavorScore)}${'☆'.repeat(5 - flavorScore)}`} />
              <InfoRow label="采购难度" value={`${'★'.repeat(difficultyScore)}${'☆'.repeat(5 - difficultyScore)}`} />
              <InfoRow label="可用形态" value={mushroom['可用形态']} />
              <InfoRow label="营养亮点" value={mushroom['营养亮点']} />
            </div>
          </div>

          {mushroom['适配场景'] && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">适配场景</h3>
              <div className="flex flex-wrap gap-2">
                {mushroom['适配场景'].split(/[、,/]/).map(s => (
                  <span key={s} className="bg-[var(--color-warm-light)] text-[var(--color-warm)] text-sm px-3 py-1 rounded-full">{s.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {relatedCooking.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">推荐烹饪方式</h3>
              <div className="flex flex-wrap gap-2">
                {relatedCooking.map(c => (
                  <Link key={c['烹饪方式']} to="/cooking" className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full hover:bg-green-100">
                    {c['烹饪方式']}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedScenarios.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">适用餐饮场景</h3>
              <div className="flex flex-wrap gap-2">
                {relatedScenarios.map(s => (
                  <Link key={s['场景名称']} to="/scenarios" className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full hover:bg-blue-100">
                    {s['场景名称']}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex">
      <span className="text-sm text-[var(--color-text-secondary)] w-20 shrink-0">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  )
}
