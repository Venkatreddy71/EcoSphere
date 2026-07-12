export const initialEmployees = [
  {
    id: "emp1",
    name: "Alice Dev",
    role: "Employee",
    departmentId: "dept1",
    xp: 450,
    points: 350,
    badges: ["bd1"],
    avatar: "AD"
  },
  {
    id: "emp2",
    name: "Bob HR",
    role: "Manager",
    departmentId: "dept4",
    xp: 220,
    points: 170,
    badges: [],
    avatar: "BH"
  },
  {
    id: "emp3",
    name: "Charlie Manager",
    role: "Manager",
    departmentId: "dept2",
    xp: 120,
    points: 80,
    badges: [],
    avatar: "CM"
  },
  {
    id: "emp4",
    name: "Jane Admin",
    role: "Admin",
    departmentId: "dept1",
    xp: 580,
    points: 480,
    badges: ["bd1", "bd2"],
    avatar: "JA"
  },
  {
    id: "emp5",
    name: "Dave Fleet",
    role: "Employee",
    departmentId: "dept3",
    xp: 90,
    points: 60,
    badges: [],
    avatar: "DF"
  }
];

export const initialDepartments = [
  { id: "dept1", name: "Research & Development", code: "RND", head: "Alice Dev", parentId: null, employeeCount: 12, status: "Active" },
  { id: "dept2", name: "Operations & Manufacturing", code: "OPS", head: "Charlie Manager", parentId: null, employeeCount: 45, status: "Active" },
  { id: "dept3", name: "Logistics & Fleet", code: "LOG", head: "Dave Fleet", parentId: "dept2", employeeCount: 15, status: "Active" },
  { id: "dept4", name: "Human Resources", code: "HR", head: "Bob HR", parentId: null, employeeCount: 8, status: "Active" }
];

export const initialCategories = [
  { id: "cat1", name: "Carbon Reduction", type: "Challenge", status: "Active" },
  { id: "cat2", name: "Waste Management", type: "CSR Activity", status: "Active" },
  { id: "cat3", name: "Community Clean-up", type: "CSR Activity", status: "Active" },
  { id: "cat4", name: "Eco-Education", type: "Challenge", status: "Active" }
];

export const initialEmissionFactors = [
  { id: "ef1", category: "Electricity", factor: 0.38, unit: "kg CO2e/kWh", scope: "Scope 2" },
  { id: "ef2", category: "Natural Gas", factor: 2.03, unit: "kg CO2e/m3", scope: "Scope 1" },
  { id: "ef3", category: "Diesel Fuel", factor: 2.68, unit: "kg CO2e/liter", scope: "Scope 1" },
  { id: "ef4", category: "Business Travel (Flights)", factor: 0.15, unit: "kg CO2e/km", scope: "Scope 3" },
  { id: "ef5", category: "Steel Procurement", factor: 1.85, unit: "kg CO2e/kg", scope: "Scope 3" }
];

export const initialProductProfiles = [
  { id: "prod1", name: "EcoSteel Frame", carbonProfile: 18.5, unit: "kg CO2e/unit", factorId: "ef5", description: "Recycled structural steel frame" },
  { id: "prod2", name: "Standard Steel Frame", carbonProfile: 45.0, unit: "kg CO2e/unit", factorId: "ef5", description: "Standard virgin carbon steel frame" },
  { id: "prod3", name: "Electric Delivery Van Mileage", carbonProfile: 0.08, unit: "kg CO2e/km", factorId: "ef1", description: "Grid emissions per km for EV transit" },
  { id: "prod4", name: "Diesel Truck Delivery Mileage", carbonProfile: 0.67, unit: "kg CO2e/km", factorId: "ef3", description: "Diesel direct emissions per km for transit" }
];

export const initialGoals = [
  { id: "goal1", title: "Reduce Scope 1 & 2 Emissions by 20%", target: 8000, current: 9500, unit: "kg CO2e", deadline: "2026-12-31", status: "On Track" },
  { id: "goal2", title: "Increase CSR Participation to 80%", target: 80, current: 65, unit: "% Employees", deadline: "2026-10-31", status: "On Track" },
  { id: "goal3", title: "Acknowledge Procurement Policy 100%", target: 100, current: 80, unit: "% Staff", deadline: "2026-08-31", status: "At Risk" }
];

export const initialPolicies = [
  { id: "pol1", title: "Green Office Commute Policy", content: "To reduce Scope 3 transport footprint, employees should prioritize clean commuting. Public transit costs are subsidized by 50%, and electric vehicle charging is free in the corporate garage.", dateCreated: "2026-01-10", status: "Active" },
  { id: "pol2", title: "Responsible Procurement Code", content: "EcoSphere requires that at least 40% of physical components sourced for manufacturing hold an environmental certification (such as ISO 14001 or Cradle-to-Cradle).", dateCreated: "2026-03-15", status: "Active" },
  { id: "pol3", title: "Waste Management Directive", content: "All office facilities must operate composting and e-waste separation units. Plastic cups and single-use bottles are strictly prohibited within office pantries.", dateCreated: "2026-05-01", status: "Active" }
];

