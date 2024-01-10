import CashFlow from '../../src/cashflow.js';

// export const metadata = {
//     title: 'Basic Cash Flow tool in React',
//     description: 'cash flow, tool, React',
//   }
  async function shortenLabelToThree(label)
  {
    'use server';
    return label.substring(0,3);
  }
  
  export default function Home() {
    return (
      <>
        <h1>Cash Flow Tool</h1>
        <p>Basic cash flow tool, built in React.</p>
        <CashFlow labelAdjustment={shortenLabelToThree} />
      </>
      )
  }
  