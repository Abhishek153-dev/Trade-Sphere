import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="/Media/smallcaseLogo.png" alt="product" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/Media/streakLogo.png" className="img-fluid"
        style={{ width: "130px" }} alt="streak" />
          <p className="text-small text-muted">Algo & strategy platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/Media/sensibullLogo.svg" className="img-fluid"
        style={{ width: "130px" }} alt="product" />
          <p className="text-small text-muted">Options trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/Media/zerodhaFundhouse.png"className="img-fluid"
        style={{ width: "150px" }} alt="product" />
          <p className="text-small text-muted">Asset management</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/Media/goldenpiLogo.png" className="img-fluid"
        style={{ width: "130px" }} alt="product" />
          <p className="text-small text-muted">Bonds trading  platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/Media/dittoLogo.png" className="img-fluid"
        style={{ width: "130px" }} alt="product" />
          <p className="text-small text-muted">Insurance</p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
