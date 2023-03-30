function add(a=0,b=0){ 
    return a+b;
}

function sub(a=0,b=0){
    return a-b;
}

function sumSquare (a=0,b=0){
    return add(a,b)*add(a,b);
}

module.exports = { add,sub,sumSquare};

