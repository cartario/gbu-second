import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  Checkbox,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  TextField
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import GroupIcon from '@material-ui/icons/Group';
import {Input} from '../mui'

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = ({ numSelected, handleClickGroup, setGroupName, groupName}) => {
  const classes = useToolbarStyles();
  

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        ''
      )}

      {numSelected > 0 ? (<>
        <TextField 
          value={groupName}
          onChange={(e)=>setGroupName(e.target.value)}
          label='Название группы' variant="outlined" style={{width: '220px'}}/>
        <Tooltip title="Сгруппировать">
        
          <IconButton aria-label="delete" onClick={handleClickGroup} disabled={numSelected === 1 ||!groupName.length}>
            <GroupIcon />            
          </IconButton>          
        </Tooltip>
       
        </>
      ) : (
        ''
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable({ data, tableName, handleClickGroup }) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [groupName, setGroupName] = React.useState('');


  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);    
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;  

  return (
    <>
      <EnhancedTableToolbar
        numSelected={selected.length}
        groupName={groupName}
        setGroupName={setGroupName}
        handleClickGroup={() =>
          handleClickGroup(
            selected.map((each) => data.find((item) => item.name === each)),
            groupName,
          )
        }
      />

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>{tableName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.name} hover selected={isSelected(row.name)}>
                <TableCell component="th" scope="row">
                  <Checkbox
                    onClick={(e) => handleClick(e, row.name)}
                    checked={isSelected(row.name)}
                  />
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
