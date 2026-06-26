interface Props {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({ open, title, message, confirmLabel = 'Yes', cancelLabel = 'Cancel', onConfirm, onCancel }: Props) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl">
        <h3 className="mb-2 text-[10px] font-bold text-foreground">{title}</h3>
        <p className="mb-6 text-[9px] text-muted-foreground">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl bg-white/10 py-4 text-[9px] font-bold uppercase text-white/70 transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-4 text-[9px] font-bold uppercase text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog