import type { PokemonDetail } from '@/services/types'

interface Props {
  pokemon: PokemonDetail
}

const AboutInfo = ({ pokemon }: Props) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl bg-white/5 p-4 text-center">
        <p className="text-[8px] font-semibold uppercase text-muted-foreground">
          Height
        </p>
        <p className="mt-1 text-base font-bold text-foreground">
          {(pokemon.height / 10).toFixed(1)}m
        </p>
      </div>
      <div className="rounded-xl bg-white/5 p-4 text-center">
        <p className="text-[8px] font-semibold uppercase text-muted-foreground">
          Weight
        </p>
        <p className="mt-1 text-base font-bold text-foreground">
          {(pokemon.weight / 10).toFixed(1)}kg
        </p>
      </div>
    </div>

    <div>
      <h3 className="mb-3 text-[10px] font-semibold uppercase text-muted-foreground">
        Abilities
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {pokemon.abilities.map((a) => (
          <div
            key={a.ability.name}
            className={`rounded-xl p-3 text-center shadow-sm ${
              a.is_hidden ? 'bg-purple-900' : 'bg-indigo-900'
            }`}
          >
            <p className={`text-[8px] font-medium capitalize ${
              a.is_hidden ? 'text-purple-300' : 'text-indigo-300'
            }`}>
              {a.ability.name.replace('-', ' ')}
            </p>
            {a.is_hidden && (
              <p className="mt-1 text-[6px] text-purple-400">
                (hidden)
              </p>
            )}
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="mb-3 text-[10px] font-semibold uppercase text-muted-foreground">
        Moves
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {pokemon.moves.slice(0, 30).map((m) => (
          <div
            key={m.move.name}
            className="rounded-xl bg-blue-900 p-3 text-center shadow-sm"
          >
            <p className="text-[8px] font-medium capitalize text-blue-300">
              {m.move.name.replace('-', ' ')}
            </p>
          </div>
        ))}
      </div>
      {pokemon.moves.length > 30 && (
        <p className="mt-3 text-center text-[8px] text-muted-foreground">
          and {pokemon.moves.length - 30}+ more moves
        </p>
      )}
    </div>
  </div>
)

export default AboutInfo
