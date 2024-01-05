import React from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../../../components/common/Table";

const MyPackages = () => {
  const { user } = useOutletContext();
  return (
    <div>
      <h3>My Packages</h3>
      <Table
        tHead={["S.No.", "Package Name", "Result", "Bets"]}
        wrapperClass="my-8"
      >
        {user.package.length > 0 ? (
          user.package.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.result}</td>
              <td>
                <ul className="list-disc">
                  {p.bets.length > 0 &&
                    p.bets.map((b, index) => <li key={index}>{b}</li>)}
                  {p.bets.length > 0 &&
                    p.bets.map((b, index) => <li key={index}>{b}</li>)}
                </ul>
              </td>
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
