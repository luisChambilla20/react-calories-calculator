import { useEffect, useMemo } from "react";
import { Form } from "./components/Form";
import { ActivityList } from "./components/ActivityList";
import { ActivityTracker } from "./components/ActivityTracker";
import { useActivity } from "./hooks/useActivity";

export const App = () => {
  const { state, dispatch } = useActivity();

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state.activities));
  }, [state.activities]);

  const handleReset = () => {
    dispatch({ type: "reset-activity" });
  };

  const canDisableReset = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );

  return (
    <>
      <header className="bg-lime-600 p-4 ">
        <div className="flex justify-between max-w-4xl mx-auto ">
          <h1 className="uppercase text-white text-lg font-black">
            Contador de calorias
          </h1>
          <button
            onClick={handleReset}
            disabled={!canDisableReset}
            className="disabled:cursor-not-allowed bg-slate-800 hover:bg-slate-900 py-3 px-10 text-white uppercase font-bold rounded-xl cursor-pointer text-sm disabled:opacity-10"
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="bg-gray-800 p-10">
        <div className="max-w-4xl m-auto">
          <ActivityTracker />
        </div>
      </section>

      <section className="p-10 max-w-4xl mx-auto">
        <ActivityList />
      </section>
    </>
  );
};
