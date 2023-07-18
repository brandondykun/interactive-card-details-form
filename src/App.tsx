import { useState } from "react";
import "./App.css";
import creditCardLogo from "./assets/card-logo.svg";
import checkIcon from "./assets/icon-complete.svg";

type ErrorType = {
  name: null | string;
  cardNumber: null | string;
  month: null | string;
  year: null | string;
  cvc: null | string;
};

function App() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");
  const [errors, setErrors] = useState<ErrorType>({
    name: null,
    cardNumber: null,
    month: null,
    year: null,
    cvc: null,
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setErrors({
      name: null,
      cardNumber: null,
      month: null,
      year: null,
      cvc: null,
    });

    if (!name) {
      setErrors((prev) => {
        return { ...prev, name: "Can't be blank" };
      });
    }
    if (!cardNumber) {
      setErrors((prev) => {
        return { ...prev, cardNumber: "Can't be blank" };
      });
    }
    if (!month) {
      setErrors((prev) => {
        return { ...prev, month: "Can't be blank" };
      });
    }
    if (!year) {
      setErrors((prev) => {
        return { ...prev, year: "Can't be blank" };
      });
    }
    if (!cvcNumber) {
      setErrors((prev) => {
        return { ...prev, cvc: "Can't be blank" };
      });
    }
    if (!name || !cardNumber || !month || !year || !cvcNumber) {
      return;
    }
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setErrors((prev) => {
        return { ...prev, cardNumber: "Please enter a valid card number" };
      });
      return;
    }

    setSubmitSuccess(true);
  };

  const handleFormReset = () => {
    setSubmitSuccess(false);
    setName("");
    setCardNumber("");
    setMonth("");
    setYear("");
    setCvcNumber("");
  };

  const formatNumber = (number: string) =>
    number.split("").reduce((seed, next, index) => {
      if (index !== 0 && !(index % 4)) seed += " ";
      return seed + next;
    }, "");

  return (
    <div id="app-main">
      <div className="background"></div>
      <div id="credit-card-back-wrapper">
        <div id="credit-card-back-cvc-numbers">
          {cvcNumber ? cvcNumber : "000"}
        </div>
      </div>
      <div id="credit-card-front-wrapper">
        <div id="credit-card-front-header">
          <img
            src={creditCardLogo}
            alt="Credit card logo."
            id="credit-card-front-logo"
          />
        </div>
        <div id="credit-card-front-numbers">
          {cardNumber ? formatNumber(cardNumber) : "0000 0000 0000 0000"}
        </div>
        <div id="credit-card-front-footer">
          <div className="credit-card-front-name">
            {name ? name : "JANE APPLESEED"}
          </div>
          <div className="credit-card-front-expiration">
            {month ? month : "00"}/{year ? year : "00"}
          </div>
        </div>
      </div>
      {!submitSuccess ? (
        <form id="card-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="card-form-label">
            CARDHOLDER NAME
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={`text-input ${errors.name ? "invalid" : ""}`}
            placeholder="e.g. Jane Appleseed"
          />
          <div className="input-error-container">{errors.name}</div>
          <label htmlFor="number" className="card-form-label">
            CARD NUMBER
          </label>
          <input
            type="text"
            id="number"
            onChange={(e) => setCardNumber(e.target.value.replace(/\D+/g, ""))}
            value={formatNumber(cardNumber)}
            className={`text-input ${errors.cardNumber ? "invalid" : ""}`}
            placeholder="e.g. 1234 5678 9123 0000"
            maxLength={19}
          />
          <div className="input-error-container">{errors.cardNumber}</div>
          <div id="card-form-expiration-cvc-input-container">
            <div className="card-form-input-container">
              <label htmlFor="month" className="card-form-label">
                EXP. DATE
              </label>
              <input
                type="text"
                id="month"
                onChange={(e) => setMonth(e.target.value.replace(/\D+/g, ""))}
                value={month}
                className={`text-input ${errors.month ? "invalid" : ""}`}
                placeholder="MM"
                maxLength={2}
              />
              <div className="input-error-container">{errors.month}</div>
            </div>
            <div className="card-form-input-container margin-right-left">
              <label htmlFor="yr" className="card-form-label">
                (MM/YY)
              </label>
              <input
                type="text"
                id="yr"
                onChange={(e) => setYear(e.target.value.replace(/\D+/g, ""))}
                value={year}
                className={`text-input ${errors.year ? "invalid" : ""}`}
                placeholder="YY"
                maxLength={2}
              />
              <div className="input-error-container">{errors.year}</div>
            </div>
            <div className="card-form-input-container flex-2">
              <label htmlFor="cvc" className="card-form-label">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                onChange={(e) =>
                  setCvcNumber(e.target.value.replace(/\D+/g, ""))
                }
                value={cvcNumber}
                className={`text-input ${errors.cvc ? "invalid" : ""}`}
                placeholder="e.g. 123"
                maxLength={3}
              />
              <div className="input-error-container">{errors.cvc}</div>
            </div>
          </div>
          <button className="card-form-button">Confirm</button>
        </form>
      ) : (
        <div id="completed-card">
          <img src={checkIcon} alt="Checkmark icon" id="completed-card-icon" />
          <div id="completed-card-heading">THANK YOU!</div>
          <div id="completed-card-text">We've added your card details</div>
          <button className="card-form-button" onClick={handleFormReset}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
