import { useContext } from 'react';
import { CartContext } from './main.jsx'


export default function Drawer() {
  const { cart, setInCart } = useContext(CartContext);
  function increase(id) {
    setInCart(cart.map(item => item.id == id ? {
      ...item,
      quantity: item.quantity + 1
    } : item));

  }

  function decrease(id) {
    let newCart = [];
    newCart = cart.map(item => {
      if (item.id == id) {
        if (item.quantity == 0) {
          newCart = cart.filter(item => item.id != id);
        }
        else {
          //  when item.quantity > 0 then decrease quantity 
          return {
            ...item,
            quantity: item.quantity - 1

          }
        }
      }
      else {
        return item;
      }
    }

    )
    setInCart(newCart);
  }

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="drawer-button btn btn-primary">Open Cart</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 min-h-full w-80 p-4">

          <br></br>
          <div >
            {
              cart.map(item =>
                <div className="row-span-1">
                  <li className="grid grid-cols-8 gap-4" key={item.id}>
                  <div className="col-span-3">
                    <img src={item.image}  />
                  </div>
                  <span className="col-span-2">{item.name}</span>

                  <Button buttonName="-" buttonFunction={() => decrease(item.id)}>
                  </Button> 
                  <span>{item.quantity}</span>

                  <Button buttonName="+" buttonFunction={() => increase(item.id)}
                  ></Button>

                </li>
                </div>
                )
            }
          </div>
        </ul>
      </div>
    </div>
  );
}

function Button({ buttonName, buttonFunction }) {
  return (
    <button className="btn" onClick={buttonFunction}>{buttonName}</button>
  )

}