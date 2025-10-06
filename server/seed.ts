import { db } from './db';
import { users, slides, quickAccessItems, educationalVideos, aboutUs, contactUs } from '@shared/schema';
import { hashPassword } from './auth';
import { eq } from 'drizzle-orm';

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Check if admin user already exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.username, 'admin'))
      .limit(1);

    if (existingAdmin.length === 0) {
      // Create admin user
      const hashedPassword = await hashPassword('730895015');

      await db.insert(users).values({
        username: 'admin',
        password: hashedPassword,
        name: 'مدیر سیستم',
        email: 'admin@pistach.com',
        role: 'admin',
        membershipType: 'Premium'
      });

      console.log('Admin user created successfully');
      console.log('Username: admin');
      console.log('Password: 730895015');
    } else {
      console.log('Admin user already exists');
    }

    // Insert sample slides
    await db.insert(slides).values([
      {
        title: "به پیستاط خوش آمدید",
        description: "پلتفرم آموزشی پیشرفته کشاورزی",
        imageUrl: "/uploads/demo-slide1.png",
        buttonText: "شروع یادگیری",
        buttonUrl: "/courses",
        secondButtonText: "درباره ما",
        secondButtonUrl: "/about",
        isActive: true,
        order: 1,
        iconName: "GraduationCap",
      }
    ]).onConflictDoNothing();

  // Insert sample educational videos
  await db.insert(educationalVideos).values([
    {
      title: "آموزش کاشت گوجه فرنگی",
      description: "یادگیری کامل تکنیک‌های کاشت گوجه فرنگی",
      videoUrl: "https://example.com/video1.mp4",
      thumbnailUrl: "/uploads/demo-slide1.png",
      duration: "15 دقیقه",
      category: "کشاورزی",
      isActive: true
    }
  ]).onConflictDoNothing();

  // Insert sample about us
  await db.insert(aboutUs).values([
    {
      title: "درباره پیستاط",
      mainContent: "پیستاط یکی از پیشروترین پلتفرم‌های آموزشی کشاورزی در ایران است که با هدف ارتقای دانش کشاورزان تأسیس شده است.",
      mission: "ماموریت ما آموزش مدرن کشاورزی است",
      vision: "چشم‌انداز ما تبدیل به بزرگترین مرکز آموزشی کشاورزی است",
      values: "ارزش‌های ما شامل نوآوری، کیفیت و دسترسی آسان است",
      foundingYear: "1402",
      companySize: "50-100 نفر",
      isActive: true
    }
  ]).onConflictDoNothing();

  // Insert sample contact us
  await db.insert(contactUs).values([
    {
      title: "تماس با ما",
      description: "برای ارتباط با تیم پیستاط از راه‌های زیر استفاده کنید",
      address: "تهران، خیابان ولیعصر، پلاک 123",
      phone: "021-12345678",
      email: "info@pistac.ir",
      workingHours: "شنبه تا چهارشنبه 9 الی 17",
      socialLinks: JSON.stringify({
        instagram: "https://instagram.com/pistac",
        telegram: "https://t.me/pistac"
      }),
      isActive: true
    }
  ]).onConflictDoNothing();

    console.log("Database seeding completed");
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run seeding if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0));
}

export { seedDatabase };