const runInBatch = (callback, batchSize = 2) => {
    let pendingQueue = [];
    return (data) => {

        pendingQueue.push(() => callback(data))

        if (pendingQueue.length > batchSize) {
            const run = [...pendingQueue]
            pendingQueue = [];
        
            run.forEach((func) => {
                func()
            })
        }        
    }
};

module.exports = { runInBatch };
