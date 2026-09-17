function Features() {
  const items = [
    {
      title: 'Vast catalog',
      description: 'Browse thousands of films and TV shows in one place.',
      icon: (
        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
      ),
    },
    {
      title: 'Smart discovery',
      description: 'Find titles by genre, year, and popularity.',
      icon: (
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3l5 5-5 5-5-5 5-5z" />
      ),
    },
    {
      title: 'Clean, offline-first',
      description: 'A fast, responsive app that runs anywhere.',
      icon: (
        <path d="M5 7h10l-1 9H6L5 7zm2 2v5h6V9H7z" />
      ),
    },
  ]

  return (
    <section aria-labelledby="features-heading" className="mt-12">
      <h2
        id="features-heading"
        className="text-center text-sm font-semibold uppercase tracking-widest text-text-muted"
      >
        What you get
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ title, description, icon }) => (
          <div key={title} className="card-hover p-6 text-left">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                {icon}
              </svg>
            </span>
            <h3 className="mt-4 text-base font-semibold text-text">{title}</h3>
            <p className="mt-1 text-sm text-text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features