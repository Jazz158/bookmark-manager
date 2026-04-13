const Header = ({ searchQuery, setSearchQuery,darkmode,setDarkmode }) => {
  return (
    <>
      <input
        type="name"
        placeholder=" Search by title "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button onClick = {() => setDarkmode(!darkmode)}>Dark Mode</button>
      

    </>

  )
}

export default Header


