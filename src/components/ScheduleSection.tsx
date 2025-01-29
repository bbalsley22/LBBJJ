import { useState } from "react";
import { ScheduleCard } from "./ScheduleCard";
import { ScheduleDialog } from "./ScheduleDialog";

const schedules = [
  {
    title: "MONDAY",
    classes: [
      "10:30 AM - Adult BJJ | Gi",
      "5:00 PM - Youth BJJ",
      "6:00 PM - Adult BJJ | Gi",
      "7:30 PM - MMA",
    ],
  },
  {
    title: "TUESDAY",
    classes: [
      "5:00 PM - Adult Muay Thai",
      "6:00 PM - Adult BJJ | No Gi",
    ],
  },
  {
    title: "WEDNESDAY",
    classes: [
      "10:30 AM - Adult BJJ | No Gi",
      "5:00 PM - Youth BJJ",
      "6:00 PM - Adult BJJ | Gi",
      "7:30 PM - MMA",
    ],
  },
  {
    title: "THURSDAY",
    classes: [
      "5:00 PM - Adult Muay Thai",
      "6:00 PM - Adult BJJ | No Gi",
    ],
  },
  {
    title: "FRIDAY",
    classes: [
      "10:30 AM - Adult BJJ | Kumite",
      "4:00 PM - Advanced Youth BJJ",
      "5:00 PM - Adult Muay Thai",
      "6:00 PM - MMA",
    ],
  },
  {
    title: "SATURDAY",
    classes: [
      "11:00 AM - Youth BJJ",
      "12:00 PM - Open Mat",
    ],
  },
  {
    title: "SUNDAY",
    classes: [
      "12:00 PM - 2:00 PM - Open Mat",
      "(All Gyms Welcome)",
    ],
  },
];

export const ScheduleSection = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#ea384c]">CLASS SCHEDULE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {schedules.map((schedule, index) => (
            <ScheduleCard
              key={schedule.title}
              title={schedule.title}
              classes={schedule.classes}
              onClick={() => setSelectedDay(index)}
            />
          ))}
        </div>
      </div>

      <ScheduleDialog
        isOpen={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        title={selectedDay !== null ? schedules[selectedDay].title : ""}
        classes={selectedDay !== null ? schedules[selectedDay].classes : []}
      />
    </section>
  );
};