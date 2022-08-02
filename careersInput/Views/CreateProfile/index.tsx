import {
  ChoiceGroup,
  Dropdown,
  IChoiceGroupOption,
  Label,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import * as React from "react";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { genderOptions } from "./Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export const BaseUrlLocal = "http://localhost:5000/";

export const CreateProfile: FC = () => {
  // delcare the form schema
  const profileSchema = yup.object({
    name: yup.string().required(),
    designation: yup.string().required(),
    gender: yup.string(),
    uploadfile: yup.mixed(),
    // .required("A file is required")
    // .test("fileFormat", "PDF only", (value) => {
    //   console.log(value);
    //   return value && ["application/pdf"].includes(value.type);
    // })
    skills: yup.array(),
    country: yup.string(),
    state: yup.string(),
    city: yup.string(),
  });

  // advance form  declare the form hooks
  const methodsProfile = useForm({
    mode: "all",
    resolver: yupResolver(profileSchema),
  });

  // baisc form
  // const {
  //   handleSubmit,
  //   register,
  //   watch,
  //   setValue,
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   mode: "all",
  //   resolver: yupResolver(profileSchema),
  // });

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    debugger;
    let response = await axios({
      method: "post",
      url: `${BaseUrlLocal}profiles/`,
      data: JSON.stringify({ ...data }),
      headers: { "content-type": "application/json" },
    });
    console.log(response);
    navigate(`/view`);
  };
  console.log(methodsProfile.watch());

  // GenderChage
  const genderChnage = (option?: IChoiceGroupOption): void => {
    methodsProfile.setValue("gender", option?.key);
  };

  const { id } = useParams();
  const onEditProfile = async () => {
    let res = await axios.get(`${BaseUrlLocal}profiles/${id}`);
    debugger;
    Object.entries(res?.data).forEach(([key, value]: any) => {
      methodsProfile.setValue(key, value, { shouldValidate: true });
    });
  };

  React.useEffect(() => {
    if (id) {
      onEditProfile();
    }
  }, [id]);

  return (
    <>
      <div className="container">
        <FormProvider {...methodsProfile}>
          <form onSubmit={methodsProfile.handleSubmit(onSubmit)}>
            <div className="card">
              <div className="card-title"> Create Profile</div>
              <div className="card-body">
                {/* <TextField
                  {...register("name")}
                  label="name"
                  errorMessage={errors.name ? `${errors.name?.message}` : ""}
                />
                <TextField
                  {...register("designation")}
                  label="designation"
                  errorMessage={
                    errors.designation ? `${errors.designation?.message}` : ""
                  }
                /> */}
                <Controller
                  control={methodsProfile.control}
                  name={"name"}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <>
                        <TextField
                          {...field}
                          label="name"
                          errorMessage={error ? `${error?.message}` : ""}
                        />
                      </>
                    );
                  }}
                />
                <Controller
                  control={methodsProfile.control}
                  name={"designation"}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <>
                        <TextField
                          {...field}
                          label="designation"
                          errorMessage={error ? `${error?.message}` : ""}
                        />
                      </>
                    );
                  }}
                />

                <Controller
                  control={methodsProfile.control}
                  name={"gender"}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <>
                        <div>
                          <Label>{"gender"}</Label>
                          <div className="ChoiceGroup">
                            {genderOptions.map((item: any) => (
                              <label
                                className="choicebtn"
                                key={item.key}
                                id={item.key}
                              >
                                <input
                                  type="radio"
                                  value={item.text}
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                  }}
                                  checked={item.text === value}
                                />
                                <span>{item.text}</span>
                              </label>
                            ))}
                          </div>
                          <span className="error-message">
                            {error ? error.message : ""}
                          </span>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
              <div className="card-footer">
                <PrimaryButton type="submit"> Submit</PrimaryButton>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
