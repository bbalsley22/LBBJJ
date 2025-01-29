import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  classes: string[];
}

export const ScheduleDialog = ({ isOpen, onClose, title, classes }: ScheduleDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#222222] text-white max-w-5xl w-[95vw] h-[95vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-6xl font-bold text-[#ea384c] mb-16">
            {title} SCHEDULE
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col items-center justify-center">
          <ul className="space-y-16 text-center">
            {classes.map((classTime, idx) => (
              <li key={idx} className="text-5xl font-medium tracking-wider">{classTime}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};