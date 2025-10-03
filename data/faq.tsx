import * as React from 'react'

const faq = {
  title: 'Frequently asked questions',
  items: [
    {
      q: 'Is Stride free to use?',
      a: 'Yes, Stride is completely free to use with all core features available.',
    },
    {
      q: 'What can I do with Stride?',
      a: (
        <>
          Stride lets you create, edit, and delete tasks, set deadlines and
          priorities, organize by categories, and manage work visually with a
          Kanban board.
        </>
      ),
    },
    {
      q: 'Is Stride open source?',
      a: 'Yes, Stride is open source and available on GitHub. Contributions are welcome.',
    },
    {
      q: 'Which devices does Stride work on?',
      a: 'Stride has a responsive web interface built with React and Next.js, so it works on desktop, tablet, and mobile browsers.',
    },
  ],
}

export default faq
