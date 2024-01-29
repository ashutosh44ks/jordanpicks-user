import { useState, useEffect } from "react";
import api from "../../../components/utils/api";
import Table from "../../../components/common/Table";

const MyPackages = () => {
  const [myPackages, setMyPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMyPackages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/user/getMyPackages");
      console.log(data);
      setMyPackages(data.dta);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getMyPackages();
  }, []);

  return (
    <div>
      <Table
        tHead={["S.No.", "Package Name", "Price", "Bets", "Result"]}
        wrapperClass="my-8"
      >
        {myPackages.length > 0 ? (
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
              {loading ? "Loading..." : "No packages bought"}
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default MyPackages;
