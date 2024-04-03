import { useState, useEffect } from "react";
import { useUserContext } from "../../../components/utils/useUserContext";
import api from "../../../components/utils/api";
import Table from "../../../components/common/Table";
import dateFormatter from "../../../components/utils/dateFormatter";
import Pagination from "../../../components/common/Pagination";
import myToast from "../../../components/utils/myToast";
import Button from "../../../components/common/Button";

const Orders = () => {
  const { getProfileShort } = useUserContext();

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
  const [myRecurringTransactions, setMyRecurringTransactions] = useState([]);
  const getRecurringTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/getRecurringTransactions`);
      console.log(data);
      setMyRecurringTransactions(data.dta);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTransactions();
    getRecurringTransactions();
  }, [page]);

  const appendItems = (desc, cartLength) => {
    if (cartLength > 0) return "Cart - " + cartLength + " items";
    return desc;
  };

  const decorateType = (transaction) => {
    if (transaction.type === "Credit")
      if (
        transaction?.package ||
        transaction?.vslPackage?.name ||
        transaction?.specialPackage?.name
      )
        return "Wallet Refund";
    return transaction.type;
  };

  const cancelRecurrence = async (id) => {
    try {
      const { data } = await api.delete(
        `/user/cancelRecurringOrderAuthorize/${id}`
      );
      console.log(data);
      myToast(data.msg, "success");
      getProfileShort();
      getRecurringTransactions();
    } catch (error) {
      console.log(error);
      myToast(error?.response?.data?.message, "failure");
    }
  };

  return (
    <div>
      <div>
        <h4>Standard Transactions</h4>
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
                    appendItems(transaction.desc, transaction.cart.length)}
                </td>
                <td className="border-b-2 border-dark">
                  {dateFormatter(transaction.createdAt)}
                </td>
                <td className="border-b-2 border-dark">
                  {decorateType(transaction)}
                </td>
                <td className="border-b-2 border-dark">
                  {transaction?.price?.toFixed(2)}
                </td>
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
      <div className="mt-6">
        <h4>Subscription Transactions</h4>
        <Table
          tHead={["S.No.", "Package Name", "Date", "Price", "Status", "Action"]}
          wrapperClass="my-8"
        >
          {!loading ? (
            myRecurringTransactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td className="border-b-2 border-dark">{index + 1}</td>
                <td className="border-b-2 border-dark">
                  {transaction?.specialPackage?.name}
                </td>
                <td className="border-b-2 border-dark">
                  {dateFormatter(transaction.createdAt)}
                </td>
                <td className="border-b-2 border-dark">
                  ${transaction?.price?.toFixed(2)}/
                  {decorateType(transaction).split("ly")[0]}
                </td>
                <td className="border-b-2 border-dark capitalize">
                  {transaction.status}
                </td>
                <td className="border-b-2 border-dark">
                  {transaction.status === "active" && (
                    <Button
                      theme="yellow"
                      size="sm"
                      onClick={() => cancelRecurrence(transaction._id)}
                    >
                      Cancel subscription
                    </Button>
                  )}
                </td>
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
      </div>
    </div>
  );
};

export default Orders;
