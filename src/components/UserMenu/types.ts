/**
 * @fileoverview Types pour UserMenu
 */

export interface UserMenuProps {
  user: {
    given_name: string;
    email: string;
    picture?: string;
  };
  onSignOut?: () => void;
}
