import { useState, useRef, useEffect } from "react";
import api from "../../components/utils/api";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Stripe from "./components/Stripe";

const Store = () => {
  const [store, setStore] = useState([]);
  const getStore = async () => {
    try {
      const {data} = await api.get("/user/allStore?page=1");
      console.log(data)
      setStore(data.dta);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getStore();
  }, []);
  const dialogRef = useRef(null);
  const [openModal, setOpenModal] = useState({});

  return (
    <>
      <div>
        <h3 className="mb-4 sm:text-left text-center">Store</h3>
        <p className="sm:text-left text-center">
          Exchange your money for credits. Credits can be used to purchase
          packages on our platform.
        </p>
        <div className="my-8 flex flex-wrap gap-8">
          {store.map((p, i) => (
            <div key={i} className="p-6 my-4 rounded-lg bg-dark2">
              <h2 className="mb-4 text-center">{p.name}</h2>
              <div className="flex justify-center items-start mb-4">
                <h4 className="mt-1">$</h4>
                <h1 className="text-yellow">{p.price}</h1>
              </div>
              <hr className="my-6 mx-6 border-black" />
              <h5 className="my-4 font-normal text-center">
                You'll get {p.credits} web credit
              </h5>
              <Button
                theme="yellow"
                size="md-rect"
                className="w-full"
                onClick={() => {
                  setOpenModal(p);
                }}
              >
                Buy
              </Button>
            </div>
          ))}
        </div>
      </div>
      {openModal.price > 0 && (
        <Modal
          ref={dialogRef}
          title="Pay with Card"
          content={
            <Stripe
              webCredit={openModal.credits}
              cardDeduction={openModal.price}
            />
          }
          closeDialog={() => {
            dialogRef.current.closeDialog();
            setOpenModal({});
          }}
        />
      )}
    </>
  );
};

export default Store;
