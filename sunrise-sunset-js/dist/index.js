"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var DEFAULT_ZENITH=90.8333,DEGREES_PER_HOUR=15,MSEC_IN_HOUR=36e5;function getDayOfYear(e){return Math.ceil((e.getTime()-new Date(e.getFullYear(),0,1).getTime())/864e5)}function sinDeg(e){return Math.sin(2*e*Math.PI/360)}function acosDeg(e){return 360*Math.acos(e)/(2*Math.PI)}function asinDeg(e){return 360*Math.asin(e)/(2*Math.PI)}function tanDeg(e){return Math.tan(2*e*Math.PI/360)}function cosDeg(e){return Math.cos(2*e*Math.PI/360)}function mod(e,t){var n=e%t;return n<0?n+t:n}function calculate(e,t,n,a,r){var o,u=getDayOfYear(r),g=t/DEGREES_PER_HOUR,D=n?u+(6-g)/24:u+(18-g)/24,i=.9856*D-3.289,s=mod(i+1.916*sinDeg(i)+.02*sinDeg(2*i)+282.634,360),c=.91764*tanDeg(s);o=mod(o=360/(2*Math.PI)*Math.atan(c),360),o+=90*Math.floor(s/90)-90*Math.floor(o/90),o/=DEGREES_PER_HOUR;var E=.39782*sinDeg(s),M=cosDeg(asinDeg(E)),_=(cosDeg(a)-E*sinDeg(e))/(M*cosDeg(e)),h=mod((n?360-acosDeg(_):acosDeg(_))/DEGREES_PER_HOUR+o-.06571*D-6.622-t/DEGREES_PER_HOUR,24),l=new Date(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),0);return new Date(l.getTime()+h*MSEC_IN_HOUR)}function getSunrise(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new Date;return calculate(e,t,!0,DEFAULT_ZENITH,n)}function getSunset(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new Date;return calculate(e,t,!1,DEFAULT_ZENITH,n)}exports.getSunrise=getSunrise,exports.getSunset=getSunset;
