// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../components/utils/api";
// import myToast from "../../components/utils/myToast";
// import Button from "../../components/common/Button";

// const AddReward = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const getBonus = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get("/user/getBonus");
//       console.log(data);
//       myToast(data.msg, "success");
//     } catch (error) {
//       console.log(error);
//       myToast(
//         error?.response?.data?.error || "Something went wrong",
//         "failure"
//       );
//     }
//     setLoading(false);
//   };
//   useEffect(() => {
//     getBonus();
//   }, []);

//   return (
//     <div>
//       <h2 className="mb-8">Congratulations!</h2>
//       <p>
//         You've earned a bonus of $25 on your{" "}
//         <span className="font-medium text-blue">JordansPicks</span> wallet
//       </p>
//       <p>Use this bonus to buy more packages and win more.</p>
//       <div className="my-8">
//         {loading ? (
//           <Button theme="pink" rounded="none" disabled>
//             Adding bonus...
//           </Button>
//         ) : (
//           <Button
//             theme="pink"
//             rounded="none"
//             onClick={() => navigate("/packages")}
//           >
//             View our packages
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddReward;
