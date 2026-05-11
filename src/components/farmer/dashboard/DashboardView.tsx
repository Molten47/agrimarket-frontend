import { Farmer, Order, StockSummary } from '@/types'
import { SummaryResponse } from '@/api/analytics.api'
import { BookkeepingSummary } from '@/api/bookkeeping.api'
import { WelcomeBanner }           from './WelcomeBanner'
import { StockSummaryCards }       from './StockSummaryCards'
import { AnalyticsSummaryPanel }   from './AnalyticsSummaryPanel'
import { BookkeepingSummaryPanel } from './BookkeppingSummaryPanel'
import { RecentOrdersTable }       from './RecentOrdersTable'

interface Props {
  farmer:               Farmer | null
  summary:              StockSummary | undefined
  recentOrders:         Order[]
  isLoadingStock:       boolean
  isLoadingOrders:      boolean
  analyticsSummary:     SummaryResponse | undefined
  isLoadingAnalytics:   boolean
  bookkeepingSummary:   BookkeepingSummary | undefined
  isLoadingBookkeeping: boolean
}

export function DashboardView({
  farmer, summary, recentOrders,
  isLoadingStock, isLoadingOrders,
  analyticsSummary, isLoadingAnalytics,
  bookkeepingSummary, isLoadingBookkeeping,
}: Props) {
  return (
    <div>
      <WelcomeBanner farmer={farmer} />
      <StockSummaryCards summary={summary} isLoading={isLoadingStock} />
      <AnalyticsSummaryPanel
        data={analyticsSummary}
        isLoading={isLoadingAnalytics} />
      <BookkeepingSummaryPanel
        data={bookkeepingSummary}
        isLoading={isLoadingBookkeeping} />
      <RecentOrdersTable orders={recentOrders} isLoading={isLoadingOrders} />
    </div>
  )
}