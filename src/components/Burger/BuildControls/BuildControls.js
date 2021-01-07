import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          addIngredient={() => props.added(ctrl.type)}
          removeIng={() => props.removed(ctrl.type)}
          key={ctrl.label}
          label={ctrl.label}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button disabled={!props.purchasable} onClick={props.ordered} className={classes.OrderButton}>
        ORDER ME
      </button>
    </div>
  );
};

export default buildControls;
