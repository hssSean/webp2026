import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const MultiButton = (num) => {
  var output = [];
  output.push(
    <IconButton color="primary" aria-label="add to shopping cart" key="cart">
      <AddShoppingCartIcon />
    </IconButton>
  );
  output.push(
    <IconButton color="primary" aria-label="delete" key="delete">
      <DeleteIcon />
    </IconButton>
  );
  output.push(
    <IconButton color="primary" aria-label="add an alarm" key="alarm">
      <AlarmIcon />
    </IconButton>
  );
  return output;
}

export default MultiButton;