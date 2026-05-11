import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    const move = (e) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }
    const show = () => el.style.opacity = '1'
    const hide = () => el.style.opacity = '0'

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseenter', show)
    window.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseenter', show)
      window.removeEventListener('mouseleave', hide)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow pointer-events-none fixed z-[9999] opacity-0 transition-opacity duration-300"
      style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }}
    />
  )
}
