import { useState } from 'react'
import { getPokemonIdFromUrl, getPokemonSprite, getPokemonAnimatedSprite } from '@/services/api'
import { TYPE_BG_COLORS, TYPE_COLORS } from '@/constants/pokemon'
import { PokeballIcon } from '@/components/Icons/PokeballIcon'
import type { PokemonWithType } from '@/services/types'

interface Props {
  pokemon: PokemonWithType
  onClick?: () => void
  isCaught?: boolean
  onRelease?: () => void
}

const PokemonCard = ({ pokemon, onClick, isCaught, onRelease }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const id = getPokemonIdFromUrl(pokemon.url)
  const staticSprite = getPokemonSprite(id)
  const animatedSprite = getPokemonAnimatedSprite(id)
  const rgb = (pokemon.types && pokemon.types[0]) ? TYPE_BG_COLORS[pokemon.types[0]] : TYPE_BG_COLORS.normal

  return (
    <div
      className="group relative flex flex-col items-center rounded-2xl border border-white/10 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: `rgb(${rgb} / 0.12)`,
        backgroundImage: `linear-gradient(to bottom right, rgb(${rgb} / 0.2), rgb(${rgb} / 0.05))`,
      }}
    >
      <div className={`absolute right-2 top-2 transition-opacity ${isCaught ? 'opacity-100' : 'opacity-20'}`}>
        <PokeballIcon size={18} />
      </div>

      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex w-full flex-col items-center"
      >
        <div className="mb-3 flex h-28 w-28 items-center justify-center rounded-full bg-white/10">
          {isHovered && animatedSprite ? (
            <img
              src={animatedSprite}
              alt={pokemon.name}
              className="h-20 w-20 object-contain"
            />
          ) : (
            <img
              src={staticSprite}
              alt={pokemon.name}
              className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          )}
        </div>
        <h3 className="text-[9px] font-bold uppercase tracking-wider text-white drop-shadow">
          {pokemon.name}
        </h3>
        <div className="mt-2 flex gap-1">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`rounded-full px-2 py-0.5 text-[6px] font-bold uppercase text-white shadow ${TYPE_COLORS[type] || 'bg-gray-400'}`}
            >
              {type}
            </span>
          ))}
        </div>
      </button>

      {isCaught && onRelease && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRelease()
          }}
          className="mt-3 w-full rounded-xl bg-white/10 px-3 py-2 text-[8px] font-bold uppercase text-white/70 transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
        >
          Release
        </button>
      )}
    </div>
  )
}

export default PokemonCard
