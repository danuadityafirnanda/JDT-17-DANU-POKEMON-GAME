export const ITEMS_PER_PAGE = 20
export const MAX_POKEMON_ID = 1025

export const BASE_URL = 'https://pokeapi.co/api/v2'
export const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const STAT_MAX: Record<string, number> = {
  hp: 255,
  attack: 190,
  defense: 250,
  'special-attack': 194,
  'special-defense': 250,
  speed: 200,
}

export const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
}

export const TYPE_BG_COLORS: Record<string, string> = {
  normal: '243 244 246',
  fire: '255 237 213',
  water: '219 234 254',
  electric: '254 249 195',
  grass: '220 252 231',
  ice: '207 250 254',
  fighting: '254 226 226',
  poison: '243 232 255',
  ground: '254 243 199',
  flying: '224 231 255',
  psychic: '252 231 243',
  bug: '236 252 203',
  rock: '245 245 244',
  ghost: '237 233 254',
  dragon: '224 231 255',
  dark: '243 244 246',
  steel: '243 244 246',
  fairy: '252 231 243',
}

export const TYPE_GRADIENTS: Record<string, string> = {
  grass: 'from-green-400 to-green-600',
  fire: 'from-orange-400 to-red-500',
  water: 'from-blue-400 to-blue-600',
  electric: 'from-yellow-300 to-yellow-500',
  psychic: 'from-pink-400 to-purple-500',
  dragon: 'from-indigo-500 to-purple-600',
  dark: 'from-gray-600 to-gray-800',
  fairy: 'from-pink-300 to-pink-500',
  ice: 'from-cyan-300 to-blue-400',
  ground: 'from-amber-500 to-yellow-600',
  rock: 'from-stone-400 to-stone-600',
  bug: 'from-lime-400 to-green-500',
  poison: 'from-purple-400 to-purple-600',
  flying: 'from-sky-300 to-indigo-400',
  normal: 'from-gray-300 to-gray-500',
  fighting: 'from-red-500 to-orange-600',
  ghost: 'from-purple-500 to-indigo-600',
  steel: 'from-slate-400 to-slate-600',
}
