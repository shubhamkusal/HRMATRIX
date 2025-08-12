import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfWeek, endOfWeek, isSameDay, isToday } from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Calendar
} from 'lucide-react';

const EmployeeSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate mock schedule data
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));

  const shifts = [
    {
      id: 1,
      date: new Date(),
      startTime: '09:00',
      endTime: '17:00',
      department: 'Engineering',
      location: 'Office Floor 2',
      status: 'scheduled',
      type: 'regular'
    },
    {
      id: 2,
      date: addDays(new Date(), 1),
      startTime: '09:00',
      endTime: '17:00',
      department: 'Engineering',
      location: 'Office Floor 2',
      status: 'scheduled',
      type: 'regular'
    },
    {
      id: 3,
      date: addDays(new Date(), 2),
      startTime: '10:00',
      endTime: '18:00',
      department: 'Engineering',
      location: 'Remote',
      status: 'scheduled',
      type: 'flexible'
    },
    {
      id: 4,
      date: addDays(new Date(), 3),
      startTime: '09:00',
      endTime: '17:00',
      department: 'Engineering',
      location: 'Office Floor 2',
      status: 'scheduled',
      type: 'regular'
    },
    {
      id: 5,
      date: addDays(new Date(), 4),
      startTime: '09:00',
      endTime: '13:00',
      department: 'Engineering',
      location: 'Office Floor 2',
      status: 'scheduled',
      type: 'half-day'
    }
  ];

  const meetings = [
    {
      id: 1,
      title: 'Team Standup',
      date: new Date(),
      startTime: '10:00',
      endTime: '10:30',
      attendees: 8,
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Project Review',
      date: addDays(new Date(), 1),
      startTime: '14:00',
      endTime: '15:30',
      attendees: 12,
      location: 'Conference Room B'
    },
    {
      id: 3,
      title: 'Client Call',
      date: addDays(new Date(), 2),
      startTime: '11:00',
      endTime: '12:00',
      attendees: 5,
      location: 'Virtual'
    }
  ];

  const getShiftForDay = (date) => {
    return shifts.find(shift => isSameDay(shift.date, date));
  };

  const getMeetingsForDay = (date) => {
    return meetings.filter(meeting => isSameDay(meeting.date, date));
  };

  const getShiftTypeColor = (type) => {
    switch (type) {
      case 'regular': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'flexible': return 'bg-green-100 text-green-800 border-green-200';
      case 'half-day': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overtime': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const weeklyStats = {
    totalHours: shifts.reduce((total, shift) => {
      const start = new Date(`2000-01-01 ${shift.startTime}`);
      const end = new Date(`2000-01-01 ${shift.endTime}`);
      return total + (end - start) / (1000 * 60 * 60);
    }, 0),
    scheduledDays: shifts.length,
    meetings: meetings.length,
    overtime: 0
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-600 mt-2">View your weekly work schedule and meetings</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium text-gray-900 min-w-48 text-center">
            {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </span>
          <button
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Weekly Hours</p>
              <p className="text-2xl font-bold text-gray-900">{weeklyStats.totalHours}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Scheduled Days</p>
              <p className="text-2xl font-bold text-gray-900">{weeklyStats.scheduledDays}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Meetings</p>
              <p className="text-2xl font-bold text-gray-900">{weeklyStats.meetings}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overtime</p>
              <p className="text-2xl font-bold text-gray-900">{weeklyStats.overtime}h</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Weekly Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map((day) => {
            const shift = getShiftForDay(day);
            const dayMeetings = getMeetingsForDay(day);
            const isCurrentDay = isToday(day);

            return (
              <div key={day.toISOString()} className="bg-white min-h-48 p-4">
                <div className="text-center mb-3">
                  <div className="text-sm font-medium text-gray-600">
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-lg font-bold ${
                    isCurrentDay ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  {isCurrentDay && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mt-1" />
                  )}
                </div>

                <div className="space-y-2">
                  {/* Shift */}
                  {shift && (
                    <div className={`p-2 rounded border ${getShiftTypeColor(shift.type)}`}>
                      <div className="text-xs font-medium mb-1">
                        {shift.startTime} - {shift.endTime}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {shift.department}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {shift.location}
                      </div>
                    </div>
                  )}

                  {/* Meetings */}
                  {dayMeetings.map((meeting) => (
                    <div key={meeting.id} className="p-2 bg-indigo-50 border border-indigo-200 rounded">
                      <div className="text-xs font-medium text-indigo-900 mb-1">
                        {meeting.title}
                      </div>
                      <div className="text-xs text-indigo-700 mb-1">
                        {meeting.startTime} - {meeting.endTime}
                      </div>
                      <div className="flex items-center text-xs text-indigo-600">
                        <Users className="w-3 h-3 mr-1" />
                        {meeting.attendees} attendees
                      </div>
                    </div>
                  ))}

                  {/* No events */}
                  {!shift && dayMeetings.length === 0 && (
                    <div className="text-center text-gray-400 text-xs mt-4">
                      No schedule
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming This Week</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                    <p className="text-sm text-gray-600">
                      {format(meeting.date, 'EEEE, MMM d')} • {meeting.startTime} - {meeting.endTime}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {meeting.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{meeting.attendees} attendees</div>
                  <div className="text-xs text-gray-500">
                    {isToday(meeting.date) ? 'Today' : format(meeting.date, 'MMM d')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeSchedule;
