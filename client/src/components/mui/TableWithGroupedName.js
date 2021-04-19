import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, IconButton} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import {Typography} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '44px',
    cursor: 'pointer'
  },
  groupInfo: {
    padding: '5px',
    backgroundColor: 'green',
    color: '#fff'
  },
  controls: {
    flex: 1,
    textAlign: 'right'
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { studio_name: name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DenseTable({data, onUngroup}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">        
        <TableBody>  

            <TableRow key={data[0].id} hover >
              <TableCell component="th" scope="row" className={classes.item}>
                <Typography variant="h6" >{data[0].group_name}</Typography>
                {data.map((each)=><div className={classes.groupInfo}>
                  <span>  {each.studio_name}  </span>
                </div>)}

                <div className={classes.controls}>
                    <IconButton aria-label="linkoff" onClick={()=>onUngroup(data)}>
                      <LinkOffIcon/>
                    </IconButton>
                    
                  </div>
              </TableCell>
              
            </TableRow>

          {/* {data.map((row) => (
            <TableRow key={row.name} hover >
              <TableCell component="th" scope="row">
                <Typography variant="h6" className={classes.item}>GroupName here</Typography>
              </TableCell>
              
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
