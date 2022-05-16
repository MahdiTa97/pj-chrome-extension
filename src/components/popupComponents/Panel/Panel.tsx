import React from 'react';
import { Text } from '../../ui';
import { DropDown } from '../';

interface Props {
  logoutHandler: Function;
  profile: Profile;
}

const Panel = (props: Props) => {
  const { logoutHandler, profile } = props;
  return (
    <div className="navbar bg-slate-800">
      <div className="flex-1 space-x-3 space-x-reverse">
        <div className="w-6 rounded-full">
          <img src="32x32.png" alt="Profile" />
        </div>
        <div>
          <Text variant="h3" className="text-white">
            app_name
          </Text>
        </div>
      </div>
      <div>
        <DropDown profile={profile} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Panel;
