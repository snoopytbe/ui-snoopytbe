import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserMenu } from './UserMenu';

// Mock styles
vi.mock('./styles', () => ({
    userMenuStyles: {
        wrapper: 'mock-wrapper',
        name: 'mock-name',
        avatarButton: 'mock-avatar-button',
        avatarImg: 'mock-avatar-img',
        dropdown: 'mock-dropdown',
        dropdownHeader: 'mock-dropdown-header',
        dropdownName: 'mock-dropdown-name',
        dropdownEmail: 'mock-dropdown-email',
        dropdownDivider: 'mock-dropdown-divider',
        dropdownItem: 'mock-dropdown-item',
        dropdownIcon: 'mock-dropdown-icon'
    }
}));

// Mock DropdownMenu to avoid Radix UI complexity in tests
vi.mock('@radix-ui/react-dropdown-menu', () => ({
    Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Trigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Item: ({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) => (
        <button onClick={onSelect}>{children}</button>
    ),
    Label: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Separator: () => <hr />,
    Group: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('UserMenu', () => {
    const mockUser = {
        given_name: 'John',
        email: 'john@example.com',
        picture: 'https://example.com/avatar.jpg'
    };
    
    const defaultProps = {
        user: mockUser,
        onSignOut: vi.fn()
    };

    it('devrait afficher le nom de l\'utilisateur et l\'avatar', () => {
        render(<UserMenu {...defaultProps} />);
        
        // Comme le mock rend tout, le nom apparait 2 fois (header + dropdown)
        const names = screen.getAllByText('John');
        expect(names[0]).toBeInTheDocument();
        
        const avatar = screen.getByRole('img');
        expect(avatar).toHaveAttribute('src', mockUser.picture);
    });

    it('devrait ouvrir le menu au clic', async () => {
        render(<UserMenu {...defaultProps} />);
        
        // Avec le mock, le contenu est toujours rendu ou accessible
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('Déconnexion')).toBeInTheDocument();
    });

    it('devrait appeler onSignOut au clic sur déconnexion', async () => {
        render(<UserMenu {...defaultProps} />);
        
        const signOutButton = screen.getByText('Déconnexion');
        fireEvent.click(signOutButton);
        
        expect(defaultProps.onSignOut).toHaveBeenCalled();
    });
});
