// src/reportWebVitals.js
import {onLCP, onINP, onCLS} from 'web-vitals';

const reportWebVitals = (onPerfEntry) => { 

  onCLS(console.log);
  onINP(console.log);
  onLCP(console.log);
};

export default reportWebVitals;