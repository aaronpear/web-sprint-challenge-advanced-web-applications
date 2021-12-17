import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render } from 'express/lib/response';

const testArticle = {
    id:"0",
    headline: "testHeadline",
    author: "",
    summary: "testSummary",
    body: "testBody"
};


test('renders component without errors', ()=> {
    render(<Article />);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article />);
    const headline = screen.queryByTestId('headline');
    const author = screen.queryByTestId('author');

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticle} />);
    const author = screen.queryByTestId('author');

    expect(author).toHaveTextContent('Associated Press');
});

test('executes handleDelete when the delete button is pressed', async ()=> {
    const testHandleDelete = jest.fn();

    render(<Article handleDelete={testHandleDelete} />);

    const deleteButton = screen.queryByTestId('deleteButton');
    userEvent.click(deleteButton);

    await waitFor(() => expect(testHandleDelete).toBeCalled());
});

// Task List:
// 1. Complete all above tests. Create test article data when needed.