import { useEffect, useState } from "react";

type Subscription = {
  id: string;
  amount: number;
  created_at: string;
  deleted_at: string | null;
  end_date: string;
  no_of_months: number;
  payment_method: string;
  reference: string;
  start_date: string;
  status: string;
  subscription_plan_id: string;
  tenant_id: string;
  type: string;
  updated_at: string;
};

type UseSubscriptionCountdownReturn = string[];

const useSubscriptionCountdown = (
  subscriptions: Subscription[]
): UseSubscriptionCountdownReturn => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const checkCountdowns = () => {
      const newMessages = subscriptions
        ?.filter((subscription) => subscription.status === "active") // Only active subscriptions
        ?.map((subscription) => {
          const currentDate = new Date();
          const endDate = new Date(subscription.end_date);
          const remainingDays = Math.ceil(
            (endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          // Countdown only when 7 or fewer days remain
          if (remainingDays <= 7 && remainingDays > 0) {
            return `You have ${remainingDays} days remaining for your subscription to end. Renew now to avoid interruptions!`;
          } else if (remainingDays === 1) {
            return `Today is the last day of your subscription! Renew it to continue enjoying the benefits.`;
          } else if (remainingDays === 0) {
            return `Your subscription has ended! Renew it to continue enjoying the benefits.`;
          }

          return null; // Skip other cases
        })
        .filter(Boolean); // Remove null values

      setMessages(newMessages);
    };

    checkCountdowns();
    const interval = setInterval(checkCountdowns, 1000 * 60 * 60 * 24); // Check daily

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [subscriptions]);

  return messages;
};

export default useSubscriptionCountdown;
