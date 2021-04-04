import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

function SimpleDialog(props) {  
  const { onClose, selectedValue, open, data } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <img src={data} width='100%' height='100%'/>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({data}) {
  const [open, setOpen] = React.useState(false);  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);    
  };

  return (
    <div>      
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open
      </Button>

      <SimpleDialog open={open} onClose={handleClose} data={data}/>
    </div>
  );
}
