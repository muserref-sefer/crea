import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { login } from '../services/UserService';
import Login from './Login';

jest.mock('../services/UserService', () => ({
  login: jest.fn(),
}));

const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

const renderLoginComponent = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

const fillForm = (username: string, password: string) => {
  fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
    target: { value: username },
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: password },
  });
};

describe('Login Component', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it('renders login form correctly', () => {
    renderLoginComponent();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('calls login service and updates store on successful login', async () => {
    (login as jest.Mock).mockResolvedValueOnce({
      token: 'mock-token',
    });

    renderLoginComponent();

    fillForm('user', 'password123');
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('user', 'password123');
    });

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'auth/auth', payload: 'mock-token' }]);
  });

  it('displays an error message on login failure', async () => {
    (login as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

    renderLoginComponent();

    fillForm('user', 'wrongpassword');
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  it('disables the button and shows loading text during submission', async () => {
    (login as jest.Mock).mockImplementation(() =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ token: 'mock-token' }), 500)
      )
    );
  
    renderLoginComponent();
    fillForm('user', 'password123');
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });
  
    expect(screen.getByRole('button', { name: /Loading.../i })).toBeDisabled();  
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Login' })).toBeEnabled();
    });
  });

  it('displays validation errors when fields are empty', async () => {
    renderLoginComponent();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    await waitFor(() => {      
      expect(screen.getByText('Username is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });
});