import React, { useState } from "react";
import Axios from "axios";
// import "./styles.css"; // Import the custom CSS

function Payment({ setShowPaypal }) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const payHandler = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:5000/token", {
      amount,
      phone,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="background-transition">
      <h1>
        Pay with <span style={{ color: '#38a169', fontWeight: 'bold' }}>Mpesa</span>
      </h1>
      <div className="card">
        <form className="form" onSubmit={payHandler}>
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            required
          />
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
            required
          />
          <button
            type="submit"
            className="button"
          >
            Pay with Mpesa
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setShowPaypal(true)}
          >
            Pay with PayPal
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
