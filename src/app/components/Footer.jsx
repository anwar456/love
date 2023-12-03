import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="footer text-center">
        <footer>copyright &copy; You❤️Me {currentYear}</footer>
      </div>
    </>
  );
}
