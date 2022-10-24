import BudgetList from '../BudgetList/BudgetList';
import Add from '../Add/Add';
import styles from './DesktopDashboard.module.css';

const DesktopDashboard = (props) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.board}>
        <h2 className={styles.title}>Income</h2>
        <BudgetList
          type="income"
          items={props.items.income}
          onRemoveItem={props.onRemoveIncomeItem}
        />
        <Add
          onSetFormType={props.onSetFormType.bind(null, 'income')}
          onShowBudgetForm={props.onShowBudgetForm}
        />
      </div>
      <div className={styles.board}>
        <h2 className={styles.title}>PlannedExpenses</h2>
        <BudgetList
          type="plannedexpense"
          items={props.items.plannedexpenses}
          onRemoveItem={props.onRemovePlannedExpenseItem}
        />
        <Add
          onSetFormType={props.onSetFormType.bind(null, 'plannedexpense')}
          onShowBudgetForm={props.onShowBudgetForm}
        />
      </div>
      <div className={styles.board}>
        <h2 className={styles.title}>Expenses</h2>
        <BudgetList
          type="expenses"
          items={props.items.expenses}
          onRemoveItem={props.onRemoveExpensesItem}
        />
        <Add
          onSetFormType={props.onSetFormType.bind(null, 'expenses')}
          onShowBudgetForm={props.onShowBudgetForm}
        />
      </div>
    </div>
  );
};

export default DesktopDashboard;
