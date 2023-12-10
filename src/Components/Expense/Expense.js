import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expenses";

const Expense = () => {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editExpenseId, setEditExpenseId] = useState(null);
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
        .then((res) => {console.log(res.data)
          const data = res.data;
          dispatch(expenseActions.addExpense({ data }))})
        .catch((err) => console.log(err));

      getAllExpense();
    }

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
          const expenseArray = res.data;
          const data = res.data;
          dispatch(expenseActions.setExpense({ data }));
          setExpenses(expenseArray);
        }
      })
      .catch((err) => console.log(err));
  };

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
    </>
  );
};

export default Expense;
