import profile from "../data/profile";

export const name = profile.name;
export const age = new Date().getFullYear() - profile.birthYear;
export const gender = profile.gender;
export const jobTitle = profile.jobTitle;
export const department = profile.department;
export const company = profile.company;
export const email = profile.email;
export const phoneNumber = profile.phoneNumber;

