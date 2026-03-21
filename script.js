import { databases, ID, APPWRITE_CONFIG } from '@/appwrite';

// The new expanded services data
const servicesData = [
  {
    title: '🛠️ Home & Repair Services',
    items: [
      { title: 'Carpenter', desc: 'Furniture repair, wooden work', price: 299 },
      { title: 'Electrician', desc: 'Wiring, appliance fitting, fans', price: 249 },
      { title: 'Plumber', desc: 'Pipe leakage, taps, water motors', price: 199 },
      { title: 'Mechanic', desc: 'Bike/car repair & servicing', price: 349 },
      { title: 'AC-Appliance Repair', desc: 'AC, fridge, washing machine repairs', price: 399 },
      { title: 'Painter', desc: 'House painting, texture walls', price: 299 },
      { title: 'Welder', desc: 'Metalwork, gates, frames', price: 199 },
      { title: 'Roofer', desc: 'Roof repair, waterproofing, tiling', price: 349 },
      { title: 'Mason', desc: 'Brickwork, plastering, construction repairs', price: 299 }
    ]
  },
  {
    title: '🧼 Cleaning & Maintenance',
    items: [
      { title: 'House Cleaner', desc: 'Daily/weekly cleaning', price: 149 },
      { title: 'Sofa-Curtain Cleaner', desc: 'Deep cleaning for fabrics', price: 199 },
      { title: 'Water Tank Cleaner', desc: 'Sanitation of overhead tanks', price: 249 },
      { title: 'Pest Control', desc: 'Termite, cockroach, mosquito control', price: 299 },
      { title: 'Kitchen Cleaning', desc: 'Deep cleaning of kitchen surfaces and chimneys', price: 299 },
      { title: 'Bathroom-Tile Disinfection', desc: 'Thorough cleaning and germ removal in bathrooms', price: 249 }
    ]
  },
  {
    title: '🧑‍🌾 Outdoor & Utility',
    items: [
      { title: 'Gardener', desc: 'Planting, trimming, maintenance', price: 199 },
      { title: 'Security Guard', desc: 'Residential/commercial security', price: 299 },
      { title: 'Driver on Call', desc: 'Hourly/daily drivers', price: 199 },
      { title: 'Cook-Chef', desc: 'Part-time or full-time cooking help', price: 249 },
      { title: 'Pool Maintenance', desc: 'Cleaning and maintaining swimming pools', price: 299 },
      { title: 'Car Washing & Detailing', desc: 'On-demand car cleaning and detailing services', price: 199 }
    ]
  },
  {
    title: '👩‍⚕️ Personal Services',
    items: [
      { title: 'Beautician', desc: 'Salon services, makeup, hair styling', price: 249 },
      { title: 'Massage Therapist', desc: 'Body massage, relaxation therapy', price: 299 },
      { title: 'Fitness Trainer', desc: 'Personal training, gym, or yoga sessions', price: 199 },
      { title: 'Babysitter', desc: 'Reliable childcare support', price: 149 },
      { title: 'Physiotherapist', desc: 'Injury recovery, muscle therapy, mobility improvement', price: 299 },
      { title: 'Nutrition Consultant', desc: 'Personalized diet and nutrition guidance', price: 249 }
    ]
  },
  {
    title: '💻 Tech & Digital Services',
    items: [
      { title: 'Laptop-PC Repair', desc: 'Hardware/software issues', price: 299 },
      { title: 'CCTV Installation', desc: 'Full security camera setup for home or office', price: 499 },
      { title: 'Mobile Technician', desc: 'Advanced repairs and diagnostics', price: 399 },
      { title: 'Network & LAN Setup', desc: 'Complete wired/wireless network for home or office', price: 499 },
      { title: 'Server Installation & Maintenance', desc: 'Setup and maintain servers for offices', price: 999 },
      { title: 'Home Automation Setup', desc: 'Smart home systems: lighting, security, appliances', price: 799 },
      { title: 'Audio-Visual System Installation', desc: 'Projectors, home theatre, conference room setup', price: 699 },
    ]
  },
  {
    title: '📦 Bonus Services',
    items: [
      { title: 'Courier Pickup-Delivery', desc: 'Local package pickup & drop', price: 99 },
      { title: 'Home Shifting', desc: 'Relocation and moving help', price: 399 },
      { title: 'Tailor', desc: 'Stitching & alteration', price: 149 },
      { title: 'Event Decorator', desc: 'Events & party decoration', price: 399 },
      { title: 'Pet Groomer', desc: 'Pet care and grooming at home', price: 199 },
    ]
  }
];

export const migrateServices = async () => {
  try {
    console.log("Starting migration with expanded list...");
    for (const category of servicesData) {
      for (const item of category.items) {
        await databases.createDocument(
          APPWRITE_CONFIG.dbId,
          'services', 
          ID.unique(),
          {
            title: item.title,
            desc: item.desc,
            price: item.price,
            category: category.title.replace(/[^\w\s&]/gi, '').trim() // Cleans emojis for 'Home & Repair Services'
          }
        );
        console.log(`Added: ${item.title}`);
      }
    }
    console.log("✅ All 38 services migrated to Appwrite!");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  }
};