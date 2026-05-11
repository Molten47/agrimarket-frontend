import { useStock } from '@/hooks/useStock'
import { StockView } from '@/components/farmer/stock/StockView'
export default function StockPage() {
  const { stocks, summary, isLoading, editingSlug, isUpdating, setEditingSlug, onUpdate } = useStock()
  return (
    <StockView
      stocks={stocks} summary={summary} isLoading={isLoading}
      editingSlug={editingSlug} isUpdating={isUpdating}
      onEdit={setEditingSlug}
      onSave={(slug, qty, threshold) => onUpdate({ slug, input: { quantity_available: qty, low_stock_threshold: threshold } })}
      onCancel={() => setEditingSlug(null)}
    />
  )
}
