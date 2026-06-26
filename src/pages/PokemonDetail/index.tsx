import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router'
import Footer from '@/components/Footer'
import PokemonImageCard from '@/components/PokemonImageCard'
import DetailNavigation from '@/components/DetailNavigation'
import StatBar from '@/components/StatBar'
import AboutInfo from '@/components/AboutInfo'
import ConfirmDialog from '@/components/ConfirmDialog'
import { getPokemonDetail } from '@/services/api'
import { usePokemonDetail } from '@/hooks/usePokemonDetail'
import { useMyPokemonStore } from '@/stores'
import { ITEMS_PER_PAGE, MAX_POKEMON_ID } from '@/constants/pokemon'

const PokemonDetailPage = () => {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') || 'home'
  const fromPage = searchParams.get('fromPage') || '1'
  const [activeTab, setActiveTab] = useState<'stats' | 'about'>('stats')
  const [showReleaseDialog, setShowReleaseDialog] = useState(false)
  const { pokemon, loading, isCaught, handleRelease } = usePokemonDetail(name)
  const { pokemon: myPokemon } = useMyPokemonStore()

  const isFromMyPokemon = from === 'my-pokemon'
  const sortedMyPokemon = [...myPokemon].sort((a, b) => a.id - b.id)
  const currentIndex = sortedMyPokemon.findIndex((p) => p.name === name)

  const getCurrentPage = () => {
    if (!pokemon) return fromPage
    if (isFromMyPokemon) return 'my-pokemon'
    return String(Math.ceil(pokemon.id / ITEMS_PER_PAGE))
  }

  const getBackUrl = () => {
    if (isFromMyPokemon) return '/my-pokemon'
    return `/?page=${getCurrentPage()}`
  }

  const navigatePokemon = async (direction: 'prev' | 'next') => {
    if (!pokemon) return

    if (isFromMyPokemon) {
      const targetIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
      if (targetIndex >= 0 && targetIndex < sortedMyPokemon.length) {
        const target = sortedMyPokemon[targetIndex]
        navigate(`/pokemon/${target.name}?from=my-pokemon`)
      }
      return
    }

    const newId = direction === 'prev' ? pokemon.id - 1 : pokemon.id + 1
    if (newId < 1 || newId > MAX_POKEMON_ID) return
    const data = await getPokemonDetail(newId)
    const newPage = Math.ceil(data.id / ITEMS_PER_PAGE)
    navigate(`/pokemon/${data.name}?from=home&fromPage=${newPage}`)
  }

  const handleReleaseConfirm = () => {
    handleRelease()
    navigate(getBackUrl())
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center bg-background">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center bg-background">
          <p className="text-sm text-muted-foreground">Pokemon not found</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <DetailNavigation
            pokemonId={pokemon.id}
            onBack={() => navigate(getBackUrl())}
            onPrev={() => navigatePokemon('prev')}
            onNext={() => navigatePokemon('next')}
            disablePrev={isFromMyPokemon ? currentIndex <= 0 : undefined}
            disableNext={isFromMyPokemon ? currentIndex >= sortedMyPokemon.length - 1 : undefined}
          />

          <PokemonImageCard pokemon={pokemon} isCaught={isCaught} />

          <div className="mt-6 flex rounded-2xl bg-card p-1 shadow-md">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 rounded-xl py-2.5 text-[10px] font-semibold transition ${
                activeTab === 'stats'
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 rounded-xl py-2.5 text-[10px] font-semibold transition ${
                activeTab === 'about'
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              About
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-card p-6 shadow-md">
            {activeTab === 'stats' ? (
              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <StatBar key={stat.stat.name} stat={stat} />
                ))}
              </div>
            ) : (
              <AboutInfo pokemon={pokemon} />
            )}
          </div>

          <div className="mt-6 pb-4">
            {isCaught ? (
              <button
                onClick={() => setShowReleaseDialog(true)}
                className="w-full rounded-2xl bg-red-500/20 py-4 text-[10px] font-bold uppercase tracking-wider text-red-400 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-red-500/30 hover:text-red-300 hover:shadow-xl active:translate-y-0"
              >
                Release
              </button>
            ) : (
              <button
                onClick={() => navigate(`/catch/${pokemon.name}?from=${from}&fromPage=${fromPage}`)}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-4 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl active:translate-y-0"
              >
                Catch!
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <ConfirmDialog
        open={showReleaseDialog}
        title="Release Pokemon"
        message={`Are you sure you want to release ${pokemon.name}? This cannot be undone.`}
        confirmLabel="Release"
        onConfirm={handleReleaseConfirm}
        onCancel={() => setShowReleaseDialog(false)}
      />
    </div>
  )
}

export default PokemonDetailPage
