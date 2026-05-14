import React from "react";

function Hero() {
  return (
    <section
      className="container-fluid text-white"
      id="supportHero"
      style={{ backgroundColor: "#387ed1" }}
    >
      <div className="container py-5">
        
        {/* Top Row */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Support Portal</h4>
          <a href="/" className="text-white text-decoration-underline">
            Track Tickets
          </a>
        </div>

        {/* Main Content */}
        <div className="row">
          
          {/* Left Side */}
          <div className="col-md-6" style={{ lineHeight: "1.8" }}>
            <h1 className="fs-3 mb-4">
              Search for an answer or browse help topics to create a ticket
            </h1>

            <input
              type="text"
              placeholder="Eg. how do I activate F&O, why is my order getting rejected..."
              className="form-control p-3 mb-3"
              style={{ borderRadius: "8px" }}
            />

            <div>
              <a href="/" className="text-white me-3 d-inline-block mb-2">
                Track account opening
              </a>
              <a href="/" className="text-white me-3 d-inline-block mb-2">
                Track segment activation
              </a>
              <a href="/" className="text-white me-3 d-inline-block mb-2">
                Intraday margins
              </a>
              <a href="/" className="text-white d-inline-block mb-2">
                Kite user manual
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-6">
            <h1 className="fs-3 mb-3">Featured</h1>

            <ol style={{ lineHeight: "2" }}>
              <li>
                <a href="/" className="text-white text-decoration-underline">
                  Current Takeovers and Delisting – January 2024
                </a>
              </li>
              <li>
                <a href="/" className="text-white text-decoration-underline">
                  Latest Intraday leverages – MIS & CO
                </a>
              </li>
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
