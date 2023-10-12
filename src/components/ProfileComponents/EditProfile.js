import ProfilePicUpload from "@components/CommonComponents/ProfilePicUpload";
import { faculties } from "@resources/constants.js";
import UserContext from "@services/UserContext";
import { Button, Card, DatePicker, Form, Image, Input, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const EditProfile = () => {
  const { t } = useTranslation();

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [faculty, setFaculty] = useState("");
  const [facultyNumber, setFacultyNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const { editUser, getUser } = useContext(UserContext);

  const changeName = (e) => setFullName(e.target.value);
  const changeFaculty = (value) => {
    setFaculty(value);
  };
  const changeFacNumber = (e) => setFacultyNumber(e.target.value);
  const changeDateOfBirth = (date) => setDateOfBirth(date.format("YYYY-MM-DD"));
  const changeNickname = (e) => setNickname(e.target.value);
  const handleProfilePicUpload = (picture) => {
    setProfilePicFile(picture);
  };

  const handleProfilePicRemove = () => {
    if (profilePicFile) {
      setProfilePicFile(null);
    }
  };

  useEffect(() => {
    getUser().then((user) => {
      setFullName(user.name);
      setNickname(user.alias);
      setDateOfBirth(user.dateOfBirth);
      setFaculty(user.faculty);
      setFacultyNumber(user.facultyNumber);
    });
  }, []);

  const handleSubmit = () => {
    editUser(fullName, dateOfBirth, faculty, facultyNumber, profilePicFile);
  };

  return (
    <div className="w-full flex mt-40">
      <div className="w-2/5">
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <Form.Item
            name="name"
            label={t("common_full_name")}
            rules={[
              {
                required: true,
                message: t("common_name_required"),
              },
            ]}
          >
            <Input onChange={changeName} value={fullName} />
          </Form.Item>

          <Form.Item
            name="faculty"
            label={t("common_faculty")}
            rules={[
              {
                required: true,
                message: t("common_faculty_required"),
              },
            ]}
          >
            <Select
              options={faculties}
              onChange={changeFaculty}
              value={faculty}
            ></Select>
          </Form.Item>

          <Form.Item
            name="facultyNum"
            label={t("common_faculty_num")}
            rules={[
              {
                required: true,
                message: t("common_fac_num_required"),
              },
            ]}
          >
            <Input onChange={changeFacNumber} value={facultyNumber} />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label={t("common_date_born")}
            rules={[
              {
                required: true,
                message: t("common_date_required"),
              },
            ]}
          >
            <DatePicker onChange={changeDateOfBirth} value={dateOfBirth} />
          </Form.Item>

          <Form.Item label={t("common_profile_pic_upl")}>
            <ProfilePicUpload
              handleProfilePicUpload={handleProfilePicUpload}
              handleProfilePicRemove={handleProfilePicRemove}
            />
          </Form.Item>
          <Form.Item
            className="text-center"
            wrapperCol={{ span: 14, offset: 6 }}
          >
            <Button
              type="primary"
              size="large"
              className="bg-custGreen flex justify-end"
              onClick={handleSubmit}
            >
              {t("common_submit")}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-1/5">
        <Card className="drop-shadow-2xl">
          <div>
            <Image
              src={profilePicFile ? URL.createObjectURL(profilePicFile) : null}
            ></Image>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-lg font-semibold">
              {t("common_username")}: {nickname}
            </p>
            <p className="text-lg font-semibold">
              {t("common_date_born")}: {dateOfBirth}
            </p>
            <p className="text-lg font-semibold">
              {t("common_faculty")}: {faculty}
            </p>
            <p className="text-lg font-semibold">
              {t("common_faculty_num")}: {facultyNumber}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
