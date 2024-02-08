import React from "react";

const ProfitGuarantee = () => {
  return (
    <>
      <ol className="list-decimal ml-5">
        <li className="my-2">
          Profit Guaranteed Picks are a way to get your money back if you lose.
          You buy a package of picks and bet on each one separately. These are
          not bets that combine multiple picks.
        </li>
        <li className="my-2">
          If your package does not make money, you will get a credit for the
          same amount you paid. The credit will show up in your account
          automatically after we check the results of the picks
        </li>
        <li className="my-2">
          To use your credit, just log in to your account and choose what you
          want to buy. Your credits will not expire, so you can use them
          anytime.
        </li>
        <li className="my-2">
          Please wait for 24 hours after a game for us to give you the credit.
        </li>
      </ol>
      <p className="my-4">
        YOU CAN USE YOUR CREDIT TO BUY ANYTHING ELSE ON{" "}
        <a href="https://www.jordanspicks.com" className="text-yellow font-medium">
          JORDANS PICKS
        </a>
      </p>
      <p>
        <span className="font-semibold">For Example:</span> If you buy a package
        for $14.99 and it does not make money, you will get a $14.99 credit in
        your account. You can use that credit to buy something else later.
      </p>
    </>
  );
};

export default ProfitGuarantee;
