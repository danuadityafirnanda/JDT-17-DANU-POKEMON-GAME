import { create } from 'zustand'

export interface MyPokemon {
  id: number
  name: string
  nickname: string
  image: string
  types: string[]
}

interface MyPokemonState {
  pokemon: MyPokemon[]
  addPokemon: (pokemon: MyPokemon) => void
  removePokemon: (id: number) => void
}

const loadPokemon = (): MyPokemon[] => {
  try {
    const data = localStorage.getItem('myPokemon')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const savePokemon = (pokemon: MyPokemon[]) => {
  localStorage.setItem('myPokemon', JSON.stringify(pokemon))
}

export const useMyPokemonStore = create<MyPokemonState>((set) => ({
  pokemon: loadPokemon(),
  addPokemon: (pokemon) =>
    set((state) => {
      const updated = [...state.pokemon, pokemon]
      savePokemon(updated)
      return { pokemon: updated }
    }),
  removePokemon: (id) =>
    set((state) => {
      const updated = state.pokemon.filter((p) => p.id !== id)
      savePokemon(updated)
      return { pokemon: updated }
    }),
}))
