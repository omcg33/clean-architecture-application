export const exist = value => required("notExist")(value) !== "notExist";

export const required = (error?: string) => value => {
  if (typeof value === "undefined") {
    return error;
  }
  if (value === null) {
    return error;
  }
  if (typeof value === "string" && !value.trim()) {
    return error;
  }

  return undefined;
};

export const requiredTrue = (error?: string) => value => {
  if (!exist(value))
    return error;

  if (typeof value !== "boolean")
    return error;

  return value === true ? undefined : error;
};

export const requiredMinLength = (error, min) => value => {
  if (("" + value).trim().length < min) {
    return error;
  }

  return undefined;
};

export const requiredMaxLength = (error, max) => value => {
  if (("" + value).trim().length > max) {
    return error;
  }

  return undefined;
};

export const requiredLength = (error, length) => value => {
  if (("" + value).trim().length !== length) {
    return error;
  }

  return undefined;
};

export const requiredMinArrayLength = (error, min) => value => {
  if (value.length < min) {
    return error;
  }

  return undefined;
};

export const requiredMinArrayLengthIfExist = (error, min) => value => {
  if (!exist(value))
    return undefined;

  return requiredMinArrayLength(error, min)(value)
};

export const requiredMaxArrayLength = (error, max) => value => {
  if (value.length > max) {
    return error;
  }

  return undefined;
};

export const requiredMaxArrayLengthIfExist = (error, max) => value => {
  if (!exist(value))
    return undefined;

  return requiredMaxArrayLength(error, max)(value)
};

export const requiredUsername = error => value => {
  if (!/^[\w-]+$/i.test(("" + value).trim()))
    return error;

  return undefined;
};

export const requiredLetters = error => value => {
  if (!/^([а-яёa-z]+)$/i.test(("" + value).split(" ").join("")))
    return error;

  return undefined;
};

export const requiredLettersOrNumbers = error => value => {
  if (!/^([а-яёa-z0-9]+)$/i.test(("" + value).split(" ").join("")))
    return error;

  return undefined;
};

export const requiredNumbers = error => value => {
  if (!/^([0-9]+)$/i.test(("" + value).split(" ").join("")))
    return error;

  return undefined;
};

export const requiredMinNumber = (error, min) => value => {
  if (typeof value !== "number" || value < min)
    return error;

  return undefined;
};

export const requiredName = (error, min = 2) => value => {
  if ((("" + value).trim().split(" ").length < min)) {
    return error;
  }

  return undefined;
};

export const requiredEmail = error => value => {
  if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(("" + value).split(" ").join("")))
    return error;

  return undefined;
};

export const requiredLettersIfExist = error => value => {
  if (!exist(value))
    return undefined;

  return requiredLetters(error)(value);
};

export const requiredNameIfExist = (error, min = 2) => value => {
  if (!exist(value))
    return undefined;

  return requiredName(error, min)(value);
};

export const minLengthIfExist = (error, min) => value => {
  if (!exist(value))
    return undefined;

  return requiredMinLength(error, min)(value);
};

export const maxLengthIfExist = (error, max) => value => {
  if (!exist(value))
    return undefined;

  return requiredMaxLength(error, max)(value);
};

export const requiredNumbersIfExist = error => value => {
  if (!exist(value))
    return undefined;

  return requiredNumbers(error)(value);
};


export const requiredMinNumberIfExist = (error, min) => value => {
  if (!exist(value))
    return undefined;

  return requiredMinNumber(error, min)(value);
};

export const requiredDate = (error) => value => {
  let errors;

  if (!value.from)
    errors = { from: error };

  if (!value.to)
    errors = { ...errors, to: error };

  if (errors)
    return errors;

  return undefined;

};

export const requiredArrayValues = (error) => (values: any[]) => {
  const errors = values
    .map(required(error))
  ;

  if (errors && errors.filter(exist).length > 0)
    return errors;

  return undefined;
};

export const requiredArrayValuesByValidator = (error, validator) => (values: any[]) => {
  const errors = values
    .map((value, index, values) => validator(error, value, index, values))
  ;

  if (errors && errors.filter(exist).length > 0)
    return errors;

  return undefined;
};

export const requiredArrayValuesByValidatorIfExist = (error, validator) => (values: any[]) => {
  if (!exist(values))
    return undefined;

  return requiredArrayValuesByValidator(error, validator)(values);
};

// INTERSECTION

export const requiredOneOf = (error: string, names: string[]) => (value, form) => {
  if (!Array.isArray(names) || names.length < 1)
    return undefined;

  if (exist(value))
    return undefined;

  const values = names
    .map(name => form[name])
    .filter(exist)
  ;

  if (values.length === 0)
    return error;

  return undefined;
};

export const requiredIfAnotherValidByValidator = (error: string, names, validator) => (value, form) => {
  if (!Array.isArray(names) || names.length < 1)
    return undefined;

  if (typeof validator !== 'function')
    return undefined;

  if (exist(value))
    return undefined;

  const values = names
    .map(name => form[name])
    .filter(exist)
    .filter(item => {
      const error = validator(item);
      return typeof error === "undefined";
    });

  if (values.length !== 0)
    return error;

  return undefined;
};

export const requiredIfAnotherExist = (error: string, names) => requiredIfAnotherValidByValidator(error, names, exist);

// INTERSECTION

export const composeValidators = (validators) => (value, ...rest) =>
  validators.reduce((error, validator) => error || validator(value, ...rest), undefined);

// Валидация обьекта по значениям его ключей (каждое значение валидируется отдельно)
type IValidateObject = (rules: any) => (object: any) => Object | undefined;
export const validateObject: IValidateObject = validationRules => object => {
  let result: Object | undefined = undefined;

  if (!validationRules)
    return undefined;

  Object.keys(validationRules)
    .forEach(
      propName => {
        const error = composeValidators(validationRules[propName])(object[propName]);

        if (error) {
          if (!result) {
            result = {};
          }

          result[propName] = error;
        }
      }
    );

  return result;
};

// Валидация взаимодействий значений в обьекте
export const validateIntersection = (validationRules) => (object) => {
  let result = {};

  if (!validationRules)
    return null;

  Object.keys(validationRules)
    .forEach(
      propName => {

        const error = composeValidators(validationRules[propName])(object[propName], object);

        if (error) {
          result[propName] = error;
        }
      }
    );

  if (Object.keys(result).length === 0) {
    return null;
  }

  return result;
};
