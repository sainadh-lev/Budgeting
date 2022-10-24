import { useEffect, useState } from 'react';
import DesktopDashboard from '../DesktopDashboard/DesktopDashboard';
import MobileDashboard from '../MobileDashboard/MobileDashboard';

const Dashboard = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return width >= 600 ? (
    <DesktopDashboard
      items={props.items}
      onRemoveIncomeItem={props.onRemoveIncomeItem}
      onRemoveExpensesItem={props.onRemoveExpensesItem}
      onRemovePlannedExpenseItem={props.onRemovePlannedExpenseItem}
      onShowBudgetForm={props.onShowBudgetForm}
      onSetFormType={props.onSetFormType}
    />
  ) : (
    <MobileDashboard
      items={props.items}
      onRemoveIncomeItem={props.onRemoveIncomeItem}
      onRemoveExpensesItem={props.onRemoveExpensesItem}
      onShowBudgetForm={props.onShowBudgetForm}
      onSetFormType={props.onSetFormType}
    />
  );
};

export default Dashboard;
