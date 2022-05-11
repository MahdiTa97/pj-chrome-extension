import React from 'react';
import { Text } from '../../ui';

interface Props {
  logoutHandler: Function;
}

const Panel = (props: Props) => {
  const { logoutHandler } = props;
  return (
    <div className="navbar bg-slate-800">
      <div className="flex-1">
        <Text variant="h3" className="text-white">
          app_name
        </Text>
      </div>
      <div>
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-slate-500 shadow-lg bg-base-100 rounded-box w-40"
          >
            <li>
              <Text variant="p" className="text-slate-900">
                settings
              </Text>
            </li>
            <li onClick={() => logoutHandler()}>
              <Text variant="p" className="text-slate-900">
                logout
              </Text>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Panel;
