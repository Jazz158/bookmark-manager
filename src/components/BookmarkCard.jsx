import { useState } from 'react'

const faviconModules = import.meta.glob('../assets/*', {
  eager: true,
  import: 'default',
})

const getFaviconSrc = (faviconPath) => {
  const fileName = faviconPath?.split('/').pop()

  if (!fileName) {
    return ''
  }

  return faviconModules[`../assets/${fileName}`] || ''
}

const getHostname = (url) => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

const formatDate = (value) => {
  if (!value) {
    return 'Never'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

const BookmarkCard = ({
  bookmarks,
  handlearchived,
  handlepinned,
  handleedit,
  sorttype,
  setSorttype,
}) => {
  const [sortoption, setSortoption] = useState(false)

  const Options = [
    { label: "Recently Added", value: "recently_added" },
    { label: "Recently Visited", value: "recently_visited" },
    { label: "Most Visiting", value: "most_visiting" },
  ]

  return (
    <section className="bookmark-section">
      <div className="bookmark-toolbar">
        <h2>All bookmarks</h2>
        <div className="sort-menu">
          <button className="sort-button" onClick={() => setSortoption(!sortoption)}>
            Sort by
          </button>
          {sortoption && (
            <div className="sort-dropdown">
              {Options.map((opt) => (
                <button
                  className={opt.value === sorttype ? "sort-option is-selected" : "sort-option"}
                  key={opt.value}
                  onClick={() => {
                    setSorttype(opt.value)
                    setSortoption(false)
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ul className="bookmark-grid">
        {bookmarks.map((item) => (
          <li className="bookmark-card" key={item.id}>
            <div className="card-top">
              <div className="card-brand">
                <img
                  className="card-favicon"
                  src={getFaviconSrc(item.favicon)}
                  alt={item.title}
                  width={32}
                  height={32}
                />
                <div>
                  <strong>{item.title}</strong>
                  <p className="card-domain">{getHostname(item.url)}</p>
                </div>
              </div>
              <button className="card-menu-button" type="button">...</button>
            </div>

            <p className="card-description">{item.description}</p>

            <div className="card-tags">
              {item.tags.map((tag) => (
                <span className="card-tag" key={tag}>{tag}</span>
              ))}
            </div>

            <div className="card-meta">
              <span>{item.visitCount} views</span>
              <span>{formatDate(item.lastVisited)}</span>
              <span>{formatDate(item.createdAt)}</span>
            </div>

            <div className="card-actions">
              <button onClick={() => handlearchived(item.id)}>Archive</button>
              <button onClick={() => handlepinned(item.id)}>Pin</button>
              <button onClick={() => navigator.clipboard.writeText(item.url)}>Copy URL</button>
              <button onClick={() => handleedit(item)}>Edit</button>
            </div>

            <a className="visit-link" href={item.url} target="_blank" rel="noopener noreferrer">Visit</a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BookmarkCard
