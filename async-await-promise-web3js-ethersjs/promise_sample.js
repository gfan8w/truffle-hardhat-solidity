
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
});


const promise11 = Promise.resolve(3);
const promise22 = Promise.reject("sad")
const promise33 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'foo');
});

// 有reject 的时候，是进入 catch 分支
Promise.all([promise11, promise22, promise33])
    .then((values) => {
    console.log(values);
}).catch(err=>{
    console.error("error:",err)
});


// Promise.allSettled 与 Promise.all 区别是： 等待所有的返回，有个返回状态表示是resolve 还是reject

const promise111 = Promise.resolve(3);
const promise222 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise111, promise222];

Promise.allSettled(promises).
then((results) => results.forEach((result) => console.log(`result status：${result.status}, value: ${result.value}, reason:${result.reason}`)));





