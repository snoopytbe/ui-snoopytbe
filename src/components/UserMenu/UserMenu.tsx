/**
 * @fileoverview Menu utilisateur déroulant
 * @module ui/components/UserMenu
 */

import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { userMenuStyles } from "./styles";
import type { UserMenuProps } from "./types";

/** Retourne les initiales à partir du prénom et de l'e-mail */
const getInitials = (givenName: string, email: string): string => {
    if (givenName) return givenName.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return '?';
};

/**
 * Menu utilisateur déroulant avec avatar et action de déconnexion
 * @returns Menu utilisateur stylisé
 */
export const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut }) => {
    const [imgError, setImgError] = React.useState(false);
    React.useEffect(() => {
        setImgError(false);
    }, [user?.picture]);

    if (!user) {
        console.warn('[UserMenu] Rendu sans utilisateur — composant masqué.');
        return null;
    }

    const showImage = Boolean(user.picture) && !imgError;

    const handleImageError = (): void => {
        console.warn(`[UserMenu] Échec de chargement de l'avatar pour ${user.email || 'utilisateur inconnu'}.`);
        setImgError(true);
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
                        {showImage ? (
                            <img
                                src={user.picture}
                                alt={user.email || 'Avatar utilisateur'}
                                className={userMenuStyles.avatarImg}
                                onError={handleImageError}
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <span className={userMenuStyles.avatarFallback} aria-hidden="true">
                                {getInitials(user.given_name, user.email)}
                            </span>
                        )}
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                    sideOffset={8}
                    align="end"
                    className={userMenuStyles.dropdown}
                >
                    <div className={userMenuStyles.dropdownHeader}>
                        <span className={userMenuStyles.dropdownName}>
                            {user.given_name || 'Utilisateur'}
                        </span>
                        <span className={userMenuStyles.dropdownEmail}>
                            {user.email}
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
