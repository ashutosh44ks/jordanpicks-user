import React from "react";

const PackageMenu = ({ sports, activeSportsIndex, setActiveSportsIndex }) => {
  return (
    <div className="border border-yellow rounded-lg flex items-center xs:flex-row flex-col">
      {sports.map((sport, index) => (
        <>
          <div
            className={`py-2 px-6 text-center w-full xs:w-auto ${
              activeSportsIndex === index
                ? "bg-yellow text-darkblack font-medium"
                : "cursor-pointer hover:bg-dark"
            } ${
              index === 0 ? "rounded-l-lg xs:rounded-r-none rounded-r-lg" : ""
            } ${
              index === sports.length - 1
                ? "rounded-r-lg xs:rounded-l-none rounded-l-lg"
                : ""
            }`}
            onClick={() => setActiveSportsIndex(index)}
            key={sport}
          >
            {sport}
          </div>
          {index !== sports.length - 1 && (
            <div
              key={sport + "divider"}
              className={
                (activeSportsIndex === index || activeSportsIndex === index + 1
                  ? `invisible`
                  : `text-white`) + " hidden xs:block"
              }
            >
              |
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default PackageMenu;
