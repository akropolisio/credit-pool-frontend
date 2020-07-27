import { Theme, makeStyles, lighten, rgba } from 'utils/styles';

export const useStyles = makeStyles(
  (theme: Theme) => {
    return {
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.25rem',
        textAlign: 'center',
        transition: theme.transitions.create('background-color'),

        '&$isSmall': {
          padding: theme.spacing(0.5, 1.5),
          minHeight: theme.spacing(4),
        },

        '&$isMedium': {
          padding: theme.spacing(1.5, 3),
          minHeight: theme.spacing(6),
        },

        '&$colorDefault': {
          color: theme.palette.text.secondary,
          backgroundColor: rgba(theme.palette.background.hint, 0.5),
        },

        '&$colorError': {
          color: theme.palette.error.main,
          backgroundColor: lighten(theme.palette.error.main, 0.8),
        },

        '&$withOverlay': {
          position: 'absolute',
          top: -8,
          bottom: -8,
          left: -8,
          right: -8,
          zIndex: 1,
          overflow: 'hidden',
        },
      },

      isSmall: {},
      isMedium: {},

      colorDefault: {},
      colorError: {},

      withOverlay: {},
    };
  },
  { name: 'Hint' },
);
