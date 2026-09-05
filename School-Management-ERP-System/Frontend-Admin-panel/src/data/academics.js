export const examSchedule = [
  { id: 1, exam: "Term 2 — Mid Term", class: "Class 8", subject: "Mathematics", date: "2026-09-15", time: "9:00 AM – 11:00 AM", room: "Room 204", maxMarks: 80 },
  { id: 2, exam: "Term 2 — Mid Term", class: "Class 8", subject: "Science", date: "2026-09-17", time: "9:00 AM – 11:00 AM", room: "Room 204", maxMarks: 80 },
  { id: 3, exam: "Term 2 — Mid Term", class: "Class 8", subject: "English", date: "2026-09-19", time: "9:00 AM – 11:00 AM", room: "Room 204", maxMarks: 80 },
  { id: 4, exam: "Term 2 — Mid Term", class: "Class 8", subject: "Social Science", date: "2026-09-21", time: "9:00 AM – 11:00 AM", room: "Room 204", maxMarks: 80 },
  { id: 5, exam: "Term 2 — Mid Term", class: "Class 8", subject: "Hindi", date: "2026-09-23", time: "9:00 AM – 11:00 AM", room: "Room 204", maxMarks: 80 },
  { id: 6, exam: "Term 2 — Mid Term", class: "Class 10", subject: "Mathematics", date: "2026-09-15", time: "9:00 AM – 12:00 PM", room: "Room 301", maxMarks: 80 },
  { id: 7, exam: "Term 2 — Mid Term", class: "Class 10", subject: "Science", date: "2026-09-17", time: "9:00 AM – 12:00 PM", room: "Room 301", maxMarks: 80 },
];

export const subjectResults = [
  { subject: "English", marks: 84, max: 100 },
  { subject: "Hindi", marks: 78, max: 100 },
  { subject: "Mathematics", marks: 91, max: 100 },
  { subject: "Science", marks: 88, max: 100 },
  { subject: "Social Science", marks: 76, max: 100 },
  { subject: "Computer Science", marks: 95, max: 100 },
];

export const timetable = {
  "Class 8-A": {
    Monday: ["Mathematics","English","Science","Break","Social Science","Hindi","Computer Science","Physical Education"],
    Tuesday: ["Science","Mathematics","Hindi","Break","English","Computer Science","Social Science","Art"],
    Wednesday: ["English","Social Science","Mathematics","Break","Science","Hindi","Physical Education","Library"],
    Thursday: ["Hindi","Science","English","Break","Mathematics","Social Science","Computer Science","Music"],
    Friday: ["Social Science","English","Hindi","Break","Computer Science","Mathematics","Science","Art"],
    Saturday: ["Mathematics","Science","English","Break","Sports","Sports","—","—"],
  },
};
export const periods = ["9:00–9:45","9:45–10:30","10:30–11:15","11:15–11:35","11:35–12:20","12:20–1:05","1:05–1:50","1:50–2:35"];

export const feeStructure = [
  { head: "Tuition Fee", termAmount: 18500 },
  { head: "Transport Fee", termAmount: 4500 },
  { head: "Library & Lab Fee", termAmount: 1200 },
  { head: "Activity & Sports Fee", termAmount: 1500 },
  { head: "Development Fee", termAmount: 2000 },
];

export const feeTransactions = [
  { id: "TXN9001", student: "Aarav Sharma", class: "Class 6-A", term: "Term 1", amount: 26500, mode: "Online — UPI", date: "2026-06-12", status: "Success", receipt: "RCPT-2026-0341" },
  { id: "TXN9002", student: "Saanvi Verma", class: "Class 4-B", term: "Term 1", amount: 26500, mode: "Online — Net Banking", date: "2026-06-14", status: "Success", receipt: "RCPT-2026-0356" },
  { id: "TXN9003", student: "Ishaan Patel", class: "Class 9-A", term: "Term 2", amount: 27700, mode: "Cheque", date: "2026-08-29", status: "Pending Clearance", receipt: "RCPT-2026-0902" },
  { id: "TXN9004", student: "Ananya Gupta", class: "Class 2-C", term: "Term 2", amount: 13850, mode: "Online — Card", date: "2026-08-30", status: "Success", receipt: "RCPT-2026-0918" },
  { id: "TXN9005", student: "Vihaan Reddy", class: "Class 7-B", term: "Term 2", amount: 27700, mode: "Cash", date: "2026-08-27", status: "Success", receipt: "RCPT-2026-0889" },
  { id: "TXN9006", student: "Diya Iyer", class: "Class 5-A", term: "Term 2", amount: 0, mode: "—", date: "—", status: "Overdue", receipt: "—" },
];

