import React, { useState, useEffect } from "react";
import {
  initialEmployees,
  initialDepartments,
  initialCategories,
  initialEmissionFactors,
  initialProductProfiles,
  initialGoals,
  initialPolicies,
  initialAudits,
  initialComplianceIssues,
  initialBadges,
  initialRewards,
  initialChallenges,
  initialCSRActivities,
  initialCarbonTransactions,
  initialCSRParticipations,
  initialChallengeParticipations,
  initialPolicyAcknowledgements
} from "./data/mockData";
import "./App.css";

// Simulated system date
const SYSTEM_DATE = "2026-07-12";

// PixelCanvas Component for animated background effect
function PixelCanvas({ colors = ["#e879f9", "#a78bfa", "#38bdf8", "#22d3ee"], speed = 0.02 }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const mouseRef = { current: { x: -1000, y: -1000 } };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const pixelSize = 16;
    let cols = Math.ceil(canvas.width / pixelSize);
    let rows = Math.ceil(canvas.height / pixelSize);

    const grid = [];
    const initializeGrid = () => {
      cols = Math.ceil(canvas.width / pixelSize);
      rows = Math.ceil(canvas.height / pixelSize);
      grid.length = 0;
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          row.push({
            colorIndex: Math.floor(Math.random() * colors.length),
            alpha: Math.random() * 0.12,
            targetAlpha: Math.random() * 0.12,
            speedModifier: 0.2 + Math.random() * 0.8
          });
        }
        grid.push(row);
      }
    };

    initializeGrid();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentCols = Math.ceil(canvas.width / pixelSize);
      const currentRows = Math.ceil(canvas.height / pixelSize);
      if (currentCols !== cols || currentRows !== rows) {
        initializeGrid();
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r]?.[c];
          if (!cell) continue;

          if (Math.abs(cell.alpha - cell.targetAlpha) < 0.01) {
            cell.targetAlpha = Math.random() * 0.12;
          } else {
            cell.alpha += (cell.targetAlpha - cell.alpha) * speed * cell.speedModifier;
          }

          // Proximity calculation for cursor highlight
          const cellX = c * pixelSize + pixelSize / 2;
          const cellY = r * pixelSize + pixelSize / 2;
          const dx = cellX - mouseRef.current.x;
          const dy = cellY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let drawAlpha = cell.alpha;
          if (dist < 150) {
            const ratio = 1 - dist / 150;
            // Boost alpha of pixels near the cursor
            drawAlpha = Math.min(0.85, cell.alpha + ratio * 0.55);
          }

          ctx.fillStyle = colors[cell.colorIndex];
          ctx.globalAlpha = drawAlpha;
          ctx.fillRect(c * pixelSize + 1, r * pixelSize + 1, pixelSize - 2, pixelSize - 2);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, speed]);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />;
}

