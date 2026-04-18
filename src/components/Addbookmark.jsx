import { useEffect, useState } from 'react'

const AddBookmark = ({ onAdd, editingbookmark }) => {
  const [form, setForm] = useState({ title: "", description: "", url: "", tags: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })



  }
  const suggestTags = async () => {
    if (!form.title && !form.description) {
      alert('Please fill in title and description first')
      return
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: `Suggest 3-5 relevant tags for this bookmark. Return only a comma separated list of tags, nothing else. Title: ${form.title} Description: ${form.description}`
          }
        ]
      })
    })
    const data = await response.json()
    const suggestedTags = data.choices[0].message.content

    setForm({ ...form, tags: suggestedTags })


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
      <button type="button" onClick={suggestTags}>Suggest Tags</button>
      <button type="submit">Save</button>

    </form>
  )
}

export default AddBookmark;
