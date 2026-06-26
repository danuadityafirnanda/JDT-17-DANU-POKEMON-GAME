interface Props {
  size?: number
  className?: string
  color?: string
  outline?: boolean
}

export const PokeballIcon = ({
  size = 24,
  className = '',
  color = '#E3350D',
  outline = false,
}: Props) => {
  if (outline) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M12 2C7.03 2 2.9 5.46 2.1 10h19.8C21.1 5.46 16.97 2 12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M2.1 14c.8 4.54 4.93 8 9.9 8s9.1-3.46 9.9-8H2.1z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C7.03 2 2.9 5.46 2.1 10h19.8C21.1 5.46 16.97 2 12 2z"
        fill={color}
      />
      <path
        d="M2.1 14c.8 4.54 4.93 8 9.9 8s9.1-3.46 9.9-8H2.1z"
        fill="white"
        stroke="#e5e7eb"
        strokeWidth="0.5"
      />
      <rect x="2" y="10" width="20" height="4" fill="#1f2937" />
      <circle cx="12" cy="12" r="3.2" fill="white" stroke="#1f2937" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="#1f2937" />
      <circle cx="12" cy="12" r="10" stroke="#1f2937" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
