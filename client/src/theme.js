import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1DA1F2',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#EF7E02',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});