// src/Components/CalendarBoard.jsx
import React from "react";
// Importamos el nuevo componente
import ScheduledAppointmentCard from "./ScheduledAppointmentCard";

function CalendarBoard({ appointments, currentYear, currentMonth, onAddAppointment }) {
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const today = new Date();

  return (
    <div className="grid grid-cols-7 gap-4">
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
        const dayDate = new Date(currentYear, currentMonth - 1, day);
        const isDayPast =
          dayDate <= new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const dayStr = dayDate.toISOString().split("T")[0];
        const citasDelDia = appointments.filter((c) => {
          const cDateStr = new Date(c.date).toISOString().split("T")[0];
          return cDateStr === dayStr;
        });

        return (
          <div
            key={day}
            className={`border p-2 min-h-[100px] rounded-lg ${isDayPast ? "bg-gray-300 dark:bg-gray-800" : "bg-white dark:bg-gray-700"}`}
          >
            <h3 className="font-bold mb-2">Day {day}</h3>

            {citasDelDia.length > 0 ? (
              citasDelDia.map((cita) => (
                <ScheduledAppointmentCard key={cita.id} cita={cita} />
              ))
            ) : (
              !isDayPast && (
                <button
                  onClick={() => onAddAppointment(day)}
                  className="text-blue-500 dark:text-blue-400 font-bold"
                >
                  + Schedule
                </button>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarBoard;
