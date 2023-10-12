import { authenticate } from "@services/auth";
import { Button, Drawer, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { customNotifications } from "@services/helpers";
const Login = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { show, toggleShow } = props;
  const [captcha, setCaptcha] = useState("");

  const onFinish = (values) => {
    if (captcha) {
      authenticate(values.username, values.password).then((resp) => {
        if (resp.status == 200) {
          navigate("/feed");
        }
      });
    } else {
      customNotifications("warning", 100, t("welcome_captcha"));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeCaptcha = (value) => {
    setCaptcha(value);
  };
  return (
    <>
      <Drawer
        placement="right"
        open={show}
        onClose={toggleShow}
        className="bg-custOrange text-black"
      >
        <div className="mt-1/2">
          <Form
            className="centerY"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={
                <label className="text-black">{t("common_username")}</label>
              }
              name="username"
              rules={[
                {
                  required: true,
                  message: t("common_username_required"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="text-black"
              label={
                <label className="text-black">{t("common_password")}</label>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: t("common_password_required"),
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 2,
                span: 10,
              }}
            >
              <ReCAPTCHA
                sitekey="6LfDhrQmAAAAALtF0pY4HK-23kXvxGZSPXDblno3"
                onChange={onChangeCaptcha}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="bg-custGreen">
                {t("common_submit")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
export default Login;
