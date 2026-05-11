import { CARD_DARK, BORDER, TEXT } from './tokens'

export function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl px-4 py-3 shadow-xl text-sm"
      style={{ background: CARD_DARK, border: `1px solid ${BORDER}`, color: TEXT }}>
      {label && <p className="font-semibold mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.name?.toLowerCase().includes('revenue')
            ? `£${Number(p.value).toFixed(2)}` : p.value}
        </p>
      ))}
    </div>
  )
}