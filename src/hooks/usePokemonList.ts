import { useState, useEffect } from 'react'
import { getPokemonList, getPokemonDetail } from '@/services/api'
import type { PokemonWithType } from '@/services/types'
import { ITEMS_PER_PAGE } from '@/constants/pokemon'

interface PokemonListState {
  pokemonList: PokemonWithType[]
  loading: boolean
  totalPages: number
}

export const usePokemonList = (page: number) => {
  const [state, setState] = useState<PokemonListState>({
    pokemonList: [],
    loading: true,
    totalPages: 1,
  })

  useEffect(() => {
    let cancelled = false

    const fetchPokemon = async () => {
      setState((prev) => ({ ...prev, loading: true }))
      try {
        const offset = (page - 1) * ITEMS_PER_PAGE
        const data = await getPokemonList(offset, ITEMS_PER_PAGE)

        const details = await Promise.all(
          data.results.map((p) => getPokemonDetail(p.name))
        )

        if (!cancelled) {
          const pokemonWithType: PokemonWithType[] = data.results.map((p, i) => ({
            name: p.name,
            url: p.url,
            types: details[i].types.map((t) => t.type.name),
          }))

          setState({
            pokemonList: pokemonWithType,
            loading: false,
            totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
          })
        }
      } catch (error) {
        console.error('Failed to fetch Pokemon:', error)
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false }))
        }
      }
    }

    fetchPokemon()

    return () => {
      cancelled = true
    }
  }, [page])

  return state
}
