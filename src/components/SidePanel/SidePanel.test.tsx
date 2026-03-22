/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SidePanel } from './SidePanel';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef(({ children, className, onClick, role, tabIndex, onKeyDown, ...props }: any, ref: any) => (
            <div
                ref={ref}
                className={className}
                onClick={onClick}
                role={role}
                tabIndex={tabIndex}
                onKeyDown={onKeyDown}
                {...props}
            >
                {children}
            </div>
        )),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('SidePanel', () => {
    const defaultProps = {
        title: "Test Panel",
        label: "TEST LABEL",
        isOpen: false,
        onToggle: vi.fn(),
    };

    it('renders the handle with the correct label', () => {
        render(
            <SidePanel {...defaultProps}>
                <div>Content</div>
            </SidePanel>
        );
        expect(screen.getByText("TEST LABEL")).toBeInTheDocument();
    });

    it('renders the title', () => {
        render(
            <SidePanel {...defaultProps} isOpen={true}>
                <div>Content</div>
            </SidePanel>
        );
        expect(screen.getByText("Test Panel")).toBeInTheDocument();
    });

    it('renders children content', () => {
        render(
            <SidePanel {...defaultProps} isOpen={true}>
                <div data-testid="content">Content</div>
            </SidePanel>
        );
        expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it('calls onToggle when handle is clicked', () => {
        render(
            <SidePanel {...defaultProps}>
                <div>Content</div>
            </SidePanel>
        );

        const handle = screen.getByText("TEST LABEL").closest('div');
        fireEvent.click(handle!);

        expect(defaultProps.onToggle).toHaveBeenCalledWith(true);
    });

    it('calls onToggle with false when clicked outside if open', () => {
        const onToggle = vi.fn();
        render(
            <div data-testid="outside">
                <SidePanel {...defaultProps} isOpen={true} onToggle={onToggle}>
                    <div>Content</div>
                </SidePanel>
            </div>
        );

        fireEvent.mouseDown(screen.getByTestId("outside"));
        expect(onToggle).toHaveBeenCalledWith(false);
    });
});
