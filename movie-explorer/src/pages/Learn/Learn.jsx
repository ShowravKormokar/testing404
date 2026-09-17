import {
  GithubIcon,
  LinkedInIcon,
  PortfolioIcon,
} from './SocialIcons'

function Learn() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="section-title mt-2">Learn More</h1>
      <p className="section-subtitle">
        A short look at what this project is and who built it.
      </p>

      <div className="card mt-8 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-text">What is Movie Explorer?</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Movie Explorer is a single-page React + Vite application built to
          browse movies and TV shows from the public TVMaze API. It features a
          cinematic dark theme, responsive movie cards, debounced title
          search, and a details modal — all without any backend, authentication,
          or heavy state-management libraries.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          The project is structured as an intermediate-level React app: a
          feature folder for movies, a shared Axios instance, reusable hooks,
          presentational components, and a minimal routing layer.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-text">Tech Stack</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {['React 19', 'Vite', 'Tailwind CSS v4', 'React Router', 'Axios', 'react-modal'].map(
            (tech) => (
              <li key={tech} className="badge">
                {tech}
              </li>
            ),
          )}
        </ul>

        <h2 className="mt-8 text-xl font-semibold text-text">Built by</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Showrav Kormokar — a software engineer focused on clean, maintainable
          frontend architecture. This app was built as part of a learning
          assignment and is hosted on a static host.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/showrav-kormokar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a
            href="https://github.com/ShowravKormokar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href="https://engrshowrav.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <PortfolioIcon />
            Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}

export default Learn