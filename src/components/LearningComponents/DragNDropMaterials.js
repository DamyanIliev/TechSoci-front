import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import { message, Tooltip, Upload } from "antd";
import { useTranslation } from "react-i18next";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const DragNDropMaterials = ({ onData }) => {
  const { t } = useTranslation();
  const handleData = (data) => {
    onData(data);
  };

  return (
    <Dragger {...props} onChange={handleData} disabled>
      <p className="ant-upload-drag-icon">
        <WarningOutlined />
      </p>
      <p className="ant-upload-text">{t("feature_not_available")} </p>
      <p className="ant-upload-hint">{t("to_be_developed")}</p>
    </Dragger>
  );
};

export default DragNDropMaterials;
