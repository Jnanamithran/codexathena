import nodemailer from 'nodemailer'

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function validate(body) {
  const { name, email, message } = body
  if (!name || typeof name !== 'string' || name.trim().length < 2) return 'Name is required (min 2 chars).'
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Valid email is required.'
  if (!message || typeof message !== 'string' || message.trim().length < 10) return 'Message is required (min 10 chars).'
  return null
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed.' })

  const body = req.body || {}
  const validationError = validate(body)
  if (validationError) return res.status(400).json({ success: false, error: validationError })

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return res.status(500).json({ success: false, error: 'Email service is not configured.' })
  }

  const name = escapeHtml(body.name.trim())
  const email = escapeHtml(body.email.trim())
  const type = escapeHtml(body.type || 'Not specified')
  const budget = escapeHtml(body.budget || 'Not specified')
  const message = escapeHtml(body.message.trim()).replace(/\n/g, '<br/>')
  const subject = `[Dexena] New enquiry from ${name}${type !== 'Not specified' ? ` — ${type}` : ''}`

  try {
    await transporter.sendMail({
      from: `"Dexena Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: `"${name}" <${email}>`,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0A0A0A;color:#F7F5F0;padding:32px;border:1px solid #1A1A1A">
          <h1 style="margin:0 0 8px">New Dexena enquiry</h1>
          <p style="color:#9EFF00">${type} · ${budget}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top:24px;padding:20px;background:#111;border-left:2px solid #9EFF00">${message}</div>
        </div>`,
    })

    await transporter.sendMail({
      from: `"Dexena" <${process.env.GMAIL_USER}>`,
      to: body.email.trim(),
      subject: 'We got your message — Dexena',
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto"><h1>Thanks, ${name}.</h1><p>We received your message and will get back to you within 24 hours.</p><p>Your message:</p><blockquote>${message}</blockquote></div>`,
    })

    return res.status(200).json({ success: true, message: 'Message sent.' })
  } catch (error) {
    console.error('Nodemailer error:', error)
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' })
  }
}
