import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/utils/useUserContext";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import dateFormatter from "../../components/utils/dateFormatter";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Stripe from "./components/Stripe";
import { MdClose } from "react-icons/md";

const Cart = () => {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser, getProfileShort } = useUserContext();

  const [cart, setCart] = useState([]);
  const [expiredItemCount, setExpiredItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const getCart = async () => {
    try {
      const { data } = await api.get("/user/getCart");
      console.log(data);
      const temp = data.dta.filter(
        (item) =>
          +new Date(item.endDate) >= +new Date() && item.status === "active"
      );
      setCart(data.dta);
      setExpiredItemCount(data.dta.length - temp.length);
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
      const { data } = await api.patch("/user/removeItemFromCart", {
        packageId,
      });
      console.log(data);
      getCart();
      const temp = { ...loggedUser };
      temp.cart = temp.cart.filter((item) => item !== packageId);
      setLoggedUser(temp);
      myToast(data.msg, "success");
    } catch (error) {
      console.log(error);
      myToast(
        error?.response?.data?.error || "Something went wrong",
        "failure"
      );
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await api.delete("/user/clearCart");
      console.log(data);
      setCart([]);
      const temp = { ...loggedUser };
      temp.cart = [];
      setLoggedUser(temp);
      myToast(data.msg, "success");
    } catch (error) {
      console.log(error);
      myToast(
        error?.response?.data?.error || "Something went wrong",
        "failure"
      );
    }
  };

  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const handleTotals = () => {
    setTotal(cart.reduce((acc, item) => acc + item.price, 0));
    setGrandTotal(
      cart.reduce((acc, item) => acc + item.price, 0) -
        (cart.reduce((acc, item) => acc + item.price, 0) *
          loggedUser.defaultDiscount) /
          100
    );
  };
  useEffect(() => {
    handleTotals();
  }, [cart]);

  const [cardDeduction, setCardDeduction] = useState(0);
  const [walletDeduction, setWalletDeduction] = useState(0);
  useEffect(() => {
    if (
      loggedUser.wallet !== undefined &&
      loggedUser.defaultDiscount !== undefined
    ) {
      if (loggedUser.wallet < grandTotal) {
        setCardDeduction(grandTotal - loggedUser.wallet);
        setWalletDeduction(loggedUser.wallet);
      }
    }
  }, [loggedUser.wallet, loggedUser.defaultDiscount, grandTotal]);

  const [paymentRoute, setPaymentRoute] = useState("");
  const [walletLoading, setWalletLoading] = useState(false);
  const payWithWallet = async () => {
    setWalletLoading(true);
    try {
      const { data } = await api.post("/user/walletWithdrawCart", {
        amount: grandTotal,
      });
      console.log(data);
      getProfileShort();
      navigate("/my-account/transactions");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setWalletLoading(false);
  };
  const dialogRef = useRef(null);
  useEffect(() => {
    if (paymentRoute === "wallet" || paymentRoute === "stripe")
      dialogRef.current.showModal();
  }, [paymentRoute]);

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
        <p className="my-2">
          {expiredItemCount > 0 && (
            <span className="text-red">
              {expiredItemCount} package{expiredItemCount > 1 ? "s" : ""} in
              your cart has expired. Please remove them to continue.
            </span>
          )}
        </p>
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
              {+new Date(item.endDate) >= +new Date() &&
              item.status === "active" ? (
                <div>Expires on {dateFormatter(item.endDate)}</div>
              ) : (
                <div>Expired</div>
              )}
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
                <div>${total}</div>
              </div>
              {loggedUser.defaultDiscount > 0 && (
                <>
                  <div className="flex gap-3 sm:justify-normal justify-between">
                    <div className="w-36">Premium Discount:</div>
                    <div>- ${(total * loggedUser.defaultDiscount) / 100}</div>
                  </div>
                  <div className="flex gap-2 md:justify-normal justify-between text-yellow">
                    <div className="w-40">Grand Total:</div>
                    <div>
                      ${total - (total * loggedUser.defaultDiscount) / 100}
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
                  // check for any expired packages
                  if (expiredItemCount > 0)
                    return myToast(
                      "Please remove expired items from your count",
                      "failure"
                    );
                  if (loggedUser.wallet >= grandTotal)
                    setPaymentRoute("wallet");
                  else setPaymentRoute("stripe");
                }}
              >
                {loggedUser.wallet >= grandTotal
                  ? "Pay Now with Wallet"
                  : "Pay Now with Card"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {paymentRoute === "stripe" && (
        <Modal
          ref={dialogRef}
          title="Pay with Card"
          content={
            <Stripe
              cardDeduction={cardDeduction}
              walletDeduction={walletDeduction}
            />
          }
          closeDialog={() => {
            setPaymentRoute("");
          }}
        />
      )}
      {paymentRoute === "wallet" && (
        <Modal
          ref={dialogRef}
          title="Confim Payment"
          content={
            <div>
              <p>Are you sure you want to pay with wallet?</p>
              <p>
                After payment, ${grandTotal} will be deducted from your wallet.
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  theme="yellow"
                  size="md"
                  className="w-full font-semibold"
                  rounded="md"
                  onClick={payWithWallet}
                  disabled={walletLoading}
                >
                  Confirm
                </Button>
              </div>
            </div>
          }
          closeDialog={() => {
            setPaymentRoute("");
          }}
        />
      )}
    </>
  );
};

export default Cart;
