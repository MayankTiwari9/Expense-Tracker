import axios from "axios";
import React, { useEffect, useState } from "react";

const Expense = () => {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (e) => {
    e.preventDefault();

    const newExpense = {
      amount: amount,
      description: description,
      category: category,
    };

    axios
      .post(
        "https://expense-tracker-react-1867a-default-rtdb.firebaseio.com/expenses.json",
        {
          amount: amount,
          description: description,
          category: category,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    setAmount("");
    setDescription("");
    setCategory("");
  };

  const getAllExpense = () => {
    axios
      .get(
        "https://expense-tracker-react-1867a-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((res) => {
        if (res.data) {
          const expenseArray = Object.values(res.data);
          setExpenses(expenseArray);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllExpense();
  }, []);

  return (
    <>
      <form
        className="d-flex flex-column w-50 mx-auto align-items-center justify-content-center rounded text-white"
        style={{ backgroundColor: "rgb(3,21,37)" }}
        onSubmit={addExpenseHandler}
      >
        <div className="d-flex mt-3 w-100 justify-content-center">
          <label>Amount Spent:- </label>
          <input
            className="ml-4"
            style={{ marginLeft: "10px" }}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="d-flex mt-3 w-100 justify-content-center">
          <label>Description:- </label>
          <input
            className="ml-4"
            style={{ marginLeft: "10px" }}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="d-flex mt-3 w-100 justify-content-center">
          <label>Category:- </label>
          <select
            className="ml-4"
            style={{ marginLeft: "10px" }}
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Emi">Emi</option>
            <option value="House Rent">House Rent</option>
          </select>
        </div>
        <div>
          <button className="btn btn-secondary m-3" type="submit">
            Add Expense
          </button>
        </div>
      </form>
      <div
        className="d-flex flex-column w-50 mx-auto align-items-center justify-content-center mt-3 rounded text-white"
        style={{ backgroundColor: "rgb(3,21,37)" }}
      >
        {expenses &&
          expenses.map((item, index) => {
            return (
              <div
                className="d-flex justify-content-around align-items-center w-100"
                key={index}
              >
                <h3 className="align-middle">{item.amount}</h3>
                <p className="">{item.description}</p>
                <p className="">{item.category}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Expense;
