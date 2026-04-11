const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <input
        type="name"
        placeholder=" Search by title "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      

    </>

  )
}

export default Header


