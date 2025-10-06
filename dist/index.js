var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  aboutUs: () => aboutUs,
  articleContents: () => articleContents,
  articles: () => articles,
  contactUs: () => contactUs,
  courses: () => courses,
  documentCategories: () => documentCategories,
  documentTagRelations: () => documentTagRelations,
  documentTags: () => documentTags,
  documents: () => documents,
  educationalVideos: () => educationalVideos,
  insertAboutUsSchema: () => insertAboutUsSchema,
  insertArticleContentSchema: () => insertArticleContentSchema,
  insertArticleSchema: () => insertArticleSchema,
  insertContactUsSchema: () => insertContactUsSchema,
  insertCourseSchema: () => insertCourseSchema,
  insertDocumentCategorySchema: () => insertDocumentCategorySchema,
  insertDocumentSchema: () => insertDocumentSchema,
  insertDocumentTagRelationSchema: () => insertDocumentTagRelationSchema,
  insertDocumentTagSchema: () => insertDocumentTagSchema,
  insertEducationalVideoSchema: () => insertEducationalVideoSchema,
  insertMagazineSchema: () => insertMagazineSchema,
  insertMediaContentSchema: () => insertMediaContentSchema,
  insertMediaLibrarySchema: () => insertMediaLibrarySchema,
  insertModuleSchema: () => insertModuleSchema,
  insertPostSchema: () => insertPostSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertQuickAccessItemSchema: () => insertQuickAccessItemSchema,
  insertSlideSchema: () => insertSlideSchema,
  insertSubsidiaryCompanySchema: () => insertSubsidiaryCompanySchema,
  insertUserCourseAccessSchema: () => insertUserCourseAccessSchema,
  insertUserSchema: () => insertUserSchema,
  insertWebinarSchema: () => insertWebinarSchema,
  insertWebinarSectionSchema: () => insertWebinarSectionSchema,
  insertWorkshopContentSchema: () => insertWorkshopContentSchema,
  insertWorkshopRegistrationSchema: () => insertWorkshopRegistrationSchema,
  insertWorkshopSchema: () => insertWorkshopSchema,
  insertWorkshopSectionSchema: () => insertWorkshopSectionSchema,
  magazines: () => magazines,
  mediaContent: () => mediaContent,
  mediaLibrary: () => mediaLibrary,
  modules: () => modules,
  posts: () => posts,
  projects: () => projects,
  quickAccessItems: () => quickAccessItems,
  sessions: () => sessions,
  slides: () => slides,
  subsidiaryCompanies: () => subsidiaryCompanies,
  userCourseAccess: () => userCourseAccess,
  users: () => users,
  webinarSections: () => webinarSections,
  webinars: () => webinars,
  workshopContents: () => workshopContents,
  workshopRegistrations: () => workshopRegistrations,
  workshopSections: () => workshopSections,
  workshops: () => workshops
});
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
var sessions = sqliteTable("sessions", {
  sid: text("sid").primaryKey(),
  sess: text("sess").notNull(),
  expire: integer("expire").notNull()
});
var users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  progress: integer("progress").default(0),
  membershipType: text("membership_type").default("Basic"),
  role: text("role").default("user"),
  subscriptionStatus: text("subscription_status").default("free"),
  subscriptionExpiry: integer("subscription_expiry")
});
var courses = sqliteTable("courses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  progress: integer("progress").default(0),
  totalModules: integer("total_modules").default(0),
  completedModules: integer("completed_modules").default(0),
  category: text("category"),
  level: text("level"),
  isNew: integer("is_new", { mode: "boolean" }).default(false),
  isPopular: integer("is_popular", { mode: "boolean" }).default(false),
  accessLevel: text("access_level").default("free"),
  // free, premium, vip
  price: integer("price").default(0),
  // price in tomans
  isLocked: integer("is_locked", { mode: "boolean" }).default(false),
  // Content Protection Settings
  allowDownload: integer("allow_download", { mode: "boolean" }).default(true),
  allowScreenshot: integer("allow_screenshot", { mode: "boolean" }).default(true),
  allowCopy: integer("allow_copy", { mode: "boolean" }).default(true),
  allowPrint: integer("allow_print", { mode: "boolean" }).default(true),
  watermarkText: text("watermark_text"),
  protectionLevel: text("protection_level").default("none")
  // none, basic, strict
});
var modules = sqliteTable("modules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  duration: text("duration"),
  type: text("type").notNull(),
  // video, pdf, etc.
  contentUrl: text("content_url"),
  isLocked: integer("is_locked", { mode: "boolean" }).default(false),
  order: integer("order").notNull()
});
var projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  type: text("type").default("project"),
  // "project" or "magazine"
  dueDate: text("due_date"),
  pages: integer("pages"),
  contentUrl: text("content_url"),
  isLocked: integer("is_locked", { mode: "boolean" }).default(false),
  difficulty: text("difficulty"),
  estimatedHours: integer("estimated_hours"),
  // Content Protection Settings
  allowDownload: integer("allow_download", { mode: "boolean" }).default(true),
  allowScreenshot: integer("allow_screenshot", { mode: "boolean" }).default(true),
  allowCopy: integer("allow_copy", { mode: "boolean" }).default(true),
  allowPrint: integer("allow_print", { mode: "boolean" }).default(true),
  watermarkText: text("watermark_text"),
  protectionLevel: text("protection_level").default("none")
  // none, basic, strict
});
var documentCategories = sqliteTable("document_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  parentId: integer("parent_id"),
  order: integer("order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var documentTags = sqliteTable("document_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  color: text("color").default("#6B7280"),
  createdAt: integer("created_at").default(Date.now())
});
var documents = sqliteTable("documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content"),
  excerpt: text("excerpt"),
  author: text("author"),
  featuredImage: text("featured_image"),
  fileName: text("file_name"),
  fileUrl: text("file_url"),
  fileType: text("file_type"),
  fileSize: integer("file_size"),
  totalPages: integer("total_pages"),
  category: text("category").default("general"),
  // general, agriculture, technology, education, research, news
  tags: text("tags"),
  // Array of tags
  status: text("status").default("published"),
  // published, draft, private, pending
  allowDownload: integer("allow_download", { mode: "boolean" }).default(true),
  allowComments: integer("allow_comments", { mode: "boolean" }).default(true),
  downloadCount: integer("download_count").default(0),
  viewCount: integer("view_count").default(0),
  isSticky: integer("is_sticky", { mode: "boolean" }).default(false),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  publishedAt: integer("published_at"),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
  // SEO Fields
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  customFields: text("custom_fields"),
  // Enhanced Content Protection Settings
  allowScreenshot: integer("allow_screenshot", { mode: "boolean" }).default(true),
  allowCopy: integer("allow_copy", { mode: "boolean" }).default(true),
  allowPrint: integer("allow_print", { mode: "boolean" }).default(true),
  watermarkText: text("watermark_text"),
  protectionLevel: text("protection_level").default("none")
  // none, basic, strict
});
var documentTagRelations = sqliteTable("document_tag_relations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  documentId: integer("document_id").notNull(),
  tagId: integer("tag_id").notNull(),
  createdAt: integer("created_at").default(Date.now())
});
var mediaContent = sqliteTable("media_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  contentUrl: text("content_url"),
  duration: text("duration"),
  instructorName: text("instructor_name"),
  instructorTitle: text("instructor_title"),
  instructorAvatar: text("instructor_avatar")
});
var magazines = sqliteTable("magazines", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  coverImageUrl: text("cover_image_url"),
  issueNumber: integer("issue_number"),
  publishDate: text("publish_date"),
  season: text("season"),
  year: integer("year"),
  totalPages: integer("total_pages").default(0),
  pdfUrl: text("pdf_url"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
  // Content Protection Settings
  allowDownload: integer("allow_download", { mode: "boolean" }).default(true),
  allowScreenshot: integer("allow_screenshot", { mode: "boolean" }).default(true),
  allowCopy: integer("allow_copy", { mode: "boolean" }).default(true),
  allowPrint: integer("allow_print", { mode: "boolean" }).default(true),
  watermarkText: text("watermark_text"),
  protectionLevel: text("protection_level").default("none")
  // none, basic, strict
});
var articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  author: text("author"),
  summary: text("summary"),
  publishDate: text("publish_date"),
  content: text("content"),
  featuredImageUrl: text("featured_image_url"),
  thumbnailUrl: text("thumbnail_url"),
  readTime: integer("read_time").default(0),
  magazineId: integer("magazine_id").notNull(),
  pdfUrl: text("pdf_url"),
  order: integer("order").default(0),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var articleContents = sqliteTable("article_contents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  articleId: integer("article_id").notNull(),
  contentType: text("content_type").notNull(),
  // text, image, video
  content: text("content").notNull(),
  caption: text("caption"),
  order: integer("order").notNull(),
  style: text("style"),
  // برای ذخیره استایل‌های مربوط به محتوا
  createdAt: integer("created_at").default(Date.now())
});
var posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  // HTML content
  excerpt: text("excerpt"),
  // خلاصه نوشته
  authorId: integer("author_id").notNull(),
  authorName: text("author_name").notNull(),
  status: text("status").notNull().default("draft"),
  // draft, published, scheduled
  visibility: text("visibility").default("public"),
  // public, private, password
  featuredImage: text("featured_image"),
  categories: text("categories"),
  // دسته‌بندی‌ها
  tags: text("tags"),
  // برچسب‌ها
  publishedAt: integer("published_at"),
  scheduledAt: integer("scheduled_at"),
  // برای نوشته‌های زمان‌بندی شده
  viewCount: integer("view_count").default(0),
  likesCount: integer("likes_count").default(0),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  allowComments: integer("allow_comments", { mode: "boolean" }).default(true),
  isPinned: integer("is_pinned", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var mediaLibrary = sqliteTable("media_library", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(),
  // اندازه فایل به بایت
  width: integer("width"),
  // برای تصاویر
  height: integer("height"),
  // برای تصاویر
  url: text("url").notNull(),
  altText: text("alt_text"),
  // متن جایگزین برای تصاویر
  caption: text("caption"),
  description: text("description"),
  uploadedBy: integer("uploaded_by").notNull(),
  uploadedAt: integer("uploaded_at").default(Date.now())
});
var workshops = sqliteTable("workshops", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  posterUrl: text("poster_url"),
  eventDate: text("event_date"),
  location: text("location"),
  instructor: text("instructor"),
  duration: text("duration"),
  capacity: integer("capacity"),
  level: text("level"),
  // مبتدی، متوسط، پیشرفته
  category: text("category"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  registrationOpen: integer("registration_open", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
  // Content Protection Settings
  allowDownload: integer("allow_download", { mode: "boolean" }).default(true),
  allowScreenshot: integer("allow_screenshot", { mode: "boolean" }).default(true),
  allowCopy: integer("allow_copy", { mode: "boolean" }).default(true),
  allowPrint: integer("allow_print", { mode: "boolean" }).default(true),
  watermarkText: text("watermark_text"),
  protectionLevel: text("protection_level").default("none")
  // none, basic, strict
});
var workshopSections = sqliteTable("workshop_sections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workshopId: integer("workshop_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  videoUrl: text("video_url"),
  presentationUrl: text("presentation_url"),
  documentUrl: text("document_url"),
  order: integer("order").notNull(),
  isLocked: integer("is_locked", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var workshopContents = sqliteTable("workshop_contents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workshopId: integer("workshop_id").notNull(),
  contentType: text("content_type").notNull(),
  // text, image, video, presentation
  title: text("title"),
  content: text("content").notNull(),
  order: integer("order").notNull(),
  createdAt: integer("created_at").default(Date.now())
});
var webinars = sqliteTable("webinars", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  posterUrl: text("poster_url"),
  eventDate: text("event_date"),
  instructor: text("instructor"),
  duration: text("duration"),
  level: text("level"),
  // مبتدی، متوسط، پیشرفته
  category: text("category"),
  price: integer("price").default(0),
  maxParticipants: integer("max_participants").default(0),
  imageUrl: text("image_url"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var webinarSections = sqliteTable("webinar_sections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  webinarId: integer("webinar_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  videoUrl: text("video_url"),
  presentationUrl: text("presentation_url"),
  documentUrl: text("document_url"),
  order: integer("order").notNull(),
  isLocked: integer("is_locked", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var workshopRegistrations = sqliteTable("workshop_registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workshopId: integer("workshop_id").notNull(),
  userEmail: text("user_email").notNull(),
  userName: text("user_name").notNull(),
  userPhone: text("user_phone"),
  status: text("status").notNull().default("pending"),
  // pending, confirmed, cancelled
  registrationDate: integer("registration_date").default(Date.now()),
  notes: text("notes")
});
var slides = sqliteTable("slides", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  secondButtonText: text("second_button_text"),
  secondButtonUrl: text("second_button_url"),
  showButtons: integer("show_buttons", { mode: "boolean" }).default(true),
  showIcon: integer("show_icon", { mode: "boolean" }).default(true),
  iconName: text("icon_name").default("Star"),
  backgroundColor: text("background_color").default("hsl(270, 60%, 95%)"),
  iconColor: text("icon_color").default("hsl(270, 70%, 60%)"),
  linkUrl: text("link_url"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  order: integer("order").default(0),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var quickAccessItems = sqliteTable("quick_access_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  iconUrl: text("icon_url"),
  // URL to custom icon/image
  iconSvg: text("icon_svg"),
  // SVG code for icon
  iconType: text("icon_type").notNull().default("svg"),
  // "svg", "image", or "lucide"
  iconName: text("icon_name"),
  // Lucide icon name if using lucide
  backgroundColor: text("background_color").default("hsl(270, 60%, 95%)"),
  iconColor: text("icon_color").default("hsl(270, 70%, 60%)"),
  linkUrl: text("link_url"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  order: integer("order").default(0),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var educationalVideos = sqliteTable("educational_videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  duration: text("duration"),
  // e.g., "10 دقیقه"
  category: text("category"),
  // e.g., "برنامه‌نویسی", "کشاورزی"
  level: text("level").default("beginner"),
  // beginner, intermediate, advanced
  tags: text("tags"),
  // Array of tags
  instructor: text("instructor"),
  // Instructor name
  viewsCount: integer("views_count").default(0),
  likesCount: integer("likes_count").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  isPublic: integer("is_public", { mode: "boolean" }).default(true),
  requiresSubscription: integer("requires_subscription", { mode: "boolean" }).default(false),
  orderPosition: integer("order_position").default(0),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var aboutUs = sqliteTable("about_us", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  mainContent: text("main_content").notNull(),
  mission: text("mission"),
  vision: text("vision"),
  values: text("values"),
  mainImageUrl: text("main_image_url"),
  foundingYear: text("founding_year"),
  companySize: text("company_size"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var subsidiaryCompanies = sqliteTable("subsidiary_companies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  website: text("website"),
  industry: text("industry"),
  establishedYear: text("established_year"),
  location: text("location"),
  order: integer("order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var contactUs = sqliteTable("contact_us", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  workingHours: text("working_hours"),
  mapUrl: text("map_url"),
  // Google Maps embed URL
  mapLatitude: text("map_latitude"),
  mapLongitude: text("map_longitude"),
  socialLinks: text("social_links"),
  // {instagram: "", telegram: "", linkedin: ""}
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now())
});
var insertUserSchema = createInsertSchema(users).omit({ id: true });
var insertCourseSchema = createInsertSchema(courses).omit({ id: true });
var insertModuleSchema = createInsertSchema(modules).omit({ id: true });
var insertProjectSchema = createInsertSchema(projects).omit({ id: true });
var insertDocumentCategorySchema = createInsertSchema(documentCategories).omit({ id: true, createdAt: true, updatedAt: true });
var insertDocumentTagSchema = createInsertSchema(documentTags).omit({ id: true, createdAt: true });
var insertDocumentSchema = createInsertSchema(documents).omit({ id: true, createdAt: true, updatedAt: true });
var insertDocumentTagRelationSchema = createInsertSchema(documentTagRelations).omit({ id: true, createdAt: true });
var insertMediaContentSchema = createInsertSchema(mediaContent).omit({ id: true });
var insertMagazineSchema = createInsertSchema(magazines).omit({ id: true, createdAt: true, updatedAt: true });
var insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true, updatedAt: true });
var insertArticleContentSchema = createInsertSchema(articleContents).omit({ id: true, createdAt: true });
var insertWorkshopSchema = createInsertSchema(workshops).omit({ id: true, createdAt: true, updatedAt: true });
var insertWorkshopSectionSchema = createInsertSchema(workshopSections).omit({ id: true, createdAt: true, updatedAt: true });
var insertWorkshopContentSchema = createInsertSchema(workshopContents).omit({ id: true, createdAt: true });
var insertWebinarSchema = createInsertSchema(webinars).omit({ id: true, createdAt: true, updatedAt: true });
var insertWebinarSectionSchema = createInsertSchema(webinarSections).omit({ id: true, createdAt: true, updatedAt: true });
var insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true, updatedAt: true });
var insertMediaLibrarySchema = createInsertSchema(mediaLibrary).omit({ id: true, uploadedAt: true });
var insertSlideSchema = createInsertSchema(slides).omit({ id: true, createdAt: true, updatedAt: true });
var insertQuickAccessItemSchema = createInsertSchema(quickAccessItems).omit({ id: true, createdAt: true, updatedAt: true });
var insertWorkshopRegistrationSchema = createInsertSchema(workshopRegistrations).omit({ id: true, registrationDate: true });
var insertEducationalVideoSchema = createInsertSchema(educationalVideos).omit({ id: true, createdAt: true, updatedAt: true });
var insertAboutUsSchema = createInsertSchema(aboutUs).omit({ id: true, createdAt: true, updatedAt: true });
var insertSubsidiaryCompanySchema = createInsertSchema(subsidiaryCompanies).omit({ id: true, createdAt: true, updatedAt: true });
var insertContactUsSchema = createInsertSchema(contactUs).omit({ id: true, createdAt: true, updatedAt: true });
var userCourseAccess = sqliteTable("user_course_access", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  accessType: text("access_type").notNull(),
  // purchased, granted, trial
  purchaseDate: integer("purchase_date").default(Date.now()),
  expiryDate: integer("expiry_date"),
  isActive: integer("is_active", { mode: "boolean" }).default(true)
});
var insertUserCourseAccessSchema = createInsertSchema(userCourseAccess).omit({ id: true, purchaseDate: true });

// server/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
var sqlite = new Database("pistac.db");
var db = drizzle(sqlite, { schema: schema_exports });

// server/storage.ts
import { eq, asc, and, sql } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async getUsers() {
    return await db.select().from(users);
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values({
      id: userData.id,
      username: userData.username || `user_${userData.id}`,
      password: "temp_password",
      name: `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || null,
      role: userData.role || "user"
    }).onConflictDoUpdate({
      target: users.id,
      set: {
        name: `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || null,
        role: userData.role || "user"
      }
    }).returning();
    return user;
  }
  // Course methods
  async getCourses() {
    return await db.select().from(courses);
  }
  async getCourse(id) {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }
  async createCourse(insertCourse) {
    const [course] = await db.insert(courses).values(insertCourse).returning();
    return course;
  }
  async updateCourseProgress(id, progress) {
    const [course] = await db.update(courses).set({ progress }).where(eq(courses.id, id)).returning();
    return course;
  }
  // Module methods
  async getModulesByCourseId(courseId) {
    return await db.select().from(modules).where(eq(modules.courseId, courseId));
  }
  async getModule(id) {
    const [module] = await db.select().from(modules).where(eq(modules.id, id));
    return module;
  }
  async createModule(insertModule) {
    const [module] = await db.insert(modules).values(insertModule).returning();
    return module;
  }
  // Project methods
  async getProjects() {
    return await db.select().from(projects);
  }
  async getProject(id) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  async createProject(insertProject) {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
  // Media content methods
  async getMediaContent(id) {
    const [media] = await db.select().from(mediaContent).where(eq(mediaContent.id, id));
    return media;
  }
  async createMediaContent(insertMediaContent) {
    const [media] = await db.insert(mediaContent).values(insertMediaContent).returning();
    return media;
  }
  // Magazine methods
  async getMagazines() {
    return await db.select().from(magazines);
  }
  async getMagazine(id) {
    const [magazine] = await db.select().from(magazines).where(eq(magazines.id, id));
    return magazine;
  }
  async createMagazine(magazine) {
    const [newMagazine] = await db.insert(magazines).values({
      ...magazine,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).returning();
    return newMagazine;
  }
  async updateMagazine(id, magazine) {
    const [updatedMagazine] = await db.update(magazines).set({
      ...magazine,
      updatedAt: Date.now()
    }).where(eq(magazines.id, id)).returning();
    return updatedMagazine;
  }
  async deleteMagazine(id) {
    const result = await db.delete(magazines).where(eq(magazines.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Article methods
  async getArticles() {
    return await db.select().from(articles);
  }
  async getArticlesByMagazineId(magazineId) {
    return await db.select().from(articles).where(eq(articles.magazineId, magazineId));
  }
  async getArticle(id) {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }
  async createArticle(article) {
    const [newArticle] = await db.insert(articles).values({
      ...article,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).returning();
    return newArticle;
  }
  async updateArticle(id, article) {
    const [updatedArticle] = await db.update(articles).set({
      ...article,
      updatedAt: Date.now()
    }).where(eq(articles.id, id)).returning();
    return updatedArticle;
  }
  async deleteArticle(id) {
    const result = await db.delete(articles).where(eq(articles.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Article content methods
  async getArticleContents(articleId) {
    return await db.select().from(articleContents).where(eq(articleContents.articleId, articleId));
  }
  async createArticleContent(content) {
    const [newContent] = await db.insert(articleContents).values({
      ...content,
      createdAt: Date.now()
    }).returning();
    return newContent;
  }
  async updateArticleContent(id, content) {
    const [updatedContent] = await db.update(articleContents).set(content).where(eq(articleContents.id, id)).returning();
    return updatedContent;
  }
  async deleteArticleContent(id) {
    const result = await db.delete(articleContents).where(eq(articleContents.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Workshop methods
  async getWorkshops() {
    return await db.select().from(workshops);
  }
  async getWorkshop(id) {
    const [workshop] = await db.select().from(workshops).where(eq(workshops.id, id));
    return workshop;
  }
  async createWorkshop(workshop) {
    const [newWorkshop] = await db.insert(workshops).values({
      ...workshop,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).returning();
    return newWorkshop;
  }
  async updateWorkshop(id, workshop) {
    const [updatedWorkshop] = await db.update(workshops).set({
      ...workshop,
      updatedAt: Date.now()
    }).where(eq(workshops.id, id)).returning();
    return updatedWorkshop;
  }
  async deleteWorkshop(id) {
    const result = await db.delete(workshops).where(eq(workshops.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Workshop content methods
  async getWorkshopContents(workshopId) {
    return await db.select().from(workshopContents).where(eq(workshopContents.workshopId, workshopId));
  }
  async createWorkshopContent(content) {
    const [newContent] = await db.insert(workshopContents).values({
      ...content,
      createdAt: Date.now()
    }).returning();
    return newContent;
  }
  async updateWorkshopContent(id, content) {
    const [updatedContent] = await db.update(workshopContents).set(content).where(eq(workshopContents.id, id)).returning();
    return updatedContent;
  }
  async deleteWorkshopContent(id) {
    const result = await db.delete(workshopContents).where(eq(workshopContents.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Slide methods
  async getSlides() {
    return await db.select().from(slides).orderBy(asc(slides.order));
  }
  async getActiveSlides() {
    return await db.select().from(slides).where(eq(slides.isActive, true)).orderBy(asc(slides.order));
  }
  async getSlide(id) {
    const [slide] = await db.select().from(slides).where(eq(slides.id, id));
    return slide;
  }
  async createSlide(slide) {
    const [newSlide] = await db.insert(slides).values({
      ...slide,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).returning();
    return newSlide;
  }
  async updateSlide(id, slide) {
    const [updatedSlide] = await db.update(slides).set({
      ...slide,
      updatedAt: Date.now()
    }).where(eq(slides.id, id)).returning();
    return updatedSlide;
  }
  async deleteSlide(id) {
    const result = await db.delete(slides).where(eq(slides.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Quick Access Item methods
  async getQuickAccessItems() {
    return await db.select().from(quickAccessItems).orderBy(asc(quickAccessItems.order));
  }
  async getActiveQuickAccessItems() {
    return await db.select().from(quickAccessItems).where(eq(quickAccessItems.isActive, true)).orderBy(asc(quickAccessItems.order));
  }
  async getQuickAccessItem(id) {
    const [item] = await db.select().from(quickAccessItems).where(eq(quickAccessItems.id, id));
    return item;
  }
  async createQuickAccessItem(item) {
    const [newItem] = await db.insert(quickAccessItems).values({
      ...item,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).returning();
    return newItem;
  }
  async updateQuickAccessItem(id, item) {
    const [updatedItem] = await db.update(quickAccessItems).set({
      ...item,
      updatedAt: Date.now()
    }).where(eq(quickAccessItems.id, id)).returning();
    return updatedItem;
  }
  async deleteQuickAccessItem(id) {
    const result = await db.delete(quickAccessItems).where(eq(quickAccessItems.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Document Category methods
  async getDocumentCategories() {
    return await db.select().from(documentCategories).where(eq(documentCategories.isActive, true)).orderBy(asc(documentCategories.order));
  }
  async getDocumentCategory(id) {
    const [category] = await db.select().from(documentCategories).where(eq(documentCategories.id, id));
    return category;
  }
  async createDocumentCategory(category) {
    const [newCategory] = await db.insert(documentCategories).values({
      ...category,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).returning();
    return newCategory;
  }
  async updateDocumentCategory(id, category) {
    const [updatedCategory] = await db.update(documentCategories).set({
      ...category,
      updatedAt: Date.now()
    }).where(eq(documentCategories.id, id)).returning();
    return updatedCategory;
  }
  async deleteDocumentCategory(id) {
    const result = await db.delete(documentCategories).where(eq(documentCategories.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Document Tag methods
  async getAllDocumentTags() {
    return await db.select().from(documentTags);
  }
  async getDocumentTag(id) {
    const [tag] = await db.select().from(documentTags).where(eq(documentTags.id, id));
    return tag;
  }
  async createDocumentTag(tag) {
    const [newTag] = await db.insert(documentTags).values({
      ...tag,
      createdAt: Date.now()
    }).returning();
    return newTag;
  }
  async updateDocumentTag(id, tag) {
    const [updatedTag] = await db.update(documentTags).set(tag).where(eq(documentTags.id, id)).returning();
    return updatedTag;
  }
  async deleteDocumentTag(id) {
    const result = await db.delete(documentTags).where(eq(documentTags.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  async getDocumentTags() {
    return await db.select().from(documentTags).orderBy(asc(documentTags.name));
  }
  // Document methods
  async getDocuments() {
    return await db.select().from(documents).orderBy(asc(documents.createdAt));
  }
  async getDocumentsByCategory(category) {
    return await db.select().from(documents).where(eq(documents.category, category));
  }
  async getDocumentsByTag(tagId) {
    const results = await db.select({ document: documents }).from(documents).innerJoin(documentTagRelations, eq(documents.id, documentTagRelations.documentId)).where(eq(documentTagRelations.tagId, tagId));
    return results.map((r) => r.document);
  }
  async getFeaturedDocuments() {
    return await db.select().from(documents).where(eq(documents.isFeatured, true));
  }
  async searchDocuments(query) {
    return await db.select().from(documents).where(
      // Simple text search - در production از full-text search استفاده کنید
      eq(documents.title, query)
    );
  }
  async getDocument(id) {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document;
  }
  async getDocumentBySlug(slug) {
    const [document] = await db.select().from(documents).where(eq(documents.slug, slug));
    return document;
  }
  async createDocument(document) {
    const [newDocument] = await db.insert(documents).values({
      ...document,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      publishedAt: Date.now()
    }).returning();
    return newDocument;
  }
  async updateDocument(id, document) {
    const [updatedDocument] = await db.update(documents).set({
      ...document,
      updatedAt: Date.now()
    }).where(eq(documents.id, id)).returning();
    return updatedDocument;
  }
  async deleteDocument(id) {
    const result = await db.delete(documents).where(eq(documents.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  async incrementDownloadCount(id) {
    await db.update(documents).set({
      downloadCount: sql`${documents.downloadCount} + 1`
    }).where(eq(documents.id, id));
  }
  async incrementViewCount(id) {
    await db.update(documents).set({
      viewCount: sql`${documents.viewCount} + 1`
    }).where(eq(documents.id, id));
  }
  // Document Tag Relations
  async addTagToDocument(documentId, tagId) {
    const [relation] = await db.insert(documentTagRelations).values({
      documentId,
      tagId,
      createdAt: Date.now()
    }).returning();
    return relation;
  }
  async removeTagFromDocument(documentId, tagId) {
    const result = await db.delete(documentTagRelations).where(
      eq(documentTagRelations.documentId, documentId) && eq(documentTagRelations.tagId, tagId)
    );
    return (result.rowCount ?? 0) > 0;
  }
  async getDocumentTagsByDocument(documentId) {
    const results = await db.select({ tag: documentTags }).from(documentTags).innerJoin(documentTagRelations, eq(documentTags.id, documentTagRelations.tagId)).where(eq(documentTagRelations.documentId, documentId));
    return results.map((r) => r.tag);
  }
  // User course access methods
  async getUserCourseAccess(userId) {
    return await db.select().from(userCourseAccess).where(eq(userCourseAccess.userId, userId));
  }
  async getCourseAccess(userId, courseId) {
    const [access] = await db.select().from(userCourseAccess).where(
      and(
        eq(userCourseAccess.userId, userId),
        eq(userCourseAccess.courseId, courseId),
        eq(userCourseAccess.isActive, true)
      )
    );
    return access;
  }
  async grantCourseAccess(access) {
    const [newAccess] = await db.insert(userCourseAccess).values(access).returning();
    return newAccess;
  }
  async revokeCourseAccess(userId, courseId) {
    const result = await db.update(userCourseAccess).set({ isActive: false }).where(
      and(
        eq(userCourseAccess.userId, userId),
        eq(userCourseAccess.courseId, courseId)
      )
    );
    return (result.rowCount ?? 0) > 0;
  }
  async canAccessCourse(userId, courseId) {
    const user = await this.getUser(userId);
    const course = await this.getCourse(courseId);
    if (!user || !course) return false;
    if (user.role === "admin") return true;
    if (course.accessLevel === "free") return true;
    if (course.accessLevel === "premium" && (user.subscriptionStatus === "premium" || user.subscriptionStatus === "vip")) {
      return true;
    }
    if (course.accessLevel === "vip" && user.subscriptionStatus === "vip") {
      return true;
    }
    const access = await this.getCourseAccess(userId, courseId);
    return access ? access.isActive ?? false : false;
  }
  async canDownloadContent(userId, courseId) {
    const user = await this.getUser(userId);
    if (!user) return false;
    if (user.role === "admin") return true;
    const hasAccess = await this.canAccessCourse(userId, courseId);
    if (!hasAccess) return false;
    return user.subscriptionStatus === "premium" || user.subscriptionStatus === "vip";
  }
  // Webinar methods
  async getWebinars() {
    return await db.select().from(webinars).orderBy(asc(webinars.createdAt));
  }
  async getWebinar(id) {
    const [webinar] = await db.select().from(webinars).where(eq(webinars.id, id));
    return webinar;
  }
  async createWebinar(webinar) {
    const [newWebinar] = await db.insert(webinars).values(webinar).returning();
    return newWebinar;
  }
  async updateWebinar(id, webinar) {
    const [updatedWebinar] = await db.update(webinars).set({ ...webinar, updatedAt: Date.now() }).where(eq(webinars.id, id)).returning();
    return updatedWebinar;
  }
  async deleteWebinar(id) {
    const result = await db.delete(webinars).where(eq(webinars.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Webinar section methods
  async getWebinarSections(webinarId) {
    return await db.select().from(webinarSections).where(eq(webinarSections.webinarId, webinarId)).orderBy(asc(webinarSections.order));
  }
  async getWebinarSection(id) {
    const [section] = await db.select().from(webinarSections).where(eq(webinarSections.id, id));
    return section;
  }
  async createWebinarSection(section) {
    const [newSection] = await db.insert(webinarSections).values(section).returning();
    return newSection;
  }
  async updateWebinarSection(id, section) {
    const [updatedSection] = await db.update(webinarSections).set({ ...section, updatedAt: Date.now() }).where(eq(webinarSections.id, id)).returning();
    return updatedSection;
  }
  async deleteWebinarSection(id) {
    const result = await db.delete(webinarSections).where(eq(webinarSections.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Protection control methods
  async updateCourseProtection(id, protection) {
    const [updatedCourse] = await db.update(courses).set(protection).where(eq(courses.id, id)).returning();
    return updatedCourse;
  }
  async updateProjectProtection(id, protection) {
    const [updatedProject] = await db.update(projects).set(protection).where(eq(projects.id, id)).returning();
    return updatedProject;
  }
  async updateDocumentProtection(id, protection) {
    const [updatedDocument] = await db.update(documents).set(protection).where(eq(documents.id, id)).returning();
    return updatedDocument;
  }
  async updateMagazineProtection(id, protection) {
    const [updatedMagazine] = await db.update(magazines).set(protection).where(eq(magazines.id, id)).returning();
    return updatedMagazine;
  }
  // Workshop registration methods
  async getWorkshopRegistrations() {
    return await db.select().from(workshopRegistrations).orderBy(asc(workshopRegistrations.registrationDate));
  }
  async getWorkshopRegistrationsByWorkshopId(workshopId) {
    return await db.select().from(workshopRegistrations).where(eq(workshopRegistrations.workshopId, workshopId)).orderBy(asc(workshopRegistrations.registrationDate));
  }
  async createWorkshopRegistration(registration) {
    const [newRegistration] = await db.insert(workshopRegistrations).values({
      ...registration,
      registrationDate: Date.now()
    }).returning();
    return newRegistration;
  }
  async updateWorkshopRegistration(id, registration) {
    const [updatedRegistration] = await db.update(workshopRegistrations).set(registration).where(eq(workshopRegistrations.id, id)).returning();
    return updatedRegistration;
  }
  async deleteWorkshopRegistration(id) {
    const result = await db.delete(workshopRegistrations).where(eq(workshopRegistrations.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Educational Video methods
  async getEducationalVideos() {
    return await db.select().from(educationalVideos).orderBy(asc(educationalVideos.orderPosition));
  }
  async getActiveEducationalVideos() {
    return await db.select().from(educationalVideos).where(eq(educationalVideos.isActive, true)).orderBy(asc(educationalVideos.orderPosition));
  }
  async getEducationalVideo(id) {
    const [video] = await db.select().from(educationalVideos).where(eq(educationalVideos.id, id));
    return video;
  }
  async createEducationalVideo(video) {
    const [newVideo] = await db.insert(educationalVideos).values(video).returning();
    return newVideo;
  }
  async updateEducationalVideo(id, video) {
    const [updatedVideo] = await db.update(educationalVideos).set(video).where(eq(educationalVideos.id, id)).returning();
    return updatedVideo;
  }
  async deleteEducationalVideo(id) {
    const result = await db.delete(educationalVideos).where(eq(educationalVideos.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // About Us methods
  async getAboutUs() {
    return await db.select().from(aboutUs).orderBy(asc(aboutUs.id));
  }
  async getActiveAboutUs() {
    return await db.select().from(aboutUs).where(eq(aboutUs.isActive, true)).orderBy(asc(aboutUs.id));
  }
  async getAboutUsById(id) {
    const [aboutUsData] = await db.select().from(aboutUs).where(eq(aboutUs.id, id));
    return aboutUsData;
  }
  async createAboutUs(aboutUsData) {
    const [newAboutUs] = await db.insert(aboutUs).values(aboutUsData).returning();
    return newAboutUs;
  }
  async updateAboutUs(id, aboutUsData) {
    const [updatedAboutUs] = await db.update(aboutUs).set(aboutUsData).where(eq(aboutUs.id, id)).returning();
    return updatedAboutUs;
  }
  async deleteAboutUs(id) {
    const result = await db.delete(aboutUs).where(eq(aboutUs.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Subsidiary Companies methods
  async getSubsidiaryCompanies() {
    return await db.select().from(subsidiaryCompanies).orderBy(asc(subsidiaryCompanies.order));
  }
  async getActiveSubsidiaryCompanies() {
    return await db.select().from(subsidiaryCompanies).where(eq(subsidiaryCompanies.isActive, true)).orderBy(asc(subsidiaryCompanies.order));
  }
  async getSubsidiaryCompanyById(id) {
    const [company] = await db.select().from(subsidiaryCompanies).where(eq(subsidiaryCompanies.id, id));
    return company;
  }
  async createSubsidiaryCompany(companyData) {
    const [newCompany] = await db.insert(subsidiaryCompanies).values(companyData).returning();
    return newCompany;
  }
  async updateSubsidiaryCompany(id, companyData) {
    const [updatedCompany] = await db.update(subsidiaryCompanies).set(companyData).where(eq(subsidiaryCompanies.id, id)).returning();
    return updatedCompany;
  }
  async deleteSubsidiaryCompany(id) {
    const result = await db.delete(subsidiaryCompanies).where(eq(subsidiaryCompanies.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Contact Us methods
  async getContactUs() {
    return await db.select().from(contactUs).orderBy(asc(contactUs.id));
  }
  async getActiveContactUs() {
    return await db.select().from(contactUs).where(eq(contactUs.isActive, true)).orderBy(asc(contactUs.id));
  }
  async getContactUsById(id) {
    const [contactUsData] = await db.select().from(contactUs).where(eq(contactUs.id, id));
    return contactUsData;
  }
  async createContactUs(contactUsData) {
    const [newContactUs] = await db.insert(contactUs).values(contactUsData).returning();
    return newContactUs;
  }
  async updateContactUs(id, contactUsData) {
    const [updatedContactUs] = await db.update(contactUs).set(contactUsData).where(eq(contactUs.id, id)).returning();
    return updatedContactUs;
  }
  async deleteContactUs(id) {
    const result = await db.delete(contactUs).where(eq(contactUs.id, id));
    return (result.rowCount ?? 0) > 0;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import path from "path";
import fs from "fs";
import multer from "multer";
import session from "express-session";

// server/auth.ts
import bcrypt from "bcryptjs";
import { eq as eq2 } from "drizzle-orm";
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}
async function authenticateUser(username, password) {
  try {
    const [user] = await db.select().from(users).where(eq2(users.username, username)).limit(1);
    if (!user) {
      return null;
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

// server/seed.ts
import { eq as eq3 } from "drizzle-orm";
async function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    const existingAdmin = await db.select().from(users).where(eq3(users.username, "admin")).limit(1);
    if (existingAdmin.length === 0) {
      const hashedPassword = await hashPassword("730895015");
      await db.insert(users).values({
        username: "admin",
        password: hashedPassword,
        name: "\u0645\u062F\u06CC\u0631 \u0633\u06CC\u0633\u062A\u0645",
        email: "admin@pistach.com",
        role: "admin",
        membershipType: "Premium"
      });
      console.log("Admin user created successfully");
      console.log("Username: admin");
      console.log("Password: 730895015");
    } else {
      console.log("Admin user already exists");
    }
    await db.insert(slides).values([
      {
        title: "\u0628\u0647 \u067E\u06CC\u0633\u062A\u0627\u0637 \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F",
        description: "\u067E\u0644\u062A\u0641\u0631\u0645 \u0622\u0645\u0648\u0632\u0634\u06CC \u067E\u06CC\u0634\u0631\u0641\u062A\u0647 \u06A9\u0634\u0627\u0648\u0631\u0632\u06CC",
        imageUrl: "/uploads/demo-slide1.png",
        buttonText: "\u0634\u0631\u0648\u0639 \u06CC\u0627\u062F\u06AF\u06CC\u0631\u06CC",
        buttonUrl: "/courses",
        secondButtonText: "\u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0627",
        secondButtonUrl: "/about",
        isActive: true,
        order: 1,
        iconName: "GraduationCap"
      }
    ]).onConflictDoNothing();
    await db.insert(educationalVideos).values([
      {
        title: "\u0622\u0645\u0648\u0632\u0634 \u06A9\u0627\u0634\u062A \u06AF\u0648\u062C\u0647 \u0641\u0631\u0646\u06AF\u06CC",
        description: "\u06CC\u0627\u062F\u06AF\u06CC\u0631\u06CC \u06A9\u0627\u0645\u0644 \u062A\u06A9\u0646\u06CC\u06A9\u200C\u0647\u0627\u06CC \u06A9\u0627\u0634\u062A \u06AF\u0648\u062C\u0647 \u0641\u0631\u0646\u06AF\u06CC",
        videoUrl: "https://example.com/video1.mp4",
        thumbnailUrl: "/uploads/demo-slide1.png",
        duration: "15 \u062F\u0642\u06CC\u0642\u0647",
        category: "\u06A9\u0634\u0627\u0648\u0631\u0632\u06CC",
        isActive: true
      }
    ]).onConflictDoNothing();
    await db.insert(aboutUs).values([
      {
        title: "\u062F\u0631\u0628\u0627\u0631\u0647 \u067E\u06CC\u0633\u062A\u0627\u0637",
        mainContent: "\u067E\u06CC\u0633\u062A\u0627\u0637 \u06CC\u06A9\u06CC \u0627\u0632 \u067E\u06CC\u0634\u0631\u0648\u062A\u0631\u06CC\u0646 \u067E\u0644\u062A\u0641\u0631\u0645\u200C\u0647\u0627\u06CC \u0622\u0645\u0648\u0632\u0634\u06CC \u06A9\u0634\u0627\u0648\u0631\u0632\u06CC \u062F\u0631 \u0627\u06CC\u0631\u0627\u0646 \u0627\u0633\u062A \u06A9\u0647 \u0628\u0627 \u0647\u062F\u0641 \u0627\u0631\u062A\u0642\u0627\u06CC \u062F\u0627\u0646\u0634 \u06A9\u0634\u0627\u0648\u0631\u0632\u0627\u0646 \u062A\u0623\u0633\u06CC\u0633 \u0634\u062F\u0647 \u0627\u0633\u062A.",
        mission: "\u0645\u0627\u0645\u0648\u0631\u06CC\u062A \u0645\u0627 \u0622\u0645\u0648\u0632\u0634 \u0645\u062F\u0631\u0646 \u06A9\u0634\u0627\u0648\u0631\u0632\u06CC \u0627\u0633\u062A",
        vision: "\u0686\u0634\u0645\u200C\u0627\u0646\u062F\u0627\u0632 \u0645\u0627 \u062A\u0628\u062F\u06CC\u0644 \u0628\u0647 \u0628\u0632\u0631\u06AF\u062A\u0631\u06CC\u0646 \u0645\u0631\u06A9\u0632 \u0622\u0645\u0648\u0632\u0634\u06CC \u06A9\u0634\u0627\u0648\u0631\u0632\u06CC \u0627\u0633\u062A",
        values: "\u0627\u0631\u0632\u0634\u200C\u0647\u0627\u06CC \u0645\u0627 \u0634\u0627\u0645\u0644 \u0646\u0648\u0622\u0648\u0631\u06CC\u060C \u06A9\u06CC\u0641\u06CC\u062A \u0648 \u062F\u0633\u062A\u0631\u0633\u06CC \u0622\u0633\u0627\u0646 \u0627\u0633\u062A",
        foundingYear: "1402",
        companySize: "50-100 \u0646\u0641\u0631",
        isActive: true
      }
    ]).onConflictDoNothing();
    await db.insert(contactUs).values([
      {
        title: "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
        description: "\u0628\u0631\u0627\u06CC \u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u062A\u06CC\u0645 \u067E\u06CC\u0633\u062A\u0627\u0637 \u0627\u0632 \u0631\u0627\u0647\u200C\u0647\u0627\u06CC \u0632\u06CC\u0631 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646\u06CC\u062F",
        address: "\u062A\u0647\u0631\u0627\u0646\u060C \u062E\u06CC\u0627\u0628\u0627\u0646 \u0648\u0644\u06CC\u0639\u0635\u0631\u060C \u067E\u0644\u0627\u06A9 123",
        phone: "021-12345678",
        email: "info@pistac.ir",
        workingHours: "\u0634\u0646\u0628\u0647 \u062A\u0627 \u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647 9 \u0627\u0644\u06CC 17",
        socialLinks: JSON.stringify({
          instagram: "https://instagram.com/pistac",
          telegram: "https://t.me/pistac"
        }),
        isActive: true
      }
    ]).onConflictDoNothing();
    console.log("Database seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0));
}

// server/routes.ts
var uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, extension);
      cb(null, baseName + "-" + uniqueSuffix + extension);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  },
  fileFilter: function(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|svg|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("\u0641\u0642\u0637 \u0641\u0627\u06CC\u0644\u200C\u0647\u0627\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u0648 PDF \u0645\u062C\u0627\u0632 \u0647\u0633\u062A\u0646\u062F"));
    }
  }
});
async function registerRoutes(app2) {
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const allProjects = await storage.getProjects();
      res.json(allProjects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getDocumentCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  await seedDatabase();
  app2.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key-here",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1e3 * 60 * 60 * 24 * 7
      // 7 days
    }
  }));
  app2.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" });
      }
      const user = await authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ error: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u0627 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0634\u062A\u0628\u0627\u0647 \u0627\u0633\u062A" });
      }
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role ?? "user",
        name: user.name ?? "",
        email: user.email ?? ""
      };
      res.json({
        message: "\u0648\u0631\u0648\u062F \u0645\u0648\u0641\u0642\u06CC\u062A\u200C\u0622\u0645\u06CC\u0632",
        user: req.session.user
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "\u062E\u0637\u0627 \u062F\u0631 \u0633\u06CC\u0633\u062A\u0645 \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A" });
    }
  });
  app2.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "\u062E\u0637\u0627 \u062F\u0631 \u062E\u0631\u0648\u062C \u0627\u0632 \u0633\u06CC\u0633\u062A\u0645" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "\u062E\u0631\u0648\u062C \u0645\u0648\u0641\u0642\u06CC\u062A\u200C\u0622\u0645\u06CC\u0632" });
    });
  });
  app2.post("/api/register", async (req, res) => {
    try {
      const { username, password, name, email } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" });
      }
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0642\u0628\u0644\u0627\u064B \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0634\u062F\u0647 \u0627\u0633\u062A" });
      }
      if (email) {
        const existingEmail = await storage.getUserByEmail(email);
        if (existingEmail) {
          return res.status(409).json({ error: "\u0627\u06CC\u0645\u06CC\u0644 \u0642\u0628\u0644\u0627\u064B \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0634\u062F\u0647 \u0627\u0633\u062A" });
        }
      }
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        name: name ?? null,
        email: email ?? null,
        role: "user"
      });
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role ?? "user",
        name: user.name ?? "",
        email: user.email ?? ""
      };
      res.json({
        message: "\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0645\u0648\u0641\u0642\u06CC\u062A\u200C\u0622\u0645\u06CC\u0632",
        user: req.session.user
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ error: "\u062E\u0637\u0627 \u062F\u0631 \u062B\u0628\u062A\u200C\u0646\u0627\u0645" });
    }
  });
  app2.get("/api/auth/user", (req, res) => {
    if (req.session?.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ error: "\u06A9\u0627\u0631\u0628\u0631 \u0648\u0627\u0631\u062F \u0646\u0634\u062F\u0647" });
    }
  });
  app2.post("/api/upload", upload.array("files", 10), async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "\u0647\u06CC\u0686 \u0641\u0627\u06CC\u0644\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0634\u062F\u0647" });
      }
      const files = req.files.map((file) => ({
        id: Date.now() + Math.random(),
        name: file.originalname,
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith("image/") ? "image" : "document",
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
      }));
      return res.status(201).json({
        message: "\u0641\u0627\u06CC\u0644\u200C\u0647\u0627 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u0622\u067E\u0644\u0648\u062F \u0634\u062F\u0646\u062F",
        files
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0622\u067E\u0644\u0648\u062F \u0641\u0627\u06CC\u0644" });
    }
  });
  app2.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));
  app2.get("/api/users", async (req, res) => {
    try {
      const users2 = await storage.getUsers();
      res.json(users2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  app2.get("/api/user/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u06A9\u0627\u0631\u0628\u0631" });
    }
  });
  app2.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" });
    }
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password || user.role !== "admin") {
      return res.status(401).json({ message: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u0627 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0634\u062A\u0628\u0627\u0647 \u0627\u0633\u062A" });
    }
    return res.json({
      message: "\u0648\u0631\u0648\u062F \u0645\u0648\u0641\u0642\u06CC\u062A\u200C\u0622\u0645\u06CC\u0632",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
  });
  app2.get("/api/courses", async (req, res) => {
    const courses2 = await storage.getCourses();
    res.json(courses2);
  });
  app2.get("/api/courses/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    const course = await storage.getCourse(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json(course);
  });
  app2.patch("/api/courses/:id/progress", async (req, res) => {
    const id = parseInt(req.params.id);
    const { progress } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    if (typeof progress !== "number" || progress < 0 || progress > 100) {
      return res.status(400).json({ message: "Invalid progress value" });
    }
    const updatedCourse = await storage.updateCourseProgress(id, progress);
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.json(updatedCourse);
  });
  app2.post("/api/courses", async (req, res) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      return res.status(201).json(course);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u062F\u0648\u0631\u0647" });
    }
  });
  app2.get("/api/modules/course/:courseId", async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    if (isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    const modules2 = await storage.getModulesByCourseId(courseId);
    return res.json(modules2);
  });
  app2.get("/api/modules/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid module ID" });
    }
    const module = await storage.getModule(id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    return res.json(module);
  });
  app2.post("/api/modules", async (req, res) => {
    try {
      const moduleData = insertModuleSchema.parse(req.body);
      const module = await storage.createModule(moduleData);
      return res.status(201).json(module);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0645\u0627\u0698\u0648\u0644" });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    const projects2 = await storage.getProjects();
    res.json(projects2);
  });
  app2.get("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json(project);
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      return res.status(201).json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u067E\u0631\u0648\u0698\u0647" });
    }
  });
  app2.get("/api/documents", async (req, res) => {
    const documents2 = await storage.getDocuments();
    res.json(documents2);
  });
  app2.get("/api/documents/featured", async (req, res) => {
    try {
      const featured = await storage.getFeaturedDocuments();
      res.json(featured);
    } catch (error) {
      console.error("Error fetching featured documents:", error);
      res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u062F\u0631\u06CC\u0627\u0641\u062A \u0645\u0642\u0627\u0644\u0627\u062A \u0645\u0646\u062A\u062E\u0628" });
    }
  });
  app2.get("/api/documents/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }
    const document = await storage.getDocument(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    return res.json(document);
  });
  app2.post("/api/documents", async (req, res) => {
    try {
      const documentData = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(documentData);
      return res.status(201).json(document);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0633\u0646\u062F" });
    }
  });
  app2.put("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid document ID" });
      }
      const documentData = req.body;
      const document = await storage.updateDocument(id, documentData);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.json(document);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0633\u0646\u062F" });
    }
  });
  app2.patch("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid document ID" });
      }
      const documentData = req.body;
      const document = await storage.updateDocument(id, documentData);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.json(document);
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0633\u0646\u062F" });
    }
  });
  app2.delete("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid document ID" });
      }
      const success = await storage.deleteDocument(id);
      if (!success) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u062D\u0630\u0641 \u0633\u0646\u062F" });
    }
  });
  app2.get("/api/media/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid media content ID" });
    }
    const mediaContent2 = await storage.getMediaContent(id);
    if (!mediaContent2) {
      return res.status(404).json({ message: "Media content not found" });
    }
    return res.json(mediaContent2);
  });
  app2.post("/api/media", async (req, res) => {
    try {
      const mediaData = insertMediaContentSchema.parse(req.body);
      const mediaContent2 = await storage.createMediaContent(mediaData);
      return res.status(201).json(mediaContent2);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0645\u062D\u062A\u0648\u0627\u06CC \u0631\u0633\u0627\u0646\u0647\u200C\u0627\u06CC" });
    }
  });
  app2.get("/api/magazines", async (req, res) => {
    const magazines2 = await storage.getMagazines();
    res.json(magazines2);
  });
  app2.get("/api/magazines/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid magazine ID" });
    }
    const magazine = await storage.getMagazine(id);
    if (!magazine) {
      return res.status(404).json({ message: "Magazine not found" });
    }
    return res.json(magazine);
  });
  app2.post("/api/magazines", async (req, res) => {
    try {
      const magazineData = insertMagazineSchema.parse(req.body);
      const magazine = await storage.createMagazine(magazineData);
      return res.status(201).json(magazine);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0645\u062C\u0644\u0647" });
    }
  });
  app2.put("/api/magazines/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid magazine ID" });
    }
    try {
      const magazineData = insertMagazineSchema.partial().parse(req.body);
      const updatedMagazine = await storage.updateMagazine(id, magazineData);
      if (!updatedMagazine) {
        return res.status(404).json({ message: "Magazine not found" });
      }
      return res.json(updatedMagazine);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0645\u062C\u0644\u0647" });
    }
  });
  app2.delete("/api/magazines/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid magazine ID" });
    }
    const deleted = await storage.deleteMagazine(id);
    if (!deleted) {
      return res.status(404).json({ message: "Magazine not found" });
    }
    return res.json({ message: "Magazine deleted successfully" });
  });
  app2.get("/api/articles", async (req, res) => {
    const articles2 = await storage.getArticles();
    res.json(articles2);
  });
  app2.get("/api/articles/magazine/:magazineId", async (req, res) => {
    const magazineId = parseInt(req.params.magazineId);
    if (isNaN(magazineId)) {
      return res.status(400).json({ message: "Invalid magazine ID" });
    }
    const articles2 = await storage.getArticlesByMagazineId(magazineId);
    return res.json(articles2);
  });
  app2.get("/api/articles/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }
    const article = await storage.getArticle(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.json(article);
  });
  app2.post("/api/articles", async (req, res) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      return res.status(201).json(article);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0645\u0642\u0627\u0644\u0647" });
    }
  });
  app2.put("/api/articles/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }
    try {
      const articleData = insertArticleSchema.partial().parse(req.body);
      const updatedArticle = await storage.updateArticle(id, articleData);
      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }
      return res.json(updatedArticle);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0645\u0642\u0627\u0644\u0647" });
    }
  });
  app2.delete("/api/articles/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }
    const deleted = await storage.deleteArticle(id);
    if (!deleted) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.json({ message: "Article deleted successfully" });
  });
  app2.get("/api/workshops", async (req, res) => {
    const workshops2 = await storage.getWorkshops();
    res.json(workshops2);
  });
  app2.get("/api/workshops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid workshop ID" });
    }
    const workshop = await storage.getWorkshop(id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    return res.json(workshop);
  });
  app2.post("/api/workshops", async (req, res) => {
    try {
      const workshopData = insertWorkshopSchema.parse(req.body);
      const workshop = await storage.createWorkshop(workshopData);
      return res.status(201).json(workshop);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u06A9\u0627\u0631\u06AF\u0627\u0647" });
    }
  });
  app2.put("/api/workshops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid workshop ID" });
    }
    try {
      const workshopData = insertWorkshopSchema.partial().parse(req.body);
      const updatedWorkshop = await storage.updateWorkshop(id, workshopData);
      if (!updatedWorkshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      return res.json(updatedWorkshop);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u06A9\u0627\u0631\u06AF\u0627\u0647" });
    }
  });
  app2.delete("/api/workshops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid workshop ID" });
    }
    const deleted = await storage.deleteWorkshop(id);
    if (!deleted) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    return res.json({ message: "Workshop deleted successfully" });
  });
  app2.get("/api/workshops/:id/registrations", async (req, res) => {
    const workshopId = parseInt(req.params.id);
    if (isNaN(workshopId)) {
      return res.status(400).json({ message: "Invalid workshop ID" });
    }
    const registrations = await storage.getWorkshopRegistrationsByWorkshopId(workshopId);
    res.json(registrations);
  });
  app2.post("/api/workshops/:id/register", async (req, res) => {
    const workshopId = parseInt(req.params.id);
    if (isNaN(workshopId)) {
      return res.status(400).json({ message: "Invalid workshop ID" });
    }
    const workshop = await storage.getWorkshop(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    if (!workshop.registrationOpen) {
      return res.status(400).json({ message: "Registration is closed for this workshop" });
    }
    try {
      const registrationData = {
        workshopId,
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        userPhone: req.body.userPhone,
        notes: req.body.notes
      };
      const registration = await storage.createWorkshopRegistration(registrationData);
      return res.status(201).json(registration);
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0627\u0631\u06AF\u0627\u0647" });
    }
  });
  app2.get("/api/workshop-registrations", async (req, res) => {
    try {
      const registrations = await storage.getWorkshopRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error("Error fetching workshop registrations:", error);
      res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u062F\u0631\u06CC\u0627\u0641\u062A \u062B\u0628\u062A\u200C\u0646\u0627\u0645\u200C\u0647\u0627\u06CC \u06A9\u0627\u0631\u06AF\u0627\u0647" });
    }
  });
  app2.delete("/api/workshop-registrations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid registration ID" });
    }
    try {
      const deleted = await storage.deleteWorkshopRegistration(id);
      if (!deleted) {
        return res.status(404).json({ message: "Registration not found" });
      }
      res.json({ message: "Registration deleted successfully" });
    } catch (error) {
      console.error("Error deleting workshop registration:", error);
      res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u062D\u0630\u0641 \u062B\u0628\u062A\u200C\u0646\u0627\u0645" });
    }
  });
  app2.get("/api/webinars", async (req, res) => {
    const webinars2 = await storage.getWebinars();
    res.json(webinars2);
  });
  app2.get("/api/webinars/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid webinar ID" });
    }
    const webinar = await storage.getWebinar(id);
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }
    res.json(webinar);
  });
  app2.post("/api/webinars", async (req, res) => {
    try {
      const webinarData = insertWebinarSchema.parse(req.body);
      const newWebinar = await storage.createWebinar(webinarData);
      res.status(201).json(newWebinar);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0648\u0628\u06CC\u0646\u0627\u0631" });
    }
  });
  app2.put("/api/webinars/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid webinar ID" });
    }
    try {
      const webinarData = insertWebinarSchema.partial().parse(req.body);
      const updatedWebinar = await storage.updateWebinar(id, webinarData);
      if (!updatedWebinar) {
        return res.status(404).json({ message: "Webinar not found" });
      }
      return res.json(updatedWebinar);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0648\u0628\u06CC\u0646\u0627\u0631" });
    }
  });
  app2.delete("/api/webinars/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid webinar ID" });
    }
    const deleted = await storage.deleteWebinar(id);
    if (!deleted) {
      return res.status(404).json({ message: "Webinar not found" });
    }
    return res.json({ message: "Webinar deleted successfully" });
  });
  app2.get("/api/webinars/:id/sections", async (req, res) => {
    const webinarId = parseInt(req.params.id);
    if (isNaN(webinarId)) {
      return res.status(400).json({ message: "Invalid webinar ID" });
    }
    const sections = await storage.getWebinarSections(webinarId);
    res.json(sections);
  });
  app2.post("/api/webinars/:id/sections", async (req, res) => {
    const webinarId = parseInt(req.params.id);
    if (isNaN(webinarId)) {
      return res.status(400).json({ message: "Invalid webinar ID" });
    }
    try {
      const sectionData = insertWebinarSectionSchema.parse({
        ...req.body,
        webinarId
      });
      const newSection = await storage.createWebinarSection(sectionData);
      res.status(201).json(newSection);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0628\u062E\u0634 \u0648\u0628\u06CC\u0646\u0627\u0631" });
    }
  });
  app2.put("/api/webinars/:webinarId/sections/:id", async (req, res) => {
    const webinarId = parseInt(req.params.webinarId);
    const sectionId = parseInt(req.params.id);
    if (isNaN(webinarId) || isNaN(sectionId)) {
      return res.status(400).json({ message: "Invalid webinar or section ID" });
    }
    try {
      const sectionData = insertWebinarSectionSchema.partial().parse({
        ...req.body,
        webinarId
      });
      const updatedSection = await storage.updateWebinarSection(sectionId, sectionData);
      if (!updatedSection) {
        return res.status(404).json({ message: "Section not found" });
      }
      res.json(updatedSection);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0628\u062E\u0634 \u0648\u0628\u06CC\u0646\u0627\u0631" });
    }
  });
  app2.delete("/api/webinars/:webinarId/sections/:id", async (req, res) => {
    const webinarId = parseInt(req.params.webinarId);
    const sectionId = parseInt(req.params.id);
    if (isNaN(webinarId) || isNaN(sectionId)) {
      return res.status(400).json({ message: "Invalid webinar or section ID" });
    }
    try {
      const deleted = await storage.deleteWebinarSection(sectionId);
      if (!deleted) {
        return res.status(404).json({ message: "Section not found" });
      }
      res.json({ message: "\u0628\u062E\u0634 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062D\u0630\u0641 \u0634\u062F" });
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u062D\u0630\u0641 \u0628\u062E\u0634 \u0648\u0628\u06CC\u0646\u0627\u0631" });
    }
  });
  app2.get("/api/slides", async (req, res) => {
    const slides2 = await storage.getSlides();
    res.json(slides2);
  });
  app2.get("/api/slides/active", async (req, res) => {
    const slides2 = await storage.getActiveSlides();
    res.json(slides2);
  });
  app2.get("/api/slides/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid slide ID" });
    }
    const slide = await storage.getSlide(id);
    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }
    return res.json(slide);
  });
  app2.post("/api/slides", async (req, res) => {
    try {
      const slideData = insertSlideSchema.parse(req.body);
      const slide = await storage.createSlide(slideData);
      return res.status(201).json(slide);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0627\u0633\u0644\u0627\u06CC\u062F" });
    }
  });
  app2.put("/api/slides/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid slide ID" });
    }
    try {
      const slideData = insertSlideSchema.partial().parse(req.body);
      const updatedSlide = await storage.updateSlide(id, slideData);
      if (!updatedSlide) {
        return res.status(404).json({ message: "Slide not found" });
      }
      return res.json(updatedSlide);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0627\u0633\u0644\u0627\u06CC\u062F" });
    }
  });
  app2.delete("/api/slides/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid slide ID" });
    }
    const deleted = await storage.deleteSlide(id);
    if (!deleted) {
      return res.status(404).json({ message: "Slide not found" });
    }
    return res.json({ message: "Slide deleted successfully" });
  });
  app2.get("/api/quick-access", async (req, res) => {
    const items = await storage.getQuickAccessItems();
    res.json(items);
  });
  app2.post("/api/quick-access", async (req, res) => {
    try {
      const itemData = insertQuickAccessItemSchema.parse(req.body);
      const item = await storage.createQuickAccessItem(itemData);
      return res.status(201).json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0622\u06CC\u062A\u0645 \u062F\u0633\u062A\u0631\u0633\u06CC \u0633\u0631\u06CC\u0639" });
    }
  });
  app2.put("/api/quick-access/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    try {
      const itemData = insertQuickAccessItemSchema.parse(req.body);
      const item = await storage.updateQuickAccessItem(id, itemData);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0622\u06CC\u062A\u0645 \u062F\u0633\u062A\u0631\u0633\u06CC \u0633\u0631\u06CC\u0639" });
    }
  });
  app2.delete("/api/quick-access/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    const deleted = await storage.deleteQuickAccessItem(id);
    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json({ message: "Quick access item deleted successfully" });
  });
  app2.patch("/api/courses/:id/protection", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }
    try {
      const updatedCourse = await storage.updateCourseProtection(id, req.body);
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.json(updatedCourse);
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0641\u0627\u0638\u062A" });
    }
  });
  app2.patch("/api/projects/:id/protection", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }
    try {
      const updatedProject = await storage.updateProjectProtection(id, req.body);
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.json(updatedProject);
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0641\u0627\u0638\u062A" });
    }
  });
  app2.patch("/api/documents/:id/protection", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }
    try {
      const updatedDocument = await storage.updateDocumentProtection(id, req.body);
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.json(updatedDocument);
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0641\u0627\u0638\u062A" });
    }
  });
  app2.patch("/api/magazines/:id/protection", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid magazine ID" });
    }
    try {
      const updatedMagazine = await storage.updateMagazineProtection(id, req.body);
      if (!updatedMagazine) {
        return res.status(404).json({ message: "Magazine not found" });
      }
      return res.json(updatedMagazine);
    } catch (error) {
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u062D\u0641\u0627\u0638\u062A" });
    }
  });
  app2.get("/api/workshop-registrations", async (req, res) => {
    const registrations = await storage.getWorkshopRegistrations();
    res.json(registrations);
  });
  app2.get("/api/workshop-registrations/workshop/:workshopId", async (req, res) => {
    const workshopId = parseInt(req.params.workshopId);
    if (isNaN(workshopId)) {
      return res.status(400).json({ message: "Invalid workshop ID" });
    }
    const registrations = await storage.getWorkshopRegistrationsByWorkshopId(workshopId);
    return res.json(registrations);
  });
  app2.post("/api/workshop-registrations", async (req, res) => {
    try {
      const registrationData = insertWorkshopRegistrationSchema.parse(req.body);
      const registration = await storage.createWorkshopRegistration(registrationData);
      return res.status(201).json(registration);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0627\u0631\u06AF\u0627\u0647" });
    }
  });
  app2.delete("/api/workshop-registrations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid registration ID" });
    }
    const deleted = await storage.deleteWorkshopRegistration(id);
    if (!deleted) {
      return res.status(404).json({ message: "Registration not found" });
    }
    return res.json({ message: "Registration deleted successfully" });
  });
  app2.get("/api/educational-videos", async (req, res) => {
    const videos = await storage.getEducationalVideos();
    res.json(videos);
  });
  app2.get("/api/educational-videos/active", async (req, res) => {
    const videos = await storage.getActiveEducationalVideos();
    res.json(videos);
  });
  app2.get("/api/educational-videos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }
    const video = await storage.getEducationalVideo(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.json(video);
  });
  app2.post("/api/educational-videos", async (req, res) => {
    try {
      const videoData = insertEducationalVideoSchema.parse(req.body);
      const video = await storage.createEducationalVideo(videoData);
      return res.status(201).json(video);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0648\u06CC\u062F\u06CC\u0648" });
    }
  });
  app2.put("/api/educational-videos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }
    try {
      const videoData = insertEducationalVideoSchema.partial().parse(req.body);
      const updatedVideo = await storage.updateEducationalVideo(id, videoData);
      if (!updatedVideo) {
        return res.status(404).json({ message: "Video not found" });
      }
      return res.json(updatedVideo);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0648\u06CC\u062F\u06CC\u0648" });
    }
  });
  app2.delete("/api/educational-videos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }
    const deleted = await storage.deleteEducationalVideo(id);
    if (!deleted) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.json({ message: "Video deleted successfully" });
  });
  app2.get("/api/about-us", async (req, res) => {
    const aboutUs2 = await storage.getAboutUs();
    res.json(aboutUs2);
  });
  app2.get("/api/about-us/active", async (req, res) => {
    const aboutUs2 = await storage.getActiveAboutUs();
    res.json(aboutUs2);
  });
  app2.get("/api/about-us/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid about us ID" });
    }
    const aboutUs2 = await storage.getAboutUsById(id);
    if (!aboutUs2) {
      return res.status(404).json({ message: "About us not found" });
    }
    return res.json(aboutUs2);
  });
  app2.post("/api/about-us", async (req, res) => {
    try {
      const aboutUsData = insertAboutUsSchema.parse(req.body);
      const aboutUs2 = await storage.createAboutUs(aboutUsData);
      return res.status(201).json(aboutUs2);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0635\u0641\u062D\u0647 \u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0627" });
    }
  });
  app2.put("/api/about-us/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid about us ID" });
    }
    try {
      const aboutUsData = insertAboutUsSchema.partial().parse(req.body);
      const updatedAboutUs = await storage.updateAboutUs(id, aboutUsData);
      if (!updatedAboutUs) {
        return res.status(404).json({ message: "About us not found" });
      }
      return res.json(updatedAboutUs);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0635\u0641\u062D\u0647 \u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0627" });
    }
  });
  app2.delete("/api/about-us/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid about us ID" });
    }
    const deleted = await storage.deleteAboutUs(id);
    if (!deleted) {
      return res.status(404).json({ message: "About us not found" });
    }
    return res.json({ message: "About us deleted successfully" });
  });
  app2.get("/api/subsidiary-companies", async (req, res) => {
    const companies = await storage.getSubsidiaryCompanies();
    res.json(companies);
  });
  app2.get("/api/subsidiary-companies/active", async (req, res) => {
    const companies = await storage.getActiveSubsidiaryCompanies();
    res.json(companies);
  });
  app2.get("/api/subsidiary-companies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid company ID" });
    }
    const company = await storage.getSubsidiaryCompanyById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.json(company);
  });
  app2.post("/api/subsidiary-companies", async (req, res) => {
    try {
      const companyData = insertSubsidiaryCompanySchema.parse(req.body);
      const company = await storage.createSubsidiaryCompany(companyData);
      return res.status(201).json(company);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0634\u0631\u06A9\u062A \u0632\u06CC\u0631\u0645\u062C\u0645\u0648\u0639\u0647" });
    }
  });
  app2.put("/api/subsidiary-companies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid company ID" });
    }
    try {
      const companyData = insertSubsidiaryCompanySchema.partial().parse(req.body);
      const updatedCompany = await storage.updateSubsidiaryCompany(id, companyData);
      if (!updatedCompany) {
        return res.status(404).json({ message: "Company not found" });
      }
      return res.json(updatedCompany);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u0631\u06A9\u062A \u0632\u06CC\u0631\u0645\u062C\u0645\u0648\u0639\u0647" });
    }
  });
  app2.delete("/api/subsidiary-companies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid company ID" });
    }
    const deleted = await storage.deleteSubsidiaryCompany(id);
    if (!deleted) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.json({ message: "Company deleted successfully" });
  });
  app2.get("/api/contact-us", async (req, res) => {
    const contactUs2 = await storage.getContactUs();
    res.json(contactUs2);
  });
  app2.get("/api/contact-us/active", async (req, res) => {
    const contactUs2 = await storage.getActiveContactUs();
    res.json(contactUs2);
  });
  app2.get("/api/contact-us/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid contact us ID" });
    }
    const contactUs2 = await storage.getContactUsById(id);
    if (!contactUs2) {
      return res.status(404).json({ message: "Contact us not found" });
    }
    return res.json(contactUs2);
  });
  app2.post("/api/contact-us", async (req, res) => {
    try {
      const contactUsData = insertContactUsSchema.parse(req.body);
      const contactUs2 = await storage.createContactUs(contactUsData);
      return res.status(201).json(contactUs2);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u06CC\u062C\u0627\u062F \u0635\u0641\u062D\u0647 \u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627" });
    }
  });
  app2.put("/api/contact-us/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid contact us ID" });
    }
    try {
      const contactUsData = insertContactUsSchema.partial().parse(req.body);
      const updatedContactUs = await storage.updateContactUs(id, contactUsData);
      if (!updatedContactUs) {
        return res.status(404).json({ message: "Contact us not found" });
      }
      return res.json(updatedContactUs);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      return res.status(500).json({ message: "\u062E\u0637\u0627 \u062F\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0635\u0641\u062D\u0647 \u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627" });
    }
  });
  app2.delete("/api/contact-us/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid contact us ID" });
    }
    const deleted = await storage.deleteContactUs(id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact us not found" });
    }
    return res.json({ message: "Contact us deleted successfully" });
  });
  app2.get("/api/users/:userId/course-access", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
      const access = await storage.getUserCourseAccess(userId);
      res.json(access);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course access" });
    }
  });
  app2.post("/api/users/:userId/grant-course-access", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
      const { courseId, accessType, expiryDate } = req.body;
      const access = await storage.grantCourseAccess({ userId, courseId, accessType, expiryDate });
      res.status(201).json(access);
    } catch (error) {
      res.status(500).json({ error: "Failed to grant course access" });
    }
  });
  app2.delete("/api/users/:userId/revoke-course-access/:courseId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const courseId = parseInt(req.params.courseId);
    if (isNaN(userId) || isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid user or course ID" });
    }
    try {
      const success = await storage.revokeCourseAccess(userId, courseId);
      if (success) {
        res.json({ message: "Access revoked successfully" });
      } else {
        res.status(404).json({ message: "Access not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to revoke course access" });
    }
  });
  const server = createServer(app2);
  return server;
}

// server/vite.ts
import express2 from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: ["localhost"]
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = Number(process.env.PORT || 5e3);
  server.listen(port, "0.0.0.0", () => {
    log(`\u{1F680} Server running on http://0.0.0.0:${port}`);
  });
})();
