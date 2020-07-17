import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function MediumIcon(props: React.ComponentProps<typeof SvgIcon>) {
  const { classes, ...rest } = props;
  return (
    <SvgIcon {...rest} viewBox="0 0 24 19" xmlSpace="preserve">
      <path
        fill="#5a5a5a"
        d="M24,2.80002664 L23.0507812,2.80002664 C22.698375,2.80002664 22.2,3.30843206 22.2,3.63383777 L22.2,15.4300059 C22.2,15.7557866 22.698375,16.1999734 23.0507812,16.1999734 L24,16.1999734 L24,19 L15.4000312,19 L15.4000312,16.1999734 L17.2000312,16.1999734 L17.2000312,3.7999625 L17.1118125,3.7999625 L12.9084375,19 L9.6541875,19 L5.505,3.7999625 L5.4,3.7999625 L5.4,16.1999734 L7.2,16.1999734 L7.2,19 L0,19 L0,16.1999734 L0.92203125,16.1999734 C1.301625,16.1999734 1.8,15.7557866 1.8,15.4300059 L1.8,3.63374402 C1.8,3.30833831 1.301625,2.79993289 0.92203125,2.79993289 L0,2.79993289 L0,0 L9.0031875,0 L11.959125,10.9999507 L12.0406875,10.9999507 L15.0237187,0 L24,0 L24,2.80002664"
      />
    </SvgIcon>
  );
}

export { MediumIcon };
