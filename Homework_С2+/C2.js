function deepCopy (elem) {

    if (elem == null || typeof elem !== 'object') {
        return elem;
    }

    let copyElem;
    
    if (Array.isArray(elem)) {
        copyElem=[];
        copyElem=Array.from(elem);}

    else if (elem instanceof Object) {
        copyElem = Object.assign({},elem);}
    
    Object.keys(copyElem).forEach((key) => {
        if (elem[key] instanceof Object) 
            copyElem[key] = deepCopy(elem[key])
        else copyElem[key] = elem[key]}
    );
    
    return copyElem;
    
    }

    var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };

console.log(deepCopy(h1));

var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];

console.log(deepCopy(a1));

v1="sss";

console.log(deepCopy(v1));

var z1=null;

console.log(deepCopy(z1));

var n1=Number.NaN;

console.log(deepCopy(n1));