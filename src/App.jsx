import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import * as yup from "yup";

// type MyRadioProps = { label: string } & FieldAttributes<{}>;     ----for typescript

const MyRadio = ({ label, ...props }) => {
  // Form control label is a label that helps us add a label to any form Component. Since it it really complex, we prefer making a separate component for such cases so that we can use it easily. Also helps in managing error state

  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyCheck = ({ label, ...props }) => {
  // Form control label is a label that helps us add a label to any form Component. Since it it really complex, we prefer making a separate component for such cases so that we can use it easily

  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};

// Making to make error handling better
const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);

  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  lastName: yup.string().required().min(2),
  pets: yup.array().of(yup.object({ name: yup.string().required() })),
});

function App() {
  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        firstName: "",
        lastName: "",
        gender: "",
        preferences: [],
        email: "",
        pass: "",
        pets: [],
      }}
      validate={(data) => {
        const errors = {};
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email))
          errors.email = "Invalid Email";

        // console.log(error);
        return errors;
      }} // One way to validate is this and other way is using yup-library
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        {
          /* setting submitting state to true before starting to submit so that submit button is disabled*/
        }
        console.log(data);
        setSubmitting(false);
        {
          /*  when done sumitting, set it to false and enable button*/
        }
        resetForm(); //to reset form after it is submitted
      }}
    >
      {({ values, errors, isSubmitting, handleChange, handleBlur }) => (
        // <form onSubmit={handleSubmit}>
        <Form>
          {" "}
          {/* Doesnt require onSubmit property. Has as a standard */}
          {/* default ui form field is not good so use as to give look like text input. Field attribute is a replacement for writing text firld and repeating handleonChange and handleonBlur props*/}
          <div>
            <Field
              name="firstName"
              type="input"
              as={TextField}
              placeholder="First Name"
            />{" "}
            {/* <TextField
            name="firstName"
            id="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          ></TextField> */}
          </div>
          <div>
            <MyTextField
              name="lastName"
              id="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              placeholder="Last Name"
            />
          </div>
          <div>Gender:</div>
          <div>
            <MyRadio name="gender" value="Male" type="radio" label="Male" />
            <MyRadio name="gender" value="Female" type="radio" label="Female" />
          </div>
          <div>Preferences:</div>
          <div>
            <MyCheck
              name="preferences"
              value="Chocolate"
              type="checkbox"
              label="Chocolate"
            />
            <MyCheck
              name="preferences"
              value="Toffee"
              type="checkbox"
              label="Toffee"
            />
            <MyCheck
              name="preferences"
              value="Chewing-gum"
              type="checkbox"
              label="Chewing Gum"
            />
          </div>
          <div>
            <MyTextField
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Mail"
            />
          </div>
          <div>
            <TextField
              name="pass"
              id="pass"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.pass}
              placeholder="Password"
            />
          </div>
          <FieldArray name="pets">
            {(arrayHelpers) => (
              <div>
                <Button
                  onClick={() =>
                    arrayHelpers.push({
                      type: "Frog",
                      name: "",
                      id: "" + Math.random(),
                    })
                  }
                >
                  Add Pet
                </Button>
                {values.pets.map((pet, index) => {
                  return (
                    <div key={pet.id}>
                      <MyTextField
                        placeholder="Select Pet"
                        name={`pets.${index}.name`}
                      />
                      <Field
                        name={`pets.${index}.type`}
                        type="select"
                        as={Select}
                      >
                        <MenuItem value="cat">Cat</MenuItem>
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Frog">Frog</MenuItem>
                      </Field>
                      <Button onClick={() => arrayHelpers.remove(index)}>
                        x
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </FieldArray>
          <Button disabled={isSubmitting} type="submit">
            {/* isSubmitting disables button while form is under submission */}
            submit
          </Button>
          {/* {console.log(error)} */}
          <br /> <br />
          Form Inputs:
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <br />
          Form Errors:
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default App;
