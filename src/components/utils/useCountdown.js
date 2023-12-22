import { useState, useEffect } from "react";
import dateFormatter from "./dateFormatter";

export const useCountdown = (endDate) => {
  const [timeStamp, setTimeStamp] = useState(0);
  useEffect(() => {
    if (endDate) {
    //   console.log(
    //     "end",
    //     new Date(endDate),
    //     dateFormatter(endDate)
    //   );
    //   console.log("curr", new Date(), dateFormatter(new Date()));
      const diffTimeStamp = +new Date(endDate) - +new Date();
      setTimeStamp(diffTimeStamp);
    }
  }, [endDate]);

  const [diffTimeData, setDiffTimeData] = useState({
    diffDay: 0,
    diffHour: 0,
    diffMin: 0,
    diffSec: 0,
  });
  const getTimer = (timeStamp) => {
    const diffDay = Math.floor(
      (timeStamp % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const diffHour = Math.floor(
      (timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffMin = Math.floor((timeStamp % (1000 * 60 * 60)) / (1000 * 60));
    const diffSec = Math.floor((timeStamp % (1000 * 60)) / 1000);
    return { diffDay, diffHour, diffMin, diffSec };
  };
  useEffect(() => {
    if(!timeStamp) return;
    const timer = setInterval(() => {
      setDiffTimeData(getTimer(timeStamp - 1000));
      setTimeStamp(timeStamp - 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeStamp]);

  return { diffTimeData };
};
