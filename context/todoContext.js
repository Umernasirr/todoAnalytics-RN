import createDataContext from "./createDataContext";

import { AsyncStorage } from "react-native";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "add_tasks":
      return { ...state, tasks: action.payload };
    case "add_task":
      let newtasks = [...state.tasks, action.payload];
      saveLocalTasks(newtasks);
      return { ...state, tasks: newtasks };

    // work in progress
    case "save_local_tasks":
      saveLocalTotal(action.payload);
      return { ...state, totalTasks: action.payload };

    case "set_featured":
      tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task.featured = !task.featured;

          return task;
        } else {
          return task;
        }
      });
      saveLocalTasks(tasks);
      return { ...state, tasks };

    case "set_featured_tasks":
      let newFeaturedTasks = [];
      state.tasks.forEach((task) => {
        if (task.featured) {
          newFeaturedTasks.push(task);
        }
      });

      newFeaturedTasks = newFeaturedTasks.sort((a, b) => a.date - b.date);

      return { ...state, featuredTasks: newFeaturedTasks };

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

      saveLocalTotal(newTotalTasks);
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
      return { ...state, tasks };

    case "set_date":
      return { ...state, currentDate: action.payload };

    case "set_total_current":
      newTotalTasks = state.totalTasks.map((totalTask) => {
        state.tasks.map((task) => {
          console.log("helooooo");

          console.log(totalTask.category == task.category);
          if (totalTask.category == task.category) {
            console.log("helooooo");
            totalTask.totalCurrent += 1;
          }
        });
        return totalTask;
      });
      return { ...state, totalTasks: newTotalTasks };

    default:
      state;
  }
};

const saveLocalTasks = async (tasks) => {
  await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
};

const saveLocalTotal = async (totals) => {
  await AsyncStorage.setItem("totalTasks", JSON.stringify(totals));
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

const saveLocalTotalTasks = (dispatch) => async (totalTasks) => {
  dispatch({ type: "save_local_tasks", payload: totalTasks });
};

const getSavedTotalTasks = (dispatch) => async () => {
  let localTotalTasks = await AsyncStorage.getItem("totalTasks");

  if (localTotalTasks) {
    let totalTasks = JSON.parse(await AsyncStorage.getItem("totalTasks"));
    dispatch({ type: "save_local_tasks", payload: totalTasks });
  }
};

const getTotalCurrent = (dispatch) => async () => {
  dispatch({ type: "set_total_current" });
};

const getFeaturedTasks = (dispatch) => async () => {
  dispatch({ type: "set_featured_tasks" });
};

const setFeatured = (dispatch) => async (id) => {
  dispatch({ type: "set_featured", payload: id });
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

const resetAsync = (dispatch) => async () => {
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
    resetAsync,
    setFeatured,
    getTotalCurrent,
    getFeaturedTasks,
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
        totalCurrent: 0,
      },
      {
        category: "important",
        total: 0,
        completed: 0,
        pending: 0,
        oneToTen: 0,
        elevenToTwenty: 0,
        twentyOneOnwards: 0,
        totalCurrent: 0,
      },
      {
        category: "casual",
        total: 0,
        completed: 0,
        pending: 0,
        oneToTen: 0,
        elevenToTwenty: 0,
        twentyOneOnwards: 0,
        totalCurrent: 0,
      },
    ],
    featuredTasks: [],
  }
);
