export default class Validator{
  constructor(){}
  static add(name, fn) {
    Validator.prototype[name] = fn
  }
  required = (value) => {
    if(value !== 0 && !value) {
      return '必填'
    }
  }

  pattern = (value, pattern) => {
    if(pattern === 'email'){
      pattern = /^.+@.+$/
    }
    if(pattern.test(value) === false){
      return '格式不正确'
    }
  }

  minLength = (value, minLength) => {
    if(value.length < minLength) {
      return '太短'
    }
  }

  maxLength = (value, minLength) => {
    if(value.length > minLength) {
      return '太长'
    }
  }

  ensureObj(a, key) {
    if(typeof a[key] !== 'object'){
      a[key] = {}
    }
  }
  validate(data, rules) {
    let errors = {}
    rules.forEach(rule => {
      let value = data[rule.key]
      if(rule.required) {
        const error = this.required(value)
        if(error){
          errors[rule.key] = {required: error}
          return
        }
      }
      Object.keys(rule)
        .filter(key => key !=='key' && key !=='required')
        .forEach(validator => {
          if(this[validator] === undefined) {
            throw new Error(`不存在的校验器: ${validator}`)
          }
          const error = this[validator] && this[validator](value, rule[validator])
          if(error){
            this.ensureObj(errors, rule.key)
            errors[rule.key][validator] =  error
          }
        })
    })
    return errors
  }
}
