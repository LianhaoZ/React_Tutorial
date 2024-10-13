import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CoursesForm.css";
import { format, parseDays, parseTime } from "../utilities/timeConflicts";
import { useDbUpdate } from "../utilities/fireBase";

const validateCourseData = (key, val) => {
  switch (key) {
    case "title":
      return val.length < 2
        ? "Course title must be at least two characters"
        : "";
    case "meets":
      if (!val) return "";

      const meetPattern = /^(M|Tu|W|Th|F)+\s\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
      if (!meetPattern.test(val)) {
        return "Must contain days and start-end, e.g., MWF 12:00-13:20";
      }

      const days = parseDays(val);
      if (days.size === 0) {
        return "Invalid days format (use M, Tu, W, Th, F)";
      }

      const time = parseTime(val);
      if (!time) {
        return "Invalid time format";
      }

      const { start, end } = time;
      if (start < 0 || end < 0 || start >= 24 * 60 || end >= 24 * 60) {
        return "Invalid time format";
      }

      return "";
    default:
      return "";
  }
};

const useFormData = (validator, initialData) => {
  const [values, setValues] = useState(initialData || {});
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validator(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return [{ values, errors }, handleChange];
};

const ButtonBar = ({ message }) => {
  return (
    <div className="form-actions">
      <Link to="/" className="cancel-button">
        Cancel
      </Link>
      <button type="submit" className="btn submit">
        Submit
      </button>
      {message && <span className="message">{message}</span>}
    </div>
  );
};

export const CourseForm = ({ courses }) => {
  const { courseId } = useParams();
  const course = courses?.[courseId];

  const initialData = {
    title: course?.title || "",
    meets: course?.meets || "",
  };

  const [{ values, errors }, handleChange] = useFormData(
    validateCourseData,
    initialData
  );

  const [updateData, result] = useDbUpdate(`/courses/${courseId}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.title && !errors.meets) {
      updateData(values);
    }
  };

  return (
    <div className="course-form-container">
      <h2 className="form-title">{course ? "Edit Course" : "Add Course"}</h2>

      <form onSubmit={handleSubmit} className="course-form">
        <div>
          <label htmlFor="title" className="form-label">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Enter course title"
            required
            className="form-input"
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div>
          <label htmlFor="meets" className="form-label">
            Meeting Times
          </label>
          <input
            type="text"
            id="meets"
            name="meets"
            value={values.meets}
            onChange={handleChange}
            placeholder="e.g., MWF 9:00-9:50"
            className="form-input"
          />
          {errors.meets && <div className="error-message">{errors.meets}</div>}
        </div>

        <ButtonBar />

        {result && result.message && (
          <div className={`message ${result.error ? "error" : "success"}`}>
            {result.message}
            <div>
              {!result.error && (
                <Link to="/" className="return-link">
                  Return to Course List
                </Link>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
