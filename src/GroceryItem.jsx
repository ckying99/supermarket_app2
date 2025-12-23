import { useState, useContext } from 'react';
import ErrorBoundary from './ErrorBoundary.jsx'
import { CartContext } from './main.jsx'
import { Link } from 'react-router-dom'
export default function GroceryItem({ id, image, name, price, description }) {
  const { cart, setInCart } = useContext(CartContext);
  function addItem() {
    let found = false;
    cart.map(cartItem => cartItem.id == id ? found = true : cartItem);

    if (found == false) {
      setInCart([...cart, {
        id: id,
        name: name,
        price: price,
        quantity: 1,
        image: image
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
    <div>
      <div className="h-full flex flex-col p-4 rounded-xl shadow">
        <figure>
          <img className="w-full h-48 object-contain bg-white rounded-lg"
            src={image}
            alt={name} />
        </figure>
        <div className="card-body">
          <Link to={`/product/${id}`}>
            <h2 className="font-semibold text-lg truncate">{name}</h2>
          </Link>
          <div className="collapse bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <div className="collapse-title font-semibold">Description</div>
            <div className="collapse-content text-sm">
              {description}
            </div>
          </div>

          <p>{price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={addItem}>Add To Cart</button>
          </div>
        </div>
      </div>


    </div>

  );
}
