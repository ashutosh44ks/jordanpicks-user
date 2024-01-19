import React from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../../../components/common/Table";
import dateFormatter from "../../../components/utils/dateFormatter";

const Orders = () => {
  const { userData } = useOutletContext();
  const user = userData?.user;
  return (
    <div>
      <Table
        tHead={["S.No.", "Package Name", "Date", "Type", "Price", "Method"]}
        wrapperClass="my-8"
      >
        {user?.orderHistory?.length > 0 ? (
          user?.orderHistory?.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.desc}</td>
              <td>{dateFormatter(order.createdAt)}</td>
              <td>Debit/Credit</td>
              <td>{order?.price?.toFixed(2)}</td>
              <td>Card/Wallet</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="5">
              No orders found
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default Orders;
