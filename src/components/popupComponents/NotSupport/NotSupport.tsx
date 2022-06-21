import React from 'react';
import { Text } from '../../ui';
import { InformationCircleIcon } from '@heroicons/react/outline';

const NotSupport = () => (
  <div className="flex flex-col items-center justify-center p-5 space-y-5">
    <div className="flex flex-row items-center justify-center alert shadow-none space-y-0 bg-white">
      <Text variant="h4">not_support_message</Text>
      <InformationCircleIcon className="w-6 h-6" />
    </div>
    <button
      className="btn btn-warning btn-block"
      onClick={() =>
        chrome.tabs.create({
          url: 'https://pajoohyar.ir/contact',
        })
      }
    >
      <Text variant="p">not_support_report</Text>
    </button>
  </div>
);

export default NotSupport;
