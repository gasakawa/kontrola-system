import React, { useState } from 'react';
import { useAuth } from 'hooks/auth';

import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Calendar from 'components/Calendar';

import Button from 'components/Button';
import RadioButton from 'components/RadioButton';
import { Gender } from 'types';
import validator from 'validator';
import * as S from './styles';

type AddUserModalProps = {
  action: (action: string) => void;
};

const AddUserModal = ({ action }: AddUserModalProps): JSX.Element => {
  const [birthDate, setBirthDate] = useState(new Date());
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
    console.log(data);
  };

  return (
    <S.Wrapper>
      <S.Container>
        <span onClick={handleClose} role="none" className="close-button">
          &times;
        </span>
        <S.Content>
          <S.Title>Adicionar cliente</S.Title>
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
              <Input
                type="text"
                label="document_type"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Tipo de documento"
                required
              />
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
