import { PokeballIcon } from '@/components/Icons/PokeballIcon'
import type { PokemonDetail } from '@/services/types'

interface Props {
  pokemon: PokemonDetail
  animatedSprite: string
  result: 'caught' | 'failed' | null
  catching: boolean
  isCaught: boolean
}

const CatchPokemonDisplay = ({ pokemon, animatedSprite, result, catching, isCaught }: Props) => {
  const sprite = animatedSprite || pokemon.sprites.other?.['official-artwork']?.front_default

  if (result === 'caught') {
    return (
      <div className="flex flex-col items-center gap-4 animate-bounce">
        <p className="text-[10px] font-bold text-white drop-shadow-lg text-center">
          Gotcha! {pokemon.name} was caught!
        </p>
        <hr />
        <img src={sprite} alt={pokemon.name} className="h-48 w-48 object-contain drop-shadow-2xl" />
      </div>
    )
  }

  if (result === 'failed') {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-[10px] font-bold text-white/70 drop-shadow-lg text-center">
          Oh no! {pokemon.name} broke free!
        </p>
        <hr />
        <img src={sprite} alt={pokemon.name} className="h-48 w-48 object-contain drop-shadow-2xl opacity-50" />
      </div>
    )
  }

  if (catching) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-48 w-48">
          <div className="absolute inset-0 animate-spin rounded-full border-8 border-white/20 border-t-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <PokeballIcon size={300} />
          </div>
        </div>
        <p className="text-[10px] font-bold text-white drop-shadow-lg animate-pulse">
          Catching {pokemon.name}...
        </p>
      </div>
    )
  }

  if (isCaught) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-[10px] font-bold text-white drop-shadow-lg">
          {pokemon.name} is already in your team!
        </p>
        <hr />
        <img src={sprite} alt={pokemon.name} className="h-48 w-48 object-contain drop-shadow-2xl" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[10px] font-bold text-white drop-shadow-lg">
        A wild {pokemon.name} appeared!
      </p>
      <hr />
      <img src={sprite} alt={pokemon.name} className="h-48 w-48 object-contain drop-shadow-2xl" />
    </div>
  )
}

export default CatchPokemonDisplay
