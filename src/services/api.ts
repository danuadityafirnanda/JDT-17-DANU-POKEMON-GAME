import axios from 'axios'
import type { PokemonListResponse, PokemonDetail, PokemonSprites } from './types'
import { BASE_URL, SPRITE_BASE_URL } from '@/constants/pokemon'

const api = axios.create({
  baseURL: BASE_URL,
})

export const getPokemonList = async (offset: number, limit: number) => {
  const response = await api.get<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`)
  return response.data
}

export const getPokemonDetail = async (nameOrId: string | number) => {
  const response = await api.get<PokemonDetail>(`/pokemon/${nameOrId}`)
  return response.data
}

export const getPokemonIdFromUrl = (url: string) => {
  const matches = url.match(/\/(\d+)\/$/)
  return matches ? parseInt(matches[1], 10) : 0
}

export const getPokemonSprite = (id: number) => {
  return `${SPRITE_BASE_URL}/other/official-artwork/${id}.png`
}

export const getPokemonAnimatedSprite = (id: number) => {
  return `${SPRITE_BASE_URL}/versions/generation-v/black-white/animated/${id}.gif`
}

export const getPokemonAnimatedSpriteFromSprites = (sprites: PokemonSprites) => {
  return sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || ''
}
