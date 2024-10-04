import '../App.css';

const ScheduleDialog = ({ isOpen, setIsOpen, selectedCourses, courses }) => {
  if (!isOpen) return null;
  
  const selectedCourseDetails = selectedCourses.map(id => courses[id]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">Course Schedule</h2>
        <div className="modal-body">
          {selectedCourseDetails.length > 0 ? (
            <div className="selected-courses">
              {selectedCourseDetails.map(course => (
                <div key={course.number} className="selected-course-item">
                  <div className="course-info">CS {course.number} - {course.title}</div>
                  <div className="course-meets">{course.meets}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-courses-message">
              <p>No courses selected</p>
              <p>To select courses, click on course cards</p>
            </div>
          )}
        </div>
        <button className="modal-close" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
};


export default ScheduleDialog;