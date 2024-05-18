import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo"

function App() {
  
  const [amount,setAmount] = useState("");
  const [from,setFrom] = useState("usd");
  const [to,setTo] = useState("inr");
  const[convertedAmount, setConvertedAmount] = useState("");
  const [trigger, setTrigger] = useState(false);

  const currencyInfo = useCurrencyInfo(from,trigger);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    setTrigger((prev) => !prev);
    setConvertedAmount(amount*currencyInfo[to])
  };

  const swap = () => {
      const temp1 = to;
      setTo(from);
      setFrom(temp1);

      const temp2 = convertedAmount;
      setConvertedAmount(amount)
      setAmount(temp2);
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1607728285423-a94d41a4d2f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            onAmountChange={(amount) => setAmount(amount)}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            currencyOptions={options}
                            selectCurrency={from}
                        />
                    </div>

                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                          Swap
                        </button>
                    </div>

                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            onCurrencyChange={(currency) => setTo(currency)}
                            currencyOptions={options}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App;
