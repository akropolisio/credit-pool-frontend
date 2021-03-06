import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => {
    const crossRowBorderStyleForFirstCell = {
      borderImage: `linear-gradient(to right, transparent 50px, ${theme.colors.jaguar} 50px) 1 / 0 0 1 0`,
      border: '1px solid',
    };

    const crossRowBorderStyleForLastCell = {
      borderImage: `linear-gradient(to right, ${theme.colors.jaguar} calc(100% - 50px), transparent calc(100% - 50px)) 1 / 0 0 1 0`,
      border: '1px solid',
    };

    const crossRowBorder = `1px solid ${theme.colors.jaguar}`;

    return {
      root: {
        width: '100%',
        borderSpacing: 0,

        '& tr:not($subtableRow) + $subtableRow $cell': {
          paddingTop: 30,
        },

        '& $cell:first-child': {
          paddingLeft: 0,
        },
        '& $cell:last-child': {
          paddingRight: 0,
        },
      },

      withOuterPadding: {
        '& $cell:first-child': {
          paddingLeft: 50,
        },
        '& $cell:last-child': {
          paddingRight: 50,
        },

        '& $topLevelTitle': {
          '&:first-child': crossRowBorderStyleForFirstCell,
          '&:last-child': crossRowBorderStyleForLastCell,
        },
      },

      withStripes: {
        '& tr:not($rowWithExpandedContent):not(:last-child) $cellData': {
          borderBottom: crossRowBorder,
        },

        '&$withOuterPadding tr:not($rowWithExpandedContent):not(:last-child) $cellData': {
          '&:first-child': crossRowBorderStyleForFirstCell,
          '&:last-child': crossRowBorderStyleForLastCell,
        },
      },

      cell: {},

      title: {
        textAlign: 'left',
        fontWeight: 'normal',
        padding: '0 10px 20px',
      },

      cellAlignLeft: {
        textAlign: 'left',
      },

      cellAlignRight: {
        textAlign: 'right',
      },

      cellAlignCenter: {
        textAlign: 'center',
      },

      topLevelTitle: {
        borderBottom: crossRowBorder,
      },

      subtableRow: {
        backgroundColor: theme.colors.jaguar,
      },

      lastSubtableRow: {
        '& $cell': {
          paddingBottom: 30,
        },
      },

      cellData: {
        fontWeight: 300,
        padding: '26px 10px',
      },

      singleCellExpandedArea: {
        padding: '32px 50px 23px',
        backgroundColor: theme.colors.jaguar,
      },

      summaryCell: {
        paddingTop: 30,
      },

      rowBeforeSummary: {
        '&:not($rowWithExpandedContent) $cell': {
          borderBottom: crossRowBorder,

          '&:first-child': crossRowBorderStyleForFirstCell,
          '&:last-child': crossRowBorderStyleForLastCell,
        },
      },

      rowWithExpandedContent: {},
    };
  },
  { name: 'Table' },
);
