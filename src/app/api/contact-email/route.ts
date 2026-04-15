import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body

    // Validation
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    if (typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    // Check SMTP configuration
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error('SMTP not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars.')
      return NextResponse.json(
        {
          error: 'Email service is not configured yet. The site owner needs to set up SMTP environment variables. Please try again later or contact directly via WhatsApp.',
          code: 'SMTP_NOT_CONFIGURED',
        },
        { status: 503 }
      )
    }

    // Send email via SMTP
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    // Verify transporter
    await transporter.verify()

    const emailBody = `
📬 New Portfolio Contact Message
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name.trim()}
📞 Phone: ${phone.trim()}
📧 Email: ${email.trim()}

💬 Message:
${message.trim()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Sent: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🌐 From: Irshad AI Portfolio OS 2026
`

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: 'irshadmir312@gmail.com',
      replyTo: email.trim(),
      subject: `New Message from ${name.trim()} | Portfolio Contact`,
      text: emailBody,
      html: `
<div style="font-family: 'Segoe UI', monospace; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; border: 1px solid #333; border-radius: 8px;">
  <h2 style="color: #00ff88; margin-bottom: 20px;">📬 New Portfolio Contact Message</h2>
  <div style="border-left: 3px solid #00ff88; padding-left: 16px; margin-bottom: 20px;">
    <p style="color: #ccc; margin: 6px 0;"><strong style="color: #fff;">👤 Name:</strong> ${name.trim()}</p>
    <p style="color: #ccc; margin: 6px 0;"><strong style="color: #fff;">📞 Phone:</strong> ${phone.trim()}</p>
    <p style="color: #ccc; margin: 6px 0;"><strong style="color: #fff;">📧 Email:</strong> ${email.trim()}</p>
  </div>
  <div style="background: #111; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
    <p style="color: #888; margin-bottom: 8px;">💬 Message:</p>
    <p style="color: #ddd;">${message.trim().replace(/\n/g, '<br>')}</p>
  </div>
  <hr style="border-color: #333; margin-bottom: 16px;" />
  <p style="color: #666; font-size: 12px;">📅 Sent: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br/>🌐 From: Irshad AI Portfolio OS 2026</p>
</div>
`,
    })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully! I\'ll get back to you soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact email error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact via WhatsApp.' },
      { status: 500 }
    )
  }
}
