'use client';
import React from 'react';
import { CashFlowModel, ParseCashFlowModel, MonthNames } from '@/app/demos/cashflow/CashFlowModels';
import CashFlow from './cashflow.js';

// export const metadata = {
//     title: 'Basic Cash Flow tool in React',
//     description: 'cash flow, tool, React',
//   }
  
  export default function Home() {
    const STORAGE_KEY = 'cashflow object';
    const [cashFlowModel, setCashFlowModel] = React.useState(null);
    const [ savingsRequiredPerPeriod, setSavingsRequiredPerPeriod ] = React.useState(0);
    let isInitialPageLoad = true;

    React.useEffect(() => {
      if (isInitialPageLoad)
      {
        const test = localStorage.getItem(STORAGE_KEY);
        let obj = ParseCashFlowModel(test);
        if (!obj)
        {
          obj = new CashFlowModel(MonthNames);
        }
        console.log(obj);
        setCashFlowModel(obj);
        setSavingsRequiredPerPeriod(obj.Results.SavingsRequiredPerPeriod);
        isInitialPageLoad = false;
      }
    }, []);

    function saveCashFlowModelToLocalStorage()
    {
      cashFlowModel.UpdateResults();
      setSavingsRequiredPerPeriod(cashFlowModel.Results.SavingsRequiredPerPeriod);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cashFlowModel));
    }

    return (
      <>
        <h1>Cash Flow Tool</h1>
        <h2>Basic cash flow tool, built in React.</h2>
        {
          !cashFlowModel ?
            <p><strong>Loading...</strong></p>
            :
            <>
              <p>This tool tells you exactly how much money you need to set aside each month in order to cover 
                your bills. It can be hard to prepare for upcoming large bills that are not charged monthly, and 
                this tool can help.
              </p>
              <p>In the first row of the table, give the expense a name. Then, enter the amount that is due in each month.</p>
              <p>If you have more expenses you want to track, just click the "Add new expense" button and repeat.</p>
              <CashFlow cashFlowModel={cashFlowModel} labelAdjustment={label => label.substring(0,3)} />
              <button onClick={saveCashFlowModelToLocalStorage}>Save</button>
              <hr />
              <h3>Results:</h3>
              <p>You should save ${savingsRequiredPerPeriod} per period.</p>
            </>
        }
      </>
      )
  }
  