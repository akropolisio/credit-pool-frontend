import * as React from 'react';
import { GetProps } from '_helpers';
import SvgIcon from '@material-ui/core/SvgIcon';

// tslint:disable:max-line-length
function TwitterIcon(props: GetProps<typeof SvgIcon>) {
  const { classes, ...rest } = props;
  return (
    <SvgIcon {...rest} viewBox="0 0 30 24">
      <path
        fill="#1da1f2"
        d="M30,2.84733693 C28.909393,3.31971713 27.7226607,3.64492359 26.4700647,3.80752683 C27.7547024,3.04317294 28.7301964,1.87112408 29.1870884,0.439147421 C27.9991693,1.13881608 26.6652821,1.64324217 25.2661247,1.91978636 C24.1583101,0.732307997 22.5491011,0 20.7595087,0 C17.3755414,0 14.6092684,2.71737303 14.6092684,6.05251966 C14.6092684,6.5409228 14.6911529,6.99668661 14.788465,7.43642748 C9.66415475,7.19192918 5.12431021,4.78373968 2.09814276,1.10617675 C1.57776064,2.01770437 1.25259598,3.04317294 1.25259598,4.14934969 C1.25259598,6.26437862 2.35863051,8.11947975 3.98504717,9.1936106 C2.97691806,9.17699421 2.03287249,8.90045003 1.20393995,8.44468622 C1.20393995,8.47732555 1.20393995,8.49394194 1.20393995,8.52598783 C1.20393995,9.30695811 1.35050139,10.0232432 1.62641666,10.7062954 C2.37524476,12.6106523 4.08354596,14.0420355 6.15024031,14.449137 C5.6120572,14.5957173 5.09167507,14.6764255 4.52263692,14.6764255 C4.13220198,14.6764255 3.74176704,14.6277632 3.36675963,14.5464616 C4.16483712,16.9546511 6.42556221,18.7118342 9.11113748,18.7771129 C6.99519373,20.4043321 4.36005459,21.364522 1.48044858,21.364522 C0.975493977,21.364522 0.504361241,21.3312893 0,21.282627 C2.73304456,22.9917413 5.97045036,24 9.43630214,24 C19.0512075,24 24.9896161,17.3451362 26.5341482,10.4297512 C26.8118436,9.1936106 26.9411974,7.97289946 26.9411974,6.76880471 C26.9411974,6.50828347 26.9411974,6.23233272 26.9411974,5.98783443 C28.1291165,5.12556253 29.1870884,4.05143168 30,2.84733693"
      />
    </SvgIcon>
  );
}

export { TwitterIcon };
