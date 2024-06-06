import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Root from './root.component';

describe('Root', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('list', JSON.stringify([
      { id: '1', text: 'Test Todo 1', isCompleted: false },
      { id: '2', text: 'Test Todo 2', isCompleted: true },
    ]));
  });

  it('renders todo list with items from localStorage', () => {
    render(<Root />);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('toggles todo item completion state', () => {
    render(<Root />);
    const checkbox = screen.getByLabelText('Test Todo 1');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('filters todo items by "Active"', () => {
    render(<Root />);
    fireEvent.click(screen.getByText('Active'));
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo 2')).toBeNull();
  });

  it('filters todo items by "Completed"', () => {
    render(<Root />);
    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo 1')).toBeNull();
  });

  it('filters todo items by "All"', () => {
    render(<Root />);
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });
});
