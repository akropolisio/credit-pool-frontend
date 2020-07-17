import { makeStyles } from 'utils/styles';

const firstCellStyle = {
  paddingLeft: '50px',
};

const lastCellStyle = {
  paddingRight: '50px',
};

const headStyle = {
  textAlign: 'left',
  padding: 0,
};

export const useStyles = makeStyles(theme => {
  const crossRowBorder = `1px solid ${theme.colors.jaguar}`;

  return {
    root: {
      width: '100%',
      borderSpacing: 0,

      '& th': headStyle,

      '& thead th': {
        paddingBottom: 0,
      },

      '& td:first-child:last-child': {
        padding: 0,
      },

      '& tbody td': {
        fontWeight: 300,
      },

      '& td': {
        padding: 0,
      },

      '& th:first-child $title': {
        marginLeft: 10,
        paddingRight: 10,
      },

      '& tr:not($subtableRow) + $subtableRow $cellContent': {
        marginTop: 20,
      },
    },

    withOuterPadding: {
      '& td:first-child': firstCellStyle,
      '& th:first-child': firstCellStyle,

      '& th:last-child': lastCellStyle,
      '& td:last-child': lastCellStyle,
    },

    withStripes: {
      '& $cellContent': {
        borderBottom: crossRowBorder,
      },
    },

    title: {
      height: 40,
      borderBottom: crossRowBorder,
      fontWeight: 'normal',
    },

    subtableRow: {
      backgroundColor: theme.colors.jaguar,
    },

    lastSubtableRow: {
      '& $cellContent': {
        marginBottom: 20,
      },
    },

    cellContent: {
      display: 'flex',
      fontWeight: 300,
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '8px',
      height: 48,
    },

    singleCellExpandedArea: {
      paddingLeft: 58,
      paddingRight: 58,
      backgroundColor: theme.colors.jaguar,
    },

    summary: {
      marginTop: 30,
      padding: '10px 58px',
    },

    rowBeforeSummary: {
      '& $cellContent': {
        borderBottom: crossRowBorder,
      },

      '& td:first-child $cellContent': {
        paddingLeft: 0,
        marginLeft: 10,
      },
    },
  };
}, { name: 'Table' });
