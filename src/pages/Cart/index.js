import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/utils/useUserContext";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Stripe from "./components/Stripe";
import { MdClose } from "react-icons/md";

const Cart = () => {
  const navigate = useNavigate();
  const { loggedUser } = useUserContext();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCart = async () => {
    try {
      const { data } = await api.get("/user/getCart");
      // const { data } = await api.get("/user/allPackage");
      console.log(data);
      // setCart(data.dta);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCart();
  }, []);

  const removeFromCart = async (packageId) => {
    try {
      const { data } = await api.delete(`/user/removeItemFromCart/${packageId}`);
      console.log(data);
      getCart();
      myToast(data.msg, "success");
    } catch (error) {
      console.log(error);
      myToast(error?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await api.get("/user/clearCart");
      console.log(data);
      getCart();
      myToast(data.msg, "success");
    } catch (error) {
      console.log(error);
      myToast(error?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const dialogRef = useRef(null);

  if (loading) return null;

  if (cart.length === 0)
    return (
      <div>
        <h3 className="font-medium">My Cart</h3>
        <p className="mt-4 text-lightgrey">
          Your cart is empty. Add multiple standard packages to your cart and
          pay for them all at once.
        </p>
        <Button
          theme="yellow"
          className="mt-4"
          size="md-rect"
          onClick={() => {
            navigate("/");
          }}
        >
          View Standard Packages
        </Button>
      </div>
    );

  return (
    <>
      <div>
        <h3 className="font-medium">My Cart</h3>
        <div>
          {cart.map((item) => (
            <div key={item._id} className="my-4 bg-dark rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-yellow text-lg">{item.name}</span>
                <span className="text-2xl hover:text-yellow">
                  <MdClose
                    className="cursor-pointer"
                    onClick={() => removeFromCart(item._id)}
                  />
                </span>
              </div>
              <p>{item.gamePreview}</p>
              <div>
                ${item.price} | {item.sports} - {item.category}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          {loggedUser.wallet > 0 && (
            <p className="mb-2">
              You'll be using your wallet balance of $
              {loggedUser.wallet.toFixed(2)}
            </p>
          )}
          <div className="flex gap-4 justify-between sm:items-center sm:flex-row flex-col">
            <div>
              <div className="flex gap-2 sm:justify-normal justify-between">
                <div className="w-40">Total:</div>
                <div>${cart.reduce((acc, item) => acc + item.price, 0)}</div>
              </div>
              {loggedUser.defaultDiscount > 0 && (
                <>
                  <div className="flex gap-3 sm:justify-normal justify-between">
                    <div className="w-36">Premium Discount:</div>
                    <div>
                      - $
                      {(cart.reduce((acc, item) => acc + item.price, 0) *
                        loggedUser.defaultDiscount) /
                        100}
                    </div>
                  </div>
                  <div className="flex gap-2 md:justify-normal justify-between text-yellow">
                    <div className="w-40">Grand Total:</div>
                    <div>
                      $
                      {cart.reduce((acc, item) => acc + item.price, 0) -
                        (cart.reduce((acc, item) => acc + item.price, 0) *
                          loggedUser.defaultDiscount) /
                          100}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-4 sm:flex-row flex-col">
              <Button
                theme="lightgrey"
                className="font-semibold"
                size="md-rect"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button
                theme="yellow"
                className=""
                size="md-rect"
                onClick={() => {
                  dialogRef.current.showModal();
                }}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        ref={dialogRef}
        title="Pay with Card"
        content={<Stripe />}
        closeDialog={() => {}}
      />
    </>
  );
};

export default Cart;
