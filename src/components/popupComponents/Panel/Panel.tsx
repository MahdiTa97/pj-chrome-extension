import React from 'react';
import { Text } from '../../ui';
import { DropDown } from '../';
import cn from 'classnames';

interface Props {
  logoutHandler: Function;
  profile?: Profile;
  className?: string;
}

const Panel = (props: Props) => {
  const { logoutHandler, profile, className } = props;
  const rootCn = cn('navbar bg-slate-800', className);

  return (
    <div className={rootCn}>
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
