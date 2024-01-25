export default class CashFlowCalculator
{
    constructor(expenseCollection)
    {
        this.ExpenseCollection = expenseCollection;
        this.GetResults();
    }
    GetResults = function()
    {
        let returnObj = {};
        returnObj.TotalExpenses = 0;
        this.ExpenseCollection.Expenses.forEach(exp => returnObj.TotalExpenses += floatOrZero(exp.PeriodicPayments.reduce((subtotal, payment) => subtotal += floatOrZero(payment), 0)));
        returnObj.SavingsRequiredPerPeriod = returnObj.TotalExpenses / this.ExpenseCollection.NumberOfPeriods;
        let savingsTotals = Array(this.ExpenseCollection.NumberOfPeriods).fill(0);
        let expenseTotals = Array(this.ExpenseCollection.NumberOfPeriods).fill(0);
        let periodBalances = Array(this.ExpenseCollection.NumberOfPeriods).fill(0);
        let totalSavings = 0;
        let totalExpenses = 0;
        this.ExpenseCollection.PeriodNames.forEach((periodName, periodIndex) => {
            totalSavings += returnObj.SavingsRequiredPerPeriod;
            savingsTotals[periodIndex] = totalSavings;
            this.ExpenseCollection.Expenses.forEach((expense, expenseIndex) => {
                expenseTotals[periodIndex] += floatOrZero(expense.PeriodicPayments[periodIndex]);
            });
            totalExpenses += expenseTotals[periodIndex];
            periodBalances[periodIndex] = totalSavings - totalExpenses;
        });
        returnObj.BalanceByPeriod = periodBalances;
        returnObj.BiggestShortfall = Math.min(...periodBalances, 0);
        returnObj.PeriodPaymentTotals = expenseTotals;

        this.Results = returnObj;
        return returnObj;
    }
}
function floatOrZero(strNumber)
{
    let cleanStrNumber = String(strNumber).replace(/[^0-9.]/g, '');
    const attempt = parseFloat(cleanStrNumber);
    return isNaN(attempt) ? 0 : attempt;
}