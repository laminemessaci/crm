import moment from "moment/moment.js";

/**
 * Formats a given string into a date with the format "DD/MM/YYYY".
 *
 * @param {string} str - The string to be formatted into a date.
 * @return {string} The formatted date in the format "DD/MM/YYYY".
 */
export function formatDate(str) {
  return moment(str).format("DD/MM/YYYY");
}

/**
 * Generates an animation for the error page.
 *
 * @return {void} This function does not return a value.
 */
export const errorsPageAnimation = () => {
  var loop1,
    loop2,
    loop3,
    time = 30,
    i = 0,
    number,
    selector3 = document.querySelector(".thirdDigit"),
    selector2 = document.querySelector(".secondDigit"),
    selector1 = document.querySelector(".firstDigit");
  loop3 = setInterval(function () {
    "use strict";
    if (i > 40) {
      clearInterval(loop3);
      selector3.textContent = 4;
    } else {
      selector3.textContent = randomNum();
      i++;
    }
  }, time);
  loop2 = setInterval(function () {
    "use strict";
    if (i > 80) {
      clearInterval(loop2);
      selector2.textContent = 0;
    } else {
      selector2.textContent = randomNum();
      i++;
    }
  }, time);
  loop1 = setInterval(function () {
    "use strict";
    if (i > 100) {
      clearInterval(loop1);
      selector1.textContent = 4;
    } else {
      selector1.textContent = randomNum();
      i++;
    }
  }, time);
};
function randomNum() {
  "use strict";
  return Math.floor(Math.random() * 9) + 1;
}
