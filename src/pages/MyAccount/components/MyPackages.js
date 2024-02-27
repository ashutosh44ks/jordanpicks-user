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

  const updateResultTerminalogy = (result) => {
    switch (result) {
      case "win":
        return "profitiable";
      case "lose":
        return "unprofitable";
      case "tie":
        return "break even";
      case undefined:
        return "-";
      default:
        return result;
    }
  };

  return (
    <div>
      <Table
        tHead={["S.No.", "Package Name", "Bets/Links", "Result"]}
        wrapperClass="my-8"
      >
        {!loading ? (
          myPackages.map((p, index) => (
            <tr key={p._id}>
              <td className="border-b-2 border-dark">{index + 1}</td>
              <td className="border-b-2 border-dark">{p.name}</td>
              <td className="border-b-2 border-dark">
                <ul className="list-disc">
                  {p.bets !== undefined &&
                    p.bets.length > 0 &&
                    p.bets.map((b, index) => <li key={index}>{b}</li>)}
                  {p.links !== undefined &&
                    p.links.length > 0 &&
                    p.links.map((l, index) => (
                      <li key={index}>
                        <a href={l} rel="noreferrer" target="_blank">
                          {l}
                        </a>
                      </li>
                    ))}
                </ul>
              </td>
              <td className="capitalize border-b-2 border-dark">
                {updateResultTerminalogy(p.result)}
              </td>
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
