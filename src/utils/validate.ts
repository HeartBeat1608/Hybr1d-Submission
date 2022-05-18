import { RequiredError } from "./errors";

type ValidationObject = { [k: string]: any };
export const validateRequired = (args: ValidationObject) => {
  for (let itm in args) {
    if (!itm || !args[itm] || typeof args[itm] === "undefined")
      throw new RequiredError(itm);
  }
};

export const isWithinHalfHour = (date: Date | string) => {
  if (typeof date === "string") date = new Date(date);
  return addHalfHour(date).getTime() > Date.now();
};

export const addHalfHour = (date: Date | string) => {
  if (typeof date === "string") date = new Date(date);
  return new Date(date.getTime() + 30 * 60 * 1000);
};
