class CashFlowPlanModel
{
    constructor(numberOfPeriods)
    {
        this.StartingBalanceRequired = 0;
        this.PeriodicSavingsRequired = 0;
        this.RunningSavings = Array(numberOfPeriods).fill(0);
        this.RunningExpenses = Array(numberOfPeriods).fill(0);
        this.RunningEscrowBalance = Array(numberOfPeriods).fill(0);
    }
}