import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { db } from "./db";

export interface Event {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  venue: string;
  venueAddress?: string;
  status: "draft" | "active" | "ended" | "cancelled";
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  organizerId: string;
  ticketType: string;
  price: number;
  quantity: number;
  sold: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  eventId: string;
  organizerId: string;
  customerEmail: string;
  customerName: string;
  ticketId: string;
  quantity: number;
  amount: number;
  status: "pending" | "completed" | "refunded" | "failed";
  paymentMethod: string;
  createdAt: string;
}

interface ExtendedDatabase {
  events: Event[];
  tickets: Ticket[];
  transactions: Transaction[];
}

const DB_EXTENDED_PATH = join(process.cwd(), "data", "db-extended.json");

function initExtendedDB(): void {
  if (!existsSync(DB_EXTENDED_PATH)) {
    const dir = join(process.cwd(), "data");
    if (!existsSync(dir)) {
      require("fs").mkdirSync(dir, { recursive: true });
    }
    const initialDB: ExtendedDatabase = {
      events: [],
      tickets: [],
      transactions: [],
    };
    writeFileSync(DB_EXTENDED_PATH, JSON.stringify(initialDB, null, 2));
  }
}

function readExtendedDB(): ExtendedDatabase {
  initExtendedDB();
  try {
    const data = readFileSync(DB_EXTENDED_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { events: [], tickets: [], transactions: [] };
  }
}

function writeExtendedDB(data: ExtendedDatabase): void {
  initExtendedDB();
  writeFileSync(DB_EXTENDED_PATH, JSON.stringify(data, null, 2));
}

export const dbExtended = {
  // Events
  getEvents: (organizerId?: string): Event[] => {
    const db = readExtendedDB();
    if (organizerId) {
      return db.events.filter((e) => e.organizerId === organizerId);
    }
    return db.events;
  },

  getEventById: (id: string): Event | null => {
    const db = readExtendedDB();
    return db.events.find((e) => e.id === id) || null;
  },

  createEvent: (event: Omit<Event, "id" | "createdAt" | "updatedAt">): Event => {
    const db = readExtendedDB();
    const newEvent: Event = {
      ...event,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.events.push(newEvent);
    writeExtendedDB(db);
    return newEvent;
  },

  updateEvent: (id: string, updates: Partial<Event>): Event | null => {
    const db = readExtendedDB();
    const eventIndex = db.events.findIndex((e) => e.id === id);
    if (eventIndex === -1) return null;

    db.events[eventIndex] = {
      ...db.events[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    writeExtendedDB(db);
    return db.events[eventIndex];
  },

  deleteEvent: (id: string): boolean => {
    const db = readExtendedDB();
    const eventIndex = db.events.findIndex((e) => e.id === id);
    if (eventIndex === -1) return false;

    db.events.splice(eventIndex, 1);
    writeExtendedDB(db);
    return true;
  },

  // Tickets
  getTickets: (organizerId?: string, eventId?: string): Ticket[] => {
    const db = readExtendedDB();
    let tickets = db.tickets;
    if (organizerId) {
      tickets = tickets.filter((t) => t.organizerId === organizerId);
    }
    if (eventId) {
      tickets = tickets.filter((t) => t.eventId === eventId);
    }
    return tickets;
  },

  createTicket: (ticket: Omit<Ticket, "id" | "createdAt">): Ticket => {
    const db = readExtendedDB();
    const newTicket: Ticket = {
      ...ticket,
      id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    db.tickets.push(newTicket);
    writeExtendedDB(db);
    return newTicket;
  },

  getTicketById: (id: string): Ticket | null => {
    const db = readExtendedDB();
    return db.tickets.find((t) => t.id === id) || null;
  },

  updateTicket: (id: string, updates: Partial<Ticket>): Ticket | null => {
    const db = readExtendedDB();
    const ticketIndex = db.tickets.findIndex((t) => t.id === id);
    if (ticketIndex === -1) return null;

    db.tickets[ticketIndex] = {
      ...db.tickets[ticketIndex],
      ...updates,
    };
    writeExtendedDB(db);
    return db.tickets[ticketIndex];
  },

  deleteTicket: (id: string): boolean => {
    const db = readExtendedDB();
    const ticketIndex = db.tickets.findIndex((t) => t.id === id);
    if (ticketIndex === -1) return false;

    db.tickets.splice(ticketIndex, 1);
    writeExtendedDB(db);
    return true;
  },

  // Transactions
  getTransactions: (organizerId?: string, eventId?: string): Transaction[] => {
    const db = readExtendedDB();
    let transactions = db.transactions;
    if (organizerId) {
      transactions = transactions.filter((t) => t.organizerId === organizerId);
    }
    if (eventId) {
      transactions = transactions.filter((t) => t.eventId === eventId);
    }
    return transactions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt">
  ): Transaction => {
    const db = readExtendedDB();
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    db.transactions.push(newTransaction);
    
    // Update ticket sold count
    const ticket = db.tickets.find((t) => t.id === transaction.ticketId);
    if (ticket) {
      ticket.sold += transaction.quantity;
    }
    
    writeExtendedDB(db);
    return newTransaction;
  },

  getTransactionById: (id: string): Transaction | null => {
    const db = readExtendedDB();
    return db.transactions.find((t) => t.id === id) || null;
  },

  updateTransaction: (id: string, updates: Partial<Transaction>): Transaction | null => {
    const db = readExtendedDB();
    const transactionIndex = db.transactions.findIndex((t) => t.id === id);
    if (transactionIndex === -1) return null;

    db.transactions[transactionIndex] = {
      ...db.transactions[transactionIndex],
      ...updates,
    };
    writeExtendedDB(db);
    return db.transactions[transactionIndex];
  },

  // Analytics helpers
  getTodayStats: (organizerId: string) => {
    const transactions = dbExtended.getTransactions(organizerId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayTransactions = transactions.filter(
      (t) => new Date(t.createdAt) >= today && t.status === "completed"
    );
    
    const totalSales = todayTransactions.reduce((sum, t) => sum + t.amount, 0);
    const ticketsSold = todayTransactions.reduce((sum, t) => sum + t.quantity, 0);
    const events = dbExtended.getEvents(organizerId).filter(
      (e) => e.status === "active"
    ).length;
    
    return {
      totalSales,
      ticketsSold,
      events,
      transactions: todayTransactions.length,
    };
  },

  getSalesLast7Days: (organizerId: string) => {
    const transactions = dbExtended.getTransactions(organizerId);
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayTransactions = transactions.filter(
        (t) => {
          const tDate = new Date(t.createdAt);
          tDate.setHours(0, 0, 0, 0);
          return tDate.getTime() === date.getTime() && t.status === "completed";
        }
      );
      
      const sales = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
      days.push({
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.toISOString(),
        sales,
        count: dayTransactions.length,
      });
    }
    
    const maxSales = Math.max(...days.map((d) => d.sales), 1);
    
    return days.map((day) => ({
      ...day,
      percent: maxSales > 0 ? Math.round((day.sales / maxSales) * 100) : 0,
    }));
  },

  // Platform-wide analytics (for admin)
  getPlatformStats: () => {
    const users = db.getAllUsers();
    const events = dbExtended.getEvents();
    const transactions = dbExtended.getTransactions();
    const tickets = dbExtended.getTickets();
    
    const completedTransactions = transactions.filter(
      (t) => t.status === "completed"
    );
    
    const gmv = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
    const platformRevenue = gmv * 0.1; // 10% platform fee
    const activeOrganizers = users.filter(
      (u) => u.role === "organizer" && u.status === "approved"
    ).length;
    const totalTicketsSold = tickets.reduce((sum, t) => sum + t.sold, 0);
    const activeUsers = users.length;
    
    return {
      gmv,
      platformRevenue,
      activeOrganizers,
      totalTicketsSold,
      activeUsers,
      totalEvents: events.length,
      totalTransactions: completedTransactions.length,
    };
  },
};

