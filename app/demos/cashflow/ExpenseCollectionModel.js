class ExpenseCollectionModel
{
    constructor(periodNamesArray = null, expensesArray = null)
    {
        this.PeriodNames = periodNamesArray || MonthNames;
        this.NumberOfPeriods = this.PeriodNames.length;
        this.Expenses = [];

        if (expensesArray)
            expensesArray.forEach(exp => this.AddExpense(exp.Name, [...exp.PeriodicPayments]));
    }
    AddExpense = function(name = null, periodicPayments = null)
    {
        this.Expenses.push(new ExpenseModel(name || 'New expense', periodicPayments || Array(this.NumberOfPeriods).fill(0)));
    }
    Clone = () => new ExpenseCollectionModel(this.PeriodNames, this.Expenses);
}
class ExpenseModel
{
    constructor(expenseName, periodicExpenseArray)
    {
        this.Name = expenseName;
        this.PeriodicPayments = periodicExpenseArray;
    }
}
const MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export { ExpenseCollectionModel, ExpenseModel, MonthNames };
