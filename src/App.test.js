import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { setUserSession } from './utils';

test('renders ToDo list', async () => {
  setUserSession(1234, { id: "mentalstack@cool.ru" });
  const container = render(<App />);

  expect(container.getByText(/You don't have a tasks/)).toBeInTheDocument();

  await waitFor(() => {
    const button = screen.getByLabelText("new-task-submit");
    expect(button).toBeInTheDocument();
  })

  const button = screen.getByLabelText("new-task-submit");
  const input = screen.getByLabelText("new-task-title-input");

  fireEvent.change(input, { target: { value: "Hello World!" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(input.value).toBe("");
    expect(screen.getByDisplayValue("Hello World!")).toBeInTheDocument();
  })

  const removeButton = screen.getByLabelText("remove-task-submit");

  fireEvent.click(removeButton);

  const confirmButton = screen.getByLabelText("remove-confirm");

  fireEvent.click(confirmButton);

  await waitFor(() => {
    expect(screen.getByText(/You don't have a tasks/)).toBeInTheDocument();
  })
});
