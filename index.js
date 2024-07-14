// Your code here
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    let timeInEvent = employee.timeInEvents.find(e => e.date === date);
    let timeOutEvent = employee.timeOutEvents.find(e => e.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(e => e.date);
    let totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  // Export functions for testing
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
  