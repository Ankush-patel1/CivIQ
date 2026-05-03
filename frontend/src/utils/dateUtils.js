
export const getElectionStatus = (election, now = new Date()) => {
  const monthMap = {
    "jan": 0, "feb": 1, "mar": 2, "apr": 3, "may": 4, "jun": 5,
    "jul": 6, "aug": 7, "sep": 8, "oct": 9, "nov": 10, "dec": 11,
    "january": 0, "february": 1, "march": 2, "april": 3, "may": 4, "june": 5,
    "july": 6, "august": 7, "september": 8, "october": 9, "november": 10, "december": 11
  };

  let electionYear = parseInt(election.year);
  let electionMonth = -1;
  let electionDay = parseInt(election.day) || 1;

  const dateStr = (election.month || election.expectedDate || "").toLowerCase();
  
  if (isNaN(electionYear)) {
    const yearMatch = dateStr.match(/\d{4}/);
    if (yearMatch) electionYear = parseInt(yearMatch[0]);
  }

  for (const [mName, mVal] of Object.entries(monthMap)) {
    if (dateStr.includes(mName)) {
      electionMonth = mVal;
      break;
    }
  }

  if (isNaN(electionYear) || electionMonth === -1) return "Upcoming";

  const electionDate = new Date(electionYear, electionMonth, electionDay);
  const today = new Date(now);
  
  // Set times to midnight for accurate day comparison
  electionDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = electionDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return "Completed";
  if (diffDays === 0) return "Ongoing Today";
  if (diffDays <= 30) return "Upcoming Soon";
  return "Upcoming";
};
