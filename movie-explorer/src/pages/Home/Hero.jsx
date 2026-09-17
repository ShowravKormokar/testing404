import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-border bg-bg-card px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(229,9,20,0.22),transparent_70%),radial-gradient(40%_40%_at_90%_100%,rgba(168,85,247,0.18),transparent_70%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
          animation: 'grain 6s linear infinite',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,transparent_50%,rgba(0,0,0,0.55))]"
      />

      <style>{`
        @keyframes grain {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-10%, -10%); }
        }
      `}</style>

      <div className="relative mx-auto max-w-3xl text-center">

        <h1
          id="hero-heading"
          className="text-4xl font-extrabold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl"
        >
          Discover your next{' '}
          <span className="bg-linear-to-r from-accent via-rose-400 to-violet-400 bg-clip-text text-transparent">
            favorite
          </span>{' '}
          movie.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
          Explore a vast catalog of films and TV shows. From timeless classics
          to the latest releases, find something worth your time.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/movies" className="btn-primary">
            Browse Movies
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <Link to="/learn" className="btn-ghost">
            Learn more
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-faint">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Free to explore
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Updated daily
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            No account required
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero