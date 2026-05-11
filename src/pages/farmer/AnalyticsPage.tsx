import { useAnalytics } from '@/hooks/useAnalytics'
import { TEXT, MUTED } from '@/components/farmer/analytics/tokens'
import { AnalyticsPeriodPicker }  from '@/components/farmer/analytics/AnalyticsPeriodPicker'
import { AnalyticsStatCards }     from '@/components/farmer/analytics/AnalyticsStatsCards'
import { RevenueChart }           from '@/components/farmer/analytics/RevenueChart'
import { TopProductsChart }       from '@/components/farmer/analytics/TopProductsChart'
import { StockPieChart }          from '@/components/farmer/analytics/StockPieChart'
import { CustomerLoyaltyChart }   from '@/components/farmer/analytics/CustomerLoyaltyChart'
import { CountyChart }            from '@/components/farmer/analytics/CountyChart'
import { PeakHoursChart }         from '@/components/farmer/analytics/PeakHoursChart'
import { StockHealthTable }       from '@/components/farmer/analytics/StockHealthTable'

export default function AnalyticsPage() {
  const { period, setPeriod, summary, revenue, stock, customers } = useAnalytics()

  const st = stock.data ?? []

  return (
    <div className="space-y-6" style={{ color: TEXT }}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm mt-0.5" style={{ color: MUTED }}>Your farm's performance at a glance</p>
        </div>
        <AnalyticsPeriodPicker period={period} onChange={setPeriod} />
      </div>

      <AnalyticsStatCards data={summary.data} />

      <RevenueChart data={revenue.data?.chart} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopProductsChart data={revenue.data?.top_products} />
        <StockPieChart data={st} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CustomerLoyaltyChart data={customers.data} />
        <CountyChart          data={customers.data?.top_counties} />
        <PeakHoursChart       data={customers.data?.peak_hours} />
      </div>

      <StockHealthTable data={st} summary={summary.data} />
    </div>
  )
}