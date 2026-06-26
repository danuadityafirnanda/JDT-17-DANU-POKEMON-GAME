import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { MAX_POKEMON_ID } from '@/constants/pokemon'

interface Props {
  pokemonId: number
  onBack: () => void
  onPrev: () => void
  onNext: () => void
  disablePrev?: boolean
  disableNext?: boolean
}

const DetailNavigation = ({ pokemonId, onBack, onPrev, onNext, disablePrev, disableNext }: Props) => (
  <div className="mb-4 flex items-center justify-between">
    <button
      onClick={onBack}
      className="flex items-center gap-1 rounded-lg bg-card px-3 py-2 text-[10px] font-medium text-foreground shadow transition hover:bg-accent"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
    <div className="flex gap-2">
      <button
        onClick={onPrev}
        disabled={disablePrev ?? pokemonId <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-foreground shadow transition hover:bg-accent disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        disabled={disableNext ?? pokemonId >= MAX_POKEMON_ID}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-foreground shadow transition hover:bg-accent disabled:opacity-30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  </div>
)

export default DetailNavigation
