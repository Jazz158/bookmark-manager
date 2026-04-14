import avatarImage from '../assets/image-avatar.webp'

const Header = ({
  searchQuery,
  setSearchQuery,
  darkmode,
  setDarkmode,
  onAddClick,
  showForm,
}) => {
  return (
    <div className="header">
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="header-actions">
        <button onClick={onAddClick}>
          {showForm ? 'Cancel' : '+ Add Bookmark'}
        </button>
        <button onClick={() => setDarkmode(!darkmode)}>
          {darkmode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <img className="header-avatar" src={avatarImage} alt="Profile avatar" width={38} height={38} />
      </div>
    </div>
  )
}

export default Header
