import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductPage } from './ProductPage.jsx'
import { useState, useEffect, createContext } from 'react'
import { Navbar } from './Navbar.jsx';
import './index.css'
import { App } from './App.jsx'
import { Link } from 'react-router-dom'
import Category from './Category.jsx';

export const CartContext = createContext(null)
export const DisplayItemsContext = createContext(null)
export const SelectedCatContext = createContext(null)
function Layout() {
  const [items, setItems] = useState([]);
  const [cart, setInCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data =>
        setCategories(data)
      )

  }, [])
  const showCategories = categories.map(category => {
    return (
      category.name == selected ? <Link to={`/home/${category.slug}`}>
        <li className="menu-active" key={category.slug}>
          <Category categoryName={category.name} />
        </li>
      </Link> :
        <Link to={`/home/${category.slug}`}>
          <li key={category.slug}>
            <Category categoryName={category.name} />
          </li>
        </Link>
    )
  }
  )
  return (
    <CartContext.Provider value={{ cart, setInCart }}>
      <DisplayItemsContext.Provider value={{ items, setItems }}>
        {/* <div className="flex"> */}
          <ul className="menu bg-base-200 w-56">
            <SelectedCatContext.Provider value={{ selected, setSelected }}>
              <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn m-1">Shop for... ⬇️</div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">

                  {showCategories}
                  
                </ul>

              </div>
            </SelectedCatContext.Provider>
          </ul>
          <div className="flex-1">

            <Navbar />
            <Routes>
              <Route path="/home" element={<App />} />
              <Route path="/home/:category" element={<App />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
        {/* </div> */}

      </DisplayItemsContext.Provider>
    </CartContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>,
)

