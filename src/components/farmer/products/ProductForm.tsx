import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Category } from '@/types'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { uploadApi } from '@/api/upload.api'

interface Props {
  categories: Category[]
  isLoading:  boolean
  onSubmit:   (e: React.FormEvent<HTMLFormElement>, imageUrl: string | null) => void
  onCancel:   () => void
}

const LABEL_COLOR = 'rgba(255,255,255,0.75)'

const INPUT_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border:     '1px solid rgba(255,255,255,0.18)',
  color:      'rgba(255,255,255,0.92)',
  height:     40,
}

const SEPARATOR_STYLE: React.CSSProperties = { background: 'rgba(255,255,255,0.1)' }

const NATIVE_SELECT_STYLE: React.CSSProperties = {
  width:               '100%',
  height:              40,
  background:          'rgba(255,255,255,0.08)',
  border:              '1px solid rgba(255,255,255,0.18)',
  borderRadius:        8,
  color:               'rgba(255,255,255,0.92)',
  padding:             '0 36px 0 12px',
  fontSize:            14,
  appearance:          'none',
  WebkitAppearance:    'none',
  backgroundImage:     `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat:    'no-repeat',
  backgroundPosition:  'right 12px center',
  cursor:              'pointer',
}

export function ProductForm({ categories, isLoading, onSubmit, onCancel }: Props) {
  const [imageUrl, setImageUrl]       = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setIsUploading(true)
    try {
      const { image_url } = await uploadApi.uploadImage(file)
      setImageUrl(image_url)
    } catch {
      setUploadError('Upload failed — please try again')
    } finally {
      setIsUploading(false)
    }
  }

  function clearImage() {
    setImageUrl(null)
    setUploadError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <form onSubmit={(e) => onSubmit(e, imageUrl)} className="flex flex-col gap-5">

      <div className="space-y-1.5">
        <Label htmlFor="name" style={{ color: LABEL_COLOR, fontSize: 13 }}>Product Name</Label>
        <Input id="name" name="name" placeholder="Free Range Eggs"
          style={INPUT_STYLE} className="placeholder:text-white/30" required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" style={{ color: LABEL_COLOR, fontSize: 13 }}>
          Description{' '}
          <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>(optional)</span>
        </Label>
        <Textarea id="description" name="description" rows={3}
          placeholder="Tell consumers about this product..."
          className="resize-none placeholder:text-white/30"
          style={{ ...INPUT_STYLE, height: 'auto' }} />
      </div>

      <Separator style={SEPARATOR_STYLE} />

      {/* Image upload */}
      <div className="space-y-1.5">
        <Label style={{ color: LABEL_COLOR, fontSize: 13 }}>
          Product Image{' '}
          <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>(optional)</span>
        </Label>

        {imageUrl ? (
          <div className="relative w-full h-40 rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.18)' }}>
            <img src={imageUrl} alt="Product" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full h-32 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border:     '1px dashed rgba(255,255,255,0.2)',
              color:      'rgba(255,255,255,0.45)',
            }}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-xs">Uploading...</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-5 h-5" />
                <span className="text-xs">Click to upload image</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  JPG, PNG, WEBP · max 5MB
                </span>
              </>
            )}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleImageChange}
        />

        {uploadError && (
          <p className="text-xs" style={{ color: '#f87171' }}>{uploadError}</p>
        )}
      </div>

      <Separator style={SEPARATOR_STYLE} />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="price_per_unit" style={{ color: LABEL_COLOR, fontSize: 13 }}>Price (£)</Label>
          <Input id="price_per_unit" name="price_per_unit"
            type="number" step="0.01" min="0" placeholder="3.50"
            style={INPUT_STYLE} className="placeholder:text-white/30" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="unit" style={{ color: LABEL_COLOR, fontSize: 13 }}>Unit</Label>
          <Input id="unit" name="unit" placeholder="dozen / kg / each"
            style={INPUT_STYLE} className="placeholder:text-white/30" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="quantity_available" style={{ color: LABEL_COLOR, fontSize: 13 }}>Quantity Available</Label>
          <Input id="quantity_available" name="quantity_available"
            type="number" step="0.001" min="0" placeholder="100"
            style={INPUT_STYLE} className="placeholder:text-white/30" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="low_stock_threshold" style={{ color: LABEL_COLOR, fontSize: 13 }}>
            Low Stock At{' '}
            <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>(optional)</span>
          </Label>
          <Input id="low_stock_threshold" name="low_stock_threshold"
            type="number" step="0.001" min="0" placeholder="10"
            style={INPUT_STYLE} className="placeholder:text-white/30" />
        </div>
      </div>

      <Separator style={SEPARATOR_STYLE} />

      <div className="space-y-1.5">
        <Label htmlFor="category_id" style={{ color: LABEL_COLOR, fontSize: 13 }}>Category</Label>
        <select id="category_id" name="category_id" style={NATIVE_SELECT_STYLE}>
          <option value="" style={{ background: '#1a3a2e', color: 'rgba(255,255,255,0.5)' }}>
            Select a category
          </option>
          {categories.flatMap((c) => [
            <option key={c.id} value={c.id} style={{ background: '#1a3a2e', color: '#fff' }}>
              {c.name}
            </option>,
            ...c.children.map((child) => (
              <option key={child.id} value={child.id} style={{ background: '#1a3a2e', color: '#fff' }}>
                {'  ↳ ' + child.name}
              </option>
            )),
          ])}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading || isUploading}
          className="flex-1 h-10 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-60"
          style={{ background: 'oklch(0.62 0.16 40)', color: '#fff' }}
        >
          {isLoading ? 'Saving...' : 'Save Product →'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 h-10 rounded-lg text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border:     '1px solid rgba(255,255,255,0.18)',
            color:      'rgba(255,255,255,0.75)',
          }}
        >
          Cancel
        </button>
      </div>

    </form>
  )
}