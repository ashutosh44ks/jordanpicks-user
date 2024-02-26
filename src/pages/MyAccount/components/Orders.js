import { useState, useEffect } from "react";
import api from "../../../components/utils/api";
import Table from "../../../components/common/Table";
import dateFormatter from "../../../components/utils/dateFormatter";
import Pagination from "../../../components/common/Pagination";

const Orders = () => {
  const [myTransactions, setMyTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const getTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/getTransactions?page=${page}`);
      console.log(data);
      setMyTransactions(data.dta);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTransactions();
  }, [page]);

  return (
    <div>
      <Table
        tHead={["S.No.", "Package Name", "Date", "Type", "Price", "Method"]}
        wrapperClass="my-8"
      >
        {!loading ? (
          myTransactions.map((transaction, index) => (
            <tr key={transaction._id}>
              <td className="border-b-2 border-dark">{index + 1}</td>
              <td className="border-b-2 border-dark">
                {transaction?.package?.name ||
                  transaction?.store?.name ||
                  transaction?.vslPackage?.name ||
                  transaction?.specialPackage?.name ||
                  transaction.desc}
              </td>
              <td className="border-b-2 border-dark">{dateFormatter(transaction.createdAt)}</td>
              <td className="border-b-2 border-dark">{transaction.type}</td>
              <td className="border-b-2 border-dark">{transaction?.price?.toFixed(2)}</td>
              <td className="border-b-2 border-dark">{transaction.method}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="6">
              Loading...
            </td>
          </tr>
        )}
      </Table>
      <Pagination lastPage={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default Orders;
