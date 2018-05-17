const TICK = 10
const TRY = 6000

class AsyncProcess {
  constructor (tag) {
    this.tag = tag
    this.fn = null
  }

  set (fn) {
    this.fn = fn
  }

  run (resolve, reject) {
    this.times = 0
    const ih = setInterval(() => {
      this.times += 1

      this.fn((data) => {
        clearInterval(ih)
        resolve(data)
      }, (err) => {
        clearInterval(ih)
        reject(err)
      })

      // Stop condition.
      if (this.times > TRY) {
        clearInterval(ih)
        reject(new Error(`Max Tries Reached: ${this.tag}`))
      }
    }, TICK)
  }

  runPromise () {
    return new Promise((resolve, reject) => this.run(resolve, reject))
  }
}

export default AsyncProcess
