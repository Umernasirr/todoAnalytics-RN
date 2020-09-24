import createDataContext from "./createDataContext";

import { AsyncStorage } from "react-native";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "add_tasks":
      return { ...state, tasks: action.payload };
    case "add_task":
      let newtasks = [...state.tasks, action.payload];

      saveLocalTasks(newtasks);
      saveLocalTotalTasks();

      return { ...state, tasks: newtasks };

    case "local_total_tasks":
      return { ...state, totalTasks: action.payload };

    case "add_total_tasks":
      let newTotalTasks = state.totalTasks.map((totalTask) => {
        if (totalTask.category === action.payload.category) {
          const total = totalTask.total + 1;
          const pending = totalTask.pending + 1;
          const oneToTen = totalTask.oneToTen + 1;
          const elevenToTwenty = totalTask.elevenToTwenty + 1;
          const twentyOneOnwards = totalTask.twentyOneOnwards + 1;

          const dateBucket = getDateBucket(action.payload.date);

          if (dateBucket == 1) totalTask.oneToTen = oneToTen;
          if (dateBucket == 2) totalTask.elevenToTwenty = elevenToTwenty;
          if (dateBucket == 3) totalTask.twentyOneOnwards = twentyOneOnwards;

          totalTask.total = total;
          totalTask.pending = pending;

          return totalTask;
        }
        return totalTask;
      });

      return { ...state, totalTasks: newTotalTasks };

    case "delete_task":
      let tasks = state.tasks.filter((task) => task.id !== action.payload);

      saveLocalTasks(tasks);

      return { ...state, tasks };

    case "edit_task":
      tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          // Incrementing in the total Count
          state.totalTasks.forEach((totalTask) => {
            if (task.category === totalTask.category) {
              if (task.completed) {
                totalTask.pending -= 1;
                totalTask.completed += 1;
              } else {
                totalTask.pending += 1;
                totalTask.completed -= 1;
              }
            }
          });

          return task;
        } else {
          return task;
        }
      });

      saveLocalTasks(tasks);
      saveLocalTotalTasks();
      return { ...state, tasks };

    case "set_date":
      return { ...state, currentDate: action.payload };

    default:
      state;
  }
};

const saveLocalTasks = async (tasks) => {
  await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
};

const saveLocalTotalTasks = async (totalTasks, tasks) => {
  console.log("hello");
  // if (totalTasks) {
  //   const newTotal = totalTasks.map((totalTask) => {
  //     tasks.map((task) => {
  //       if (task.category === totalTask.category) {
  //         const completed = task.completed;

  //         totalTask.total += 1;
  //         if (completed) {
  //           totalTask.completed += 1;
  //         } else {
  //           totalTask.pending += 1;
  //         }

  //         const taskDateBucket = getDateBucket(task.date);

  //         if (taskDateBucket == 1) totalTask.oneToTen += 1;
  //         if (taskDateBucket == 2) totalTask.elevenToTwenty += 1;
  //         if (taskDateBucket == 3) totalTask.twentyOneOnwards += 1;

  //         return totalTask;
  //       }
  //       return totalTask;
  //     });
  //   });
  // }
  // await AsyncStorage.setItem("totalTasks", JSON.stringify(newTotal));
  console.log("Total Tasks Saved");
};

const getDateBucket = (date) => {
  if (date > 0 && date <= 10) {
    return 1;
  } else if (date > 10 && date <= 20) {
    return 2;
  } else {
    return 3;
  }
};

const getSavedTasks = (dispatch) => async () => {
  let localTasks = await AsyncStorage.getItem("tasks");

  if (localTasks) {
    let tasks = JSON.parse(await AsyncStorage.getItem("tasks"));
    dispatch({ type: "add_tasks", payload: tasks });
  }
};

const getSavedTotalTasks = (dispatch) => async () => {
  let localTotalTasks = await AsyncStorage.getItem("totalTasks");

  if (localTotalTasks) {
    let totalTasks = JSON.parse(await AsyncStorage.getItem("totalTasks"));
    dispatch({ type: "local_total_tasks", payload: totalTasks });
  }
};

const addTask = (dispatch) => async (
  desc,
  date,
  completed,
  category,
  featured
) => {
  category = category.toLowerCase();
  const task = {
    id: Math.round(Math.random() * 10000),
    desc,
    date,
    completed,
    category,
    featured,
  };

  dispatch({ type: "add_task", payload: task });
  dispatch({ type: "add_total_tasks", payload: task });
};

const resetTotalTasks = (dispatch) => async () => {
  await AsyncStorage.removeItem("tasks");
};

const deleteTask = (dispatch) => async (id) => {
  dispatch({ type: "delete_task", payload: id });
};

const setTaskStatus = (dispatch) => async (id) => {
  dispatch({ type: "edit_task", payload: id });
};

const setCurrentDate = (dispatch) => async (date) => {
  dispatch({ type: "set_date", payload: date });
};

export const { Context, Provider } = createDataContext(
  todoReducer,
  {
    getSavedTasks,
    setTaskStatus,
    setCurrentDate,
    addTask,
    deleteTask,
    getSavedTotalTasks,
    saveLocalTotalTasks,
  },
  {
    tasks: [],
    currentDate: new Date().getDate(),
    totalTasks: [
      {
        category: "custom",
        total: 0,
        completed: 0,
        pending: 0,
        oneToTen: 0,
        elevenToTwenty: 0,
        twentyOneOnwards: 0,
      },
      {
        category: "important",
        total: 0,
        completed: 0,
        pending: 0,
        oneToTen: 0,
        elevenToTwenty: 0,
        twentyOneOnwards: 0,
      },
      {
        category: "casual",
        total: 0,
        completed: 0,
        pending: 0,
        oneToTen: 0,
        elevenToTwenty: 0,
        twentyOneOnwards: 0,
      },
    ],
  }
);
