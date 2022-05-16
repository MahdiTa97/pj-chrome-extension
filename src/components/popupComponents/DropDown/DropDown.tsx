import React from 'react';
import { Text } from '../../ui';

interface DropDownProps {
  logoutHandler: Function;
  profile: Profile;
}
const DropDown = ({ logoutHandler, profile }: DropDownProps) => (
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
      <div className="w-6 rounded-full bg-neutral-focus text-neutral-content">
        <img src={profile.avatar} alt="Profile" />
      </div>
    </label>
    <ul
      tabIndex={0}
      className="w-40 p-2 mt-3 shadow-lg menu menu-compact dropdown-content shadow-slate-500 bg-base-100 rounded-box"
    >
      <li className="select-disabled text-slate-500">
        <Text variant="p">{profile.username}</Text>
      </li>
      <li className="hover-bordered">
        <Text variant="p" className="text-slate-900">
          settings
        </Text>
      </li>
      <li onClick={() => logoutHandler()} className="hover-bordered">
        <Text variant="p" className="text-slate-900">
          logout
        </Text>
      </li>
    </ul>
  </div>
);

export default DropDown;
