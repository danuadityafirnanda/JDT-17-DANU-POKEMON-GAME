interface Props {
  result: 'caught' | 'failed' | null
  catching: boolean
  isCaught: boolean
  onCatch: () => void
  onViewMyPokemon: () => void
  onGoBack: () => void
}

const CatchActions = ({ result, catching, isCaught, onCatch, onViewMyPokemon, onGoBack }: Props) => {
  if (result === 'caught') {
    return (
      <button
        onClick={onViewMyPokemon}
        className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-4 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
      >
        View My Pokemon
      </button>
    )
  }

  if (result === 'failed') {
    return (
      <>
        <button
          onClick={onCatch}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-4 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
        >
          Try Again
        </button>
        <button
          onClick={onGoBack}
          className="w-full rounded-2xl bg-white/10 py-4 text-[10px] font-bold uppercase tracking-wider text-white/70 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
        >
          Run Away
        </button>
      </>
    )
  }

  if (isCaught) {
    return (
      <button
        onClick={onGoBack}
        className="w-full rounded-2xl bg-white/10 py-4 text-[10px] font-bold uppercase tracking-wider text-white/70 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
      >
        Go Back
      </button>
    )
  }

  return (
    <>
      <button
        onClick={onCatch}
        disabled={catching}
        className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-4 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl disabled:opacity-50"
      >
        {catching ? 'Catching...' : 'Catch!'}
      </button>
      <button
        onClick={onGoBack}
        className="w-full rounded-2xl bg-white/10 py-4 text-[10px] font-bold uppercase tracking-wider text-white/70 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
      >
        Run Away
      </button>
    </>
  )
}

export default CatchActions
