import React from 'react';
import { Text } from '../../ui';

const Panel = () => {
  return (
    <div className="card h-full w-96 bg-slate-800 text-primary-content rounded-none">
      <div className="card-body">
        <Text variant="h2" className="card-title">
          app_name
        </Text>
        <Text variant="p">welcome</Text>
      </div>
    </div>
  );
};

export default Panel;
