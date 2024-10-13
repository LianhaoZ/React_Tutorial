import "../App.css";
import { memo } from "react";
import { hasConflictWithSelected } from "../utilities/timeConflicts";
import { Link } from "react-router-dom";

export const CourseCard = memo(
  ({
    course,
    courseID,
    isSelected,
    selectedCourses,
    coursesData,
    onToggleSelect,
    user,
  }) => {
    const hasConflict =
      !isSelected &&
      hasConflictWithSelected(course, selectedCourses, coursesData);

    return (
      <div
        className={`course-card ${isSelected ? "selected" : ""} ${
          hasConflict ? "conflicted" : ""
        }`}
        onClick={() => !hasConflict && onToggleSelect(course.id)}
        style={{ opacity: hasConflict ? 0.5 : 1 }}
      >
        <div className="course-number">
          {course.term} CS {course.number}
        </div>
        <div className="course-title">{course.title}</div>
        <div className="course-time">{course.meets}</div>
        {hasConflict && <div className="conflict-indicator">Time conflict</div>}

        {user &&
          (hasConflict ? (
            <span className="edit-link disabled">Edit</span>
          ) : (
            <Link to={`/course/${courseID}/edit`} className="edit-link">
              Edit
            </Link>
          ))}
      </div>
    );
  }
);
