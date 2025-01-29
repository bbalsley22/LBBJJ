import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScheduleCardProps {
  title: string;
  classes: string[];
  onClick: () => void;
}

export const ScheduleCard = ({ title, classes, onClick }: ScheduleCardProps) => {
  return (
    <Card 
      className="bg-[#222222] border-none transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#ea384c]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {classes.map((classTime, idx) => (
            <li key={idx} className="text-sm">{classTime}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};