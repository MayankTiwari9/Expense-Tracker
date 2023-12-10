import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expenses";

const Expense = () => {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [isPremiumActivated, setIsPremiumActivated] = useState(false);
  const dispatch = useDispatch();

  const addExpenseHandler = (e) => {
    e.preventDefault();

    const newExpense = {
      amount: amount,
      description: description,
      category: category,
    };

    if (editExpenseId !== null) {
      axios
        .put(
          `https://expense-tracker-react-1867a-default-rtdb.firebaseio.com/expenses/${editExpenseId}.json`,
          newExpense
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));

      setEditExpenseId(null);
    } else {
      axios
        .post(
          "https://expense-tracker-react-1867a-default-rtdb.firebaseio.com/expenses.json",
          newExpense
        )
        .then((res) => {
          console.log(res.data);
          const addedExpense = {
            id: res.data.name, // Assuming Firebase response provides a unique ID
            ...newExpense,
          };
          dispatch(expenseActions.addExpense({ data: addedExpense }));
        })
        .catch((err) => console.log(err));

      getAllExpense();
    }

    setAmount("");
    setDescription("");
    setCategory("");
  };

  const getAllExpense = useCallback(() => {
    axios
      .get(
        "https://expense-tracker-react-1867a-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((res) => {
        if (res.data) {
          let expenseArray = res.data;
          if(!Array.isArray(expenseArray)){
            expenseArray = Object.values(expenseArray);
          }
          dispatch(expenseActions.setExpense({ data: expenseArray }));
          setExpenses(expenseArray);

          const totalExpenses = expenseArray.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
          )
          setIsPremiumActivated(totalExpenses > 10000);
        }
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const deleteExpense = (id) => {
    axios
      .delete(
        `https://expense-tracker-react-1867a-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleEditClick = (id) => {
    setEditExpenseId(id);

    const expenseToEdit = expenses[id];
    setAmount(expenseToEdit.amount);
    setDescription(expenseToEdit.description);
    setCategory(expenseToEdit.category);
  };

  useEffect(() => {
    getAllExpense();
  }, [getAllExpense]);

  const activatePremium = () => {
    // Add your premium activation logic here
    console.log("Premium activated!");
  };

  const downloadExpensesCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Amount,Description,Category\n" +
      expenses.map(expense =>
        `${expense.amount},${expense.description},${expense.category}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

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
        {Object.entries(expenses).map(([id, expense]) => (
          <div
            className="d-flex justify-content-around align-items-center w-100 border-bottom"
            key={id}
            style={{ height: "75px" }}
          >
            <h3 className="align-middle">{expense.amount}</h3>
            <p className="">{expense.description}</p>
            <p className="">{expense.category}</p>
            {editExpenseId !== id && (
              <button
                className="btn btn-success"
                onClick={() => handleEditClick(id)}
              >
                Edit Expense
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => deleteExpense(id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {isPremiumActivated && (
        <button className="d-flex btn btn-warning m-3 mx-auto" onClick={activatePremium}>Activate Premium</button>
      )}
      <button className="d-flex mx-auto btn btn-primary m-2" onClick={downloadExpensesCSV}>
        Download Expenses CSV
      </button>
    </>
  );
};

export default Expense;
