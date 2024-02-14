import { useState, useEffect } from "react";
import api from "../../../components/utils/api";
import Table from "../../../components/common/Table";
import Pagination from "../../../components/common/Pagination";

const MyPackages = () => {
  const [myPackages, setMyPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const getMyPackages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/getMyPackages?page=${page}`);
      console.log(data);
      setMyPackages(data.dta);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getMyPackages();
  }, [page]);

  return (
    <div>
      <Table
        tHead={["S.No.", "Package Name", "Price", "Bets", "Result"]}
        wrapperClass="my-8"
      >
        {!loading ? (
          myPackages.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>
                <ul className="list-disc">
                  {p.bets.length > 0 &&
                    p.bets.map((b, index) => <li key={index}>{b}</li>)}
                </ul>
              </td>
              <td className="capitalize">{p.result}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="5">
              Loading...
            </td>
          </tr>
        )}
      </Table>
      <Pagination lastPage={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default MyPackages;
