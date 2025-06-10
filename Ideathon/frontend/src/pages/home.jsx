import React from "react";
import SecurityScanner from "../components/securityscanner";
import "../styles/component.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Secure Your Web Presence</h1>
        <p>
          Our state-of-the-art Website Security Scanner helps you identify vulnerabilities
          and secure your website with ease.
        </p>
      </section>
      <SecurityScanner/>
    </div>
  );
};

export default Home;