function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sub-navigation states
  const [environmentalSubTab, setEnvironmentalSubTab] = useState("factors");
  const [socialSubTab, setSocialSubTab] = useState("activities");
  const [governanceSubTab, setGovernanceSubTab] = useState("policies");
  const [gamificationSubTab, setGamificationSubTab] = useState("challenges");
  const [reportsSubTab, setReportsSubTab] = useState("summary");
  const [settingsSubTab, setSettingsSubTab] = useState("departments");

  // Core Database States
  const [employees, setEmployees] = useState(initialEmployees);
  const [departments, setDepartments] = useState(initialDepartments);
  const [categories, setCategories] = useState(initialCategories);
  const [emissionFactors, setEmissionFactors] = useState(initialEmissionFactors);
  const [productProfiles, setProductProfiles] = useState(initialProductProfiles);
  const [goals, setGoals] = useState(initialGoals);
  const [policies, setPolicies] = useState(initialPolicies);
  const [audits, setAudits] = useState(initialAudits);
  const [complianceIssues, setComplianceIssues] = useState(initialComplianceIssues);
  const [badges] = useState(initialBadges);
  const [rewards, setRewards] = useState(initialRewards);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [csrActivities, setCSRActivities] = useState(initialCSRActivities);
  const [carbonTransactions, setCarbonTransactions] = useState(initialCarbonTransactions);
  const [csrParticipations, setCSRParticipations] = useState(initialCSRParticipations);
  const [challengeParticipations, setChallengeParticipations] = useState(initialChallengeParticipations);
  const [policyAcknowledgements, setPolicyAcknowledgements] = useState(initialPolicyAcknowledgements);

  // Active User Configuration
  const [currentUserId, setCurrentUserId] = useState("emp4"); // Default: Jane Admin

  // Settings & Controls
  const [weights, setWeights] = useState({ environmental: 40, social: 30, governance: 30 });
  const [autoCarbon, setAutoCarbon] = useState(true);
  const [evidenceRequired, setEvidenceRequired] = useState(true);
  const [autoAwardBadges, setAutoAwardBadges] = useState(true);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: "init-notif-1",
      type: "warning",
      title: "Governance Due Date Overdue",
      desc: "Hazardous waste logging registers not signed in facility B is past its due date (2026-07-05).",
      time: "Just Now",
      unread: true
    },
    {
      id: "init-notif-2",
      type: "info",
      title: "New Compliance Issue Raised",
      desc: "Sub-contractor vehicle inspection logs missing for 5 logistics vehicles operating under dept3.",
      time: "1 hour ago",
      unread: false
    },
    {
      id: "init-notif-3",
      type: "success",
      title: "Setup Completed",
      desc: "Master ESG Configuration active: 4 Departments loaded.",
      time: "4 hours ago",
      unread: false
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Score metrics
  const [envScore, setEnvScore] = useState(50);
  const [socScore, setSocScore] = useState(50);
  const [govScore, setGovScore] = useState(50);
  const [totalESGScore, setTotalESGScore] = useState(50);

  // Trigger overlays
  const [unlockedBadge, setUnlockedBadge] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printReportData, setPrintReportData] = useState(null);

  // Form states
  // Environmental Forms
  const [newFactor, setNewFactor] = useState({ category: "", factor: "", unit: "", scope: "Scope 1" });
  const [newProduct, setNewProduct] = useState({ name: "", carbonProfile: "", unit: "kg CO2e/unit", factorId: "ef1", description: "" });
  const [newGoal, setNewGoal] = useState({ title: "", target: "", current: "", unit: "kg CO2e", deadline: "", status: "On Track" });
  // Social Forms
  const [newCSRParticipation, setNewCSRParticipation] = useState({ activityId: "", proofText: "" });
  const [newCSRActivity, setNewCSRActivity] = useState({ name: "", description: "", category: "Waste Management", xp: 100, pointsReward: 50, date: "" });
  const [selectedChallengeId, setSelectedChallengeId] = useState("");
  const [challengeProgress, setChallengeProgress] = useState(50);
  const [challengeProof, setChallengeProof] = useState("");
  // Governance Forms
  const [newComplianceIssue, setNewComplianceIssue] = useState({ auditId: "aud2", severity: "Medium", description: "", ownerId: "emp1", dueDate: "" });
  const [newPolicy, setNewPolicy] = useState({ title: "", content: "" });
  const [newAudit, setNewAudit] = useState({ title: "", auditor: "", date: "", scope: "", status: "Completed" });
  // Settings Forms
  const [newDept, setNewDept] = useState({ name: "", code: "", head: "", parentId: "", employeeCount: 1 });
  const [newReward, setNewReward] = useState({ name: "", description: "", pointsRequired: 100, stock: 10 });
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "Employee", departmentId: "dept1", xp: 100, points: 50 });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editEmployeeData, setEditEmployeeData] = useState({ name: "", role: "Employee", departmentId: "dept1" });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });
  const [newChallenge, setNewChallenge] = useState({ title: "", category: "Carbon Reduction", description: "", xp: 100, difficulty: "Medium", evidenceRequired: false, deadline: "" });
  const [newCategory, setNewCategory] = useState({ name: "", type: "Environmental" });
  const [slackIntegration, setSlackIntegration] = useState(true);
  const [emailDigest, setEmailDigest] = useState("weekly");
  const [carbonAlertThreshold, setCarbonAlertThreshold] = useState(500);

  // Custom Report Builder States
  const [reportFilters, setReportFilters] = useState({
    departmentId: "all",
    module: "all",
    employeeId: "all",
    startDate: "2026-07-01",
    endDate: "2026-07-15"
  });
  const [filteredReportRows, setFilteredReportRows] = useState([]);

  // Resolve current active user profile details
  const activeUser = employees.find(e => e.id === currentUserId) || employees[0];

  // Helper to add in-app notifications
  const addNotification = (type, title, desc) => {
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}-${Math.random()}`,
        type,
        title,
        desc,
        time: "Just Now",
        unread: true
      },
      ...prev
    ]);
  };

  // Helper to trigger custom Yes/No confirmation dialog modal
  const requestConfirmation = (title, message, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  // Adjust sliders proportionally so they sum to 100%
  const handleWeightChange = (type, value) => {
    const val = Math.max(0, Math.min(100, parseInt(value, 10) || 0));
    const remainder = 100 - val;
    
    if (type === "environmental") {
      const s = weights.social;
      const g = weights.governance;
      const totalOther = s + g || 1;
      const newSocial = Math.round((s / totalOther) * remainder);
      const newGov = 100 - val - newSocial;
      setWeights({ environmental: val, social: newSocial, governance: newGov });
    } else if (type === "social") {
      const e = weights.environmental;
      const g = weights.governance;
      const totalOther = e + g || 1;
      const newEnv = Math.round((e / totalOther) * remainder);
      const newGov = 100 - val - newEnv;
      setWeights({ environmental: newEnv, social: val, governance: newGov });
    } else if (type === "governance") {
      const e = weights.environmental;
      const s = weights.social;
      const totalOther = e + s || 1;
      const newEnv = Math.round((e / totalOther) * remainder);
      const newSocial = 100 - val - newEnv;
      setWeights({ environmental: newEnv, social: newSocial, governance: val });
    }
  };

  // Live score recalculations
  useEffect(() => {
    // 1. Environmental Score
    const totalCO2 = carbonTransactions.reduce((acc, t) => acc + t.co2e, 0);
    const calculatedEnv = Math.max(12, Math.min(100, 100 - Math.round(totalCO2 / 40)));
    setEnvScore(calculatedEnv);

    // 2. Social Score
    const approvedCSRCount = csrParticipations.filter(p => p.approvalStatus === "Approved").length;
    const completedChallengesCount = challengeParticipations.filter(cp => cp.approvalStatus === "Approved").length;
    const csrPoints = Math.min(50, approvedCSRCount * 15);
    const challengePoints = Math.min(50, completedChallengesCount * 20);
    setSocScore(csrPoints + challengePoints);

    // 3. Governance Score
    const totalAcksPossible = employees.length * policies.length;
    const actualAcks = policyAcknowledgements.length;
    const ackRate = totalAcksPossible > 0 ? (actualAcks / totalAcksPossible) * 50 : 0;

    const openIssues = complianceIssues.filter(ci => ci.status === "Open").length;
    const resolvedIssues = complianceIssues.filter(ci => ci.status === "Resolved").length;
    const totalIssues = openIssues + resolvedIssues;
    const resolutionRate = totalIssues > 0 ? (resolvedIssues / totalIssues) * 50 : 50;

    setGovScore(Math.round(ackRate + resolutionRate));
  }, [carbonTransactions, csrParticipations, challengeParticipations, policyAcknowledgements, employees, policies, complianceIssues]);

  // Overall ESG Score updates based on configurable weights
  useEffect(() => {
    const total = Math.round(
      (envScore * weights.environmental +
        socScore * weights.social +
        govScore * weights.governance) / 100
    );
    setTotalESGScore(total);
  }, [envScore, socScore, govScore, weights]);

  // Periodic compliance check - Fixed to prevent flood and run only when issues load or update
  useEffect(() => {
    const checkOverdueCompliance = () => {
      setNotifications(prev => {
        let updated = [...prev];
        let changed = false;
        complianceIssues.forEach(ci => {
          if (ci.status === "Open" && ci.dueDate < SYSTEM_DATE) {
            const key = `ci-overdue-${ci.id}`;
            const exists = updated.some(n => n.id === key);
            if (!exists) {
              updated.unshift({
                id: key,
                type: "warning",
                title: `OVERDUE: Compliance Issue (${ci.severity})`,
                desc: `Issue owned by ${ci.owner} is past due date (${ci.dueDate}): "${ci.description.substring(0, 60)}..."`,
                time: "Just Now",
                unread: true
              });
              changed = true;
            }
          }
        });
        return changed ? updated : prev;
      });
    };

    checkOverdueCompliance();
    const interval = setInterval(checkOverdueCompliance, 10000);
    return () => clearInterval(interval);
  }, [complianceIssues]);

  // Gamification Badge Auto-Awarding checks
  useEffect(() => {
    if (!autoAwardBadges) return;

    employees.forEach(emp => {
      // 1. Check Eco Warrior (XP >= 300)
      const hasWarrior = emp.badges.includes("bd1");
      if (emp.xp >= 300 && !hasWarrior) {
        awardBadgeToEmployee(emp.id, "bd1");
      }

      // 2. Check Master Challenger (Completed challenges >= 2)
      const hasChallenger = emp.badges.includes("bd2");
      const completedCount = challengeParticipations.filter(
        cp => cp.employeeId === emp.id && cp.approvalStatus === "Approved"
      ).length;
      if (completedCount >= 2 && !hasChallenger) {
        awardBadgeToEmployee(emp.id, "bd2");
      }

      // 3. Check Policy Guardian (Acknowledged all active policies)
      const hasGuardian = emp.badges.includes("bd3");
      const userAcksCount = policyAcknowledgements.filter(pa => pa.employeeId === emp.id).length;
      if (userAcksCount === policies.length && policies.length > 0 && !hasGuardian) {
        awardBadgeToEmployee(emp.id, "bd3");
      }
    });
  }, [employees, challengeParticipations, policyAcknowledgements, policies, autoAwardBadges]);

  const awardBadgeToEmployee = (empId, badgeId) => {
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === empId) {
          if (emp.badges.includes(badgeId)) return emp;
          const updatedBadges = [...emp.badges, badgeId];
          const badgeObj = badges.find(b => b.id === badgeId);
          if (badgeObj) {
            if (empId === currentUserId) {
              setUnlockedBadge(badgeObj);
            }
            addNotification(
              "success",
              `Badge Unlocked: ${badgeObj.name}`,
              `${emp.name} has been awarded the "${badgeObj.name}" badge!`
            );
          }
          return { ...emp, badges: updatedBadges };
        }
        return emp;
      })
    );
  };

  // Interactive Daily Operations Simulator Handler
  const simulateOperation = (type) => {
    if (!autoCarbon) {
      addNotification("info", "Auto Carbon Calculation Off", "Turn on auto-emission settings to log operations instantly.");
      return;
    }

    const timestamp = new Date().toISOString();
    let source = "";
    let co2e = 0;
    let deptId = "dept2";
    let scope = "Scope 1";
    let prodId = null;

    switch (type) {
      case "standard_steel":
        source = "Manufacturing Run: 10x Standard Steel Frame";
        co2e = 450.0;
        prodId = "prod2";
        scope = "Scope 3";
        deptId = "dept2";
        break;
      case "ecosteel":
        source = "Manufacturing Run: 15x EcoSteel Frame Sourcing";
        co2e = 277.5;
        prodId = "prod1";
        scope = "Scope 3";
        deptId = "dept1";
        break;
      case "heavy_manufacturing":
        source = "Manufacturing Run: 100x Standard Frame Batch";
        co2e = 4500.0;
        prodId = "prod2";
        scope = "Scope 3";
        deptId = "dept2";
        break;
      case "diesel_fleet":
        source = "Logistics: 500km Transit via Cargo Diesel Truck";
        co2e = 335.0;
        prodId = "prod4";
        scope = "Scope 1";
        deptId = "dept3";
        break;
      case "electric_fleet":
        source = "Logistics: 200km Transit via EV Delivery Van";
        co2e = 16.0;
        prodId = "prod3";
        scope = "Scope 2";
        deptId = "dept3";
        break;
      case "gas_heating":
        source = "Utility Expense: Facility B Heating Gas Burner (150 m3)";
        co2e = 304.5;
        scope = "Scope 1";
        deptId = "dept2";
        break;
      default:
        return;
    }

    const newTx = {
      id: `ct-${Date.now()}`,
      timestamp,
      source,
      departmentId: deptId,
      productId: prodId,
      co2e,
      scope,
      transactionType: type.includes("fleet") ? "Fleet" : type.includes("gas") ? "Expense" : "Manufacturing"
    };

    setCarbonTransactions(prev => [newTx, ...prev]);
    addNotification("success", "Automated Carbon Transaction Logged", `${source} added ${co2e} kg CO2e emissions instantly.`);
  };

  // Add Factor
  const handleAddFactor = (e) => {
    e.preventDefault();
    if (!newFactor.category || !newFactor.factor) return;
    const factorNum = parseFloat(newFactor.factor);
    if (isNaN(factorNum)) return;

    const entry = {
      id: `ef-${Date.now()}`,
      category: newFactor.category,
      factor: factorNum,
      unit: newFactor.unit || "kg CO2e/unit",
      scope: newFactor.scope
    };

    setEmissionFactors(prev => [...prev, entry]);
    setNewFactor({ category: "", factor: "", unit: "", scope: "Scope 1" });
    addNotification("success", "Emission Factor Sourced", `New factor loaded for ${entry.category}: ${entry.factor} ${entry.unit}`);
  };

  // Delete Factor
  const deleteEmissionFactor = (id) => {
    requestConfirmation(
      "Confirm Factor Deletion",
      "Are you sure you want to delete this carbon emission factor entry?",
      () => {
        setEmissionFactors(prev => prev.filter(ef => ef.id !== id));
        addNotification("info", "Emission Factor Deleted", "Removed factor from catalog.");
      }
    );
  };

  // Add Product Profile
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.carbonProfile) return;
    const profileVal = parseFloat(newProduct.carbonProfile);
    if (isNaN(profileVal)) return;

    const entry = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      carbonProfile: profileVal,
      unit: newProduct.unit,
      factorId: newProduct.factorId,
      description: newProduct.description
    };

    setProductProfiles(prev => [...prev, entry]);
    setNewProduct({ name: "", carbonProfile: "", unit: "kg CO2e/unit", factorId: "ef1", description: "" });
    addNotification("success", "Product ESG Profile Created", `${entry.name} linked to carbon factor profile.`);
  };

  // Delete Product
  const deleteProductProfile = (id) => {
    requestConfirmation(
      "Confirm Product Profile Deletion",
      "Are you sure you want to delete this product profile?",
      () => {
        setProductProfiles(prev => prev.filter(p => p.id !== id));
        addNotification("info", "Product Profile Deleted", "Removed product ESG profile.");
      }
    );
  };

  // Add Target Goal
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.target) return;
    const entry = {
      id: `goal-${Date.now()}`,
      title: newGoal.title,
      target: parseFloat(newGoal.target) || 0,
      current: parseFloat(newGoal.current) || 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline || "2026-12-31",
      status: newGoal.status
    };
    setGoals(prev => [...prev, entry]);
    setNewGoal({ title: "", target: "", current: "", unit: "kg CO2e", deadline: "", status: "On Track" });
    addNotification("success", "Goal Target Added", `Created target milestone: ${entry.title}`);
  };

  // Delete Goal
  const deleteGoal = (id) => {
    requestConfirmation(
      "Confirm Goal Deletion",
      "Are you sure you want to delete this carbon target milestone?",
      () => {
        setGoals(prev => prev.filter(g => g.id !== id));
        addNotification("info", "Goal Deleted", "Removed target milestone.");
      }
    );
  };

  // CSR Activities - Join and Submit Evidence
  const handleJoinCSR = (e) => {
    e.preventDefault();
    if (!newCSRParticipation.activityId) return;

    if (evidenceRequired && !newCSRParticipation.proofText.trim()) {
      alert("Error: Verification proof details are required by active compliance settings.");
      return;
    }

    const activity = csrActivities.find(c => c.id === newCSRParticipation.activityId);
    if (!activity) return;

    const participation = {
      id: `part-${Date.now()}`,
      activityId: activity.id,
      employeeId: activeUser.id,
      proofText: newCSRParticipation.proofText || "Self-verified participation (no proof required).",
      approvalStatus: activeUser.role === "Admin" ? "Approved" : "Under Review",
      pointsEarned: activity.pointsReward,
      completionDate: SYSTEM_DATE
    };

    setCSRParticipations(prev => [participation, ...prev]);
    setNewCSRParticipation({ activityId: "", proofText: "" });

    if (participation.approvalStatus === "Approved") {
      adjustEmployeeStats(activeUser.id, activity.xp, activity.pointsReward);
      addNotification("success", "CSR Activity Completed", `Completed ${activity.name}. Earned ${activity.pointsReward} Points.`);
    } else {
      addNotification("info", "CSR Participation Submitted", `Submitted ${activity.name} for managerial approval.`);
    }
  };

  // Add CSR Activity Option
  const handleAddCSRActivity = (e) => {
    e.preventDefault();
    if (!newCSRActivity.name || !newCSRActivity.date) return;
    const entry = {
      id: `csr-${Date.now()}`,
      name: newCSRActivity.name,
      description: newCSRActivity.description,
      category: newCSRActivity.category,
      xp: parseInt(newCSRActivity.xp) || 100,
      pointsReward: parseInt(newCSRActivity.pointsReward) || 50,
      date: newCSRActivity.date,
      status: "Active"
    };
    setCSRActivities(prev => [...prev, entry]);
    setNewCSRActivity({ name: "", description: "", category: "Waste Management", xp: 100, pointsReward: 50, date: "" });
    addNotification("success", "CSR Activity Created", `Added ${entry.name} to activities catalog.`);
  };

  // Delete CSR Activity Option
  const deleteCSRActivity = (id) => {
    requestConfirmation(
      "Confirm CSR Activity Deletion",
      "Are you sure you want to delete this CSR Activity option?",
      () => {
        setCSRActivities(prev => prev.filter(a => a.id !== id));
        addNotification("info", "CSR Activity Deleted", "Removed activity from catalog.");
      }
    );
  };

  // Admin/Manager Approves CSR participation
  const approveCSRParticipation = (id) => {
    setCSRParticipations(prev =>
      prev.map(p => {
        if (p.id === id && p.approvalStatus === "Under Review") {
          const activity = csrActivities.find(a => a.id === p.activityId);
          if (activity) {
            adjustEmployeeStats(p.employeeId, activity.xp, activity.pointsReward);
            const employeeObj = employees.find(e => e.id === p.employeeId);
            addNotification(
              "success",
              "CSR Approved",
              `Approved CSR for ${employeeObj ? employeeObj.name : "Employee"}: ${activity.name}. Awarded ${activity.pointsReward} Points.`
            );
          }
          return { ...p, approvalStatus: "Approved" };
        }
        return p;
      })
    );
  };

  // Admin/Manager Rejects CSR participation
  const rejectCSRParticipation = (id) => {
    setCSRParticipations(prev =>
      prev.map(p => {
        if (p.id === id && p.approvalStatus === "Under Review") {
          return { ...p, approvalStatus: "Archived" };
        }
        return p;
      })
    );
    addNotification("info", "Participation Declined", "CSR activity evidence declined.");
  };

  // Join and progress Challenges
  const handleJoinChallenge = (challengeId) => {
    const exists = challengeParticipations.find(
      cp => cp.challengeId === challengeId && cp.employeeId === activeUser.id
    );
    if (exists) return;

    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const newParticipation = {
      id: `cp-${Date.now()}`,
      challengeId,
      employeeId: activeUser.id,
      progress: 0,
      proofText: "",
      approvalStatus: "Active",
      xpAwarded: 0,
      completionDate: null
    };

    setChallengeParticipations(prev => [...prev, newParticipation]);
    addNotification("info", "Joined Challenge", `You joined the challenge: "${challenge.title}"`);
  };

  // Employee updates progress on active challenge
  const handleUpdateChallengeProgress = (e) => {
    e.preventDefault();
    if (!selectedChallengeId) return;

    const challenge = challenges.find(c => c.id === selectedChallengeId);
    if (!challenge) return;

    if (challengeProgress === 100 && challenge.evidenceRequired && !challengeProof.trim()) {
      alert("Error: Evidence upload proof is required to complete this challenge.");
      return;
    }

    setChallengeParticipations(prev =>
      prev.map(cp => {
        if (cp.challengeId === selectedChallengeId && cp.employeeId === activeUser.id) {
          const isComplete = challengeProgress === 100;
          return {
            ...cp,
            progress: challengeProgress,
            proofText: challengeProof,
            approvalStatus: isComplete ? "Under Review" : "Active",
            completionDate: isComplete ? SYSTEM_DATE : null
          };
        }
        return cp;
      })
    );

    if (challengeProgress === 100) {
      addNotification("info", "Challenge Under Review", `"${challenge.title}" progress set to 100%. Submitted for verification.`);
      setChallengeProof("");
      setSelectedChallengeId("");
    } else {
      addNotification("success", "Challenge Progress Updated", `"${challenge.title}" is now at ${challengeProgress}%.`);
    }
  };

  // Manager approves challenge completion
  const approveChallengeParticipation = (id) => {
    setChallengeParticipations(prev =>
      prev.map(cp => {
        if (cp.id === id && cp.approvalStatus === "Under Review") {
          const challenge = challenges.find(c => c.id === cp.challengeId);
          if (challenge) {
            adjustEmployeeStats(cp.employeeId, challenge.xp, 0);
            const employeeObj = employees.find(e => e.id === cp.employeeId);
            addNotification(
              "success",
              "Challenge Verified",
              `Verified "${challenge.title}" for ${employeeObj ? employeeObj.name : "Employee"}. Awarded ${challenge.xp} XP.`
            );
          }
          return { ...cp, approvalStatus: "Approved", xpAwarded: challenge ? challenge.xp : 0 };
        }
        return cp;
      })
    );
  };

  // Acknowledge Policies
  const acknowledgePolicy = (policyId) => {
    const exists = policyAcknowledgements.find(
      pa => pa.policyId === policyId && pa.employeeId === activeUser.id
    );
    if (exists) return;

    const paEntry = {
      id: `pa-${Date.now()}`,
      policyId,
      employeeId: activeUser.id,
      dateAcknowledged: new Date().toISOString()
    };

    setPolicyAcknowledgements(prev => [...prev, paEntry]);
    const policy = policies.find(p => p.id === policyId);
    addNotification("success", "Policy Signed", `You signed: "${policy ? policy.title : "Active Policy"}"`);
  };

  // Create new compliance issues
  const handleAddCompliance = (e) => {
    e.preventDefault();
    if (!newComplianceIssue.description || !newComplianceIssue.dueDate) return;

    const ownerObj = employees.find(emp => emp.id === newComplianceIssue.ownerId);
    const entry = {
      id: `ci-${Date.now()}`,
      auditId: newComplianceIssue.auditId,
      severity: newComplianceIssue.severity,
      description: newComplianceIssue.description,
      owner: ownerObj ? ownerObj.name : "Admin",
      dueDate: newComplianceIssue.dueDate,
      status: "Open"
    };

    setComplianceIssues(prev => [entry, ...prev]);
    setNewComplianceIssue({ auditId: "aud2", severity: "Medium", description: "", ownerId: "emp1", dueDate: "" });
    addNotification("success", "Compliance Flagged", `New ${entry.severity} violation assigned to ${entry.owner}.`);
  };

  // Resolve compliance issues
  const resolveComplianceIssue = (id) => {
    setComplianceIssues(prev =>
      prev.map(ci => {
        if (ci.id === id) {
          addNotification("success", "Compliance Issue Resolved", `Issue owned by ${ci.owner} has been resolved.`);
          return { ...ci, status: "Resolved" };
        }
        return ci;
      })
    );
  };

  // Delete Compliance Issue
  const deleteComplianceIssue = (id) => {
    requestConfirmation(
      "Confirm Compliance Issue Deletion",
      "Are you sure you want to permanently delete this compliance issue?",
      () => {
        setComplianceIssues(prev => prev.filter(ci => ci.id !== id));
        addNotification("info", "Compliance Issue Deleted", "Removed issue from ledger.");
      }
    );
  };

  // Delete Audit
  const deleteAudit = (id) => {
    requestConfirmation(
      "Confirm Audit Deletion",
      "Are you sure you want to permanently delete this audit record?",
      () => {
        setAudits(prev => prev.filter(a => a.id !== id));
        addNotification("info", "Audit Deleted", "Removed audit registration.");
      }
    );
  };

  // Add Governance Audit Profile
  const handleAddAudit = (e) => {
    e.preventDefault();
    if (!newAudit.title || !newAudit.date) return;
    const entry = {
      id: `aud-${Date.now()}`,
      title: newAudit.title,
      auditor: newAudit.auditor || "Internal ESG Auditor",
      date: newAudit.date,
      scope: newAudit.scope || "Comprehensive Audit",
      status: newAudit.status
    };
    setAudits(prev => [...prev, entry]);
    setNewAudit({ title: "", auditor: "", date: "", scope: "", status: "Completed" });
    addNotification("success", "Audit Logged", `Logged new audit: "${entry.title}"`);
  };

  // Add Policy Draft
  const handleAddPolicy = (e) => {
    e.preventDefault();
    if (!newPolicy.title || !newPolicy.content) return;
    const entry = {
      id: `pol-${Date.now()}`,
      title: newPolicy.title,
      content: newPolicy.content,
      dateCreated: SYSTEM_DATE,
      status: "Active"
    };
    setPolicies(prev => [...prev, entry]);
    setNewPolicy({ title: "", content: "" });
    addNotification("success", "Policy Published", `New policy published: "${entry.title}"`);
  };

  // Delete Policy Draft
  const deletePolicy = (id) => {
    requestConfirmation(
      "Confirm Policy Deletion",
      "Are you sure you want to delete this policy? All signature acknowledgements will also be deleted.",
      () => {
        setPolicies(prev => prev.filter(p => p.id !== id));
        setPolicyAcknowledgements(prev => prev.filter(pa => pa.policyId !== id));
        addNotification("info", "Policy Deleted", "Removed governance policy.");
      }
    );
  };

  // Helper XP/Points stats adjuster
  const adjustEmployeeStats = (empId, xpAdd, pointsAdd) => {
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === empId) {
          return {
            ...emp,
            xp: emp.xp + xpAdd,
            points: emp.points + pointsAdd
          };
        }
        return emp;
      })
    );
  };

  // Spend/Redeem points for rewards
  const handleRedeemReward = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (activeUser.points < reward.pointsRequired) {
      alert(`Error: Insufficient points. You need ${reward.pointsRequired} but have ${activeUser.points}.`);
      return;
    }

    if (reward.stock <= 0) {
      alert("Error: Item is currently out of stock.");
      return;
    }

    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === activeUser.id) {
          return { ...emp, points: emp.points - reward.pointsRequired };
        }
        return emp;
      })
    );

    setRewards(prev =>
      prev.map(r => {
        if (r.id === rewardId) {
          return { ...r, stock: r.stock - 1 };
        }
        return r;
      })
    );

    addNotification("success", "Reward Redeemed!", `You redeemed: ${reward.name} for ${reward.pointsRequired} points.`);
  };

  // Add Reward Item
  const handleAddReward = (e) => {
    e.preventDefault();
    if (!newReward.name || !newReward.pointsRequired) return;
    const entry = {
      id: `rew-${Date.now()}`,
      name: newReward.name,
      description: newReward.description,
      pointsRequired: parseInt(newReward.pointsRequired) || 100,
      stock: parseInt(newReward.stock) || 10,
      status: "Active"
    };
    setRewards(prev => [...prev, entry]);
    setNewReward({ name: "", description: "", pointsRequired: 100, stock: 10 });
    addNotification("success", "Reward Item Added", `Added ${entry.name} to exchange store.`);
  };

  // Delete Reward Item
  const deleteReward = (id) => {
    requestConfirmation(
      "Confirm Reward Deletion",
      "Are you sure you want to delete this reward item from the exchange catalog?",
      () => {
        setRewards(prev => prev.filter(r => r.id !== id));
        addNotification("info", "Reward Deleted", "Removed item from store.");
      }
    );
  };

  // Add Challenge Option
  const handleAddChallenge = (e) => {
    e.preventDefault();
    if (!newChallenge.title || !newChallenge.deadline) return;
    const entry = {
      id: `ch-${Date.now()}`,
      title: newChallenge.title,
      category: newChallenge.category,
      description: newChallenge.description,
      xp: parseInt(newChallenge.xp) || 100,
      difficulty: newChallenge.difficulty,
      evidenceRequired: newChallenge.evidenceRequired,
      deadline: newChallenge.deadline,
      status: "Draft"
    };
    setChallenges(prev => [...prev, entry]);
    setNewChallenge({ title: "", category: "Carbon Reduction", description: "", xp: 100, difficulty: "Medium", evidenceRequired: false, deadline: "" });
    addNotification("success", "Challenge Drafted", `Challenge "${entry.title}" created in Draft status.`);
  };

  // Delete Challenge Option
  const deleteChallenge = (id) => {
    requestConfirmation(
      "Confirm Challenge Deletion",
      "Are you sure you want to permanently delete this challenge from the arena?",
      () => {
        setChallenges(prev => prev.filter(c => c.id !== id));
        addNotification("info", "Challenge Deleted", "Removed challenge from arena.");
      }
    );
  };

  // Manage departments
  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.code) return;

    const entry = {
      id: `dept-${Date.now()}`,
      name: newDept.name,
      code: newDept.code,
      head: newDept.head || "Not Assigned",
      parentId: newDept.parentId || null,
      employeeCount: parseInt(newDept.employeeCount) || 1,
      status: "Active"
    };

    setDepartments(prev => [...prev, entry]);
    setNewDept({ name: "", code: "", head: "", parentId: "", employeeCount: 1 });
    addNotification("success", "Department Added", `Created department: [${entry.code}] ${entry.name}`);
  };

  // Delete department node
  const deleteDepartment = (id) => {
    requestConfirmation(
      "Confirm Department Deletion",
      "Are you sure you want to delete this department? Any sub-departments will lose their parent association.",
      () => {
        setDepartments(prev =>
          prev.filter(d => d.id !== id).map(d => (d.parentId === id ? { ...d, parentId: null } : d))
        );
        addNotification("info", "Department Deleted", "Removed department node from hierarchy.");
      }
    );
  };

  // Add ESG Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name) return;
    const entry = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      type: newCategory.type,
      status: "Active"
    };
    setCategories(prev => [...prev, entry]);
    setNewCategory({ name: "", type: "Environmental" });
    addNotification("success", "Category Added", `Created ESG Category: ${entry.name}`);
  };

  // Delete ESG Category
  const deleteCategory = (id) => {
    requestConfirmation(
      "Confirm Category Deletion",
      "Are you sure you want to delete this ESG category? Challenges and activities utilizing this category might be affected.",
      () => {
        setCategories(prev => prev.filter(c => c.id !== id));
        addNotification("info", "Category Deleted", "Removed ESG category option.");
      }
    );
  };

  // Add new employee / staff member
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.name) return;
    const nameWords = newEmployee.name.trim().split(/\s+/);
    const avatar = nameWords.map(w => w[0]).join("").toUpperCase().substring(0, 2) || "EM";
    const empId = `emp-${Date.now()}`;
    const entry = {
      id: empId,
      name: newEmployee.name,
      role: newEmployee.role,
      departmentId: newEmployee.departmentId,
      xp: parseInt(newEmployee.xp) || 0,
      points: parseInt(newEmployee.points) || 0,
      badges: [],
      avatar
    };
    setEmployees(prev => [...prev, entry]);
    setNewEmployee({ name: "", role: "Employee", departmentId: "dept1", xp: 100, points: 50 });
    addNotification("success", "Employee Added", `Added ${entry.name} to the platform as ${entry.role}.`);
  };

  // Edit / Modify employee details
  const handleStartEditEmployee = (emp) => {
    setEditingEmployeeId(emp.id);
    setEditEmployeeData({
      name: emp.name,
      role: emp.role,
      departmentId: emp.departmentId
    });
  };

  const handleSaveEditEmployee = (e) => {
    e.preventDefault();
    if (!editingEmployeeId) return;
    
    requestConfirmation(
      "Confirm Role & Info Modification",
      `Are you sure you want to update the details and role for ${editEmployeeData.name}?`,
      () => {
        setEmployees(prev =>
          prev.map(emp => {
            if (emp.id === editingEmployeeId) {
              return {
                ...emp,
                name: editEmployeeData.name,
                role: editEmployeeData.role,
                departmentId: editEmployeeData.departmentId
              };
            }
            return emp;
          })
        );
        setEditingEmployeeId(null);
        addNotification("success", "Employee Updated", `Successfully modified ${editEmployeeData.name}'s profile.`);
      }
    );
  };

  // Remove / delete employee
  const handleRemoveEmployee = (empId, empName) => {
    if (empId === activeUser.id) {
      alert("Error: You cannot delete your own active logged-in user profile.");
      return;
    }
    
    requestConfirmation(
      "Confirm Employee Removal",
      `Are you sure you want to permanently remove ${empName} from the organization staff list?`,
      () => {
        setEmployees(prev => prev.filter(emp => emp.id !== empId));
        addNotification("info", "Employee Removed", `Removed ${empName} from the platform database.`);
      }
    );
  };

  // Admin transitions challenge states
  const transitionChallenge = (id, newStatus) => {
    setChallenges(prev =>
      prev.map(ch => {
        if (ch.id === id) {
          addNotification("info", "Challenge Status Shifted", `"${ch.title}" is now ${newStatus}.`);
          return { ...ch, status: newStatus };
        }
        return ch;
      })
    );
  };

  // Custom Report Generator Filter Engine
  useEffect(() => {
    let rows = [];

    // Filter environmental carbon transactions
    if (reportFilters.module === "all" || reportFilters.module === "E") {
      carbonTransactions.forEach(t => {
        const dept = departments.find(d => d.id === t.departmentId);
        const datePart = t.timestamp.substring(0, 10);
        if (datePart >= reportFilters.startDate && datePart <= reportFilters.endDate) {
          if (reportFilters.departmentId === "all" || t.departmentId === reportFilters.departmentId) {
            rows.push({
              date: datePart,
              module: "Environmental",
              dept: dept ? dept.name : "N/A",
              desc: t.source,
              metric: `${t.co2e} kg CO2e`,
              status: t.scope
            });
          }
        }
      });
    }

    // Filter social CSR participations
    if (reportFilters.module === "all" || reportFilters.module === "S") {
      csrParticipations.forEach(p => {
        const employee = employees.find(e => e.id === p.employeeId);
        const activity = csrActivities.find(a => a.id === p.activityId);
        const dept = employee ? departments.find(d => d.id === employee.departmentId) : null;

        if (p.completionDate >= reportFilters.startDate && p.completionDate <= reportFilters.endDate) {
          if (reportFilters.departmentId === "all" || (dept && dept.id === reportFilters.departmentId)) {
            if (reportFilters.employeeId === "all" || p.employeeId === reportFilters.employeeId) {
              rows.push({
                date: p.completionDate,
                module: "Social (CSR)",
                dept: dept ? dept.name : "N/A",
                desc: `${employee ? employee.name : "Employee"} - ${activity ? activity.name : "CSR Work"}`,
                metric: `${p.pointsEarned} Points`,
                status: p.approvalStatus
              });
            }
          }
        }
      });
    }

    // Filter governance audits & issues
    if (reportFilters.module === "all" || reportFilters.module === "G") {
      complianceIssues.forEach(ci => {
        const ownerEmp = employees.find(e => e.name === ci.owner);
        const dept = ownerEmp ? departments.find(d => d.id === ownerEmp.departmentId) : null;

        if (ci.dueDate >= reportFilters.startDate && ci.dueDate <= reportFilters.endDate) {
          if (reportFilters.departmentId === "all" || (dept && dept.id === reportFilters.departmentId)) {
            if (reportFilters.employeeId === "all" || (ownerEmp && ownerEmp.id === reportFilters.employeeId)) {
              rows.push({
                date: ci.dueDate,
                module: "Governance (Compliance)",
                dept: dept ? dept.name : "N/A",
                desc: `${ci.owner} - ${ci.description}`,
                metric: ci.severity,
                status: ci.status
              });
            }
          }
        }
      });
    }

    setFilteredReportRows(rows);
  }, [reportFilters, carbonTransactions, csrParticipations, complianceIssues, employees, departments, csrActivities]);

  // Export report to CSV file
  const exportToCSV = () => {
    if (filteredReportRows.length === 0) {
      alert("No data available to export.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Module,Department,Description,Metrics/Rating,Status\n";

    filteredReportRows.forEach(row => {
      const descCleaned = row.desc.replace(/"/g, '""');
      csvContent += `${row.date},${row.module},${row.dept},"${descCleaned}",${row.metric},${row.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EcoSphere_ESG_Report_${SYSTEM_DATE}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addNotification("success", "Export Successful", "CSV ESG report downloaded successfully.");
  };

  // Export report to printable PDF layout modal
  const openPrintPreview = () => {
    setPrintReportData({
      timestamp: new Date().toLocaleString(),
      filters: { ...reportFilters },
      rows: [...filteredReportRows]
    });
    setShowPrintModal(true);
  };

  const executePrint = () => {
    window.print();
  };

  // Department hierarchical emissions resolver helper
  const getDeptEmissions = (deptId) => {
    let direct = carbonTransactions
      .filter(t => t.departmentId === deptId)
      .reduce((sum, t) => sum + t.co2e, 0);

    const childDepts = departments.filter(d => d.parentId === deptId);
    childDepts.forEach(child => {
      direct += getDeptEmissions(child.id);
    });

    return parseFloat(direct.toFixed(1));
  };

  return (
    <div className="app-container">
      {/* Background PixelCanvas Animation */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -2, overflow: "hidden", pointerEvents: "none", backgroundColor: "#0a0a0a" }}>
        <PixelCanvas 
          colors={["#e879f9", "#a78bfa", "#38bdf8", "#22d3ee"]}
          speed={0.02}
        />
      </div>
      {/* 1. Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div>
            <div className="sidebar-logo">
              EcoSphere
            </div>
            <div className="sidebar-tagline">Sustainability Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <div className="nav-section-title">Overview</div>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            >
              Dashboard
            </button>
          </div>

          <div className="nav-group">
            <div className="nav-section-title">ESG Dimensions</div>
            
            {/* Environmental */}
            <button
              onClick={() => {
                setActiveTab("environmental");
                setEnvironmentalSubTab("factors");
              }}
              className={`nav-item ${activeTab === "environmental" ? "active-environmental active" : ""}`}
            >
              Environmental
            </button>
            <div className="nav-sub-items" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px", marginBottom: "8px" }}>
              <button 
                onClick={() => { setActiveTab("environmental"); setEnvironmentalSubTab("factors"); }} 
                style={{ background: "none", border: "none", color: activeTab === "environmental" && environmentalSubTab === "factors" ? "var(--color-environmental)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "environmental" && environmentalSubTab === "factors" ? "700" : "500" }}
              >
                Emission Factors
              </button>
              <button 
                onClick={() => { setActiveTab("environmental"); setEnvironmentalSubTab("products"); }} 
                style={{ background: "none", border: "none", color: activeTab === "environmental" && environmentalSubTab === "products" ? "var(--color-environmental)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "environmental" && environmentalSubTab === "products" ? "700" : "500" }}
              >
                Product ESG Profiles
              </button>
              <button 
                onClick={() => { setActiveTab("environmental"); setEnvironmentalSubTab("transactions"); }} 
                style={{ background: "none", border: "none", color: activeTab === "environmental" && environmentalSubTab === "transactions" ? "var(--color-environmental)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "environmental" && environmentalSubTab === "transactions" ? "700" : "500" }}
              >
                Carbon Transactions
              </button>
              <button 
                onClick={() => { setActiveTab("environmental"); setEnvironmentalSubTab("goals"); }} 
                style={{ background: "none", border: "none", color: activeTab === "environmental" && environmentalSubTab === "goals" ? "var(--color-environmental)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "environmental" && environmentalSubTab === "goals" ? "700" : "500" }}
              >
                Environmental Goals
              </button>
            </div>

            {/* Social */}
            <button
              onClick={() => {
                setActiveTab("social");
                setSocialSubTab("activities");
              }}
              className={`nav-item ${activeTab === "social" ? "active-social active" : ""}`}
            >
              Social
            </button>
            <div className="nav-sub-items" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px", marginBottom: "8px" }}>
              <button 
                onClick={() => { setActiveTab("social"); setSocialSubTab("activities"); }} 
                style={{ background: "none", border: "none", color: activeTab === "social" && socialSubTab === "activities" ? "var(--color-social)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "social" && socialSubTab === "activities" ? "700" : "500" }}
              >
                CSR Activities
              </button>
              <button 
                onClick={() => { setActiveTab("social"); setSocialSubTab("participation"); }} 
                style={{ background: "none", border: "none", color: activeTab === "social" && socialSubTab === "participation" ? "var(--color-social)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "social" && socialSubTab === "participation" ? "700" : "500" }}
              >
                Employee Participation
              </button>
              <button 
                onClick={() => { setActiveTab("social"); setSocialSubTab("diversity"); }} 
                style={{ background: "none", border: "none", color: activeTab === "social" && socialSubTab === "diversity" ? "var(--color-social)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "social" && socialSubTab === "diversity" ? "700" : "500" }}
              >
                Diversity Dashboard
              </button>
            </div>

            {/* Governance */}
            <button
              onClick={() => {
                setActiveTab("governance");
                setGovernanceSubTab("policies");
              }}
              className={`nav-item ${activeTab === "governance" ? "active-governance active" : ""}`}
            >
              Governance
            </button>
            <div className="nav-sub-items" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px", marginBottom: "8px" }}>
              <button 
                onClick={() => { setActiveTab("governance"); setGovernanceSubTab("policies"); }} 
                style={{ background: "none", border: "none", color: activeTab === "governance" && governanceSubTab === "policies" ? "var(--color-governance)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "governance" && governanceSubTab === "policies" ? "700" : "500" }}
              >
                Policies
              </button>
              <button 
                onClick={() => { setActiveTab("governance"); setGovernanceSubTab("acknowledgements"); }} 
                style={{ background: "none", border: "none", color: activeTab === "governance" && governanceSubTab === "acknowledgements" ? "var(--color-governance)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "governance" && governanceSubTab === "acknowledgements" ? "700" : "500" }}
              >
                Policy Acknowledgements
              </button>
              <button 
                onClick={() => { setActiveTab("governance"); setGovernanceSubTab("audits"); }} 
                style={{ background: "none", border: "none", color: activeTab === "governance" && governanceSubTab === "audits" ? "var(--color-governance)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "governance" && governanceSubTab === "audits" ? "700" : "500" }}
              >
                Audits
              </button>
              <button 
                onClick={() => { setActiveTab("governance"); setGovernanceSubTab("issues"); }} 
                style={{ background: "none", border: "none", color: activeTab === "governance" && governanceSubTab === "issues" ? "var(--color-governance)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "governance" && governanceSubTab === "issues" ? "700" : "500" }}
              >
                Compliance Issues
              </button>
            </div>
          </div>

          <div className="nav-group">
            <div className="nav-section-title">Engagement</div>
            {/* Gamification */}
            <button
              onClick={() => {
                setActiveTab("gamification");
                setGamificationSubTab("challenges");
              }}
              className={`nav-item ${activeTab === "gamification" ? "active-gamification active" : ""}`}
            >
              Gamification
            </button>
            <div className="nav-sub-items" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px", marginBottom: "8px" }}>
              <button 
                onClick={() => { setActiveTab("gamification"); setGamificationSubTab("challenges"); }} 
                style={{ background: "none", border: "none", color: activeTab === "gamification" && gamificationSubTab === "challenges" ? "var(--color-warning)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "gamification" && gamificationSubTab === "challenges" ? "700" : "500" }}
              >
                Challenges
              </button>
              <button 
                onClick={() => { setActiveTab("gamification"); setGamificationSubTab("participation"); }} 
                style={{ background: "none", border: "none", color: activeTab === "gamification" && gamificationSubTab === "participation" ? "var(--color-warning)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "gamification" && gamificationSubTab === "participation" ? "700" : "500" }}
              >
                Challenge Participation
              </button>
              <button 
                onClick={() => { setActiveTab("gamification"); setGamificationSubTab("badges"); }} 
                style={{ background: "none", border: "none", color: activeTab === "gamification" && gamificationSubTab === "badges" ? "var(--color-warning)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "gamification" && gamificationSubTab === "badges" ? "700" : "500" }}
              >
                Badges
              </button>
              <button 
                onClick={() => { setActiveTab("gamification"); setGamificationSubTab("rewards"); }} 
                style={{ background: "none", border: "none", color: activeTab === "gamification" && gamificationSubTab === "rewards" ? "var(--color-warning)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "gamification" && gamificationSubTab === "rewards" ? "700" : "500" }}
              >
                Rewards
              </button>
              <button 
                onClick={() => { setActiveTab("gamification"); setGamificationSubTab("leaderboard"); }} 
                style={{ background: "none", border: "none", color: activeTab === "gamification" && gamificationSubTab === "leaderboard" ? "var(--color-warning)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "gamification" && gamificationSubTab === "leaderboard" ? "700" : "500" }}
              >
                Leaderboard
              </button>
            </div>

            {/* Reports */}
            <button
              onClick={() => {
                setActiveTab("reports");
                setReportsSubTab("summary");
              }}
              className={`nav-item ${activeTab === "reports" ? "active" : ""}`}
            >
              Reports
            </button>
            <div className="nav-sub-items" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px", marginBottom: "8px" }}>
              <button 
                onClick={() => { setActiveTab("reports"); setReportsSubTab("environmental"); }} 
                style={{ background: "none", border: "none", color: activeTab === "reports" && reportsSubTab === "environmental" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "reports" && reportsSubTab === "environmental" ? "700" : "500" }}
              >
                Environmental Report
              </button>
              <button 
                onClick={() => { setActiveTab("reports"); setReportsSubTab("social"); }} 
                style={{ background: "none", border: "none", color: activeTab === "reports" && reportsSubTab === "social" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "reports" && reportsSubTab === "social" ? "700" : "500" }}
              >
                Social Report
              </button>
              <button 
                onClick={() => { setActiveTab("reports"); setReportsSubTab("governance"); }} 
                style={{ background: "none", border: "none", color: activeTab === "reports" && reportsSubTab === "governance" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "reports" && reportsSubTab === "governance" ? "700" : "500" }}
              >
                Governance Report
              </button>
              <button 
                onClick={() => { setActiveTab("reports"); setReportsSubTab("summary"); }} 
                style={{ background: "none", border: "none", color: activeTab === "reports" && reportsSubTab === "summary" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "reports" && reportsSubTab === "summary" ? "700" : "500" }}
              >
                ESG Summary
              </button>
              <button 
                onClick={() => { setActiveTab("reports"); setReportsSubTab("custom"); }} 
                style={{ background: "none", border: "none", color: activeTab === "reports" && reportsSubTab === "custom" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "reports" && reportsSubTab === "custom" ? "700" : "500" }}
              >
                Custom Report Builder
              </button>
            </div>
          </div>

          <div className="nav-group">
            <div className="nav-section-title">System Settings</div>
            {/* Settings */}
            <button
              onClick={() => {
                setActiveTab("settings");
                setSettingsSubTab("departments");
              }}
              className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            >
              Settings
            </button>
            <div className="nav-sub-items" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px", marginBottom: "8px" }}>
              <button 
                onClick={() => { setActiveTab("settings"); setSettingsSubTab("departments"); }} 
                style={{ background: "none", border: "none", color: activeTab === "settings" && settingsSubTab === "departments" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "settings" && settingsSubTab === "departments" ? "700" : "500" }}
              >
                Departments
              </button>
              <button 
                onClick={() => { setActiveTab("settings"); setSettingsSubTab("categories"); }} 
                style={{ background: "none", border: "none", color: activeTab === "settings" && settingsSubTab === "categories" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "settings" && settingsSubTab === "categories" ? "700" : "500" }}
              >
                Categories
              </button>
              <button 
                onClick={() => { setActiveTab("settings"); setSettingsSubTab("configuration"); }} 
                style={{ background: "none", border: "none", color: activeTab === "settings" && settingsSubTab === "configuration" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "settings" && settingsSubTab === "configuration" ? "700" : "500" }}
              >
                ESG Configuration
              </button>
              {(activeUser.role === "Admin" || activeUser.role === "Manager") && (
                <button 
                  onClick={() => { setActiveTab("settings"); setSettingsSubTab("staff"); }} 
                  style={{ background: "none", border: "none", color: activeTab === "settings" && settingsSubTab === "staff" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "settings" && settingsSubTab === "staff" ? "700" : "500" }}
                >
                  Staff Management
                </button>
              )}
              <button 
                onClick={() => { setActiveTab("settings"); setSettingsSubTab("notifications"); }} 
                style={{ background: "none", border: "none", color: activeTab === "settings" && settingsSubTab === "notifications" ? "var(--color-accent)" : "var(--text-secondary)", textAlign: "left", fontSize: "11.5px", cursor: "pointer", padding: "3px 8px", fontWeight: activeTab === "settings" && settingsSubTab === "notifications" ? "700" : "500" }}
              >
                Notification Settings
              </button>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div>System Date: <b>{SYSTEM_DATE}</b></div>
          <div>Mode: <b>Auto Calculations On</b></div>
        </div>
      </aside>

      {/* 2. Main Viewport */}
      <main className="main-viewport">
        {/* Top Header */}
        <header className="top-header">
          <div className="page-title">
            {activeTab === "dashboard" && "ESG Performance Command Center"}
            {activeTab === "environmental" && "Carbon Accounting & Ecology Goals"}
            {activeTab === "social" && "CSR Activities & Employee Involvement"}
            {activeTab === "governance" && "Governance Audits & Compliance Registry"}
            {activeTab === "gamification" && "Sustainability Challenge Arena & Rewards"}
            {activeTab === "reports" && "Custom ESG Report Builder Wizard"}
            {activeTab === "settings" && "Master Organizational Settings"}
          </div>

          <div className="header-controls">
            <div className="user-stats-pill">
              <span className="xp-indicator">{activeUser.xp} XP</span>
              <span className="points-indicator">{activeUser.points} pts</span>
            </div>

            {/* Profile Swapper */}
            <div className="profile-switcher">
              <span className="profile-avatar">{activeUser.avatar}</span>
              <select
                value={currentUserId}
                onChange={(e) => setCurrentUserId(e.target.value)}
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Bell */}
            <div className="notification-bell-container" style={{ position: "relative" }}>
              <button
                className="notification-bell"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px", borderRadius: "50%" }}
                aria-label="Notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s ease" }}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </button>
              {notifications.filter(n => n.unread).length > 0 && (
                <span className={`notification-badge ${notifications.some(n => n.type === "warning") ? "warning-glow" : ""}`}>
                  {notifications.filter(n => n.unread).length}
                </span>
              )}

              {/* Notification dropdown */}
              {showNotifications && (
                <div className="notification-dropdown animate-fade-in">
                  <div className="notification-header">
                    <span>Notifications</span>
                    <button
                      className="notification-clear"
                      onClick={() => {
                        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
                        setShowNotifications(false);
                      }}
                    >
                      Clear All Unread
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="notification-empty">No alerts in system logs.</div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          className={`notification-item ${n.unread ? "unread" : ""} ${n.type === "warning" ? "warning-alert" : ""}`}
                          onClick={() => {
                            setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item));
                          }}
                        >
                          <div className="notification-icon-wrapper" style={{ fontSize: "10px", fontWeight: "bold" }}>
                            {n.type === "warning" ? "[!]" : n.type === "success" ? "[*]" : "[i]"}
                          </div>
                          <div className="notification-text">
                            <div className="notification-title">{n.title}</div>
                            <div className="notification-desc">{n.desc}</div>
                            <div className="notification-time">{n.time}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 3. Panel Content Switch */}
        <div className="content-area">
          {/* Badge Unlock Modal Popup Overlay */}
          {unlockedBadge && (
            <div className="badge-unlock-alert animate-fade-in">
              <div className="badge-unlock-icon">[{unlockedBadge.icon}]</div>
              <div className="badge-unlock-details">
                <div className="badge-unlock-title">CONGRATULATIONS! BADGE UNLOCKED</div>
                <div className="badge-unlock-desc">
                  You unlocked the <b>{unlockedBadge.name}</b> badge: "{unlockedBadge.description}"
                </div>
              </div>
              <button className="btn btn-sm btn-primary" onClick={() => setUnlockedBadge(null)}>Dismiss</button>
            </div>
          )}

          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="animate-fade-in">
              {/* Key Metrics Cards */}
              <div className="card-grid">
                <div className="card card-accent-border-env">
                  <div className="card-title">
                    <span>Carbon Footprint</span>
                  </div>
                  <div className="card-value">
                    {carbonTransactions.reduce((acc, t) => acc + t.co2e, 0).toLocaleString()}
                    <span className="unit">kg CO2e</span>
                  </div>
                  <div className="card-subtitle">
                    <span>Scope 1, 2 & 3 Combined emissions</span>
                  </div>
                </div>

                <div className="card card-accent-border-soc">
                  <div className="card-title">
                    <span>CSR Activity Rate</span>
                  </div>
                  <div className="card-value">
                    {Math.round(
                      (csrParticipations.filter(p => p.approvalStatus === "Approved").length / employees.length) * 100
                    )}%
                    <span className="unit">participation</span>
                  </div>
                  <div className="card-subtitle">
                    <span>{csrParticipations.filter(p => p.approvalStatus === "Approved").length} completions logged</span>
                  </div>
                </div>

                <div className="card card-accent-border-gov">
                  <div className="card-title">
                    <span>Governance Handshake</span>
                  </div>
                  <div className="card-value">
                    {policies.length > 0 ? Math.round(
                      (policyAcknowledgements.length / (employees.length * policies.length)) * 100
                    ) : 0}%
                    <span className="unit">signed</span>
                  </div>
                  <div className="card-subtitle">
                    <span>{policyAcknowledgements.length} acknowledgements</span>
                  </div>
                </div>

                <div className="card card-accent-border-warn">
                  <div className="card-title">
                    <span>Compliance Issues</span>
                  </div>
                  <div className="card-value">
                    {complianceIssues.filter(ci => ci.status === "Open").length}
                    <span className="unit">open violations</span>
                  </div>
                  <div className="card-subtitle">
                    <span className="color-danger" style={{ color: "var(--color-danger)", fontWeight: "bold" }}>
                      {complianceIssues.filter(ci => ci.status === "Open" && ci.dueDate < SYSTEM_DATE).length} Overdue
                    </span>
                  </div>
                </div>
              </div>

              {/* Score Matrix & Configuration Dashboard layout */}
              <div className="dashboard-layout">
                {/* 1. Score Matrix dial widget */}
                <div className="card score-matrix-card">
                  <div className="panel-title">Corporate ESG Performance Matrix</div>
                  <div className="score-widget-container">
                    <div className="gauge-chart">
                      <svg className="gauge-svg" width="160" height="160">
                        <circle className="gauge-bg" cx="80" cy="80" r="65" />
                        <circle
                          className="gauge-fill"
                          cx="80"
                          cy="80"
                          r="65"
                          strokeDasharray={2 * Math.PI * 65}
                          strokeDashoffset={2 * Math.PI * 65 * (1 - totalESGScore / 100)}
                        />
                      </svg>
                      <div className="gauge-text">
                        <span className="gauge-number">{totalESGScore}</span>
                        <span className="gauge-label">Overall ESG</span>
                      </div>
                    </div>

                    <div className="gauge-chart">
                      <svg className="gauge-svg" width="100" height="100">
                        <circle className="gauge-bg" cx="50" cy="50" r="40" strokeWidth="8" />
                        <circle
                          className="gauge-fill"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - envScore / 100)}
                        />
                      </svg>
                      <div className="gauge-text">
                        <span className="gauge-number" style={{ fontSize: "20px" }}>{envScore}</span>
                        <span className="gauge-label" style={{ fontSize: "7px" }}>Env (E)</span>
                      </div>
                    </div>

                    <div className="gauge-chart">
                      <svg className="gauge-svg" width="100" height="100">
                        <circle className="gauge-bg" cx="50" cy="50" r="40" strokeWidth="8" />
                        <circle
                          className="gauge-fill gauge-fill-social"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - socScore / 100)}
                        />
                      </svg>
                      <div className="gauge-text">
                        <span className="gauge-number" style={{ fontSize: "20px" }}>{socScore}</span>
                        <span className="gauge-label" style={{ fontSize: "7px" }}>Social (S)</span>
                      </div>
                    </div>

                    <div className="gauge-chart">
                      <svg className="gauge-svg" width="100" height="100">
                        <circle className="gauge-bg" cx="50" cy="50" r="40" strokeWidth="8" />
                        <circle
                          className="gauge-fill gauge-fill-gov"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - govScore / 100)}
                        />
                      </svg>
                      <div className="gauge-text">
                        <span className="gauge-number" style={{ fontSize: "20px" }}>{govScore}</span>
                        <span className="gauge-label" style={{ fontSize: "7px" }}>Gov (G)</span>
                      </div>
                    </div>
                  </div>

                  {/* Proportional adjustable weight configurations */}
                  <div className="weight-adjuster-panel">
                    <div className="weight-labels" style={{ color: "var(--text-muted)", fontSize: "10px", textTransform: "uppercase" }}>
                      <span>Adjust Scoring Weights Proportionately (Target: 100%)</span>
                    </div>

                    <div className="weight-row">
                      <div className="weight-labels">
                        <span style={{ color: "var(--color-environmental)" }}>Environmental Weight</span>
                        <span className="weight-val">{weights.environmental}%</span>
                      </div>
                      <div className="weight-slider-container">
                        <input
                          type="range"
                          className="weight-slider slider-env"
                          min="0"
                          max="100"
                          value={weights.environmental}
                          onChange={(e) => handleWeightChange("environmental", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="weight-row">
                      <div className="weight-labels">
                        <span style={{ color: "var(--color-social)" }}>Social Weight</span>
                        <span className="weight-val">{weights.social}%</span>
                      </div>
                      <div className="weight-slider-container">
                        <input
                          type="range"
                          className="weight-slider slider-soc"
                          min="0"
                          max="100"
                          value={weights.social}
                          onChange={(e) => handleWeightChange("social", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="weight-row">
                      <div className="weight-labels">
                        <span style={{ color: "var(--color-governance)" }}>Governance Weight</span>
                        <span className="weight-val">{weights.governance}%</span>
                      </div>
                      <div className="weight-slider-container">
                        <input
                          type="range"
                          className="weight-slider slider-gov"
                          min="0"
                          max="100"
                          value={weights.governance}
                          onChange={(e) => handleWeightChange("governance", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="weight-total-banner valid">
                      ✓ Weights sum perfectly to {weights.environmental + weights.social + weights.governance}%
                    </div>
                  </div>
                </div>

                {/* 2. Interactive Daily ERP Operations Simulator */}
                <div className="quick-simulator-card">
                  <div className="panel-title">Daily ERP Operations Simulator</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px" }}>
                    Simulate real-time business processes. If Auto Carbon Calculations is enabled, emissions will instantly generate a transaction mapping to the department.
                  </div>

                  <div className="simulator-grid">
                    <button className="sim-button" onClick={() => simulateOperation("standard_steel")}>
                      <span className="sim-button-title">Solder Standard Frame</span>
                      <span className="sim-button-subtitle">Purchase 10x Standard Frames (+450kg Scope 3)</span>
                    </button>
                    <button className="sim-button" onClick={() => simulateOperation("ecosteel")}>
                      <span className="sim-button-title">Solder EcoSteel Frame</span>
                      <span className="sim-button-subtitle">Purchase 15x EcoSteel Frames (+277.5kg Scope 3)</span>
                    </button>
                    <button className="sim-button" onClick={() => simulateOperation("heavy_manufacturing")}>
                      <span className="sim-button-title">Factory Batch Solder</span>
                      <span className="sim-button-subtitle">Produce 100x Standard Frames (+4.5 Tonnes Scope 3)</span>
                    </button>
                    <button className="sim-button" onClick={() => simulateOperation("diesel_fleet")}>
                      <span className="sim-button-title">Logistics: Diesel Run</span>
                      <span className="sim-button-subtitle">Cargo Truck Transit 500km (+335kg Scope 1)</span>
                    </button>
                    <button className="sim-button" onClick={() => simulateOperation("electric_fleet")}>
                      <span className="sim-button-title">Logistics: Electric Van Run</span>
                      <span className="sim-button-subtitle">EV Van Delivery Transit 200km (+16kg Scope 2)</span>
                    </button>
                    <button className="sim-button" onClick={() => simulateOperation("gas_heating")}>
                      <span className="sim-button-title">Monthly Utility Boiler Run</span>
                      <span className="sim-button-subtitle">Log Facility Heating Burner (+304.5kg Scope 1)</span>
                    </button>
                  </div>

                  <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
                    <div className="toggle-switch-container" style={{ flexGrow: 1, margin: 0, padding: "8px 12px" }}>
                      <span className="toggle-title" style={{ fontSize: "12px" }}>Auto Emission Calculations</span>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={autoCarbon}
                          onChange={(e) => setAutoCarbon(e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Hierarchy and Carbon Footprint list with Delete options */}
              <div className="details-panel">
                <div className="panel-header">
                  <div className="panel-title">Organizational Hierarchy & Carbon Impact</div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "16px" }}>
                  This reports direct emissions + aggregated sub-department emissions recursively down the parent-child hierarchy tree.
                </div>

                <div className="dept-tree-container">
                  {departments.filter(d => d.parentId === null).map(parent => (
                    <div key={parent.id} className="dept-node">
                      <div className="dept-node-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="dept-node-title">
                          Dept: {parent.name} <span className="dept-node-code">{parent.code}</span>
                        </span>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <span className="badge-pill badge-pill-active" style={{ fontSize: "12px" }}>
                            Total Impact: {getDeptEmissions(parent.id)} kg CO2e
                          </span>
                          {activeUser.role === "Admin" && (
                            <button
                              onClick={() => deleteDepartment(parent.id)}
                              className="btn btn-sm btn-danger no-print"
                              style={{ padding: "4px 8px", fontSize: "11px" }}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="dept-node-meta">
                        <span>Head of Dept: <b>{parent.head}</b></span>
                        <span>Employee Count: <b>{parent.employeeCount}</b></span>
                      </div>

                      {/* Render Children */}
                      {departments.filter(d => d.parentId === parent.id).map(child => (
                        <div key={child.id} className="dept-node-child">
                          <div className="dept-node-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span className="dept-node-title">
                              Sub: {child.name} <span className="dept-node-code">{child.code}</span>
                            </span>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                              <span className="badge-pill badge-pill-medium" style={{ fontSize: "11px" }}>
                                Total Impact: {getDeptEmissions(child.id)} kg CO2e
                              </span>
                              {activeUser.role === "Admin" && (
                                <button
                                  onClick={() => deleteDepartment(child.id)}
                                  className="btn btn-sm btn-danger no-print"
                                  style={{ padding: "3px 6px", fontSize: "10px" }}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="dept-node-meta">
                            <span>Head of Dept: <b>{child.head}</b></span>
                            <span>Employee Count: <b>{child.employeeCount}</b></span>
                            <span>Parent: <b>{parent.name}</b></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transaction Logs preview */}
              <div className="details-panel">
                <div className="panel-header">
                  <div className="panel-title">Recent Carbon Ledger Records</div>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("environmental")}>
                    View Environmental Panel
                  </button>
                </div>
                <div className="table-container">
                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>Source Process</th>
                        <th>Department</th>
                        <th>Scope</th>
                        <th>Emissions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carbonTransactions.slice(0, 5).map(t => {
                        const dept = departments.find(d => d.id === t.departmentId);
                        return (
                          <tr key={t.id}>
                            <td>{t.timestamp.substring(0, 16).replace("T", " ")}</td>
                            <td>{t.source}</td>
                            <td>{dept ? dept.name : "N/A"}</td>
                            <td>
                              <span className={`badge-pill ${t.scope === "Scope 1" ? "badge-pill-critical" : t.scope === "Scope 2" ? "badge-pill-medium" : "badge-pill-low"}`}>
                                {t.scope}
                              </span>
                            </td>
                            <td style={{ fontWeight: "700" }}>{t.co2e} kg</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENVIRONMENTAL */}
          {activeTab === "environmental" && (
            <div className="animate-fade-in">
              <div className="sub-tab-bar">
                <button
                  className={`sub-tab-btn ${environmentalSubTab === "factors" ? "active-environmental" : ""}`}
                  onClick={() => setEnvironmentalSubTab("factors")}
                >
                  Emission Factors
                </button>
                <button
                  className={`sub-tab-btn ${environmentalSubTab === "products" ? "active-environmental" : ""}`}
                  onClick={() => setEnvironmentalSubTab("products")}
                >
                  Product ESG Profiles
                </button>
                <button
                  className={`sub-tab-btn ${environmentalSubTab === "transactions" ? "active-environmental" : ""}`}
                  onClick={() => setEnvironmentalSubTab("transactions")}
                >
                  Carbon Transactions
                </button>
                <button
                  className={`sub-tab-btn ${environmentalSubTab === "goals" ? "active-environmental" : ""}`}
                  onClick={() => setEnvironmentalSubTab("goals")}
                >
                  Environmental Goals
                </button>
              </div>

              {environmentalSubTab === "products" && (
                <div className="equal-grid animate-fade-in" style={{ gridTemplateColumns: "1fr" }}>
                  {/* Product ESG Profile management */}
                  <div className="details-panel">
                    <div className="panel-title">Product Carbon Profile Configurator</div>
                    <form onSubmit={handleAddProduct} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div className="form-group">
                        <label>Product / Component Name</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. EcoAluminum Casing"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Carbon Cost Profile</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-input"
                            placeholder="e.g. 12.4"
                            value={newProduct.carbonProfile}
                            onChange={(e) => setNewProduct({ ...newProduct, carbonProfile: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Unit</label>
                          <select
                            className="form-input"
                            value={newProduct.unit}
                            onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                          >
                            <option value="kg CO2e/unit">kg CO2e/unit</option>
                            <option value="kg CO2e/kg">kg CO2e/kg</option>
                            <option value="kg CO2e/km">kg CO2e/km</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Linked Emission Factor Source</label>
                        <select
                          className="form-input"
                          value={newProduct.factorId}
                          onChange={(e) => setNewProduct({ ...newProduct, factorId: e.target.value })}
                        >
                          {emissionFactors.map(ef => (
                            <option key={ef.id} value={ef.id}>
                              [{ef.scope}] {ef.category} ({ef.factor} {ef.unit})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Additional specs..."
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
                        Save Product Profile
                      </button>
                    </form>

                    <div className="table-container" style={{ marginTop: "24px", maxHeight: "400px", overflowY: "auto" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Carbon Profile</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productProfiles.map(p => (
                            <tr key={p.id}>
                              <td>
                                <b>{p.name}</b>
                                <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{p.description}</div>
                              </td>
                              <td>{p.carbonProfile} {p.unit}</td>
                              <td>
                                <button
                                  onClick={() => deleteProductProfile(p.id)}
                                  className="btn btn-sm btn-danger"
                                  style={{ padding: "2px 6px", fontSize: "10px" }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {environmentalSubTab === "factors" && (
                <div className="equal-grid animate-fade-in" style={{ gridTemplateColumns: "1fr" }}>
                  {/* Emission Factors Database */}
                  <div className="details-panel">
                    <div className="panel-title">Scope Emission Factors Catalog</div>
                    <form onSubmit={handleAddFactor} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div className="form-group">
                        <label>Activity Category</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Coal Fired Power Sourcing"
                          value={newFactor.category}
                          onChange={(e) => setNewFactor({ ...newFactor, category: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Carbon Factor Coeff</label>
                          <input
                            type="number"
                            step="0.001"
                            className="form-input"
                            placeholder="e.g. 0.95"
                            value={newFactor.factor}
                            onChange={(e) => setNewFactor({ ...newFactor, factor: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Unit Formula</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. kg CO2e/kWh"
                            value={newFactor.unit}
                            onChange={(e) => setNewFactor({ ...newFactor, unit: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Greenhouse Gas Scope Classification</label>
                        <select
                          className="form-input"
                          value={newFactor.scope}
                          onChange={(e) => setNewFactor({ ...newFactor, scope: e.target.value })}
                        >
                          <option value="Scope 1">Scope 1 (Direct Emissions)</option>
                          <option value="Scope 2">Scope 2 (Indirect Utilities)</option>
                          <option value="Scope 3">Scope 3 (Supply Chain Value)</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
                        Add Emission Factor
                      </button>
                    </form>

                    <div className="table-container" style={{ marginTop: "24px", maxHeight: "400px", overflowY: "auto" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Scope</th>
                            <th>Category</th>
                            <th>Factor</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {emissionFactors.map(ef => (
                            <tr key={ef.id}>
                              <td>
                                <span className={`badge-pill ${ef.scope === "Scope 1" ? "badge-pill-critical" : ef.scope === "Scope 2" ? "badge-pill-medium" : "badge-pill-low"}`}>
                                  {ef.scope}
                                </span>
                              </td>
                              <td>{ef.category}</td>
                              <td style={{ fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{ef.factor} {ef.unit}</td>
                              <td>
                                <button
                                  onClick={() => deleteEmissionFactor(ef.id)}
                                  className="btn btn-sm btn-danger"
                                  style={{ padding: "2px 6px", fontSize: "10px" }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {environmentalSubTab === "goals" && (
                <div className="equal-grid animate-fade-in">
                  <div className="details-panel">
                    <div className="panel-title">Sustainability Target Milestones</div>
                    <div className="table-container">
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Goal</th>
                            <th>Target</th>
                            <th>Actual</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {goals.map(g => {
                            const isReduction = g.title.toLowerCase().includes("reduce") || g.title.toLowerCase().includes("zero");
                            let percent = 0;
                            if (isReduction) {
                              percent = g.current <= g.target ? 100 : Math.round((g.target / g.current) * 100);
                            } else {
                              percent = Math.min(100, Math.round((g.current / g.target) * 100));
                            }

                            return (
                              <tr key={g.id}>
                                <td>
                                  <b>{g.title}</b>
                                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>Deadline: {g.deadline} | {g.status}</div>
                                  <div style={{ marginTop: "6px", width: "150px", height: "6px", backgroundColor: "var(--border-color)", borderRadius: "3px" }}>
                                    <div style={{ height: "100%", width: `${percent}%`, backgroundColor: "var(--color-environmental)", borderRadius: "3px" }}></div>
                                  </div>
                                </td>
                                <td>{g.target} {g.unit}</td>
                                <td>{g.current} {g.unit}</td>
                                <td>
                                  <button
                                    onClick={() => deleteGoal(g.id)}
                                    className="btn btn-sm btn-danger"
                                    style={{ padding: "2px 6px", fontSize: "10px" }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="details-panel">
                    <div className="panel-title">Add Goal Milestone</div>
                    <form onSubmit={handleAddGoal} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div className="form-group">
                        <label>Goal / Target Title</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Reduce scope 2 by 15%"
                          value={newGoal.title}
                          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Target Value</label>
                          <input
                            type="number"
                            className="form-input"
                            placeholder="e.g. 5000"
                            value={newGoal.target}
                            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Current Value</label>
                          <input
                            type="number"
                            className="form-input"
                            placeholder="e.g. 6200"
                            value={newGoal.current}
                            onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Unit</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. kg CO2e"
                            value={newGoal.unit}
                            onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Deadline</label>
                          <input
                            type="date"
                            className="form-input"
                            value={newGoal.deadline}
                            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Initial Status</label>
                        <select
                          className="form-input"
                          value={newGoal.status}
                          onChange={(e) => setNewGoal({ ...newGoal, status: e.target.value })}
                        >
                          <option value="On Track">On Track</option>
                          <option value="At Risk">At Risk</option>
                          <option value="Behind">Behind</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: "4px" }}>
                        Add Goal
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {environmentalSubTab === "transactions" && (
                <div className="details-panel animate-fade-in" style={{ marginTop: "0px" }}>
                  <div className="panel-title">Complete Carbon Accounting Ledger</div>
                  <div className="table-container">
                    <table className="table-custom">
                      <thead>
                        <tr>
                          <th>Timestamp</th>
                          <th>Source ERP Process</th>
                          <th>Department</th>
                          <th>Scope</th>
                          <th>Emissions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carbonTransactions.map(t => {
                          const dept = departments.find(d => d.id === t.departmentId);
                          return (
                            <tr key={t.id}>
                              <td>{t.timestamp.substring(0, 16).replace("T", " ")}</td>
                              <td>{t.source}</td>
                              <td>{dept ? dept.name : "N/A"}</td>
                              <td>
                                <span className={`badge-pill ${t.scope === "Scope 1" ? "badge-pill-critical" : t.scope === "Scope 2" ? "badge-pill-medium" : "badge-pill-low"}`}>
                                  {t.scope}
                                </span>
                              </td>
                              <td style={{ fontWeight: "700" }}>{t.co2e} kg</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SOCIAL */}
          {activeTab === "social" && (
            <div className="animate-fade-in">
              <div className="sub-tab-bar">
                <button
                  className={`sub-tab-btn ${socialSubTab === "activities" ? "active-social" : ""}`}
                  onClick={() => setSocialSubTab("activities")}
                >
                  CSR Activities
                </button>
                <button
                  className={`sub-tab-btn ${socialSubTab === "participation" ? "active-social" : ""}`}
                  onClick={() => setSocialSubTab("participation")}
                >
                  Employee Participation
                </button>
                <button
                  className={`sub-tab-btn ${socialSubTab === "diversity" ? "active-social" : ""}`}
                  onClick={() => setSocialSubTab("diversity")}
                >
                  Diversity Dashboard
                </button>
              </div>

              {socialSubTab === "activities" && (
                <div className="equal-grid animate-fade-in">
                  <div className="details-panel">
                    <div className="panel-title">Sustainability CSR Activities Catalog</div>
                    <div className="table-container">
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>CSR Activity Title</th>
                            <th>Theme</th>
                            <th>Rewards</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {csrActivities.map(csr => (
                            <tr key={csr.id}>
                              <td>
                                <b>{csr.name}</b>
                                <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px" }}>{csr.description}</div>
                                <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>Date: {csr.date} | {csr.status}</div>
                              </td>
                              <td>{csr.category}</td>
                              <td>
                                <div style={{ color: "var(--color-environmental)", fontSize: "11px" }}>+{csr.xp} XP</div>
                                <div style={{ color: "var(--color-warning)", fontSize: "11px" }}>+{csr.pointsReward} Pts</div>
                              </td>
                              <td>
                                <button
                                  onClick={() => deleteCSRActivity(csr.id)}
                                  className="btn btn-sm btn-danger"
                                  style={{ padding: "2px 6px", fontSize: "10px" }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="details-panel">
                    <div className="panel-title">Add CSR Activity initiative</div>
                    <form onSubmit={handleAddCSRActivity} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div className="form-group">
                        <label>Activity Name</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Community Garden planting"
                          value={newCSRActivity.name}
                          onChange={(e) => setNewCSRActivity({ ...newCSRActivity, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Plant vegetable saplings at regional lot"
                          value={newCSRActivity.description}
                          onChange={(e) => setNewCSRActivity({ ...newCSRActivity, description: e.target.value })}
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>XP Reward</label>
                          <input
                            type="number"
                            className="form-input"
                            value={newCSRActivity.xp}
                            onChange={(e) => setNewCSRActivity({ ...newCSRActivity, xp: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Points Reward</label>
                          <input
                            type="number"
                            className="form-input"
                            value={newCSRActivity.pointsReward}
                            onChange={(e) => setNewCSRActivity({ ...newCSRActivity, pointsReward: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Category Theme</label>
                          <select
                            className="form-input"
                            value={newCSRActivity.category}
                            onChange={(e) => setNewCSRActivity({ ...newCSRActivity, category: e.target.value })}
                          >
                            <option value="Waste Management">Waste Management</option>
                            <option value="Community Clean-up">Community Clean-up</option>
                            <option value="Eco-Education">Eco-Education</option>
                            <option value="Carbon Reduction">Carbon Reduction</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Scheduled Date</label>
                          <input
                            type="date"
                            className="form-input"
                            value={newCSRActivity.date}
                            onChange={(e) => setNewCSRActivity({ ...newCSRActivity, date: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: "4px" }}>
                        Create Activity
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {socialSubTab === "participation" && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div className="details-panel">
                    <div className="panel-title">Log CSR Activity Participation</div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px", marginBottom: "16px" }}>
                      Logging as: <b>{activeUser.name} ({activeUser.role})</b>
                    </div>

                    <form onSubmit={handleJoinCSR} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div className="form-group">
                        <label>Select Activity</label>
                        <select
                          className="form-input"
                          value={newCSRParticipation.activityId}
                          onChange={(e) => setNewCSRParticipation({ ...newCSRParticipation, activityId: e.target.value })}
                          required
                        >
                          <option value="">-- Choose CSR Initiative --</option>
                          {csrActivities.map(csr => (
                            <option key={csr.id} value={csr.id}>
                              {csr.name} (+{csr.xp} XP, +{csr.pointsReward} Points)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Verification Proof/Evidence description</label>
                        <textarea
                          className="form-input"
                          style={{ minHeight: "80px", resize: "vertical" }}
                          placeholder="Please describe your involvement, upload log details or name files (e.g. Photo_CleanUp_Section3.jpg)..."
                          value={newCSRParticipation.proofText}
                          onChange={(e) => setNewCSRParticipation({ ...newCSRParticipation, proofText: e.target.value })}
                          required={evidenceRequired}
                        ></textarea>
                        {evidenceRequired && (
                          <div style={{ fontSize: "10px", color: "var(--color-warning)" }}>
                            Evidence Required setting is active. Submissions require text/proof attachment details.
                          </div>
                        )}
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
                        Submit CSR Participation
                      </button>
                    </form>
                  </div>

                  <div className="details-panel" style={{ marginTop: "0px" }}>
                    <div className="panel-title">CSR Participation Approvals & Logs</div>
                    <div className="table-container">
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>CSR Activity</th>
                            <th>Date Completed</th>
                            <th>Evidence Attached</th>
                            <th>Approval Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {csrParticipations.map(p => {
                            const employee = employees.find(e => e.id === p.employeeId);
                            const activity = csrActivities.find(a => a.id === p.activityId);
                            return (
                              <tr key={p.id}>
                                <td><b>{employee ? employee.name : "Employee"}</b></td>
                                <td>{activity ? activity.name : "N/A"}</td>
                                <td>{p.completionDate}</td>
                                <td>
                                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontStyle: "italic" }}>
                                    "{p.proofText}"
                                  </span>
                                </td>
                                <td>
                                  {p.approvalStatus === "Under Review" ? (
                                    <div style={{ display: "flex", gap: "6px" }}>
                                      <button
                                        onClick={() => approveCSRParticipation(p.id)}
                                        className="btn btn-sm btn-success"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => rejectCSRParticipation(p.id)}
                                        className="btn btn-sm btn-danger"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  ) : (
                                    <span className={`badge-pill ${p.approvalStatus === "Approved" ? "badge-pill-completed" : "badge-pill-archived"}`}>
                                      {p.approvalStatus}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {socialSubTab === "diversity" && (
                <div className="equal-grid animate-fade-in" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="details-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div className="panel-title">Organizational Diversity Metrics</div>
                      <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px", marginBottom: "16px" }}>
                        Corporate gender and age demographic distributions.
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "bold" }}>
                            <span>Gender Balance (Women / Men / Other)</span>
                            <span>40% / 55% / 5%</span>
                          </div>
                          <div style={{ height: "14px", display: "flex", width: "100%", borderRadius: "7px", overflow: "hidden", marginTop: "4px" }}>
                            <div style={{ width: "40%", backgroundColor: "var(--color-social)" }}></div>
                            <div style={{ width: "55%", backgroundColor: "var(--color-governance)" }}></div>
                            <div style={{ width: "5%", backgroundColor: "var(--color-warning)" }}></div>
                          </div>
                        </div>

                        <div style={{ marginTop: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "bold" }}>
                            <span>Demographics by Age Tier</span>
                            <span>&lt;30 (30%) | 30-50 (55%) | &gt;50 (15%)</span>
                          </div>
                          <div style={{ height: "14px", display: "flex", width: "100%", borderRadius: "7px", overflow: "hidden", marginTop: "4px" }}>
                            <div style={{ width: "30%", backgroundColor: "var(--color-environmental)" }}></div>
                            <div style={{ width: "55%", backgroundColor: "var(--color-social)" }}></div>
                            <div style={{ width: "15%", backgroundColor: "var(--text-muted)" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "14px", marginTop: "16px", fontSize: "11px", color: "var(--text-muted)" }}>
                      Info: Diversity distributions are derived from active HR record handshakes.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GOVERNANCE */}
          {activeTab === "governance" && (
            <div className="animate-fade-in">
              <div className="sub-tab-bar">
                <button
                  className={`sub-tab-btn ${governanceSubTab === "policies" ? "active-governance" : ""}`}
                  onClick={() => setGovernanceSubTab("policies")}
                >
                  Policies
                </button>
                <button
                  className={`sub-tab-btn ${governanceSubTab === "acknowledgements" ? "active-governance" : ""}`}
                  onClick={() => setGovernanceSubTab("acknowledgements")}
                >
                  Policy Acknowledgements
                </button>
                <button
                  className={`sub-tab-btn ${governanceSubTab === "issues" || governanceSubTab === "violations" ? "active-governance" : ""}`}
                  onClick={() => setGovernanceSubTab("issues")}
                >
                  Compliance Issues
                </button>
                <button
                  className={`sub-tab-btn ${governanceSubTab === "audits" ? "active-governance" : ""}`}
                  onClick={() => setGovernanceSubTab("audits")}
                >
                  Audits Registry
                </button>
              </div>

              {governanceSubTab === "policies" && (
                <div className="equal-grid animate-fade-in">
                  {/* Policy Sign-off Center */}
                  <div className="details-panel">
                    <div className="panel-title">ESG Policy Acknowledgement Center</div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px", marginBottom: "16px" }}>
                      Switch profiles in the header to sign off policies as different employees.
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {policies.map(pol => {
                        const isAcked = policyAcknowledgements.some(
                          pa => pa.policyId === pol.id && pa.employeeId === activeUser.id
                        );
                        const ackCount = policyAcknowledgements.filter(pa => pa.policyId === pol.id).length;
                        const percent = Math.round((ackCount / employees.length) * 100);

                        return (
                          <div key={pol.id} style={{ padding: "14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "rgba(255, 255, 255, 0.01)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontWeight: "700", fontSize: "14px" }}>{pol.title}</span>
                              <span className="badge-pill badge-pill-medium" style={{ fontSize: "10px" }}>
                                {percent}% Signed
                              </span>
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "6px", lineHeight: "1.4" }}>
                              {pol.content}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", borderTop: "1px solid var(--border-color)", paddingTop: "10px" }}>
                              <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Published: {pol.dateCreated}</span>
                              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                {isAcked ? (
                                  <span style={{ color: "var(--color-environmental)", fontSize: "12px", fontWeight: "bold" }}>✓ Signed by You</span>
                                ) : (
                                  <button onClick={() => acknowledgePolicy(pol.id)} className="btn btn-sm btn-primary">
                                    Sign Policy Acknowledgement
                                  </button>
                                )}
                                {activeUser.role === "Admin" && (
                                  <button
                                    onClick={() => deletePolicy(pol.id)}
                                    className="btn btn-sm btn-danger"
                                    style={{ padding: "2px 6px", fontSize: "10px" }}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="details-panel">
                    {activeUser.role === "Admin" ? (
                      <>
                        <div className="panel-title">Add Governance Policy Draft</div>
                        <form onSubmit={handleAddPolicy} style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div className="form-group">
                            <label>Policy Header Title</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="e.g. Zero-Waste Cafeteria Directive"
                              value={newPolicy.title}
                              onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Policy Content Text</label>
                            <textarea
                              className="form-input"
                              style={{ minHeight: "60px" }}
                              placeholder="Detail the sustainability policy directive details..."
                              value={newPolicy.content}
                              onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
                              required
                            ></textarea>
                          </div>
                          <button type="submit" className="btn type btn-secondary btn-sm">
                            Publish Policy
                          </button>
                        </form>
                      </>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px", textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <h4 style={{ margin: 0, color: "var(--text-primary)" }}>View-Only Authorization Clearance</h4>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", maxWidth: "280px", lineHeight: "1.5" }}>
                          Administrative access privileges are required to publish governance policies.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {governanceSubTab === "acknowledgements" && (
                <div className="equal-grid animate-fade-in" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
                  <div className="details-panel">
                    <div className="panel-title">Policy Sign-off Registry Log</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Date Signed</th>
                            <th>Employee</th>
                            <th>Policy Title</th>
                          </tr>
                        </thead>
                        <tbody>
                          {policyAcknowledgements.map(pa => {
                            const emp = employees.find(e => e.id === pa.employeeId);
                            const pol = policies.find(p => p.id === pa.policyId);
                            return (
                              <tr key={pa.id}>
                                <td>{pa.dateAcknowledged ? pa.dateAcknowledged.substring(0, 10) : "N/A"}</td>
                                <td><b>{emp ? emp.name : "Employee"}</b> ({emp ? emp.role : "N/A"})</td>
                                <td>{pol ? pol.title : "N/A"}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="details-panel">
                    <div className="panel-title">Your Acknowledgment Status</div>
                    <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {policies.map(pol => {
                        const isAcked = policyAcknowledgements.some(
                          pa => pa.policyId === pol.id && pa.employeeId === activeUser.id
                        );
                        return (
                          <div key={pol.id} style={{ padding: "12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "rgba(255, 255, 255, 0.01)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontWeight: "700", fontSize: "13px" }}>{pol.title}</span>
                              {isAcked ? (
                                <span style={{ color: "var(--color-environmental)", fontSize: "11px", fontWeight: "bold" }}>✓ Acknowledged</span>
                              ) : (
                                <button
                                  onClick={() => acknowledgePolicy(pol.id)}
                                  className="btn btn-sm btn-primary"
                                  style={{ padding: "4px 8px", fontSize: "10.5px" }}
                                >
                                  Sign Now
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {(governanceSubTab === "violations" || governanceSubTab === "issues") && (
                <div className="equal-grid animate-fade-in">
                  <div className="details-panel">
                    <div className="panel-title">Compliance Violations & Remediation Tracking</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Due Date</th>
                            <th>Violation Description</th>
                            <th>Owner</th>
                            <th>Severity</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {complianceIssues.map(ci => {
                            const isOverdue = ci.status === "Open" && ci.dueDate < SYSTEM_DATE;
                            return (
                              <tr
                                key={ci.id}
                                style={isOverdue ? { backgroundColor: "rgba(239, 68, 68, 0.04)", borderLeft: "4px solid var(--color-danger)" } : {}}
                              >
                                <td style={isOverdue ? { color: "var(--color-danger)", fontWeight: "bold" } : {}}>
                                  {ci.dueDate} {isOverdue && "OVERDUE"}
                                </td>
                                <td>
                                  <b>{ci.description}</b>
                                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px" }}>
                                    Linked Audit ID: {ci.auditId}
                                  </div>
                                </td>
                                <td>{ci.owner}</td>
                                <td>
                                  <span className={`badge-pill ${ci.severity === "Critical" ? "badge-pill-critical" : ci.severity === "High" ? "badge-pill-high" : ci.severity === "Medium" ? "badge-pill-medium" : "badge-pill-low"}`}>
                                    {ci.severity}
                                  </span>
                                </td>
                                <td>
                                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                    {ci.status === "Open" ? (
                                      activeUser.role === "Admin" || activeUser.role === "Manager" ? (
                                        <button
                                          onClick={() => resolveComplianceIssue(ci.id)}
                                          className="btn btn-sm btn-success"
                                          style={{ padding: "4px 8px" }}
                                        >
                                          Mark Resolved
                                        </button>
                                      ) : (
                                        <span className="badge-pill badge-pill-draft">Open</span>
                                      )
                                    ) : (
                                      <span className="badge-pill badge-pill-resolved">Resolved</span>
                                    )}
                                    {activeUser.role === "Admin" ? (
                                      <button
                                        onClick={() => deleteComplianceIssue(ci.id)}
                                        className="btn btn-sm btn-danger"
                                        style={{ padding: "4px 8px" }}
                                      >
                                        Delete
                                      </button>
                                    ) : (
                                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Locked</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="details-panel">
                    {activeUser.role === "Admin" || activeUser.role === "Manager" ? (
                      <>
                        <div className="panel-title">Raise Governance Compliance Issue</div>
                        <form onSubmit={handleAddCompliance} style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div className="form-group">
                            <label>Linked Audit Scope</label>
                            <select
                              className="form-input"
                              value={newComplianceIssue.auditId}
                              onChange={(e) => setNewComplianceIssue({ ...newComplianceIssue, auditId: e.target.value })}
                              required
                            >
                              {audits.map(a => (
                                <option key={a.id} value={a.id}>{a.title} ({a.date})</option>
                              ))}
                            </select>
                          </div>

                          <div className="form-grid">
                            <div className="form-group">
                              <label>Issue Owner</label>
                              <select
                                className="form-input"
                                value={newComplianceIssue.ownerId}
                                onChange={(e) => setNewComplianceIssue({ ...newComplianceIssue, ownerId: e.target.value })}
                              >
                                {employees.map(emp => (
                                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Critical Severity</label>
                              <select
                                className="form-input"
                                value={newComplianceIssue.severity}
                                onChange={(e) => setNewComplianceIssue({ ...newComplianceIssue, severity: e.target.value })}
                              >
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Remediation Due Date</label>
                            <input
                              type="date"
                              className="form-input"
                              value={newComplianceIssue.dueDate}
                              onChange={(e) => setNewComplianceIssue({ ...newComplianceIssue, dueDate: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>Violation/Issue Description</label>
                            <textarea
                              className="form-input"
                              style={{ minHeight: "50px" }}
                              placeholder="Describe the compliance failure or gap..."
                              value={newComplianceIssue.description}
                              onChange={(e) => setNewComplianceIssue({ ...newComplianceIssue, description: e.target.value })}
                              required
                            ></textarea>
                          </div>

                          <button type="submit" className="btn btn-primary" style={{ marginTop: "4px" }}>
                            Flag Compliance Issue
                          </button>
                        </form>
                      </>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px", textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <h4 style={{ margin: 0, color: "var(--text-primary)" }}>View-Only Authorization Clearance</h4>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", maxWidth: "280px", lineHeight: "1.5" }}>
                          Manager or administrative privileges are required to raise compliance issues.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {governanceSubTab === "audits" && (
                <div className="equal-grid animate-fade-in">
                  <div className="details-panel">
                    <div className="panel-title">Corporate ESG Audits Registry</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Audit Scope</th>
                            <th>Auditor</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {audits.map(a => (
                            <tr key={a.id}>
                              <td>{a.date}</td>
                              <td>
                                <b>{a.title}</b>
                                <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Scope: {a.scope} | {a.status}</div>
                              </td>
                              <td>{a.auditor}</td>
                              <td>
                                {activeUser.role === "Admin" ? (
                                  <button
                                    onClick={() => deleteAudit(a.id)}
                                    className="btn btn-sm btn-danger"
                                    style={{ padding: "2px 6px", fontSize: "10px" }}
                                  >
                                    Delete
                                  </button>
                                ) : (
                                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Locked</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="details-panel">
                    {activeUser.role === "Admin" || activeUser.role === "Manager" ? (
                      <>
                        <div className="panel-title">Log Governance Audit Record</div>
                        <form onSubmit={handleAddAudit} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div className="form-group">
                            <label>Audit Scope Title</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="e.g. Carbon Procurement Audit"
                              value={newAudit.title}
                              onChange={(e) => setNewAudit({ ...newAudit, title: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-grid">
                            <div className="form-group">
                              <label>Auditor Name / Agency</label>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. SGS ESG Assurance"
                                value={newAudit.auditor}
                                onChange={(e) => setNewAudit({ ...newAudit, auditor: e.target.value })}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Date Conducted</label>
                              <input
                                type="date"
                                className="form-input"
                                value={newAudit.date}
                                onChange={(e) => setNewAudit({ ...newAudit, date: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Domain Details</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="e.g. Scope 3 Supply chain compliance"
                              value={newAudit.scope}
                              onChange={(e) => setNewAudit({ ...newAudit, scope: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Status</label>
                            <select
                              className="form-input"
                              value={newAudit.status}
                              onChange={(e) => setNewAudit({ ...newAudit, status: e.target.value })}
                            >
                              <option value="Completed">Completed</option>
                              <option value="Action Required">Action Required</option>
                            </select>
                          </div>
                          <button type="submit" className="btn btn-primary" style={{ marginTop: "4px" }}>
                            Register Audit
                          </button>
                        </form>
                      </>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px", textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <h4 style={{ margin: 0, color: "var(--text-primary)" }}>View-Only Authorization Clearance</h4>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", maxWidth: "280px", lineHeight: "1.5" }}>
                          Manager or administrative privileges are required to register corporate audits.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: GAMIFICATION */}
          {activeTab === "gamification" && (
            <div className="animate-fade-in">
              <div className="sub-tab-bar">
                <button
                  className={`sub-tab-btn ${gamificationSubTab === "challenges" ? "active-gamification" : ""}`}
                  onClick={() => setGamificationSubTab("challenges")}
                >
                  Challenges
                </button>
                <button
                  className={`sub-tab-btn ${gamificationSubTab === "participation" ? "active-gamification" : ""}`}
                  onClick={() => setGamificationSubTab("participation")}
                >
                  Challenge Participation
                </button>
                <button
                  className={`sub-tab-btn ${gamificationSubTab === "badges" ? "active-gamification" : ""}`}
                  onClick={() => setGamificationSubTab("badges")}
                >
                  Badges
                </button>
                <button
                  className={`sub-tab-btn ${gamificationSubTab === "rewards" ? "active-gamification" : ""}`}
                  onClick={() => setGamificationSubTab("rewards")}
                >
                  Rewards
                </button>
                <button
                  className={`sub-tab-btn ${gamificationSubTab === "leaderboard" ? "active-gamification" : ""}`}
                  onClick={() => setGamificationSubTab("leaderboard")}
                >
                  Leaderboard
                </button>
              </div>

              {gamificationSubTab === "challenges" && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Challenge Arena */}
                  <div className="details-panel" style={{ marginTop: "0px" }}>
                    <div className="panel-header">
                      <div className="panel-title">Active Challenges Arena</div>
                    </div>

                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "0px" }}>
                      <div style={{ flex: 1, minWidth: "300px", padding: "16px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "rgba(255, 255, 255, 0.01)" }}>
                        <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "12px" }}>Update Challenge Progress</div>
                        <form onSubmit={handleUpdateChallengeProgress} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div className="form-group">
                            <label>Select Your Active Challenge</label>
                            <select
                              className="form-input"
                              value={selectedChallengeId}
                              onChange={(e) => setSelectedChallengeId(e.target.value)}
                            >
                              <option value="">-- Choose Joined Challenge --</option>
                              {challengeParticipations
                                .filter(cp => cp.employeeId === activeUser.id && cp.approvalStatus === "Active")
                                .map(cp => {
                                  const ch = challenges.find(c => c.id === cp.challengeId);
                                  return (
                                    <option key={cp.id} value={cp.challengeId}>
                                      {ch ? ch.title : "Challenge"} ({cp.progress}% done)
                                    </option>
                                  );
                                })}
                            </select>
                          </div>

                          <div className="form-grid">
                            <div className="form-group">
                              <label>Progress slider ({challengeProgress}%)</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={challengeProgress}
                                onChange={(e) => setChallengeProgress(parseInt(e.target.value))}
                                className="weight-slider"
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Verification Proof/Comment</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="Evidence links/comments..."
                              value={challengeProof}
                              onChange={(e) => setChallengeProof(e.target.value)}
                              required={challengeProgress === 100}
                            />
                          </div>

                          <button type="submit" className="btn btn-secondary btn-sm" style={{ marginTop: "6px" }}>
                            Update Progress Log
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Challenges listing and Add Challenge form side-by-side */}
                  <div className="equal-grid" style={{ marginTop: "0px" }}>
                    <div className="details-panel">
                      <div className="panel-title">Active Challenges Catalog</div>
                      <div className="table-container">
                        <table className="table-custom">
                          <thead>
                            <tr>
                              <th>Challenge</th>
                              <th>XP</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {challenges.map(ch => {
                              const isParticipating = challengeParticipations.some(
                                cp => cp.challengeId === ch.id && cp.employeeId === activeUser.id
                              );
                              return (
                                <tr key={ch.id}>
                                  <td>
                                    <b>{ch.title}</b>
                                    <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "4px" }}>{ch.description}</div>
                                    <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>Deadline: {ch.deadline} | Difficulty: {ch.difficulty} | {ch.status}</div>
                                  </td>
                                  <td style={{ color: "var(--color-environmental)", fontWeight: "bold" }}>+{ch.xp} XP</td>
                                  <td>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                      {ch.status === "Active" ? (
                                        isParticipating ? (
                                          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Active run</span>
                                        ) : (
                                          <button onClick={() => handleJoinChallenge(ch.id)} className="btn btn-sm btn-primary" style={{ padding: "2px 6px", fontSize: "10px" }}>
                                            Join
                                          </button>
                                        )
                                      ) : activeUser.role === "Admin" ? (
                                        ch.status === "Draft" ? (
                                          <button onClick={() => transitionChallenge(ch.id, "Active")} className="btn btn-sm btn-secondary" style={{ padding: "2px 6px", fontSize: "10px" }}>
                                            Activate
                                          </button>
                                        ) : (
                                          <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Closed</span>
                                        )
                                      ) : (
                                        <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Unavailable</span>
                                      )}
                                      <button
                                        onClick={() => deleteChallenge(ch.id)}
                                        className="btn btn-sm btn-danger"
                                        style={{ padding: "2px 6px", fontSize: "10px" }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="details-panel">
                      <div className="panel-title">Draft New Arena Challenge</div>
                      <form onSubmit={handleAddChallenge} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div className="form-group">
                          <label>Challenge Title</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Thermostat Reduction Sprint"
                            value={newChallenge.title}
                            onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Goal Description</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Set heating target lower by 2 degrees for 10 days"
                            value={newChallenge.description}
                            onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                          />
                        </div>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>XP Reward</label>
                            <input
                              type="number"
                              className="form-input"
                              value={newChallenge.xp}
                              onChange={(e) => setNewChallenge({ ...newChallenge, xp: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Difficulty Tier</label>
                            <select
                              className="form-input"
                              value={newChallenge.difficulty}
                              onChange={(e) => setNewChallenge({ ...newChallenge, difficulty: e.target.value })}
                            >
                              <option value="Easy">Easy</option>
                              <option value="Medium">Medium</option>
                              <option value="Hard">Hard</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Linked ESG Category</label>
                            <select
                              className="form-input"
                              value={newChallenge.category}
                              onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value })}
                            >
                              <option value="Carbon Reduction">Carbon Reduction</option>
                              <option value="Waste Management">Waste Management</option>
                              <option value="Eco-Education">Eco-Education</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>End Date</label>
                            <input
                              type="date"
                              className="form-input"
                              value={newChallenge.deadline}
                              onChange={(e) => setNewChallenge({ ...newChallenge, deadline: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <input
                              type="checkbox"
                              checked={newChallenge.evidenceRequired}
                              onChange={(e) => setNewChallenge({ ...newChallenge, evidenceRequired: e.target.checked })}
                            />
                            <label style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0 }}>Require log proof/link submission</label>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "4px" }}>
                          Draft Challenge
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {gamificationSubTab === "participation" && (
                <div className="details-panel animate-fade-in" style={{ marginTop: "0px" }}>
                  <div className="panel-title">Challenge Completion Verification Dashboard</div>
                  <div className="table-container">
                    <table className="table-custom">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Challenge Title</th>
                          <th>Current Progress</th>
                          <th>Evidence Attached</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {challengeParticipations.map(cp => {
                          const employee = employees.find(e => e.id === cp.employeeId);
                          const challenge = challenges.find(c => c.id === cp.challengeId);
                          return (
                            <tr key={cp.id}>
                              <td><b>{employee ? employee.name : "Employee"}</b></td>
                              <td>{challenge ? challenge.title : "N/A"}</td>
                              <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <div style={{ width: "80px", height: "6px", backgroundColor: "var(--border-color)", borderRadius: "3px" }}>
                                    <div style={{ height: "100%", width: `${cp.progress}%`, backgroundColor: cp.progress === 100 ? "var(--color-success)" : "var(--color-social)", borderRadius: "3px" }}></div>
                                  </div>
                                  <span>{cp.progress}%</span>
                                </div>
                              </td>
                              <td>
                                <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontStyle: "italic" }}>
                                  "{cp.proofText || "No logs submitted"}"
                                </span>
                              </td>
                              <td>
                                {cp.approvalStatus === "Under Review" ? (
                                  <button
                                    onClick={() => approveChallengeParticipation(cp.id)}
                                    className="btn btn-sm btn-success"
                                  >
                                    Approve & Verify
                                  </button>
                                ) : (
                                  <span className={`badge-pill ${cp.approvalStatus === "Approved" ? "badge-pill-completed" : cp.approvalStatus === "Active" ? "badge-pill-medium" : cp.approvalStatus === "Under Review" ? "badge-pill-medium" : "badge-pill-archived"}`}>
                                    {cp.approvalStatus}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {gamificationSubTab === "badges" && (
                <div className="details-panel animate-fade-in" style={{ marginTop: "0px" }}>
                  <div className="panel-title">Available Badges & Unlock Rules</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px", marginBottom: "16px" }}>
                    Track structural corporate badges and auto-unlock requirements.
                  </div>
                  <div className="equal-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                    {badges.map(b => (
                      <div key={b.id} style={{ display: "flex", gap: "16px", padding: "16px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "rgba(255,255,255,0.01)" }}>
                        <span style={{ fontSize: "32px" }}>{b.icon}</span>
                        <div>
                          <div style={{ fontWeight: "700", fontSize: "14px" }}>{b.name}</div>
                          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{b.description}</div>
                          <div style={{ fontSize: "10px", color: "var(--color-environmental)", fontWeight: "bold", marginTop: "8px" }}>
                            Rule: {b.id === "bd1" ? "Accumulate 300+ XP" : b.id === "bd2" ? "Verify 2+ completed challenges" : "Acknowledge all policies"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gamificationSubTab === "rewards" && (
                <div className="equal-grid animate-fade-in" style={{ marginTop: "0px" }}>
                  <div className="details-panel">
                    <div className="panel-header">
                      <div className="panel-title">Sustainability Rewards Exchange Store</div>
                      <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                        Spend your points on environmental incentives. Your Balance: <b style={{ color: "var(--color-warning)" }}>{activeUser.points} points</b>
                      </div>
                    </div>

                    <div className="rewards-grid" style={{ marginTop: "16px" }}>
                      {rewards.map(rew => (
                        <div key={rew.id} className="reward-item" style={{ padding: "10px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                              <div className="reward-name" style={{ fontSize: "14px" }}>{rew.name}</div>
                              <div className="reward-desc" style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{rew.description}</div>
                            </div>
                            {activeUser.role === "Admin" && (
                              <button
                                onClick={() => deleteReward(rew.id)}
                                className="btn btn-sm btn-danger"
                                style={{ height: "fit-content", padding: "2px 6px", fontSize: "10px" }}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <div className="reward-footer" style={{ marginTop: "10px" }}>
                            <div>
                              <div className="reward-points" style={{ fontSize: "12px" }}>{rew.pointsRequired} pts</div>
                              <div className={`reward-stock ${rew.stock === 0 ? "out" : ""}`} style={{ fontSize: "10px" }}>
                                {rew.stock === 0 ? "Out of Stock" : `${rew.stock} units left`}
                              </div>
                            </div>
                            <button
                              onClick={() => handleRedeemReward(rew.id)}
                              className={`btn btn-sm btn-primary ${rew.stock === 0 || activeUser.points < rew.pointsRequired ? "btn-disabled" : ""}`}
                              disabled={rew.stock === 0 || activeUser.points < rew.pointsRequired}
                            >
                              Redeem
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="details-panel">
                    <div className="panel-title">Add Reward Item</div>
                    <form onSubmit={handleAddReward} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div className="form-group">
                        <label>Reward Option Name</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Organic Cotton T-Shirt"
                          value={newReward.name}
                          onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description Details</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Sourced from certified growers, with low dye impacts"
                          value={newReward.description}
                          onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Points Required</label>
                          <input
                            type="number"
                            className="form-input"
                            value={newReward.pointsRequired}
                            onChange={(e) => setNewReward({ ...newReward, pointsRequired: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Initial Stock count</label>
                          <input
                            type="number"
                            className="form-input"
                            value={newReward.stock}
                            onChange={(e) => setNewReward({ ...newReward, stock: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: "4px" }}>
                        Publish Reward Option
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {gamificationSubTab === "leaderboard" && (
                <div className="details-panel animate-fade-in" style={{ marginTop: "0px" }}>
                  <div className="panel-title">Gamification Leaderboard</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px", marginBottom: "16px" }}>
                    Ranks employees by accumulated environmental activity XP.
                  </div>
                  <div className="leaderboard-list">
                    {employees
                      .sort((a, b) => b.xp - a.xp)
                      .map((emp, index) => (
                        <div key={emp.id} className="leaderboard-row">
                          <div className="leaderboard-info">
                            <span className={`leaderboard-rank leaderboard-rank-${index + 1}`}>{index + 1}</span>
                            <span className="profile-avatar">{emp.avatar}</span>
                            <div>
                              <div className="leaderboard-name">{emp.name}</div>
                              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{emp.role}</div>
                            </div>
                          </div>
                          <div className="leaderboard-badges">
                            {emp.badges.map(bId => {
                              const bObj = badges.find(b => b.id === bId);
                              return (
                                <span key={bId} className="leaderboard-badge-item" title={bObj ? `${bObj.name}: ${bObj.description}` : "Badge"} style={{ fontSize: "10px", background: "var(--border-color)", padding: "2px 6px", borderRadius: "4px" }}>
                                  {bObj ? bObj.icon : "Badge"}
                                </span>
                              );
                            })}
                          </div>
                          <span className="leaderboard-xp">{emp.xp} XP</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: REPORTS */}
          {activeTab === "reports" && (
            <div className="animate-fade-in">
              <div className="sub-tab-bar">
                <button
                  className={`sub-tab-btn ${reportsSubTab === "summary" ? "active-reports" : ""}`}
                  onClick={() => setReportsSubTab("summary")}
                >
                  Summary
                </button>
                <button
                  className={`sub-tab-btn ${reportsSubTab === "environmental" ? "active-reports" : ""}`}
                  onClick={() => setReportsSubTab("environmental")}
                >
                  Environmental Report
                </button>
                <button
                  className={`sub-tab-btn ${reportsSubTab === "social" ? "active-reports" : ""}`}
                  onClick={() => setReportsSubTab("social")}
                >
                  Social Report
                </button>
                <button
                  className={`sub-tab-btn ${reportsSubTab === "governance" ? "active-reports" : ""}`}
                  onClick={() => setReportsSubTab("governance")}
                >
                  Governance Report
                </button>
                <button
                  className={`sub-tab-btn ${reportsSubTab === "custom" || reportsSubTab === "builder" ? "active-reports" : ""}`}
                  onClick={() => setReportsSubTab("custom")}
                >
                  Custom Builder
                </button>
              </div>

              {reportsSubTab === "summary" && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div className="equal-grid">
                    <div className="details-panel" style={{ textAlign: "center" }}>
                      <div className="panel-title">Overall Corporate ESG Rating</div>
                      <div style={{ margin: "24px 0", position: "relative", display: "inline-block" }}>
                        <div style={{ fontSize: "64px", fontWeight: "800", color: "var(--color-primary)" }}>{totalESGScore}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>Weighted ESG Index</div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-around", gap: "10px", marginTop: "16px" }}>
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Environmental ({weights.environmental}%)</div>
                          <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--color-environmental)" }}>{envScore}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Social ({weights.social}%)</div>
                          <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--color-social)" }}>{socScore}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Governance ({weights.governance}%)</div>
                          <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--color-governance)" }}>{govScore}</div>
                        </div>
                      </div>
                    </div>

                    <div className="details-panel">
                      <div className="panel-title">Departmental ESG Contribution Summary</div>
                      <div className="table-container" style={{ marginTop: "16px" }}>
                        <table className="table-custom">
                          <thead>
                            <tr>
                              <th>Department</th>
                              <th>Emissions (kg CO2e)</th>
                              <th>CSR Participation</th>
                            </tr>
                          </thead>
                          <tbody>
                            {departments.map(dept => {
                              const deptEmissions = carbonTransactions
                                .filter(t => t.departmentId === dept.id)
                                .reduce((acc, t) => acc + t.co2e, 0);
                              
                              const deptCSRCount = csrParticipations.filter(p => {
                                const emp = employees.find(e => e.id === p.employeeId);
                                return emp && emp.departmentId === dept.id;
                              }).length;

                              return (
                                <tr key={dept.id}>
                                  <td><b>{dept.name}</b> ({dept.code})</td>
                                  <td style={{ color: deptEmissions > 500 ? "var(--color-warning)" : "var(--text-primary)" }}>
                                    {deptEmissions.toFixed(1)}
                                  </td>
                                  <td>{deptCSRCount} logs</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {reportsSubTab === "environmental" && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div className="equal-grid">
                    <div className="details-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div className="panel-title">Environmental Score Breakdown</div>
                        <div style={{ margin: "20px 0", fontSize: "36px", fontWeight: "800", color: "var(--color-environmental)" }}>
                          {envScore} <span style={{ fontSize: "16px", color: "var(--text-secondary)" }}>/ 100</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                              <span>Scope 1 (Direct Emissions)</span>
                              <span>{carbonTransactions.filter(t => t.scope === "Scope 1").reduce((acc, t) => acc + t.co2e, 0).toFixed(1)} kg CO2e</span>
                            </div>
                            <div style={{ height: "6px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "3px", overflow: "hidden", marginTop: "4px" }}>
                              <div style={{ width: "40%", height: "100%", backgroundColor: "var(--color-environmental)" }}></div>
                            </div>
                          </div>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                              <span>Scope 2 (Indirect Grid Emissions)</span>
                              <span>{carbonTransactions.filter(t => t.scope === "Scope 2").reduce((acc, t) => acc + t.co2e, 0).toFixed(1)} kg CO2e</span>
                            </div>
                            <div style={{ height: "6px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "3px", overflow: "hidden", marginTop: "4px" }}>
                              <div style={{ width: "20%", height: "100%", backgroundColor: "var(--color-environmental)" }}></div>
                            </div>
                          </div>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                              <span>Scope 3 (Supply Chain & Business Travel)</span>
                              <span>{carbonTransactions.filter(t => t.scope === "Scope 3").reduce((acc, t) => acc + t.co2e, 0).toFixed(1)} kg CO2e</span>
                            </div>
                            <div style={{ height: "6px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "3px", overflow: "hidden", marginTop: "4px" }}>
                              <div style={{ width: "70%", height: "100%", backgroundColor: "var(--color-environmental)" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="details-panel">
                      <div className="panel-title">Environmental Reduction Goals</div>
                      <div className="table-container" style={{ marginTop: "16px" }}>
                        <table className="table-custom">
                          <thead>
                            <tr>
                              <th>Goal Title</th>
                              <th>Target</th>
                              <th>Current Progress</th>
                              <th>Deadline</th>
                            </tr>
                          </thead>
                          <tbody>
                            {goals.map(g => (
                              <tr key={g.id}>
                                <td><b>{g.title}</b></td>
                                <td>{g.target} {g.unit}</td>
                                <td>
                                  <span style={{ color: g.current >= g.target ? "var(--color-environmental)" : "var(--color-warning)" }}>
                                    {g.current} / {g.target}
                                  </span>
                                </td>
                                <td>{g.deadline}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="details-panel">
                    <div className="panel-title">Recent Carbon Transaction Logs</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Description/Source</th>
                            <th>Category</th>
                            <th>Emissions (kg CO2e)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carbonTransactions.slice(-5).reverse().map(t => (
                            <tr key={t.id}>
                              <td>{t.timestamp.substring(0, 10)}</td>
                              <td><b>{t.source}</b></td>
                              <td><span className="badge-pill badge-pill-medium">{t.transactionType}</span></td>
                              <td style={{ color: "var(--color-environmental)", fontWeight: "bold" }}>{t.co2e.toFixed(1)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {reportsSubTab === "social" && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div className="equal-grid">
                    <div className="details-panel">
                      <div className="panel-title">Social Impact Score</div>
                      <div style={{ margin: "20px 0", fontSize: "36px", fontWeight: "800", color: "var(--color-social)" }}>
                        {socScore} <span style={{ fontSize: "16px", color: "var(--text-secondary)" }}>/ 100</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                        Driven by community participation rates, employee engagement in green challenges, and volunteer logs.
                      </div>
                      <div style={{ marginTop: "20px", padding: "12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)" }}>
                        <div>Total CSR Volunteer Hours: <b>48 Hours</b></div>
                        <div style={{ marginTop: "8px" }}>Approved CSR Logs: <b>{csrParticipations.filter(p => p.approvalStatus === "Approved").length}</b></div>
                      </div>
                    </div>

                    <div className="details-panel">
                      <div className="panel-title">Employee Diversity Statistics</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "bold" }}>
                            <span>Gender Representation</span>
                            <span>40% Female | 55% Male | 5% Non-binary</span>
                          </div>
                          <div style={{ height: "10px", display: "flex", width: "100%", borderRadius: "5px", overflow: "hidden", marginTop: "4px" }}>
                            <div style={{ width: "40%", backgroundColor: "var(--color-social)" }}></div>
                            <div style={{ width: "55%", backgroundColor: "var(--color-governance)" }}></div>
                            <div style={{ width: "5%", backgroundColor: "var(--color-warning)" }}></div>
                          </div>
                        </div>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "bold" }}>
                            <span>Age Tiers</span>
                            <span>&lt;30 (30%) | 30-50 (55%) | &gt;50 (15%)</span>
                          </div>
                          <div style={{ height: "10px", display: "flex", width: "100%", borderRadius: "5px", overflow: "hidden", marginTop: "4px" }}>
                            <div style={{ width: "30%", backgroundColor: "var(--color-environmental)" }}></div>
                            <div style={{ width: "55%", backgroundColor: "var(--color-social)" }}></div>
                            <div style={{ width: "15%", backgroundColor: "var(--text-muted)" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="details-panel">
                    <div className="panel-title">CSR Active Community Log Registry</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Date Logged</th>
                            <th>Employee</th>
                            <th>CSR Activity Name</th>
                            <th>Points Earned</th>
                            <th>Verification Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {csrParticipations.map(p => {
                            const emp = employees.find(e => e.id === p.employeeId);
                            const act = csrActivities.find(a => a.id === p.activityId);
                            return (
                              <tr key={p.id}>
                                <td>{p.completionDate}</td>
                                <td><b>{emp ? emp.name : "Employee"}</b></td>
                                <td>{act ? act.name : "CSR Volunteer Event"}</td>
                                <td>{p.pointsEarned} pts</td>
                                <td>
                                  <span className={`badge-pill ${p.approvalStatus === "Approved" ? "badge-pill-completed" : "badge-pill-draft"}`}>
                                    {p.approvalStatus}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {reportsSubTab === "governance" && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div className="equal-grid">
                    <div className="details-panel">
                      <div className="panel-title">Governance Compliance Rating</div>
                      <div style={{ margin: "20px 0", fontSize: "36px", fontWeight: "800", color: "var(--color-governance)" }}>
                        {govScore} <span style={{ fontSize: "16px", color: "var(--text-secondary)" }}>/ 100</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                          <span>Corporate Policies Signed</span>
                          <span><b>{policyAcknowledgements.length} signatures</b></span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                          <span>Active Registered Audits</span>
                          <span><b>{audits.length} records</b></span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                          <span>Unresolved Compliance Issues</span>
                          <span style={{ color: complianceIssues.filter(ci => ci.status === "Open").length > 0 ? "var(--color-danger)" : "var(--text-secondary)", fontWeight: "bold" }}>
                            {complianceIssues.filter(ci => ci.status === "Open").length} open violations
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="details-panel">
                      <div className="panel-title">Corporate ESG Audit History</div>
                      <div className="table-container" style={{ marginTop: "16px" }}>
                        <table className="table-custom">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Audit Scope</th>
                              <th>Auditor</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {audits.map(a => (
                              <tr key={a.id}>
                                <td>{a.date}</td>
                                <td><b>{a.title}</b></td>
                                <td>{a.auditor}</td>
                                <td>
                                  <span className={`badge-pill ${a.status === "Completed" ? "badge-pill-completed" : "badge-pill-critical"}`}>
                                    {a.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="details-panel">
                    <div className="panel-title">Active Violations & Remediation Registry</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Violation/Issue Description</th>
                            <th>Assignee/Owner</th>
                            <th>Remediation Due Date</th>
                            <th>Severity</th>
                            <th>Resolution State</th>
                          </tr>
                        </thead>
                        <tbody>
                          {complianceIssues.map(ci => (
                            <tr key={ci.id}>
                              <td><b>{ci.description}</b></td>
                              <td>{ci.owner}</td>
                              <td>{ci.dueDate}</td>
                              <td>
                                <span className={`badge-pill ${ci.severity === "Critical" ? "badge-pill-critical" : ci.severity === "High" ? "badge-pill-high" : "badge-pill-medium"}`}>
                                  {ci.severity}
                                </span>
                              </td>
                              <td>
                                <span className={`badge-pill ${ci.status === "Resolved" ? "badge-pill-completed" : "badge-pill-draft"}`}>
                                  {ci.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {(reportsSubTab === "custom" || reportsSubTab === "builder") && (
                <div className="report-builder-layout animate-fade-in">
                  {/* Filters sidebar */}
                  <div className="filter-sidebar">
                    <div style={{ fontWeight: "700", fontSize: "14px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                      Configure Custom Filters
                    </div>

                    <div className="form-group">
                      <label>Department Scope</label>
                      <select
                        className="form-input"
                        value={reportFilters.departmentId}
                        onChange={(e) => setReportFilters({ ...reportFilters, departmentId: e.target.value })}
                      >
                        <option value="all">All Departments</option>
                        {departments.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>ESG Dimension</label>
                      <select
                        className="form-input"
                        value={reportFilters.module}
                        onChange={(e) => setReportFilters({ ...reportFilters, module: e.target.value })}
                      >
                        <option value="all">All Dimension Modules</option>
                        <option value="E">Environmental (Carbon Audits)</option>
                        <option value="S">Social (CSR involvements)</option>
                        <option value="G">Governance (Compliance Flags)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Employee Stakeholder</label>
                      <select
                        className="form-input"
                        value={reportFilters.employeeId}
                        onChange={(e) => setReportFilters({ ...reportFilters, employeeId: e.target.value })}
                      >
                        <option value="all">All Personnel</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={reportFilters.startDate}
                        onChange={(e) => setReportFilters({ ...reportFilters, startDate: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={reportFilters.endDate}
                        onChange={(e) => setReportFilters({ ...reportFilters, endDate: e.target.value })}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                      <button onClick={exportToCSV} className="btn btn-primary" style={{ justifyContent: "center" }}>
                        Download CSV Report
                      </button>
                      <button onClick={openPrintPreview} className="btn btn-secondary" style={{ justifyContent: "center" }}>
                        Open Print/PDF Layout
                      </button>
                    </div>
                  </div>

                  {/* Report layout preview */}
                  <div className="details-panel report-preview-panel">
                    <div className="report-header-preview">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>EcoSphere ESG Audit Report Draft</span>
                        <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>SYSTEM GENERATED</span>
                      </div>
                      <div className="report-header-meta">
                        <div>Date Range: <b>{reportFilters.startDate} to {reportFilters.endDate}</b></div>
                        <div>Scope: <b>{reportFilters.module === "all" ? "All ESG Aspects" : reportFilters.module === "E" ? "Environmental" : reportFilters.module === "S" ? "Social" : "Governance"}</b></div>
                        <div>Dept: <b>{reportFilters.departmentId === "all" ? "Organization-wide" : departments.find(d => d.id === reportFilters.departmentId)?.name}</b></div>
                      </div>
                    </div>

                    <div className="table-container" style={{ flexGrow: 1 }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>ESG Domain</th>
                            <th>Department</th>
                            <th>Description details</th>
                            <th>Rating/Metric</th>
                            <th>State</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReportRows.length === 0 ? (
                            <tr>
                              <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                                No audit records match the active filter parameters.
                              </td>
                            </tr>
                          ) : (
                            filteredReportRows.map((row, i) => (
                              <tr key={i}>
                                <td>{row.date}</td>
                                <td>{row.module}</td>
                                <td>{row.dept}</td>
                                <td>{row.desc}</td>
                                <td><b>{row.metric}</b></td>
                                <td>
                                  <span className={`badge-pill ${row.status === "Open" || row.status === "Under Review" ? "badge-pill-draft" : "badge-pill-active"}`}>
                                    {row.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SETTINGS & ADMINISTRATION */}
          {activeTab === "settings" && (
            <div className="animate-fade-in">
              <div className="sub-tab-bar">
                <button
                  className={`sub-tab-btn ${settingsSubTab === "departments" ? "active-settings" : ""}`}
                  onClick={() => setSettingsSubTab("departments")}
                >
                  Departments
                </button>
                <button
                  className={`sub-tab-btn ${settingsSubTab === "categories" ? "active-settings" : ""}`}
                  onClick={() => setSettingsSubTab("categories")}
                >
                  ESG Categories
                </button>
                <button
                  className={`sub-tab-btn ${settingsSubTab === "rules" || settingsSubTab === "configuration" ? "active-settings" : ""}`}
                  onClick={() => setSettingsSubTab("configuration")}
                >
                  ESG Configuration
                </button>
                <button
                  className={`sub-tab-btn ${settingsSubTab === "staff" ? "active-settings" : ""}`}
                  onClick={() => setSettingsSubTab("staff")}
                >
                  Staff Management
                </button>
                <button
                  className={`sub-tab-btn ${settingsSubTab === "notifications" ? "active-settings" : ""}`}
                  onClick={() => setSettingsSubTab("notifications")}
                >
                  Notification Settings
                </button>
              </div>

              {settingsSubTab === "departments" && (
                <div className="equal-grid animate-fade-in" style={{ marginTop: "0px" }}>
                  {/* Department Management Tree Creator */}
                  <div className="details-panel">
                    {activeUser.role === "Admin" ? (
                      <>
                        <div className="panel-title">Add Department Node</div>
                        <form onSubmit={handleAddDept} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                          <div className="form-grid">
                            <div className="form-group">
                              <label>Department Name</label>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Legal Compliance"
                                value={newDept.name}
                                onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Identifier Code</label>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. LGL"
                                value={newDept.code}
                                onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
                                required
                              />
                            </div>
                          </div>

                          <div className="form-grid">
                            <div className="form-group">
                              <label>Department Manager/Head</label>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Sandra Legal"
                                value={newDept.head}
                                onChange={(e) => setNewDept({ ...newDept, head: e.target.value })}
                              />
                            </div>
                            <div className="form-group">
                              <label>Employee Head Count</label>
                              <input
                                type="number"
                                min="1"
                                className="form-input"
                                value={newDept.employeeCount}
                                onChange={(e) => setNewDept({ ...newDept, employeeCount: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Parent Department (For Structural Hierarchy)</label>
                            <select
                              className="form-input"
                              value={newDept.parentId}
                              onChange={(e) => setNewDept({ ...newDept, parentId: e.target.value })}
                            >
                              <option value="">None (Top-Level Parent)</option>
                              {departments.map(d => (
                                <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                              ))}
                            </select>
                          </div>

                          <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
                            Register Department
                          </button>
                        </form>
                      </>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px", textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <h4 style={{ margin: 0, color: "var(--text-primary)" }}>View-Only Authorization Clearance</h4>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", maxWidth: "280px", lineHeight: "1.5" }}>
                          Administrative access privileges are required to create new department nodes.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Departments List / Hierarchy */}
                  <div className="details-panel">
                    <div className="panel-title">Department Hierarchy registry</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Code / Name</th>
                            <th>Head</th>
                            <th>Parent Dept</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {departments.map(d => {
                            const parentDept = departments.find(p => p.id === d.parentId);
                            return (
                              <tr key={d.id}>
                                <td>
                                  <b>{d.code}</b>
                                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{d.name}</div>
                                  <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{d.employeeCount} staff</div>
                                </td>
                                <td>{d.head}</td>
                                <td>{parentDept ? parentDept.name : <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>None</span>}</td>
                                <td>
                                  {activeUser.role === "Admin" ? (
                                    <button
                                      onClick={() => deleteDepartment(d.id)}
                                      className="btn btn-sm btn-danger"
                                      style={{ padding: "2px 6px", fontSize: "10px" }}
                                    >
                                      Delete
                                    </button>
                                  ) : (
                                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Locked</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

               {settingsSubTab === "categories" && (
                <div className="equal-grid animate-fade-in" style={{ marginTop: "0px" }}>
                  <div className="details-panel">
                    {activeUser.role === "Admin" ? (
                      <>
                        <div className="panel-title">Add ESG Category</div>
                        <form onSubmit={handleAddCategory} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                          <div className="form-group">
                            <label>Category Name</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="e.g. Energy Efficiency"
                              value={newCategory.name}
                              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>ESG Dimension</label>
                            <select
                              className="form-input"
                              value={newCategory.type}
                              onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
                            >
                              <option value="Environmental">Environmental</option>
                              <option value="Social">Social</option>
                              <option value="Governance">Governance</option>
                            </select>
                          </div>
                          <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
                            Create Category
                          </button>
                        </form>
                      </>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px", textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <h4 style={{ margin: 0, color: "var(--text-primary)" }}>View-Only Authorization Clearance</h4>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", maxWidth: "280px", lineHeight: "1.5" }}>
                          Administrative access privileges are required to create new ESG categories.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Settings Category Management list */}
                  <div className="details-panel">
                    <div className="panel-title">Activity & Challenge ESG Categories</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Category Name</th>
                            <th>Dimension Module</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map(c => (
                            <tr key={c.id}>
                              <td><b>{c.name}</b></td>
                              <td>{c.type}</td>
                              <td>
                                {activeUser.role === "Admin" ? (
                                  <button
                                    onClick={() => deleteCategory(c.id)}
                                    className="btn btn-sm btn-danger"
                                    style={{ padding: "2px 6px", fontSize: "10px" }}
                                  >
                                    Delete
                                  </button>
                                ) : (
                                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Locked</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {(settingsSubTab === "rules" || settingsSubTab === "configuration") && (
                <div className="details-panel animate-fade-in" style={{ marginTop: "0px" }}>
                  <div className="panel-title">Policy Compliance Rules & Toggles</div>
                  <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px" }}>
                    
                    <div className="toggle-switch-container">
                      <div className="toggle-label">
                        <span className="toggle-title">Automated Carbon Accounting Sourcing</span>
                        <span className="toggle-desc">Instantly log Carbon Transactions from simulated purchase, fleet, or manufacturing runs.</span>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={autoCarbon}
                          onChange={(e) => setAutoCarbon(e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="toggle-switch-container">
                      <div className="toggle-label">
                        <span className="toggle-title">Evidence-Only CSR Verification</span>
                        <span className="toggle-desc">Restrict CSR approvals; employees cannot submit CSR activities without attached file log references.</span>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={evidenceRequired}
                          onChange={(e) => setEvidenceRequired(e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="toggle-switch-container">
                      <div className="toggle-label">
                        <span className="toggle-title">Badge Auto-Award Systems</span>
                        <span className="toggle-desc">Automatically award unlocked badges to employees instantly upon satisfying rules.</span>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={autoAwardBadges}
                          onChange={(e) => setAutoAwardBadges(e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                  </div>
                </div>
              )}

              {settingsSubTab === "staff" && (
                <div className="equal-grid animate-fade-in" style={{ marginTop: "0px" }}>
                  {/* Left Column: Staff Directory */}
                  <div className="details-panel">
                    <div className="panel-title">Staff Member Directory Registry</div>
                    <div className="table-container" style={{ marginTop: "16px" }}>
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Employee Details</th>
                            <th>Role & Department</th>
                            <th>Stats (XP / Pts)</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map(emp => {
                            const dept = departments.find(d => d.id === emp.departmentId);
                            return (
                              <tr key={emp.id}>
                                <td>
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <div style={{
                                      width: "36px",
                                      height: "36px",
                                      borderRadius: "50%",
                                      backgroundColor: "var(--border-color)",
                                      color: "var(--color-accent)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "12px",
                                      fontWeight: "800",
                                      border: "1px solid var(--border-color)"
                                    }}>
                                      {emp.avatar}
                                    </div>
                                    <div>
                                      <b style={{ color: "var(--text-primary)" }}>{emp.name}</b>
                                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>ID: {emp.id}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className={`badge-pill ${emp.role === "Admin" ? "badge-pill-critical" : emp.role === "Manager" ? "badge-pill-high" : "badge-pill-medium"}`} style={{ fontSize: "10px" }}>
                                    {emp.role}
                                  </span>
                                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
                                    {dept ? dept.name : "Unassigned"}
                                  </div>
                                </td>
                                <td>
                                  <div style={{ fontSize: "12px" }}><b>{emp.xp}</b> XP</div>
                                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}><b>{emp.points}</b> pts</div>
                                </td>
                                <td>
                                  {activeUser.role === "Admin" ? (
                                    <div style={{ display: "flex", gap: "8px" }}>
                                      <button
                                        onClick={() => handleStartEditEmployee(emp)}
                                        className="btn btn-sm"
                                        style={{ padding: "4px 8px", fontSize: "11px", backgroundColor: "var(--border-color)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleRemoveEmployee(emp.id, emp.name)}
                                        className="btn btn-sm btn-danger"
                                        style={{ padding: "4px 8px", fontSize: "11px" }}
                                        disabled={emp.id === activeUser.id}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  ) : (
                                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Locked</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right Column: Add / Edit Form */}
                  <div className="details-panel">
                    {activeUser.role === "Admin" ? (
                      editingEmployeeId ? (
                        <div>
                          <div className="panel-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Modify Staff Member Node</span>
                            <button
                              onClick={() => setEditingEmployeeId(null)}
                              className="btn btn-sm btn-secondary"
                              style={{ padding: "2px 8px", fontSize: "10.5px" }}
                            >
                              Cancel
                            </button>
                          </div>
                          <form onSubmit={handleSaveEditEmployee} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                            <div className="form-group">
                              <label>Full Name</label>
                              <input
                                type="text"
                                className="form-input"
                                value={editEmployeeData.name}
                                onChange={(e) => setEditEmployeeData({ ...editEmployeeData, name: e.target.value })}
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label>Platform Permission Role</label>
                              <select
                                className="form-input"
                                value={editEmployeeData.role}
                                onChange={(e) => setEditEmployeeData({ ...editEmployeeData, role: e.target.value })}
                              >
                                <option value="Employee">Employee (Standard View & Logs Submission)</option>
                                <option value="Manager">Manager (Reports Sourcing & CSR Approvals)</option>
                                <option value="Admin">Admin (Full System Master Settings Override)</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label>Primary Department Assignment</label>
                              <select
                                className="form-input"
                                value={editEmployeeData.departmentId}
                                onChange={(e) => setEditEmployeeData({ ...editEmployeeData, departmentId: e.target.value })}
                              >
                                {departments.map(d => (
                                  <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                                ))}
                              </select>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
                              Save Profile Modifications
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div>
                          <div className="panel-title">Add Staff Member Node</div>
                          <form onSubmit={handleAddEmployee} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div className="form-group">
                              <label>Full Name</label>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. John Sourcing"
                                value={newEmployee.name}
                                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label>Platform Permission Role</label>
                              <select
                                className="form-input"
                                value={newEmployee.role}
                                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                              >
                                <option value="Employee">Employee (Standard View & Logs Submission)</option>
                                <option value="Manager">Manager (Reports Sourcing & CSR Approvals)</option>
                                <option value="Admin">Admin (Full System Master Settings Override)</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label>Primary Department Assignment</label>
                              <select
                                className="form-input"
                                value={newEmployee.departmentId}
                                onChange={(e) => setNewEmployee({ ...newEmployee, departmentId: e.target.value })}
                              >
                                {departments.map(d => (
                                  <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                                ))}
                              </select>
                            </div>

                            <div className="form-grid">
                              <div className="form-group">
                                <label>Initial XP Balance</label>
                                <input
                                  type="number"
                                  min="0"
                                  className="form-input"
                                  value={newEmployee.xp}
                                  onChange={(e) => setNewEmployee({ ...newEmployee, xp: parseInt(e.target.value) || 0 })}
                                />
                              </div>
                              <div className="form-group">
                                <label>Initial Points Balance</label>
                                <input
                                  type="number"
                                  min="0"
                                  className="form-input"
                                  value={newEmployee.points}
                                  onChange={(e) => setNewEmployee({ ...newEmployee, points: parseInt(e.target.value) || 0 })}
                                />
                              </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
                              Register Employee Profile
                            </button>
                          </form>
                        </div>
                      )
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "40px", textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <h4 style={{ margin: 0, color: "var(--text-primary)" }}>View-Only Authorization Clearance</h4>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", maxWidth: "280px", lineHeight: "1.5" }}>
                          You have manager read clearance. Administrative access privileges are required to create, update, or delete profiles.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {settingsSubTab === "notifications" && (
                <div className="details-panel animate-fade-in" style={{ marginTop: "0px" }}>
                  <div className="panel-title">Notification Settings & Alerts</div>
                  <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px" }}>
                    <div className="toggle-switch-container">
                      <div className="toggle-label">
                        <span className="toggle-title">Slack Webhook Integrations</span>
                        <span className="toggle-desc">Dispatch critical compliance warning alerts to your active team workspace channels.</span>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={slackIntegration}
                          onChange={(e) => setSlackIntegration(e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="form-group">
                      <label style={{ fontSize: "12px", fontWeight: "700" }}>System Email Digest Frequency</label>
                      <select
                        className="form-input"
                        style={{ marginTop: "6px" }}
                        value={emailDigest}
                        onChange={(e) => setEmailDigest(e.target.value)}
                      >
                        <option value="daily">Daily Bulletins Summary</option>
                        <option value="weekly">Weekly Consolidated Audits</option>
                        <option value="monthly">Monthly Consolidated Reports</option>
                        <option value="never">Mute All Email Digests</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label style={{ fontSize: "12px", fontWeight: "700" }}>
                        Carbon Sourcing Threshold Trigger Warning: <b>{carbonAlertThreshold} kg CO2e</b>
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        className="form-input"
                        style={{ padding: 0, height: "8px", background: "var(--border-color)", outline: "none", cursor: "pointer", marginTop: "8px" }}
                        value={carbonAlertThreshold}
                        onChange={(e) => setCarbonAlertThreshold(parseInt(e.target.value))}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--text-muted)", marginTop: "4px" }}>
                        <span>100 kg CO2e</span>
                        <span>1000 kg CO2e</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* 4. PDF / Excel Print Overlay Modal */}
      {showPrintModal && printReportData && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
          padding: "40px",
          overflowY: "auto",
          color: "#000",
          backgroundColor: "#fff",
          fontFamily: "Arial, sans-serif"
        }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #10b981", paddingBottom: "20px", marginBottom: "20px" }}>
              <div>
                <h1 style={{ margin: 0, fontSize: "28px", color: "#111" }}>EcoSphere ESG Audit Report</h1>
                <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "14px" }}>Generated at: {printReportData.timestamp}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h3 style={{ margin: 0, color: "#10b981" }}>EcoSphere Portal</h3>
                <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "12px" }}>Compliance & Reporting</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", margin: "20px 0", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "6px" }}>
              <div>Date Range: <b>{printReportData.filters.startDate} to {printReportData.filters.endDate}</b></div>
              <div>ESG Domain: <b>{printReportData.filters.module === "all" ? "Comprehensive" : printReportData.filters.module === "E" ? "Environmental" : printReportData.filters.module === "S" ? "Social" : "Governance"}</b></div>
              <div>Department: <b>{printReportData.filters.departmentId === "all" ? "Corporate Wide" : departments.find(d => d.id === printReportData.filters.departmentId)?.name}</b></div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0", fontSize: "13px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Date</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>ESG Domain</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Department</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Description details</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Metric</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>State</th>
                </tr>
              </thead>
              <tbody>
                {printReportData.rows.map((row, i) => (
                  <tr key={i}>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{row.date}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{row.module}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{row.dept}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{row.desc}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px", fontWeight: "bold" }}>{row.metric}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "20px", fontSize: "11px", color: "#888", textAlign: "center" }}>
              This document is a certified copy of compliance data extracted from EcoSphere ESG Ledger system.
            </div>

            <div style={{ marginTop: "30px", display: "flex", gap: "10px", justifyContent: "flex-end" }} className="no-print">
              <button onClick={executePrint} style={{ padding: "10px 20px", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                Print / Save PDF
              </button>
              <button onClick={() => setShowPrintModal(false)} style={{ padding: "10px 20px", backgroundColor: "#666", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal.isOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000
        }} className="animate-fade-in">
          <div className="details-panel" style={{
            maxWidth: "420px",
            width: "90%",
            padding: "28px",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "var(--bg-card)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
          }}>
            <h3 style={{ margin: 0, fontSize: "18px", color: "var(--text-primary)", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              {confirmModal.title}
            </h3>
            <p style={{ marginTop: "14px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              {confirmModal.message}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "28px" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                style={{ padding: "8px 16px", fontSize: "13px", fontWeight: "600" }}
              >
                No, Cancel
              </button>
              <button
                className="btn"
                onClick={() => {
                  if (confirmModal.onConfirm) confirmModal.onConfirm();
                  setConfirmModal({ ...confirmModal, isOpen: false });
                }}
                style={{ padding: "8px 16px", fontSize: "13px", fontWeight: "700", backgroundColor: "var(--color-danger)", borderColor: "var(--color-danger)", color: "#fff" }}
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
