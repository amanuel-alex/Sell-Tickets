// /**
//  * Script to create the first admin user
//  * Run with: node scripts/create-admin.js
//  */

// const bcrypt = require("bcryptjs");
// const fs = require("fs");
// const path = require("path");

// const DB_PATH = path.join(process.cwd(), "data", "db.json");

// async function createAdmin() {
//   // Read existing database
//   let db = { users: [] };
//   if (fs.existsSync(DB_PATH)) {
//     const data = fs.readFileSync(DB_PATH, "utf-8");
//     db = JSON.parse(data);
//   }

//   // Check if admin already exists
//   const existingAdmin = db.users.find((u) => u.role === "admin");
//   if (existingAdmin) {
//     console.log("❌ Admin user already exists:");
//     console.log(`   Email: ${existingAdmin.email}`);
//     console.log(`   Name: ${existingAdmin.name}`);
//     return;
//   }

//   // Default admin credentials (change these!)
//   const adminData = {
//     email: "admin@etticket.com",
//     password: "admin123", // CHANGE THIS PASSWORD!
//     name: "Admin User",
//   };

//   // Hash password
//   const hashedPassword = await bcrypt.hash(adminData.password, 10);

//   // Create admin user
//   const admin = {
//     id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//     email: adminData.email,
//     password: hashedPassword,
//     role: "admin",
//     name: adminData.name,
//     status: "approved",
//     emailVerified: true,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };

//   db.users.push(admin);

//   // Ensure data directory exists
//   const dataDir = path.dirname(DB_PATH);
//   if (!fs.existsSync(dataDir)) {
//     fs.mkdirSync(dataDir, { recursive: true });
//   }

//   // Write to database
//   fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

//   console.log("✅ Admin user created successfully!");
//   console.log("\n📧 Login Credentials:");
//   console.log(`   Email: ${adminData.email}`);
//   console.log(`   Password: ${adminData.password}`);
//   console.log("\n⚠️  IMPORTANT: Change the password after first login!");
// }

// createAdmin().catch(console.error);

