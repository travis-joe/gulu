import chai, {expect} from "chai";
import Validator from '../../src/validate.js'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai)

describe('Validate', () => {

  it('存在.', () => {
    expect(Validator).to.exist
  })

  it('required true 报错', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', required: true}
    ]

    let errors = new Validator().validate(data, rules)
    expect(errors.email.required).to.eq('必填')
  })

  it('required true 通过', () => {
    let data = {
      email: 0
    }
    let rules = [
      {key: 'email', required: true}
    ]

    let errors = new Validator().validate(data, rules)
    expect(errors.email).to.not.exist
  })

  it('pattern 报错', () => {
    let data = {
      email: '@joe.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]

    let errors = new Validator().validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })
  it('pattern 通过', () => {
    let data = {
      email: '1@joe.com'
    }
    let rules = [
      {key: 'email', pattern: /^.+@.+$/}
    ]

    let errors = new Validator().validate(data, rules)
    expect(errors.email).to.not.exist
  })
  it('pattern email 报错', () => {
    let data = {
      email: '1@joe.com'
    }
    let rules = [
      {key: 'email', pattern: 'email'}
    ]

    let errors = new Validator().validate(data, rules)
    expect(errors.email).to.not.exist
  })
  it('pattern & required', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', pattern: 'email', required: true}
    ]

    let errors = new Validator().validate(data, rules)
    expect(errors.email.required).to.exist
    expect(errors.email.pattern).to.not.exist
  })
  it('pattern & minLength', () => {
    let data = {
      email: ''
    }
    let rules = [
      {key: 'email', pattern: 'email',  minLength: 6}
    ]

    let errors = new Validator().validate(data, rules)
    expect(errors.email.minLength).to.exist
    expect(errors.email.pattern).to.exist
  })

  it('maxLength', () => {
    let data = {
      email: '123456'
    }
    let rules = [
      {key: 'email', pattern: 'email',  maxLength: 3}
    ]

    let errors = new Validator().validate(data, rules)
    expect(errors.email.maxLength).to.exist
  })

  it('custom validator', () => {
    let data = {
      email: 123456
    }
    let validator = new Validator()
    validator.hasNumber = (value) => {
      return true
    }
    let rules = [
      {key: 'email', pattern: 'email',  maxLength: 3, hasNumber: true}
    ]

    let fn = () => validator.validate(data, rules)
    expect(fn).to.not.throw()
  })
})


