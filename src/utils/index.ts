import { parseISO, isValid, format } from "date-fns";
import { enUS } from "date-fns/locale";

export const dateFormater = (date: any) => {
  const parsedDate = parseISO(date);

  if (isValid(parsedDate)) {
    return format(parsedDate, `MM/d/yyyy`, { locale: enUS });
  } else {
    // Handle invalid date input, e.g., return an error message or default value
    return "Invalid Date";
  }
};

export const dateFormaterAndTime = (date: any) => {
  const parsedDate = parseISO(date);

  if (isValid(parsedDate)) {
    return format(parsedDate, `MM/d/yyyy h:mm a`, { locale: enUS });
  } else {
    // Handle invalid date input, e.g., return an error message or default value
    return "Invalid Date";
  }
};

export function formatDate(dateString: any) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function taskDate(dateString: any) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export function formatCurrency(input: number | string): string {
  // Convert input to a number (if it's a string)
  const number: number = typeof input === `string` ? parseFloat(input) : input;

  // Check if the converted input is a valid number
  if (isNaN(number)) {
    return `0.00`; // return a default value
  }

  // Convert the number to a string with two decimal places
  const formattedNumber: string = number.toFixed();

  // Add commas as thousands separators
  const parts: string[] = formattedNumber.toString().split(`.`);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, `,`);

  return parts.join(`.`);
}

// Greet user function
export function greetUser() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return greeting;
}

// Reverse Array
export function reverseArray(arr: any[]) {
  return arr?.slice()?.reverse();
}

// Search Functionality

export function searchTableData(data: any, query: string): any {
  // Convert the query to lowercase for case-insensitive search
  const lowercaseQuery = query.toLowerCase();

  return data?.filter((item: any) => {
    const {
      date_purchase,
      name,
      first_name,
      last_name,
      unit_purchase,
      total_amount,
      description,
      size,
      quantity,
      fish_type,
      phone_number,
      email,
      role,
      status,
    } = item?.attributes;

    // Convert each attribute value to lowercase for comparison
    const lowercaseDatePurchase = date_purchase?.toLowerCase();
    const lowercaseName = name?.toLowerCase();
    const lowercaseFishType = fish_type?.toLowerCase();
    const lowercaseStatus = status?.toLowerCase();
    const lowercaseDescription = description?.toLowerCase();
    const lowercasePhone_number = phone_number?.toLowerCase();
    const lowercaseEmail = email?.toLowerCase();
    const lowercaseRole = role?.toLowerCase();
    const lowercaseFirstName = first_name?.toLowerCase();
    const lowercaseLastName = last_name?.toLowerCase();

    // Convert unit_purchase to string for comparison
    const stringUnitPurchase = unit_purchase?.toString()?.toLowerCase();
    const stringSize = size?.toString()?.toLowerCase();
    const stringQuantity = quantity?.toString()?.toLowerCase();
    const stringTotal_amount = total_amount?.toString()?.toLowerCase();

    // Check if any attribute contains the search query
    return (
      lowercaseDatePurchase?.includes(lowercaseQuery) ||
      lowercaseName?.includes(lowercaseQuery) ||
      lowercaseFirstName?.includes(lowercaseQuery) ||
      lowercaseLastName?.includes(lowercaseQuery) ||
      stringUnitPurchase?.includes(lowercaseQuery) ||
      lowercaseFishType?.includes(lowercaseQuery) ||
      stringSize?.includes(lowercaseQuery) ||
      stringQuantity?.includes(lowercaseQuery) ||
      lowercaseStatus?.includes(lowercaseQuery) ||
      lowercaseDescription?.includes(lowercaseQuery) ||
      stringTotal_amount?.includes(lowercaseQuery) ||
      lowercasePhone_number?.includes(lowercaseQuery) ||
      lowercaseEmail?.includes(lowercaseQuery) ||
      lowercaseRole?.includes(lowercaseQuery)
    );
  });
}

export function searchHarvestTableData(data: any, query: string): any {
  // Convert the query to lowercase for case-insensitive search
  const lowercaseQuery = query.toLowerCase();

  return data?.filter((item: any) => {
    const { name, batch, date, total_sales } = item;

    // console.log(item);// Convert unit_purchase to string for comparison
    const stringTotal_sales = total_sales?.toString()?.toLowerCase();

    // Convert each attribute value to lowercase for comparison
    const lowercaseName = name?.toLowerCase();
    const lowercaseBatch = batch?.name?.toLowerCase();
    const lowercaseDate = date?.toLowerCase();

    // Check if any attribute contains the search query
    return (
      lowercaseName?.includes(lowercaseQuery) ||
      lowercaseBatch?.includes(lowercaseQuery) ||
      lowercaseDate?.includes(lowercaseQuery) ||
      stringTotal_sales?.includes(lowercaseQuery)
    );
  });
}
