import express from 'express'
import cors from 'cors'
import { google } from 'googleapis'

const app = express()
const port = 3000

app.use(cors())

const auth = new google.auth.GoogleAuth({
  keyFile: 'key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
})

app.get('/api/sheet', async (req, res) => {
  try {
    const { range, spreadsheetId } = req.query
    if (range && spreadsheetId) {
      const sheets = google.sheets({ version: 'v4', auth })
      const response = await sheets.spreadsheets.values.get({ range, spreadsheetId })
      res.json(response.data.values)
    } else {
      res.status(400).json({ error: 'Параметры range и spreadsheetId обязательны.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить данные!' })
  }
})

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
})