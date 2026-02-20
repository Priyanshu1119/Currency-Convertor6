import { useState, useEffect } from 'react';
import {InputBox} from './Components';
import useCurrencyInfo from './hooks/useCurrencyInfo';


function App() {

  const [amount, setAmount] = useState(() => {
    const saved = localStorage.getItem("amount")
    return saved ? Number(saved) : 0
  })

  const [from, setFrom] = useState(() => {
    const saved = localStorage.getItem("from")
    return saved || "usd"
  })

  const [to, setTo] = useState(() => {
    const saved = localStorage.getItem("to")
    return saved || "inr"
  })

  const [convertedAmount, setConvertedAmount] = useState(0)

  // Save all preferences to localStorage
  useEffect(() => {
    localStorage.setItem("amount", amount)
    localStorage.setItem("from", from)
    localStorage.setItem("to", to)
  }, [amount, from, to])

  const { data: currencyInfo, loading, error } = useCurrencyInfo(from)

  // guard against undefined from the hook
  const options = Object.keys(currencyInfo || {})

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }
  
  const convert = () => {
    // guard against undefined rate
    const rate = currencyInfo && currencyInfo[to] ? currencyInfo[to] : 0
    setConvertedAmount(amount * rate)
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://wallpapercave.com/wp/wp2300383.jpg')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
             <h1 className="text-2xl font-semibold text-black text-center mb-4">
        Currency Converter
    </h1>
                {error && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4 text-sm">
                        Using offline rates. Some currencies may not be available.
                    </div>
                )}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
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
                                currencyOptions={options}
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
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                )}
            </div>
        </div>
        <footer style={{
    textAlign: "center",
    padding: "10px",
    color: "#fff",
    width: "100%",
    position: "absolute",
    bottom: 0
}}>
    &copy; 2025 Priyanshu. All Rights Reserved.
</footer>

    </div>
);
}

export default App
