export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-float"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)', animationDelay: '0s' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-float"
        style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.25) 0%, transparent 70%)', animationDelay: '-3s' }} />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10 blur-3xl animate-float"
        style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.4) 0%, transparent 70%)', animationDelay: '-6s' }} />
    </div>
  )
}
