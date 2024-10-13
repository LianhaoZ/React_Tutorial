import { ScheduleDialog, CourseCard } from "../components";
import { useEffect, useState } from "react";
import "../App.css";
import { useJsonQuery } from "../utilities/fetch";
import { useDbData, useAuthState } from "../utilities/fireBase";
import AuthBanner from "../components/Nav";

const Banner = ({ title }) => <h1>{title}</h1>;

const CourseList = ({
  courses,
  selectedTerm,
  selectedCourses,
  onToggleSelect,
  user,
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
          user={user}
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
  // const [courseData, isCourseLoading, courseError] = useJsonQuery(
  //   "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  // );

  const [user] = useAuthState();

  const [courseData, error] = useDbData("courses");
  const [title, e] = useDbData("title");

  if (error || e) {
    return <div>Error: {error.message}</div>;
  }
  if (!courseData || !title) {
    return <div>Loading...</div>;
  }

  // if (isCourseLoading) return <h1>Loading... {`${courseError}`}</h1>;
  // if (courseError)
  //   return <h1>Error loading course data: {`${courseError}`}</h1>;

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="container">
      <AuthBanner title={title} />
      {/* <Banner title={courseData.title} /> */}
      {/* <Banner title={title} /> */}
      <TermSelector
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
        onViewSchedule={() => setIsScheduleOpen(true)}
      />
      {courseData ? (
        <CourseList
          courses={courseData}
          selectedTerm={selectedTerm}
          selectedCourses={selectedCourses}
          onToggleSelect={toggleCourseSelection}
          onViewSchedule={() => setIsScheduleOpen(true)}
          user={user}
        />
      ) : (
        <div>No courses available</div>
      )}

      <ScheduleDialog
        isOpen={isScheduleOpen}
        setIsOpen={setIsScheduleOpen}
        selectedCourses={selectedCourses}
        courses={courseData}
      />
    </div>
  );
};
