import './Counter.css'
import PropTypes from 'prop-types'



export default function CounterButton({by, incrementCounterParentFunction, decrementCounterParentFunction}) {

    return (
        <div className="Counter">
            <div>
                <button
                    className="counterButton"
                    onClick={() => incrementCounterParentFunction(by)}
                >
                    +{by}
                </button>
                <button
                    className="counterButton"
                    onClick={() => decrementCounterParentFunction(by)}
                >
                    -{by}
                </button>
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by: PropTypes.number
}

CounterButton.defaultProps = {
    by: 1
}