export interface LinkItem {
  id: number;
  title: string;
  link: string;
  icon: any;
}
export type UserData = {
  id: string;
  type: string;
  attributes: {
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
    role: string | null;
    fully_onboarded: boolean;
    profile_photo: string;
  };
  farms: any[]; // You can replace 'any[]' with the type of farms if it's known
};

export interface LogData {
  id: string;
  pond_id: string;
  pond_name: string;
  date: string;
  log: string;
  type: "mortality" | "feed";
  feed_size?: string;
}
