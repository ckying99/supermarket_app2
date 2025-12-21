import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'

export default function SearchDropDown({ searchTerm, onSelect }) {
    const [query, setQuery] = useState('')
    const [focus, setFocus] = useState(false);
    const [suggestions, setSuggestions] = useState([])

    // ensure the callback sees the latest `query` by listing it as a dependency
    useEffect(
        () => {
            const q = encodeURIComponent(query || '');
            fetch("https://dummyjson.com/products/search?q=" + q + "&limit=5")
                .then(res => res.json())
                .then(data => setSuggestions(data.products || []))
                .catch(() => setSuggestions([]))
        }, [query]

    )

    console.log('query:', query);

    return (
        <div >
            <ul className="flex list-none">
                <li>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="input"
                        placeholder="Search Product..."
                        list="products"
                        onFocus={() => setFocus(true)}
                        // delay hiding so clicks on Links register before the list disappears
                        onBlur={() => setTimeout(() => setFocus(false), 150)}
                    />

                    {focus && suggestions && suggestions.length > 0 && (
                        <ul>
                            {suggestions.map((item) => (
                                <li key={item.id}>
                                    <Link to={`/product/${item.id}`} className="block px-2 py-1">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
                <li>
                    <button
                        onClick={() => {
                            // make sure dropdown is visible after clicking
                            setFocus(true);
                            // loadSuggestions();
                        }}
                        className="btn"
                    >
                        Search
                    </button>
                </li>
            </ul>
        </div>
    )
};