export const initialAudits = [
  { id: "aud1", title: "Supply Chain ESG Integrity Review", auditor: "Sustainalytics External Team", date: "2026-05-18", scope: "Material Procurement & Logistics", status: "Completed" },
  { id: "aud2", title: "Facility B Environmental Compliance Audit", auditor: "Jane Admin", date: "2026-06-25", scope: "Factory Waste & Energy", status: "Action Required" }
];

export const initialComplianceIssues = [
  {
    id: "ci1",
    auditId: "aud2",
    severity: "Critical",
    description: "Hazardous waste logging registers not signed by the site supervisor for three consecutive months.",
    owner: "Charlie Manager",
    dueDate: "2026-07-05", // Overdue as of current date 2026-07-12
    status: "Open"
  },
  {
    id: "ci2",
    auditId: "aud2",
    severity: "High",
    description: "Sub-contractor vehicle inspection logs missing for 5 logistics vehicles operating under dept3.",
    owner: "Dave Fleet",
    dueDate: "2026-07-20",
    status: "Open"
  },
  {
    id: "ci3",
    auditId: "aud1",
    severity: "Medium",
    description: "Supplier certification details for Standard Steel Frame procurement are expired.",
    owner: "Alice Dev",
    dueDate: "2026-06-15",
    status: "Resolved"
  }
];

export const initialBadges = [
  { id: "bd1", name: "Eco Warrior", description: "Awarded automatically when an employee reaches 300 XP in sustainability activities.", type: "xp", value: 300, icon: "Env Badge" },
  { id: "bd2", name: "Master Challenger", description: "Awarded automatically when an employee completes 2 or more sustainability challenges.", type: "challenges", value: 2, icon: "Challenge Badge" },
  { id: "bd3", name: "Policy Guardian", description: "Awarded automatically when an employee acknowledges all active governance policies.", type: "policies", value: "all", icon: "Policy Badge" }
];

export const initialRewards = [
  { id: "rew1", name: "Eco Bamboo Coffee Mug", description: "Double-walled bamboo thermal mug engraved with the EcoSphere logo.", pointsRequired: 100, stock: 12, status: "Active" },
  { id: "rew2", name: "Tree Planting Initiative", description: "We will plant a native tree in your name in the regional reforestation belt (includes geo-coordinates).", pointsRequired: 150, stock: 45, status: "Active" },
  { id: "rew3", name: "Zero-Waste Grocery Kit", description: "A selection of 5 organic canvas tote bags and 10 mesh produce bags.", pointsRequired: 180, stock: 0, status: "Active" }, // Out of stock
  { id: "rew4", name: "Eco-Lounge Lunch Voucher", description: "A complimentary meal ticket at the zero-carbon vegan cafeteria.", pointsRequired: 200, stock: 8, status: "Active" }
];

export const initialChallenges = [
  {
    id: "ch1",
    title: "Green Commuter Challenge",
    category: "Carbon Reduction",
    description: "Commute via bicycle, walking, electric scooter, or public transit at least 8 times this month.",
    xp: 150,
    difficulty: "Medium",
    evidenceRequired: true,
    deadline: "2026-07-25",
    status: "Active"
  },
  {
    id: "ch2",
    title: "Zero Single-Use Office Sprint",
    category: "Waste Management",
    description: "Ensure no plastic bottles or cups are used in your department office space for a full 2-week period.",
    xp: 100,
    difficulty: "Easy",
    evidenceRequired: false,
    deadline: "2026-07-28",
    status: "Active"
  },
  {
    id: "ch3",
    title: "Office Energy Audit Pro",
    category: "Carbon Reduction",
    description: "Perform a complete audit of off-hours standby power consumption in your department floor, drafting a power-saving proposal.",
    xp: 250,
    difficulty: "Hard",
    evidenceRequired: true,
    deadline: "2026-06-30",
    status: "Completed"
  },
  {
    id: "ch4",
    title: "ESG Community Speaker Series",
    category: "Eco-Education",
    description: "Present a 10-minute briefing on sustainable supply chain factors during a company-wide session.",
    xp: 200,
    difficulty: "Medium",
    evidenceRequired: true,
    deadline: "2026-08-15",
    status: "Draft"
  }
];

