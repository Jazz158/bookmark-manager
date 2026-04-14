import bookmarkLogo from '../assets/logo-light-theme.svg'

const Sidebar = ({
  allTags,
  bookmarks,
  onhandleChange,
  tags,
  setTags,
  setCurrentviews,
  currentview,
}) => {
  const getTagCount = (tagName) =>
    bookmarks.filter((item) => !item.isArchived && item.tags.includes(tagName)).length

  return(
    <div className="sidebar">
      <div className="logo">
        <img src={bookmarkLogo} alt="Bookmark Manager logo" width={24} height={24} />
        <span>Bookmark Manager</span>
      </div>

      <div className="sidebar-nav">
        <button
          className={currentview === "home" ? "is-active" : ""}
          onClick={() => setCurrentviews("home")}
        >
          Home
        </button>
        <button
          className={currentview === "archived" ? "is-active" : ""}
          onClick={() => setCurrentviews("archived")}
        >
          Archived
        </button>
      </div>

      <div className="sidebar-section-title">Tags</div>

      <ul className="tag-list">
        {allTags.map((item) => (
          <li className="tag-item" key={item}>
            <label className="tag-label">
              <input
                type="checkbox"
                value={item}
                checked={tags.includes(item)}
                onChange={onhandleChange}
              />
              <span>{item}</span>
            </label>
            <span className="tag-count">{getTagCount(item)}</span>
          </li>
        ))}
      </ul>

      <button className="sidebar-reset" onClick={() => setTags([])}>Reset Filters</button>
    </div>
  )
}

export default Sidebar
