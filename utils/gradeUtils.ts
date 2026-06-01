// type Course = {
// name: string;
// code: string;
// credits: string;
// grade: string;
// slot: string;
// };


// export const gradeMap: Record<string, number> = {
//   "A*": 10,
//   A: 10,
//   "B+": 9,
//   B: 8,
//   "C+": 7,
//   C: 6,
//   "D+": 5,
//   D: 4,
//   E: 3,
//   F: 0,
// };



// // export const gradeMap: Record<string, number> = {
// // A: 10,
// // "A-": 9,
// // B: 8,
// // C: 7,
// // D: 6,
// // F: 0,
// // };

// export function calculateGPA(courses: Course[]): string {
// let totalCredits = 0;
// let weightedPoints = 0;

// courses.forEach((course) => {
// totalCredits += Number(course.credits);


// weightedPoints +=
//   Number(course.credits) *
//   gradeMap[course.grade];


// });

// if (totalCredits === 0) {
// return "0.00";
// }

// return (
// weightedPoints / totalCredits
// ).toFixed(2);
// }

// type ScheduleItem = {
// day: string;
// time: string;
// };

// type Course = {
// name: string;
// code: string;
// credits: string;
// grade: string;
// schedule: ScheduleItem[];
// };

// export const gradeMap: Record<string, number> = {
// "A*": 10,
// A: 10,
// "B+": 9,
// B: 8,
// "C+": 7,
// C: 6,
// "D+": 5,
// D: 4,
// E: 3,
// F: 0,
// };

// export function calculateGPA(courses: Course[]): string {

// let totalCredits = 0;
// let weightedPoints = 0;

// courses.forEach((course) => {

// totalCredits += Number(course.credits);

// weightedPoints +=
//   Number(course.credits) *
//   gradeMap[course.grade];

// });

// if (totalCredits === 0) {
// return "0.00";
// }

// return (
// weightedPoints / totalCredits
// ).toFixed(2);
// }


type ScheduleItem = {
  day: string;
  hour: string;
  minute: string;
  period: string;
};

type Course = {
  name: string;
  code: string;
  credits: string;
  grade: string;
  schedule: ScheduleItem[];
};

export const gradeMap: Record<string, number> = {
  "A*": 10,
  "A": 10,
  "B+": 9,
  "B": 8,
  "C+": 7,
  "C": 6,
  "D+": 5,
  "D": 4,
  "E": 3,
  "F": 0,
};

export function calculateGPA(
  courses: Course[]
): string {

  let totalCredits = 0;

  let weightedPoints = 0;

  courses.forEach((course) => {

    totalCredits += Number(
      course.credits
    );

    weightedPoints +=
      Number(course.credits) *
      gradeMap[course.grade];

  });

  if (totalCredits === 0) {
    return "0.00";
  }

  return (
    weightedPoints /
    totalCredits
  ).toFixed(2);
}

