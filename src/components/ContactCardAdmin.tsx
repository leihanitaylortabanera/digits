'use client';

import { Card, Image } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ContactCardAdmin = ({ firstName, lastName, address, image, description }: Contact) => (
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
            <p className="blockquote-footer">
                {description}
            </p>
        </Card.Text>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
