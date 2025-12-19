import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  email: string;
  phone?: string;
  password: string; // hashed
  role: "organizer" | "admin";
  name?: string;
  businessName?: string;
  status: "pending" | "approved" | "suspended";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Database {
  users: User[];
}

const DB_PATH = join(process.cwd(), "data", "db.json");

// Initialize database file if it doesn't exist
function initDB(): void {
  if (!existsSync(DB_PATH)) {
    const dir = join(process.cwd(), "data");
    if (!existsSync(dir)) {
      require("fs").mkdirSync(dir, { recursive: true });
    }
    const initialDB: Database = { users: [] };
    writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2));
  }
}

// Read database
function readDB(): Database {
  initDB();
  try {
    const data = readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { users: [] };
  }
}

// Write to database
function writeDB(data: Database): void {
  initDB();
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// User operations
export const db = {
  // Find user by email or phone
  findUser: (identifier: string): User | null => {
    const db = readDB();
    return (
      db.users.find(
        (u) => u.email === identifier || u.phone === identifier
      ) || null
    );
  },

  // Find user by ID
  findUserById: (id: string): User | null => {
    const db = readDB();
    return db.users.find((u) => u.id === id) || null;
  },

  // Create user
  createUser: async (
    data: Omit<User, "id" | "password" | "createdAt" | "updatedAt"> & {
      password: string; // plain text password
    }
  ): Promise<User> => {
    const dbData = readDB();

    // Check if user already exists
    const existingByEmail = dbData.users.find((u) => u.email === data.email);
    if (existingByEmail) {
      throw new Error("User with this email already exists");
    }
    if (data.phone) {
      const existingByPhone = dbData.users.find((u) => u.phone === data.phone);
      if (existingByPhone) {
        throw new Error("User with this phone already exists");
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: data.role,
      name: data.name,
      businessName: data.businessName,
      status: data.status,
      emailVerified: data.emailVerified,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dbData.users.push(user);
    writeDB(dbData);
    return user;
  },

  // Update user
  updateUser: (id: string, updates: Partial<User>): User | null => {
    const db = readDB();
    const userIndex = db.users.findIndex((u) => u.id === id);
    if (userIndex === -1) return null;

    db.users[userIndex] = {
      ...db.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    writeDB(db);
    return db.users[userIndex];
  },

  // Verify password
  verifyPassword: async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  // Get all users (for admin)
  getAllUsers: (): User[] => {
    const db = readDB();
    return db.users;
  },
};

