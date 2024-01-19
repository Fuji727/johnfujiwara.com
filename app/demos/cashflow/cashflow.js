import { useState } from 'react';

export default function CashFlow({cashFlowModel, labelAdjustment})
{
    let labelAdjustmentToUse = labelAdjustment || (label => label);
    //let periodsToUse = cashFlowModel.PeriodNames || MonthNames;
    let [ expenses, setExpenses ] = useState(cashFlowModel.Expenses);

    function addNewExpense()
    {
        cashFlowModel.AddExpense();
        setExpenses([...cashFlowModel.Expenses]);
    }

    return (
        <ExpenseTable expenses={expenses} periodNames={cashFlowModel.PeriodNames} labelAdjustment={labelAdjustmentToUse} addNewExpenseHandler={addNewExpense} />
    );
}
function ExpenseTable({expenses, periodNames, labelAdjustment, addNewExpenseHandler})
{
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Expense name</th>
                        {periodNames.map(p =>
                            <th key={`col_${p}`} scope="col">{labelAdjustment(p)}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {expenses && expenses.map((expense,i) => (
                        <ExpenseRow key={`expense${i+1}`} expenseId={i} expense={expense} />
                    ))}
                </tbody>
            </table>
            <button onClick={addNewExpenseHandler}>Add another expense</button>
        </>
    );
}
function ExpenseRow({expenseId, expense})
{
    function handleExpenseNameChange(event)
    {
        //console.log(event.target);
    }
    function handlePaymentChange(event)
    {
        //console.log(event.target);
    }
    return (
        <tr>
            <td><input type="text" onChange={handleExpenseNameChange} defaultValue={expense.Name} /></td>
            {expense.Payments.map((thisPayment,i) => {
                const thisKey = `e${expenseId}_p${i}`;
                return <td key={thisKey}><input type="text" onChange={handlePaymentChange} defaultValue={thisPayment} /></td>
            })}
        </tr>
    );
}