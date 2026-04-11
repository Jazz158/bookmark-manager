const BookmarkCard = ({ bookmarks,handlearchived,handlepinned }) => {
  return (
    <ul>
      {bookmarks.map((item) => (
        <li key={item.id}>{item.title} - {item.description}

       <button onClick={() => handlearchived(item.id)}>
        Archived button for now lol
      </button>
      <button onClick = {() => handlepinned(item.id)} >Pinned</button>
        
        </li>
      
      ))}
     
    </ul>)}
export default BookmarkCard;
