import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = sqliteTable("sessions", {
  sid: text("sid").primaryKey(),
  sess: text("sess").notNull(),
  expire: integer("expire").notNull(),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  progress: integer("progress").default(0),
  membershipType: text("membership_type").default("Basic"),
  role: text("role").default("user"),
  subscriptionStatus: text("subscription_status").default("free"),
  subscriptionExpiry: integer("subscription_expiry"),
});

export const courses = sqliteTable("courses", {
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
  accessLevel: text("access_level").default("free"), // free, premium, vip
  price: integer("price").default(0), // price in tomans
  isLocked: integer("is_locked", { mode: "boolean" }).default(false),
  // Content Protection Settings
  allowDownload: integer("allow_download", { mode: "boolean" }).default(true),
  allowScreenshot: integer("allow_screenshot", { mode: "boolean" }).default(true),
  allowCopy: integer("allow_copy", { mode: "boolean" }).default(true),
  allowPrint: integer("allow_print", { mode: "boolean" }).default(true),
  watermarkText: text("watermark_text"),
  protectionLevel: text("protection_level").default("none"), // none, basic, strict
});

export const modules = sqliteTable("modules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  duration: text("duration"),
  type: text("type").notNull(), // video, pdf, etc.
  contentUrl: text("content_url"),
  isLocked: integer("is_locked", { mode: "boolean" }).default(false),
  order: integer("order").notNull(),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  type: text("type").default("project"), // "project" or "magazine"
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
  protectionLevel: text("protection_level").default("none"), // none, basic, strict
});

export const documentCategories = sqliteTable("document_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  parentId: integer("parent_id"),
  order: integer("order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
});

export const documentTags = sqliteTable("document_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  color: text("color").default("#6B7280"),
  createdAt: integer("created_at").default(Date.now()),
});

export const documents = sqliteTable("documents", {
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
  category: text("category").default("general"), // general, agriculture, technology, education, research, news
  tags: text("tags"), // Array of tags
  status: text("status").default("published"), // published, draft, private, pending
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
  protectionLevel: text("protection_level").default("none"), // none, basic, strict
});

export const documentTagRelations = sqliteTable("document_tag_relations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  documentId: integer("document_id").notNull(),
  tagId: integer("tag_id").notNull(),
  createdAt: integer("created_at").default(Date.now()),
});

export const mediaContent = sqliteTable("media_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  contentUrl: text("content_url"),
  duration: text("duration"),
  instructorName: text("instructor_name"),
  instructorTitle: text("instructor_title"),
  instructorAvatar: text("instructor_avatar"),
});

// مدل‌های داده برای مجلات و مقالات
export const magazines = sqliteTable("magazines", {
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
  protectionLevel: text("protection_level").default("none"), // none, basic, strict
});

export const articles = sqliteTable("articles", {
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
  updatedAt: integer("updated_at").default(Date.now()),
});

export const articleContents = sqliteTable("article_contents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  articleId: integer("article_id").notNull(),
  contentType: text("content_type").notNull(), // text, image, video
  content: text("content").notNull(),
  caption: text("caption"),
  order: integer("order").notNull(),
  style: text("style"), // برای ذخیره استایل‌های مربوط به محتوا
  createdAt: integer("created_at").default(Date.now()),
});

// مدل‌های نوشته‌ها (مشابه وردپرس)
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(), // HTML content
  excerpt: text("excerpt"), // خلاصه نوشته
  authorId: integer("author_id").notNull(),
  authorName: text("author_name").notNull(),
  status: text("status").notNull().default("draft"), // draft, published, scheduled
  visibility: text("visibility").default("public"), // public, private, password
  featuredImage: text("featured_image"),
  categories: text("categories"), // دسته‌بندی‌ها
  tags: text("tags"), // برچسب‌ها
  publishedAt: integer("published_at"),
  scheduledAt: integer("scheduled_at"), // برای نوشته‌های زمان‌بندی شده
  viewCount: integer("view_count").default(0),
  likesCount: integer("likes_count").default(0),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  allowComments: integer("allow_comments", { mode: "boolean" }).default(true),
  isPinned: integer("is_pinned", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
});

// جدول رسانه برای کتابخانه رسانه مثل وردپرس
export const mediaLibrary = sqliteTable("media_library", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(), // اندازه فایل به بایت
  width: integer("width"), // برای تصاویر
  height: integer("height"), // برای تصاویر
  url: text("url").notNull(),
  altText: text("alt_text"), // متن جایگزین برای تصاویر
  caption: text("caption"),
  description: text("description"),
  uploadedBy: integer("uploaded_by").notNull(),
  uploadedAt: integer("uploaded_at").default(Date.now()),
});

// مدل‌های داده‌ برای کارگاه‌های آموزشی
export const workshops = sqliteTable("workshops", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  posterUrl: text("poster_url"),
  eventDate: text("event_date"),
  location: text("location"),
  instructor: text("instructor"),
  duration: text("duration"),
  capacity: integer("capacity"),
  level: text("level"), // مبتدی، متوسط، پیشرفته
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
  protectionLevel: text("protection_level").default("none"), // none, basic, strict
});

