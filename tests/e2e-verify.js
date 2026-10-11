import puppeteer from 'puppeteer';
import fs from 'fs';

async function runVerification() {
  console.log('--- Starting Luxury Ghee Brand Website E2E Verification ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  
  // Track console logs and errors
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // 1. Desktop Viewport (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  console.log('✓ Page loaded successfully at http://localhost:4173/');

  // Check Title
  const title = await page.title();
  console.log(`✓ Page Title: "${title}"`);
  if (!title.includes('AAVRIT') || !title.includes('Buffalo-Milk Ghee')) {
    throw new Error(`Unexpected page title: ${title}`);
  }

  // Check Meta Description
  const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
  console.log(`✓ Meta Description: "${metaDesc}"`);

  // Verify Single Product & Price ₹1,000
  const pageText = await page.$eval('body', el => el.innerText);
  if (!pageText.includes('₹1,000')) {
    throw new Error('Price ₹1,000 not found on page!');
  }
  if (!pageText.includes('Buffalo-Milk Ghee')) {
    throw new Error('Buffalo-Milk Ghee terminology not found!');
  }
  if (pageText.toLowerCase().includes('cow ghee') || pageText.toLowerCase().includes('cow-milk')) {
    throw new Error('Violation: Cow ghee detected on buffalo ghee brand site!');
  }
  console.log('✓ Verified: strictly buffalo-milk ghee, ₹1,000 per 1 kg pricing, zero cow ghee mentions.');

  // Test Hero Add to Bag
  console.log('Testing Hero Add to Bag...');
  const heroAddButton = await page.$('button[aria-label*="Add 1 kg"]');
  if (!heroAddButton) throw new Error('Hero Add to Bag button not found');
  await heroAddButton.click();

  await new Promise(r => setTimeout(r, 600));

  // Verify Cart Drawer is Open
  const cartDrawer = await page.$('div[aria-label="Shopping Bag"]');
  if (!cartDrawer) throw new Error('Cart drawer did not open');
  console.log('✓ Cart drawer opened on Add to Bag');

  // Verify Subtotal is ₹1,000
  let cartText = await page.evaluate(el => el.innerText, cartDrawer);
  if (!cartText.includes('₹1,000')) {
    throw new Error(`Cart subtotal does not display ₹1,000! Found: ${cartText}`);
  }
  console.log('✓ Cart contains 1 kg jar at ₹1,000');

  // Increment quantity in cart drawer
  const plusBtn = await cartDrawer.$('button[aria-label="Increase quantity"]');
  if (!plusBtn) throw new Error('Increase quantity button not found');
  await plusBtn.click();
  await new Promise(r => setTimeout(r, 300));

  cartText = await page.evaluate(el => el.innerText, cartDrawer);
  if (!cartText.includes('₹2,000')) {
    throw new Error(`Cart subtotal after increment does not display ₹2,000! Found: ${cartText}`);
  }
  console.log('✓ Cart quantity incremented: 2 kg = ₹2,000 verified integer calculation.');

  // Take screenshot of Cart Drawer
  await page.screenshot({
    path: '/home/runner/.gemini/antigravity-cli/brain/da0f9077-5215-4f31-9e9a-6be764cf672a/screenshots/cart_drawer_open.png',
  });
  console.log('✓ Saved cart_drawer_open.png');

  // Click "Proceed to Checkout"
  const checkoutBtn = await page.waitForSelector('button ::-p-text(Proceed to Checkout)');
  await checkoutBtn.click();
  await new Promise(r => setTimeout(r, 500));

  const checkoutModal = await page.$('div[aria-labelledby="checkout-title"]');
  if (!checkoutModal) throw new Error('Checkout modal did not open');
  console.log('✓ Checkout modal opened');

  // Take screenshot of Checkout Modal
  await page.screenshot({
    path: '/home/runner/.gemini/antigravity-cli/brain/da0f9077-5215-4f31-9e9a-6be764cf672a/screenshots/checkout_modal.png',
  });
  console.log('✓ Saved checkout_modal.png');

  // Close Checkout Modal
  const closeCheckoutBtn = await checkoutModal.$('button[aria-label="Close checkout"]');
  await closeCheckoutBtn.click();
  await new Promise(r => setTimeout(r, 300));

  // Close Cart Drawer
  const closeCartBtn = await cartDrawer.$('button[aria-label="Close shopping bag"]');
  await closeCartBtn.click();
  await new Promise(r => setTimeout(r, 300));

  // Test FAQ Accordion
  console.log('Testing FAQ accordion...');
  const faq2Btn = await page.$('#faq-heading-1');
  if (faq2Btn) {
    await faq2Btn.click();
    await new Promise(r => setTimeout(r, 400));
    const faq2Expanded = await page.evaluate(el => el.getAttribute('aria-expanded'), faq2Btn);
    console.log(`✓ FAQ item 2 expanded state: ${faq2Expanded}`);
  }

  // Scroll to Bottom Sections and Capture Philosophy, FAQ, Final CTA, Footer
  await page.evaluate(() => {
    document.getElementById('philosophy')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: '/home/runner/.gemini/antigravity-cli/brain/da0f9077-5215-4f31-9e9a-6be764cf672a/screenshots/philosophy_section.png',
  });
  console.log('✓ Saved philosophy_section.png');

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: '/home/runner/.gemini/antigravity-cli/brain/da0f9077-5215-4f31-9e9a-6be764cf672a/screenshots/footer_section.png',
  });
  console.log('✓ Saved footer_section.png');

  // Test Owner Checklist Modal from Footer
  const checklistBtn = await page.waitForSelector('button ::-p-text(Store Owner: View Pre-Launch Checklist)');
  await checklistBtn.click();
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: '/home/runner/.gemini/antigravity-cli/brain/da0f9077-5215-4f31-9e9a-6be764cf672a/screenshots/owner_checklist_modal.png',
  });
  console.log('✓ Saved owner_checklist_modal.png');

  const closePolicyBtn = await page.$('button[aria-label="Close dialog"]');
  if (closePolicyBtn) await closePolicyBtn.click();
  await new Promise(r => setTimeout(r, 300));

  // Test Mobile Navigation at 375x812 (iPhone X/12/13/14 Mini)
  console.log('Testing Mobile Viewport & Menu...');
  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));

  const mobileMenuBtn = await page.$('button[aria-label="Open navigation menu"]');
  if (!mobileMenuBtn) throw new Error('Mobile menu button not found at 375px');
  await mobileMenuBtn.click();
  await new Promise(r => setTimeout(r, 400));

  const mobileDrawer = await page.$('div[aria-label="Mobile Navigation"]');
  if (!mobileDrawer) throw new Error('Mobile menu drawer did not open');
  console.log('✓ Mobile navigation drawer opened cleanly');

  await page.screenshot({
    path: '/home/runner/.gemini/antigravity-cli/brain/da0f9077-5215-4f31-9e9a-6be764cf672a/screenshots/mobile_menu_open.png',
  });
  console.log('✓ Saved mobile_menu_open.png');

  // Verify Horizontal Overflow on 320px
  console.log('Testing for horizontal overflow on 320px width...');
  await page.setViewport({ width: 320, height: 600 });
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`✓ Horizontal overflow on 320px: ${hasOverflow ? 'YES (Defect)' : 'NO (Perfect)'}`);
  if (hasOverflow) {
    throw new Error('Horizontal overflow detected at 320px!');
  }

  // Report console errors if any
  console.log(`Console Errors count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.warn('Console errors encountered:', consoleErrors);
  }

  await browser.close();
  console.log('--- ALL E2E VERIFICATION CHECKS PASSED SUCCESSFULLY ---');
}

runVerification().catch((err) => {
  console.error('E2E Verification Failed:', err);
  process.exit(1);
});
