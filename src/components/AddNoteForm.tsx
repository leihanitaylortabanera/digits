'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';

type AddNoteFormValues = {
  note: string;
  contactId: number;
  owner: string;
};

const AddNoteForm = ({ contactId }: { contactId: number }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<AddNoteFormValues>({
    resolver: yupResolver(AddNoteSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const onSubmit = async (data: AddNoteFormValues) => {
    await addNote(data);
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Header className="text-center">
                Add Timestamped Note
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register('note')}
                    isInvalid={!!errors.note}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.note?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
                <input
                  type="hidden"
                  {...register('contactId', { valueAsNumber: true })}
                  value={contactId}
                />
                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      onClick={() => resetField('note')}
                      variant="warning"
                      className="float-end"
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNoteForm;
