import { useDashboard } from '@/hooks/useDashboard'
import { DashboardView } from '@/components/farmer/dashboard/DashboardView'
import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/api/analytics.api'
import { bookkeepingApi } from '@/api/bookkeeping.api'
import { format, subDays } from 'date-fns'

function last30() {
  return {
    from: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    to:   format(new Date(), 'yyyy-MM-dd'),
  }
}

export default function DashboardPage() {
  const props    = useDashboard()
  const range    = last30()

  const analytics   = useQuery({ queryKey: ['analytics', 'summary', '30d'],  queryFn: () => analyticsApi.summary('30d')     })
  const bookkeeping = useQuery({ queryKey: ['bk', 'summary', range],          queryFn: () => bookkeepingApi.summary(range)   })

  return (
    <DashboardView
      {...props}
      analyticsSummary={analytics.data}
      isLoadingAnalytics={analytics.isLoading}
      bookkeepingSummary={bookkeeping.data}
      isLoadingBookkeeping={bookkeeping.isLoading}
    />
  )
}