import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }, 
    "S315" : {
      "term": "Spring",
      "number": "334",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }, 
    "S317" : {
      "term": "Spring",
      "number": "324",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};

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

const App = () => { 
  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

export default App;