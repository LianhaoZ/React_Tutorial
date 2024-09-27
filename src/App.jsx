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

const CourseList = ({ courses }) => (
  <div className="course-list">
    {Object.entries(courses).map(([id, course]) => (
      <CourseCard key={id} course={course} />
    ))}
  </div>
);

const Main = () => { 
  const [courseData, isCourseLoading, courseError] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
 
  if (courseError) return <h1>Error loading course data: {`${courseError}`}</h1>;

  return (
    <div>  
      <Banner title={courseData.title}/> 
      {courseData?.courses ? <CourseList courses={courseData.courses} /> : <div>No courses available</div>}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;
