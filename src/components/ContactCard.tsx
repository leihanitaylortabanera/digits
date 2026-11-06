'use client';

import { Card, Image } from 'react-bootstrap';
import { Contact } from '@prisma/client';
import Link from 'next/link';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ProfileCard = ({ firstName, lastName, address, image, description, id }: Contact) => (
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
        </Card.Text>
    </Card.Body>
    <Card.Footer>
        <Link href={`edit/${id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ProfileCard;
