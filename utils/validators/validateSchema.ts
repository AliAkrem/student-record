
export  function isStrongPassword(errorMessage : string) {
    // validate if password contain at least 8 character, lowercase, uppercase and  numbers  
    
        return (value : any ) => {
          const hasNumber = /\d/;
          const hasUpperCase = /[A-Z]/;
          if ((!hasNumber.test(value) || !hasUpperCase.test(value)) && value.length > 0) {
            return errorMessage;
          }
          return null;
        };
      }
      
    export function isPhoneNumber(errorMessage:string) {
    // valid algerian phon number accepted 
    // +213 | 05 | 06 |07 
        return (value:any) => {
          const algerianNumberRegex = /^(\+213|0)[5-7,9]\d{8}$/;
          if (!algerianNumberRegex.test(value)) {
            return errorMessage;
          }
          return null;
        };
      }