export const inventory = [
  { id: "INV001", item: "NCERT Textbook Set — Class 6", category: "Books", stock: 42, reorderLevel: 20, unit: "Sets", lastRestocked: "2026-07-15" },
  { id: "INV002", item: "Science Lab — Beakers 250ml", category: "Lab Equipment", stock: 18, reorderLevel: 25, unit: "Pieces", lastRestocked: "2026-05-10" },
  { id: "INV003", item: "Basketballs", category: "Sports", stock: 12, reorderLevel: 10, unit: "Pieces", lastRestocked: "2026-08-01" },
  { id: "INV004", item: "Whiteboard Markers (Box)", category: "Stationery", stock: 65, reorderLevel: 30, unit: "Boxes", lastRestocked: "2026-08-20" },
  { id: "INV005", item: "Desktop Computers — Lab 2", category: "IT Equipment", stock: 8, reorderLevel: 15, unit: "Units", lastRestocked: "2026-03-05" },
  { id: "INV006", item: "First Aid Kits", category: "Medical", stock: 6, reorderLevel: 8, unit: "Kits", lastRestocked: "2026-06-18" },
  { id: "INV007", item: "A4 Paper Ream", category: "Stationery", stock: 120, reorderLevel: 50, unit: "Reams", lastRestocked: "2026-08-25" },
  { id: "INV008", item: "Chemistry Lab — Test Tubes", category: "Lab Equipment", stock: 90, reorderLevel: 40, unit: "Pieces", lastRestocked: "2026-07-01" },
];

export const busRoutes = [
  {
    id: "BUS-01",
    route: "Arera Colony — MP Nagar — School",
    driver: "Mahesh Chouhan", conductor: "Ramesh Bhai",
    driverPhone: "+91 98260 12345", conductorPhone: "+91 98260 54321",
    capacity: 45, occupied: 38, status: "On Route",
    lastStop: "MP Nagar Zone-1", eta: "8 mins", speed: 34,
    cctvCount: 4,
    lat: 23.2377, lng: 77.4320,
    waypoints: [
      [23.2390, 77.4350], [23.2365, 77.4330], [23.2377, 77.4320],
      [23.2500, 77.4240], [23.2580, 77.4160], [23.2599, 77.4126],
    ],
  },
  {
    id: "BUS-02",
    route: "BHEL — Awadhpuri — School",
    driver: "Suraj Yadav", conductor: "Vinod Kumar",
    driverPhone: "+91 98930 22456", conductorPhone: "+91 98930 65432",
    capacity: 45, occupied: 41, status: "On Route",
    lastStop: "Awadhpuri Sector-1", eta: "14 mins", speed: 28,
    cctvCount: 4,
    lat: 23.2720, lng: 77.4370,
    waypoints: [
      [23.2760, 77.4360], [23.2700, 77.4360], [23.2720, 77.4370],
      [23.2650, 77.4280], [23.2600, 77.4190], [23.2599, 77.4126],
    ],
  },
  {
    id: "BUS-03",
    route: "Kolar Road — Nayapura — School",
    driver: "Dilip Rathore", conductor: "Sanjay Bhai",
    driverPhone: "+91 94250 77890", conductorPhone: "+91 94250 88901",
    capacity: 40, occupied: 30, status: "Delayed",
    lastStop: "Kolar Junction", eta: "22 mins", speed: 18,
    cctvCount: 4,
    lat: 23.1950, lng: 77.3850,
    waypoints: [
      [23.1756, 77.3600], [23.1850, 77.3720], [23.1950, 77.3850],
      [23.2100, 77.4000], [23.2400, 77.4100], [23.2599, 77.4126],
    ],
  },
  {
    id: "BUS-04",
    route: "Hoshangabad Road — Bawadiya — School",
    driver: "Naresh Solanki", conductor: "Anil Kumar",
    driverPhone: "+91 90098 33441", conductorPhone: "+91 90098 55442",
    capacity: 45, occupied: 44, status: "On Route",
    lastStop: "Bawadiya Kalan", eta: "6 mins", speed: 41,
    cctvCount: 6,
    lat: 23.2400, lng: 77.4700,
    waypoints: [
      [23.1951, 77.4650], [23.2150, 77.4660], [23.2400, 77.4700],
      [23.2550, 77.4500], [23.2599, 77.4126],
    ],
  },
  {
    id: "BUS-05",
    route: "Ashoka Garden — Shahpura — School",
    driver: "Prakash Tiwari", conductor: "Mukesh Bhai",
    driverPhone: "+91 92290 11223", conductorPhone: "+91 92290 33445",
    capacity: 40, occupied: 25, status: "Not Started",
    lastStop: "Depot", eta: "—", speed: 0,
    cctvCount: 4,
    lat: 23.2530, lng: 77.4700,
    waypoints: [
      [23.2528, 77.4800], [23.2530, 77.4700],
      [23.2590, 77.4500], [23.2599, 77.4126],
    ],
  },
];

export const transportDesk = {
  name: "Transport Office — Brightwood School, Bhopal",
  phone: "+91 755 400 2200",
};

export const attendanceTrend = [
  { month: "Apr", attendance: 94 },
  { month: "May", attendance: 92 },
  { month: "Jun", attendance: 89 },
  { month: "Jul", attendance: 95 },
  { month: "Aug", attendance: 93 },
  { month: "Sep", attendance: 96 },
];

export const feeCollectionTrend = [
  { month: "Apr", collected: 1120000, pending: 240000 },
  { month: "May", collected: 980000, pending: 190000 },
  { month: "Jun", collected: 1540000, pending: 310000 },
  { month: "Jul", collected: 1280000, pending: 220000 },
  { month: "Aug", collected: 1690000, pending: 380000 },
];

export const classStrength = [
  { name: "Pre-Primary", value: 145 },
  { name: "Primary (1–5)", value: 320 },
  { name: "Middle (6–8)", value: 268 },
  { name: "Secondary (9–10)", value: 190 },
  { name: "Senior Sec. (11–12)", value: 142 },
];
