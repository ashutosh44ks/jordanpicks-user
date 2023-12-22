import React from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../../../components/common/Table";
import dateFormatter from "../../../components/utils/dateFormatter";

const Orders = () => {
  const { user } = useOutletContext();
  console.log(user.orderHistory);
  return (
    <div>
      <h3>Order History</h3>
      <Table
        tHead={["S.No.", "Package Name", "Date", "Result", "Bets"]}
        wrapperClass="my-8"
      >
        {user.orderHistory.length > 0 ? (
          user.orderHistory.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.package.name}</td>
              <td>{dateFormatter(order.createdAt)}</td>
              <td>{order.package.result}</td>
              <td>
                <ul className="list-disc">
                  {order.package.bets.map((b, index) => (
                    <li key={index}>{b}</li>
                  ))}
                </ul>
              </td>
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
