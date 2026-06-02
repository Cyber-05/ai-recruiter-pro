const nodemailer = require('nodemailer');

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'your-gmail@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
async function sendOTPEmail(email, otp) {
  try {
    // FOR TESTING: Log OTP to console
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📧 OTP Verification Code Generated:`);
    console.log(`✉️  Email: ${email}`);
    console.log(`🔐 CODE: ${otp}`);
    console.log(`⏱️  Valid for: 15 minutes`);
    console.log(`${'='.repeat(60)}\n`);

    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@airecruiter.com',
      to: email,
      subject: 'AI Recruiter Pro - Email Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #7c5cff, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            .content { text-align: center; }
            .otp-box { background: linear-gradient(135deg, #7c5cff, #00d4ff); color: white; padding: 20px; border-radius: 8px; margin: 30px 0; font-size: 32px; font-weight: bold; letter-spacing: 4px; }
            .warning { background: #fff3cd; border: 1px solid #ffc107; color: #856404; padding: 12px; border-radius: 6px; margin: 20px 0; font-size: 12px; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">AI Recruiter Pro</div>
            </div>
            <div class="content">
              <h2>Verify Your Email</h2>
              <p>Thank you for signing up! Please verify your email address using the code below:</p>
              <div class="otp-box">${otp}</div>
              <p>This code will expire in 15 minutes.</p>
              <div class="warning">
                ⚠️ Never share this code with anyone. We will never ask for this code.
              </div>
            </div>
            <div class="footer">
              <p>© 2026 AI Recruiter Pro. All rights reserved.</p>
              <p>If you didn't sign up for this account, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Try to send email (may fail if SMTP not configured)
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✓ Email sent to ${email}`);
    } catch (emailErr) {
      console.log(`⚠️  Email service unavailable, but OTP shown above`);
    }
    
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    // Still return true - OTP is logged to console
    return true;
  }
}

// Send welcome email
async function sendWelcomeEmail(email, name) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to AI Recruiter Pro!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #7c5cff, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            .button { display: inline-block; background: linear-gradient(135deg, #7c5cff, #00d4ff); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 20px 0; }
            .feature-list { text-align: left; margin: 30px 0; }
            .feature { margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">AI Recruiter Pro</div>
            </div>
            <h2>Welcome ${name}! 🎉</h2>
            <p>Your account is ready to use. Start transforming your hiring process with AI-powered resume analysis and interview generation.</p>
            
            <div class="feature-list">
              <h3>What you can do:</h3>
              <div class="feature">✓ Analyze resumes with AI insights</div>
              <div class="feature">✓ Generate custom interview questions</div>
              <div class="feature">✓ Track candidate progress</div>
              <div class="feature">✓ Get ATS scoring and recommendations</div>
            </div>
            
            <a href="http://localhost:3000/frontend/pages/dashboard.html" class="button">Go to Dashboard</a>
            
            <p style="margin-top: 30px; color: #999; font-size: 12px;">If you have any questions, please contact our support team.</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Welcome email error:', error);
    return false;
  }
}

module.exports = { generateOTP, sendOTPEmail, sendWelcomeEmail };
