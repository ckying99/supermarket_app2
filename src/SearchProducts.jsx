import GroceryItem from './GroceryItem.jsx'
import Loading from './Loading.jsx';
import './App.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

export function SearchProducts() {
  const { query } = useParams();
  const [items, setItems] = useState(null);
  useEffect(() => {  
      fetch("https://dummyjson.com/products/search?q=" + query)
        .then((res) => res.json())
        .then((data) => {
          setItems(data.products);
        });

    },[query])

  return (
      items ? <>
        <div className="grid grid-cols-4 gap-4 items-stretch"> {
          items.map(item =>
            <div >
              <GroceryItem
                key={item.id} image={item.thumbnail}
                name={item.title} description={item.description} price={item.price} id={item.id}>
              </GroceryItem>
            </div>)
        }
        </div>


      </> : <Loading />
  )
}
