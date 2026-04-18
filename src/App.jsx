import { useState,useEffect } from 'react'
import BookmarkCard from "./components/BookmarkCard"
import Header from './components/Header'
import data from "./data/data.json"
import Sidebar from './components/Siderbar'
import ArchivedView from './components/ArchivedView'
import AddBookmark from './components/Addbookmark'

const App = () => {
  const [bookmarks, setBookmarks] = useState(() => {
  const saved = localStorage.getItem('bookmarks')
  return saved ? JSON.parse(saved) : data.bookmarks
})
  const [searchQuery, setSearchQuery] = useState("")
  const [tags, setTags] = useState([])
  const [currentview, setCurrentviews] = useState("home")
  const [showForm, setShowForm] = useState(false)
  const [editingbookmark, setEditingbookmark] = useState(null)
  const [darkmode,setDarkmode] = useState(false)
  const [sorttype,setSorttype] = useState("recently_added")

  const filteredbooks = bookmarks.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags =
      tags.length === 0 || item.tags.some((tag) => tags.includes(tag))
    const matchesArchived = item.isArchived === false

    return matchesSearch && matchesTags && matchesArchived
  })

  useEffect(() => {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}, [bookmarks])

  const handleAdd = (formData) => {
    const normalizedTags = Array.isArray(formData.tags)
      ? formData.tags
      : formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)

    if (editingbookmark) {
      setBookmarks(
        bookmarks.map((item) =>
          item.id === editingbookmark.id
            ? { ...item, ...formData, tags: normalizedTags }
            : item
        )
      )
      setShowForm(false)
      setEditingbookmark(null)
      return
    }

   setBookmarks([
  ...bookmarks,
  {
    ...formData,
    tags: normalizedTags,
    id: Date.now(),
    isArchived: false,
    pinned: false,
    favicon: '',
    visitCount: 0,
    lastVisited: null,
    createdAt: new Date().toISOString(),
  },
])
    setShowForm(false)
  }

  const handleedit = (bookmark) => {
    setEditingbookmark(bookmark)
    setShowForm(true)
  }

  const archivedBooks = bookmarks.filter((item) => item.isArchived)

  const handlearchived = (id) => {
    setBookmarks(
      bookmarks.map((item) =>
        item.id === id ? { ...item, isArchived: !item.isArchived } : item
      )
    )
  }

  const handlepinned = (id) => {
    setBookmarks(
      bookmarks.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      )
    )
  }

  const allTags = [...new Set(bookmarks.flatMap((item) => item.tags))].sort()

  const handleChange = (e) => {
    const { checked, value } = e.target

    if (checked) {
      setTags([...tags, value])
      return
    }

    setTags(tags.filter((tag) => tag !== value))
  }


  const sortedfunction = {
    recently_added: (a, b) =>
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    recently_visited: (a, b) =>
      new Date(b.lastVisited || 0) - new Date(a.lastVisited || 0),
    most_visiting: (a, b) => (b.visitCount || 0) - (a.visitCount || 0),
  }

  const sorteddata = [...filteredbooks]
    .sort(sortedfunction[sorttype])
    .sort((a, b) => b.pinned - a.pinned)
  return (
    <div className={`app-layout ${darkmode ? "dark" : "white"}`}>
      <Sidebar
        allTags={allTags}
        bookmarks={bookmarks}
        onhandleChange={handleChange}
        tags={tags}
        setTags={setTags}
        setCurrentviews={setCurrentviews}
        currentview={currentview}
      />
      <div className="main-content">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkmode={darkmode}
          setDarkmode={setDarkmode}
          onAddClick={() => {
            setEditingbookmark(null)
            setShowForm(!showForm)
          }}
          showForm={showForm}
        />
        {showForm && (
          <AddBookmark onAdd={handleAdd} editingbookmark={editingbookmark} />
        )}
        {currentview === 'home' && (
          <BookmarkCard
            bookmarks={sorteddata}
            handlearchived={handlearchived}
            handlepinned={handlepinned}
            handleedit={handleedit}
            sorttype={sorttype}
            setSorttype={setSorttype}
          />
        )}
        {currentview === 'archived' && (
          <ArchivedView
            bookmarks={archivedBooks}
            handlearchived={handlearchived}
          />
        )}
      </div>
    </div>
  )
}

export default App;
