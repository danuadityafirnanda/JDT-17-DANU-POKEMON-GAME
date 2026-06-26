import { getPokemonAnimatedSpriteFromSprites } from '@/services/api'
import { PokeballIcon } from '@/components/Icons/PokeballIcon'
import TypeBadge from '@/components/TypeBadge'
import { TYPE_GRADIENTS } from '@/constants/pokemon'
import type { PokemonDetail } from '@/services/types'

interface Props {
  pokemon: PokemonDetail
  isCaught: boolean
}

const PokemonImageCard = ({ pokemon, isCaught }: Props) => {
  const primaryType = pokemon.types[0]?.type.name || 'normal'
  const gradient = TYPE_GRADIENTS[primaryType] || 'from-gray-400 to-gray-600'
  const animatedSprite = getPokemonAnimatedSpriteFromSprites(pokemon.sprites)

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 shadow-xl`}>
      <div className="absolute right-4 top-4">
        <PokeballIcon size={48} className={isCaught ? 'opacity-100' : 'opacity-20'} />
      </div>
      <div className="absolute bottom-4 right-4 text-3xl font-bold text-white/10">
        #{String(pokemon.id).padStart(3, '0')}
      </div>
      <div className="flex flex-col items-center">
        {animatedSprite ? (
          <img
            src={animatedSprite}
            alt={pokemon.name}
            className="h-48 w-48 object-contain drop-shadow-2xl"
          />
        ) : (
          <img
            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-48 w-48 object-contain drop-shadow-2xl"
          />
        )}
        <h1 className="mt-2 text-lg font-bold uppercase text-white drop-shadow-md">
          {pokemon.name}
        </h1>
        <div className="mt-2">
          <TypeBadge types={pokemon.types} />
        </div>
      </div>
    </div>
  )
}

export default PokemonImageCard
