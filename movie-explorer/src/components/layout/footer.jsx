import {
  GithubIcon,
  LinkedInIcon,
  PortfolioIcon,
} from '../../pages/Learn/SocialIcons'

function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="page-container flex h-14 flex-wrap items-center justify-between gap-2 text-xs text-text-muted">
        <span>© {new Date().getFullYear()} Movie Explorer</span>
        <span>Showrav Kormokar®</span>
        <span className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/showrav-kormokar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded p-1 text-text-faint transition hover:bg-bg-elevated hover:text-text"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/ShowravKormokar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded p-1 text-text-faint transition hover:bg-bg-elevated hover:text-text"
          >
            <GithubIcon />
          </a>
          <a
            href="https://engrshowrav.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="rounded p-1 text-text-faint transition hover:bg-bg-elevated hover:text-text"
          >
            <PortfolioIcon />
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer