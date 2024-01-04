import React from "react";

const Steps = ({ page }) => {
  if (page === 1)
    return (
      <div>
        <div className="mb-8">
          <h3 className="text-center mb-2">Step 1</h3>
          <h4 className="text-center">
            Find the package that suits your preferences and budget.
          </h4>
        </div>
      </div>
    );
  if (page === 2)
    return (
      <div>
        <div className="mb-8">
          <h3 className="text-center mb-2">Step 2</h3>
          <h4 className="text-center">
            Purchase the package and get instant access to the picks.
          </h4>
        </div>
      </div>
    );
  if (page === 3)
    return (
      <div>
        <div className="mb-8">
          <h3 className="text-center mb-2">Step 3</h3>
          <h4 className="text-center">
            If you don’t win, we’ll refund you with a website credit. No strings
            attached.
          </h4>
        </div>
      </div>
    );
};

export default Steps;
