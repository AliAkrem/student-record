type ValidatorFunction =  (value: unknown) => string | number | true | null |React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment;


export function combineValidators(...validators:ValidatorFunction[]): ValidatorFunction {
  return (value: any) => {
    for (let i = 0; i < validators.length; i += 1) {
      const error = validators[i](value);
      if (error) {
        return error;
      }
    }
    return null;
  };
}