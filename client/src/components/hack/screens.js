import React from 'react';
import {Grid, GridTop, GridContent} from './Grid';
import Chart from '../charts/SimpleLine';

export const A1 = () => {
  
  return (
    <Grid>
      <GridTop>top1</GridTop>
      <GridContent>
        {Array(1000)
          .fill('')
          .map((item) => (
            <p>1sss1</p>
          ))}
      </GridContent>
    </Grid>
  );
};
export const A2 = () => {
  return (
    <Grid>
      <GridTop>top2</GridTop>
      <GridContent>
        <p>hey</p>
        <p>hey</p>
        <p>hey</p>
        <p>hey</p>
        <Chart />
      </GridContent>
    </Grid>
  );
};
export const A3 = () => {
  return (
    <Grid>
      <GridTop>top13</GridTop>
      <GridContent>
        {Array(1000)
          .fill('')
          .map((item) => (
            <p>1sss13</p>
          ))}
      </GridContent>
    </Grid>
  );
};
export const A4 = () => {
  return (
    <Grid>
      <GridTop>top14</GridTop>
      <GridContent>
        {Array(1000)
          .fill('')
          .map((item) => (
            <p>1sss14</p>
          ))}
      </GridContent>
    </Grid>
  );
};
export const A5 = () => {
  return (
    <Grid>
      <GridTop>top15</GridTop>
      <GridContent>
        {Array(1000)
          .fill('')
          .map((item) => (
            <p>1sss15</p>
          ))}
      </GridContent>
    </Grid>
  );
};
export const A6 = () => {
  return (
    <Grid>
      <GridTop>top16</GridTop>
      <GridContent>
        {Array(1000)
          .fill('')
          .map((item) => (
            <p>1sss16</p>
          ))}
      </GridContent>
    </Grid>
  );
};