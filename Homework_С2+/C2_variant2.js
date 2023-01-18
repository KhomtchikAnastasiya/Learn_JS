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
        if (v.expr===v.res)
        return true
        else {
            console.log('ошибка в выражении: '+v.caption);
            return false;
        };
      }

    {
        console.log('тест 1');

        var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
        var h2=deepCopy(h1);
        var tests=[
            { caption:"h1===h2", expr: h1===h2, res:false },
            { caption:"h1.a===h2.a", expr: h1.a===h2.a, res:true },
            { caption:"h1.b===h2.b", expr: h1.b===h2.b, res:false },
            { caption:"h1.b.b1===h2.b.b1", expr: h1.b.b1===h2.b.b1, res:true },
            { caption:"h1.c===h2.c", expr: h1.c===h2.c, res:false },
            { caption:"h1.c[0]===h2.c[0]", expr: h1.c[0]===h2.c[0], res:true },
            { caption:"h1.d===h2.d", expr: h1.d===h2.d, res:true },
            { caption:"h1.e===h2.e", expr: h1.e===h2.e, res:true },
            { caption:"isNaN(h2.f)", expr: isNaN(h2.f), res:true },
            { caption:"h2.c instanceof Array", expr: h2.c instanceof Array, res:true }
          ];
        function check2(tests){
        for ( var i=0; i<tests.length; i++ ){
            if (tests[i].expr!==tests[i].res) {
            console.log('ошибка в выражении: '+tests[i].caption);
            return false}    
        }
        return true
        }    

        console.log((check2(tests))
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

    {
        console.log('тест 2');

        var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
        var a2=deepCopy(a1);
        var tests=[
            { caption:"a1===a2", expr: a1===a2, res:false },
            { caption:"typeof(a2)===typeof(a1)", expr: typeof(a2)===typeof(a1), res:true },
            { caption:"a1[0]===a2[0]", expr: a1[0]===a2[0], res:true },
            { caption:"a1[1]===a2[1]", expr: a1[1]===a2[1], res:false },
            { caption:"a1[1].b1===a2[1].b1", expr: a1[1].b1===a2[1].b1, res:true },
            { caption:"a1[2]===a2[2]", expr: a1[2]===a2[2], res:false },
            { caption:"a1[2][0]===a2[2][0]", expr: a1[2][0]===a2[2][0], res:true },
            { caption:"a1[3]===a2[3]", expr: a1[3]===a2[3], res:true },
            { caption:"a1[4]===a2[4]", expr: a1[4]===a2[4], res:true },
            { caption:"isNaN(a2[5])", expr: isNaN(a2[5]), res:true },
            { caption:"a2[2] instanceof Array", expr: a2[2] instanceof Array, res:true }
          ];

        var result=tests.every(check);

        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

    {
        console.log('тест 3');

        var v1="sss";
        var v2=deepCopy(v1);
        var tests=[
            { caption:"typeof(v2)===typeof(v1)", expr: typeof(v2)===typeof(v1), res:true },
            { caption:"v1===v2", expr: v1===v2, res:true }
          ];

        var result=tests.every(check);

        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

    {
        console.log('тест 4');

        var z1=null;
        var z2=deepCopy(z1);
        var tests=[
            { caption:"typeof(z2)===typeof(z1)", expr: typeof(z2)===typeof(z1), res:true },
            { caption:"z1===z2", expr: z1===z2, res:true }
          ];

        var result=tests.every(check);
        
        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

    {
        console.log('тест 5');

        var n1=Number.NaN;
        var n2=deepCopy(n1);
        var tests=[
            { caption:"typeof(n2)===typeof(n1)", expr: typeof(n2)===typeof(n1), res:true },
            { caption:"isNaN(n2)", expr: isNaN(n2), res:true }
          ];

        var result=tests.every(check);

        console.log((result)
            ?'пройден':'НЕ ПРОЙДЕН!')
    }

}

deepCopyTests();