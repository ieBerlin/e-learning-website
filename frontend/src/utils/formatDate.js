export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}
export function dateAndTimeFormatter(time) {
  const date = new Date(time);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
  });
}

export function filterNotifications(notifications) {
  const now = new Date().getTime();
  const last7Days = now - 7 * 24 * 3600 * 1000;
  const currentDate = new Date();
  const thisMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getTime();

  const thisWeekNotifications = [];
  const thisMonthNotifications = [];
  const otherDaysNotifications = [];

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.timestamp).getTime();

    if (notificationDate > last7Days) {
      thisWeekNotifications.push(notification);
    } else if (notificationDate >= thisMonthStart) {
      thisMonthNotifications.push(notification);
    } else {
      otherDaysNotifications.push(notification);
    }
  });

  return {
    thisWeekNotifications,
    thisMonthNotifications,
    otherDaysNotifications,
  };
}
