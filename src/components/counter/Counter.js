import {useState} from "react";
import CounterButton from "./CounterButton";
import * as PropTypes from "prop-types";


function ResetButton(props) {
    return null;
}

ResetButton.propTypes = {resetCounterParentFunction: PropTypes.func};
export default function Counter(){
    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by) {
        setCount(count + by);
    }
    function decrementCounterParentFunction(by) {
        setCount(count - by);
    }
    function ResetCounterParentFunction() {
        setCount(0)
    }


    return(
        <>
            <span className="totalCount">{count}</span>


            <CounterButton by={1}
                           incrementCounterParentFunction={incrementCounterParentFunction}
                           decrementCounterParentFunction={decrementCounterParentFunction}
            />
            <CounterButton by={5}
                           incrementCounterParentFunction={incrementCounterParentFunction}
                           decrementCounterParentFunction={decrementCounterParentFunction}
            />
            <CounterButton by={10}
                           incrementCounterParentFunction={incrementCounterParentFunction}
                           decrementCounterParentFunction={decrementCounterParentFunction}
            />
            <CounterButton by={100}
                           incrementCounterParentFunction={incrementCounterParentFunction}
                           decrementCounterParentFunction={decrementCounterParentFunction}
            />
            <div>
                <button
                    className="counterButton"
                    onClick={ResetCounterParentFunction}
                >
                    Reset
                </button>
            </div>

        </>
    )
}
