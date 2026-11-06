'use client';

import { Card, Image } from 'react-bootstrap';
import { Contact } from '@prisma/client';

/* Renders a single row in the List Contacts table. See list/page.tsx. */
const ContactCardAdmin = ({ firstName, lastName, address, image, description, owner }: Contact) => (
  <Card className ="h-100">
    <Card.Header>
        <Image
            src={image}
            width={75}
            alt={`${firstName} ${lastName}`}
        />
        <Card.Title>
            {firstName} {lastName}
        </Card.Title>
        <Card.Subtitle>
            {address}
        </Card.Subtitle>
    </Card.Header>
    <Card.Body>
        <Card.Text>
            {description}
            <p className="blockquote-footer p-3">
                {owner}
            </p>
        </Card.Text>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