export const workshopSections = sqliteTable("workshop_sections", {
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
  updatedAt: integer("updated_at").default(Date.now()),
});

export const workshopContents = sqliteTable("workshop_contents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workshopId: integer("workshop_id").notNull(),
  contentType: text("content_type").notNull(), // text, image, video, presentation
  title: text("title"),
  content: text("content").notNull(),
  order: integer("order").notNull(),
  createdAt: integer("created_at").default(Date.now()),
});

// مدل‌های داده‌ برای وبینارهای آموزشی
export const webinars = sqliteTable("webinars", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  posterUrl: text("poster_url"),
  eventDate: text("event_date"),
  instructor: text("instructor"),
  duration: text("duration"),
  level: text("level"), // مبتدی، متوسط، پیشرفته
  category: text("category"),
  price: integer("price").default(0),
  maxParticipants: integer("max_participants").default(0),
  imageUrl: text("image_url"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
});

export const webinarSections = sqliteTable("webinar_sections", {
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
  updatedAt: integer("updated_at").default(Date.now()),
});




// Workshop registrations table
export const workshopRegistrations = sqliteTable("workshop_registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workshopId: integer("workshop_id").notNull(),
  userEmail: text("user_email").notNull(),
  userName: text("user_name").notNull(),
  userPhone: text("user_phone"),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled
  registrationDate: integer("registration_date").default(Date.now()),
  notes: text("notes"),
});

// Slides table for homepage carousel
export const slides = sqliteTable("slides", {
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
  updatedAt: integer("updated_at").default(Date.now()),
});

// Quick Access Menu Items
export const quickAccessItems = sqliteTable("quick_access_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  iconUrl: text("icon_url"), // URL to custom icon/image
  iconSvg: text("icon_svg"), // SVG code for icon
  iconType: text("icon_type").notNull().default("svg"), // "svg", "image", or "lucide"
  iconName: text("icon_name"), // Lucide icon name if using lucide
  backgroundColor: text("background_color").default("hsl(270, 60%, 95%)"),
  iconColor: text("icon_color").default("hsl(270, 70%, 60%)"),
  linkUrl: text("link_url"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  order: integer("order").default(0),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
});

// Educational Videos
export const educationalVideos = sqliteTable("educational_videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  duration: text("duration"), // e.g., "10 دقیقه"
  category: text("category"), // e.g., "برنامه‌نویسی", "کشاورزی"
  level: text("level").default("beginner"), // beginner, intermediate, advanced
  tags: text("tags"), // Array of tags
  instructor: text("instructor"), // Instructor name
  viewsCount: integer("views_count").default(0),
  likesCount: integer("likes_count").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  isPublic: integer("is_public", { mode: "boolean" }).default(true),
  requiresSubscription: integer("requires_subscription", { mode: "boolean" }).default(false),
  orderPosition: integer("order_position").default(0),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
});

// About Us Page
export const aboutUs = sqliteTable("about_us", {
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
  updatedAt: integer("updated_at").default(Date.now()),
});

// Subsidiary Companies
export const subsidiaryCompanies = sqliteTable("subsidiary_companies", {
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
  updatedAt: integer("updated_at").default(Date.now()),
});

// Contact Us Page
export const contactUs = sqliteTable("contact_us", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  workingHours: text("working_hours"),
  mapUrl: text("map_url"), // Google Maps embed URL
  mapLatitude: text("map_latitude"),
  mapLongitude: text("map_longitude"),
  socialLinks: text("social_links"), // {instagram: "", telegram: "", linkedin: ""}
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at").default(Date.now()),
  updatedAt: integer("updated_at").default(Date.now()),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true });
