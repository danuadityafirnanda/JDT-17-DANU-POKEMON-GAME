import { createBrowserRouter } from 'react-router'
import Home from '@/pages/Home'
import PokemonDetail from '@/pages/PokemonDetail'
import MyPokemon from '@/pages/MyPokemon'
import CatchPage from '@/pages/Catch'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokemon/:name',
    element: <PokemonDetail />,
  },
  {
    path: '/catch/:name',
    element: <CatchPage />,
  },
  {
    path: '/my-pokemon',
    element: <MyPokemon />,
  },
])
