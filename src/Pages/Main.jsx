import { ScheduleDialog, CourseCard } from "../components";
import { useEffect, useState } from "react";
import "../App.css";
import { useJsonQuery } from "../utilities/fetch";

const Banner = ({ title }) => <h1>{title}</h1>;

const CourseList = ({
  courses,
  selectedTerm,
  selectedCourses,
  onToggleSelect,
}) => {
  const coursesData = courses || {};
  const filteredCourses = selectedTerm
    ? Object.entries(coursesData).filter(
        ([id, course]) => course.term === selectedTerm
      )
    : Object.entries(coursesData);

  return (
    <div className="course-list">
      {filteredCourses.map(([id, course]) => (
        <CourseCard
          key={id}
          courseID={id}
          course={{ ...course, id }}
          isSelected={selectedCourses.includes(id)}
          selectedCourses={selectedCourses}
          coursesData={coursesData}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
};

const TermSelector = ({ selectedTerm, setSelectedTerm, onViewSchedule }) => (
  <div className="term-bar">
    <div className="term-selector">
      {["Fall", "Winter", "Spring"].map((term) => (
        <button
          key={term}
          className={`term-button ${selectedTerm === term ? "selected" : ""}`}
          onClick={() => setSelectedTerm(selectedTerm === term ? null : term)}
        >
          {term}
        </button>
      ))}
    </div>
    <button className="view-schedule-button" onClick={onViewSchedule}>
      View Schedule
    </button>
  </div>
);

export const MainPage = () => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [courseData, isCourseLoading, courseError] = useJsonQuery(
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  );

  if (isCourseLoading) return <h1>Loading... {`${courseError}`}</h1>;
  if (courseError)
    return <h1>Error loading course data: {`${courseError}`}</h1>;

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="container">
      <Banner title={courseData.title} />
      <TermSelector
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
        onViewSchedule={() => setIsScheduleOpen(true)}
      />
      {courseData?.courses ? (
        <CourseList
          courses={courseData.courses}
          selectedTerm={selectedTerm}
          selectedCourses={selectedCourses}
          onToggleSelect={toggleCourseSelection}
          onViewSchedule={() => setIsScheduleOpen(true)}
        />
      ) : (
        <div>No courses available</div>
      )}

      <ScheduleDialog
        isOpen={isScheduleOpen}
        setIsOpen={setIsScheduleOpen}
        selectedCourses={selectedCourses}
        courses={courseData.courses}
      />
    </div>
  );
};
