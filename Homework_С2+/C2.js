"use strict"
function deepCopy (elem) {

let copyElem = Object.assign({},elem);

Object.keys(copyElem).forEach((key) => {
    if (typeof elem[key] === "object") 
        copyElem[key] = deepCopy(elem[key])
    else copyElem[key] = elem[key]}
);

return copyElem;
/*if (elem
function insertValToArr(arr, val) {
    const newArr = [];
    arr.forEach((value, ind) => { newArr[ind] = value});
    newArr.push(val);
    return newArr;
*/

}



var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };

console.log(deepCopy(h1))