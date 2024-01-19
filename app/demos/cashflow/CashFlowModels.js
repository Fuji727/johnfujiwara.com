const MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class CashFlowModel
{
    constructor(periodNames)
    {
        this.PeriodNames = periodNames;
        this.NumberOfPeriods = this.PeriodNames.length;
        this.AddExpense();
    }
    AddExpense = function(newExpenseName)
    {
        if (!this.Expenses)
            this.Expenses = [];

        this.Expenses.push(new ExpenseModel(newExpenseName || `Expense #${this.Expenses.length + 1}`, this.NumberOfPeriods));
    }
    GetExpense = function(expenseName)
    {
        if (!this.Expenses || !expenseName)
            return null;

        return this.Expenses.find(e => e.ExpenseName == expenseName);
    }
}
class ExpenseModel
{
    constructor(name, numberOfPeriods)
    {
        this.Name = name;
        this.Payments = Array(numberOfPeriods).fill(0);
    }
}

export { MonthNames, CashFlowModel, ExpenseModel };
