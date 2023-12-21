import React from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../../../components/common/Table";

const Orders = () => {
  const { user } = useOutletContext();
  return (
    <div>
      <h3>Order History</h3>
      <Table
        tHead={["S.No.", "Package Name", "Date", "Result"]}
        wrapperClass="my-8"
      >
        {user.orderHistory.length > 0 ? (
          user.orderHistory.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.package.name}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="4">
              No orders found
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default Orders;
