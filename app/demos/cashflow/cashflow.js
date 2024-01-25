import { useState, useEffect } from 'react';
import { ExpenseCollectionModel, ExpenseModel } from './ExpenseCollectionModel.js';
import './cashflow.css';

export default function CashFlow({expenseCollectionModel, resultsModel, onChange, nameTransformFunction})
{
    const nameTransformFunctionToUse = nameTransformFunction || (label => label);
    const [ expenseCollection, setExpenseCollection ] = useState(expenseCollectionModel);
    //const [ balanceByPeriod, setBalanceByPeriod ] = useState(expenses?.Results.BalanceByPeriod);

    useEffect(() => {
        onChange(expenseCollection);
    }, [ expenseCollection ]);

    function addNewExpenseHandler()
    {
        let clonedExpenseCollection = expenseCollection.Clone();
        //clonedExpenseCollection.Expenses.push(new ExpenseModel('New expense', Array(clonedExpenseCollection.PeriodNames.length).fill(0)));
        clonedExpenseCollection.AddExpense();
        setExpenseCollection(clonedExpenseCollection);
    }
    function expenseNameChangeHandler(event)
    {
        const expenseIndex = event.target.getAttribute('data-expense-id');
        const newName = event.target.value;
        if (!!expenseIndex && !!newName)
        {
            let clonedExpenseCollection = expenseCollection.Clone();
            clonedExpenseCollection.Expenses[expenseIndex].Name = newName;
            setExpenseCollection(clonedExpenseCollection);
        }
    }
    function paymentChangeHandler(event)
    {
        const expenseIndex = event.target.getAttribute('data-expense-id');
        const periodicPaymentIndex = event.target.getAttribute('data-payment-id');
        if (!!expenseIndex && !!periodicPaymentIndex)
        {
            let clonedExpenseCollection = expenseCollection.Clone();
            clonedExpenseCollection.Expenses[expenseIndex].PeriodicPayments[periodicPaymentIndex] = event.target.value;
            setExpenseCollection(clonedExpenseCollection);
        }
    }
    function removeExpenseHandler(expenseIndex)
    {
        let clonedExpenseCollection = expenseCollection.Clone();
        clonedExpenseCollection.Expenses.splice(expenseIndex, 1);
        setExpenseCollection(clonedExpenseCollection);
    }

    return expenseCollection && expenseCollection.PeriodNames && (
        <section className="cashflow">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Expense name</th>
                        {expenseCollection.PeriodNames.map(p =>
                            <th key={`col_${p}`} scope="col">{nameTransformFunctionToUse(p)}</th>
                        )}
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {expenseCollection && expenseCollection.Expenses && expenseCollection.Expenses.map((expense,expenseIndex) => (
                        <tr key={`e${expenseIndex}`}>
                            <th scope="row"><input type="text" id={`expenseName${expenseIndex}`} data-expense-id={expenseIndex} onChange={expenseNameChangeHandler} defaultValue={expense.Name} /></th>
                            {expense.PeriodicPayments.map((thisPayment,paymentIndex) => {
                                const thisKey = `e${expenseIndex}_p${paymentIndex}`;
                                return <td key={thisKey}><input type="text" id={thisKey} data-expense-id={expenseIndex} data-payment-id={paymentIndex} onChange={paymentChangeHandler} defaultValue={thisPayment} /></td>
                            })}
                            <td><button onClick={() => removeExpenseHandler(expenseIndex)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
                {resultsModel && resultsModel.BalanceByPeriod && resultsModel.BalanceByPeriod.length > 0 && (<tfoot>
                    <tr>
                        <th scope="row">Running Balance
                            {resultsModel.BiggestShortfall < -0.00001 && <div>({currencyFormatter.format(-resultsModel.BiggestShortfall)} to start)</div>}
                        </th>
                        {resultsModel.BalanceByPeriod.map((balanceByPeriod,i) =>
                            <td key={`bal${i}`}>{currencyFormatter.format(balanceByPeriod - resultsModel.BiggestShortfall)}</td>
                        )}
                        <td></td>
                    </tr>
                </tfoot>)}
            </table>
            <button onClick={addNewExpenseHandler}>Add expense</button>
            {resultsModel && <div className='results'>
                <hr />
                <h3>Results:</h3>
                <p>You should save {currencyFormatter.format(resultsModel.SavingsRequiredPerPeriod)} per {expenseCollection.PeriodNames.length == 12 && expenseCollection.PeriodNames[0].toLowerCase().startsWith('jan') ? 'month' : 'period'}.</p>
                {resultsModel.BiggestShortfall < -0.00001 && <p>To ensure that you won't overdraw your escrow account, you need a starting balance of {currencyFormatter.format(-resultsModel.BiggestShortfall)}.</p>}
              </div>}
        </section>
    );
}
let currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });