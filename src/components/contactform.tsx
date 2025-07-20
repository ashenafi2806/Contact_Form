import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineFormatColorReset } from "react-icons/md";
import "./contactform.css";

type FormValue = {
  fullname: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [isSuccessful, setIsSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<FormValue>({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
  });

  const all_value = watch();

  const onSubmit = (data: FormValue) => {
    console.log("Form submitted:", data);
    setIsSuccessful(true);
    reset(); 
  };

  const resetField = (fieldName: keyof FormValue) => {
    if (all_value[fieldName]?.length) {
      setValue(fieldName, "");
    }
  };

  return (
    <div>
      <h1>Simple Contact Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="forminput">
          <label htmlFor="fullname">Full Name:</label>
          <div className="inputWithButton">
            <input
              type="text"
              id="fullname"
              aria-invalid={errors.fullname ? "true" : "false"}
              aria-describedby="fullnameError"
              {...register("fullname", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message:
                    "Please enter letters only, without numbers or special characters",
                },
              })}
              placeholder="Enter fullname"
            />
            <button
              type="button"
              onClick={() => resetField("fullname")}
              aria-label="Reset fullname input"
              title="Clear input"
            >
              <MdOutlineFormatColorReset size={20} />
            </button>
          </div>
          {errors.fullname && (
            <p id="fullnameError" className="errorMessage">
              {errors.fullname.message}
            </p>
          )}
          <br />
        </div>

        {/* Email Field */}
        <div className="forminput">
          <label htmlFor="email">Email:</label>
          <div className="inputWithButton">
            <input
              type="email"
              id="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="emailError"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Enter email address"
            />
            <button
              type="button"
              onClick={() => resetField("email")}
              aria-label="Reset email input"
              title="Clear input"
            >
              <MdOutlineFormatColorReset size={20} />
            </button>
          </div>
          {errors.email && (
            <p id="emailError" className="errorMessage">
              {errors.email.message}
            </p>
          )}
          <br />
        </div>

        {/* Message Field */}
        <div className="forminput">
          <label htmlFor="message">Message:</label>
          <div className="inputWithButton">
            <textarea
              id="message"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby="messageError"
              {...register("message", {
                required: "Message is required",
              })}
              placeholder="Enter your message"
              rows={4}
            />
            <button
              type="button"
              onClick={() => resetField("message")}
              aria-label="Reset message input"
              title="Clear input"
            >
              <MdOutlineFormatColorReset size={20} />
            </button>
          </div>
          {errors.message && (
            <p id="messageError" className="errorMessage">
              {errors.message.message}
            </p>
          )}
          <br />
        </div>

        <button type="submit" disabled={!isValid} className="submitButton">
          Submit
        </button>
      </form>

      <p style={{ color: "green", fontWeight: "600" }}>
        {isSuccessful && "The form was submitted successfully!"}
      </p>

     
    </div>
  );
}
