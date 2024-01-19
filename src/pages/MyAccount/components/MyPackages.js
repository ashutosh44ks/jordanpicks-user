import React from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../../../components/common/Table";

const MyPackages = () => {
  const { userData } = useOutletContext();
  const user = userData?.user;
  return (
    <div>
      <Table
        tHead={["S.No.", "Package Name", "Date", "Price", "Bets", "Result"]}
        wrapperClass="my-8"
      >
        {user?.package?.length > 0 ? (
          user?.package?.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>date of buy</td>
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
              No packages bought
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default MyPackages;
