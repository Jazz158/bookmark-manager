const BookmarkCard = ({ bookmarks }) => {
  return (
    <ul>
      {bookmarks.map((item) => (
        <li key={item.id}>{item.title} - {item.description}</li>
      ))}
    </ul>)}
export default BookmarkCard;
