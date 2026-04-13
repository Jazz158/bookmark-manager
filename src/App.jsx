import { useState } from 'react'
import BookmarkCard from "./components/BookmarkCard"
import Header from './components/Header'
import data from "./data/data.json"
import Sidebar from './components/Siderbar'
import ArchivedView from './components/ArchivedView'
import AddBookmark from './components/Addbookmark'

const App = () => {
  const [bookmarks, setBookmarks] = useState(data.bookmarks)
  const [searchQuery, setSearchQuery] = useState("")
  const [tags, setTags] = useState([])
  const [currentview, setCurrentviews] = useState("home")
  const [showForm, setShowForm] = useState(false)
  const [editingbookmark, setEditingbookmark] = useState(null)
  const [darkmode,setDarkmode] = useState(false)

  const filteredbooks = bookmarks.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags =
      tags.length === 0 || item.tags.some((tag) => tags.includes(tag))
    const matchesArchived = item.isArchived === false

    return matchesSearch && matchesTags && matchesArchived
  })

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
      },
    ])
    setShowForm(false)
  }

  const handleedit = (bookmark) => {
    setEditingbookmark(bookmark)
    setShowForm(true)
  }

  const isPinned = [...filteredbooks].sort((a, b) => b.pinned - a.pinned)
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

  return (
    <div className = {darkmode ? "dark" :"white"}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} darkmode = {darkmode} setDarkmode = {setDarkmode} />
      <button
        onClick={() => {
          setEditingbookmark(null)
          setShowForm(!showForm)
        }}
      >
        Add Bookmark
      </button>
      {showForm && (
        <AddBookmark onAdd={handleAdd} editingbookmark={editingbookmark} />
      )}
      {currentview === 'home' && (
        <BookmarkCard
          bookmarks={isPinned}
          handlearchived={handlearchived}
          handlepinned={handlepinned}
          handleedit={handleedit}
        />
      )}
      {currentview === 'archived' && (
        <ArchivedView
          bookmarks={archivedBooks}
          handlearchived={handlearchived}
        />
      )}
      <Sidebar
        allTags={allTags}
        onhandleChange={handleChange}
        tags={tags}
        setTags={setTags}
        setCurrentviews={setCurrentviews}
      />
    </div>
  )
}

export default App;
