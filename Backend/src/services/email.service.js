const transporter = require("../config/mailer");
const config = require("../config/env");
const logger = require("../utils/logger");

const isSmtpConfigured = () =>
  Boolean(config.smtp.user) &&
  Boolean(config.smtp.pass) &&
  config.smtp.pass !== "your_gmail_app_password_here" &&
  !config.smtp.pass.includes("your_");

const emailService = {
  /**
   * Send the mandatory automated confirmation email to the user
   * Content and subject strictly adhere to PRD Section 5.
   */
  sendConfirmationEmail: async (userEmail, userName) => {
    if (config.nodeEnv === "test") {
      return { messageId: "test-confirmation-id" };
    }

    if (!isSmtpConfigured()) {
      logger.warn(
        `⚠️ SMTP credentials not configured. Cannot dispatch real confirmation email to ${userEmail}.`,
      );
      throw new Error(
        "SMTP credentials are not configured in environment variables.",
      );
    }

    const mailOptions = {
      from: config.smtp.from,
      to: userEmail,
      subject: "Thank You for Reaching Out!",
      text: `Thank you for reaching out! I have successfully received your message and appreciate you taking the time to contact me. I will get back to you within 24 hours.\n\nBest Regards,\nAnshuman Sahu\n\nLinkedIn: https://www.linkedin.com/in/anshuman-sahu-371a6535b/\nInstagram: https://www.instagram.com/anshuman_sahu_06\nEmail: toanshumansahu@gmail.com`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fbf6ea; margin: 0; padding: 24px; color: #1c1814; }
            .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 3px solid #1c1814; box-shadow: 6px 6px 0 #1c1814; padding: 32px; border-radius: 4px; }
            .header { border-bottom: 2px dashed #e5e5e5; padding-bottom: 16px; margin-bottom: 20px; }
            .logo { font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #1c1814; text-transform: uppercase; }
            .badge { display: inline-block; background-color: #23a05a; color: #ffffff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
            .body-text { font-size: 16px; line-height: 1.65; color: #2a2520; margin: 16px 0; }
            .signoff { margin-top: 28px; border-top: 2px solid #1c1814; padding-top: 16px; font-weight: bold; font-size: 15px; }
            .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #888888; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="logo">Anshuman Sahu</span>
              <div style="float: right;"><span class="badge">Received ✓</span></div>
            </div>
            <p class="body-text">
              Thank you for reaching out! I have successfully received your message and appreciate you taking the time to contact me. I will get back to you within 24 hours.
            </p>
            <div class="signoff">
              Best Regards,<br>
              <span style="color: #ff6b1a; font-size: 16px; font-weight: 800;">Anshuman Sahu</span>
              <div style="margin-top: 14px;">
                <table cellpadding="0" cellspacing="0" border="0" style="vertical-align: middle;">
                  <tr>
                    <td style="padding-right: 12px; vertical-align: middle;">
                      <a href="https://www.linkedin.com/in/anshuman-sahu-371a6535b/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;" title="LinkedIn">
                        <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" width="26" height="26" style="display: block; border: 0;" />
                      </a>
                    </td>
                    <td style="padding-right: 12px; vertical-align: middle;">
                      <a href="https://www.instagram.com/anshuman_sahu_06" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;" title="Instagram">
                        <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" width="26" height="26" style="display: block; border: 0;" />
                      </a>
                    </td>
                    <td style="vertical-align: middle;">
                      <a href="mailto:toanshumansahu@gmail.com" style="text-decoration: none; display: inline-block;" title="Email">
                        <img src="https://img.icons8.com/color/48/gmail--v1.png" alt="Email" width="26" height="26" style="display: block; border: 0;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="footer">
            Visit my Website &bull; <a href="https://anshumansahu.vercel.app" style="color: #1c1814; text-decoration: underline;">anshumansahu.vercel.app</a>
          </div>
        </body>
        </html>
      `,
    };

    return transporter.sendMail(mailOptions);
  },

  /**
   * Send full inquiry alert to Anshuman's personal notification email
   */
  sendAdminNotificationEmail: async (inquiry) => {
    if (config.nodeEnv === "test") {
      return { messageId: "test-admin-id" };
    }

    if (!isSmtpConfigured()) {
      logger.warn(
        `⚠️ SMTP credentials not configured. Cannot dispatch real admin notification email.`,
      );
      throw new Error(
        "SMTP credentials are not configured in environment variables.",
      );
    }

    const typeMap = {
      job: 'Job Opportunity',
      freelance: 'Freelance Project',
      collab: 'Collaboration',
      other: 'Other',
    };
    const requestType =
      typeMap[inquiry.inquiryType?.toLowerCase()] ||
      (inquiry.inquiryType
        ? inquiry.inquiryType.charAt(0).toUpperCase() + inquiry.inquiryType.slice(1)
        : 'Inquiry');
    const orgName = inquiry.company || inquiry.name || 'Organization';

    const mailOptions = {
      from: `"Portfolio Contact System" <${config.smtp.user}>`,
      to: config.notificationReceiverEmail,
      replyTo: inquiry.email,
      subject: `Request from ${orgName} for "${requestType}"`,
      text: `New Portfolio Inquiry:\n\nType: ${inquiry.inquiryType}\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company}\nPhone: ${inquiry.phone || "N/A"}\nWebsite: ${inquiry.website || "N/A"}\n\nMessage:\n${inquiry.description}`,
      html: `
        <div style="font-family: sans-serif; background-color: #fbf6ea; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 3px solid #1c1814; padding: 24px; box-shadow: 6px 6px 0 #1c1814;">
            <h2 style="margin-top: 0; color: #ff6b1a; text-transform: uppercase;">New Inquiry Received!</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Inquiry Type:</td><td><strong style="background: #ffd41f; padding: 2px 8px; border: 1px solid #1c1814;">${inquiry.inquiryType}</strong></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${inquiry.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${inquiry.company}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${inquiry.phone || "(not provided)"}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Website:</td><td>${inquiry.website ? `<a href="${inquiry.website}">${inquiry.website}</a>` : "(not provided)"}</td></tr>
            </table>
            <div style="background: #f4eddc; border: 2px solid #1c1814; padding: 16px; margin-top: 10px;">
              <p style="margin: 0; font-weight: bold; margin-bottom: 8px;">Message:</p>
              <p style="margin: 0; white-space: pre-wrap; font-size: 15px;">${inquiry.description}</p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${inquiry.email}" style="display: inline-block; background: #1c1814; color: #ffffff; padding: 10px 24px; text-decoration: none; font-weight: bold; border-radius: 2px;">Reply Directly to ${inquiry.name} &rarr;</a>
            </div>
          </div>
        </div>
      `,
    };

    return transporter.sendMail(mailOptions);
  },
};

module.exports = emailService;
