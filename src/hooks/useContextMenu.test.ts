import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContextMenu } from './useContextMenu';

// Helper pour créer un événement souris mocké
const createMockMouseEvent = (clientX: number, clientY: number) => ({
    preventDefault: vi.fn(),
    clientX,
    clientY,
} as unknown as React.MouseEvent<HTMLTableCellElement>);

/**
 * Tests critiques pour useContextMenu
 * Phase 1 : Tests essentiels de fonctionnement
 */
describe('useContextMenu', () => {
    let mockEvent: React.MouseEvent<HTMLTableCellElement>;
    beforeEach(() => {
        // Réinitialisation des mocks avant chaque test
        vi.clearAllMocks();
        mockEvent = createMockMouseEvent(100, 200);
    });

    describe('État initial', () => {
        it('devrait avoir un état initial correct', () => {
            const { result } = renderHook(() => useContextMenu());
            expect(result.current.mousePos).toEqual({ mouseX: 0, mouseY: 0 });
            expect(result.current.activeMenu).toBe(false);
            expect(typeof result.current.openMenu).toBe('function');
            expect(typeof result.current.closeMenu).toBe('function');
        });
    });

    describe('Ouverture du menu (openMenu)', () => {
        it('devrait ouvrir le menu avec la bonne position de souris', () => {
            const { result } = renderHook(() => useContextMenu());
            act(() => {
                result.current.openMenu(mockEvent);
            });
            expect(result.current.activeMenu).toBe(true);
            expect(result.current.mousePos).toEqual({ mouseX: 98, mouseY: 196 });
        });

        it('devrait appeler preventDefault sur l\'événement', () => {
            const { result } = renderHook(() => useContextMenu());
            act(() => {
                result.current.openMenu(mockEvent);
            });
            expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
        });

        it('devrait gérer différents positions de souris', () => {
            const { result } = renderHook(() => useContextMenu());
            const eventTopLeft = createMockMouseEvent(0, 0);
            const eventBottomRight = createMockMouseEvent(1920, 1080);
            act(() => {
                result.current.openMenu(eventTopLeft);
            });
            expect(result.current.mousePos).toEqual({ mouseX: -2, mouseY: -4 });
            act(() => {
                result.current.openMenu(eventBottomRight);
            });
            expect(result.current.mousePos).toEqual({ mouseX: 1918, mouseY: 1076 });
        });

        it('devrait mettre à jour la position même si le menu est déjà ouvert', () => {
            const { result } = renderHook(() => useContextMenu());
            const event1 = createMockMouseEvent(100, 200);
            const event2 = createMockMouseEvent(300, 400);
            act(() => {
                result.current.openMenu(event1);
            });
            expect(result.current.mousePos).toEqual({ mouseX: 98, mouseY: 196 });
            act(() => {
                result.current.openMenu(event2);
            });
            expect(result.current.mousePos).toEqual({ mouseX: 298, mouseY: 396 });
            expect(result.current.activeMenu).toBe(true);
        });
    });

    describe('Fermeture du menu (closeMenu)', () => {
        it('devrait fermer le menu actif', () => {
            const { result } = renderHook(() => useContextMenu());

            // Ouvrir d'abord le menu
            act(() => {
                result.current.openMenu(mockEvent);
            });
            expect(result.current.activeMenu).toBe(true);

            // Fermer le menu
            act(() => {
                result.current.closeMenu();
            });
            expect(result.current.activeMenu).toBe(false);
        });

        it('devrait maintenir la position de la souris lors de la fermeture', () => {
            const { result } = renderHook(() => useContextMenu());
            act(() => {
                result.current.openMenu(mockEvent);
            });
            const positionAvantFermeture = { ...result.current.mousePos };
            act(() => {
                result.current.closeMenu();
            });
            expect(result.current.mousePos).toEqual(positionAvantFermeture);
            expect(result.current.activeMenu).toBe(false);
        });

        it('devrait pouvoir fermer un menu déjà fermé sans erreur', () => {
            const { result } = renderHook(() => useContextMenu());
            expect(result.current.activeMenu).toBe(false);
            act(() => {
                result.current.closeMenu();
            });
            expect(result.current.activeMenu).toBe(false);
        });
    });

    describe('Cycle complet du menu', () => {
        it('devrait gérer un cycle complet d\'ouverture/fermeture', () => {
            const { result } = renderHook(() => useContextMenu());

            // État initial
            expect(result.current.activeMenu).toBe(false);
            expect(result.current.mousePos).toEqual({ mouseX: 0, mouseY: 0 });

            // Ouverture
            act(() => {
                result.current.openMenu(mockEvent);
            });
            expect(result.current.activeMenu).toBe(true);
            expect(result.current.mousePos).toEqual({ mouseX: 98, mouseY: 196 });

            // Fermeture
            act(() => {
                result.current.closeMenu();
            });
            expect(result.current.activeMenu).toBe(false);
            expect(result.current.mousePos).toEqual({ mouseX: 98, mouseY: 196 });

            // Réouverture
            const newEvent = createMockMouseEvent(150, 250);
            act(() => {
                result.current.openMenu(newEvent);
            });
            expect(result.current.activeMenu).toBe(true);
            expect(result.current.mousePos).toEqual({ mouseX: 148, mouseY: 246 });
        });

        it('devrait gérer plusieurs ouvertures consécutives', () => {
            const { result } = renderHook(() => useContextMenu());
            const event1 = createMockMouseEvent(100, 200);
            const event2 = createMockMouseEvent(200, 300);
            const event3 = createMockMouseEvent(300, 400);
            act(() => {
                result.current.openMenu(event1);
                result.current.openMenu(event2);
                result.current.openMenu(event3);
            });
            expect(result.current.activeMenu).toBe(true);
            expect(result.current.mousePos).toEqual({ mouseX: 298, mouseY: 396 });
        });
    });

    describe('Gestion des événements', () => {
        it('devrait gérer des événements avec des coordonnées négatives', () => {
            const { result } = renderHook(() => useContextMenu());
            const negativeEvent = createMockMouseEvent(-50, -100);
            act(() => {
                result.current.openMenu(negativeEvent);
            });
            expect(result.current.mousePos).toEqual({ mouseX: -52, mouseY: -104 });
            expect(result.current.activeMenu).toBe(true);
        });

        it('devrait gérer des événements avec des coordonnées très grandes', () => {
            const { result } = renderHook(() => useContextMenu());
            const largeEvent = createMockMouseEvent(9999, 9999);
            act(() => {
                result.current.openMenu(largeEvent);
            });
            expect(result.current.mousePos).toEqual({ mouseX: 9997, mouseY: 9995 });
            expect(result.current.activeMenu).toBe(true);
        });
    });

    describe('Stabilité et performance', () => {
        it('devrait maintenir la stabilité lors d\'appels multiples', () => {
            const { result } = renderHook(() => useContextMenu());

            // Appels multiples rapides
            for (let i = 0; i < 10; i++) {
                const event = createMockMouseEvent(i * 10, i * 20);
                act(() => {
                    result.current.openMenu(event);
                });
            }

            expect(result.current.activeMenu).toBe(true);

            // Le dernier événement a i=9, donc clientX=90, clientY=180
            // Après ajustement: mouseX=90-2=88, mouseY=180-4=176
            expect(result.current.mousePos).toEqual({ mouseX: 88, mouseY: 176 });
        });

        it('devrait gérer correctement les références des fonctions', () => {
            const { result, rerender } = renderHook(() => useContextMenu());
            const openMenuRef1 = result.current.openMenu;
            const closeMenuRef1 = result.current.closeMenu;
            rerender();
            const openMenuRef2 = result.current.openMenu;
            const closeMenuRef2 = result.current.closeMenu;

            // Les références peuvent changer entre les rendus (comportement normal de React)
            // On vérifie juste que ce sont des fonctions
            expect(typeof openMenuRef1).toBe('function');
            expect(typeof closeMenuRef1).toBe('function');
            expect(typeof openMenuRef2).toBe('function');
            expect(typeof closeMenuRef2).toBe('function');
        });
    });
});
