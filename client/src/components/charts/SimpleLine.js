import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';

const data = [
  {
    year: '12:11AM',
    tvNews: 19,
    church: 29,
    military: 32,
  },
  {
    year: '12:12AM',
    tvNews: 13,
    church: 32,
    military: 33,
  },
  {
    year: '12:13AM',
    tvNews: 14,
    church: 35,
    military: 30,
  },
  {
    year: '12:14AM',
    tvNews: 13,
    church: 32,
    military: 34,
  },
  {
    year: '12:15AM',
    tvNews: 15,
    church: 28,
    military: 32,
  },
  {
    year: '12:16AM',
    tvNews: 16,
    church: 27,
    military: 48,
  },
  {
    year: '12:17AM',
    tvNews: 12,
    church: 28,
    military: 41,
  },
  {
    year: '12:18AM',
    tvNews: 11,
    church: 26,
    military: 45,
  },
];

const TooltipContent = (props) => {
  const { targetItem, text, ...restProps } = props;

  const tooltipContentTitleStyle = {
    fontWeight: 'bold',
    paddingBottom: 0,
  };
  const tooltipContentBodyStyle = {
    paddingTop: 0,
  };

  return (
    <div>
      <div>
        <Tooltip.Content {...restProps} style={tooltipContentTitleStyle} text={targetItem.series} />
      </div>
      <div>
        <Tooltip.Content {...restProps} style={tooltipContentBodyStyle} text={text} />
      </div>
    </div>
  );
};

const format = () => (tick) => tick;

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = (theme) => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);

const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);

const ValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}%`} />;
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title}/>
));

export default function ChartSimple() {
  const [tooltipTarget, setTooltipTarget] = React.useState(null);

  const changeTooltip = (targeItem) => {
    setTooltipTarget(targeItem);
  };

  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis tickFormat={format} />
        <ValueAxis max={50} labelComponent={ValueLabel} />
        <LineSeries name="Small" valueField="tvNews" argumentField="year" />
        <LineSeries name="Medium" valueField="church" argumentField="year" />
        <LineSeries name="Large" valueField="military" argumentField="year" />
        <Legend
          position="bottom"
          rootComponent={Root}
          itemComponent={Item}
          labelComponent={Label}
        />
        <Title
          text={`Параметры флотации ${new Date().toLocaleDateString()} ${'\n'}(по размеру пену)`}
          textComponent={TitleText}
        />
        <EventTracker />
        <Tooltip
          targetItem={tooltipTarget}
          onTargetItemChange={changeTooltip}
          contentComponent={TooltipContent}
        />
        <Animation />
      </Chart>
    </Paper>
  );
}
