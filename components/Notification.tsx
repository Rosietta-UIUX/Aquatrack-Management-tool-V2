"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import notification from "@/public/icons/Notification.png";
import { useReadNotificationMutation } from "@/redux/services/notificationApiSlice";
import { dateFormater, dateFormaterAndTime } from "@/utils";
import Image from "next/image";

export function Notification({ data }: any) {
  const [readNotification] = useReadNotificationMutation();

  const handleNotification = async () => {
    try {
      await readNotification(null).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer" onClick={handleNotification}>
          <div>
            <Image
              src={notification}
              alt="notification"
              layout="notification"
              width="30"
              height="30"
              className="cursor-pointer lg:flex hidden"
            />
            <Image
              src={notification}
              alt="notification"
              layout="notification"
              width="25"
              height="25"
              className="cursor-pointer flex lg:hidden"
            />
          </div>
          {data?.data?.unread > 0 && (
            <div className="lg:h-4 lg:w-4 h-3 w-3 rounded-full bg-orange-600 absolute top-0 right-[-0.2rem] "></div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="bg-gray-100 overflow-auto">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="grid gap-y-2 py-4">
          {data?.data[0]?.data?.slice(0, 6)?.map((item: any) => (
            <div
              key={item?.id}
              className="bg-white p-4 rounded-lg shadow-sm border relative ">
              <h3 className="lg:text-sm text-[10px] font-semibold text-gray-600">
                {item?.attributes?.title}
              </h3>
              <p className="lg:text-xs text-[10px] pb-4 pt-2">
                {item?.attributes?.body}
              </p>
              <span className="lg:text-xs text-[6px] absolute bottom-2 right-4 text-[--primary] ">
                {dateFormaterAndTime(item?.attributes?.created_at)}
              </span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
