import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState("");

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(event) {
    event.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price,
        description,
        dateTime,
      }),
    }).then((response) => {
      response.json().then((data) => {
        setName("");
        setDateTime("");
        setDescription("");
        console.log("Result", data);
      });
    });
  }

  let balance = 0;
  for(const transaction of transactions){
    console.log(transaction.price);
     balance  = balance + transaction.price;
  }

  return (
    <div>
      <h1>
        {balance}
      </h1>

      <form action="" onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="2000 mobile"
          ></input>
          <input
            value={dateTime}
            onChange={(event) => setDateTime(event.target.value)}
            type="datetime-local"
          />
        </div>

        <div className="description">
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
            placeholder="description"
          />
        </div>
        <button type="submit">Add New Transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div className="transaction" key={index}>
              <div className="left">
                <div className="name">{transaction?.name}</div>
                <div className="description">{transaction?.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction?.price}
                </div>
                <div className="datetime">{transaction?.dateTime}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
