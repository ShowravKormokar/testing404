import { useRef } from 'react'

function SearchBar({ value, onSearch, isSearching }) {
  const inputRef = useRef(null)

  const handleChange = (event) => {
    onSearch(event.target.value)
  }

  const handleClear = () => {
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      {/* Search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-faint"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9 3a6 6 0 103.89 10.44l5.34 5.34 1.42-1.42-5.34-5.34A6 6 0 009 3zm0 2a4 4 0 110 8 4 4 0 010-8z"
          clipRule="evenodd"
        />
      </svg>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search movies and shows…"
        aria-label="Search movies and shows"
        className="
          input-field
          pl-10
          pr-10
          [&::-webkit-search-cancel-button]:appearance-none
          [&::-webkit-search-decoration]:appearance-none
        "
      />

      {/* Custom clear button */}
      {value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-text-faint transition hover:bg-bg-elevated hover:text-text"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Loading spinner */}
      {isSearching && (
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 animate-spin text-accent"
            aria-hidden="true"
          >
            <path d="M10 2a8 8 0 108 8 8 8 0 00-1.3-4.4l-1.4 1.4A6 6 0 11 4.4 13.3L3 14.7A8 8 0 10 10 2z" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default SearchBar