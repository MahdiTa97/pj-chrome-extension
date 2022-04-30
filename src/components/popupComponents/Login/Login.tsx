import React from 'react';
import { Text } from '../../ui';

const Login = () => (
  <div
    className="card w-96 bg-slate-800 text-primary-content rounded-none"
    dir="rtl"
  >
    <div className="card-body">
      <Text variant="h2" className="card-title">
        app_name
      </Text>
      <Text variant="p">login_message</Text>
      <div className="card-actions justify-end">
        <div className="card-body">
          <button className="btn btn-primary">
            <Text variant="p">login</Text>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
