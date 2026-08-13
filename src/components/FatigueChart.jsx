import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function FatigueChart({ data }) {
  const hasData = data && data.length > 0

  return (
    <div className="bg-card rounded-2xl border border-lavender/10 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-ink">전환별 피로도 추이</h3>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-lavender-deep inline-block" />
            이번 달
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-muted inline-block" />
            지난 달
          </span>
        </div>
      </div>

      {hasData ? (
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={data} barGap={4}>
              <CartesianGrid vertical={false} stroke="#ECE9F5" />
              <XAxis dataKey="transition" tick={{ fontSize: 11, fill: '#A79BC0' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#A79BC0' }} axisLine={false} tickLine={false} width={20} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #ECE9F5', fontSize: 12 }}
                cursor={{ fill: '#F8F7FC' }}
              />
              <Bar dataKey="thisMonth" fill="#8C7AE6" radius={[4, 4, 0, 0]} maxBarSize={18} />
              <Bar dataKey="lastMonth" fill="#D8D3E8" radius={[4, 4, 0, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-muted py-16 text-center">표시할 데이터가 없어요.</p>
      )}
    </div>
  )
}
