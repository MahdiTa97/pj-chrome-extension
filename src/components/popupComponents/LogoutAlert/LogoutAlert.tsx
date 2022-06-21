import React from 'react';
import { Text } from '../../ui';
import { InformationCircleIcon } from '@heroicons/react/outline';

interface Props {
  message: string;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutAlert = (props: Props) => {
  const { message, setAlert } = props;

  return (
    <div className="shadow-none alert">
      <div>
        <InformationCircleIcon className="w-6 h-6 stroke-info" />
        <div>
          <Text variant="h3" className="font-bold">
            new_message
          </Text>
          <Text className="text-xs">{message}</Text>
        </div>
      </div>
      <div className="flex-none">
        <button className="btn btn-sm" onClick={() => setAlert(false)}>
          <Text>see</Text>
        </button>
      </div>
    </div>
  );
};

export default LogoutAlert;
