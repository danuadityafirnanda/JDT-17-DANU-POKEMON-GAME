import type { PokemonType } from '@/services/types'
import { TYPE_COLORS } from '@/constants/pokemon'

interface Props {
  types: PokemonType[]
}

const TypeBadge = ({ types }: Props) => (
  <div className="flex gap-2">
    {types.map((t) => (
      <span
        key={t.type.name}
        className={`rounded-full px-4 py-1 text-[8px] font-bold uppercase text-white shadow ${TYPE_COLORS[t.type.name] || 'bg-gray-400'}`}
      >
        {t.type.name}
      </span>
    ))}
  </div>
)

export default TypeBadge
