import React from "react";
import "./App.css";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Search from "./Components/Search";

function App() {
  return (
    <section className="min-h-[100vh] flex flex-col bg-[#EBEBEB]">
      <div className="flex-1">
        <Hero />
        <Search />
      </div>
      <Footer />
    </section>
  );
}

export default App;
