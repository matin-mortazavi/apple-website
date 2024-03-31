import React from "react";
import { appleImg, searchImg } from "@/utils";
import { bagImg } from "../../utils";
import { navLists } from "../../constants";
const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="apple image" width={14} height={18} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((navItem, i) => (
            <div
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
              key={i}
            >
              {navItem}
            </div>
          ))}
        </div>
        <div className="flex gap-7 max-sm:justify-end max-sm:flex-1 items-baseline">
          <img src={searchImg} alt="search image" width={18} height={18} />
          <img src={bagImg} alt="bag image" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
