import React from 'react'
import './PlanCard.css'
import { ReactComponent as Rupee } from '../../../assets/images/rupee.svg'

function PlanCard({ plan, price, desc, setPlan }) {
    return (
        <div className='planCard'>
            <div className='CardContent'>
                <div className='cardHead'>
                    <h3>two day pass</h3>
                    <h4>{plan}</h4>
                    <div className='price'>
                        <Rupee className='rupee' />
                        <h2>{price}</h2>
                    </div>
                    <hr />
                </div>
                <div className='cardFooter'>
                    <div className='desc'>{desc}</div>
                    <button
                        type='submit'
                        className='submit'
                        onClick={(e) => {
                            e.preventDefault()
                            setPlan(plan)
                        }}
                    >
                        <p>{plan === 'excl. food pass' ? 'No food for me (:' : 'Select'}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlanCard
