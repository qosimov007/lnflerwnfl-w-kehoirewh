import React from "react";

function Order() {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Order summary</h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-primary font-bold">
                Promo Code
              </span>
            </div>
            <div className="flex justify-between mb-7">
              <div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div>
                <button className="btn btn-primary">Apply</button>
              </div>
            </div>
          </label>
          <div className="border-t">
            <div className="flex justify-between items-center mt-5 border-b pb-5">
              <div>
                <p className="text-primary font-semibold ">Item: 1</p>
              </div>
              <div>
                <p className="text-primary font-semibold">Rp: 149.995</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2  pb-3 border-b ">
              <div>
                <p className="text-primary font-semibold text-sm">subtotal</p>
              </div>
              <div>
                <p className="text-primary font-semibold text-sm">
                  Rp: 149.995
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 ">
              <div>
                <p className="text-primary font-semibold text-sm">Total</p>
              </div>
              <div>
                <p className="text-primary font-semibold text-sm">
                  Rp: 149.995
                </p>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-primary w-full mt-10">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
