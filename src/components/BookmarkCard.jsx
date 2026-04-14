import { useState } from 'react'

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
  ];


  return (
    <>
    

      <button onClick={() => setSortoption(!sortoption)}>
         Sort: {Options.find((opt) => opt.value === sorttype)?.label}
      </button>
      {sortoption &&  <div>

        {Options.map((opt) => {
          return <div key={opt.value} onClick={() => {
                setSorttype(opt.value);   
                setSortoption(false);    
              }}>

                {opt.label}
            </div>



          
        })}
        
        </div>}


      <ul>
        {bookmarks.map((item) => (
          <li key={item.id}>
            {item.title} - {item.description}
            <button onClick={() => handlearchived(item.id)}>Archive</button>
            <button onClick={() => handlepinned(item.id)}>Pin</button>
            <button onClick={() => navigator.clipboard.writeText(item.url)}>Copy URL</button>
            <button onClick = {() => handleedit(item)}>Edit</button>
            <a href={item.url} target="_blank" rel="noopener noreferrer">Visit</a>
          </li>
        ))}

      </ul>
    </>
  )
}
export default BookmarkCard;
