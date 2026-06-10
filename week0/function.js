function add(a, b) {
    return a + b;
}

console.log(add(3, 5));

const add2 = function (a, b) {
    return a + b;
}

console.log(add2(3, 5));



function f(g) {
    let res = 1;
    for(let x = 1; x <= 5; x++) {
        res *= x;
    }
    g(res);
}

function callback(res) {
    console.log("called with " + res);
}

f(callback);
f(function () { console.log("will this work?"); });