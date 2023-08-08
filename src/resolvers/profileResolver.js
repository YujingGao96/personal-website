import profile from "../data/profile";

export const name = profile.name;

export const birthday = new Date(profile.birthYear, profile.birthMonth - 1, profile.birthDate);
export const getAge = birthDate => round9Digits((new Date() - birthDate.getTime()) / 3.15576e+10);
const round9Digits = num => parseFloat(num).toFixed(9);
export const gender = profile.gender;
export const jobTitle = profile.jobTitle;
export const company = profile.company;
export const email = profile.email;
export const phoneNumber = profile.phoneNumber;
export const linkedin = profile.linkedin;

