

"use client";

import { useState, ChangeEvent } from "react";
import { calculateGPA } from "../utils/gradeUtils";

type Goal = {
  task: string;
  target: number;
  completed: number;
};

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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default function Home() {

 

const [completedGoals, setCompletedGoals] =
  useState(0);

  const [courses, setCourses] =
    useState<Course[]>([]);

  const [showTimetable, setShowTimetable] =
    useState(false);
  
  const [goals, setGoals] = useState<Goal[]>([
  {
    task: "DSA Questions",
    target: 20,
    completed: 0,
  },
]);

const [goalForm, setGoalForm] =
  useState({
    task: "",
    target: "",
  });  

  const [form, setForm] =
    useState<Course>({
      name: "",
      code: "",
      credits: "",
      grade: "A",
      schedule: [
        {
          day: "Monday",
          hour: "9",
          minute: "00",
          period: "AM",
        },
      ],
    });

  function handleChange(
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  }

  function handleScheduleChange(
    index: number,
    field:
      | "day"
      | "hour"
      | "minute"
      | "period",
    value: string
  ) {

    const updatedSchedule = [
      ...form.schedule,
    ];

    updatedSchedule[index][field] =
      value;

    setForm({
      ...form,
      schedule:
        updatedSchedule,
    });
  }

  function addScheduleRow() {

    setForm({
      ...form,
      schedule: [
        ...form.schedule,
        {
          day: "Monday",
          hour: "9",
          minute: "00",
          period: "AM",
        },
      ],
    });
  }

  function addCourse() {

    if (
      !form.name ||
      !form.code ||
      !form.credits
    ) {
      return;
    }

    setCourses([
      ...courses,
      form,
    ]);

    setForm({
      name: "",
      code: "",
      credits: "",
      grade: "A",
      schedule: [
        {
          day: "Monday",
          hour: "9",
          minute: "00",
          period: "AM",
        },
      ],
    });
  }

  function deleteCourse(
    index: number
  ) {

    const updatedCourses =
      courses.filter(
        (_, i) =>
          i !== index
      );

    setCourses(
      updatedCourses
    );
  }

  function addGoal() {
  if (
    !goalForm.task ||
    !goalForm.target
  )
    return;

  setGoals([
    ...goals,
    {
      task: goalForm.task,
      target: Number(goalForm.target),
      completed: 0,
    },
  ]);

  setGoalForm({
    task: "",
    target: "",
  });
}

function increaseProgress(index: number) {

  const updated = [...goals];

  // Stop if already completed
  if (
    updated[index].completed >=
    updated[index].target
  ) {
    return;
  }

  updated[index].completed++;

  // Goal just completed
  if (
    updated[index].completed ===
    updated[index].target
  ) {

    setCompletedGoals(
      prev => prev + 1
    );

   
  }

  setGoals(updated);
}

function deleteGoal(
  index: number
) {
  setGoals(
    goals.filter(
      (_, i) => i !== index
    )
  );
}

  const totalCredits =
    courses.reduce(
      (acc, curr) =>
        acc +
        Number(
          curr.credits
        ),
      0
    );

    const completionRate =
  goals.length === 0
    ? 0
    : Math.round(
        (completedGoals /
          goals.length) *
          100
      );

  function getCourseForSlot(
    day: string,
    slot: string
  ) {

    for (const course of courses) {

      for (const sched of course.schedule) {

        const currentTime =
          `${sched.hour}:${sched.minute} ${sched.period}`;

        if (
          sched.day === day &&
          currentTime === slot
        ) {
          return course.code;
        }
      }
    }

    return "";
  }

  return (

    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">

      <div className="max-w-7xl mx-auto">

        <nav className="bg-black text-white p-4 rounded-2xl mb-8 flex justify-between items-center shadow-lg">

          <h1 className="text-2xl font-bold">
            Course Planner
          </h1>

          <div className="flex gap-6">

            <button
              onClick={() =>
                document
                  .getElementById(
                    "dashboard"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                  })
              }
              className="hover:text-gray-300 transition"
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                document
                  .getElementById(
                    "courses"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                  })
              }
              className="hover:text-gray-300 transition"
            >
              Courses
            </button>

            <button
              onClick={() =>
                document
                  .getElementById(
                    "timetable"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                  })
              }
              className="hover:text-gray-300 transition"
            >
              Timetable
            </button>

          </div>

        </nav>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Add Course
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={form.name}
              onChange={
                handleChange
              }
              className="border p-2 rounded"
            />

            <input
              type="text"
              name="code"
              placeholder="Course Code"
              value={form.code}
              onChange={
                handleChange
              }
              className="border p-2 rounded"
            />

            <input
              type="number"
              name="credits"
              placeholder="Credits"
              value={
                form.credits
              }
              onChange={
                handleChange
              }
              className="border p-2 rounded"
            />

            <select
              name="grade"
              value={form.grade}
              onChange={
                handleChange
              }
              className="border p-2 rounded"
            >
              <option>A*</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>C+</option>
              <option>C</option>
              <option>D+</option>
              <option>D</option>
              <option>E</option>
              <option>F</option>
            </select>

          </div>

          <div className="mt-6 space-y-4">

            <h3 className="text-lg font-semibold">
              Schedule
            </h3>

            {form.schedule.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >

                  <select
                    value={
                      item.day
                    }
                    onChange={(
                      e
                    ) =>
                      handleScheduleChange(
                        index,
                        "day",
                        e.target
                          .value
                      )
                    }
                    className="border p-2 rounded"
                  >
                    {days.map(
                      (
                        day
                      ) => (
                        <option
                          key={
                            day
                          }
                        >
                          {
                            day
                          }
                        </option>
                      )
                    )}
                  </select>

                  <select
                    value={
                      item.hour
                    }
                    onChange={(
                      e
                    ) =>
                      handleScheduleChange(
                        index,
                        "hour",
                        e.target
                          .value
                      )
                    }
                    className="border p-2 rounded"
                  >
                    {[
                      "8",
                      "9",
                      "10",
                      "11",
                      "12",
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                    ].map(
                      (
                        hr
                      ) => (
                        <option
                          key={
                            hr
                          }
                        >
                          {hr}
                        </option>
                      )
                    )}
                  </select>

                  <select
                    value={
                      item.minute
                    }
                    onChange={(
                      e
                    ) =>
                      handleScheduleChange(
                        index,
                        "minute",
                        e.target
                          .value
                      )
                    }
                    className="border p-2 rounded"
                  >
                    <option>
                      00
                    </option>
                    <option>
                      30
                    </option>
                  </select>

                  <select
                    value={
                      item.period
                    }
                    onChange={(
                      e
                    ) =>
                      handleScheduleChange(
                        index,
                        "period",
                        e.target
                          .value
                      )
                    }
                    className="border p-2 rounded"
                  >
                    <option>
                      AM
                    </option>
                    <option>
                      PM
                    </option>
                  </select>

                </div>

              )
            )}

            <button
              type="button"
              onClick={
                addScheduleRow
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Another Day
            </button>

          </div>

          <button
            onClick={addCourse}
            className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Add Course
          </button>

        </div>

        <div
  id="dashboard"
  className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
>

  {/* Total Credits */}
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-xl font-semibold">
      Total Credits
    </h2>

    <p className="text-3xl mt-2">
      {totalCredits}
    </p>
  </div>

  {/* GPA */}
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-xl font-semibold">
      GPA
    </h2>

    <p className="text-3xl mt-2">
      {calculateGPA(courses)}
    </p>
  </div>

  {/* Courses Registered */}
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-xl font-semibold">
      Courses Registered
    </h2>

    <p className="text-3xl mt-2">
      {courses.length}
    </p>
  </div>

  {/* Completion Rate */}
<div className="bg-white p-6 rounded-2xl shadow-lg">
  <h2 className="text-xl font-semibold">
    Completion Rate
  </h2>

  <p className="text-3xl mt-2">
     {completionRate}%
  </p>
</div>

  {/* Goals Completed */}
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-xl font-semibold">
      Goals Completed
    </h2>

    <p className="text-3xl mt-2">
       {completedGoals}
    </p>
  </div>

</div>

        <button
          onClick={() =>
            setShowTimetable(
              !showTimetable
            )
          }
          className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Generate Timetable
        </button>

        {showTimetable && (

          <div
            id="timetable"
            className="bg-white p-6 rounded-2xl shadow-lg mb-8 overflow-x-auto"
          >

            <h2 className="text-2xl font-semibold mb-4">
              Weekly Timetable
            </h2>

            <table className="w-full border-collapse border">

              <thead>

                <tr className="bg-gray-200">

                  <th className="border p-3">
                    Time
                  </th>

                  {days.map(
                    (
                      day
                    ) => (
                      <th
                        key={
                          day
                        }
                        className="border p-3"
                      >
                        {day}
                      </th>
                    )
                  )}

                </tr>

              </thead>

              <tbody>

                {timeSlots.map(
                  (
                    slot
                  ) => (

                    <tr
                      key={
                        slot
                      }
                    >

                      <td className="border p-3 font-semibold">
                        {slot}
                      </td>

                      {days.map(
                        (
                          day
                        ) => (

                          <td
                            key={
                              day
                            }
                            className="border p-3 text-center"
                          >
                            {getCourseForSlot(
                              day,
                              slot
                            )}
                          </td>

                        )
                      )}

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

        <div
          id="courses"
          className="bg-white p-6 rounded-2xl shadow-lg"
        >

          <h2 className="text-2xl font-semibold mb-4">
            Course List
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-200">

                  <th className="p-2">
                    Course
                  </th>

                  <th className="p-2">
                    Code
                  </th>

                  <th className="p-2">
                    Credits
                  </th>

                  <th className="p-2">
                    Grade
                  </th>

                  <th className="p-2">
                    Schedule
                  </th>

                  <th className="p-2">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {courses.map(
                  (
                    course,
                    index
                  ) => (

                    <tr
                      key={
                        index
                      }
                      className="text-center border-b"
                    >

                      <td className="p-2">
                        {
                          course.name
                        }
                      </td>

                      <td className="p-2">
                        {
                          course.code
                        }
                      </td>

                      <td className="p-2">
                        {
                          course.credits
                        }
                      </td>

                      <td className="p-2">
                        {
                          course.grade
                        }
                      </td>

                      <td className="p-2">

                        {course.schedule.map(
                          (
                            item,
                            idx
                          ) => (
                            <div
                              key={
                                idx
                              }
                            >
                              {
                                item.day
                              }
                              {" - "}
                              {
                                item.hour
                              }
                              :
                              {
                                item.minute
                              }
                              {" "}
                              {
                                item.period
                              }
                            </div>
                          )
                        )}

                      </td>

                      <td className="p-2">

                        <button
                          onClick={() =>
                            deleteCourse(
                              index
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">

  <h2 className="text-2xl font-semibold mb-4">
    Weekly Goals
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

    <input
      type="text"
      placeholder="Goal Name"
      value={goalForm.task}
      onChange={(e) =>
        setGoalForm({
          ...goalForm,
          task: e.target.value,
        })
      }
      className="border p-2 rounded"
    />

    <input
      type="number"
      placeholder="Target"
      value={goalForm.target}
      onChange={(e) =>
        setGoalForm({
          ...goalForm,
          target: e.target.value,
        })
      }
      className="border p-2 rounded"
    />

    <button
      onClick={addGoal}
      className="bg-blue-600 text-white rounded p-2"
    >
      Add Goal
    </button>

  </div>

  <table className="w-full border">

    <thead>

      <tr className="bg-gray-200">
        <th className="border p-2">
          Goal
        </th>

        <th className="border p-2">
          Target
        </th>

        <th className="border p-2">
          Completed
        </th>

        <th className="border p-2">
          Progress
        </th>

        <th className="border p-2">
          Action
        </th>
      </tr>

    </thead>

    <tbody>

      {goals.map(
        (goal, index) => (

          <tr key={index}>

            <td className="border p-2">
              {goal.task}
            </td>

            <td className="border p-2">
              {goal.target}
            </td>

            <td className="border p-2">
              {goal.completed}
            </td>

            <td className="border p-2">

  <div className="w-full bg-gray-200 rounded-full h-4">

    <div
      className="bg-green-500 h-4 rounded-full"
      style={{
        width: `${
          (goal.completed /
            goal.target) *
          100
        }%`,
      }}
    />

  </div>

  <p className="text-sm mt-1">

  {goal.completed >= goal.target
    ? " Finished"
    : `${Math.round(
        (goal.completed /
          goal.target) *
          100
      )}%`
  }

</p>

</td>

            <td className="border p-2 flex gap-2">

              <button
                onClick={() =>
                  increaseProgress(
                    index
                  )
                }
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                +1
              </button>

              <button
                onClick={() =>
                  deleteGoal(index)
                }
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>

            </td>

          </tr>

        )
      )}

    </tbody>

  </table>

</div>


        <footer className="mt-12 text-center text-gray-500 text-sm">
          Built using Next.js + Tailwind CSS
        </footer>

      </div>

    </main>

  );
}

