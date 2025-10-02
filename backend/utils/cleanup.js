const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads'); // declared

const cleanupOldScreenshots = () => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR); // <-- using the variable

    files.forEach(file => {
      const filePath = path.join(UPLOADS_DIR, file); // also using it
      const stats = fs.statSync(filePath);
      const now = new Date();
      const fileAgeDays = (now - stats.mtime) / (1000 * 60 * 60 * 24);

      if (fileAgeDays > 5) {
        fs.unlink(filePath, err => {
          if (err) console.error(`Failed to delete ${file}:`, err);
          else console.log(`Deleted old screenshot: ${file}`);
        });
      }
    });
  } catch (err) {
    console.error('Error cleaning up old screenshots:', err);
  }
};

module.exports = cleanupOldScreenshots;
