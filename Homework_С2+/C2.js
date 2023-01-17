'use strict'
function deepCopy (elem) {

    if (elem == null || typeof elem !== 'object') {
        return elem;
    }

    let copyElem;
    
    if (Array.isArray(elem)) {
        copyElem=[];
         for ( var i=0; i<elem.length; i++ ) {
           if (elem[i] instanceof Object) 
            copyElem[i] = deepCopy(elem[i])
           else copyElem[i]=elem[i]
         } 
    }

    else {
        copyElem = Object.assign({},elem);
    
        for (let key in elem) {
        if (elem[key] instanceof Object) 
            copyElem[key] = deepCopy(elem[key])
        }
    }
    return copyElem;
    
    }

    
function deepCopyTests() {

    function check (v,i,a) {
        if (v===true)
        return true
        else {
            console.log('ошибка в выражении номер '+i+': '+a[i]);
            return false;
        };
      }

    {
        console.log('тест 1');

        var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
        var h2=deepCopy(h1);
        var toCheck=[(h1!==h2), (h1.a===h2.a), (h1.b!==h2.b), (h1.b.b1===h2.b.b1),
         (h1.c!==h2.c), (h1.c[0]===h2.c[0]), (h1.d===h2.d), (h1.e===h2.e), 
         (isNaN(h2.f)), (h2.c instanceof Array)];
        
        var result=toCheck.every(check);
        
        

        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

    {
        console.log('тест 2');

        var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
        var a2=deepCopy(a1);
        var toCheck=[(a1!==a2), (typeof(a2)===typeof(a1)), (a1[0]===a2[0]),
         (a1[1]!==a2[1]), (a1[1].b1===a2[1].b1), (a1[2]!==a2[2]), (a1[2][0]===a2[2][0]),
         (a1[3]===a2[3]), (a1[4]===a2[4]), (isNaN(a2[5])), (a2[2] instanceof Array)];
      
        var result=toCheck.every(check);

        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

    {
        console.log('тест 3');

        var v1="sss";
        var v2=deepCopy(v1);
        var toCheck=[(typeof(v2)===typeof(v1)), (v1===v2)];
      
        var result=toCheck.every(check);

        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

    {
        console.log('тест 4');

        var z1=null;
        var z2=deepCopy(z1);
        var toCheck=[(typeof(z2)===typeof(z1)), (z1===z2)];
      
        var result=toCheck.every(check);
        
        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

    {
        console.log('тест 4');

        var n1=Number.NaN;
        var n2=deepCopy(n1);
        var toCheck=[(typeof(n2)===typeof(n1)), (isNaN(n2))];
      
        var result=toCheck.every(check);

        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

}

deepCopyTests();