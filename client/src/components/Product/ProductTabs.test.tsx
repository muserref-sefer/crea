import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductTabs from './ProductTabs';

describe('ProductTabs Component', () => {
  const tabs = [
    { label: 'Tab 1', content: <div>Content for Tab 1</div> },
    { label: 'Tab 2', content: <div>Content for Tab 2</div> },
    { label: 'Tab 3', content: <div>Content for Tab 3</div> },
  ];

  it('renders tabs with correct labels', () => {
    render(<ProductTabs tabs={tabs} />);

    tabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });

  it('displays the content of the active tab', () => {
    render(<ProductTabs tabs={tabs} />);

    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });

  it('changes the content when a different tab is clicked', () => {
    render(<ProductTabs tabs={tabs} />);

    fireEvent.click(screen.getByText('Tab 2'));

    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });

  it('applies correct styles to the active tab', () => {
    render(<ProductTabs tabs={tabs} />);
    expect(screen.getByText('Tab 1')).toHaveClass('border-b-2 border-blue-500 text-blue-500');

    fireEvent.click(screen.getByText('Tab 3'));

    expect(screen.getByText('Tab 3')).toHaveClass('border-b-2 border-blue-500 text-blue-500');
    expect(screen.getByText('Tab 1')).not.toHaveClass('border-b-2 border-blue-500 text-blue-500');
  });
});