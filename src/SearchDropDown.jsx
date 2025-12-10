import { useState } from 'react';
export default function SearchDropDown({ searchTerm, onSelect }) {
    const [query, setQuery] = useState('')
    const [focus, setFocus] = useState(false);
    function handleInputChange(e) {
        const value = e.target.value;
        setQuery(value);
    }

    function searchProducts(){

    }

    return (
        <div>
            <input type="text" onChange={handleInputChange} className="input" 
            placeholder="Seach Product...." list="products" onFocus={() => setFocus(true)} />
            {
                focus ? <div /> : null
            }
        </div>
    )
};