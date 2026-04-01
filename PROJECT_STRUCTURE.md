# Project Structure

## Mục tiêu

File này tóm tắt nhanh cấu trúc hiện tại của dự án `base-react-vite` để dễ onboarding, tìm file và tránh sửa sai chỗ.

## Luồng khởi chạy

1. `src/main.tsx`
   Khởi tạo global styles, i18n, Ant Design `ConfigProvider`, React Query, `ErrorBoundary`, `NetworkDetector`.

2. `src/app.tsx`
   Mount `RouterProvider`.

3. `src/config/app-routes.tsx`
   Khai báo toàn bộ route của app.

## Cấu trúc thư mục chính

```text
src/
├─ assets/       # ảnh, icon, scss global, override AntD
├─ config/       # router, antd theme, axios, i18n, react-query
├─ constants/    # hằng số app-level
├─ features/     # page/feature theo module
├─ guards/       # AuthGuard, GuestGuard
├─ layouts/      # layout chính, header
└─ shared/       # component dùng chung, types, utils, path
```

## Các thư mục đáng chú ý

### `src/assets`

- `scss/_variable.scss`
  Nguồn màu và token CSS chính của app.
- `scss/index.scss`
  Global style entry.
- `scss/overide/*`
  Override Ant Design bằng SCSS.

### `src/config`

- `app-routes.tsx`
  Route config chính.
- `antDesign.ts`
  Theme Ant Design đang map theo palette hiện tại của app.
- `reactQuery/react-query.ts`
  `QueryClient` config.

### `src/features`

- `home/`
  Trang home hiện tại.
- `login/`
  Màn login cơ bản.
- `login-animated/`
  Màn login animation kiểu panel trượt trái/phải.
- `page-not-found/`
  Trang 404.
- `test-debug/`
  Trang test `ErrorBoundary` và `NetworkDetector`.

### `src/layouts`

- `main-layout.tsx`
  Layout chính của app.
- `header/`
  Header hiện đang dùng `styled-components`.
  - `header.tsx`
  - `header.styles.ts`
  - `change-password-modal.tsx`

### `src/shared`

- `components/error-boundary/ErrorBoundary.tsx`
  `ErrorBoundary` dùng global.
- `components/online-offline/index.tsx`
  Theo dõi online/offline.
- `contants/path.ts`
  Các path constant như `LOGIN_PATH`, `LOGIN_ANIMATED_PATH`, `HOME_PATH`.

## Route hiện tại

### Protected

- `/`
- `/home`

Đều đi qua:

- `AuthGuard`
- `MainLayout`

### Guest only

- `/login`
- `/login-animated`

Đi qua:

- `GuestGuard`

### Dev/Test

- `/test-debug`

### Fallback

- `*` -> `PageNotFound`

## Quy ước UI hiện tại

- Ưu tiên `styled-components` cho page/layout mới.
- Theme màu gốc lấy từ `src/assets/scss/_variable.scss`.
- Ant Design vẫn được dùng cho form, modal, dropdown, alert, card.
- SCSS global vẫn còn tồn tại để giữ reset và override Ant Design.

## Chú ý

### 1. Có 2 màn login

- `src/features/login/LoginPage.tsx`
  Màn login cũ, đơn giản.
- `src/features/login-animated/LoginAnimatedPage.tsx`
  Màn login mới có animation panel trượt.

Nếu muốn đưa màn mới thành mặc định, đổi route `/login` trong `src/config/app-routes.tsx`.

### 2. `test-debug` chỉ dùng để test

`src/features/test-debug/TestDebugPage.tsx` là trang dev-only, không nên giữ khi release production.

## File nên mở đầu tiên nếu cần hiểu app

1. `src/main.tsx`
2. `src/config/app-routes.tsx`
3. `src/layouts/main-layout.tsx`
4. `src/layouts/header/header.tsx`
5. `src/assets/scss/_variable.scss`
