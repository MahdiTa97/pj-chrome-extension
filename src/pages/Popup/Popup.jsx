import React from 'react';
import './Popup.css';

const Popup = () => {
  return (
    <div
      class="card w-96 bg-slate-800 text-primary-content rounded-none"
      dir="rtl"
    >
      <div class="card-body">
        <h2 class="card-title">پژوهیار</h2>
        <p>برای استفاده از افزونه ابتدا باید وارد بشوید!</p>
        <div class="card-actions justify-end">
          <div className="card-body">
            <button className="btn btn-primary">ورود</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
