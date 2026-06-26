import { useState } from 'react'
import Footer from '@/components/Footer'
import PokemonCard from '@/components/PokemonCard'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useMyPokemonStore } from '@/stores'
import { useNavigate } from 'react-router'

const MyPokemon = () => {
  const navigate = useNavigate()
  const { pokemon, removePokemon } = useMyPokemonStore()
  const [releaseTarget, setReleaseTarget] = useState<{ id: number; name: string } | null>(null)

  const handleRelease = () => {
    if (releaseTarget) {
      removePokemon(releaseTarget.id)
      setReleaseTarget(null)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-6">
          {pokemon.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
                alt="Psyduck"
                className="mb-6 h-32 w-32 opacity-50"
              />
              <p className="text-[10px] font-semibold text-muted-foreground">
                You have no Pokemon yet!
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-[9px] font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
              >
                Go Catch Some!
              </button>
            </div>
          ) : (
            <>
              <h2 className="mb-4 text-[11px] font-bold text-foreground">
                My Pokemon ({pokemon.length})
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {pokemon.map((p) => (
                  <PokemonCard
                    key={`${p.id}-${p.nickname}`}
                    pokemon={{ name: p.name, url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`, types: p.types || ['normal'] }}
                    onClick={() => navigate(`/pokemon/${p.name}?from=my-pokemon`)}
                    isCaught
                    onRelease={() => setReleaseTarget({ id: p.id, name: p.name })}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

      <ConfirmDialog
        open={!!releaseTarget}
        title="Release Pokemon"
        message={`Are you sure you want to release ${releaseTarget?.name}? This cannot be undone.`}
        confirmLabel="Release"
        onConfirm={handleRelease}
        onCancel={() => setReleaseTarget(null)}
      />
    </div>
  )
}

export default MyPokemon
