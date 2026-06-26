import { useState, useEffect } from 'react'
import { getPokemonDetail } from '@/services/api'
import type { PokemonDetail } from '@/services/types'
import { useMyPokemonStore } from '@/stores'

interface PokemonDetailState {
  pokemon: PokemonDetail | null
  loading: boolean
}

export const usePokemonDetail = (name: string | undefined) => {
  const [state, setState] = useState<PokemonDetailState>({
    pokemon: null,
    loading: true,
  })
  const { pokemon: myPokemon, removePokemon } = useMyPokemonStore()

  useEffect(() => {
    let cancelled = false

    const fetchPokemon = async () => {
      if (!name) return
      setState((prev) => ({ ...prev, loading: true }))
      try {
        const data = await getPokemonDetail(name)
        if (!cancelled) {
          setState({ pokemon: data, loading: false })
        }
      } catch (error) {
        console.error('Failed to fetch Pokemon detail:', error)
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false }))
        }
      }
    }

    fetchPokemon()

    return () => {
      cancelled = true
    }
  }, [name])

  const isCaught = state.pokemon ? myPokemon.some((p) => p.name === state.pokemon!.name) : false

  const handleRelease = () => {
    if (!state.pokemon) return
    const myPokemonEntry = myPokemon.find((p) => p.name === state.pokemon!.name)
    if (myPokemonEntry) {
      removePokemon(myPokemonEntry.id)
    }
  }

  return { pokemon: state.pokemon, loading: state.loading, isCaught, handleRelease }
}
