import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

export const toast = (message: string, color: "red" | "violet", isError: boolean) => {
  if (isError === false) {
    showNotification({
      disallowClose: true,
      autoClose: 2000,
      title: "成功",
      message: `${message}しました！`,
      icon: <Check />,
      color: color,
      className: "my-notification-class",
      loading: false,
    })
  } else {
    showNotification({
      disallowClose: true,
      autoClose: 2000,
      title: "エラー",
      message: `${message}できませんでした。`,
      icon: <Check />,
      color: color,
      className: 'my-notification-class',
      loading: false,
    })

  }

};
