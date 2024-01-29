import { useState, useEffect } from "react";
import api from "../../../components/utils/api";
import Table from "../../../components/common/Table";
import dateFormatter from "../../../components/utils/dateFormatter";

const Orders = () => {
  const [myTransactions, setMyTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const getTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/user/getTransactions");
      console.log(data);
      setMyTransactions(data.dta);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <Table
        tHead={["S.No.", "Package Name", "Date", "Type", "Price", "Method"]}
        wrapperClass="my-8"
      >
        {myTransactions.length > 0 ? (
          myTransactions.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td>{transaction?.package?.name || transaction.desc}</td>
              <td>{dateFormatter(transaction.createdAt)}</td>
              <td>{transaction.type}</td>
              <td>{transaction?.price?.toFixed(2)}</td>
              <td>{transaction.method}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="6">
              {loading ? "Loading..." : "No orders found"}
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default Orders;
