const CustomPromise = function (callback) {
    this.__success__ = [];
    this.__error__ = [];
    this._callback = callback;
    this._ok;
    this._err;

    this._PromiseState = "pending";

    this.then = function (successCb, rejectCb) {
        if (this._PromiseState == "pending") {
            if (successCb) {
                this.__success__.push(successCb)
            }
            if (rejectCb) {
                this.__error__.push(rejectCb)
            }
        } else {
            if (this._PromiseState == "fulfilled") {
                successCb(this._ok)
            }
            if (this._PromiseState == "rejected") {
                rejectCb(this._err)
            }
        }
    }

    this.catch = function (rejectCb) {
        this.then(null, rejectCb)
    }

    this._resolve = function (result) {
        this._PromiseState = "fulfilled";
        this._ok = result;
        this.__success__.forEach(cb => cb(result))
    }

    this._reject = function (err) {
        this._PromiseState = "rejected";
        this._err = err;
        this.__error__.forEach(cb => cb(err))
    }

    setTimeout(() => {
        callback(this._resolve.bind(this), this._reject.bind(this))
    }, 0)
};

CustomPromise.resolve = function (value) {
    return new CustomPromise((resolve) => resolve(value));
};

CustomPromise.reject = function (err) {
    return new CustomPromise((reject) => reject(err));
};

// customPromise = new CustomPromise((resolve, reject) => resolve(1));
// customPromiseErr = new CustomPromise((resolve, reject) => reject(new Error("===Error")));
