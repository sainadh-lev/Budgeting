import { useState, useEffect, useReducer } from "react";
import BudgetForm from "./components/BudgetForm/BudgetForm";
import PlannedBudgetForm from "./components/PlannedBudgetForm/PlannedBudgetForm";
import Overview from "./components/Overview/Overview";
import "./App.css";
import axios from "axios";
import Logout from "./components/Logout/Logout";
import Dashboard from "./components/DesktopDashboard/DesktopDashboard";


const EMPTY_STATE = {
  income: [],
  expenses: [],
  plannedexpenses: [],
};

const budgetReducer = (state, action) => {
  if (action.type === "ADD_INCOME") {
    const updatedIncome = [...state.income];
    updatedIncome.unshift(action.item);
    return {
      income: updatedIncome,
      plannedexpenses: state.plannedexpenses,
      expenses: state.expenses,
    };
  } else if (action.type === "ADD_EXPENSES") {
    const updatedExpenses = [...state.expenses];
    updatedExpenses.unshift(action.item);
    return {
      income: state.income,
      plannedexpenses: state.plannedexpenses,
      expenses: updatedExpenses,
    };
  } else if (action.type === "ADD_PLANNEDEXPENSES") {
    const updatedPlannedExpenses = [...state.plannedexpenses];
    updatedPlannedExpenses.unshift(action.item);
    updatedPlannedExpenses.sort((obj1, obj2) => obj2.priority - obj1.priority);
    console.log(state);
    return {
      income: state.income,
      expenses: state.expenses,
      plannedexpenses: updatedPlannedExpenses,
    };
  } else if (action.type === "REMOVE_INCOME") {
    const updatedIncome = state.income.filter((item) => item.id !== action.id);
    return {
      income: updatedIncome,
      expenses: state.expenses,
      plannedexpenses: state.plannedexpenses,
    };
  } else if (action.type === "REMOVE_EXPENSES") {
    const updatedExpenses = state.expenses.filter(
      (item) => item.id !== action.id
    );
    return {
      income: state.income,
      expenses: updatedExpenses,
      plannedexpenses: state.plannedexpenses,
    };
  } else if (action.type === "REMOVE_PLANNEDEXPENSES") {
    const updatedExpenses = state.plannedexpenses.filter(
      (item) => item.id !== action.id
    );
    return {
      income: state.income,
      expenses: state.expenses,
      plannedexpenses: updatedExpenses,
    };
  } else if (action.type === "LOCAL_STORAGE_ITEMS") {
    return action.items;
  }

  return EMPTY_STATE;
};

function App() {
  const [budgetState, dispatchBudgetState] = useReducer(
    budgetReducer,
    EMPTY_STATE
  );
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [logged, setlogged] = useState(false);

  useEffect(() => {
    // console.log("i got called");
    axios.post('http://localhost:9000/data',{data: JSON.stringify(localStorage.getItem("budget"))})
    const localItems = JSON.parse(localStorage.getItem("budget"));
    if (localItems) {
      dispatchBudgetState({ type: "LOCAL_STORAGE_ITEMS", items: localItems });
    }
  }, []);

  useEffect(() => {
    axios.post('http://localhost:9000/data',{data: JSON.stringify(localStorage.getItem("budget"))})
    if (
      budgetState.income.length === 0 &&
      budgetState.expenses.length === 0 &&
      budgetState.plannedexpenses.length === 0
    ) {
      localStorage.removeItem("budget");
    } else {
      localStorage.setItem("budget", JSON.stringify(budgetState));
    }
  }, [budgetState]);

  const addIncomeItemHandler = (budgetItem) => {
    dispatchBudgetState({ type: "ADD_INCOME", item: budgetItem });
  };

  const addPlannedExpenseItemHandler = (budgetItem) => {
    dispatchBudgetState({ type: "ADD_PLANNEDEXPENSES", item: budgetItem });
  };

  const addExpensesItemHandler = (budgetItem) => {
    dispatchBudgetState({ type: "ADD_EXPENSES", item: budgetItem });
  };

  const removeIncomeItemHandler = (budgetItemId) => {
    dispatchBudgetState({ type: "REMOVE_INCOME", id: budgetItemId });
  };

  const removePlannedExpenseItemHandler = (budgetItemId) => {
    dispatchBudgetState({ type: "REMOVE_PLANNEDEXPENSES", id: budgetItemId });
  };

  const removeExpensesItemHandler = (budgetItemId) => {
    dispatchBudgetState({ type: "REMOVE_EXPENSES", id: budgetItemId });
  };

  const showBudgetFormHandler = () => {
    setShowForm(true);
  };

  const hideBudgetFormHandler = () => {
    setShowForm(false);
  };

  const setFormTypeHandler = (type) => {
    setFormType(type);
  };

  const setLoggedout = () => {
    axios.get("http://localhost:9000/loggedout")
    setlogged(false)
  }
  axios.get("http://localhost:9000/logged").then((res) => {
    console.log(res.data);
    if (res.data !== "yes") {
      console.log(res.data);
      window.location.assign("http://localhost:9000/");
    } else {
      setlogged(true);
    }
  });
  if (logged === true) {
    return (
      <>
        <div className="container">
          {showForm && formType !== "plannedexpense" && (
            <BudgetForm
              onAddItem={
                formType === "income"
                  ? addIncomeItemHandler
                  : formType === "expenses"
                  ? addExpensesItemHandler
                  : addPlannedExpenseItemHandler
              }
              onClose={hideBudgetFormHandler}
              whichForm={formType}
            />
          )}
          {showForm && formType === "plannedexpense" && (
            <PlannedBudgetForm
              onClose={hideBudgetFormHandler}
              onAddItem={addPlannedExpenseItemHandler}
              whichForm={formType}
            />
          )}
          <Overview items={budgetState} />
          <Dashboard
            items={budgetState}
            onRemoveIncomeItem={removeIncomeItemHandler}
            onRemoveExpensesItem={removeExpensesItemHandler}
            onRemovePlannedExpenseItem={removePlannedExpenseItemHandler}
            onShowBudgetForm={showBudgetFormHandler}
            onSetFormType={setFormTypeHandler}
          />
        </div>
        <Logout onLoggedOut={setLoggedout}/>
      </>
    );
  }
  else {
    return (
      <>
      <h1>Please Login first</h1>
      </>
    )
  }
}

export default App;