export const initialCSRActivities = [
  {
    id: "csr1",
    name: "Regional River Clean-up Day",
    description: "Remove plastic waste and river debris from the banks of the river valley.",
    category: "Waste Management",
    xp: 120,
    pointsReward: 80,
    date: "2026-07-08",
    status: "Active"
  },
  {
    id: "csr2",
    name: "Youth Climate Literacy Mentoring",
    description: "Conduct a 1-hour environmental science workshop at the regional elementary school.",
    category: "Eco-Education",
    xp: 100,
    pointsReward: 60,
    date: "2026-07-15",
    status: "Active"
  },
  {
    id: "csr3",
    name: "Reforestation Seedling Planting",
    description: "Plant native saplings at the state forestry reserve to restore bio-habitat.",
    category: "Waste Management",
    xp: 140,
    pointsReward: 90,
    date: "2026-07-20",
    status: "Active"
  }
];

export const initialCarbonTransactions = [
  { id: "ct1", timestamp: "2026-07-01T10:30:00Z", source: "Manufacturing: 10x Standard Steel Frame", departmentId: "dept2", productId: "prod2", co2e: 450.0, scope: "Scope 3", transactionType: "Manufacturing" },
  { id: "ct2", timestamp: "2026-07-03T14:15:00Z", source: "Logistics: 200km Transit (Diesel Truck)", departmentId: "dept3", productId: "prod4", co2e: 134.0, scope: "Scope 1", transactionType: "Fleet" },
  { id: "ct3", timestamp: "2026-07-05T09:00:00Z", source: "Utility Expense: Facility B July Heating (Natural Gas)", departmentId: "dept2", productId: null, co2e: 812.0, scope: "Scope 1", transactionType: "Expense" },
  { id: "ct4", timestamp: "2026-07-07T11:45:00Z", source: "Procurement: 15x EcoSteel Frame Sourcing", departmentId: "dept1", productId: "prod1", co2e: 277.5, scope: "Scope 3", transactionType: "Purchase" },
  { id: "ct5", timestamp: "2026-07-10T16:00:00Z", source: "Logistics: 50km Transit (EV Van)", departmentId: "dept3", productId: "prod3", co2e: 4.0, scope: "Scope 2", transactionType: "Fleet" }
];

export const initialCSRParticipations = [
  { id: "p1", activityId: "csr1", employeeId: "emp1", proofText: "Participated for 3 hours. Sourced 3 bags of waste. Verification photo ID uploaded: RiverSec_B_Adev.png", approvalStatus: "Approved", pointsEarned: 80, completionDate: "2026-07-08" },
  { id: "p2", activityId: "csr1", employeeId: "emp3", proofText: "Coordinated volunteer logistics and gathered equipment for the site. Photo uploaded: RiverSec_HQ_Cman.png", approvalStatus: "Approved", pointsEarned: 80, completionDate: "2026-07-08" },
  { id: "p3", activityId: "csr2", employeeId: "emp2", proofText: "Drafted classroom material. Presented to 25 middle school students. Slides attached: Climate_Lit_M1.pdf", approvalStatus: "Under Review", pointsEarned: 60, completionDate: "2026-07-11" }
];

export const initialChallengeParticipations = [
  { id: "cp1", challengeId: "ch3", employeeId: "emp3", progress: 100, proofText: "Conducted energy audits on floors 2 & 3. Identified 4.2kW standby drain. Attached spreadsheet: Office_Audit_O2.xlsx", approvalStatus: "Approved", xpAwarded: 250, completionDate: "2026-06-30" },
  { id: "cp2", challengeId: "ch1", employeeId: "emp1", progress: 62, proofText: "5 commutes complete. Recorded on transit card. Logged: Commute_Adev.csv", approvalStatus: "Active", xpAwarded: 0, completionDate: null },
  { id: "cp3", challengeId: "ch2", employeeId: "emp4", progress: 100, proofText: "No single-use cups used in RND dept kitchen. Checked by admin daily. Verified: Rnd_Trash_Log.pdf", approvalStatus: "Under Review", xpAwarded: 100, completionDate: "2026-07-11" }
];

export const initialPolicyAcknowledgements = [
  { id: "pa1", policyId: "pol1", employeeId: "emp1", dateAcknowledged: "2026-01-15T09:00:00Z" },
  { id: "pa2", policyId: "pol1", employeeId: "emp2", dateAcknowledged: "2026-01-20T10:30:00Z" },
  { id: "pa3", policyId: "pol1", employeeId: "emp3", dateAcknowledged: "2026-02-05T14:00:00Z" },
  { id: "pa4", policyId: "pol1", employeeId: "emp4", dateAcknowledged: "2026-01-12T08:15:00Z" },
  { id: "pa5", policyId: "pol2", employeeId: "emp4", dateAcknowledged: "2026-03-20T11:00:00Z" },
  { id: "pa6", policyId: "pol2", employeeId: "emp1", dateAcknowledged: "2026-04-02T16:45:00Z" }
];
