const names = [
  "Anjali Verma","Ramesh Iyer","Priya Nair","Suresh Kulkarni","Neha Kapoor","Vikram Rao",
  "Deepa Menon","Arun Chauhan","Kavita Joshi","Sanjay Mehta","Pooja Reddy","Manish Gupta",
  "Shalini Bhat","Ajay Malhotra","Ritu Sharma","Rakesh Patel"
];
const roles = ["Principal","Vice Principal","PGT Physics","PGT Chemistry","TGT Mathematics","TGT English","PRT Class 3","PRT Class 4","TGT Social Science","PGT Biology","Sports Coordinator","Librarian","Computer Teacher","Music Teacher","Counsellor","Accountant"];
const depts = ["Administration","Administration","Science","Science","Mathematics","Languages","Primary","Primary","Humanities","Science","Sports","Library","Computer Science","Arts","Wellness","Finance"];
const colors = ["16213E","E8A33D","3F8F5F","3B6FA0","D65A4A","6B4F9C"];

export const staff = names.map((name, i) => ({
  id: `EMP${100 + i}`,
  name,
  role: roles[i],
  department: depts[i],
  email: `${name.split(" ")[0].toLowerCase()}.${name.split(" ")[1].toLowerCase()}@brightwoodschool.edu.in`,
  contact: `+91 ${98000 + i * 211}${1000 + i}`.slice(0, 13),
  joined: `20${15 + (i % 9)}-0${(i % 9) + 1}-1${i % 9}`,
  attendance: Math.round(88 + ((i * 7) % 12)),
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${colors[i % colors.length]}&color=fff&bold=true`,
}));
