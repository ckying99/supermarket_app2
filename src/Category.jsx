import { useEffect, useContext } from 'react'
import { DisplayItemsContext, SelectedCatContext } from './main.jsx'

export default function Category({ categoryName }) {  
    const { setSelected } = useContext(SelectedCatContext);
 
    return (
        <div onClick={() => setSelected(categoryName)}>
            {String(categoryName).charAt(0).toUpperCase()
                + String(categoryName).slice(1)}
        </div>
    )
}