export type University = {
  id: string;
  name: string;
  short: string;
  city: string;
  emirate: string;
  prefix: string;
  live: boolean;
};

export const universities: University[] = [
  { id: "hct", name: "Higher Colleges of Technology", short: "HCT", city: "Multiple campuses", emirate: "UAE", prefix: "HCT", live: true },
  { id: "uaeu", name: "United Arab Emirates University", short: "UAEU", city: "Al Ain", emirate: "Abu Dhabi", prefix: "UAE", live: false },
  { id: "ku", name: "Khalifa University", short: "KU", city: "Abu Dhabi", emirate: "Abu Dhabi", prefix: "KU", live: false },
  { id: "zu", name: "Zayed University", short: "ZU", city: "Abu Dhabi & Dubai", emirate: "UAE", prefix: "ZU", live: false },
  { id: "aus", name: "American University of Sharjah", short: "AUS", city: "Sharjah", emirate: "Sharjah", prefix: "AUS", live: false },
  { id: "aud", name: "American University in Dubai", short: "AUD", city: "Dubai", emirate: "Dubai", prefix: "AUD", live: false },
  { id: "uos", name: "University of Sharjah", short: "UoS", city: "Sharjah", emirate: "Sharjah", prefix: "UOS", live: false },
  { id: "adu", name: "Abu Dhabi University", short: "ADU", city: "Abu Dhabi", emirate: "Abu Dhabi", prefix: "ADU", live: false },
  { id: "ajman", name: "Ajman University", short: "AU", city: "Ajman", emirate: "Ajman", prefix: "AJU", live: false },
  { id: "cud", name: "Canadian University Dubai", short: "CUD", city: "Dubai", emirate: "Dubai", prefix: "CUD", live: false },
  { id: "middlesex", name: "Middlesex University Dubai", short: "MDX", city: "Dubai", emirate: "Dubai", prefix: "MDX", live: false },
  { id: "hw", name: "Heriot-Watt University Dubai", short: "HWU", city: "Dubai", emirate: "Dubai", prefix: "HWU", live: false },
  { id: "bham", name: "University of Birmingham Dubai", short: "UoB", city: "Dubai", emirate: "Dubai", prefix: "UOB", live: false },
  { id: "nyuad", name: "NYU Abu Dhabi", short: "NYUAD", city: "Abu Dhabi", emirate: "Abu Dhabi", prefix: "NYU", live: false },
  { id: "sorbonne", name: "Sorbonne University Abu Dhabi", short: "SUAD", city: "Abu Dhabi", emirate: "Abu Dhabi", prefix: "SUA", live: false },
  { id: "mbru", name: "Mohammed Bin Rashid University", short: "MBRU", city: "Dubai", emirate: "Dubai", prefix: "MBR", live: false },
  { id: "aau", name: "Al Ain University", short: "AAU", city: "Al Ain", emirate: "Abu Dhabi", prefix: "AAU", live: false },
  { id: "rau", name: "Ras Al Khaimah Medical & Health Sciences University", short: "RAKMHSU", city: "Ras Al Khaimah", emirate: "RAK", prefix: "RAK", live: false },
  { id: "skyline", name: "Skyline University College", short: "SUC", city: "Sharjah", emirate: "Sharjah", prefix: "SUC", live: false },
  { id: "ud", name: "University of Dubai", short: "UD", city: "Dubai", emirate: "Dubai", prefix: "UD", live: false },
  { id: "wu", name: "Wollongong University in Dubai", short: "UOWD", city: "Dubai", emirate: "Dubai", prefix: "UOW", live: false },
  { id: "bit", name: "BITS Pilani Dubai", short: "BITS", city: "Dubai", emirate: "Dubai", prefix: "BIT", live: false },
  { id: "amity", name: "Amity University Dubai", short: "Amity", city: "Dubai", emirate: "Dubai", prefix: "AMT", live: false },
  { id: "manipal", name: "Manipal Academy of Higher Education Dubai", short: "MAHE", city: "Dubai", emirate: "Dubai", prefix: "MAH", live: false },
  { id: "gmu", name: "Gulf Medical University", short: "GMU", city: "Ajman", emirate: "Ajman", prefix: "GMU", live: false },
  { id: "mbzuai", name: "Mohamed bin Zayed University of Artificial Intelligence", short: "MBZUAI", city: "Abu Dhabi", emirate: "Abu Dhabi", prefix: "MBZ", live: false },
  { id: "buid", name: "The British University in Dubai", short: "BUiD", city: "Dubai", emirate: "Dubai", prefix: "BUD", live: false },
  { id: "aurak", name: "American University of Ras Al Khaimah", short: "AURAK", city: "Ras Al Khaimah", emirate: "RAK", prefix: "AUR", live: false },
  { id: "cuajman", name: "City University Ajman", short: "CUA", city: "Ajman", emirate: "Ajman", prefix: "CUA", live: false },
  { id: "fujairah", name: "University of Fujairah", short: "UoF", city: "Fujairah", emirate: "Fujairah", prefix: "FUJ", live: false },
  { id: "liwa", name: "Liwa College", short: "Liwa", city: "Abu Dhabi", emirate: "Abu Dhabi", prefix: "LIW", live: false },
  { id: "rabdan", name: "Rabdan Academy", short: "Rabdan", city: "Abu Dhabi", emirate: "Abu Dhabi", prefix: "RAB", live: false },
];

export function getUniversity(id: string) {
  return universities.find((u) => u.id === id);
}

export function searchUniversities(q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return universities;
  return universities.filter((u) => {
    const blob = `${u.name} ${u.short} ${u.city} ${u.emirate} ${u.id}`.toLowerCase();
    return blob.includes(needle);
  });
}
