interface ProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, className = "", showLabel = true }: ProgressBarProps) {
  // Garantir que o valor esteja entre 0 e 100
  const safeValue = Math.min(100, Math.max(0, value))

  return (
    <div className={`w-full ${className}`}>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-600 transition-all duration-300 ease-in-out"
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {showLabel && <div className="mt-1 text-xs text-slate-600 text-right">{Math.round(safeValue)}% completo</div>}
    </div>
  )
}
