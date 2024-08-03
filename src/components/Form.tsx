import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { categories } from "../db/db";
import { Activity } from "../types/index";
import { useActivity } from "../hooks/useActivity";

const initialForm: Activity = {
  id: uuidv4(),
  category: 1,
  activity: "",
  calories: 0,
};

export const Form = () => {
  const { state, dispatch } = useActivity();
  const [form, setForm] = useState<Activity>(initialForm);

  useEffect(() => {
    if (state.activeId) {
      const activityUsing = state.activities.find(
        (item) => item.id === state.activeId
      );
      if (activityUsing) {
        setForm(activityUsing);
      }
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const toNumber = ["category", "calories"].includes(e.target.id);

    setForm({
      ...form,
      [e.target.id]: toNumber ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: form } });
    setForm({
      ...initialForm,
      id: uuidv4(),
      category: form.category,
    });
  };

  const isValidActivity = () => {
    return form.activity.trim() !== "" && form.calories > 0;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg "
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-black">
          Categoria:
        </label>
        <select
          value={form.category}
          onChange={handleChange}
          id="category"
          className="border border-slate-200 p-2 rounded-lg w-full bg-white"
        >
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-black">
          Actividad:
        </label>
        <input
          onChange={handleChange}
          value={form.activity}
          className="border border-slate-200 bg-white p-2 rounded-lg w-full"
          type="text"
          id="activity"
          placeholder="Ej. Comida, Bebida, Ejercicio, Pesas, Ensalada"
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-black">
          Calorias:
        </label>
        <input
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.currentTarget.select()
          }
          onChange={handleChange}
          value={form.calories}
          className="border border-slate-200 bg-white p-2 rounded-lg w-full"
          type="number"
          id="calories"
          placeholder="Calorias: ej. 400 o 500"
        />
      </div>

      <input
        type="submit"
        disabled={!isValidActivity()}
        className="bg-black p-3 border rounded-lg w-full disabled:opacity-10 text-white font-black uppercase cursor-pointer"
        value={
          "Agregar " +
          categories.find((item) => item.id === form.category)?.name
        }
      />
    </form>
  );
};
