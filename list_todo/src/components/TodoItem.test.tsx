import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  const mockOnToggle = jest.fn();

  it('renders todo item text', () => {
    render(
      <TodoItem
        id="1"
        text="Test Todo"
        isCompleted={false}
        onToggle={mockOnToggle}
      />
    );
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('renders checkbox with correct state', () => {
    const { rerender } = render(
      <TodoItem
        id="1"
        text="Test Todo"
        isCompleted={false}
        onToggle={mockOnToggle}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(
      <TodoItem
        id="1"
        text="Test Todo"
        isCompleted={true}
        onToggle={mockOnToggle}
      />
    );
    expect(checkbox).toBeChecked();
  });

  it('calls onToggle when clicked', () => {
    render(
      <TodoItem
        id="1"
        text="Test Todo"
        isCompleted={false}
        onToggle={mockOnToggle}
      />
    );
    const todoItem = screen.getByText('Test Todo');
    fireEvent.click(todoItem);
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onToggle when checkbox is changed', () => {
    render(
      <TodoItem
        id="1"
        text="Test Todo"
        isCompleted={false}
        onToggle={mockOnToggle}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });
});
