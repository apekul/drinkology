import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#2E2E2E] text-white py-5">
      <div className="Container  flex flex-col  md:flex-row items-center justify-between text-sm">
        <p>Copyright © 2023. All rights are reserved</p>
        <p>
          Coded by{" "}
          <a
            target="_blank"
            href="https://github.com/apekul"
            className="font-bold"
            rel="noreferrer"
          >
            apekul
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
