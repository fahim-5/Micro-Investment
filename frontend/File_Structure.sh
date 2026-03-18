src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   ├── InvestmentCard.jsx
│   │   ├── PortfolioCard.jsx
│   │   ├── TransactionCard.jsx
│   │   ├── UserCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── Sidebar.jsx (for dashboard)
│   │   └── Breadcrumb.jsx
│   ├── forms/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── InvestmentForm.jsx
│   │   ├── KYCForm.jsx
│   │   ├── DepositForm.jsx
│   │   ├── WithdrawForm.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── ForgotPasswordForm.jsx
│   │   └── ResetPasswordForm.jsx
│   └── ui/
│       ├── CustomToast.jsx
│       ├── SearchFilter.jsx
│       ├── InvestmentModal.jsx
│       ├── TransactionModal.jsx
│       ├── StatsCard.jsx
│       ├── ChartCard.jsx
│       ├── ProgressBar.jsx
│       ├── Pagination.jsx
│       ├── TabNavigation.jsx
│       └── Tooltip.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── HowItWorks.jsx
│   ├── Pricing.jsx
│   ├── Blog/
│   │   ├── BlogList.jsx
│   │   ├── BlogPost.jsx
│   │   └── BlogCategories.jsx
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── VerifyEmail.jsx
│   │   └── TwoFactorAuth.jsx
│   ├── Dashboard/
│   │   ├── UserDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── Settings.jsx
│   ├── Profile/
│   │   ├── MyProfile.jsx
│   │   ├── EditProfile.jsx
│   │   ├── Security.jsx
│   │   ├── Notifications.jsx
│   │   └── Preferences.jsx
│   ├── Investments/
│   │   ├── AllInvestments.jsx
│   │   ├── InvestmentDetails.jsx
│   │   ├── MyInvestments.jsx
│   │   ├── TrendingInvestments.jsx
│   │   ├── InvestmentCategories.jsx
│   │   └── Watchlist.jsx
│   ├── Wallet/
│   │   ├── MyWallet.jsx
│   │   ├── Deposit.jsx
│   │   ├── Withdraw.jsx
│   │   ├── TransactionHistory.jsx
│   │   └── PaymentMethods.jsx
│   ├── Portfolio/
│   │   ├── PortfolioOverview.jsx
│   │   ├── Performance.jsx
│   │   ├── Allocation.jsx
│   │   ├── Dividends.jsx
│   │   └── Goals.jsx
│   ├── KYC/
│   │   ├── KYCVerification.jsx
│   │   ├── DocumentUpload.jsx
│   │   └── KYCPending.jsx
│   ├── Admin/
│   │   ├── Users.jsx
│   │   ├── UserDetails.jsx
│   │   ├── Transactions.jsx
│   │   ├── ManageInvestments.jsx
│   │   ├── AddInvestment.jsx
│   │   ├── EditInvestment.jsx
│   │   ├── Reports.jsx
│   │   ├── SystemLogs.jsx
│   │   └── Settings.jsx
│   ├── Support/
│   │   ├── HelpCenter.jsx
│   │   ├── FAQ.jsx
│   │   ├── ContactSupport.jsx
│   │   └── Tickets.jsx
│   └── Error/
│       ├── NotFound.jsx
│       ├── Unauthorized.jsx
│       ├── ServerError.jsx
│       ├── Maintenance.jsx
│       └── ComingSoon.jsx
│
├── context/
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   ├── InvestmentContext.jsx
│   ├── WalletContext.jsx
│   ├── PortfolioContext.jsx
│   ├── NotificationContext.jsx
│   └── GlobalContext.jsx
│
├── hooks/
│   ├── useAuth.js
│   ├── useInvestments.js
│   ├── useWallet.js
│   ├── usePortfolio.js
│   ├── useTransactions.js
│   ├── useTheme.js
│   ├── useUser.js
│   ├── useAdmin.js
│   ├── useChartData.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   ├── useClickOutside.js
│   ├── useWindowSize.js
│   └── useForm.js
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── investmentService.js
│   ├── walletService.js
│   ├── portfolioService.js
│   ├── adminService.js
│   ├── userService.js
│   ├── kycService.js
│   ├── notificationService.js
│   └── paymentService.js
│
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   ├── validation.js
│   ├── formatters.js
│   ├── secureStorage.js
│   ├── dateUtils.js
│   ├── numberUtils.js
│   ├── currencyUtils.js
│   ├── riskCalculator.js
│   └── exportUtils.js
│
├── assets/
│   ├── images/
│   │   ├── banner/
│   │   │   ├── hero-bg.jpg
│   │   │   ├── dashboard-hero.png
│   │   │   └── investment-banner.jpg
│   │   ├── investments/
│   │   │   ├── crypto/
│   │   │   ├── stocks/
│   │   │   ├── real-estate/
│   │   │   └── bonds/
│   │   ├── icons/
│   │   │   ├── dashboard/
│   │   │   ├── investments/
│   │   │   ├── wallet/
│   │   │   └── profile/
│   │   ├── avatars/
│   │   └── logos/
│   ├── fonts/
│   │   ├── Inter/
│   │   └── Roboto/
│   └── styles/
│       ├── globals.css
│       ├── theme.css
│       ├── variables.css
│       └── components/
│           ├── card.css
│           ├── form.css
│           ├── modal.css
│           ├── table.css
│           ├── button.css
│           └── navigation.css
│
├── App.jsx
├── main.jsx
├── index.css
└── routes.jsx