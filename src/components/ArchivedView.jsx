const ArchivedView = ({ bookmarks, handlearchived }) => {
  return (
    <section className="bookmark-section">
      <div className="bookmark-toolbar">
        <h2>Archived bookmarks</h2>
      </div>
      <ul className="bookmark-grid">
        {bookmarks.map((item) => (
          <li className="bookmark-card" key={item.id}>
            <div className="card-top">
              <div className="card-brand">
                <div>
                  <strong>{item.title}</strong>
                  <p className="card-domain">{item.url}</p>
                </div>
              </div>
            </div>
            <p className="card-description">{item.description}</p>
            <div className="card-actions">
              <button onClick={() => handlearchived(item.id)}>Unarchive</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ArchivedView