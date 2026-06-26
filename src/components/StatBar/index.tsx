import type { PokemonStat } from '@/services/types'
import { STAT_MAX } from '@/constants/pokemon'

const STAT_GRADIENTS: Record<string, string> = {
  hp: 'from-green-400 to-emerald-500',
  attack: 'from-red-400 to-rose-500',
  defense: 'from-blue-400 to-indigo-500',
  'special-attack': 'from-purple-400 to-violet-500',
  'special-defense': 'from-teal-400 to-cyan-500',
  speed: 'from-yellow-400 to-amber-500',
}

interface Props {
  stat: PokemonStat
}

const StatBar = ({ stat }: Props) => {
  const maxVal = STAT_MAX[stat.stat.name] || 255
  const percentage = Math.min((stat.base_stat / maxVal) * 100, 100)
  const gradient = STAT_GRADIENTS[stat.stat.name] || 'from-gray-400 to-gray-500'

  return (
    <div>
      <div className="mb-1 flex justify-between text-[8px]">
        <span className="font-semibold uppercase text-muted-foreground">
          {stat.stat.name.replace('-', ' ')}
        </span>
        <span className="font-bold text-foreground">
          {stat.base_stat}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default StatBar
