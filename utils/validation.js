/*
validation logic 
*/

export const validateInputs = (type, inputText) => {
    switch (type) {
      case "string": {
        if (inputText.trim()) {
          const strings = /^[A-Za-z0-9'\-,(,),@,:,#./\s]+$/i;
          if (inputText.trim() && inputText.match(strings)) {
            return true;
          } else {
            return false;
          }
        }
        return "empty";
      }
  
      case "symbolWithOneAlphanumeric":
        if (inputText.trim()) {
          const symbolWithOneAlphanumeric =
            // /^[^%\s](?=.*[a-zA-Z0-9])[\S\s]+$/;
            /^[^%]*[a-zA-Z0-9][^\n]*$/
          return symbolWithOneAlphanumeric.test(inputText);
        }
        return "empty";
  
        case "symbolWithOneAlphabatics":
          if (inputText.trim()) {
            const symbolWithOneAlphanumeric =
              /^(?=.*[a-zA-Z])[\S\s]+$/;
            return symbolWithOneAlphanumeric.test(inputText);
          }
          return "empty";
  
      case "websiteurl":
        if (inputText) {
          const alphabetics1 =
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
          return alphabetics1.test(inputText);
        }
        return "empty";
  
      case "alphabetics":
        if (inputText) {
          const alphabetics = /^[a-zA-Z\s]+$/i;
          return alphabetics.test(inputText);
        }
        return "empty";
  
      case "Alphanumeric":
        if (inputText) {
          const Alphanumeric = /^[0-9a-zA-Z ]+$/i;
          return Alphanumeric.test(inputText);
        }
        return "empty";
  
      case "spaces":
        if (inputText) {
          const Spaces = /^ *$/;
          return Spaces.test(inputText);
        }
        return "empty";
  
      case "phoneNumberHyphon": {
        if (inputText) {
          const numbers = /^[0-9 -]+$/i;
          return numbers.test(inputText);
        }
        return "empty";
      }
  
      case "emails":
        if (inputText.length > 0) {
          const emails =
            /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          let emailsArr = inputText.map((data) => {
            return emails.test(data);
          });
          // const allEqualEmails = arr => arr.every(val => val === arr[0]);
          const allEqualEmails = (arr) => arr.every(Boolean);
          const result = allEqualEmails(emailsArr);
          return result;
        }
        return "empty";
  
      case "email":
        if (inputText) {
          const emails =
            /^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:|\\)*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:|\\)+)\])$/;
          return emails.test(inputText);
        }
        return "empty";
  
      case "mobilenumber":
        if (inputText.length > 0) {
          const mobilenumbers = /^\+?\d{10,15}$/;
          let newArr = inputText.map((data) => {
            return mobilenumbers.test(data);
          });
          const allEqual = (arr) => arr.every(Boolean);
          const result = allEqual(newArr);
          return result;
        }
        return "empty";
  
      case "password": {
        if (inputText) {
          if (inputText.length > 50) {
            return false;
          } else {
            return (
              /(?=.{8,50})/.test(inputText) &&
              /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(inputText) &&
              /[a-z]/.test(inputText) &&
              /[0-9]/.test(inputText) &&
              /[A-Z]/.test(inputText) &&
              /^\S*$/.test(inputText)
            );
          }
          // const passwordExpression = new RegExp('^(?=.{3,})((?=.*[a-zA-Z0-9])|(?=.*[!@#%&]))');
          // return passwordExpression.test(inputText);
        }
        return "empty";
      }
  
      case "required": {
        if (inputText && inputText.length > 0) {
          return true;
        } else if (typeof inputText === "boolean") {
          return true;
        } else if (typeof inputText === "number") {
          return true;
        } else if (typeof inputText === "object") {
          return true;
        }
        return "empty";
      }
      case "consecsutivespace": {
        if (inputText) {
          const strings = /\s{3,}/;
          if (inputText && inputText.match(strings)) {
            return true;
          } else {
            return false;
          }
        }
        return "empty";
      }
  
      case "onlynumber": {
        if (inputText) {
          if (inputText) {
            const number = /^[0-9\s]+$/i;
            return number.test(inputText);
          }
        }
        return "empty";
      }
  
      
  
      default:
    }
    return type;
  };
  