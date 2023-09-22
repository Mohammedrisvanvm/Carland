import { store } from "../../redux/store/store";
export type TokenObject = {
  type?: string;
  token?: string;
};

export const getToken= (): string|null => {
  const currentPath = window.location.pathname;

  if (currentPath.startsWith("/")) {
    const userToken: string | null | undefined =
      store.getState().user?.accessToken;


    if (userToken) {
      return  userToken 
    }
  } else if (currentPath.startsWith("/vendor")) {
    const vendorToken: string | null | undefined =
      store.getState().vendor?.accessToken;
    if (vendorToken) {
      return  vendorToken 
    }
  } else if (currentPath.startsWith("/admin")) {
    const adminToken: string | null | undefined =
      store.getState().admin?.accessToken;
    if (adminToken) {
      return  adminToken 
    }
  }

  return null;
};
