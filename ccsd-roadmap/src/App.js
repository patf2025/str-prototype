import React, { useState } from 'react';
import { Home, ChevronLeft, Bus, MapPin, School, BookOpen, FileEdit } from 'lucide-react';

const CCSDRoadmap = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [showSchoolOptions, setShowSchoolOptions] = useState(null);
  const [attendanceZoneChecked, setAttendanceZoneChecked] = useState(false);
  const [schoolCategoryChecked, setSchoolCategoryChecked] = useState(false);
  const [curriculumFocusChecked, setCurriculumFocusChecked] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState('');
  const [showSchools, setShowSchools] = useState(false);
  const [studentType, setStudentType] = useState('');
  const [attendZoneSchool, setAttendZoneSchool] = useState(null);
  const [studentCategory, setStudentCategory] = useState('');
  const [screenHistory, setScreenHistory] = useState(['welcome']);

  const grades = [
    'PreK3', 'PreK4', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade',
    '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade',
    '9th Grade', '10th Grade', '11th Grade', '12th Grade'
  ];

  const handleNext = () => {
    let nextScreen = '';
    if (currentScreen === 'welcome') {
      nextScreen = showSchoolOptions === 'yes' ? 'schoolOptions' : 'studentType';
    } else if (currentScreen === 'schoolOptions') {
      nextScreen = 'studentType';
    } else if (currentScreen === 'studentType') {
      nextScreen = studentType === 'new' ? 'newStudent' : 'returningStudent';
    } else if (currentScreen === 'newStudent' || currentScreen === 'returningStudent') {
      nextScreen = 'additionalPrograms';
    } else if (currentScreen === 'additionalPrograms') {
      nextScreen = 'allSet';
    }
    if (nextScreen) {
      setScreenHistory([...screenHistory, nextScreen]);
      setCurrentScreen(nextScreen);
    }
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      setCurrentScreen(newHistory[newHistory.length - 1]);
      setScreenHistory(newHistory);
    }
  };

  const handleHome = () => {
    setShowSchoolOptions(null);
    setAttendanceZoneChecked(false);
    setSchoolCategoryChecked(false);
    setCurriculumFocusChecked(false);
    setSelectedZone('');
    setSelectedCategory('');
    setSelectedCurriculum('');
    setShowSchools(false);
    setStudentType('');
    setAttendZoneSchool(null);
    setStudentCategory('');
    setCurrentScreen('welcome');
    setScreenHistory(['welcome']);
  };

  const navigateTo = (screen) => {
    setScreenHistory([...screenHistory, screen]);
    setCurrentScreen(screen);
  };

  const showGradeDisplay = !['allSet', 'futureScope'].includes(currentScreen);

  let screenContent;
  
  if (currentScreen === 'welcome') {
    screenContent = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-600 text-center uppercase">Welcome!</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Let's start by selecting your student's grade level</label>
            <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Select a grade...</option>
              {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
            </select>
          </div>
          {selectedGrade && (
            <div className="space-y-3">
              <p className="text-gray-700">Would you like to see a list of school options in CCSD?</p>
              <div className="flex gap-4">
                <button onClick={() => setShowSchoolOptions('yes')} className={`flex-1 px-6 py-3 rounded-lg border-2 ${showSchoolOptions === 'yes' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'}`}>Yes</button>
                <button onClick={() => setShowSchoolOptions('no')} className={`flex-1 px-6 py-3 rounded-lg border-2 ${showSchoolOptions === 'no' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'}`}>No</button>
              </div>
            </div>
          )}
          <button onClick={() => navigateTo('transportation')} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <Bus className="w-5 h-5 text-yellow-500" />
            <span>Transportation Information</span>
          </button>
        </div>
        <button onClick={handleNext} disabled={!selectedGrade || !showSchoolOptions} className={`w-full px-6 py-3 rounded-lg ${selectedGrade && showSchoolOptions ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Next</button>
      </div>
    );
  } else if (currentScreen === 'schoolOptions') {
    screenContent = (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-blue-600 text-center uppercase">CCSD School Options</h2>
          <p className="text-center text-gray-600 mt-2">Select your preferences to view available schools</p>
        </div>
        <div className="space-y-4">
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={attendanceZoneChecked} onChange={(e) => {setAttendanceZoneChecked(e.target.checked); if (!e.target.checked) setSelectedZone('');}} className="w-4 h-4" />
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold">Select an attendance zone of interest</span>
            </label>
            {attendanceZoneChecked && (
              <div className="mt-3 ml-6 space-y-2">
                {['Show all', 'North Charleston | Ladson', 'McClellanville | Mount Pleasant', 'James Island, Wadmalaw, Johns Island | Ravenel, Hollywood, Edisto', 'West Ashley | Charleston Peninsula'].map(zone => (
                  <label key={zone} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="zone" value={zone} checked={selectedZone === zone} onChange={(e) => setSelectedZone(e.target.value)} className="w-4 h-4" />
                    <span>{zone}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={schoolCategoryChecked} onChange={(e) => {setSchoolCategoryChecked(e.target.checked); if (!e.target.checked) setSelectedCategory('');}} className="w-4 h-4" />
              <School className="w-5 h-5 text-red-500" />
              <span className="font-semibold">Select a school category</span>
            </label>
            {schoolCategoryChecked && (
              <div className="mt-3 ml-6 space-y-2">
                {['Show all', 'Enrollment zone school', 'Countywide magnet school', 'Attendance zone magnet school', 'Montessori', 'Charter school'].map(category => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" value={category} checked={selectedCategory === category} onChange={(e) => setSelectedCategory(e.target.value)} className="w-4 h-4" />
                    <span>{category === 'Enrollment zone school' ? <>{category} (check yours per your residence address) <a href="https://croppermap.com/charleston" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">link</a></> : category === 'Montessori' ? `${category} (Applications always needed for PreK and Middle school grades)` : category}</span>
                  </label>
                ))}
                <p className="text-sm text-gray-600 mt-2">Note: A Montessori school is an Attendance zone magnet school</p>
              </div>
            )}
          </div>
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={curriculumFocusChecked} onChange={(e) => {setCurriculumFocusChecked(e.target.checked); if (!e.target.checked) setSelectedCurriculum('');}} className="w-4 h-4" />
              <BookOpen className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Select a curriculum focus</span>
            </label>
            {curriculumFocusChecked && (
              <div className="mt-3 ml-6 space-y-2">
                {['Show all', 'Art Focus', 'Environment Focus', 'Science & Technology Focus', 'Band & Orchestra Option', 'General Rich Curriculum'].map(curriculum => (
                  <label key={curriculum} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="curriculum" value={curriculum} checked={selectedCurriculum === curriculum} onChange={(e) => setSelectedCurriculum(e.target.value)} className="w-4 h-4" />
                    <span>{curriculum}</span>
                  </label>
                ))}
                <p className="text-sm text-red-500 mt-2">Prototype data: Only North Charleston & Art Focus combination available</p>
              </div>
            )}
          </div>
        </div>
        <button onClick={() => setShowSchools(true)} className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Show School Options</button>
        {showSchools && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            {selectedZone === 'North Charleston | Ladson' && selectedCurriculum === 'Art Focus' ? (
              <div>
                <h3 className="font-bold text-gray-800 mb-3">North Charleston | Ladson High Schools:</h3>
                <ul className="space-y-2">
                  <li><span className="font-semibold">North Charleston High School</span> (9th-12th grade) <a href="https://www.google.com/maps/search/North+Charleston+High+School" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline text-sm">View on Map</a></li>
                  <li><span className="font-semibold">R.B. Stall High School</span> (9th-12th grade) <a href="https://www.google.com/maps/search/R.B.+Stall+High+School" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline text-sm">View on Map</a></li>
                  <li><span className="font-semibold">Academic Magnet High School</span> (9th-12th grade) <a href="https://www.google.com/maps/search/Academic+Magnet+High+School" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline text-sm">View on Map</a></li>
                </ul>
              </div>
            ) : <p className="text-gray-700">This combination is still being built. Try 'North Charleston | Ladson' and 'Art Focus'.</p>}
          </div>
        )}
        <div className="flex justify-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button>
          <button onClick={handleNext} className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Next</button>
          <button onClick={handleHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><Home className="w-4 h-4" />Home</button>
        </div>
      </div>
    );
  } else if (currentScreen === 'transportation') {
    screenContent = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-600 text-center uppercase">Transportation Information</h2>
        <div className="space-y-4">
          <p className="font-semibold text-gray-800">Transportation is provided to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>PreK students attending the PreK program</li>
            <li>Students attending their zone school</li>
            <li>Students attending a countywide magnet school</li>
            <li>Students attending a magnet school who reside in the attendance zone of the school</li>
            <li>Students attending some charter schools (not all provide transportation)</li>
          </ul>
          <p className="text-gray-700 font-semibold">For all other cases, families must provide transportation to and from school.</p>
          <a href="https://www.ccsdschools.com/departments/operations/transportation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><Bus className="w-5 h-5 text-yellow-500" /><span>See CCSD Transportation Page for bus stops and bus app</span></a>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button>
          <button onClick={handleHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><Home className="w-4 h-4" />Home</button>
        </div>
      </div>
    );
  } else if (currentScreen === 'studentType') {
    screenContent = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-600 text-center uppercase">What Type of Student Are You?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => {setStudentType('new'); navigateTo('newStudent');}} className="py-8 px-6 bg-blue-500 text-white text-xl font-bold rounded-lg hover:bg-blue-600">NEW</button>
          <button onClick={() => {setStudentType('returning'); navigateTo('returningStudent');}} className="py-8 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"><div className="text-xl font-bold">RETURNING</div><div className="text-sm mt-1">(from last year)</div></button>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button>
          <button onClick={handleHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><Home className="w-4 h-4" />Home</button>
        </div>
      </div>
    );
  } else if (currentScreen === 'newStudent') {
    screenContent = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-600 text-center uppercase">New Student</h2>
        <a href="https://croppermap.com/charleston" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><MapPin className="w-5 h-5 text-emerald-600" /><span>Find your zone school</span></a>
        <div className="space-y-3">
          <p className="text-gray-700 font-semibold">Will you attend your zone school?</p>
          <div className="flex gap-4">
            <button onClick={() => setAttendZoneSchool('yes')} className={`flex-1 px-6 py-3 rounded-lg border-2 ${attendZoneSchool === 'yes' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'}`}>Yes</button>
            <button onClick={() => setAttendZoneSchool('no')} className={`flex-1 px-6 py-3 rounded-lg border-2 ${attendZoneSchool === 'no' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'}`}>No</button>
          </div>
        </div>
        {attendZoneSchool === 'yes' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <ul className="list-disc list-inside space-y-2">
              <li className="text-gray-700">Registration with address verification is needed
                <div className="ml-6 mt-2">
                  <a href="https://www.ccsdschools.com/family-resources/registration-and-enrollment" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><FileEdit className="w-4 h-4" /><span>See the Registration page for more information</span></a>
                </div>
              </li>
            </ul>
            <button onClick={() => navigateTo('transportation')} className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><Bus className="w-5 h-5 text-yellow-500" /><span>Transportation Information</span></button>
          </div>
        )}
        {attendZoneSchool === 'no' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
            <p className="text-gray-700">If you are not attending your zone school, you are considered a Choice Student (one who attends a magnet/charter school) or a Transfer Student (one who attends a not-zoned school and the school attending is not a choice school)</p>
            <a href="https://www.charlestoncountyschools.gov/family-resources/ccsd-schools-and-programs-that-require-an-application" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold text-lg inline-block">CCSD Application Options</a>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Select your student category:</label>
              <select value={studentCategory} onChange={(e) => setStudentCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">-- Please select --</option>
                <option value="choice">Choice (Magnet/Charter)</option>
                <option value="transfer">Transfer Student</option>
              </select>
            </div>
            {studentCategory === 'choice' && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">This is what you will need:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Submit a Choice application (Opens January-February)</li>
                  <li>Register for your zone school (if you accept a Choice seat, the student registration is transferred internally)</li>
                  <li>Address Verification (Due June 30)</li>
                </ol>
              </div>
            )}
            {studentCategory === 'transfer' && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">This is what you will need:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Submit a Student Transfer application (Opens March 1-31)</li>
                  <li>Register for your zone school (if you accept a Transfer seat, the student registration is transferred internally)</li>
                  <li>Address Verification (Due June 30)</li>
                </ol>
              </div>
            )}
            {studentCategory && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Find more information here:</h3>
                <div className="space-y-2">
                  <a href="https://www.ccsdschools.com/family-resources/registration-and-enrollment" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">Registration</a>
                  <a href="https://www.charlestoncountyschools.gov/departments/operations/transportation" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">Transportation</a>
                  <a href="https://schoolchoice.ccsdschools.com/home" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">Application Portal</a>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button>
          <button onClick={handleNext} className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Next</button>
          <button onClick={handleHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><Home className="w-4 h-4" />Home</button>
        </div>
      </div>
    );
  } else if (currentScreen === 'returningStudent') {
    screenContent = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-600 text-center uppercase">Returning Student</h2>
        <a href="https://croppermap.com/charleston" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><MapPin className="w-5 h-5 text-emerald-600" /><span>Find your zone school</span></a>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-700">All K-12th students <span className="font-bold">must register</span> to their zone school. If a student accepted a seat at a Transfer or Choice school, the student's registration information will be transferred internally.</p>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={attendZoneSchool === 'no'} onChange={(e) => setAttendZoneSchool(e.target.checked ? 'no' : null)} className="w-4 h-4" />
            <span className="text-gray-700">Select if you <span className="font-bold">will not</span> attend your zone school</span>
          </label>
        </div>
        {attendZoneSchool === 'no' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
            <p className="text-gray-700">If you are not attending your zone school, you are considered a Choice Student (attending magnet/charter school) or a Transfer Student (attending a non-zoned traditional school), in most cases.</p>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Select your student type:</label>
              <select value={studentCategory} onChange={(e) => setStudentCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">-- Please select --</option>
                <option value="choice">Choice (Magnet/Charter) Student</option>
                <option value="transfer">Transfer Student</option>
              </select>
            </div>
            {studentCategory === 'choice' && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">This is what you will need:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Submit a Choice application (Opens January-February)</li>
                  <li>Register for your zone school (if you accept a Choice seat, the student registration is transferred internally)</li>
                  <li>Address Verification (Due June 30)</li>
                </ol>
              </div>
            )}
            {studentCategory === 'transfer' && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">This is what you will need:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Submit a Student Transfer application (Opens March 1-31)</li>
                  <li>Register for your zone school (if you accept a Transfer seat, the student registration is transferred internally)</li>
                  <li>Address Verification (Due June 30)</li>
                </ol>
              </div>
            )}
            {studentCategory && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Find more information here:</h3>
                <div className="space-y-2">
                  <a href="https://www.ccsdschools.com/family-resources/registration-and-enrollment" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">Registration</a>
                  <a href="https://www.charlestoncountyschools.gov/departments/operations/transportation" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">Transportation</a>
                  <a href="https://schoolchoice.ccsdschools.com/home" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700">Application Portal</a>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button>
          <button onClick={handleNext} className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Next</button>
          <button onClick={handleHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><Home className="w-4 h-4" />Home</button>
        </div>
      </div>
    );
  } else if (currentScreen === 'additionalPrograms') {
    const gradeNum = grades.indexOf(selectedGrade);
    const isElementary = gradeNum >= 4 && gradeNum <= 7;
    const isHighSchool = gradeNum >= 11 && gradeNum <= 14;
    screenContent = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-600 text-center uppercase">New and Returning Students</h2>
        {isElementary && <h3 className="text-xl font-bold text-blue-600 text-center">Additional Program Options</h3>}
        {isHighSchool && <h3 className="text-xl font-bold text-blue-600 text-center">Dual Credit Courses</h3>}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">On this page we could list other available programs for students and display them all per the grade selected</p>
        </div>
        {isElementary && (
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 mb-2">Interested in Gifted & Talented?</p>
              <a href="https://www.charlestoncountyschools.gov/departments/instructional-programs/gifted-and-talented" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold text-lg">Gifted & Talented Program</a>
            </div>
            <div>
              <p className="text-gray-700 mb-2">Interested in Art Program?</p>
              <a href="https://www.charlestoncountyschools.gov/departments/instructional-programs/visual-and-performing-arts" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-bold text-lg">Visual and Performing Arts Program</a>
            </div>
          </div>
        )}
        {isHighSchool && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-600">A list of Dual Credit Course Options could display in this screen</p>
          </div>
        )}
        <div className="flex justify-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button>
          <button onClick={handleNext} className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Next</button>
          <button onClick={handleHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><Home className="w-4 h-4" />Home</button>
        </div>
      </div>
    );
  } else if (currentScreen === 'allSet') {
    screenContent = (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-700 text-center uppercase">All Set!</h2>
        <p className="text-xl text-center text-gray-700">Thank you for exploring this prototype 😊</p>
        <div className="flex justify-center">
          <button onClick={() => navigateTo('futureScope')} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Additional Application Scope to Consider</button>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button>
          <button onClick={handleHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><Home className="w-4 h-4" />Home</button>
        </div>
      </div>
    );
  } else if (currentScreen === 'futureScope') {
    screenContent = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-600 text-center uppercase">Additional Application Scope to Consider</h2>
        <div className="space-y-4">
          <p className="text-gray-700">This web app could be expanded to include features such as:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Roadmap for a middle school student taking advanced courses</li>
            <li>Roadmap for a high school student interested in math</li>
            <li>Support options for students needing support in a specific area</li>
            <li>Tutoring options</li>
            <li>Roadmap for a high school student interested in a trade</li>
            <li>Internship student opportunities and timeline to apply</li>
            <li>Information on schools offering the Kaleidoscope program</li>
            <li>And many other use cases</li>
          </ol>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Back</button>
          <button onClick={handleHome} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"><Home className="w-4 h-4" />Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700 text-center flex-1">
              CCSD Student Roadmap
            </h1>
            {showGradeDisplay && selectedGrade && (
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="text-blue-700 font-semibold">{selectedGrade}</span>
              </div>
            )}
          </div>
          {screenContent}
        </div>
      </div>
    </div>
  );
};

export default CCSDRoadmap;