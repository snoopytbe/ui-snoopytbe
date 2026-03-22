import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccordionSection } from './AccordionSection';

describe('AccordionSection', () => {
    const defaultProps = {
        titre: "Test Section",
        children: <div>Content</div>,
    };

    it('renders title and icon', () => {
        render(
            <AccordionSection
                {...defaultProps}
                icone={<span data-testid="icon">Icon</span>}
            />
        );
        expect(screen.getByText("Test Section")).toBeInTheDocument();
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it('renders subtitle when closed', () => {
        render(
            <AccordionSection
                {...defaultProps}
                sousTitre="Test Subtitle"
                ouvertParDefaut={false}
            />
        );
        expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    });

    it('hides subtitle when open', () => {
        render(
            <AccordionSection
                {...defaultProps}
                sousTitre="Test Subtitle"
                ouvertParDefaut={true}
            />
        );
        expect(screen.queryByText("Test Subtitle")).not.toBeInTheDocument();
    });

    it('shows content when open', () => {
        render(
            <AccordionSection {...defaultProps} ouvertParDefaut={true} />
        );
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it('hides content when closed', () => {
        render(
            <AccordionSection {...defaultProps} ouvertParDefaut={false} />
        );
        expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it('toggles when clicked (uncontrolled)', () => {
        render(
            <AccordionSection {...defaultProps} ouvertParDefaut={false} />
        );

        fireEvent.click(screen.getByText("Test Section").closest('button')!);
        expect(screen.getByText("Content")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Test Section").closest('button')!);
        expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it('calls onToggle when clicked (controlled)', () => {
        const onToggle = vi.fn();
        render(
            <AccordionSection
                {...defaultProps}
                estOuvert={false}
                auChangement={onToggle}
            />
        );

        fireEvent.click(screen.getByText("Test Section").closest('button')!);
        expect(onToggle).toHaveBeenCalledWith(true);
    });
});
