import React, { useState, useEffect } from "react";
import apiClient from "../../api/client";

import { positions as staticPositions } from "./data/data";

const fmt = (n) => Number(n ?? 0).toFixed(2);

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    let cancelled = false;

    apiClient
      .get("/allPositions")
      .then((res) => {
        if (cancelled) return;
        const arr = Array.isArray(res.data) ? res.data : [];
        setAllPositions(arr);
      })
      .catch(() => {
        if (cancelled) return;
        setAllPositions(staticPositions);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const qty = Number(stock.qty ?? 0);
              const avg = Number(stock.avg ?? 0);
              const price = Number(stock.price ?? 0);
              const curValue = price * qty;
              const isProfit = curValue - avg * qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product ?? "—"}</td>
                  <td>{stock.name ?? "—"}</td>
                  <td>{qty}</td>
                  <td>{fmt(avg)}</td>
                  <td>{fmt(price)}</td>
                  <td className={profClass}>
                    {fmt(curValue - avg * qty)}
                  </td>
                  <td className={dayClass}>{stock.day ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
