import { notification } from "antd";
import { useTranslation } from "react-i18next";

export const base64ToFile = (base64String) => {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "application/octet-stream" });
  const file = new File([blob], "test.txt");

  return file;
};

const hideStatus = (status) => {
  switch (status) {
    case 500:
    case 401:
    case 403:
    case 400:
    case 404:
    case 405:
    case 415:
      return "!!! 🚨 !!!";
    case 200:
      return "🎉✔️🥳";
    default:
      return "🤔 👀";
  }
};

export const customNotifications = (type, message, text) => {
  const errorClass = "bg-custRed/90 font-bold text-white";
  const successClass = "bg-green-400/90 font-bold text-white";
  const warningClass = "bg-yellow-200/90 font-bold text-white";
  return notification[type]({
    message: hideStatus(message),
    description: /\d/.test(text) ? text.replace(/[0-9]/g, "") : text,
    className:
      type == "error"
        ? errorClass
        : type == "success"
        ? successClass
        : warningClass,
  });
};
