import React, { useState, useEffect } from "react";
import apiClient from "../../api/client";

import { VerticalGraph } from "./VerticalGraph";
import { holdings as staticHoldings } from "./data/data";

const fmt = (n) => Number(n ?? 0).toFixed(2);

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    let cancelled = false;

    apiClient
      .get("/allHoldings")
      .then((res) => {
        if (cancelled) return;
        const arr = Array.isArray(res.data) ? res.data : [];
        setAllHoldings(arr);
      })
      .catch(() => {
        if (cancelled) return;
        setAllHoldings(staticHoldings);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const labels = allHoldings.map((h) => h.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price ?? 0)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const qty = Number(stock.qty ?? 0);
              const avg = Number(stock.avg ?? 0);
              const price = Number(stock.price ?? 0);
              const curValue = price * qty;
              const isProfit = curValue - avg * qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{fmt(avg)}</td>
                  <td>{fmt(price)}</td>
                  <td>{fmt(curValue)}</td>
                  <td className={profClass}>
                    {fmt(curValue - avg * qty)}
                  </td>
                  <td className={profClass}>{stock.net ?? "—"}</td>
                  <td className={dayClass}>{stock.day ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      {labels.length > 0 ? <VerticalGraph data={data} /> : null}
    </>
  );
};

export default Holdings;
