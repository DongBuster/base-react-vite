export type LoginRequest = {
  account: string;
  password: string;
};

export type LoginRespone = {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    roleName: string;
    idDonVi: number;
    tenDonVi: string;
  };
};
