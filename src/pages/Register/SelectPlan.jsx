import React, { useContext, useEffect } from 'react'
import planHeader from '../../assets/images/planheader.png'
import { AppContext } from '../../context/AppContext';
import PlanCard from './components/PlanCard'
import './SelectPlan.css'

function SelectPlan({setPlan}) {
  const {store, actions} = useContext(AppContext);

  useEffect(() => {
		actions?.setBackgroundColor('#1a1a1a');
    }, [])

  return (
    <div className='selectPlan'>
        <img className='planHeader' src={planHeader} alt="head" />
        <h4>grab your tickets now ↓</h4>
        <div className="planCardsContainer">
            <div className="planCardsWrapper">
                <PlanCard plan='excl. food pass' price='150' desc={<p>you may plan your food arrangements accordingly </p>} setPlan={setPlan}/>
                <PlanCard plan='incl. food pass (veg)' price='250' desc={<p>food pass includes:<br/>*refreshments<br/>*veg lunch</p>} setPlan={setPlan}/>
                <PlanCard plan='incl. food pass (non)' price='300' desc={<p>food pass includes:<br/>*refreshments<br/>*non-veg lunch</p>} setPlan={setPlan}/>
            </div>
        </div>
    </div>
  )
}

export default SelectPlan