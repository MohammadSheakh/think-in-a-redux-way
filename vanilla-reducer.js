const array = [1, 2, 3, 4, 5];
// reduce er moddhe amake ekta function dite hoy .. reducer function ta ki .. sheta dite hoy
// array.reduce((previousResult, currentValue) => {
//     // array er prottekta value er jonno ekbar kore call hobe ..function ta ..
// }, initialValue );

console.log(
    array.reduce((previousResult, currentValue) => {
        return previousResult + currentValue;
    }, 0)
);
