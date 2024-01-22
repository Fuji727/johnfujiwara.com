import { useState } from 'react';
import './cashflow.css';
import { CashFlowModel, ParseCashFlowModel, MonthNames } from './CashFlowModels';

export default function CashFlow({cashFlowModel, labelAdjustment})
{
    let labelAdjustmentToUse = labelAdjustment || (label => label);
    const [ expenses, setExpenses ] = useState(cashFlowModel?.Expenses);
    const [ balanceByPeriod, setBalanceByPeriod ] = useState(cashFlowModel?.Results.BalanceByPeriod);

    function SaveExpenses()
    {
        setExpenses([...cashFlowModel.Expenses]);
        setBalanceByPeriod([...cashFlowModel.Results.BalanceByPeriod]);
    }
    function addNewExpenseHandler()
    {
        cashFlowModel.AddExpense();
        SaveExpenses();
    }
    function expenseNameChangeHandler(event)
    {
        const evtId = event.target.getAttribute('data-expense-id');
        const newVal = event.target.value;
        if (!!evtId && !!newVal)
        {
            cashFlowModel.UpdateExpenseName(evtId, newVal);
            SaveExpenses();
        }
    }
    function paymentChangeHandler(event)
    {
        const expId = event.target.getAttribute('data-expense-id');
        const payId = event.target.getAttribute('data-payment-id');
        if (!!expId && !!payId)
        {
            cashFlowModel.UpdatePaymentAmount(expId, payId, parseFloat(event.target.value || 0));
            SaveExpenses();
        }
    }

    return cashFlowModel && cashFlowModel.PeriodNames && (
        <>
            <table className="cashflow">
                <thead>
                    <tr>
                        <th scope="col">Expense name</th>
                        {cashFlowModel.PeriodNames.map(p =>
                            <th key={`col_${p}`} scope="col">{labelAdjustmentToUse(p)}</th>
                        )}
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses && expenses.map((expense,expenseIndex) => (
                        <tr key={`e${expenseIndex}`}>
                            <th scope="row"><input type="text" data-expense-id={expenseIndex} onChange={expenseNameChangeHandler} defaultValue={expense.Name} /></th>
                            {expense.Payments.map((thisPayment,paymentIndex) => {
                                const thisKey = `e${expenseIndex}_p${paymentIndex}`;
                                return <td key={thisKey}><input type="text" data-expense-id={expenseIndex} data-payment-id={paymentIndex} onChange={paymentChangeHandler} defaultValue={thisPayment} /></td>
                            })}
                            <td><button onClick={() => cashFlowModel.RemoveExpense(expenseIndex)}>X</button></td>
                        </tr>
                    ))}
                </tbody>
                {expenses && expenses.length > 0 && <tfoot>
                    <tr>
                        <th scope="row">Running Balance:</th>
                        {cashFlowModel.PeriodNames.map((p,i) =>
                            <td key={`bal${i}`}>{currencyFormatter.format(balanceByPeriod[i])}</td>
                        )}
                        <td></td>
                    </tr>
                </tfoot>}
            </table>
            <button onClick={addNewExpenseHandler}>Add another expense</button>
        </>
    );
}
let currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });