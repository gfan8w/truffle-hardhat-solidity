new Promise(function (resolve,reject) {
    setTimeout( () => resolve(1),1000);
}).then(function (result) {
        console.log(result)
        // throw new Error("throw a simple error") //直接跳到 catch
        return result * 2 //返回一个默认的 promise对象，确切的说是返回一个 有 .then 方法的兼容对象
}).then((result,reject) =>{
    console.log(result,reject)
    return result *2 //返回一个默认的 promise对象，确切的说是返回一个 有 .then 方法的兼容对象
}).then(result =>{
    console.log(result)
    return result
}).catch(e=>{
    console.log("error:",e)
})

// 上面的方式等价于：

new Promise((resolve,reject) =>{
    setTimeout(()=>resolve(1),1000)
}).then(result =>{
    console.log("1st chain then:",result)
    return new Promise((resolve,reject) =>{
        setTimeout(()=>resolve(result*2),1000)
    })
}).then(result =>{
    console.log("2nd chain then:",result)
    return new Promise((resolve,reject)=>{
        setTimeout(()=>reject(result*2),1000)
    })
}).catch(e=>{
    console.log("error in chain:",e)
})









// 注意，下面这种不是链式调用，他们是平级的调用,输出3个1
let promise=new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(1),1000)
});

promise.then(result=>{
    console.log("1st then:",result)
})

promise.then(result =>{
    console.log("2nd then:",result)
})

promise.then(result =>{
    console.log("3rd then:",result)
})



/**
 这2个有差别吗？有差别，如果f1 报错，1）还会执行，会被catch，但2）不会，因为 f1被chain了，能传递到后面
 1）promise.then(f1).catch(f2);
 2）promise.then(f1, f2);

 参考：https://javascript.info/promise-chaining

**/
new Promise((resolve,rejetct)=>{
    resolve(1)
}).then(result=>{throw new Error("i am a happy error")},reject =>{console.log("i am:",reject)})
    .then(result=>{console.log(result)})
     .catch(reject =>{console.log("catch:",reject)})   // 注释 或取消注释 看效果



new Promise((resolve,rejetct)=>{
    rejetct(1)
}).then(result=>{console.log("i am a happy result:",result)},reject =>{console.log("i am sad result:",reject);return 30})
    .then(result=>{console.log("i am a brother:",result)},reject =>{console.log("i am a sister:",reject)})
    .catch(reject =>{console.log("brother catch:",reject)})






























