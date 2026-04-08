const BookmarkCard = ({ filteredbooks }) => {
  return (
    <ul>
      {filteredbooks.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}

export default BookmarkCard;

