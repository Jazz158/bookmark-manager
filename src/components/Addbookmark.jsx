import { useEffect, useState } from 'react'

const AddBookmark = ({ onAdd,editingbookmark }) => {
  const [form, setForm] = useState({ title: "", description: "", url: "", tags: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })



  }


  useEffect(() => {
    if (editingbookmark) {
      setForm({
        title: editingbookmark.title,
        description: editingbookmark.description,
        url: editingbookmark.url,
        tags: editingbookmark.tags.join(", "),
      });
      return
    }

    setForm({ title: "", description: "", url: "", tags: "" })
  }, [editingbookmark]);

  const handleSubmit = (e) => {


    e.preventDefault()
  

    onAdd(form)
    setForm({ title: "", description: "", url: "", tags: "" })
  }

  return (
    <form className="add-bookmark-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="url" placeholder="URL" value={form.url} onChange={handleChange} />
      <input name="tags" placeholder="Tags" value={form.tags} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  )
}

export default AddBookmark;
