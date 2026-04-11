2. Nguyên tắc tổ chức tổng thể (Feature-Driven Architecture)
   Dự án được tổ chức theo hướng Tính năng (Feature-based) / Module (Module-based) thay vì gom nhóm thuần túy theo loại file. Nghĩa là tất cả những gì thuộc về một luồng nghiệp vụ (Components, API, Hooks, Types, Styles) sẽ được đóng gói trong một thư mục chung.
   Mọi module, tính năng mới đều phải tự chứa được vòng đời và nghiệp vụ của riêng nó tối đa nhất có thể.

Feature-Driven Rule:

base-react-feature/
├── components/ # Các UI Component dùng chung ở nhiều page trong app này.
│ └── [Feature]/ # (Mỗi component là 1 folder riêng, gói gọn giao diện, logic và API của nó)
│ ├── index.tsx # Giao diện chính của component
│ ├── styled.ts # CSS/Styled-components riêng
│ └── services/ # (Tuỳ chọn) API, queries, mutations dùng riêng cho component này
│
├── constants/ # (Ghi chú: Đang viết sai chính tả thành "contants")
│ # Chứa các biến tĩnh, cấu hình không đổi (statusCode, tùy chọn select, workflow).
│
├── contexts/ # Global State nội bộ của app (React Context) như bộ lọc (PAKNFilterContext).
│
├── hooks/ # Custom Hooks dùng chung lặp đi lặp lại ở nhiều page/component.
│
├── layouts/ # Chứa Layout hoặc cấu trúc khung bao ngoài (Header, Sidebar) riêng của App.
│
├── pages/ # Các trang giao diện (Routing pages). Mỗi folder là một màn hình lớn.
│ └── [PageName]/ # Chứa toàn bộ "hệ sinh thái" của màn hình đó để đảm bảo tính đóng gói:
│ ├── index.tsx # Entry point của Trang
│ ├── styled.ts # Styles riêng của trang
│ ├── components/ # Chỉ chứa UI component dùng duy nhất cho trang này
│ ├── hooks/ # Custom hooks chứa business logic xử lý riêng cho trang
│ └── services/ # Các file fetch dữ liệu (api, query, mutation) riêng của trang
│
├── services/ # Thư mục xử lý logic Data Fetching (API) chia sẻ chung toàn app.
│ ├── api.ts # Nơi định nghĩa các hàm gọi Axios (GET, POST...).
│ ├── query.ts # React Query (useQuery) để lấy dữ liệu.
│ ├── mutation.ts # React Query (useMutation) để submit/thay đổi dữ liệu.
│ └── types.ts # Định nghĩa kiểu dữ liệu Data (Request/Response) cho API.
│
└── Route.ts # File cấu hình định tuyến (Routing) tổng của toàn bộ app xu-ly-PAKN.

-> Chia để trị (Phân rã theo tính năng): pages/ và components/ không phải là nơi ném tất cả các file rác rưởi vào chung 1 mớ. Bất kì trang hay khối giao diện nào cũng phải có folder riêng.
Logic gọi API, Interfaces (types), Styles: Luôn đi theo sát thư mục mà nó phục vụ (services/, styled.ts).
Mức độ ảnh hưởng:
Nếu 1 hàm/component phục vụ riêng cho 1 Trang ➔ Đặt trong folder của pages/[Tên-Trang]/...

2. Quy định Naming Conventions

- Thư mục (Folders):

* Tên page, route lớn: viết theo kiểu kebab-case (VD: tra-cuu-pakn, thong-ke, danh-sach-pakn).
* Tên component UI nhỏ: viết theo kiểu camelCase (VD: chuyenBoPhanKhac) hoặc PascalCase tuỳ theo đồng thuận, nhưng phải đồng nhất. (Theo cấu trúc của bạn hiện tại, đang mix giữa chuyenBoPhanKhac và FilterHeader). Đề xuất thống nhất chuẩn PascalCase (VD: ChuyenBoPhanKhac) cho Component folder.

