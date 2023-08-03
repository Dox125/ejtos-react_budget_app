import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    return (
        <div className='alert alert-secondary d-flex align-items-center'>
            <span className="text-nowrap">Budget: £</span>
            <BudgetForm />
        </div>
    );
};

const BudgetForm = () => {
    const { dispatch, budget, expenses } = useContext(AppContext);

    const [currBudget, setCurrBudget] = React.useState(budget);

    const submitEvent = (e) => {
        // 
        e.preventDefault();

        if (currBudget > 20_000) {
            alert("Value cannot exceed £20 000!");
            return;
        }

        if (!currBudget || currBudget < 0) {
            setCurrBudget(0);
        }

        const totalExpenses = expenses.reduce((total, item) => {
            return (total += item.cost);
        }, 0);

        if (currBudget < totalExpenses){
            alert("You cannot reduce the budget value lower than the spending");
            return;
        }

        // 
        dispatch({
            type: "SET_BUDGET",
            payload: currBudget,
        });
    };
    return (
        <form onSubmit={submitEvent}>
            <input
                required='required'
                type='number'
                id='budget'
                value={currBudget}
                class="ms-2"
                onChange={(event) => setCurrBudget(event.target.valueAsNumber)}>
            </input>
        </form>
    )
};
export default Budget;