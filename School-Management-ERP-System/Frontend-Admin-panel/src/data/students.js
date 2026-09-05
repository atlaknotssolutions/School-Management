// Realistic dummy student data. Avatars use ui-avatars.com (initials-based, no real photos of people).
const firstNamesM = ["Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Krishna","Ishaan","Kabir","Rohan","Yash","Dhruv","Aryan","Kartik","Rudra","Shaurya","Atharv","Om","Neel"];
const firstNamesF = ["Saanvi","Aadhya","Ananya","Diya","Ira","Myra","Anika","Kavya","Riya","Sara","Aarohi","Pari","Navya","Prisha","Zara","Meera","Tanvi","Ishita","Avni","Siya"];
const lastNames = ["Sharma","Verma","Patel","Gupta","Reddy","Iyer","Nair","Joshi","Mehta","Rao","Kulkarni","Chauhan","Malhotra","Kapoor","Bhat","Agarwal","Singh","Yadav","Desai","Pillai"];

function seededRand(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const classesShort = ["Nursery","LKG","UKG","1","2","3","4","5","6","7","8","9","10","11-Sci","11-Com","12-Sci","12-Com"];
const sectionsArr = ["A","B","C"];
const colors = ["16213E","E8A33D","3F8F5F","3B6FA0","D65A4A","6B4F9C"];

export const students = Array.from({ length: 60 }).map((_, i) => {
  const isM = seededRand(i + 1) > 0.5;
  const fn = isM ? firstNamesM[i % firstNamesM.length] : firstNamesF[i % firstNamesF.length];
  const ln = lastNames[(i * 3 + 7) % lastNames.length];
  const cls = classesShort[i % classesShort.length];
  const section = sectionsArr[i % sectionsArr.length];
  const roll = 100 + i;
  const attendance = Math.round(72 + seededRand(i * 5) * 27);
  const feeStatus = seededRand(i * 9) > 0.72 ? "Pending" : seededRand(i * 9) > 0.4 ? "Partially Paid" : "Paid";
  const color = colors[i % colors.length];
  return {
    id: `STU${1000 + i}`,
    name: `${fn} ${ln}`,
    gender: isM ? "Male" : "Female",
    class: cls,
    section,
    roll,
    dob: `${2008 + (i % 15)}-0${(i % 9) + 1}-${10 + (i % 18)}`,
    bloodGroup: ["A+","B+","O+","AB+","A-","O-"][i % 6],
    parentName: `${lastNames[(i + 2) % lastNames.length]} Family`,
    fatherName: `${["Rajesh","Sunil","Vikram","Anil","Manoj","Deepak","Ashok","Ramesh"][i % 8]} ${ln}`,
    motherName: `${["Sunita","Pooja","Kavita","Neha","Rekha","Meena","Shweta","Ritu"][i % 8]} ${ln}`,
    contact: `+91 ${70000 + i * 137}${10000 + i}`.slice(0, 13),
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@brightwoodschool.edu.in`,
    address: `House No. ${12 + i}, ${["Arera Colony","MP Nagar","BHEL","Kolar Road","Nayapura","Hoshangabad Road"][i % 6]}, Bhopal`,
    attendance,
    feeStatus,
    avatar: `https://ui-avatars.com/api/?name=${fn}+${ln}&background=${color}&color=fff&bold=true`,
    house: ["Aravali","Nilgiri","Shivalik","Vindhya"][i % 4],
  };
});

export const getStudentsByClassSection = (cls, section) =>
  students.filter(s => s.class === cls && (section ? s.section === section : true));
