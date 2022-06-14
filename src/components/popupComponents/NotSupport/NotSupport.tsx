import React from 'react';
import { Text } from '../../ui';

const NotSupport = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 space-y-5">
        <Text variant="h2">not_support_message</Text>
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
    </>
  );
};

export default NotSupport;
