import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  onSubmit:  (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  error:     string | null
}

// Auto-formats as user types: "sw1a1aa" → "SW1A 1AA"
function formatPostcode(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '')
  if (clean.length > 4) {
    return clean.slice(0, -3) + ' ' + clean.slice(-3)
  }
  return clean
}

const UK_POSTCODE = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s[0-9][A-Z]{2}$/i

export function RegisterForm({ onSubmit, isLoading, error }: Props) {
  const [postcode, setPostcode]       = useState('')
  const [postcodeErr, setPostcodeErr] = useState('')

  function handlePostcodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPostcode(e.target.value)
    setPostcode(formatted)
    if (formatted.length > 0 && !UK_POSTCODE.test(formatted)) {
      setPostcodeErr('Enter a valid UK postcode e.g. YO1 9XX')
    } else {
      setPostcodeErr('')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">Full Name</Label>
          <Input id="full_name" name="full_name"
            placeholder="John Smith" className="h-10" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="farm_name">Farm Name</Label>
          <Input id="farm_name" name="farm_name"
            placeholder="Smith's Farm" className="h-10" required />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email"
          placeholder="you@farm.co.uk" className="h-10" required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel"
          placeholder="07700 900123" className="h-10" required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password"
          placeholder="Min. 8 characters" className="h-10" required minLength={8} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="county">County</Label>
          <Input id="county" name="county"
            placeholder="Yorkshire" className="h-10" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            id="postcode"
            name="postcode"
            placeholder="YO1 9XX"
            className={`h-10 ${postcodeErr ? 'border-destructive' : ''}`}
            value={postcode}
            onChange={handlePostcodeChange}
            maxLength={8}
            required
          />
          {postcodeErr && (
            <p className="text-xs text-destructive mt-1">{postcodeErr}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">
          Farm Bio{' '}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea id="bio" name="bio"
          placeholder="Tell consumers about your farm..."
          rows={3} className="resize-none" />
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 font-semibold text-sm"
        style={{ backgroundColor: 'oklch(0.62 0.16 40)', color: 'oklch(0.97 0.01 85)' }}
        disabled={isLoading || !!postcodeErr}
      >
        {isLoading ? 'Creating account...' : 'Create account →'}
      </Button>
    </form>
  )
}