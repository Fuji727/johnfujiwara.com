import { useState } from 'react';
import './cashflow.css';
import { CashFlowModel, ParseCashFlowModel, MonthNames } from './CashFlowModels';

export default function CashFlow({cashFlowModel, labelAdjustment})
{
    let labelAdjustmentToUse = labelAdjustment || (label => label);
    let [ expenses, setExpenses ] = useState(cashFlowModel?.Expenses);

    function SaveExpenses()
    {
        setExpenses([...cashFlowModel.Expenses]);
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
            <ExpenseTable cashFlowModel={cashFlowModel} labelAdjustment={labelAdjustmentToUse}>
                {cashFlowModel.Expenses && cashFlowModel.Expenses.map((expense,i) => (
                    <ExpenseRow key={`expense${i+1}`} expenseId={i} expense={expense} expenseNameChangeHandler={expenseNameChangeHandler} paymentChangeHandler={paymentChangeHandler} />
                ))}
            </ExpenseTable>
            <button onClick={addNewExpenseHandler}>Add another expense</button>
        </>
    );
}
function ExpenseTable({children, cashFlowModel, labelAdjustment})
{
    return (
        <>
            <table className="cashflow">
                <thead>
                    <tr>
                        <th scope="col">Expense name</th>
                        {cashFlowModel.PeriodNames.map(p =>
                            <th key={`col_${p}`} scope="col">{labelAdjustment(p)}</th>
                        )}
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row">Running Balance:</th>
                        {cashFlowModel.PeriodNames.map((p,i) =>
                            <td>{currencyFormatter.format(cashFlowModel.Results.BalanceByPeriod[i])}</td>
                        )}
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}
function ExpenseRow({expenseId, expense, expenseNameChangeHandler, paymentChangeHandler})
{
    return (
        <tr>
            <th scope="row"><input type="text" data-expense-id={expenseId} onChange={expenseNameChangeHandler} defaultValue={expense.Name} /></th>
            {expense.Payments.map((thisPayment,i) => {
                const thisKey = `e${expenseId}_p${i}`;
                return <td key={thisKey}><input type="text" data-expense-id={expenseId} data-payment-id={i} onChange={paymentChangeHandler} defaultValue={thisPayment} /></td>
            })}
            <td><button>X</button></td>
        </tr>
    );
}
let currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });