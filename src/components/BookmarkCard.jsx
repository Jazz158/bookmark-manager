const BookmarkCard = ({ bookmarks,handlearchived }) => {
  return (
    <ul>
      {bookmarks.map((item) => (
        <li key={item.id}>{item.title} - {item.description}

       <button onClick={() => handlearchived(item.id)}>
        Archived button for now lol
      </button>
        
        </li>
      
      ))}
     
    </ul>)}
export default BookmarkCard;
