import { Activity } from "../types";
import { categories } from "../db/db";
import { useMemo } from "react";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useActivity } from "../hooks/useActivity";

export const ActivityList = () => {
  const { state, dispatch } = useActivity();

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((item) => (item.id === category ? item.name : "")),
    [state.activities]
  );

  const handleEdit = (id: Activity["id"]) => {
    dispatch({ type: "edit-activity", payload: { id } });
  };

  const handleDelete = (id: Activity["id"]) => {
    dispatch({ type: "delete-activity", payload: { id } });
  };

  return (
    <>
      <h1 className="text-4xl font-black text-center text-slate-600">
        Comida y Actividades
      </h1>

      {state.activities.map((item) => (
        <div
          key={item.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between border rounded-2xl"
        >
          <div className="space-y-2 relative ">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white font-black uppercase ${
                item.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+item.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{item.activity}</p>
            <p className="font-black text-4xl text-lime-500">
              {item.calories}
              <span> Calorias</span>{" "}
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <button onClick={() => handleEdit(item.id)}>
              <PencilSquareIcon className="h-6 w-6 text-slate-600" />
            </button>

            <button onClick={() => handleDelete(item.id)}>
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
