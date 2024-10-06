export const format = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};
   
export const parseDays = (meetString) => {
    if (!meetString) return new Set();
    const dayPart = meetString.split(' ')[0];
    return new Set(dayPart.match(/(M|Tu|W|Th|F)/g) || []);
};
   
export const parseTime = (meetString) => {
    if (!meetString) return null;
    const timeRange = meetString.split(' ')[1];
    if (!timeRange) return null;

    const [start, end] = timeRange.split('-');
    return {
      start: format(start),
      end: format(end)
    };
};
   
const hasCommonDays = (days1, days2) => {
    for (const day of days1) {
      if (days2.has(day)) return true;
    }
    return false;
};
   
const timeRangesOverlap = (time1, time2) => time1.start < time2.end && time2.start < time1.end;

const hasTimeConflict = (course1, course2) => { 
    if (!course1.meets || !course2.meets) return false;
     
    if (course1.term !== course2.term) return false;
    
    const days1 = parseDays(course1.meets);
    const days2 = parseDays(course2.meets);
    if (!hasCommonDays(days1, days2)) return false;
    
    const time1 = parseTime(course1.meets);
    const time2 = parseTime(course2.meets);
    if (!time1 || !time2) return false;
     
    return timeRangesOverlap(time1, time2);
};
   
export const hasConflictWithSelected = (course, selectedCourses, coursesData) => selectedCourses.some(selectedId => {
    if (selectedId === course.id) return false;
    return hasTimeConflict(course, coursesData[selectedId]);
});