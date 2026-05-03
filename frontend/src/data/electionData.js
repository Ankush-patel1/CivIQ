import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getElectionStatus } from '../utils/dateUtils';

export const STATE_ELECTIONS = [
  { 
    state: "Delhi", 
    year: 2025, 
    month: "February", 
    day: 5,
    seats: 70,
    keyIssues: ["Pollution", "Urban Governance", "Free Utilities"],
    lastElection: "2020",
    currentGovernment: "BJP (Rekha Gupta CM)",
    phases: 1
  },
  { 
    state: "Bihar", 
    year: 2025, 
    month: "November", 
    day: 6,
    seats: 243,
    keyIssues: ["Employment", "Infrastructure", "Social Justice"],
    lastElection: "2020",
    currentGovernment: "NDA (Nitish Kumar CM)",
    phases: 2
  },
  { 
    state: "Assam", 
    year: 2026, 
    month: "April", 
    day: 9,
    seats: 126,
    keyIssues: ["Infrastructure", "Border Management", "Tea Industry"],
    lastElection: "2021",
    currentGovernment: "BJP",
    phases: 3
  },
  { 
    state: "Kerala", 
    year: 2026, 
    month: "April", 
    day: 9,
    seats: 140,
    keyIssues: ["Social Welfare", "Public Health", "Climate Resilience"],
    lastElection: "2021",
    currentGovernment: "LDF",
    phases: 1
  },
  { 
    state: "Tamil Nadu", 
    year: 2026, 
    month: "April", 
    day: 23,
    seats: 234,
    keyIssues: ["State Autonomy", "Language Policy", "Agriculture"],
    lastElection: "2021",
    currentGovernment: "DMK",
    phases: 1
  },
  { 
    state: "West Bengal", 
    year: 2026, 
    month: "April", 
    day: 23,
    seats: 294,
    keyIssues: ["Industrialization", "Law & Order", "Welfare Schemes"],
    lastElection: "2021",
    currentGovernment: "TMC",
    phases: 8
  },
  {
    state: "Haryana",
    year: 2024,
    month: "October",
    seats: 90,
    currentGovernment: "BJP",
    status: "Completed"
  },
  {
    state: "Maharashtra",
    year: 2024,
    month: "November",
    seats: 288,
    currentGovernment: "Mahayuti",
    status: "Completed"
  }
];

// Update STATE_ELECTIONS with dynamic status
export const ENHANCED_STATE_ELECTIONS = STATE_ELECTIONS.map(e => ({
  ...e,
  dynamicStatus: getElectionStatus(e)
}));

export const GENERAL_ELECTION = {
  title: "Lok Sabha 2029",
  status: "Upcoming",
  year: 2029,
  month: "May",
  countdown_years: 2029 - new Date().getFullYear(),
  totalSeats: 543
};

// --- Dynamic Data Transition ---
// Helper function to transition to dynamic data from Firestore
// In a production environment, components should fetch data using this function 
// instead of directly importing the static STATE_ELECTIONS array.
export async function fetchStateElections() {
  try {
    const querySnapshot = await getDocs(collection(db, "elections"));
    const staticData = ENHANCED_STATE_ELECTIONS;
    
    if (querySnapshot.empty) {
      return staticData;
    }
    
    const elections = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      elections.push({ 
        id: doc.id, 
        ...data,
        dynamicStatus: getElectionStatus(data)
      });
    });
    return elections;
  } catch (error) {
    console.error("Failed to fetch dynamic election data, falling back to static data", error);
    return ENHANCED_STATE_ELECTIONS;
  }
}
