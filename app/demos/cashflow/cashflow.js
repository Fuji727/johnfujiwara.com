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
        <article className="cashflow">
            <section className="expenses">
                {expenseCollection && expenseCollection.Expenses && expenseCollection.Expenses.map((expense, expenseIndex) => (
                    // open="open"
                    <details key={`e${expenseIndex}`}>
                        <summary>
                            <input type="text" id={`expenseName${expenseIndex}`} data-expense-id={expenseIndex} onChange={expenseNameChangeHandler} defaultValue={expense.Name} />
                            <span>(Total payments: {currencyFormatter.format(expense.TotalPayments)})</span>
                            <button onClick={() => confirm('Are you sure you want to delete this expense?') && removeExpenseHandler(expenseIndex)}>Delete</button>
                        </summary>
                        <section className="payments">
                            {expense.PeriodicPayments.map((thisPayment, paymentIndex) => {
                                const thisKey = `e${expenseIndex}_p${paymentIndex}`;
                                return (<div class="payment" key={thisKey}>
                                    <label>
                                        {expenseCollection.PeriodNames[paymentIndex]}
                                        <input type="number" min='0' step='0.01' id={thisKey} data-expense-id={expenseIndex} data-payment-id={paymentIndex} onChange={paymentChangeHandler} defaultValue={thisPayment} />
                                    </label>
                                    </div>);
                            })}
                        </section>
                    </details>
                ))}
                <button onClick={addNewExpenseHandler}>Add expense</button>
            </section>
            {resultsModel && resultsModel.SavingsRequiredPerPeriod > 0 && <section className='results'>
                <hr />
                <h3>Results:</h3>
                <p>You should save {currencyFormatter.format(resultsModel.SavingsRequiredPerPeriod)} per {expenseCollection.PeriodNames.length == 12 && expenseCollection.PeriodNames[0].toLowerCase().startsWith('jan') ? 'month' : 'period'}.</p>
                {resultsModel.BiggestShortfall < -0.00001 && <p>To ensure that you won&apos;t overdraw your escrow account, you need a starting balance of {currencyFormatter.format(-resultsModel.BiggestShortfall)}.</p>}
                {resultsModel && resultsModel.BalanceByPeriod && resultsModel.BalanceByPeriod.length > 0 && (<section className="results">
                    <details>
                        <summary>View running balance</summary>
                        <div className="running-balance">
                            {resultsModel.BalanceByPeriod.map((balanceByPeriod, i) => (
                                <div key={`bal${i}`}>
                                    {expenseCollection.PeriodNames[i]}: {currencyFormatter.format(balanceByPeriod - resultsModel.BiggestShortfall)}
                                </div>)
                            )}
                        </div>
                    </details>
                </section>)}
              </section>}
        </article>
    );
}
let currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });