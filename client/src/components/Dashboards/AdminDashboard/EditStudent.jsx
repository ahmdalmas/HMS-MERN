import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from './Input';
import { Loader } from "../Common/Loader";
import { Button } from '../Common/PrimaryButton';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const EditStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [student, setStudent] = useState({
    name: '',
    cms_id: '',
    room_no: '',
    batch: '',
    dept: '',
    course: '',
    email: '',
    father_name: '',
    contact: '',
    address: '',
    dob: '',
    cnic: '',
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/student/get-student-by-id/${studentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.student) {
          const formattedDateStr = moment(data.student.dob, "DD/MM/YYYY").format("YYYY-MM-DD");
          setStudent((prev) => ({
            ...prev,
            ...data.student,
            dob: formattedDateStr,
          }));
        } else {
          console.error('Failed to fetch student data:', data.errors || 'Unknown error');
        }
      })
      .catch((error) => console.error('Error fetching student details:', error));
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedName = name
      .toLowerCase()
      .replace(' ', '_');
    setStudent((prevStudent) => ({
      ...prevStudent,
      [formattedName]: value,
    }));

    console.log('student Details 123: ' + JSON.stringify(student))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:3001/api/student/update-student/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed to update student');
          });
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        toast.success(
          "Student details updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate(`/admin-dashboard/all-students`);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error updating student details:', error);
        toast.error(error.message || 'Failed to update student details. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">
        Update Student Details
      </h1>
      <div className="md:w-[60vw] w-full p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-5 flex-wrap justify-center md:w-full sw-[100vw]">
            <Input
              field={{
                name: "name",
                type: "text",
                req: true,
                value: student.name,
                onChange: handleChange,
              }}
            />
            <Input
              field={{
                name: "cms_id",
                type: "number",
                req: true,
                value: student.cms_id,
                onChange: handleChange
              }}
            />
            <Input
              field={{
                name: "dob",
                type: "date",
                req: true,
                value: student.dob,
                onChange: handleChange
              }}
            />
            <Input
              field={{
                name: "cnic",
                type: "text",
                req: true,
                value: student.cnic,
                onChange: handleChange
              }}
            />
          </div>
          <div className="flex gap-5 w-full flex-wrap justify-center">
            <Input
              field={{
                name: "email",
                type: "email",
                req: true,
                value: student.email,
                onChange: handleChange
              }}
            />
            <Input
              field={{
                name: "contact",
                type: "text",
                req: true,
                value: student.contact,
                onChange: handleChange
              }}
            />
            <Input
              field={{
                name: "father_name",
                type: "text",
                req: true,
                value: student.father_name,
                onChange: handleChange
              }}
            />
          </div>
          <div className="mx-12">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <textarea
              name="address"
              required
              value={student.address}
              onChange={handleChange}
              className="border flex-grow sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-5 w-full justify-center">
            <Input
              field={{
                name: "room",
                type: "number",
                req: true,
                value: String(student.room_no),
                onChange: handleChange,
              }}
            />
            <Input
              field={{
                name: "hostel",
                placeholder: "Student Hostel",
                type: "text",
                req: true,
                value: student.hostel,
                disabled: true,
                onChange: (() => { }),
              }}
            />
            <Input
              field={{
                name: "dept",
                type: "text",
                req: true,
                value: student.dept,
                onChange: handleChange,
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <Input
              field={{
                name: "course",
                type: "text",
                req: true,
                value: student.course,
                onChange: handleChange,
              }}
            />
            <Input
              field={{
                name: "batch",
                type: "number",
                req: true,
                value: String(student.batch),
                onChange: handleChange,
              }}
            />
          </div>
          <div className="mt-5">
            <Button>
              {loading ? (
                <span className='disabled:true'>
                  <Loader /> Saving...
                </span>
              ) : (
                <span>Save Changes</span>
              )}
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
