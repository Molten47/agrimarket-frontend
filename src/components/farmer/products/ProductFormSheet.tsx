import {
  Sheet, SheetContent,
} from '@/components/ui/sheet'
import { ProductForm } from './ProductForm'
import { Category } from '@/types'
import { Leaf, Plus, X } from 'lucide-react'

interface Props {
  open:       boolean
  categories: Category[]
  isLoading:  boolean
  onSubmit:   (e: React.FormEvent<HTMLFormElement>, imageUrl: string | null) => void
  onClose:    () => void
}

const BG        = '#1a3a2e'
const BG_DARK   = '#122a21'
const AMBER     = '#e07b28'
const TEXT_FULL = 'rgba(255,255,255,0.92)'
const TEXT_MUTED = 'rgba(255,255,255,0.55)'

export function ProductFormSheet({ open, categories, isLoading, onSubmit, onClose }: Props) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        className="w-full sm:max-w-md flex flex-col gap-0 p-0 overflow-hidden border-l-0"
        style={{ background: BG, borderLeft: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Header */}
        <div
          className="px-6 pt-5 pb-4 flex items-start justify-between"
          style={{ background: BG_DARK, borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: AMBER }}
            >
              <Plus className="h-4.5 w-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: TEXT_FULL }}>Add New Product</p>
              <p className="text-xs mt-0.5" style={{ color: TEXT_MUTED }}>
                Stock is created automatically
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 transition-colors"
            style={{ color: TEXT_MUTED }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
       <ProductForm
          categories={categories}
          isLoading={isLoading}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
        </div>
      </SheetContent>
    </Sheet>
  )
}