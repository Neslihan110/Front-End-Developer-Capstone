import { useState } from "react";

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const initialValues = {
    firstName: { value: "", isTouched: false },
    lastName: { value: "", isTouched: false },
    contactNumber: { value: "", isTouched: false },
    date: { value: "", isTouched: false },
    time: { value: "Time", isTouched: false },
    noOfGuests: { value: "", isTouched: false },
    occasion: { value: "Occasion", isTouched: false },
  };
  const errorsInitialVlaues = {
    firstName: "First name is required",
    lastName: "Last name is required",
    contactNumber: "contact number name is required",
    date: "Date is required",
    time: "Time is required",
    occasion: "Occasion is required",
  };

  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(errorsInitialVlaues);

  const allTouched = {
    firstName: { ...formData.firstName, isTouched: true },
    lastName: { ...formData.lastName, isTouched: true },
    contactNumber: { ...formData.contactNumber, isTouched: true },
    date: { ...formData.date, isTouched: true },
    time: { ...formData.time, isTouched: true },
    noOfGuests: { ...formData.noOfGuests, isTouched: true },
    occasion: { ...formData.occasion, isTouched: true },
  };

  function validateForm({
    firstName,
    lastName,
    contactNumber,
    date,
    time,
    occasion,
  }) {
    let errors = {};
    if (!firstName.value) {
      errors.firstName = "First name is required";
    }
    if (!lastName.value) {
      errors.lastName = "Last name is required";
    }
    if (!contactNumber.value) {
      errors.contactNumber = "Contact number name is required";
    }
    if (!date.value) {
      errors.date = "Date is required";
    }
    if (time.value === "Time") {
      errors.time = "Time is required";
    }
    if (occasion.value === "Occasion") {
      errors.occasion = "Occasion is required";
    }
    return errors;
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setValidation(name, value);
  };

  const handleFormBlur = async (event) => {
    const { name, value } = event.target;
    setValidation(name, value);
  };

  const handleDateChange = async (event) => {
    const { name, value } = event.target;
    setValidation(name, value);
    dispatch({ type: "UPDATE_TIMES", payload: value });
  };
  // if not put into one function browser breaks
  function setValidation(name, value) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { value: value },
    }));
    setFormErrors(validateForm(formData));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(allTouched);
    if (Object.keys(formErrors).length <= 0) {
      submitForm(formData);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];
  const timeOptions = [
    <option hidden disabled key={"Time"}>
      Time
    </option>,
    availableTimes.map((time) => <option key={time}>{time}</option>),
  ];
  return (
    <main>
      <div className="form-cont">
        <h2 className="form-desc">Book now</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName.value}
            onChange={handleFormChange}
            onBlur={handleFormBlur}
          />
          {!formData.firstName.value && formData.firstName.isTouched && (
            <p className="form_error">First name is Required</p>
          )}
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName.value}
            onChange={handleFormChange}
            onBlur={handleFormBlur}
          />
          {!formData.lastName.value && formData.lastName.isTouched && (
            <p className="form_error">Last name is Required</p>
          )}
          <label htmlFor="contact-number">Contact Number</label>
          <input
            type="number"
            id="contact-number"
            name="contactNumber"
            placeholder="123-456-7890"
            value={formData.contactNumber.value}
            onChange={handleFormChange}
            onBlur={handleFormBlur}
          />
          {!formData.contactNumber.value &&
            formData.contactNumber.isTouched && (
              <p className="form-error">Contact number is Required</p>
            )}
          <label htmlFor="res-date">Choose date</label>
          <input
            type="date"
            id="res-date"
            name="date"
            value={formData.date.value}
            onChange={handleDateChange}
            onBlur={handleFormBlur}
            min={currentDate}
          />
          {!formData.date.value && formData.date.isTouched && (
            <p className="form-error">Date is Required</p>
          )}
          <label htmlFor="res-time">Choose time</label>
          <select
            id="res-time"
            name="time"
            value={formData.time.value}
            onChange={handleFormChange}
            onBlur={handleFormBlur}>
            {timeOptions}
          </select>
          {formData.time.value === "Time" && formData.time.isTouched && (
            <p className="form-error">Time is Required</p>
          )}
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            placeholder="1"
            min="1"
            max="10"
            id="guests"
            name="noOfGuests"
            value={formData.noOfGuests.value}
            onChange={handleFormChange}
            onBlur={handleFormBlur}
          />
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion.value}
            onChange={handleFormChange}
            onBlur={handleFormBlur}>
            <option hidden disabled>
              Occasion
            </option>
            <option>Casual</option>
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
          {formData.occasion.value === "Occasion" &&
            formData.occasion.isTouched && (
              <p className="form_error">Occasion is Required</p>
            )}
          <br />
          <input
            className="button_primary"
            type="submit"
            value="Reserve"
            //disabled={Object.keys(formErrors) <1?false:true}
            aria-label="submit button"
          />
        </form>
      </div>
    </main>
  );
}

export default BookingForm;
