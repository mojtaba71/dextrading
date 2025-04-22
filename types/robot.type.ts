import { ContactUsDialogProps } from "@/components/features/contact-us/ContactUsDialogTemp";

export interface RobotCardProps {
    header: string;
    description: string;
    url: string;
    className?: string;
    label: string;
    imageUrl: string;
    bullets: string[];
    type: string;
    popuptData?: ContactUsDialogProps
  }