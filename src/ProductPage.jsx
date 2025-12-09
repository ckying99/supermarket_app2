import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import Loading from './Loading.jsx'
import { CartContext } from './main.jsx'

export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch("https://dummyjson.com/products/" + id)
      .then(res => res.json())
      .then(data =>
        setProduct(data)
      )

  }, [])
    const { cart, setInCart } = useContext(CartContext);
    function addItem() {
      let found = false;
      cart.map(cartItem => cartItem.id == id ? found = true : cartItem);
  
      if (found == false) {
        setInCart([...cart, {
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: 1,
          image: product.thumbnail
        }])
      }
      else if (found == true) {
        setInCart(cart.map(cartItem => cartItem.id == id ? {
          ...cartItem,
          quantity: cartItem.quantity + 1
        } : cartItem))
      }
  
  
    }

  return (
    product ?
      <div className="p-6 max-w-3xl mx-auto">
        <img src={product.thumbnail} className="w-full h-96 object-contain" />
        <h1 className="mt-4 text-2xl font-bold">{product.title}</h1>
        <p className="mt-2 text-gray-700">{product.description}</p>
        <div className="mt-4 text-xl font-bold">RM {product.price}</div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={addItem}>Add To Cart</button>
        </div>
      </div> : <Loading />

  );
}
