import toast from "react-hot-toast";
import CartButton from "../components/CartButton";
import { deleteItemFromCart } from "../features/user/cart/cartSlice";
import { useDispatch } from "react-redux";
import { GoTrash } from "react-icons/go";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = confirm("Do you want to delete this cart?");
    if (confirmed) {
      dispatch(deleteItemFromCart(id));
      toast.success("Cart deleted succesfully");
    }
  };
  console.log(item);
  return (
    <div className="card card-side w-full flex justify-between bg-base-100 mb-5 shadow-xl items-center h-28 max-w-[650px] lg:ml-10  ">
      <figure>
        <img className="w-36 " src={item.image} alt="" />
      </figure>
      <div className="card-body">
        <p className="cart-title">{item.title}</p>
        <p>{item.cookingTime} minutes</p>
      </div>
      <div className="card-actions flex-col items-center  justify-center mt-4">
        <CartButton itemId={item.id} qty={item.quantity} />
        <button
          className="btn btn-error btn-sm  text-white "
          onClick={() => handleDelete(item.id)}>
          <GoTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
