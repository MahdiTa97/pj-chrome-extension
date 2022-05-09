import React from 'react';
import { CogIcon } from '@heroicons/react/outline';
import { Text } from '../../ui';

const Panel = () => {
  return (
    <div className="navbar bg-slate-800">
      <div className="flex-1">
        <Text variant="h2">app_name</Text>
      </div>
      <div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <CogIcon className="h-6 w-6 text-blue-500" />
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="bg-neutral-focus text-neutral-content rounded-full w-6">
              <span>M</span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/" className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a href="/">Settings</a>
            </li>
            <li>
              <a href="/">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <div className="card h-full w-96 bg-slate-800 text-primary-content rounded-none">
    //   <div className="card-body">
    //     <Text variant="h2" className="card-title">
    //       app_name
    //     </Text>
    //     <Text variant="p">welcome</Text>
    //   </div>
    // </div>
  );
};

export default Panel;
