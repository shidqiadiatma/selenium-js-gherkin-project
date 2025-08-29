# Selenium Automation Testing

Framework automation testing menggunakan Selenium WebDriver dengan Cucumber.js.

## Fitur yang Tersedia

### Test Scenarios

#### TS01 - Register (6 Test Cases)
- **TC001** - Cek validasi gagal registrasi karena password tidak sama
- **TC002** - Cek validasi gagal registrasi karena ada field yang belum terisi
- **TC003** - Cek validasi gagal registrasi karena nomor whatsapp telah terdaftar
- **TC004** - Cek validasi gagal registrasi karena menggunakan nama lengkap yang tidak valid
- **TC005** - Cek validasi gagal registrasi karena password tidak sesuai kriteria
- **TC006** - Cek validasi lolos dari halaman registrasi menggunakan data yang sesuai

#### TS02 - Login (4 Test Cases)
- **TC007** - Cek validasi gagal login dengan credential yang salah
- **TC008** - Cek validasi gagal login dengan tidak mengisi password
- **TC009** - Cek validasi gagal login dengan tidak mengisi email/no. whatsapp
- **TC010** - Cek validasi berhasil login dengan credential yang benar

#### TS03 - Reset Password (4 Test Cases)
- **TC011** - Cek validasi gagal reset password dengan tidak mengisi nomor whatsapp
- **TC012** - Cek validasi gagal reset password karena menggunakan nomor whatsapp yang belum terdaftar
- **TC013** - Cek validasi gagal reset password karena menggunakan nomor whatsapp yang tidak valid
- **TC014** - Cek validasi lolos dari halaman reset password dengan mengisi nomor whatsapp yang terdaftar

### Page Objects
- `LoginPage.js` - Halaman login dengan metode untuk interaksi elemen UI
- `RegisterPage.js` - Halaman pendaftaran dengan validasi form
- `ResetPasswordPage.js` - Halaman reset password
- `urls.json` - Konfigurasi URL untuk semua halaman

### Reporting
- **Console Report**: Report detail dengan timing dan status setiap scenario dalam format tabel
- **Real-time Logging**: Logging selama eksekusi test dengan informasi debug

## Cara Menjalankan Automation

### 1. **Install dependencies**
```powershell
npm install
```

### 2. **Update WebDriver (ChromeDriver)**
```powershell
npm run install-drivers
```

### 3. **Jalankan semua skenario (semua file feature):**

#### Mode Headless (tanpa tampilan browser)
```powershell
npm run test:all:headless
```

#### Mode Headed (browser tampil)
```powershell
npm run test:all:headed
```

### 4. **Jalankan file feature tertentu:**

#### Test Register
```powershell
# Headless mode
npm run test:register:headless

# Headed mode  
npm run test:register:headed
```

#### Test Login
```powershell
# Headless mode
npm run test:login:headless

# Headed mode
npm run test:login:headed
```

#### Test Reset Password
```powershell
# Headless mode
npm run test:resetpassword:headless

# Headed mode
npm run test:resetpassword:headed
```

## Report

### Console Report
Setelah test selesai, report otomatis ditampilkan di console dengan format tabel yang mencakup:
- Nama Scenario
- Waktu eksekusi
- Status (Passed/Failed)

Contoh output:
```
┌────────────────────────────────────┬────────┬────────┐
│          Scenario Name             │  Time  │ Status │
├────────────────────────────────────┼────────┼────────┤
│ TC001 - Cek validasi gagal...      │  12.34s│ Passed │
│ TC002 - Cek validasi gagal...      │  8.76s │ Passed │
└────────────────────────────────────┴────────┴────────┘
```

## Struktur Project
```
selenium-muat2/
├── package.json
├── README.md
├── chromedriver/
└── tests/
    ├── features/
    │   ├── TS01-register.feature      # 6 test scenarios register
    │   ├── TS02-login.feature         # 4 test scenarios login  
    │   └── TS03-reset-password.feature # 4 test scenarios reset password
    ├── pages/
    │   ├── LoginPage.js               # Page Object untuk halaman login
    │   ├── RegisterPage.js            # Page Object untuk halaman register
    │   ├── ResetPasswordPage.js       # Page Object untuk halaman reset password
    │   └── urls.json                  # Konfigurasi URL halaman
    ├── step-definitions/
    │   ├── login.steps.js             # Step definitions untuk login
    │   ├── register.steps.js          # Step definitions untuk register
    │   ├── resetpassword.steps.js     # Step definitions untuk reset password
    │   └── webdriver.hooks.js         # Hooks untuk setup dan reporting
    ├── google.selenium.test.js        # Test file tambahan
    └── pom.test.js                    # Test file tambahan
```

## Konfigurasi URL
File `tests/pages/urls.json` berisi konfigurasi URL:
```json
{
  "register": "https://muatmuat.com/register/email",
  "login": "https://muatmuat.com/login", 
  "forgot_password": "https://muatmuat.com/forgot_password"
}
```

## Konfigurasi Browser
- **Browser**: Chrome (default)
- **Mode**: Headless atau Headed
- **Window Size**: 1920x1080 pixels
- **Timeout**: 15 detik untuk element locator
- **ChromeDriver Path**: Pre-configured untuk Windows

## Framework & Dependencies
- **Selenium WebDriver**: ^4.34.0
- **Cucumber.js**: ^12.1.0
- **WebDriver Manager**: @puppeteer/browsers

## Troubleshooting

### Error: ChromeDriver tidak ditemukan
- Pastikan Chrome browser terinstall
- Jalankan `npm run install-drivers`
- Pastikan path chromedriver sesuai di `webdriver.hooks.js`

### Error: Session not created
- Update Chrome browser ke versi terbaru
- Pastikan ChromeDriver kompatibel dengan versi Chrome

### Error: Element not found
- Periksa selector elemen di Page Objects
- Pastikan halaman sudah fully loaded sebelum interaksi

### Error: Timeout
- Periksa koneksi internet
- Periksa apakah website target accessible

## Best Practices
1. Gunakan Page Object Pattern untuk maintainability
2. Gunakan explicit waits untuk element interaction
3. Implement proper error handling
4. Gunakan environment variables untuk configuration
5. Maintain clean and descriptive test scenarios

## Dokumentasi
- [Selenium WebDriver JS](https://www.selenium.dev/selenium/docs/api/javascript/)
- [Cucumber.js](https://cucumber.io/docs/installation/javascript/)
- [WebDriver Manager](https://github.com/bonigarcia/webdrivermanager)
