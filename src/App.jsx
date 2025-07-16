import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    id: Date.now(),
    firstName: '',
    lastName: '',
    jobTitle: '',
    jobDesc: '',
    jobRole: ''
  });

  const [value, setValue] = useState([]);
  const [editId, setEditId] = useState(null);

  const HandleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.firstName === '') {
      alert('Fill all the fields')
      return;
    }

    if (editId !== null) {
      const updatedList = value.map((item) =>
        item.id === editId ? { ...item, ...form }: item
      );
      setValue(updatedList);
      setEditId(null);
    } else {
      
      setValue([...value, { ...form, id: Date.now() }]);
    }
    setForm({
      id: Date.now(),
      firstName: '',
      lastName: '',
      jobTitle: '',
      jobDesc: '',
      jobRole: ''
    });
  };

  const handleDelete = (id) => {
    const deletedItem = value.filter((item) => item.id !== id);
    setValue(deletedItem);
  };

  const handleUpdate = (id) => {
    const updateItem = value.find((item) => item.id === id);
    setForm(updateItem);
    setEditId(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12 container mx-auto m-10 bg-gray-200 p-15">
        <h1 className='text-4xl font-bold text-orange-500'>Employee Managment</h1>
          

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">First name</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="first-name"
                  value={form.firstName}
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                  onChange={HandleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">Last name</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  value={form.lastName}
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                  onChange={HandleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="job-title" className="block text-sm font-medium text-gray-900">Job title</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="jobTitle"
                  id="job-title"
                  value={form.jobTitle}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                  onChange={HandleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-900">Job description</label>
              <div className="mt-2">
                <textarea
                  name="jobDesc"
                  id="job-description"
                  value={form.jobDesc}
                  className="bg-gray-50 w-full"
                  onChange={HandleChange}
                ></textarea>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="job-role" className="block text-sm font-medium text-gray-900">Job Role</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="jobRole"
                  id="job-role"
                  value={form.jobRole}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                  onChange={HandleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <button
                  type="submit"
                  className="block w-1/2 rounded-md  font-bold px-3 py-1.5 bg-orange-500 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>






    {value.length >0 ? (

      <div class="container mx-auto ">
      <h1 className='text-2xl text-orange-500 m-4'>Employee Data</h1>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 whitespace-nowrap">

          <tr>
            <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
             Firstname
            </th>
            <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              LastName
            </th>
            <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Job Tiltel
            </th>
            <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Job Description
            </th>
            <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Job Role
            </th>
            <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {value.map((item)=>{
              return <tr key={item.id}>
                 <td class="px-4 py-4 text-sm text-slate-900 font-medium">
              {item.firstName}
            </td>
            <td class="px-4 py-4 text-sm text-slate-600 font-medium">
               {item.lastName}
            </td>
            <td class="px-4 py-4 text-sm text-slate-600 font-medium">
              {item.jobTitle}
            </td>
            <td class="px-4 py-4 text-sm text-slate-600 font-medium">
              {item.jobDesc}
            </td>
            <td class="px-4 py-4 text-sm text-slate-600 font-medium">
              {item.jobRole}
            </td>
            <td class="px-4 py-4 text-sm">
               <button onClick={() => handleDelete(item.id)} className="mr-4 bg-red-400 px-3 py-1 rounded text-white">Delete</button>
               <button onClick={() => handleUpdate(item.id)} className="bg-yellow-400 px-3 py-1 rounded text-white">Edit</button>
            </td>
          </tr>
          })}
        </tbody>
      </table>
    </div> )
    : <p className='text-xl  font-bold mx-auto container text-center bg-gray-300 p-6 rounded-3xl text-orange-400'>No Data </p>}
    </>
  );
}

export default App;
