import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { setUserSession } from './utils';

test('renders ToDo list', async () => {
  setUserSession(1234, { email: "mentalstack@cool.ru" });
  render(<App />);

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
});
