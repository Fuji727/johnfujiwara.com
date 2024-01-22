class PeriodicExpensesInputModel
{
    constructor(periodNamesArray)
    {
        this.PeriodNames = periodNamesArray;
        this.NumberOfPeriods = periodNamesArray.length;
        this.Expenses = [];
    }
}
class ExpenseModel
{
    constructor(expenseName, periodicExpenseArray)
    {
        this.Name = expenseName;
        this.Payments = periodicExpenseArray;
    }
}
export { PeriodicExpensesInputModel, ExpenseModel };
