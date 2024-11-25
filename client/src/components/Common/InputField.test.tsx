import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import InputField from './InputField';

describe('InputField Component', () => {
  const mockRegister = jest.fn((id) => ({
    name: id,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  }));

  const defaultProps = {
    id: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    register: mockRegister,
    error: '',
  };

  it('renders the input field correctly', () => {
    render(<InputField {...defaultProps} />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Enter your username');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('applies correct styles when no error is present', () => {
    render(<InputField {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter your username');

    expect(input).toHaveClass('border-gray-300');
    expect(input).not.toHaveClass('border-red-500');
  });

  it('applies error styles and displays an error message', () => {
    const errorProps = { ...defaultProps, error: 'This field is required.' };
    render(<InputField {...errorProps} />);

    const input = screen.getByPlaceholderText('Enter your username');
    expect(input).toHaveClass('border-red-500');
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
  });

  it('calls the register function', () => {
    render(<InputField {...defaultProps} />);
    expect(mockRegister).toHaveBeenCalledWith('username');
  });

  it('handles user input correctly', () => {
    const onChangeMock = jest.fn();
    mockRegister.mockReturnValueOnce({
      name: 'username',
      onChange: onChangeMock,
      onBlur: jest.fn(),
      ref: jest.fn(),
    });

    render(<InputField {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter your username');

    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(onChangeMock).toHaveBeenCalled();
  });
});