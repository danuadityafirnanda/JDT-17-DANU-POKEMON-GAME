import { ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '@/components/Footer'
import PokemonCard from '@/components/PokemonCard'
import { usePokemonList } from '@/hooks/usePokemonList'
import { useMyPokemonStore } from '@/stores'
import { useNavigate, useSearchParams } from 'react-router'
import SkeletonCard from '@/components/SkeletonCard'

const Home = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const { pokemonList, loading, totalPages } = usePokemonList(currentPage)
  const { pokemon: myPokemon } = useMyPokemonStore()

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1) })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: String(currentPage + 1) })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="mb-6 grid grid-cols-2 gap-4">
            {loading
              ? Array.from({ length: 20 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : pokemonList.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.name}
                    pokemon={pokemon}
                    isCaught={myPokemon.some((p) => p.name === pokemon.name)}
                    onClick={() => navigate(`/pokemon/${pokemon.name}?from=home&fromPage=${currentPage}`)}
                  />
                ))
            }
          </div>

          <div className="flex items-center justify-center gap-4 py-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex h-12 items-center gap-1 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-[9px] font-bold">Prev</span>
            </button>
            <span className="text-[9px] font-semibold text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex h-12 items-center gap-1 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="text-[9px] font-bold">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
