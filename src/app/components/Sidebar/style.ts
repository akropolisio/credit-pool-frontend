import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    padding: '100px 20px 20px 20px',
    background: theme.colors.charade,
    justifyContent: 'space-between',
    width: '180px',
    transition: 'width 200ms',
  },

  upperPart: {},
  lowerPart: {
    display: 'flex',
    flexDirection: 'column',
  },
  upperLinks: {},

  rootShort: {
    width: '64px',
  },

  lowerLinks: {},

  switch: {
    marginTop: '16px',
    marginBottom: '20px',
    padding: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-end',

    '& path': {
      opacity: 0.5,
    },

    '&:hover path': {
      opacity: 1,
    },
  },

  switchInverted: {
    transform: 'rotate(180deg)',
  }
}), { name: 'sidebar' });
