import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import './App.css';

const queryClient = new QueryClient();

const Banner = ({ title }) => (
  <h1>{title}</h1>
);

const CourseCard = ({ course }) => (
  <div className="course-card">
    <div className="course-number">{course.term} CS {course.number}</div>
    <div className="course-title">{course.title}</div>
    <div className="course-time">{course.meets}</div>
  </div>
);

const CourseList = ({ courses, selectedTerm }) => {
  const filteredCourses = selectedTerm
    ? Object.entries(courses).filter(([id, course]) => course.term === selectedTerm)
    : Object.entries(courses);

  return (
    <div className="course-list">
      {filteredCourses.map(([id, course]) => (
        <CourseCard key={id} course={course} />
      ))}
    </div>
  );
};

const TermSelector = ({ selectedTerm, setSelectedTerm }) => (
  <div className="term-selector">
    {['Fall', 'Winter', 'Spring'].map(term => (
      <button
        key={term}
        className={`term-button ${selectedTerm === term ? 'selected' : ''}`}
        onClick={() => setSelectedTerm(selectedTerm === term ? null : term)}
      >
        {term}
      </button>
    ))}
  </div>
);

const Main = () => { 
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [courseData, isCourseLoading, courseError] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  
  if (isCourseLoading) return <h1>Loading... {`${courseError}`}</h1>;
  if (courseError) return <h1>Error loading course data: {`${courseError}`}</h1>;

  return (
    <div className="container">  
      <Banner title={courseData.title}/> 
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      {courseData?.courses ? (
        <CourseList courses={courseData.courses} selectedTerm={selectedTerm} />
      ) : (
        <div>No courses available</div>
      )}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}> 
    <Main /> 
  </QueryClientProvider>
);

export default App;