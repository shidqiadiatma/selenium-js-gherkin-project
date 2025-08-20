# Selenium JavaScript Installation Guide

## Cara Install Selenium JavaScript

### Langkah 1: Install Dependencies
```bash
npm install
```

### Langkah 2: Update WebDriver
```bash
npm run install-drivers
```


### Langkah 3: Jalankan Test

#### Mode Headless (tanpa tampilan browser)
```bash
npm run test:all:headless
```

#### Mode Headed (browser tampil)
```bash
npm run test:all:headed
```

#### Jalankan hanya fitur reset password (headless)
```bash
npm run test:resetpassword:headless
```

#### Jalankan hanya fitur reset password (headed)
```bash
npm run test:resetpassword:headed
```

## Struktur Proyek
```
selenium-muat2/
├── package.json
├── tests/
│   └── example.test.js
├── README.md
└── node_modules/
```

## Browser yang Didukung
- Chrome (default)
- Firefox
- Edge
- Safari

## Contoh Penggunaan

### Test Dasar
```javascript
const { Builder, By, Key } = require('selenium-webdriver');

async function test() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://example.com');
    // Test logic here
    await driver.quit();
}
```

### Mode Headless
```javascript
let options = new chrome.Options();
options.addArguments('--headless');
let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
```

## Troubleshooting

### Error: ChromeDriver tidak ditemukan
- Pastikan Chrome ter-install
- Jalankan `npm run install-drivers`

### Error: Session not created
- Update Chrome browser ke versi terbaru
- Update ChromeDriver: `webdriver-manager update`

## Dokumentasi
- [Selenium WebDriver JS](https://www.selenium.dev/selenium/docs/api/javascript/)
- [WebDriver Manager](https://github.com/bonigarcia/webdrivermanager)
