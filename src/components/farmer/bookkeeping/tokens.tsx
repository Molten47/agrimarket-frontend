import React from 'react'

export const CARD      = '#1a3a2e'
export const BORDER    = 'rgba(255,255,255,0.08)'
export const TEXT      = 'rgba(255,255,255,0.92)'
export const MUTED     = 'rgba(255,255,255,0.45)'
export const AMBER_HEX = '#e07b28'
export const GREEN     = '#4ade80'
export const ROSE      = '#fb7185'
export const TEAL      = '#2dd4bf'

export function fmt(n: string | number) {
  return `£${Number(n).toFixed(2)}`
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-5 ${className}`}
      style={{ background: CARD, border: `1px solid ${BORDER}` }}>
      {children}
    </div>
  )
}