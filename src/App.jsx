import GroceryItem from './GroceryItem.jsx'
import Loading from './Loading.jsx';
import './App.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

export function App() {
  const { category } = useParams();
  const [items, setItems] = useState(null);
  const loadItems =
    async () => {
      const response = await fetch("https://dummyjson.com/products/category/" + category+"?limit=0");
      const data = await response.json();
      setItems(data.products)
    }

  useEffect(() => {
    loadItems();
  }, [category])
  
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
