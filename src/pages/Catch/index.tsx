import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router'
import { getPokemonAnimatedSpriteFromSprites } from '@/services/api'
import { usePokemonDetail } from '@/hooks/usePokemonDetail'
import { useMyPokemonStore } from '@/stores'
import CatchPokemonDisplay from '@/components/CatchPokemonDisplay'
import CatchActions from '@/components/CatchActions'
import Footer from '@/components/Footer'
import pokemonFieldBg from '@/assets/pokemon-field-background.jpg'

const CatchPage = () => {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') || 'home'
  const fromPage = searchParams.get('fromPage') || '1'
  const { pokemon, loading, isCaught } = usePokemonDetail(name)
  const { addPokemon } = useMyPokemonStore()
  const [catching, setCatching] = useState(false)
  const [result, setResult] = useState<'caught' | 'failed' | null>(null)

  const getBackUrl = () => {
    if (from === 'my-pokemon') return '/my-pokemon'
    return `/?page=${fromPage}`
  }

  const handleCatch = () => {
    if (!pokemon) return
    setResult(null)
    setCatching(true)
    setTimeout(() => {
      const success = Math.random() > 0.5
      if (success) {
        const nickname = `${pokemon.name}-${Date.now().toString(36)}`
        addPokemon({
          id: pokemon.id,
          name: pokemon.name,
          nickname,
          image: pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default,
          types: pokemon.types.map((t) => t.type.name),
        })
        setResult('caught')
      } else {
        setResult('failed')
      }
      setCatching(false)
    }, 1500)
  }

  const animatedSprite = pokemon ? getPokemonAnimatedSpriteFromSprites(pokemon.sprites) : ''

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
      <main
        className="flex flex-1 flex-col items-center justify-between bg-cover bg-center p-6"
        style={{ backgroundImage: `url(${pokemonFieldBg})` }}
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <CatchPokemonDisplay pokemon={pokemon} animatedSprite={animatedSprite} result={result} catching={catching} isCaught={isCaught} />
        </div>

        <div className="w-full max-w-sm space-y-3 pb-6">
          <CatchActions result={result} catching={catching} isCaught={isCaught} onCatch={handleCatch} onViewMyPokemon={() => navigate('/my-pokemon')} onGoBack={() => navigate(getBackUrl())} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CatchPage
