/**
 * Veritas AI Solutions — Contact Form Handler
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New project"
 * 3. Paste this entire script, replacing the default code
 * 4. Click "Deploy" → "New deployment"
 * 5. Choose type: "Web app"
 * 6. Set "Execute as": "Me (ap@veritasaisolutions.com)"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy" and authorize when prompted
 * 9. Copy the Web App URL — paste it into the contact form action attribute
 *    and into the FORM_ENDPOINT variable in website/js/main.js
 */

function doPost(e) {
  try {
    var data = e.parameter;

    var name = data.name || 'Not provided';
    var email = data.email || 'Not provided';
    var organization = data.organization || 'Not provided';
    var interest = data.interest || 'Not specified';
    var message = data.message || 'No message';

    // Map interest values to readable labels
    var interestLabels = {
      'tga': 'The Gospel Academy (for family)',
      'consulting': 'Consulting for school',
      'school-in-a-box': 'School-in-a-Box licensing',
      'international': 'International partnership',
      'other': 'Something else'
    };
    var interestLabel = interestLabels[interest] || interest;

    // Build email body
    var subject = 'New Contact Form Submission — ' + name;
    var body = 'New contact form submission from veritasaisolutions.com\n\n' +
               '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
               'Name: ' + name + '\n' +
               'Email: ' + email + '\n' +
               'Organization: ' + organization + '\n' +
               'Interested In: ' + interestLabel + '\n\n' +
               'Message:\n' + message + '\n\n' +
               '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
               'Submitted: ' + new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}) + ' ET\n';

    var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px;">' +
                   '<h2 style="color: #1B3A5C;">New Contact Form Submission</h2>' +
                   '<p style="color: #666;">From veritasaisolutions.com</p>' +
                   '<hr style="border: 1px solid #E8ECF1;">' +
                   '<table style="width: 100%; border-collapse: collapse;">' +
                   '<tr><td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name:</strong></td><td style="padding: 8px 0;">' + name + '</td></tr>' +
                   '<tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:' + email + '">' + email + '</a></td></tr>' +
                   '<tr><td style="padding: 8px 0; color: #666;"><strong>Organization:</strong></td><td style="padding: 8px 0;">' + organization + '</td></tr>' +
                   '<tr><td style="padding: 8px 0; color: #666;"><strong>Interested In:</strong></td><td style="padding: 8px 0;">' + interestLabel + '</td></tr>' +
                   '</table>' +
                   '<hr style="border: 1px solid #E8ECF1;">' +
                   '<h3 style="color: #1B3A5C;">Message:</h3>' +
                   '<p style="white-space: pre-wrap; line-height: 1.6;">' + message + '</p>' +
                   '<hr style="border: 1px solid #E8ECF1;">' +
                   '<p style="color: #999; font-size: 12px;">Submitted: ' + new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}) + ' ET</p>' +
                   '</div>';

    // Send to your email
    GmailApp.sendEmail('ap@veritasaisolutions.com', subject, body, {
      htmlBody: htmlBody,
      replyTo: email,
      name: 'VAIS Website'
    });

    // Optional: Log to Google Sheet for tracking
    // Uncomment the lines below and replace SHEET_ID with your spreadsheet ID
    // var sheet = SpreadsheetApp.openById('SHEET_ID').getActiveSheet();
    // sheet.appendRow([new Date(), name, email, organization, interestLabel, message]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Contact form handler is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
