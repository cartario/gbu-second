import React from 'react';
import classNames from 'classnames';
import { sayWelcome } from '../utils';

const SayHello = () => {
  const dayStatus = sayWelcome();

  return (
    <div
      className={classNames({
        'helloBlock' : true,
        'helloBlock--morning': dayStatus.status === 1,
        'helloBlock--day': dayStatus.status === 2,
        'helloBlock--evening': dayStatus.status === 3,
        'helloBlock--night': dayStatus.status === 0,
      })}
    >
      <h2>
        <span>{dayStatus.name}</span>
      </h2>
    </div>
  );
};

export default SayHello;
