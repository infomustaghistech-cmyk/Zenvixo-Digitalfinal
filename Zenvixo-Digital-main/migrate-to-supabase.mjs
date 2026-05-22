/**
 * Migration Script: Upload all static portfolio images to Supabase
 * 
 * This script:
 * 1. Reads all images from imagesgraphic/ and digitalartimages/
 * 2. Uploads them to Supabase Storage (portfolio-images bucket)
 * 3. Creates records in the projects table
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase credentials from .env
const supabaseUrl = 'https://ygoqismaxpxlzklaecaz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnb3Fpc21heHB4bHprbGFlY2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyODcxNDgsImV4cCI6MjA5NDg2MzE0OH0.8ax2nQpIgnZjrPycc4s_bENEQ-MX-pi02PSxLB-HH3o';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper: get content type from extension
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return map[ext] || 'image/jpeg';
}

// Helper: generate a safe filename
function safeFileName(original) {
  return `migrate_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${path.extname(original)}`;
}

async function uploadImageAndCreateRecord(filePath, category, subCategory, title, description) {
  const fileName = safeFileName(path.basename(filePath));
  const fileBuffer = fs.readFileSync(filePath);
  const contentType = getContentType(filePath);

  // 1. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('portfolio-images')
    .upload(fileName, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (uploadError) {
    console.error(`  ❌ Upload failed for ${path.basename(filePath)}: ${uploadError.message}`);
    return false;
  }

  // 2. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(fileName);

  // 3. Insert into projects table
  const { error: dbError } = await supabase
    .from('projects')
    .insert([{
      title,
      description,
      image: publicUrl,
      category,
      subCategory: subCategory || null,
      media_type: 'image',
      video_url: null,
      project_url: null,
    }]);

  if (dbError) {
    console.error(`  ❌ DB insert failed for ${title}: ${dbError.message}`);
    return false;
  }

  console.log(`  ✅ ${title} → uploaded & saved`);
  return true;
}

async function main() {
  console.log('🚀 Starting portfolio migration to Supabase...\n');

  let successCount = 0;
  let failCount = 0;

  // ===== 1. Graphic Designing Images =====
  const graphicDir = path.join(__dirname, 'src', 'imagesgraphic');
  if (fs.existsSync(graphicDir)) {
    const graphicFiles = fs.readdirSync(graphicDir).filter(f => /\.(jpeg|jpg|png|gif|webp)$/i.test(f));
    console.log(`📁 Graphic Designing: ${graphicFiles.length} images found`);

    for (let i = 0; i < graphicFiles.length; i++) {
      const filePath = path.join(graphicDir, graphicFiles[i]);
      const ok = await uploadImageAndCreateRecord(
        filePath,
        'graphic-designing',
        null,
        `Creative Design ${i + 1}`,
        'A premium graphic design project showcasing our creative expertise and attention to detail.'
      );
      if (ok) successCount++; else failCount++;
    }
  } else {
    console.log('⚠️  imagesgraphic folder not found, skipping...');
  }

  // ===== 2. Digital Art Images =====
  const digitalArtDir = path.join(__dirname, 'src', 'digitalartimages');
  const subCategories = ['2d', '3d', '2d-animation', '3d-animation'];

  if (fs.existsSync(digitalArtDir)) {
    const artFiles = fs.readdirSync(digitalArtDir).filter(f => /\.(jpeg|jpg|png|gif|webp)$/i.test(f));
    console.log(`\n📁 Digital Art: ${artFiles.length} images found`);

    for (let i = 0; i < artFiles.length; i++) {
      const subCategory = subCategories[i % subCategories.length];
      const filePath = path.join(digitalArtDir, artFiles[i]);
      const ok = await uploadImageAndCreateRecord(
        filePath,
        'digital-art',
        subCategory,
        `Digital Masterpiece ${i + 1}`,
        `A stunning ${subCategory.replace('-', ' ')} artwork exploring new creative boundaries.`
      );
      if (ok) successCount++; else failCount++;
    }
  } else {
    console.log('⚠️  digitalartimages folder not found, skipping...');
  }

  // ===== 3. Hardcoded placeholder items =====
  console.log('\n📁 Other categories: 6 placeholder items');

  const hardcodedItems = [
    { category: 'web-dev', title: 'Quantum Dashboard', image: 'https://picsum.photos/seed/wd1/1200/800', description: 'Real-time data visualization platform for quantum computing research.' },
    { category: 'web-dev', title: 'E-commerce Core', image: 'https://picsum.photos/seed/wd2/1200/800', description: 'A headless commerce solution built with React and high-performance APIs.' },
    { category: 'ui-ux', title: 'ZenFlow Mobile', image: 'https://picsum.photos/seed/uiux1/1200/800', description: 'A meditation app focusing on minimal cognitive load and fluid animations.' },
    { category: 'video-editing', title: 'Cinematic Reels', image: 'https://picsum.photos/seed/vid1/1200/800', description: 'Fast-paced, high-impact social media video production for tech influencers.' },
    { category: 'ai-ads', title: 'Neural Campaigns', image: 'https://picsum.photos/seed/aiad1/1200/800', description: 'AI-generated visual assets for highly targeted AdSense and social media campaigns.' },
    { category: 'yt-automation', title: 'Growth Engine', image: 'https://picsum.photos/seed/ytaut1/1200/800', description: 'End-to-end automated channel management, from script to high-retention upload.' },
  ];

  for (const item of hardcodedItems) {
    const { error } = await supabase
      .from('projects')
      .insert([{
        title: item.title,
        description: item.description,
        image: item.image,
        category: item.category,
        subCategory: null,
        media_type: 'image',
        video_url: null,
        project_url: null,
      }]);

    if (error) {
      console.error(`  ❌ Failed: ${item.title} - ${error.message}`);
      failCount++;
    } else {
      console.log(`  ✅ ${item.title} → saved`);
      successCount++;
    }
  }

  console.log(`\n🎉 Migration complete! ✅ ${successCount} success, ❌ ${failCount} failed`);
}

main().catch(console.error);
