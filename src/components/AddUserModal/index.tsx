import React, { useState } from 'react';
import { useAuth } from 'hooks/auth';

import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Calendar from 'components/Calendar';

import Button from 'components/Button';
import RadioButton from 'components/RadioButton';
import { Gender } from 'types';
import validator from 'validator';
import DocumentType from 'components/DocumentType';
import * as S from './styles';

type AddUserModalProps = {
  title: string;
  userRole: number;
  action: (action: string) => void;
};

const AddUserModal = ({ title, userRole, action }: AddUserModalProps): JSX.Element => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [documentType, setDocumentType] = useState(1);
  const { user } = useAuth();

  const genders = [
    { text: 'Femenino', value: 'F' },
    { text: 'Masculino', value: 'M' },
  ] as Gender[];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleClose = (): void => {
    action('close');
  };

  const onSubmit = (data: any): void => {
    console.log('🚀 ~ file: index.tsx ~ line 24 ~ user', user);
    console.log('🚀 ~ file: index.tsx ~ line 23 ~ documentType', documentType);
    console.log('🚀 ~ file: index.tsx ~ line 22 ~ birthDate', birthDate);
    console.log('🚀 ~ file: index.tsx ~ line 23 ~ role', userRole);
  };

  return (
    <S.Wrapper>
      <S.Container>
        <span onClick={handleClose} role="none" className="close-button">
          &times;
        </span>
        <S.Content>
          <S.Title>{title}</S.Title>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.FormRow>
              <Input
                type="name"
                label="given_name"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Nombres"
                required
              />
              <Input
                type="name"
                label="family_name"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Apellidos"
                required
              />
            </S.FormRow>
            <S.FormRow>
              <Calendar
                label="Fecha de nascimiento"
                width="270px"
                onSelectDate={(date: Date) => setBirthDate(date)}
                required
              />
              <RadioButton
                label="gender"
                title="Género"
                options={genders}
                errorMsg="Campo obligatório"
                register={register}
                required
                errors={errors}
              />
            </S.FormRow>
            <S.FormRow>
              <DocumentType onSelectValue={value => setDocumentType(value)} />
              <Input
                type="text"
                label="document_id"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Numéro de documento"
                required
              />
            </S.FormRow>
            <S.FormRow>
              <Input
                type="text"
                label="email"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="E-mail"
                required
                validation={value => {
                  return validator.isEmail(value) || 'El valor ingresado no parece ser un e-mail';
                }}
              />
              <Input
                type="text"
                label="phone_number"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Teléfono"
                required
              />
            </S.FormRow>
            <S.FormRow>
              <S.Buttons>
                <Button type="submit">Salvar</Button>
                <Button type="button" onClick={handleClose}>
                  Cancelar
                </Button>
              </S.Buttons>
            </S.FormRow>
          </S.Form>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default AddUserModal;
