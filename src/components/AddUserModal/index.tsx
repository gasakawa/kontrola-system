import React, { useState } from 'react';
import { useAuth } from 'hooks/auth';

import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Calendar from 'components/Calendar';

import * as S from './styles';

type AddUserModalProps = {
  action: (action: string) => void;
};

const AddUserModal = ({ action }: AddUserModalProps): JSX.Element => {
  const [birthDate, setBirthDate] = useState(new Date());
  const { user } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleClose = (): void => {
    action('close');
  };

  return (
    <S.Wrapper>
      <S.Container>
        <span onClick={handleClose} role="none">
          &times;
        </span>
        <S.Content>
          <S.Title>Adicionar cliente</S.Title>
          <S.Form>
            <S.FormRow>
              <Input
                type="name"
                label="given_name"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Nombres"
              />
              <Input
                type="name"
                label="family_name"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Apellidos"
              />
            </S.FormRow>
            <S.FormRow>
              <Calendar label="Fecha de nascimiento" width="270px" onSelectDate={(date: Date) => setBirthDate(date)} />
              <Input
                type="text"
                label="gender"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Género"
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
              />
              <Input
                type="text"
                label="document_id"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Numéro de documento"
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
              />
              <Input
                type="text"
                label="phone_number"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Teléfono"
              />
            </S.FormRow>
          </S.Form>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default AddUserModal;
