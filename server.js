import express from 'express'
import cors from 'cors'
import { google } from 'googleapis'

const SPREADSHEET_ID = '1qrYkjYTnDpkRTHSN4u3422jhq9g18qxE_sOCC9wwBaY'

const app = express()
const port = 3000

app.use(cors())

const auth = new google.auth.GoogleAuth({
  keyFile: 'key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
})

app.get('/api/sheet', async (req, res) => {
  if (req.query.range) {
    try {
      const sheets = google.sheets({ version: 'v4', auth })
      const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: req.query.range })
      res.json(response.data.values)
    } catch (error) {
      res.status(500)
    }
  } else {
    res.status(400)
  }
})

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
})