
const ArchivedView = ({ bookmarks }) => {
  return (
    <ul>
      {bookmarks.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}

export default ArchivedView;