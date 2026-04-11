import { useState } from 'react'
import BookmarkCard from "./components/BookmarkCard"
import Header from './components/Header'
import data from "./data/data.json"
import Sidebar from './components/Siderbar'
import ArchivedView from './components/ArchivedView'


const App = () => {
  const [bookmarks, setBookmarks] = useState(data.bookmarks)
  const [searchQuery, setSearchQuery] = useState("")
  const [tags, setTags] = useState([])
  const [currentview, setCurrentviews] = useState("home")


  const filteredbooks = bookmarks.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = tags.length === 0 ||
      item.tags.some(tag => tags.includes(tag));
    const matchesArchived = item.isArchived === false

    return matchesSearch && matchesTags && matchesArchived});


  const isPinned = [...filteredbooks].sort((a,b) =>  b.pinned - a.pinned)


    const archivedBooks = bookmarks.filter((item) => item.isArchived)

   const handlearchived = (id) => {
  setBookmarks(bookmarks.map((item) =>
    item.id === id ? {...item, isArchived: !item.isArchived} : item
  ))
}

 const handlepinned = (id) => {
   setBookmarks(bookmarks.map((item) =>
    item.id === id ? {...item, pinned: !item.pinned} : item
  ))

 }


    const allTags = [...new Set(bookmarks.flatMap((item) => (item.tags)))].sort()

    const handleChange = (e) => {
      const { checked, value } = e.target;

      if (checked) {
        // ADD tag
        setTags([...tags, value]);
      } else {
        // REMOVE tag
        setTags(tags.filter(tag => tag !== value));
      }
    };



    return (
      <>
        < Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {currentview === 'home' && <BookmarkCard bookmarks={isPinned} handlearchived = {handlearchived} handlepinned ={handlepinned} />}
        {currentview === 'archived' && <ArchivedView bookmarks={archivedBooks}  handlearchived = {handlearchived}/>}
        <Sidebar allTags={allTags} onhandleChange={handleChange} tags={tags} setTags={setTags} setCurrentviews={setCurrentviews} />
      </>
    )
  }

export default App;
