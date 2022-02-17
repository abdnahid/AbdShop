import React from 'react'

const Payment = () => {
  return (
    <div>
        <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input type="text" className="form-control" id="cc-name" required />
                <small className="text-muted">Full name as displayed on card</small>
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input type="text" className="form-control" id="cc-number" required />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input type="text" className="form-control" id="cc-expiration" required />
            </div>
            <div className="col-md-6 mb-3">
                        <label htmlFor="cc-cvv">CVV</label>
                        <input type="text" className="form-control" id="cc-cvv" required />
            </div>
            <hr className="mb-4" />
        </div>
    </div>
  )
}

export default Payment