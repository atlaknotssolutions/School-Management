export const admissionEnquiries = [
  { id: "ENQ501", childName: "Advika Sharma", parentName: "Rohit Sharma", classApplied: "Class 2", contact: "+91 9827611234", date: "2026-08-28", source: "Website", status: "New", followUp: "2026-09-02" },
  { id: "ENQ502", childName: "Kabir Malhotra", parentName: "Simran Malhotra", classApplied: "Nursery", contact: "+91 9876512340", date: "2026-08-27", source: "Referral", status: "Contacted", followUp: "2026-09-01" },
  { id: "ENQ503", childName: "Ishita Rao", parentName: "Vivek Rao", classApplied: "Class 6", contact: "+91 9911223344", date: "2026-08-26", source: "Walk-in", status: "Campus Visit Scheduled", followUp: "2026-09-03" },
  { id: "ENQ504", childName: "Reyansh Gupta", parentName: "Alok Gupta", classApplied: "LKG", contact: "+91 9765432109", date: "2026-08-25", source: "Newspaper Ad", status: "Admission Confirmed", followUp: "—" },
  { id: "ENQ505", childName: "Myra Desai", parentName: "Ketan Desai", classApplied: "Class 9", contact: "+91 9090909090", date: "2026-08-24", source: "Website", status: "New", followUp: "2026-09-01" },
  { id: "ENQ506", childName: "Aarav Nair", parentName: "Sunitha Nair", classApplied: "UKG", contact: "+91 9812345670", date: "2026-08-22", source: "Social Media", status: "Contacted", followUp: "2026-08-31" },
  { id: "ENQ507", childName: "Diya Patel", parentName: "Nikhil Patel", classApplied: "Class 4", contact: "+91 9723456781", date: "2026-08-20", source: "Referral", status: "Declined", followUp: "—" },
  { id: "ENQ508", childName: "Vihaan Joshi", parentName: "Meenal Joshi", classApplied: "Class 1", contact: "+91 9634567892", date: "2026-08-18", source: "Walk-in", status: "Campus Visit Scheduled", followUp: "2026-08-30" },
];

export const notices = [
  { id: 1, title: "PTM Scheduled for Classes 6–8", category: "Academic", date: "2026-09-05", audience: "Classes 6–8 Parents", body: "Parent-Teacher Meeting will be held in the respective classrooms from 9:00 AM to 12:00 PM. Report cards for the term will be shared.", pinned: true },
  { id: 2, title: "Ganesh Chaturthi Holiday", category: "Holiday", date: "2026-09-06", audience: "All", body: "School will remain closed on account of Ganesh Chaturthi. Classes resume on 8th September.", pinned: true },
  { id: 3, title: "Annual Sports Day Practice Begins", category: "Sports", date: "2026-09-08", audience: "Classes 3–10", body: "Practice sessions for Annual Sports Day will begin from Monday in the school ground, 3:30–5:00 PM.", pinned: false },
  { id: 4, title: "Fee Due Reminder — Term 2", category: "Fees", date: "2026-09-01", audience: "All Parents", body: "Term 2 fee payment deadline is 15th September 2026. Late fee of ₹500 applies after the due date.", pinned: true },
  { id: 5, title: "Inter-School Science Exhibition", category: "Event", date: "2026-09-12", audience: "Classes 9–12", body: "Selected students will represent Brightwood at the Regional Science Exhibition at DAVV Campus.", pinned: false },
  { id: 6, title: "New Bus Route Added — Rau Sector", category: "Transport", date: "2026-08-30", audience: "Transport Users", body: "A new bus route covering Rau and MR-10 area has been added. Contact transport office for registration.", pinned: false },
];

export const homework = [
  { id: 1, class: "Class 8", section: "A", subject: "Mathematics", title: "Chapter 5 — Linear Equations, Q1–15", assignedDate: "2026-08-30", dueDate: "2026-09-02", teacher: "Kavita Joshi", status: "Pending" },
  { id: 2, class: "Class 8", section: "A", subject: "Science", title: "Diagram: Human Digestive System with labels", assignedDate: "2026-08-29", dueDate: "2026-09-01", teacher: "Pooja Reddy", status: "Submitted" },
  { id: 3, class: "Class 5", section: "B", subject: "English", title: "Write a paragraph on 'My Favourite Festival'", assignedDate: "2026-08-30", dueDate: "2026-09-02", teacher: "Ritu Sharma", status: "Pending" },
  { id: 4, class: "Class 10", section: "A", subject: "Social Science", title: "Map work — Indian Freedom Movement locations", assignedDate: "2026-08-28", dueDate: "2026-09-01", teacher: "Kavita Joshi", status: "Graded" },
  { id: 5, class: "Class 6", section: "C", subject: "Hindi", title: "व्याकरण अभ्यास — पृष्ठ 22-24", assignedDate: "2026-08-29", dueDate: "2026-09-01", teacher: "Ramesh Iyer", status: "Submitted" },
  { id: 6, class: "Class 9", section: "B", subject: "Computer Science", title: "Python program: prime number checker", assignedDate: "2026-08-30", dueDate: "2026-09-03", teacher: "Manish Gupta", status: "Pending" },
];

export const events = [
  { id: 1, title: "Annual Sports Day", date: "2026-10-10", time: "8:00 AM", venue: "School Ground", category: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop" },
  { id: 2, title: "Independence Day Celebration", date: "2026-08-15", time: "8:30 AM", venue: "Main Auditorium", category: "National", image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&h=500&fit=crop" },
  { id: 3, title: "Inter-House Science Exhibition", date: "2026-09-12", time: "10:00 AM", venue: "Science Block", category: "Academic", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop" },
  { id: 4, title: "Annual Day — 'Rhythms of India'", date: "2026-12-18", time: "5:00 PM", venue: "Main Auditorium", category: "Cultural", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=500&fit=crop" },
  { id: 5, title: "Parent-Teacher Meeting", date: "2026-09-05", time: "9:00 AM", venue: "Respective Classrooms", category: "Academic", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=500&fit=crop" },
  { id: 6, title: "Winter Break Begins", date: "2026-12-24", time: "All Day", venue: "—", category: "Holiday", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop" },
];

export const messages = [
  { id: 1, from: "Kavita Joshi (Class Teacher — 8A)", to: "Rohit Sharma (Parent of Advika Sharma)", subject: "Improvement in Mathematics", preview: "Advika has shown great improvement in her recent unit test...", date: "2026-08-31", time: "4:12 PM", unread: true, type: "one-to-one" },
  { id: 2, from: "Admin Office", to: "All Parents — Class 6", subject: "Sports Day Kit Reminder", preview: "Please ensure your ward brings the house-colour t-shirt by Friday...", date: "2026-08-31", time: "11:00 AM", unread: true, type: "broadcast" },
  { id: 3, from: "Ramesh Iyer (Hindi Teacher)", to: "Sunitha Nair (Parent)", subject: "Hindi recitation competition", preview: "Aarav has been selected for the inter-class Hindi recitation...", date: "2026-08-30", time: "2:45 PM", unread: false, type: "one-to-one" },
  { id: 4, from: "Transport Office", to: "All Bus Route 4 Parents", subject: "Bus timing change from Monday", preview: "Due to road repair work near MR-10, pickup time will shift by 10 minutes...", date: "2026-08-29", time: "6:30 PM", unread: false, type: "broadcast" },
  { id: 5, from: "Principal's Office", to: "All Staff", subject: "Staff meeting — Monday 8 AM", preview: "A brief staff meeting is scheduled before assembly to discuss...", date: "2026-08-29", time: "5:00 PM", unread: false, type: "broadcast" },
];
