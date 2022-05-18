import { RequiredError } from "./errors";

type ValidationObject = { [k: string]: any };
export const validateRequired = (args: ValidationObject) => {
  for (let itm in args) {
    if (!itm || !args[itm] || typeof args[itm] === "undefined")
      throw new RequiredError(itm);
  }
};
