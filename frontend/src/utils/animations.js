export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
}

export const slideInLeft = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1 }
}

export const slideInRight = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1 }
}

export const rotateIn = {
  hidden: { rotate: -10, opacity: 0 },
  visible: { rotate: 0, opacity: 1 }
}

export const bounce = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 25
    }
  }
}

export const hover = {
  scale: 1.05,
  transition: { duration: 0.2 }
}

export const tap = {
  scale: 0.95
}

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity
  }
}
