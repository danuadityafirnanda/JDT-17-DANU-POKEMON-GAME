const SkeletonCard = () => {
    return (
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md">
            <div className="mb-3 h-28 w-28 animate-pulse rounded-full bg-white/10" />
            <div className="h-2 w-16 animate-pulse rounded bg-white/10" />
            <div className="mt-2 flex gap-1">
            <div className="h-3 w-8 animate-pulse rounded-full bg-white/10" />
            <div className="h-3 w-8 animate-pulse rounded-full bg-white/10" />
            </div>
        </div>
    )
}

export default SkeletonCard