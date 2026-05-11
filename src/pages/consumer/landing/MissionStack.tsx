import { Sprout, HandCoins, Truck, ShieldCheck } from 'lucide-react'
import MissionCard from './MissionCard'

// Each card sticks slightly lower than the previous — creates the cover effect
const STACK_TOP_PX = 64 // navbar height

const CARDS = [
  {
    label:   'The problem',
    heading: 'Farmers earn pennies.\nSupermarkets keep pounds.',
    body:    'British farmers receive as little as 8p for every £1 of food sold in supermarkets. The system was never designed to reward the people who grow our food.',
    icon:    <HandCoins size={72} strokeWidth={1.2} color="var(--chart-3)" />,
    bgVar:   'var(--background)',
    fgDark:  true,
  },
  {
    label:   'Our answer',
    heading: 'Cut out every middleman. Every single one.',
    body:    'AgriMarket is a direct line between farm and table. Farmers set their own prices. Buyers see exactly where their food comes from. No auction floors. No brokers. No markups.',
    icon:    <Sprout size={72} strokeWidth={1.2} color="var(--primary-foreground)" />,
    bgVar:   'var(--primary)',
    fgDark:  false,
  },
  {
    label:   'For communities',
    heading: 'Money stays in rural Britain.',
    body:    'When you buy through AgriMarket, the revenue flows back into the farming community — funding real livelihoods, sustaining local ecosystems, and keeping the British countryside alive.',
    icon:    <ShieldCheck size={72} strokeWidth={1.2} color="var(--chart-3)" />,
    bgVar:   'oklch(0.22 0.04 85)',
    fgDark:  false,
  },
  {
    label:   'The result',
    heading: 'Fresher food. Fairer prices. Every time.',
    body:    'Produce harvested to order reaches your door in 24–48 hours. No warehousing. No cold-chain delays. Just food at peak freshness, from the people who grew it.',
    icon:    <Truck size={72} strokeWidth={1.2} color="var(--primary)" />,
    bgVar:   'var(--accent)',
    fgDark:  true,
  },
]

export default function MissionStack() {
  return (
    // Scroll height = number of cards × one full viewport each
    <div style={{ height: `${CARDS.length * 100}vh` }}>
      {CARDS.map((card, i) => (
        <MissionCard
          key={card.label}
          index={i}
          topOffset={STACK_TOP_PX}
          {...card}
        />
      ))}
    </div>
  )
}