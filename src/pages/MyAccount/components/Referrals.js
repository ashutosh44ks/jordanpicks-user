import { useState, useEffect } from "react";
import api from "../../../components/utils/api";
import dateFormatter from "../../../components/utils/dateFormatter";
import Table from "../../../components/common/Table";
import Button from "../../../components/common/Button";
import { TbClipboardCheck, TbClipboard } from "react-icons/tb";

const Referrals = () => {
  const [referredUsers, setReferredUsers] = useState([]);
  const [referralCode, setReferralCode] = useState("DUMMY_CODE");
  const [loading, setLoading] = useState(true);
  const getReferredUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/user/getReferredUsers");
      console.log(data);
      setReferredUsers(data.dta);
      setReferralCode(data.referralCode);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getReferredUsers();
  }, []);

  const [isCopied, setIsCopied] = useState(false);

  return (
    <div>
      <div className="mb-10 flex justify-center items-center flex-col border border-pink rounded-lg p-4 md:p-6">
        <h3 className="mb-4 font-medium">Our Referral Program</h3>
        <p className="text-center">
          We value our community and want to reward you for bringing your
          friends into our network. For each friend you refer, we will credit
          your account with an additional $25. Furthermore, for every dollar
          your referral spends, we will add a $0.25 credit to your wallet. This
          is our way of saying thank you for helping us grow.
        </p>
        <Button
          theme="pink"
          className="mt-4 flex items-center gap-2"
          size="md-rect"
          onClick={() => {
            navigator.clipboard.writeText(referralCode);
            setIsCopied(true);
            alert("Referral code copied to clipboard");
            setTimeout(() => {
              setIsCopied(false);
            }, 2000);
          }}
        >
          {isCopied ? <TbClipboardCheck /> : <TbClipboard />}
          <span>Copy Referral Code: {referralCode}</span>
        </Button>
      </div>
      <Table tHead={["S.No.", "Name", "Created At"]} wrapperClass="my-8">
        {referredUsers && referredUsers.length > 0 ? (
          referredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{dateFormatter(user.createdAt)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="3">
              {loading ? "Loading..." : "No referred users found"}
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default Referrals;
