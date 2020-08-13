import React from 'react'

const LoadingAnimation = () => {
    return (
        <div className="spinnerDiv">
            <div className="spinnerText">Loading Map..</div>
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </div>
    )
}
export default LoadingAnimation