function sayHi(user) {
    console.log(`Hello, ${user}!`);
}

function sayBye(user) {
    console.log(`Bye, ${user}!`);
}

//export {sayHi, sayBye}; // a list of exported variables
module.exports.sayHi=sayHi;
module.exports.sayBye=sayBye;