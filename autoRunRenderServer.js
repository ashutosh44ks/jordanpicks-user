const fifteenminutes = 1000 * 60 * 15;

const callBackend = async () => {
  try {
    await fetch("https://jordanpicksapi.onrender.com/");
    console.log("success", new Date());
  } catch (error) {
    console.log(error);
  }
};

setInterval(() => {
  callBackend();
}, fifteenminutes);

console.log("hi");