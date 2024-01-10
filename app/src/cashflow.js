'use client';

import React from 'react';

const MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function CashFlow({periods, labelAdjustment})
{
    const periodsToUse = periods || MonthNames;
    const labelAdjustmentToUse = labelAdjustment || (label => label)
    let [expenseCount, setExpenseCount] = React.useState(1);
    function addNewExpense()
    {
        setExpenseCount(expenseCount++);
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Expense name</th>
                        {periodsToUse.map(p =>
                            <th key={`col_${p}`} scope="col">{labelAdjustmentToUse(p)}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {Array(expenseCount).fill(null).map((a,i) => (
                        <Expense key={i} expenseName={`expense${i}`} periods={periodsToUse} />
                    ))}
                </tbody>
            </table>
            <button>Add another expense</button>
        </>
    );
}
function Expense({expenseName, periods})
{
    return (
        <tr>
            <td><input type="text" /></td>
            {periods.map((thisPeriod,i) =>
                <td key={`${expenseName}_${thisPeriod}`}><input type="text" /></td>
            )}
        </tr>
    );
}