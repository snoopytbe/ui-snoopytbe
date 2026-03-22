/**
 * @fileoverview Menu utilisateur
 * @module features/calendar/components/UserMenu
 */

import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { userMenuStyles } from "./styles";
import type { UserMenuProps } from "./types";

const defaultAvatar = 'https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png';

export const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut }) => {
    const [avatarSrc, setAvatarSrc] = React.useState(user?.picture || defaultAvatar);
    React.useEffect(() => {
        setAvatarSrc(user?.picture || defaultAvatar);
    }, [user?.picture]);
    const handleAvatarError = () => {
        setAvatarSrc(defaultAvatar);
    };

    return (
        <div className={userMenuStyles.wrapper}>
            <span className={userMenuStyles.name}>{user.given_name}</span>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        className={userMenuStyles.avatarButton}
                        aria-label="Ouvrir le menu utilisateur"
                        tabIndex={0}
                        type="button"
                    >
                        <img
                            src={avatarSrc}
                            alt={user?.email || 'Avatar utilisateur'}
                            className={userMenuStyles.avatarImg}
                            onError={handleAvatarError}
                            crossOrigin="anonymous"
                            referrerPolicy="no-referrer"
                        />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                    sideOffset={8}
                    align="end"
                    className={userMenuStyles.dropdown}
                >
                    <div className={userMenuStyles.dropdownHeader}>
                        <span className={userMenuStyles.dropdownName}>
                            {user?.given_name || 'Utilisateur'}
                        </span>
                        <span className={userMenuStyles.dropdownEmail}>
                            {user?.email}
                        </span>
                    </div>
                    <hr className={userMenuStyles.dropdownDivider} />
                    <DropdownMenu.Item
                        onSelect={onSignOut}
                        className={userMenuStyles.dropdownItem}
                    >
                        <span className={userMenuStyles.dropdownIcon} aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3" />
                            </svg>
                        </span>
                        <span>Déconnexion</span>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    );
};
