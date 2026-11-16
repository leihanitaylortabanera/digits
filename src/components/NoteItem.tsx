'use client';

import { ListGroup } from 'react-bootstrap';
import { Note } from '@prisma/client';

const NoteItem = ({ note }: { note: Note }) => (
  <ListGroup.Item>
    <small className="text-muted">{new Date(note.createdAt).toLocaleDateString('en-US')}</small>
    <p className="mb-0">{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
