import React from 'react';
import Linechart from '../components/Linechart';
import SpendingBreakdown from '../components/Piechart';
import SummaryCards from '../components/Summarycards';
import useStore from '../store/usestore';


const Dashboard=() => {
    const { theme } = useStore();
    return (
        <>
        <div className={`text-2xl font-bold ${theme==='dark' ? 'text-white' : 'text-slate-900'}`}>Dashboard Content</div>
        <div className={`text-sm text-slate-500 mb-6 ${theme==='dark' ? 'text-slate-400' : 'text-slate-500'}`}>Overview of your financial health</div>
          <div className="flex flex-col lg:flex-row gap-8">
        <Linechart/>  
        <SpendingBreakdown/>
    </div>
        <div><SummaryCards/></div>
      
        </>
    );
}   
export default Dashboard;