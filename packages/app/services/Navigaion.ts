import type { IconType } from 'react-icons';
import { MdOutlineApps, MdOutlineLogin, MdOutlineLogout } from 'react-icons/md';

interface PathConfig {
  href: string;
  icon: IconType;
}

export namespace paths {
  export namespace root {
    export const index: PathConfig = {
      href: '/',
      icon: MdOutlineApps,
    };
  }

  export namespace auth {
    export const signin: PathConfig = {
      href: 'auth/signin',
      icon: MdOutlineLogin,
    };
    export const signout: PathConfig = {
      href: 'auth/signout',
      icon: MdOutlineLogout,
    };
  }
}
