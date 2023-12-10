import { createSlice } from "@reduxjs/toolkit"


const initialExpenseState = {
    expense: [],
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action){
            const newExpense = action.payload;
            state.expense.push(newExpense);
        },

        setExpense(state, action) {
            const fetchedExpense = action.payload;
            state.expense = fetchedExpense;
        }
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;