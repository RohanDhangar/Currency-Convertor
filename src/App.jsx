import { useState } from "react";
import { InputBox } from "./Components/index";
import "./index.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json  ---> API keys

function App() {
  let [amount, setAmount] = useState(0);
  let [from, setFrom] = useState("usd");
  let [to, setTo] = useState("inr");
  let [convertedAmount, setConvertedAmount] = useState(0);

  let currencyInfo = useCurrencyInfo(from); // this is returning me object which contains all the key value pair of currency and its value
  let options = Object.keys(currencyInfo); // so here I am saprating keys so that I display in list
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg?w=996&t=st=1702537579~exp=1702538179~hmac=d8c3ec3514d462ad4afcd5f2416e9523658f3b762e05f52e516189a683179a82')`,
      }}
    >
      <div className="w-full">
        <button
          className="absolute top-0 right-0 m-4 bg-blue-600 text-white px-4 py-3 rounded-lg"
          onClick={() => (window.location.href = "https://github.com/RohanDhangar/Currency-Convertor")}
        >
          Get Code
        </button>
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                CurrencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                CurrencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
