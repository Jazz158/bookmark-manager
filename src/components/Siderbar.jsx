const Sidebar = ({allTags,onhandleChange,tags}) => {


    return(
        <>
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

        </>
    )
}

export default Sidebar;