export const insertModuleSchema = createInsertSchema(modules).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertDocumentCategorySchema = createInsertSchema(documentCategories).omit({ id: true, createdAt: true, updatedAt: true });
export const insertDocumentTagSchema = createInsertSchema(documentTags).omit({ id: true, createdAt: true });
export const insertDocumentSchema = createInsertSchema(documents).omit({ id: true, createdAt: true, updatedAt: true });
export const insertDocumentTagRelationSchema = createInsertSchema(documentTagRelations).omit({ id: true, createdAt: true });
export const insertMediaContentSchema = createInsertSchema(mediaContent).omit({ id: true });
export const insertMagazineSchema = createInsertSchema(magazines).omit({ id: true, createdAt: true, updatedAt: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true, updatedAt: true });
export const insertArticleContentSchema = createInsertSchema(articleContents).omit({ id: true, createdAt: true });
export const insertWorkshopSchema = createInsertSchema(workshops).omit({ id: true, createdAt: true, updatedAt: true });
export const insertWorkshopSectionSchema = createInsertSchema(workshopSections).omit({ id: true, createdAt: true, updatedAt: true });
export const insertWorkshopContentSchema = createInsertSchema(workshopContents).omit({ id: true, createdAt: true });
export const insertWebinarSchema = createInsertSchema(webinars).omit({ id: true, createdAt: true, updatedAt: true });
export const insertWebinarSectionSchema = createInsertSchema(webinarSections).omit({ id: true, createdAt: true, updatedAt: true });
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true, updatedAt: true });
export const insertMediaLibrarySchema = createInsertSchema(mediaLibrary).omit({ id: true, uploadedAt: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertModule = z.infer<typeof insertModuleSchema>;
export type Module = typeof modules.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertDocumentCategory = z.infer<typeof insertDocumentCategorySchema>;
export type DocumentCategory = typeof documentCategories.$inferSelect;

export type InsertDocumentTag = z.infer<typeof insertDocumentTagSchema>;
export type DocumentTag = typeof documentTags.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertDocumentTagRelation = z.infer<typeof insertDocumentTagRelationSchema>;
export type DocumentTagRelation = typeof documentTagRelations.$inferSelect;

export type InsertMediaContent = z.infer<typeof insertMediaContentSchema>;
export type MediaContent = typeof mediaContent.$inferSelect;

export type InsertMagazine = z.infer<typeof insertMagazineSchema>;
export type Magazine = typeof magazines.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

export type InsertArticleContent = z.infer<typeof insertArticleContentSchema>;
export type ArticleContent = typeof articleContents.$inferSelect;

export type InsertWorkshop = z.infer<typeof insertWorkshopSchema>;
export type Workshop = typeof workshops.$inferSelect;

export type InsertWorkshopSection = z.infer<typeof insertWorkshopSectionSchema>;
export type WorkshopSection = typeof workshopSections.$inferSelect;

export type InsertWorkshopContent = z.infer<typeof insertWorkshopContentSchema>;
export type WorkshopContent = typeof workshopContents.$inferSelect;

export type InsertWebinar = z.infer<typeof insertWebinarSchema>;
export type Webinar = typeof webinars.$inferSelect;

export type InsertWebinarSection = z.infer<typeof insertWebinarSectionSchema>;
export type WebinarSection = typeof webinarSections.$inferSelect;

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

export type InsertMediaLibrary = z.infer<typeof insertMediaLibrarySchema>;
export type MediaLibrary = typeof mediaLibrary.$inferSelect;

export const insertSlideSchema = createInsertSchema(slides).omit({ id: true, createdAt: true, updatedAt: true });
export const insertQuickAccessItemSchema = createInsertSchema(quickAccessItems).omit({ id: true, createdAt: true, updatedAt: true });
export const insertWorkshopRegistrationSchema = createInsertSchema(workshopRegistrations).omit({ id: true, registrationDate: true });
export const insertEducationalVideoSchema = createInsertSchema(educationalVideos).omit({ id: true, createdAt: true, updatedAt: true });
export const insertAboutUsSchema = createInsertSchema(aboutUs).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSubsidiaryCompanySchema = createInsertSchema(subsidiaryCompanies).omit({ id: true, createdAt: true, updatedAt: true });
export const insertContactUsSchema = createInsertSchema(contactUs).omit({ id: true, createdAt: true, updatedAt: true });

// Slide Types
export type InsertSlide = z.infer<typeof insertSlideSchema>;
export type Slide = typeof slides.$inferSelect;

// Quick Access Types
export type InsertQuickAccessItem = z.infer<typeof insertQuickAccessItemSchema>;
export type QuickAccessItem = typeof quickAccessItems.$inferSelect;

// Workshop Registration Types
export type InsertWorkshopRegistration = z.infer<typeof insertWorkshopRegistrationSchema>;
export type WorkshopRegistration = typeof workshopRegistrations.$inferSelect;

// Educational Video Types
export type InsertEducationalVideo = z.infer<typeof insertEducationalVideoSchema>;
export type EducationalVideo = typeof educationalVideos.$inferSelect;

// About Us Types
export type InsertAboutUs = z.infer<typeof insertAboutUsSchema>;
export type AboutUs = typeof aboutUs.$inferSelect;

// Subsidiary Company Types
export type InsertSubsidiaryCompany = z.infer<typeof insertSubsidiaryCompanySchema>;
export type SubsidiaryCompany = typeof subsidiaryCompanies.$inferSelect;

// Contact Us Types
export type InsertContactUs = z.infer<typeof insertContactUsSchema>;
export type ContactUs = typeof contactUs.$inferSelect;


// User Course Access Table
export const userCourseAccess = sqliteTable("user_course_access", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  accessType: text("access_type").notNull(), // purchased, granted, trial
  purchaseDate: integer("purchase_date").default(Date.now()),
  expiryDate: integer("expiry_date"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

export const insertUserCourseAccessSchema = createInsertSchema(userCourseAccess).omit({ id: true, purchaseDate: true });
export type InsertUserCourseAccess = z.infer<typeof insertUserCourseAccessSchema>;
export type UserCourseAccess = typeof userCourseAccess.$inferSelect;