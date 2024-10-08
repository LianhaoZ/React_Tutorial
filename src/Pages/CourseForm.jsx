import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CoursesForm.css";
import { format, parseDays, parseTime } from "../utilities/timeConflicts";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // does nothing as of now
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
      </form>
    </div>
  );
};
