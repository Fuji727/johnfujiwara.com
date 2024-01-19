'use client';

import { CashFlowModel, MonthNames } from '@/app/demos/cashflow/CashFlowModels';
import CashFlow from './cashflow.js';

// export const metadata = {
//     title: 'Basic Cash Flow tool in React',
//     description: 'cash flow, tool, React',
//   }
  
  export default function Home() {
    let cashFlowModel = new CashFlowModel(MonthNames);

    return (
      <>
        <h1>Cash Flow Tool</h1>
        <p>Basic cash flow tool, built in React.</p>
        <CashFlow cashFlowModel={cashFlowModel} labelAdjustment={label => label.substring(0,3)} />
      </>
      )
  }
  