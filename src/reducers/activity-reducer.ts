import { Activity } from "../types/index";

export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "edit-activity"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "reset-activity" };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const initialStateReducer = () => {
  const value = localStorage.getItem("state");
  return value ? JSON.parse(value) : [];
};

export const initialState: ActivityState = {
  activities: initialStateReducer(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];

    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "edit-activity") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (item) => item.id !== action.payload.id
      ),
    };
  }

  if (action.type === "reset-activity") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
