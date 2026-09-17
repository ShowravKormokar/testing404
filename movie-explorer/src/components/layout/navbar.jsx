import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="page-container flex h-16 items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-text"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-black text-white">
            🎬
          </span>
          Movie Explorer
        </NavLink>

        <div className="flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent/15 text-accent'
                    : 'text-text-muted hover:bg-bg-elevated hover:text-text',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar