import React from 'react';
import fire from './public/secrets';

export default () => {
  const content = JSON.stringify(this.state.screenplay, null, 3)
    //, changedFire = JSON.stringify(this.state.screenplay.key, null, 3);

  return (
    <div>
      <h1> 🔥 Ready.Guang bb go </h1>
      <h2>{content}</h2>
      <p>🔥{}🔥</p>
    </div>
  );
};
