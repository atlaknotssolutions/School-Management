// Seed data for Library, Leave, Hostel and Payroll modules.

export const libraryBooks = [
  { id: "BK-1001", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", isbn: "978-0449213445", category: "Finance", copies: 5, available: 3, addedOn: "2026-04-12" },
  { id: "BK-1002", title: "The Alchemist", author: "Paulo Coelho", isbn: "978-0062315007", category: "Fiction", copies: 8, available: 6, addedOn: "2026-04-12" },
  { id: "BK-1003", title: "NCERT Mathematics Class 9", author: "NCERT", isbn: "978-8174504843", category: "Textbook", copies: 40, available: 37, addedOn: "2026-05-02" },
  { id: "BK-1004", title: "Wings of Fire", author: "A.P.J. Abdul Kalam", isbn: "978-8173711466", category: "Biography", copies: 6, available: 4, addedOn: "2026-05-20" },
  { id: "BK-1005", title: "The Discovery of India", author: "Jawaharlal Nehru", isbn: "9780143031031", category: "History", copies: 4, available: 1, addedOn: "2026-06-08" },
  { id: "BK-1006", title: "General Science (X)", author: "Lakhmir Singh", isbn: "978-9352837074", category: "Textbook", copies: 35, available: 32, addedOn: "2026-06-15" },
  { id: "BK-1007", title: "The Monk Who Sold His Ferrari", author: "Robin Sharma", isbn: "9788179921623", category: "Self-Help", copies: 7, available: 5, addedOn: "2026-07-01" },
  { id: "BK-1008", title: "Fundamentals of Physics", author: "H.C. Verma", isbn: "978-8177091878", category: "Textbook", copies: 12, available: 3, addedOn: "2026-07-18" },
];

export const libraryIssues = [
  { id: "ISS-1", bookId: "BK-1002", title: "The Alchemist", borrower: "Aarav Sharma", borrowerId: "STU1000", studentClass: "6-A", issuedOn: "2026-08-20", dueOn: "2026-09-03", status: "Issued" },
  { id: "ISS-2", bookId: "BK-1005", title: "The Discovery of India", borrower: "Saanvi Verma", borrowerId: "STU1089", studentClass: "9-B", issuedOn: "2026-08-14", dueOn: "2026-08-28", status: "Overdue" },
  { id: "ISS-3", bookId: "BK-1001", title: "Rich Dad Poor Dad", borrower: "Ishaan Patel", borrowerId: "STU1002", studentClass: "11-Sci", issuedOn: "2026-08-22", dueOn: "2026-09-05", status: "Issued" },
];

export const leaveRequests = [
  { id: "LV-1001", applicant: "Pooja Reddy", role: "Staff", type: "Casual Leave", from: "2026-09-07", to: "2026-09-08", days: 2, reason: "Family function", status: "Approved", appliedOn: "2026-09-01" },
  { id: "LV-1002", applicant: "Aarav Sharma", role: "Student", type: "Medical Leave", from: "2026-09-10", to: "2026-09-10", days: 1, reason: "Doctor appointment", status: "Pending", appliedOn: "2026-09-02" },
  { id: "LV-1003", applicant: "Ramesh Iyer", role: "Staff", type: "Privilege Leave", from: "2026-09-14", to: "2026-09-18", days: 5, reason: "Travelling to hometown", status: "Pending", appliedOn: "2026-09-02" },
  { id: "LV-1004", applicant: "Diya Iyer", role: "Student", type: "Casual Leave", from: "2026-08-27", to: "2026-08-28", days: 2, reason: "Out of station", status: "Rejected", appliedOn: "2026-08-26" },
];

export const leaveBalance = [
  { id: "emp-1", name: "Pooja Reddy", role: "Staff", entitled: 14, used: 6 },
  { id: "emp-2", name: "Ramesh Iyer", role: "Staff", entitled: 14, used: 9 },
  { id: "emp-3", name: "Kavita Joshi", role: "Staff", entitled: 14, used: 4 },
  { id: "emp-4", name: "Manish Gupta", role: "Staff", entitled: 14, used: 11 },
];

export const hostelRooms = [
  { id: "HR-101", block: "A", capacity: 3, occupants: ["Aarav Sharma", "Ishaan Patel"], floor: 1, wing: "Boys" },
  { id: "HR-102", block: "A", capacity: 3, occupants: [], floor: 1, wing: "Boys" },
  { id: "HR-201", block: "B", capacity: 2, occupants: ["Saanvi Verma"], floor: 2, wing: "Girls" },
  { id: "HR-202", block: "B", capacity: 2, occupants: ["Diya Iyer", "Ananya Gupta"], floor: 2, wing: "Girls" },
  { id: "HR-301", block: "C", capacity: 4, occupants: ["Vihaan Reddy"], floor: 3, wing: "Boys" },
  { id: "HR-302", block: "C", capacity: 4, occupants: [], floor: 3, wing: "Boys" },
];

export const hostelStudents = [
  { id: "STU1000", name: "Aarav Sharma", hostelRoom: "HR-101" },
  { id: "STU1002", name: "Ishaan Patel", hostelRoom: "HR-101" },
  { id: "STU1089", name: "Saanvi Verma", hostelRoom: "HR-201" },
  { id: "STU1004", name: "Diya Iyer", hostelRoom: "HR-202" },
  { id: "STU1003", name: "Ananya Gupta", hostelRoom: "HR-202" },
  { id: "STU1005", name: "Vihaan Reddy", hostelRoom: "HR-301" },
];

export const staffPayroll = [
  { id: "EMP-01", name: "Ritu Sharma", designation: "Principal", department: "Administration", basic: 85000, allowances: 15000, deductions: 12000, paid: true, salaryDate: "2026-08-31" },
  { id: "EMP-02", name: "Kavita Joshi", designation: "Vice Principal", department: "Administration", basic: 65000, allowances: 10000, deductions: 9000, paid: true, salaryDate: "2026-08-31" },
  { id: "EMP-03", name: "Pooja Reddy", designation: "Senior Teacher", department: "Science", basic: 42000, allowances: 6000, deductions: 5000, paid: false, salaryDate: "2026-08-31" },
  { id: "EMP-04", name: "Ramesh Iyer", designation: "Math Teacher", department: "Science", basic: 38000, allowances: 5000, deductions: 4500, paid: false, salaryDate: "2026-08-25" },
  { id: "EMP-05", name: "Manish Gupta", designation: "Accountant", department: "Finance", basic: 35000, allowances: 4000, deductions: 4000, paid: true, salaryDate: "2026-08-31" },
  { id: "EMP-06", name: "Suresh Kulkarni", designation: "IT Admin", department: "IT", basic: 30000, allowances: 5000, deductions: 3500, paid: true, salaryDate: "2026-08-31" },
];