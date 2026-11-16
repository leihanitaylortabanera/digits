'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

const ContactCard = ({
  contact,
  notes,
}: { contact: Contact; notes: Note[] }) => {
  const { firstName, lastName, address, image, description, id } = contact;

  return (
    <Card className="h-100">
      <Card.Header>
        <Image src={image} width={75} alt={`${firstName} ${lastName}`} />
        <Card.Title>
          {firstName} {lastName}
        </Card.Title>
        <Card.Subtitle>{address}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
      <AddNoteForm contactId={contact.id} />
      <Card.Footer>
        <Link href={`/edit/${id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  );
};

export default ContactCard;
