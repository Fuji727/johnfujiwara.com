'use client';
import React from 'react';
import { ExpenseCollectionModel } from './ExpenseCollectionModel.js';
import CashFlowCalculator from './CashFlowCalculator.js';
import CashFlow from './cashflow.js';

// export const metadata = {
//     title: 'Basic Cash Flow tool in React',
//     description: 'cash flow, tool, React',
//   }
  
  export default function Home() {
    const STORAGE_KEY = 'cashflow object';
    const [expenseCollection, setExpenseCollection] = React.useState(null);
    const [results, setResults] = React.useState(null);
    let isInitialPageLoad = true;

    React.useEffect(() => {
      if (isInitialPageLoad)
      {
        const storedString = localStorage.getItem(STORAGE_KEY);
        let obj = new ExpenseCollectionModel();
        obj.AddExpense();
        if (storedString)
        {
          const test = JSON.parse(storedString);
          obj = new ExpenseCollectionModel(test.PeriodNames, test.Expenses);
        }
        setExpenseCollection(obj);
        _updateResults(obj);
        isInitialPageLoad = false;
      }
    }, []);

    function onChangeHandler(expenseCollectionModel)
    {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenseCollectionModel));
      _updateResults(expenseCollectionModel);
    }
    function _updateResults(expenseCollection)
    {
      if (expenseCollection)
      {
        const cashFlowCalculator = new CashFlowCalculator(expenseCollection);
        setResults(cashFlowCalculator.Results);
      }
    }

    return (
      <>
        <h1>Cash Flow Tool</h1>
        <h2>Built in React and Javascript</h2>
        <h3 className='sourceCodeList'>Source code: <a href='https://github.com/Fuji727/johnfujiwara.com/tree/main/app/demos/cashflow/page.js' target='_blank'>Next.js page</a>, <a href='https://github.com/Fuji727/johnfujiwara.com/tree/main/app/demos/cashflow/ExpenseCollectionModel.js' target='_blank'>model class</a>, <a href='https://github.com/Fuji727/johnfujiwara.com/tree/main/app/demos/cashflow/CashFlowCalculator.js' target='_blank'>calculator js</a>, and <a href='https://github.com/Fuji727/johnfujiwara.com/tree/main/app/demos/cashflow/cashflow.js' target='_blank'>React component</a></h3>
        {
          !expenseCollection ?
            <p><strong>Loading...</strong></p>
            :
            <>
              <p>This tool tells you exactly how much money you need to set aside each month in order to cover 
                irregularly-scheduled bills. Think of it as your own personal escrow account plan.
              </p>
              <p>It will also tell you exactly how much you need to have in the bank at the begining of the year, 
                if your plan would otherwise overdraw your account at some point during the year.
                (Don&apos;t worry, the plan will ensure that same amount will be in your account at the end of the year, 
                so you&apos;ll be ready for next years&apos; payments.)</p>
              <h3>Instructions:</h3>
              <ol>
                <li>All the cells in the table body are editable (any characters other than digits and periods are ignored)</li>
                <li>Results are updated immediately</li>
                <li>In the first column of the table, give the expense a name</li>
                <li>Enter the amount that is due in each month</li>
                <li>You can remove any unwanted expense rows with the corresponding &ldquo;Delete&rdquo; button</li>
                <li>If you have more expenses that you want to track, click the &ldquo;Add expense&rdquo; button</li>
              </ol>
              <CashFlow expenseCollectionModel={expenseCollection} resultsModel={results} onChange={onChangeHandler} nameTransformFunction={n => n.substring(0,3)} />
            </>
        }
      </>
      )
  }
  