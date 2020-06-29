import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./UploadPhoto.module.css";
import * as actions from "../../../store/actions";
import { updateObject, checkValidity } from "../../../shared/utility";

const UploadPhoto = (props) => {
  const [uploadPhotoForm, setUploadPhotoForm] = useState({
    place: {
      elementType: "input",
      elementConfig: {
        type: "text",
      },
      value: "",
      validation: {
        required: true,
        minLength: 2,
        maxLength: 60,
      },
      valid: false,
      touched: false,
      label: "Place",
    },
    year: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "" },
          { value: "2020", displayValue: "2020" },
          { value: "2019", displayValue: "2019" },
          { value: "2018", displayValue: "2018" },
          { value: "2017", displayValue: "2017" },
          { value: "2016", displayValue: "2016" },
          { value: "2015", displayValue: "2015" },
          { value: "2014", displayValue: "2014" },
          { value: "2013", displayValue: "2013" },
          { value: "2012", displayValue: "2012" },
          { value: "2011", displayValue: "2011" },
          { value: "2010", displayValue: "2010" },
        ],
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      label: "Year",
    },
    month: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "" },
          { value: "janvier", displayValue: "janvier" },
          { value: "février", displayValue: "février" },
          { value: "mars", displayValue: "mars" },
          { value: "avril", displayValue: "avril" },
          { value: "mai", displayValue: "mai" },
          { value: "juin", displayValue: "juin" },
          { value: "juillet", displayValue: "juillet" },
          { value: "août", displayValue: "août" },
          { value: "septembre", displayValue: "septembre" },
          { value: "octobre", displayValue: "octobre" },
          { value: "novembre", displayValue: "novembre" },
          { value: "décembre", displayValue: "décembre" },
        ],
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      label: "Month",
    },
    color: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "" },
          { value: "Blanc", displayValue: "Blanc" },
          { value: "Jaune", displayValue: "Jaune" },
          { value: "Marron", displayValue: "Marron" },
          { value: "Rouge", displayValue: "Rouge" },
          { value: "Violet", displayValue: "Violet" },
          { value: "Noir", displayValue: "Noir" },
          { value: "Vert", displayValue: "Vert" },
          { value: "Gris", displayValue: "Gris" },
          { value: "Bleu", displayValue: "Bleu" },
          { value: "Noir-Blanc", displayValue: "Noir-Blanc" },
        ],
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      label: "Color",
    },
    photo: {
      elementType: "file",
      elementConfig: {
        type: "file",
        accept: "image/jpg, image/jpeg",
      },
      selectedFile: null,
      file: null,
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      label: "Photo",
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const adminFeature = props.history.location.pathname.split("/").pop();

  const uploadPhotoHandler = (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append(
      "uploadFile",
      uploadPhotoForm.photo.selectedFile,
      uploadPhotoForm.photo.selectedFile.name
    );
    fd.append("place", uploadPhotoForm.place.value);
    fd.append("year", uploadPhotoForm.year.value);
    fd.append("month", uploadPhotoForm.month.value);
    fd.append("color", uploadPhotoForm.color.value);

    props.onUploadPhoto(fd, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    if (props.error) {
      props.onInitForm();
    }
    const updatedFormElement = updateObject(uploadPhotoForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        uploadPhotoForm[inputIdentifier].validation
      ),
      touched: true,
      ...(uploadPhotoForm[inputIdentifier].elementType === "file" &&
        (event.target.files[0]
          ? {
              selectedFile: event.target.files[0],
              file: URL.createObjectURL(event.target.files[0]),
            }
          : {
              selectedFile: null,
              file: null,
            })),
    });

    const updatedUploadPhotoForm = updateObject(uploadPhotoForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedUploadPhotoForm) {
      formIsValid =
        updatedUploadPhotoForm[inputIdentifier].valid && formIsValid;
    }

    setUploadPhotoForm(updatedUploadPhotoForm);
    setFormIsValid(formIsValid);
  };

  const resetUploadPhotoFormHandler = () => {
    setUploadPhotoForm({
      ...uploadPhotoForm,
      place: {
        ...uploadPhotoForm.place,
        value: "",
        valid: false,
        touched: false,
      },
      year: {
        ...uploadPhotoForm.year,
        value: "",
        valid: false,
        touched: false,
      },
      month: {
        ...uploadPhotoForm.month,
        value: "",
        valid: false,
        touched: false,
      },
      color: {
        ...uploadPhotoForm.color,
        value: "",
        valid: false,
        touched: false,
      },
      photo: {
        ...uploadPhotoForm.photo,
        selectedFile: null,
        file: null,
        value: "",
        valid: false,
        touched: false,
      },
    });
    setFormIsValid(false);
    props.onInitForm();
  };

  const formElementsArray = [];
  for (let key in uploadPhotoForm) {
    formElementsArray.push({
      id: key,
      config: uploadPhotoForm[key],
    });
  }

  let form = (
    <form onSubmit={uploadPhotoHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          label={formElement.config.label}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" isButtonDisabled={!formIsValid}>
        SUBMIT
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <div className={classes.ErrorMessage}>{props.error}</div>;
  }

  return (
    <Fragment>
      <Modal
        show={props.successMessage}
        modalClosed={resetUploadPhotoFormHandler}
      >
        {props.successMessage}
      </Modal>
      <div className={classes.UploadPhoto}>
        <Toolbar adminFeature={adminFeature} toolbarType="adminToolbar" />
        <div className={classes.UploadPhotoForm}>
          <h1 className={classes.UploadPhotoTitle}>UPLOAD A PHOTO</h1>
          {form}
          {errorMessage}
        </div>
        <div className={classes.PhotoPreviewFrame}>
          {uploadPhotoForm.photo.file && (
            <img
              className={classes.PhotoPreviewImg}
              src={uploadPhotoForm.photo.file}
              alt={uploadPhotoForm.photo.selectedFile.name}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.photo.loading,
    successMessage: state.photo.successMessage,
    error: state.photo.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadPhoto: (photoData, token) =>
      dispatch(actions.uploadPhoto(photoData, token)),
    onInitForm: () => dispatch(actions.uploadPhotoInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPhoto);