- File Component (.tsx): Dùng PascalCase (VD: ChiTietPakn.tsx, FilterHeader.tsx). File UI LUÔN là .tsx.
- File Logic (.ts): Sử dụng camelCase (VD: useData.ts, api.ts, query.ts).
- Styled-components: File css module in JS luôn thống nhất đặt là styled.ts hoặc styles.ts.

3. Quy tắc Thiết kế Code (Clean Code & Separation of Concern)

- UI KHÔNG được chứa Business Logic phức tạp. Page và Component phục vụ render View là chính.
- Business/Action logic cần được đẩy sang custom hooks (useAction.ts, useData.tsx).
- Data Fetching logic (pending, error, success, call endpoint) CẦN đẩy hết qua React Query (thuộc thư mục services/ tương ứng).
- Không "rò rỉ" dependencies: Component của Page A không được phép import code từ thư mục Page B. Nếu 2 Page dùng chung, component/logic đó PHẢI được di chuyển ra /components, /hooks, hoặc /services chung ở root App

4. Quy tắc Quản lý State (State Management)

- Ưu tiên React Query (useQuery/useMutation) cho việc fetch dữ liệu. Đây là nguồn dữ liệu chính.
- Chỉ sử dụng React Context cho các Global State cần thiết, có phạm vi ảnh hưởng rộng (VD: Thông tin người dùng, Theme, Ngôn ngữ, hoặc các bộ lọc chung của toàn ứng dụng).
- Tránh tạo Context chỉ để "truyền dữ liệu qua nhiều tầng component" (prop drilling). Nếu bị prop drilling, hãy xem xét refactor lại component hoặc dùng Context.

5. Quy tắc về Component và UI

- Component phải có trách nhiệm rõ ràng: Component nhỏ, dễ tái sử dụng, tập trung vào một nhiệm vụ duy nhất.
- Tránh lồng ghép quá nhiều logic vào một component: Nếu một component trở nên quá lớn hoặc phức tạp, hãy tách nó thành các component con.
- Sử dụng Styled-components hoặc CSS Modules để quản lý styles, đảm bảo tính đóng gói và tránh xung đột CSS.

6. Quy tắc về API và Data Fetching

- API phải được định nghĩa rõ ràng trong thư mục services/ với các hàm GET, POST, PUT, DELETE.
- Sử dụng React Query (useQuery/useMutation) để quản lý trạng thái fetch dữ liệu (loading, error, success).
- Tránh gọi API trực tiếp từ component. Hãy gọi thông qua các hàm trong thư mục services/.

7. Quy tắc về Routing

- Routing phải được định nghĩa rõ ràng trong file Route.ts với các route được nhóm theo tính năng.
- Sử dụng AuthGuard và GuestGuard để bảo vệ các route tương ứng.
- Tránh tạo route động hoặc route không cần thiết.

8. Quy tắc về Testing

- Mỗi component, hook, và service cần có file test tương ứng trong thư mục test/.
- Sử dụng Jest và React Testing Library để viết test.
- Test phải được viết theo kiểu Behavior-Driven Development (BDD) với các describe, it, expect.

9. Quy tắc về Performance

- Sử dụng React.memo, useMemo, và useCallback để tối ưu hiệu năng.
- Tránh tạo component không cần thiết hoặc component có quá nhiều re-render.
- Sử dụng lazy loading để tối ưu thời gian tải trang.

10. Quy tắc về Security

- Không lưu trữ thông tin nhạy cảm trong code.
- Sử dụng environment variables để quản lý cấu hình.
- Không đọc file .env trong code.
- Sử dụng HTTPS để bảo vệ dữ liệu truyền tải.

11. Quy tắc về error handling

- Sử dụng React Query (useQuery/useMutation) để quản lý trạng thái lỗi.
- Sử dụng ErrorBoundary để bắt lỗi trong component.
- Sử dụng toast để hiển thị thông báo lỗi.
- Luôn tự suy biến các trường hợp lỗi có thể xảy ra và xử lý chúng.
