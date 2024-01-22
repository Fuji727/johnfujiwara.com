const MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class CashFlowModel
{
    constructor(periodNames)
    {
        this.PeriodNames = periodNames;
        this.NumberOfPeriods = this.PeriodNames.length;
        this.Results = {};
        this.AddExpense();
        this.UpdateResults();
    }
    AddExpense = function(newExpenseName)
    {
        if (!this.Expenses)
            this.Expenses = [];

        this.Expenses.push(new ExpenseModel(newExpenseName || `Expense #${this.Expenses.length + 1}`, this.NumberOfPeriods));
    }
    UpdateExpenseName = function(expenseIndex, newExpenseName)
    {
        this.Expenses[expenseIndex].Name = newExpenseName;
    }
    UpdatePaymentAmount = function(expenseIndex, paymentIndex, newPaymentAmount)
    {
        this.Expenses[expenseIndex].Payments[paymentIndex] = newPaymentAmount;
    }
    UpdateResults = function()
    {
        this.Results.TotalExpenses = 0;
        this.Expenses.forEach(exp => this.Results.TotalExpenses += exp.Payments.reduce((subtotal, payment) => subtotal += payment));
        this.Results.SavingsRequiredPerPeriod = this.Results.TotalExpenses / this.NumberOfPeriods;
        let savingsTotals = Array(this.NumberOfPeriods).fill(0);
        let expenseTotals = Array(this.NumberOfPeriods).fill(0);
        let periodBalances = Array(this.NumberOfPeriods).fill(0);
        let totalSavings = 0;
        let totalExpenses = 0;
        this.PeriodNames.forEach((periodName, periodIndex) => {
            totalSavings += this.Results.SavingsRequiredPerPeriod;
            savingsTotals[periodIndex] = totalSavings;
            this.Expenses.forEach((expense, expenseIndex) => {
                expenseTotals[periodIndex] += expense.Payments[periodIndex];
            });
            totalExpenses += expenseTotals[periodIndex];
            periodBalances[periodIndex] = totalSavings - totalExpenses;
        });
        this.Results.BalanceByPeriod = periodBalances;
        this.Results.BiggestShortfall = Math.min(...periodBalances, 0);
        this.Results.PeriodPaymentTotals = expenseTotals;
    }
}
function ParseCashFlowModel(serializationString)
{
    let returnObj = null;
    if (serializationString)
    {
        const partialObj = JSON.parse(serializationString);
        if (partialObj && partialObj.PeriodNames)
        {
            returnObj = new CashFlowModel(partialObj.PeriodNames);
            returnObj.Expenses = [...partialObj.Expenses];
            returnObj.UpdateResults();
        }
    }
    return returnObj;
}
class ExpenseModel
{
    constructor(name, numberOfPeriods)
    {
        this.Name = name;
        this.Payments = Array(numberOfPeriods).fill(0);
    }
}

export { MonthNames, CashFlowModel, ParseCashFlowModel, ExpenseModel };
