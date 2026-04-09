const Sidebar = ({allTags,onhandleChange,tags,setTags,setCurrentviews}) => {


    return(
        <>
        <button onClick = {() => setCurrentviews("home")}>Home</button>
        <button onClick = {() => setCurrentviews("archived")}>Archived</button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {allTags.map((item) => (
                <li key={item}><input
                   type = "checkbox"
                   value = {item}
                   checked = {tags.includes(item)}
                   onChange = {onhandleChange}
                   
                
                />
                <label>{item}</label>
                
                    </li>
                        
            ))}
        </ul>
         <button onClick = {() => setTags([])}>Reset Filters</button>   

        </>
    )
}

export default Sidebar;
