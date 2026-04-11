const BookmarkCard = ({ bookmarks, handlearchived, handlepinned }) => {
  return (
    <>
      <ul>
        {bookmarks.map((item) => (
          <li key={item.id}>
            {item.title} - {item.description}
            <button onClick={() => handlearchived(item.id)}>Archive</button>
            <button onClick={() => handlepinned(item.id)}>Pin</button>
            <button onClick={() => navigator.clipboard.writeText(item.url)}>Copy URL</button>
            <a href={item.url} target="_blank" rel="noopener noreferrer">Visit</a>
          </li>
        ))}

      </ul>

      <button onClick={() => navigator.clipboard.writeText(item.url)}>Copy URL</button>
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
        Visit
      </a>
    </>
  )


}
export default BookmarkCard;
