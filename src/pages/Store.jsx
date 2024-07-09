import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import Order from "../components/Order";

function Store() {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="">
      <h2 className="font-semibold text-xl mb-5 mt-5 pb-5">Shopping Cart</h2>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-10 lg:gap-40">
        {cart.totalItems <= 0 && <h1 className="text-2xl">No recipies yet</h1>}
        <ul>
          {cart.items.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </ul>
        <div>
          <Order />
        </div>
      </div>
    </div>
  );
}

export default Store;
