import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-12 text-center sm:py-20">
      <span className="badge">404</span>
      <h1 className="section-title">Page not found</h1>
      <p className="section-subtitle mx-auto max-w-xl">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </section>
  )
}

export default NotFound