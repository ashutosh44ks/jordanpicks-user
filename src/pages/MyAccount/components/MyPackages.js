import { useState, useEffect } from "react";
import { useWindowWidth } from "../../../components/utils/useWindowWidth";
import api from "../../../components/utils/api";
import Table from "../../../components/common/Table";
import Pagination from "../../../components/common/Pagination";
import { PiLinkSimple } from "react-icons/pi";
import { MdOutlineArrowRight } from "react-icons/md";

const RenderMyPackagesData = ({ myPackages, loading }) => {
  const width = useWindowWidth();
  const updateResultTerminalogy = (result) => {
    switch (result) {
      case "win":
        return "profitiable";
      case "lose":
        return "unprofitable";
      case "tie":
        return "break even";
      default:
        return result;
    }
  };

  if (width > 768)
    return (
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
                {p.result ? (
                  <span>
                    {updateResultTerminalogy(p.result)}
                  </span>
                ) : (
                  <span className="text-sm">
                    {p.discount}% discount
                  </span>
                )}
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
    );

  return myPackages.map((p, index) => (
    <div className="bg-dark p-4 my-4 rounded-lg">
      <div className="flex justify-between items-center mb-2 flex-col xs:flex-row gap-x-4 gap-y-1">
        <h4 className="text-yellow">{p.name}</h4>
        {p.result ? (
          <span className="uppercase tracking-wider text-sm">
            {updateResultTerminalogy(p.result)}
          </span>
        ) : (
          <span className="uppercase tracking-wider text-sm">
            {p.discount}% DISCOUNT
          </span>
        )}
      </div>
      <div className="flex items-center flex-col xs:items-start">
        {p.bets !== undefined &&
          p.bets.length > 0 &&
          p.bets.map((b, index) => (
            <p key={index} className="flex items-center gap-2">
              <MdOutlineArrowRight />
              {b}
            </p>
          ))}
        {p.links !== undefined &&
          p.links.length > 0 &&
          p.links.map((l) => (
            <a
              className="flex items-center gap-2"
              href={l}
              key={index}
              rel="noreferrer"
              target="_blank"
            >
              <PiLinkSimple />
              {l}
            </a>
          ))}
      </div>
    </div>
  ));
};

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
      <RenderMyPackagesData myPackages={myPackages} loading={loading} />
      <Pagination lastPage={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default MyPackages;
