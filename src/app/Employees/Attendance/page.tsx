"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const attendanceData = [
  {
    id: 1,
    name: "Sagar",
    date: "2022-11-16",
    employeeId: "EMP001",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "On Time",
  },
  {
    id: 2,
    name: "Zeeshan",
    date: "2022-11-16",
    employeeId: "EMP002",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "Late",
  },
  {
    id: 3,
    name: "Mehroz",
    date: "2022-11-16",
    employeeId: "EMP003",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "Late",
  },
  {
    id: 4,
    name: "John Doe",
    date: "2022-11-16",
    employeeId: "EMP004",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "On Time",
  },
  {
    id: 5,
    name: "Mehroz",
    date: "2022-11-16",
    employeeId: "EMP003",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "Late",
  },
  {
    id: 6,
    name: "John Doe",
    date: "2022-11-16",
    employeeId: "EMP004",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "On Time",
  },
  {
    id: 7,
    name: "Mehroz",
    date: "2022-11-16",
    employeeId: "EMP003",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "Late",
  },
  {
    id: 8,
    name: "John Doe",
    date: "2022-11-16",
    employeeId: "EMP004",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "On Time",
  },
  {
    id: 9,
    name: "John Doe",
    date: "2022-11-16",
    employeeId: "EMP004",
    timeIn: "12:00",
    timeOut: "09:00",
    Attendance: "On Time",
  },
];

const Attendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const employeesPerPage: number = 8;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(event.target.value);
  };

  const handleSearchStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchStatus(event.target.value);
  };

  const handleSelectEmployee = (id: number) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((employeeId) => employeeId !== id)
        : [...prevSelected, id],
    );
  };

  const indexOfLastEmployee: number = currentPage * employeesPerPage;
  const indexOfFirstEmployee: number = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = attendanceData
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((employee) => (searchDate ? employee.date === searchDate : true))
    .filter((employee) =>
      searchStatus ? employee.Attendance === searchStatus : true,
    )
    .slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DefaultLayout>
      <div className="max-w-12xl mx-auto">
        <Breadcrumb pageName="Attendance" />
        <div className="my-4 flex items-center justify-end">
          <input
            type="text"
            placeholder="Search employees"
            value={searchTerm}
            onChange={handleSearch}
            className="mx-2 w-[250px] rounded border p-2"
          />
          <input
            type="date"
            value={searchDate}
            onChange={handleSearchDate}
            className="mx-2 w-[250px] rounded border p-2"
          />
          <select
            value={searchStatus}
            onChange={handleSearchStatus}
            className="mx-2 w-[250px] rounded border p-2"
          >
            <option value="">All Statuses</option>
            <option value="On Time">On Time</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <table className="min-w-full bg-white my-8">
          <thead className=" bg-black text-white">
            <tr className=" pr-4">
              <th className=" text-left py-4 px-4">Select</th>
              <th className=" text-left py-4 ">Date</th>
              <th className=" text-left py-4 ">Employee Id</th>
              <th className=" text-left py-4 ">Name</th>
              <th className=" text-left py-4 ">Attendance</th>
              <th className=" text-left py-4 ">Time In</th>
              <th className=" text-left py-4 ">Time Out</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className=" border-y-2 border-[#dcdcdc]">
                <td className=" px-6 py-6">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleSelectEmployee(employee.id)}
                  />
                </td>
                <td>{employee.date}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-white ${
                      employee.Attendance === "On Time"
                        ? "bg-green-500"
                        : "bg-rose-600"
                    }`}
                  >
                    {employee.Attendance}
                  </span>
                </td>
                <td>{employee.timeIn}</td>
                <td>{employee.timeOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <Pagination
            employeesPerPage={employeesPerPage}
            totalEmployees={attendanceData.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

type PaginationProps = {
  employeesPerPage: number;
  totalEmployees: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  employeesPerPage,
  totalEmployees,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex list-none">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`border px-3 py-1 ${
                currentPage === number ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Attendance;
