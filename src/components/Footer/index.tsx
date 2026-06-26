import { NavLink } from 'react-router'
import { Home } from 'lucide-react'
import { PokeballIcon } from '@/components/Icons/PokeballIcon'

const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="mx-auto flex max-w-4xl items-center justify-around py-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-transform hover:scale-110 ${
              isActive ? 'text-white' : 'text-blue-200'
            }`
          }
        >
          <Home size={24} />
          <span className="text-[8px] font-bold uppercase">Home</span>
        </NavLink>
        <NavLink
          to="/my-pokemon"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-transform hover:scale-110 ${
              isActive ? 'text-white' : 'text-blue-200'
            }`
          }
        >
          <PokeballIcon size={24} outline />
          <span className="text-[8px] font-bold uppercase">My Pokemon</span>
        </NavLink>
      </div>
    </footer>
  )
}

export default Footer